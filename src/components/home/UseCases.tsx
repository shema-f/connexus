import Link from "next/link";
import { SectionHeader, Reveal } from "@/components/motion/Reveal";

const cases = [
  { title: "Schools", desc: "Local learning environments, resources, announcements and assessments." },
  { title: "Universities", desc: "Campus applications and local communication." },
  { title: "Events", desc: "Schedules, maps, announcements and digital content." },
  { title: "Businesses", desc: "Private local communication and information systems." },
  { title: "Hotels", desc: "Local guest information and services." },
  { title: "Field Operations", desc: "Local data and communication where connectivity is intermittent." },
  { title: "Communities", desc: "Local digital services without requiring every interaction to reach the Internet." },
  { title: "Developers", desc: "Build applications that operate locally and synchronize when connectivity returns." },
];

export function UseCases() {
  return (
    <section className="section-pad hairline">
      <div className="container-page">
        <SectionHeader
          eyebrow="USE CASES"
          title="One local network. Many possibilities."
          description="These are directions we're exploring as we design Connexus — not deployments that exist today."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 0.06}>
              <div className="feature-card h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">{c.title}</h3>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] tracking-widest text-graphite">
                    POTENTIAL
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-graphite">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 text-center">
            <Link href="/use-cases" className="btn-secondary">See all use cases →</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
