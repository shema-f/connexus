"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, Checkbox, SubmitButton, FormMessage, postJson, type FormStatus } from "./FormField";

export function DeveloperForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(undefined);
    const fd = new FormData(e.currentTarget);
    try {
      await postJson("/api/developers", {
        name: fd.get("name"),
        username: fd.get("username"),
        email: fd.get("email"),
        country: fd.get("country"),
        organization: fd.get("organization") || undefined,
        github: fd.get("github") || undefined,
        portfolio: fd.get("portfolio") || undefined,
        skills: fd.get("skills"),
        bio: fd.get("bio") || undefined,
        avatarUrl: fd.get("avatarUrl") || undefined,
        projects: fd.get("projects") || undefined,
        contributionAreas: fd.get("contributionAreas") || undefined,
        showEmail: fd.get("showEmail") === "on",
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
        <Field label="Username" name="username" required hint="Letters, numbers, dashes, underscores">
          <TextInput id="username" name="username" required pattern="[a-zA-Z0-9_\-]{3,40}" />
        </Field>
        <Field label="Email" name="email" required hint="Not shown publicly by default">
          <TextInput id="email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Country" name="country" required>
          <TextInput id="country" name="country" required />
        </Field>
        <Field label="Organization" name="organization">
          <TextInput id="organization" name="organization" />
        </Field>
        <Field label="GitHub username" name="github">
          <TextInput id="github" name="github" placeholder="octocat" />
        </Field>
        <Field label="Portfolio URL" name="portfolio">
          <TextInput id="portfolio" name="portfolio" type="url" placeholder="https://…" />
        </Field>
        <Field label="Profile image URL" name="avatarUrl">
          <TextInput id="avatarUrl" name="avatarUrl" type="url" placeholder="https://…" />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Skills" name="skills" required hint="Comma separated">
          <TextInput id="skills" name="skills" required placeholder="Go, Kotlin, React, Networking" />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Short bio" name="bio">
          <TextArea id="bio" name="bio" placeholder="A few sentences about you…" />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Projects" name="projects" hint="Comma separated — past or current work">
          <TextInput id="projects" name="projects" placeholder="Offline messaging prototype, mesh chat…" />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Contribution areas" name="contributionAreas" hint="Where you'd like to help">
          <TextInput id="contributionAreas" name="contributionAreas" placeholder="SDK, protocol, docs, hardware testing…" />
        </Field>
      </div>

      <div className="mt-6 space-y-3">
        <Checkbox name="showEmail" label="Show my email address on my public profile" />
        <Checkbox
          name="consent"
          required
          label={<>I agree that Ferrivox Ltd may store and process this information. Profiles are reviewed before becoming publicly listed, as described in the <a href="/privacy" className="text-signal-300 underline">Privacy Policy</a>.</>}
        />
      </div>
      <div className="mt-6">
        <FormMessage status={status} success="Thank you. Your developer profile has been submitted for moderation." error={error} />
      </div>
      <div className="mt-6">
        <SubmitButton status={status} label="Create Developer Profile" />
      </div>
    </form>
  );
}
