import { ok } from "@/server/api-helpers";
import { sessionCookieName } from "@/server/auth";

export async function POST() {
  const res = ok({ loggedOut: true });
  res.cookies.set(sessionCookieName, "", { httpOnly: true, maxAge: 0, path: "/" });
  return res;
}
