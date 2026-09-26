import { db } from "@/server/collections";
import { earlyAccessSchema } from "@/lib/schemas";
import { ok, fail, parseBody } from "@/server/api-helpers";
import { rateLimit, clientIp } from "@/server/rate-limit";
import { sendEmail, adminNotifyEmail } from "@/server/email";

export async function POST(req: Request) {
  const limited = rateLimit(`early-access:${clientIp(req)}`, 5, 60_000);
  if (!limited.ok) return fail("Too many requests. Try again shortly.", 429);

  const parsed = await parseBody(req, earlyAccessSchema);
  if (parsed.error) return parsed.error;

  const record = await db.earlyAccess.insert(parsed.data);
  await sendEmail({
    to: parsed.data.email,
    subject: "Connexus — you're on the early access list",
    text: "Thank you for joining the Connexus early access list. We'll keep you updated as development progresses. — Ferrivox Ltd",
  });
  await sendEmail({
    to: adminNotifyEmail,
    subject: "[Connexus] New early access signup",
    text: `${parsed.data.email} (${parsed.data.country || "unknown"}) — interest: ${parsed.data.interest}`,
  });

  return ok({ id: record.id });
}
