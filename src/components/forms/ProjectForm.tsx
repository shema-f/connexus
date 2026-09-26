"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, Select, Checkbox, SubmitButton, FormMessage, postJson, type FormStatus } from "./FormField";

const STATUSES = [
  { value: "prototype", label: "Prototype" },
  { value: "experimental", label: "Experimental" },
  { value: "in-development", label: "In Development" },
  { value: "beta", label: "Beta" },
  { value: "released", label: "Released" },
];

export function ProjectForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(undefined);
    const fd = new FormData(e.currentTarget);
    try {
      await postJson("/api/developers/projects", {
        projectName: fd.get("projectName"),
        description: fd.get("description"),
        repoUrl: fd.get("repoUrl"),
        website: fd.get("website") || undefined,
        technologies: fd.get("technologies"),
        integration: fd.get("integration"),
        license: fd.get("license") || undefined,
        developerName: fd.get("developerName"),
        email: fd.get("email"),
        status: fd.get("status"),
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
        <Field label="Project name" name="projectName" required>
          <TextInput id="projectName" name="projectName" required />
        </Field>
        <Field label="Status" name="status" required>
          <Select id="status" name="status" options={STATUSES} />
        </Field>
        <Field label="GitHub repository" name="repoUrl" required>
          <TextInput id="repoUrl" name="repoUrl" type="url" required placeholder="https://github.com/…" />
        </Field>
        <Field label="Website" name="website">
          <TextInput id="website" name="website" type="url" placeholder="https://…" />
        </Field>
        <Field label="Developer / team" name="developerName" required>
          <TextInput id="developerName" name="developerName" required />
        </Field>
        <Field label="Contact email" name="email" required hint="For moderation questions only — not published">
          <TextInput id="email" name="email" type="email" required />
        </Field>
        <Field label="Technologies" name="technologies" required hint="Comma separated">
          <TextInput id="technologies" name="technologies" required placeholder="React, Go, WebRTC…" />
        </Field>
        <Field label="License" name="license">
          <TextInput id="license" name="license" placeholder="MIT, Apache-2.0…" />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Description" name="description" required>
          <TextArea id="description" name="description" required placeholder="What does the project do?" />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Connexus integration" name="integration" required hint="How does it use or plan to use Connexus?">
          <TextArea id="integration" name="integration" required />
        </Field>
      </div>

      <div className="mt-6">
        <Checkbox
          name="consent"
          required
          label={<>I agree that Ferrivox Ltd may store and process this information. Projects are reviewed before public listing, as described in the <a href="/privacy" className="text-signal-300 underline">Privacy Policy</a> and <a href="/developer-terms" className="text-signal-300 underline">Developer Terms</a>.</>}
        />
      </div>
      <div className="mt-6">
        <FormMessage status={status} success="Thank you. Your project has been submitted for moderation review." error={error} />
      </div>
      <div className="mt-6">
        <SubmitButton status={status} label="Submit Project" />
      </div>
    </form>
  );
}
