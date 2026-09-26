"use client";

import { useEffect, useState } from "react";
import { SectionHeader, Reveal } from "@/components/motion/Reveal";

const steps = [
  { key: "connected", label: "CONNECTED", desc: "Everything syncs with the cloud in the background." },
  { key: "disconnected", label: "DISCONNECTED", desc: "The Internet drops. Most apps stop." },
  { key: "local", label: "LOCAL OPERATION", desc: "The Connexus network continues operating normally." },
  { key: "reconnected", label: "RECONNECTED", desc: "The Internet returns." },
  { key: "synchronized", label: "SYNCHRONIZED", desc: "Changes synchronize. Nothing was lost." },
] as const;

type StepKey = (typeof steps)[number]["key"];

export function OfflineFirst() {
  const [step, setStep] = useState<StepKey>("connected");
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep((cur) => {
        const idx = steps.findIndex((s) => s.key === cur);
        return steps[(idx + 1) % steps.length].key;
      });
    }, 2200);
    return () => clearInterval(id);
  }, [playing]);

  const activeIdx = steps.findIndex((s) => s.key === step);

  return (
    <section className="section-pad hairline">
      <div className="container-page">
        <SectionHeader
          eyebrow="OFFLINE-FIRST"
          title="Offline first. Online when useful."
          description="Watch what happens when the Internet disappears — and reappears."
        />

        <Reveal className="mt-14">
          <div className="glass mx-auto max-w-4xl rounded-3xl p-8 sm:p-10">
            {/* Timeline */}
            <ol className="relative flex flex-col gap-0 sm:flex-row sm:items-start sm:justify-between" aria-label="Offline-first timeline">
              <div aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-px bg-white/10 sm:left-2 sm:top-[7px] sm:h-px sm:w-[calc(100%-16px)]" />
              {steps.map((s, i) => {
                const done = i <= activeIdx;
                return (
                  <li key={s.key} className="relative flex gap-4 pb-6 sm:flex-1 sm:flex-col sm:gap-3 sm:pb-0">
                    <span
                      aria-hidden
                      className={`relative z-10 mt-0.5 inline-flex h-4 w-4 shrink-0 rounded-full border-2 sm:mt-0 ${
                        done ? "border-cyanx bg-cyanx" : "border-white/25 bg-ink"
                      }`}
                    />
                    <div>
                      <span className={`font-mono text-[11px] tracking-widest ${done ? "text-cyanx" : "text-graphite"}`}>
                        {s.label}
                      </span>
                      <p className={`mt-1 hidden text-xs leading-relaxed sm:block ${i === activeIdx ? "text-white" : "text-graphite/70"}`}>
                        {s.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Live status panel */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-ink-900/60 px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-graphite">SCENARIO · SIMULATED</span>
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  className="font-mono text-[11px] tracking-widest text-cyanx hover:underline"
                >
                  {playing ? "PAUSE" : "PLAY"}
                </button>
              </div>
              <p className="mt-3 text-lg font-semibold text-white">
                {steps[activeIdx].label.charAt(0) + steps[activeIdx].label.slice(1).toLowerCase()}
              </p>
              <p className="mt-1 text-sm text-graphite">{steps[activeIdx].desc}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
