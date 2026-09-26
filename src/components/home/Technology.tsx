import Link from "next/link";
import { SectionHeader, Reveal } from "@/components/motion/Reveal";

const layers = [
  { name: "DEVICE LAYER", desc: "Phones, laptops, tablets and embedded devices connecting over local links." },
  { name: "CONNECTION LAYER", desc: "Wi-Fi Direct, local Wi-Fi, Wi-Fi Aware where supported, Bluetooth/BLE where appropriate, TCP/IP." },
  { name: "CONNEXUS PROTOCOL", desc: "Local service discovery, encrypted communication and store-and-forward messaging." },
  { name: "LOCAL SERVICES", desc: "Local databases, local APIs, content delivery and edge computing." },
  { name: "SYNC ENGINE", desc: "Conflict-aware synchronization designed for intermittent connectivity." },
  { name: "CLOUD SERVICES", desc: "Optional cloud synchronization, management and developer services." },
];

export function Technology() {
  return (
    <section className="section-pad hairline">
      <div className="container-page">
        <SectionHeader
          eyebrow="TECHNOLOGY"
          title="Built as infrastructure, not just an app."
          description="A layered architecture: devices connect over local links, the Connexus protocol handles discovery and delivery, and optional cloud services synchronize when connectivity allows."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          {layers.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.05}>
              <div className="group relative mb-3">
                <div className="glass flex flex-col gap-1 rounded-xl px-6 py-5 transition-colors group-hover:border-signal-400/40 sm:flex-row sm:items-center sm:gap-6">
                  <span className="w-44 shrink-0 font-mono text-xs tracking-[0.16em] text-cyanx">{l.name}</span>
                  <span className="text-sm leading-relaxed text-graphite">{l.desc}</span>
                </div>
                {i < layers.length - 1 ? (
                  <div aria-hidden className="absolute -bottom-3 left-1/2 h-3 w-px bg-white/15" />
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 text-center">
            <Link href="/technology" className="btn-secondary">Explore the Technology →</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
