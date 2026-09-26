import { NextResponse } from "next/server";
import { db } from "@/server/collections";
import { ensureDefaultAdmin, verifyPassword, createSessionToken, sessionCookieName, sessionMaxAge } from "@/server/auth";
import { ok, fail, parseBody } from "@/server/api-helpers";
import { rateLimit, clientIp } from "@/server/rate-limit";
import { z } from "zod";
import { audit } from "@/server/audit";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const limited = rateLimit(`admin-login:${clientIp(req)}`, 5, 5 * 60_000);
  if (!limited.ok) return fail("Too many attempts. Try again in a few minutes.", 429);

  await ensureDefaultAdmin();

  const parsed = await parseBody(req, loginSchema);
  if (parsed.error) return parsed.error;

  const email = parsed.data.email.toLowerCase();
  const admin = await db.admins.find((a) => a.email === email);
  if (!admin || !verifyPassword(parsed.data.password, admin.passwordHash)) {
    return fail("Invalid credentials", 401);
  }

  await audit(email, "admin.login", "Successful login");

  const res = ok({ email: admin.email, role: admin.role });
  res.cookies.set(sessionCookieName, createSessionToken(admin.email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionMaxAge,
    path: "/",
  });
  return res;
}
