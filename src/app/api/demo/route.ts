import { db } from "@/server/collections";
import { demoRequestSchema } from "@/lib/schemas";
import { ok, fail, parseBody } from "@/server/api-helpers";
import { rateLimit, clientIp } from "@/server/rate-limit";
import { sendEmail, adminNotifyEmail } from "@/server/email";

export async function POST(req: Request) {
  const limited = rateLimit(`demo:${clientIp(req)}`, 5, 60_000);
  if (!limited.ok) return fail("Too many requests. Try again shortly.", 429);

  const parsed = await parseBody(req, demoRequestSchema);
  if (parsed.error) return parsed.error;

  const record = await db.demoRequests.insert({ ...parsed.data, status: "new" });
  await sendEmail({
    to: parsed.data.email,
    subject: "Connexus — demo request received",
    text: "Thank you for your interest in a Connexus demo. A member of the Ferrivox team will contact you to arrange timing. No calendar slot is confirmed automatically.",
  });
  await sendEmail({
    to: adminNotifyEmail,
    subject: "[Connexus] New demo request",
    text: `${parsed.data.fullName} (${parsed.data.organization || "individual"}) — ${parsed.data.demoType}`,
  });

  return ok({ id: record.id });
}
