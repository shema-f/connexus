import { db } from "@/server/collections";
import { contactSchema } from "@/lib/schemas";
import { ok, fail, parseBody } from "@/server/api-helpers";
import { rateLimit, clientIp } from "@/server/rate-limit";
import { sendEmail, adminNotifyEmail } from "@/server/email";

export async function POST(req: Request) {
  const limited = rateLimit(`contact:${clientIp(req)}`, 5, 60_000);
  if (!limited.ok) return fail("Too many requests. Try again shortly.", 429);

  const parsed = await parseBody(req, contactSchema);
  if (parsed.error) return parsed.error;

  const record = await db.contactRequests.insert({ ...parsed.data, status: "new" });
  await sendEmail({
    to: parsed.data.email,
    subject: "Connexus — message received",
    text: "Thank you for contacting Ferrivox Ltd about Connexus. We've received your message and will respond as needed.",
  });
  await sendEmail({
    to: adminNotifyEmail,
    subject: `[Connexus] Contact: ${parsed.data.category}`,
    text: `${parsed.data.name} <${parsed.data.email}>: ${parsed.data.message.slice(0, 200)}`,
  });

  return ok({ id: record.id });
}
