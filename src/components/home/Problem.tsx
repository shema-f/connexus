"use client";

import { useState } from "react";
import { SectionHeader, Reveal } from "@/components/motion/Reveal";

const painPoints = [
  "Outages and congestion",
  "Expensive connectivity",
  "Remote environments",
  "Local network requirements",
  "Temporary loss of Internet access",
  "Situations where local data should remain local",
];

type Mode = "available" | "unavailable";

export function Problem() {
  const [mode, setMode] = useState<Mode>("available");

  return (
    <section id="problem" className="section-pad hairline">
      <div className="container-page">
        <SectionHeader
          eyebrow="THE PROBLEM"
          title="Connectivity shouldn't have a single point of failure."
          description="Modern applications assume constant Internet connectivity. Real organizations don't always have it — and some data shouldn't leave the building anyway."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setMode("available")}
            aria-pressed={mode === "available"}
            className={`rounded-full px-5 py-2 font-mono text-xs tracking-widest transition ${
              mode === "available" ? "bg-signal-500 text-white" : "glass text-graphite hover:text-white"
            }`}
          >
            INTERNET AVAILABLE
          </button>
          <button
            type="button"
            onClick={() => setMode("unavailable")}
            aria-pressed={mode === "unavailable"}
            className={`rounded-full px-5 py-2 font-mono text-xs tracking-widest transition ${
              mode === "unavailable" ? "bg-signal-500 text-white" : "glass text-graphite hover:text-white"
            }`}
          >
            INTERNET UNAVAILABLE
          </button>
        </div>

        <Reveal className="mt-10">
          <div className="glass relative mx-auto max-w-4xl overflow-hidden rounded-3xl p-8 sm:p-12">
            <div
              aria-hidden
              className={`absolute inset-0 transition-opacity duration-500 ${
                mode === "unavailable" ? "opacity-100" : "opacity-0"
              }`}
              style={{ background: "radial-gradient(600px 300px at 50% 40%, rgba(28,127,242,0.08), transparent)" }}
            />

            {mode === "available" ? (
              <div className="relative flex flex-col items-center gap-3 text-center">
                <Node label="INTERNET" sub="Cloud services" tone="cloud" />
                <Arrow active />
                <Node label="CONNEXUS" sub="Local infrastructure" tone="hub" />
                <Arrow active />
                <Node label="DEVICES" sub="Phones · laptops · sensors" tone="device" />
                <p className="mt-5 font-mono text-xs tracking-widest text-cyanx">EVERYTHING SYNCS</p>
              </div>
            ) : (
              <div className="relative flex flex-col items-center gap-3 text-center">
                <div className="relative">
                  <Node label="INTERNET" sub="Not reachable" tone="cloud" dim />
                  <span aria-hidden className="absolute left-1/2 top-1/2 h-px w-24 -translate-x-1/2 rotate-[-24deg] bg-red-400/80" />
                  <span aria-hidden className="absolute left-1/2 top-1/2 h-px w-24 -translate-x-1/2 rotate-[24deg] bg-red-400/80" />
                </div>
                <div className="my-1 font-mono text-[10px] tracking-widest text-red-300/80">— LINK DOWN —</div>
                <Node label="CONNEXUS BOX" sub="Local services keep running" tone="hub" pulse />
                <Arrow active />
                <Node label="LOCAL NETWORK" sub="Devices stay connected" tone="device" />
                <p className="mt-5 font-mono text-xs tracking-widest text-cyanx">LOCAL SERVICES CONTINUE OPERATING</p>
              </div>
            )}
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((p, i) => (
            <Reveal key={p} delay={i * 0.04}>
              <div className="glass rounded-xl px-4 py-3.5 text-sm text-graphite">{p}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Node({
  label,
  sub,
  tone,
  dim = false,
  pulse = false,
}: {
  label: string;
  sub: string;
  tone: "cloud" | "hub" | "device";
  dim?: boolean;
  pulse?: boolean;
}) {
  const toneCls =
    tone === "hub"
      ? "border-signal-400/50 bg-signal-500/10 shadow-glow-sm"
      : tone === "cloud"
        ? "border-white/15 bg-white/[0.04]"
        : "border-white/10 bg-white/[0.03]";
  return (
    <div className={`flex min-w-[240px] flex-col items-center rounded-2xl border px-8 py-5 ${toneCls} ${dim ? "opacity-40" : ""}`}>
      <span className={`text-sm font-bold tracking-[0.14em] ${dim ? "text-graphite" : "text-white"}`}>{label}</span>
      <span className="mt-1 text-xs text-graphite">{sub}</span>
      {pulse ? <span className="status-dot mt-2 bg-cyanx" /> : null}
    </div>
  );
}

function Arrow({ active }: { active: boolean }) {
  return (
    <div className={`h-6 w-px ${active ? "flow-line" : "bg-white/10"}`} style={{ width: 2, height: 26 }} aria-hidden />
  );
}
