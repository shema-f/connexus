import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Investors",
  description:
    "Connexus is an early-stage technology project under Ferrivox Ltd — building the infrastructure for offline-first digital services.",
  alternates: { canonical: "/investors" },
};

const revenueStreams = [
  "Hardware (Connexus Box)",
  "Enterprise software licensing",
  "SaaS and cloud synchronization services",
  "Deployment and support services",
  "Developer platform services",
  "Enterprise integrations",
];

export default function InvestorsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Investors", path: "/investors" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="INVESTORS & PARTNERSHIP"
          title="Building the infrastructure for offline-first digital services."
          description="Connexus is an early-stage technology project under Ferrivox Ltd. We share what's real: the vision, the architecture, the plan — not invented traction."
        />
        <section className="section-pad">
          <div className="container-page grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="glass h-full rounded-3xl p-8">
                <span className="tech-label-cyan">PLANNED REVENUE STREAMS</span>
                <ul className="mt-5 space-y-3">
                  {revenueStreams.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-graphite">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyanx" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-mono text-[10px] leading-relaxed tracking-[0.14em] text-graphite">
                  PLANNED · NOT YET OPERATING REVENUE. FIGURES WILL BE PUBLISHED ONLY WHEN REAL.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass h-full rounded-3xl p-8">
                <span className="tech-label-cyan">WHY THIS, WHY NOW</span>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-graphite">
                  <p>Connectivity remains uneven, expensive and fragile in much of the world. Software quietly assumes the opposite.</p>
                  <p>Connexus attacks that assumption at the infrastructure level — local services that keep working, with optional cloud when it helps.</p>
                  <p>The platform spans hardware, software and a developer ecosystem — built from Rwanda, designed for any market where connectivity can&apos;t be taken for granted.</p>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="container-page mt-14 text-center">
            <p className="mb-6 text-sm text-graphite">Interested in discussing investment or strategic partnership?</p>
            <Link href="/contact" className="btn-primary">Contact Ferrivox</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
