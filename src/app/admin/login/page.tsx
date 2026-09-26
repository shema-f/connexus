"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(undefined);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: fd.get("email"), password: fd.get("password") }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(json.error ?? "Login failed");
      setBusy(false);
    }
  }

  return (
    <main id="main" className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={onSubmit} className="glass w-full max-w-sm rounded-3xl p-8">
        <span className="tech-label-cyan">CONNEXUS ADMIN</span>
        <h1 className="mt-3 text-2xl font-bold text-white">Sign in</h1>
        {error ? (
          <p role="alert" className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        ) : null}
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="field-label">Email</label>
            <input id="email" name="email" type="email" required className="field-input" autoComplete="username" />
          </div>
          <div>
            <label htmlFor="password" className="field-label">Password</label>
            <input id="password" name="password" type="password" required className="field-input" autoComplete="current-password" />
          </div>
        </div>
        <button type="submit" className="btn-primary mt-6 w-full" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <p className="mt-4 text-center font-mono text-[10px] tracking-widest text-graphite">
          AUTHORIZED PERSONNEL ONLY
        </p>
      </form>
    </main>
  );
}
