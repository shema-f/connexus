import { db } from "./collections";

/** Record an audit trail entry for sensitive actions. */
export async function audit(actor: string, action: string, detail: string) {
  await db.audit.insert({ actor, action, detail } as never);
}
