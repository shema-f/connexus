"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, Select, Checkbox, SubmitButton, FormMessage, postJson, type FormStatus } from "./FormField";

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "partnership", label: "Partnership" },
  { value: "developer", label: "Developer" },
  { value: "pilot", label: "Pilot" },
  { value: "investment", label: "Investment" },
  { value: "media", label: "Media" },
];

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(undefined);
    const fd = new FormData(e.currentTarget);
    try {
      await postJson("/api/contact", {
        name: fd.get("name"),
        email: fd.get("email"),
        category: fd.get("category"),
        message: fd.get("message"),
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
        <Field label="Name" name="name" required>
          <TextInput id="name" name="name" required autoComplete="name" />
        </Field>
        <Field label="Email" name="email" required>
          <TextInput id="email" name="email" type="email" required autoComplete="email" />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Category" name="category" required>
          <Select id="category" name="category" options={CATEGORIES} />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Message" name="message" required>
          <TextArea id="message" name="message" required placeholder="How can we help?" />
        </Field>
      </div>
      <div className="mt-6">
        <Checkbox
          name="consent"
          required
          label={<>I agree that Ferrivox Ltd may store and process this information to respond to my message, as described in the <a href="/privacy" className="text-signal-300 underline">Privacy Policy</a>.</>}
        />
      </div>
      <div className="mt-6">
        <FormMessage status={status} success="Thank you. Your message has been received." error={error} />
      </div>
      <div className="mt-6">
        <SubmitButton status={status} label="Send Message" />
      </div>
    </form>
  );
}
