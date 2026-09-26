"use client";

import { useState, type ReactNode } from "react";

export function Field({
  label,
  name,
  required,
  hint,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label} {required ? <span className="text-signal-400">*</span> : <span className="text-graphite">(optional)</span>}
      </label>
      {hint ? <p className="mb-1.5 text-xs text-graphite">{hint}</p> : null}
      {children}
    </div>
  );
}

export const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`field-input ${props.className ?? ""}`} />
);

export const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className={`field-input ${props.className ?? ""}`} />
);

export function Select({
  name,
  options,
  ...props
}: { name: string; options: { value: string; label: string }[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select id={name} name={name} {...props} className="field-input">
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Checkbox({
  name,
  label,
  required,
}: {
  name: string;
  label: ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <input
        id={name}
        name={name}
        type="checkbox"
        required={required}
        className="mt-1 h-4 w-4 rounded border-white/20 bg-ink-800 accent-signal-500"
      />
      <label htmlFor={name} className="text-sm leading-relaxed text-graphite">
        {label}
      </label>
    </div>
  );
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

export function SubmitButton({ status, label }: { status: FormStatus; label: string }) {
  return (
    <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "submitting"}>
      {status === "submitting" ? "Submitting…" : label}
    </button>
  );
}

export function FormMessage({ status, success, error }: { status: FormStatus; success: string; error?: string }) {
  if (status === "success") {
    return (
      <p role="status" className="rounded-lg border border-cyanx/30 bg-cyanx/10 px-4 py-3 text-sm text-cyanx">
        {success}
      </p>
    );
  }
  if (status === "error") {
    return (
      <p role="alert" className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
        {error ?? "Something went wrong. Please try again."}
      </p>
    );
  }
  return null;
}

/** Tiny helper to post JSON and normalize the envelope. */
export async function postJson(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  if (!res.ok || !json.ok) throw new Error(json.error ?? "Request failed");
}
