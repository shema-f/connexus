"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionHeader, Reveal } from "@/components/motion/Reveal";
import { Hero3DLazy } from "@/components/three/Hero3DLazy";

const hotspots = [
  { id: 1, title: "Local compute", desc: "On-board processing for local services and edge workloads." },
  { id: 2, title: "Storage", desc: "Local storage for content, messages and application data." },
  { id: 3, title: "Network connectivity", desc: "Wired and wireless uplink to the wider network when available." },
  { id: 4, title: "Device connectivity", desc: "Local Wi-Fi and direct links for nearby devices." },
  { id: 5, title: "Local services", desc: "Messaging, content, apps and file transfer — running locally." },
  { id: 6, title: "Optional cloud sync", desc: "Synchronization with cloud services when the Internet allows." },
  { id: 7, title: "Security", desc: "Encrypted communication and authenticated devices by design." },
];

export function ConnexusBoxSection() {
  const [active, setActive] = useState(1);

  return (
    <section className="section-pad hairline">
      <div className="container-page">
        <SectionHeader
          eyebrow="CONNEXUS BOX"
          title="Meet the Connexus Box."
          description="A small box with a bigger idea. The Connexus Box is our hardware concept for running Connexus services locally."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -top-3 left-4 z-10 rounded-full border border-cyanx/30 bg-ink-900/90 px-3 py-1 font-mono text-[10px] tracking-widest text-cyanx">
                CONCEPT HARDWARE
              </div>
              <Hero3DLazy />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <ol className="space-y-2" role="list">
                {hotspots.map((h) => (
                  <li key={h.id}>
                    <button
                      type="button"
                      onClick={() => setActive(h.id)}
                      aria-pressed={active === h.id}
                      className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                        active === h.id
                          ? "border-signal-400/50 bg-signal-500/10"
                          : "border-white/8 bg-white/[0.02] hover:border-white/20"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs text-cyanx">{String(h.id).padStart(2, "0")}</span>
                        <span className="text-sm font-semibold text-white">{h.title}</span>
                      </span>
                      {active === h.id ? (
                        <span className="mt-2 block pl-8 text-sm leading-relaxed text-graphite">{h.desc}</span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/connexus-box" className="btn-secondary">Full Box overview</Link>
                <Link href="/pilot" className="btn-ghost">Request a pilot →</Link>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <p className="mt-12 text-center font-mono text-[11px] tracking-[0.16em] text-graphite">
            HARDWARE SPECIFICATIONS ARE SUBJECT TO CHANGE AS DEVELOPMENT CONTINUES
          </p>
        </Reveal>
      </div>
    </section>
  );
}
