import { z } from "zod";
import { ok, fail, parseBody } from "@/server/api-helpers";
import { rateLimit, clientIp } from "@/server/rate-limit";
import { answerFromKb } from "@/lib/assistant";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

const askSchema = z.object({
  message: z.string().trim().min(1).max(500),
  /** Recent turns for LLM context (local KB mode ignores these). */
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(2000) }))
    .max(10)
    .optional(),
});

export async function POST(req: Request) {
  const limited = rateLimit(`assistant:${clientIp(req)}`, 20, 60_000);
  if (!limited.ok) {
    return fail("Too many questions. Give me a moment to cool down.", 429);
  }

  const parsed = await parseBody(req, askSchema);
  if (parsed.error) return parsed.error;

  const { message, history = [] } = parsed.data;
  const llmUrl = process.env.CONNEXUS_AI_API_URL;
  const llmKey = process.env.CONNEXUS_AI_API_KEY;

  // Mode 1 — grounded LLM (optional): knowledge base entries become context.
  if (llmUrl && llmKey) {
    try {
      const reply = await askLlm(message, history, llmUrl, llmKey);
      if (reply) return ok({ reply, source: "llm", suggestions: [] });
    } catch (err) {
      console.warn("[assistant] LLM call failed, falling back to local KB:", err instanceof Error ? err.message : err);
    }
  }

  // Mode 2 — local knowledge base (default): no internet, no data leaves the server.
  const { answer, related } = answerFromKb(message);
  return ok({
    reply: answer,
    source: "local",
    suggestions: related.length > 0 ? related : defaultSuggestions(),
  });
}

export async function GET() {
  return ok({
    name: siteConfig.assistant.name,
    tagline: siteConfig.assistant.tagline,
    model: siteConfig.assistant.model,
    suggestions: siteConfig.assistant.suggestions,
  });
}

function defaultSuggestions(): string[] {
  return [...siteConfig.assistant.suggestions].slice(0, 3);
}

/**
 * Call an OpenAI-compatible chat completions endpoint with KB grounding.
 * Kept provider-agnostic and defensive: any failure falls back to local mode.
 */
async function askLlm(
  message: string,
  history: { role: "user" | "assistant"; content: string }[],
  apiUrl: string,
  apiKey: string
): Promise<string | null> {
  const { knowledgeBase, fallbackAnswer } = await import("@/lib/assistant-kb");

  const context = knowledgeBase
    .map((e) => `Q-topics: ${e.keywords.join(", ")}\nA: ${e.answer}`)
    .join("\n\n");

  const system = [
    "You are Connexus Bot, the official assistant for Connexus — an offline-first local digital infrastructure platform by Ferrivox Ltd (Rwanda).",
    "Answer ONLY using the knowledge base below. If the answer isn't covered, say you don't know and suggest the Contact page.",
    "Be concise, warm and factual. Never invent customers, dates, pricing, certifications or deployments — the product is in development / coming soon.",
    "",
    "KNOWLEDGE BASE:",
    context,
    "",
    `If truly out of scope, use: "${fallbackAnswer}"`,
  ].join("\n");

  const res = await fetch(`${apiUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.CONNEXUS_AI_MODEL ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        ...history.slice(-6),
        { role: "user", content: message },
      ],
      max_tokens: 350,
      temperature: 0.4,
    }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) return null;
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return json.choices?.[0]?.message?.content?.trim() ?? null;
}
