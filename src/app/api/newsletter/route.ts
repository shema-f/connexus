import { db } from "@/server/collections";
import { newsletterSchema } from "@/lib/schemas";
import { ok, fail, parseBody } from "@/server/api-helpers";
import { rateLimit, clientIp } from "@/server/rate-limit";
import { sendEmail } from "@/server/email";

export async function POST(req: Request) {
  const limited = rateLimit(`newsletter:${clientIp(req)}`, 5, 60_000);
  if (!limited.ok) return fail("Too many requests. Try again shortly.", 429);

  const parsed = await parseBody(req, newsletterSchema);
  if (parsed.error) return parsed.error;

  const existing = await db.newsletter.find((s) => s.email === parsed.data.email);
  if (!existing) {
    await db.newsletter.insert(parsed.data);
    await sendEmail({
      to: parsed.data.email,
      subject: "Connexus — subscribed to updates",
      text: "You're subscribed to Connexus product updates from Ferrivox Ltd.",
    });
  }
  return ok({ subscribed: true });
}
