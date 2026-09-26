import Link from "next/link";
import { SectionHeader, Reveal } from "@/components/motion/Reveal";

const blocks = [
  { name: "CONNEXUS SDK", desc: "Build offline-first applications with planned libraries and tools." },
  { name: "CONNEXUS API", desc: "Local APIs for services, messaging and data exchange." },
  { name: "CONNEXUS PROTOCOL", desc: "Service discovery and encrypted local communication." },
  { name: "CONNEXUS HUB", desc: "Management and synchronization endpoint for deployments." },
  { name: "CONNEXUS EDGE", desc: "Edge runtime for running your code close to users." },
];

const capabilities = [
  "Discover local services",
  "Send messages",
  "Exchange data",
  "Synchronize data",
  "Store local data",
  "Communicate with Connexus Hub",
  "Build offline-first applications",
  "Build plugins & integrate existing apps",
];

export function Developers() {
  return (
    <section className="section-pad hairline">
      <div className="container-page">
        <SectionHeader
          eyebrow="DEVELOPER PLATFORM"
          title="Developers, build with us."
          description="Connexus is intended to become more than a product. We want developers to build applications on top of the Connexus platform."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {blocks.map((b, i) => (
              <Reveal key={b.name} delay={i * 0.05}>
                <div className="feature-card h-full">
                  <span className="font-mono text-xs tracking-[0.16em] text-cyanx">{b.name}</span>
                  <p className="mt-2.5 text-sm leading-relaxed text-graphite">{b.desc}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <div className="glass flex h-full min-h-[120px] flex-col justify-center rounded-2xl border-dashed p-6 text-center">
                <span className="font-mono text-[11px] tracking-widest text-graphite">DOCS · COMING SOON</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="glass h-full rounded-3xl p-7">
              <h3 className="text-sm font-bold tracking-[0.14em] text-white">PLANNED CAPABILITIES</h3>
              <ul className="mt-5 space-y-3">
                {capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-graphite">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyanx" />
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3">
                <Link href="/developers" className="btn-primary">Developer Preview</Link>
                <Link href="/developers" className="btn-secondary">Join Developer Community</Link>
                <Link href="/developers/projects" className="btn-ghost">Submit Your Project →</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
