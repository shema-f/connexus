"use client";

import { useState } from "react";
import { Field, TextInput, TextArea, Checkbox, SubmitButton, FormMessage, postJson, type FormStatus } from "./FormField";

export function ReviewForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string>();
  const [rating, setRating] = useState(5);
  const [wouldPilot, setWouldPilot] = useState(true);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(undefined);
    const fd = new FormData(e.currentTarget);
    try {
      await postJson("/api/reviews", {
        name: fd.get("name"),
        email: fd.get("email"),
        country: fd.get("country"),
        role: fd.get("role"),
        rating,
        review: fd.get("review"),
        wants: fd.get("wants"),
        wouldPilot,
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
        <Field label="Country" name="country" required>
          <TextInput id="country" name="country" required />
        </Field>
        <Field label="Role" name="role" required>
          <TextInput id="role" name="role" required placeholder="Teacher, developer, student…" />
        </Field>
      </div>

      <div className="mt-5">
        <span className="field-label">Rating</span>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onClick={() => setRating(n)}
              className={`text-2xl transition-colors ${n <= rating ? "text-cyanx" : "text-white/20 hover:text-white/40"}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <Field label="Your review" name="review" required>
          <TextArea id="review" name="review" required placeholder="What do you think about the Connexus concept?" />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="What do you want Connexus to solve?" name="wants" required>
          <TextArea id="wants" name="wants" required placeholder="Tell us the problem that matters most in your context…" />
        </Field>
      </div>

      <div className="mt-5">
        <label className="flex items-center gap-3 text-sm text-graphite">
          <input
            type="checkbox"
            checked={wouldPilot}
            onChange={(e) => setWouldPilot(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-ink-800 accent-signal-500"
          />
          We would like to pilot Connexus when it&apos;s ready
        </label>
      </div>

      <div className="mt-6">
        <Checkbox
          name="consent"
          required
          label={<>I agree that Ferrivox Ltd may store this feedback. Reviews are moderated before any publication and are never published automatically, as described in the <a href="/privacy" className="text-signal-300 underline">Privacy Policy</a>.</>}
        />
      </div>
      <div className="mt-6">
        <FormMessage status={status} success="Thank you for the feedback. Reviews are reviewed by our team before publication." error={error} />
      </div>
      <div className="mt-6">
        <SubmitButton status={status} label="Share Feedback" />
      </div>
    </form>
  );
}
