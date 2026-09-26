"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, Select, Checkbox, SubmitButton, FormMessage, postJson, type FormStatus } from "./FormField";

const ORG_TYPES = [
  { value: "school", label: "School" },
  { value: "university", label: "University" },
  { value: "business", label: "Business" },
  { value: "hotel", label: "Hotel" },
  { value: "event", label: "Event" },
  { value: "ngo", label: "NGO" },
  { value: "developer", label: "Developer" },
  { value: "community", label: "Community" },
  { value: "other", label: "Other" },
];

const DEPLOYMENT = [
  { value: "local-only", label: "Fully local (no cloud)" },
  { value: "local-cloud", label: "Local + cloud sync" },
  { value: "undecided", label: "Not sure yet" },
];

const CONTACT_METHODS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "whatsapp", label: "WhatsApp" },
];

export function PilotForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(undefined);
    const fd = new FormData(e.currentTarget);
    try {
      await postJson("/api/pilot", {
        fullName: fd.get("fullName"),
        organization: fd.get("organization"),
        role: fd.get("role"),
        email: fd.get("email"),
        phone: fd.get("phone") || undefined,
        country: fd.get("country"),
        organizationType: fd.get("organizationType"),
        potentialUsers: fd.get("potentialUsers"),
        connectivity: fd.get("connectivity"),
        useCase: fd.get("useCase"),
        deploymentType: fd.get("deploymentType"),
        message: fd.get("message") || undefined,
        contactMethod: fd.get("contactMethod"),
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
        <Field label="Organization" name="organization" required>
          <TextInput id="organization" name="organization" required />
        </Field>
        <Field label="Role" name="role" required>
          <TextInput id="role" name="role" required />
        </Field>
        <Field label="Email" name="email" required>
          <TextInput id="email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Phone" name="phone">
          <TextInput id="phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field label="Country" name="country" required>
          <TextInput id="country" name="country" required />
        </Field>
        <Field label="Organization type" name="organizationType" required>
          <Select id="organizationType" name="organizationType" options={ORG_TYPES} />
        </Field>
        <Field label="Number of potential users" name="potentialUsers" required hint="Approximate is fine">
          <TextInput id="potentialUsers" name="potentialUsers" required placeholder="e.g. 200–500" />
        </Field>
      </div>

      <div className="mt-5 grid gap-5">
        <Field label="Current connectivity situation" name="connectivity" required>
          <TextArea id="connectivity" name="connectivity" required placeholder="Describe the Internet availability, reliability and cost in your environment…" />
        </Field>
        <Field label="What do you want to use Connexus for?" name="useCase" required>
          <TextArea id="useCase" name="useCase" required placeholder="Describe the services, content or applications you'd want running locally…" />
        </Field>
        <Field label="Preferred deployment type" name="deploymentType" required>
          <Select id="deploymentType" name="deploymentType" options={DEPLOYMENT} />
        </Field>
        <Field label="Message" name="message">
          <TextArea id="message" name="message" placeholder="Anything else we should know…" />
        </Field>
        <Field label="Preferred contact method" name="contactMethod" required>
          <Select id="contactMethod" name="contactMethod" options={CONTACT_METHODS} />
        </Field>
      </div>

      <div className="mt-6">
        <Checkbox
          name="consent"
          required
          label={<>I agree that Ferrivox Ltd may store and process this information to evaluate and follow up on this pilot request, as described in the <a href="/privacy" className="text-signal-300 underline">Privacy Policy</a>. Submitting does not confirm a pilot date.</>}
        />
      </div>
      <div className="mt-6">
        <FormMessage status={status} success="Thank you. Your pilot request has been received." error={error} />
      </div>
      <div className="mt-6">
        <SubmitButton status={status} label="Request a Pilot" />
      </div>
    </form>
  );
}
