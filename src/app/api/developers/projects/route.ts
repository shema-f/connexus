import { db } from "@/server/collections";
import { developerProjectSchema } from "@/lib/schemas";
import { ok, fail, parseBody } from "@/server/api-helpers";
import { rateLimit, clientIp } from "@/server/rate-limit";
import { sendEmail, adminNotifyEmail } from "@/server/email";

export async function POST(req: Request) {
  const limited = rateLimit(`dev-projects:${clientIp(req)}`, 3, 60_000);
  if (!limited.ok) return fail("Too many requests. Try again shortly.", 429);

  const parsed = await parseBody(req, developerProjectSchema);
  if (parsed.error) return parsed.error;

  const record = await db.developerProjects.insert({
    ...parsed.data,
    moderation: "pending",
  });

  await sendEmail({
    to: parsed.data.email,
    subject: "Connexus — project submitted for review",
    text: "Your project has been submitted to the Connexus developer directory. It will appear publicly after a moderation and security review. — Ferrivox Ltd",
  });
  await sendEmail({
    to: adminNotifyEmail,
    subject: "[Connexus] New developer project submission",
    text: `${parsed.data.projectName} by ${parsed.data.developerName} — ${parsed.data.repoUrl}`,
  });

  return ok({ id: record.id });
}

export async function GET() {
  const approved = await db.developerProjects.list((p) => p.moderation === "approved");
  // Strip submitter emails from public listing.
  return ok(approved.map(({ email, ...rest }) => rest));
}
