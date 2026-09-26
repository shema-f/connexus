import { db } from "@/server/collections";
import { reviewSchema } from "@/lib/schemas";
import { ok, fail, parseBody } from "@/server/api-helpers";
import { rateLimit, clientIp } from "@/server/rate-limit";
import { sendEmail, adminNotifyEmail } from "@/server/email";

export async function POST(req: Request) {
  const limited = rateLimit(`reviews:${clientIp(req)}`, 3, 60_000);
  if (!limited.ok) return fail("Too many requests. Try again shortly.", 429);

  const parsed = await parseBody(req, reviewSchema);
  if (parsed.error) return parsed.error;

  // Never publish automatically — reviews always start as PENDING.
  const record = await db.reviews.insert({ ...parsed.data, status: "pending" });
  await sendEmail({
    to: adminNotifyEmail,
    subject: "[Connexus] New review awaiting moderation",
    text: `${parsed.data.name} rated ${parsed.data.rating}/5`,
  });

  return ok({ id: record.id });
}

export async function GET() {
  const approved = await db.reviews.list((r) => r.status === "approved");
  // Public view strips emails.
  return ok(approved.map(({ email, ...rest }) => rest));
}
