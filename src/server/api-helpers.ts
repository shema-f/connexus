import { NextResponse } from "next/server";
import type { ZodSchema } from "zod";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init);
}

export function fail(message: string, status = 400, fields?: Record<string, string[]>) {
  return NextResponse.json({ ok: false, error: message, fields }, { status });
}

/** Parse and validate a JSON body against a Zod schema. */
export async function parseBody<T>(
  req: Request,
  schema: ZodSchema<T>
): Promise<{ data: T; error?: never } | { data?: never; error: NextResponse }> {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return { error: fail("Invalid JSON body") };
  }
  const result = schema.safeParse(json);
  if (!result.success) {
    const fields: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join(".") || "_";
      (fields[key] ??= []).push(issue.message);
    }
    return { error: fail("Validation failed", 422, fields) };
  }
  return { data: result.data };
}
