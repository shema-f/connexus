import { db } from "@/server/collections";
import { developerProfileSchema } from "@/lib/schemas";
import { ok, fail, parseBody } from "@/server/api-helpers";
import { rateLimit, clientIp } from "@/server/rate-limit";
import { sendEmail, adminNotifyEmail } from "@/server/email";

export async function POST(req: Request) {
  const limited = rateLimit(`developers:${clientIp(req)}`, 3, 60_000);
  if (!limited.ok) return fail("Too many requests. Try again shortly.", 429);

  const parsed = await parseBody(req, developerProfileSchema);
  if (parsed.error) return parsed.error;

  const data = parsed.data;

  // Privacy: username uniqueness check against approved+pending profiles.
  const clash = await db.developers.find((d) => d.username.toLowerCase() === data.username.toLowerCase());
  if (clash) return fail("That username is taken.", 409, { username: ["That username is taken."] });

  const record = await db.developers.insert({
    ...data,
    // Privacy default: never expose email publicly unless opted in.
    showEmail: data.showEmail ?? false,
    status: "pending",
  });

  await sendEmail({
    to: data.email,
    subject: "Connexus — developer profile submitted",
    text: "Your Connexus developer profile has been submitted for moderation. You'll be notified once it's approved and publicly listed. — Ferrivox Ltd",
  });
  await sendEmail({
    to: adminNotifyEmail,
    subject: "[Connexus] New developer registration",
    text: `${data.name} (@${data.username}) — ${data.skills}`,
  });

  return ok({ id: record.id });
}

export async function GET() {
  const approved = await db.developers.list((d) => d.status === "approved");
  const publicProfiles = approved.map((d) => ({
    id: d.id,
    name: d.name,
    username: d.username,
    country: d.country,
    skills: d.skills,
    bio: d.bio,
    github: d.github,
    portfolio: d.portfolio,
    projects: d.projects,
    contributionAreas: d.contributionAreas,
    avatarUrl: d.avatarUrl,
    // Email only when the developer explicitly opted in.
    email: d.showEmail ? d.email : undefined,
  }));
  return ok(publicProfiles);
}
