import { db } from "@/server/collections";
import { pilotRequestSchema } from "@/lib/schemas";
import { ok, fail, parseBody } from "@/server/api-helpers";
import { rateLimit, clientIp } from "@/server/rate-limit";
import { sendEmail, adminNotifyEmail } from "@/server/email";

export async function POST(req: Request) {
  const limited = rateLimit(`pilot:${clientIp(req)}`, 5, 60_000);
  if (!limited.ok) return fail("Too many requests. Try again shortly.", 429);

  const parsed = await parseBody(req, pilotRequestSchema);
  if (parsed.error) return parsed.error;

  const record = await db.pilotRequests.insert({
    ...parsed.data,
    status: "new",
  });
  await sendEmail({
    to: parsed.data.email,
    subject: "Connexus — pilot request received",
    text: "Thank you. Your pilot request has been received by Ferrivox Ltd. We'll review it and reach out to discuss next steps. This is not a confirmation of a pilot date.",
  });
  await sendEmail({
    to: adminNotifyEmail,
    subject: "[Connexus] New pilot request",
    text: `${parsed.data.fullName} — ${parsed.data.organization} (${parsed.data.organizationType}), ${parsed.data.country}. Users: ${parsed.data.potentialUsers}`,
  });

  return ok({ id: record.id });
}
