import { NextResponse } from "next/server";
import { db } from "@/server/collections";
import { getAdminSession } from "@/server/auth";
import { audit } from "@/server/audit";
import { ok, fail } from "@/server/api-helpers";

/** Collections admins may manage via this endpoint. */
const MANAGED = {
  reviews: db.reviews,
  developers: db.developers,
  projects: db.developerProjects,
  pilots: db.pilotRequests,
  demos: db.demoRequests,
  contacts: db.contactRequests,
  earlyAccess: db.earlyAccess,
  newsletter: db.newsletter,
  comments: db.comments,
  content: db.content,
} as const;

type ManagedKey = keyof typeof MANAGED;

function isManaged(key: string): key is ManagedKey {
  return key in MANAGED;
}

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) return null;
  return session;
}

export async function GET(req: Request, { params }: { params: { collection: string } }) {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  const key = params.collection;
  if (!isManaged(key)) return fail("Unknown collection", 404);

  const items = await MANAGED[key].list();
  // Strip password material if any ever lands in a managed collection.
  return NextResponse.json({ ok: true, data: items });
}

export async function PATCH(req: Request, { params }: { params: { collection: string } }) {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  const key = params.collection;
  if (!isManaged(key)) return fail("Unknown collection", 404);

  let body: { id?: string; patch?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return fail("Invalid JSON");
  }
  if (!body.id || typeof body.patch !== "object" || body.patch === null) {
    return fail("Expected { id, patch }");
  }

  const updated = await MANAGED[key].update(body.id, body.patch as never);
  if (!updated) return fail("Not found", 404);

  await audit(session.email, `admin.${key}.update`, `id=${body.id} patch=${JSON.stringify(body.patch).slice(0, 200)}`);
  return ok(updated);
}

export async function DELETE(req: Request, { params }: { params: { collection: string } }) {
  const session = await requireAdmin();
  if (!session) return fail("Unauthorized", 401);
  const key = params.collection;
  if (!isManaged(key)) return fail("Unknown collection", 404);

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return fail("Missing id");

  const removed = await MANAGED[key].remove(id);
  if (!removed) return fail("Not found", 404);

  await audit(session.email, `admin.${key}.delete`, `id=${id}`);
  return ok({ deleted: true });
}
