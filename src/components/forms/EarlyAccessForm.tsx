"use client";

import { useState } from "react";
import { Field, TextInput, Select, Checkbox, SubmitButton, FormMessage, postJson, type FormStatus } from "./FormField";

const INTERESTS = [
  { value: "use", label: "I want to use Connexus" },
  { value: "test", label: "I want to test Connexus" },
  { value: "developer", label: "I am a developer" },
  { value: "invest", label: "I want to invest/partner" },
  { value: "organization", label: "I represent an organization" },
  { value: "contribute", label: "I want to contribute" },
  { value: "updates", label: "I want product updates" },
];

export function EarlyAccessForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(undefined);
    const fd = new FormData(e.currentTarget);
    try {
      await postJson("/api/early-access", {
        email: fd.get("email"),
        country: fd.get("country"),
        role: fd.get("role"),
        interest: fd.get("interest"),
        consent: fd.get("consent") === "on",
      });
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : undefined);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-7 sm:p-9" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" name="email" required>
          <TextInput id="email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
        </Field>
        <Field label="Country" name="country" required>
          <TextInput id="country" name="country" required placeholder="Rwanda" />
        </Field>
        <Field label="Role" name="role" required>
          <TextInput id="role" name="role" required placeholder="Teacher, engineer, founder…" />
        </Field>
        <Field label="Interest" name="interest" required>
          <Select id="interest" name="interest" options={INTERESTS} defaultValue="use" />
        </Field>
      </div>
      <div className="mt-6">
        <Checkbox
          name="consent"
          required
          label={<>I agree that Ferrivox Ltd may store and process this information to contact me about Connexus, as described in the <a href="/privacy" className="text-signal-300 underline">Privacy Policy</a>.</>}
        />
      </div>
      <div className="mt-6">
        <FormMessage status={status} success="You're on the list. Thank you — we'll be in touch as Connexus develops." error={error} />
      </div>
      <div className="mt-6">
        <SubmitButton status={status} label="Join Early Access" />
      </div>
    </form>
  );
}
