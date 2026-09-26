import Link from "next/link";
import { SectionHeader, Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site-config";

export function Ecosystem() {
  return (
    <>
      {/* Ishami integration — concept */}
      <section className="section-pad hairline">
        <div className="container-page">
          <SectionHeader
            eyebrow="FERRIVOX ECOSYSTEM · ISHAMI"
            title="Built to power Ferrivox products."
            description="Connexus is being designed as infrastructure that could eventually support Ferrivox products such as Ishami and other applications."
          />

          <Reveal className="mt-12">
            <div className="glass mx-auto max-w-4xl rounded-3xl p-8 sm:p-10">
              <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-0">
                <FlowPill label="CONNEXUS" accent />
                <FlowArrow />
                <FlowPill label="LOCAL INFRASTRUCTURE" />
                <FlowArrow />
                <FlowPill label="ISHAMI" />
                <FlowArrow />
                <FlowPill label="EDUCATION / TRAINING" />
              </div>

              <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-graphite">
                Imagine a driving school accessing traffic-rule lessons, quizzes, resources and other
                digital services locally through a Connexus environment.
              </p>
              <p className="mt-6 text-center font-mono text-[10px] tracking-[0.2em] text-graphite">
                CONCEPT / FUTURE INTEGRATION — NOT YET IMPLEMENTED
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ferrivox ecosystem */}
      <section className="section-pad hairline">
        <div className="container-page">
          <SectionHeader
            eyebrow="FERRIVOX LTD"
            title="One company. Multiple technologies."
            description={`Ferrivox Ltd is a technology company developing AI, data and software solutions. "${siteConfig.company.slogan}"`}
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.ecosystem.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 0.06}>
                <div
                  className={`feature-card h-full ${p.flagship ? "border-signal-400/40 bg-signal-500/[0.07] shadow-glow-sm" : ""}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-bold tracking-[0.14em] text-white">{p.name}</h3>
                    {p.flagship ? (
                      <span className="rounded-full bg-signal-500/20 px-2.5 py-0.5 font-mono text-[9px] tracking-widest text-cyanx">
                        INFRASTRUCTURE
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm text-graphite">{p.kind}</p>
                  {p.href ? (
                    <Link href={p.href} className="mt-4 inline-block text-xs font-semibold text-signal-300 hover:text-signal-200">
                      Learn more →
                    </Link>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 text-center font-mono text-[11px] tracking-[0.16em] text-graphite">
              SOME FERRIVOX PROJECTS ARE UNDER ACTIVE DEVELOPMENT
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function FlowPill({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <span
      className={`rounded-full border px-5 py-2.5 font-mono text-[11px] tracking-[0.16em] ${
        accent ? "border-signal-400/50 bg-signal-500/15 text-white" : "border-white/12 bg-white/[0.03] text-graphite"
      }`}
    >
      {label}
    </span>
  );
}

function FlowArrow() {
  return (
    <span aria-hidden className="my-1 block h-6 w-px flow-line sm:my-0 sm:h-px sm:w-8" />
  );
}
