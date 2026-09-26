import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { UseCases } from "@/components/home/UseCases";
import { FinalCta } from "@/components/home/FinalCta";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Potential Connexus use cases: schools, universities, events, businesses, hotels, field operations, communities and developers.",
  alternates: { canonical: "/use-cases" },
};

const scenarios = [
  {
    title: "A school after the fiber cut",
    body: "Lessons, quizzes and announcements keep working from a local Connexus environment while the upstream link is down. When connectivity returns, results sync out.",
    tag: "POTENTIAL USE CASE",
  },
  {
    title: "A campus hackathon",
    body: "Hundreds of devices share schedules, maps, docs and project files over local links — without depending on venue Wi-Fi reaching the Internet.",
    tag: "POTENTIAL USE CASE",
  },
  {
    title: "A hotel that owns its guest network",
    body: "Guest information, menus and services served from a local box. Guest data stays on the property.",
    tag: "POTENTIAL USE CASE",
  },
  {
    title: "A field team in a remote area",
    body: "Data collected in the field persists locally and synchronizes whenever a connection becomes available.",
    tag: "POTENTIAL USE CASE",
  },
];

export default function UseCasesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Use Cases", path: "/use-cases" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="USE CASES"
          title="Where offline-first matters."
          description="Every scenario below is a direction we're exploring — potential use cases, not deployments that exist today."
        />
        <UseCases />
        <section className="section-pad hairline">
          <div className="container-page grid gap-4 sm:grid-cols-2">
            {scenarios.map((s) => (
              <div key={s.title} className="feature-card">
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[9px] tracking-widest text-graphite">{s.tag}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
