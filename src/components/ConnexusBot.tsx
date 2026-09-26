"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/brand/LogoMark";

type Msg = { role: "user" | "assistant"; content: string; suggestions?: string[] };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm the Connexus Bot — a little local assistant, no internet required. Ask me anything about Connexus.",
  suggestions: [
    "What is Connexus?",
    "Does it work without internet?",
    "What is the Connexus Box?",
    "How can developers build on it?",
    "How do I request a pilot?",
    "Is Connexus available now?",
  ],
};

export function ConnexusBot() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [unread, setUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, busy]);

  // Nudge users toward the bot once per session.
  useEffect(() => {
    const t = setTimeout(() => setUnread(true), 12_000);
    return () => clearTimeout(t);
  }, []);

  // The admin dashboard gets its own focused chrome — no marketing bot there.
  // (Checked after all hooks so hook order stays stable across navigation.)
  if (pathname?.startsWith("/admin")) return null;

  async function send(text: string) {
    const message = text.trim();
    if (!message || busy) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", content: message }]);
    setBusy(true);

    try {
      const history = messages.slice(-6).map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });
      const json = await res.json();
      const reply = json?.ok ? json.data : null;
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: reply?.reply ?? "Something went wrong on my side — please try again, or use the Contact page.",
          suggestions: reply?.suggestions ?? [],
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "I couldn't reach my brain just now (ironic, I know). Please try again in a moment.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setUnread(false);
        }}
        aria-expanded={open}
        aria-label={open ? "Close Connexus Bot chat" : "Open Connexus Bot chat"}
        className="fixed bottom-5 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full border border-signal-400/40 bg-ink-900/95 shadow-glow transition hover:border-signal-300 hover:shadow-glow-sm"
      >
        {open ? (
          <span aria-hidden className="text-lg text-white">✕</span>
        ) : (
          <>
            <LogoMark className="h-7 w-7" />
            {unread ? <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-ink bg-cyanx" /> : null}
          </>
        )}
      </button>

      {/* Panel */}
      {open ? (
        <div
          className="glass-strong fixed bottom-24 right-5 z-[80] flex h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl"
          role="dialog"
          aria-label="Connexus Bot chat"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-signal-400/40 bg-signal-500/10">
              <LogoMark className="h-5 w-5" />
              <span className="status-dot absolute -bottom-0.5 -right-0.5 bg-cyanx" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white">Connexus Bot</p>
              <p className="font-mono text-[10px] tracking-widest text-cyanx">● LOCAL · ONLINE</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={`max-w-[85%] ${m.role === "user" ? "text-right" : ""}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-signal-500 text-white"
                        : "rounded-bl-md border border-white/10 bg-white/[0.04] text-white/90"
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.suggestions && m.suggestions.length > 0 && i === messages.length - 1 ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => send(s)}
                          className="rounded-full border border-signal-400/30 bg-signal-500/10 px-3 py-1.5 text-xs text-signal-200 transition hover:border-signal-400/60 hover:text-white"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            {busy ? (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyanx"
                      style={{ animationDelay: `${d * 0.18}s` }}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Input */}
          <form
            className="border-t border-white/10 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Connexus…"
                aria-label="Message the Connexus Bot"
                className="field-input !py-2.5"
                maxLength={500}
              />
              <button
                type="submit"
                disabled={busy || input.trim().length === 0}
                aria-label="Send message"
                className="btn-primary !px-3.5 !py-2.5"
              >
                →
              </button>
            </div>
            <p className="mt-2 px-1 font-mono text-[9px] tracking-widest text-graphite">
              RUNS LOCALLY · ANSWERS FROM THE CONNEXUS KNOWLEDGE BASE
            </p>
          </form>
        </div>
      ) : null}
    </>
  );
}
