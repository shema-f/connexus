"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, Select, Checkbox, SubmitButton, FormMessage, postJson, type FormStatus } from "./FormField";

const DEMO_TYPES = [
  { value: "virtual", label: "Virtual demo" },
  { value: "technical", label: "Technical discussion" },
  { value: "organization-pilot", label: "Organization pilot discussion" },
  { value: "developer", label: "Developer discussion" },
];

export function DemoForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(undefined);
    const fd = new FormData(e.currentTarget);
    try {
      await postJson("/api/demo", {
        fullName: fd.get("fullName"),
        email: fd.get("email"),
        organization: fd.get("organization") || undefined,
        demoType: fd.get("demoType"),
        message: fd.get("message") || undefined,
        consent: fd.get("consent") === "on",
      });
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : undefined);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="fullName" required>
          <TextInput id="fullName" name="fullName" required autoComplete="name" />
        </Field>
        <Field label="Email" name="email" required>
          <TextInput id="email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Organization" name="organization">
          <TextInput id="organization" name="organization" />
        </Field>
        <Field label="Demo type" name="demoType" required>
          <Select id="demoType" name="demoType" options={DEMO_TYPES} />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Message" name="message">
          <TextArea id="message" name="message" placeholder="What would you like the demo to focus on?" />
        </Field>
      </div>
      <div className="mt-6">
        <Checkbox
          name="consent"
          required
          label={<>I agree that Ferrivox Ltd may store and process this information to arrange this demo request, as described in the <a href="/privacy" className="text-signal-300 underline">Privacy Policy</a>. No calendar slot is confirmed automatically.</>}
        />
      </div>
      <div className="mt-6">
        <FormMessage status={status} success="Thank you. Your demo request has been received — we'll contact you to arrange timing." error={error} />
      </div>
      <div className="mt-6">
        <SubmitButton status={status} label="Book a Connexus Demo" />
      </div>
    </form>
  );
}
