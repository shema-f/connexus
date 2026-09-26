import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { db } from "./collections";

const SESSION_COOKIE = "cx_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function secret(): string {
  return process.env.AUTH_SECRET ?? "dev-only-insecure-secret";
}

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")): string {
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSessionToken(email: string): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `${email}|${exp}`;
  return `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
}

export function readSessionToken(token: string): { email: string } | null {
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;
  const payload = Buffer.from(encoded, "base64url").toString("utf8");
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const [email, exp] = payload.split("|");
  if (!email || !exp || Number(exp) < Date.now()) return null;
  return { email };
}

/** Ensure the default admin exists (credentials come from env). */
export async function ensureDefaultAdmin() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@ferrivox.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "change-me-strong-password";
  const existing = await db.admins.find((a) => a.email === email);
  if (!existing) {
    await db.admins.insert({
      email,
      passwordHash: hashPassword(password),
      role: "super-admin",
    } as never);
  }
}

export async function getAdminSession(): Promise<{ email: string; role: string } | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = readSessionToken(token);
  if (!session) return null;
  const admin = await db.admins.find((a) => a.email === session.email);
  if (!admin) return null;
  return { email: admin.email, role: admin.role };
}

export const sessionCookieName = SESSION_COOKIE;
export const sessionMaxAge = SESSION_TTL_MS / 1000;
