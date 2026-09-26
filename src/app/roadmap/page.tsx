import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import { FinalCta } from "@/components/home/FinalCta";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Connexus roadmap: research, prototype, pilot, platform and hardware stages. Dates shown only where officially committed.",
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Roadmap", path: "/roadmap" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="ROADMAP"
          title="From research to real infrastructure."
          description="Connexus moves in stages. We don't publish invented dates — stages are marked planned until officially committed."
        />
        <section className="section-pad">
          <div className="container-page max-w-4xl">
            <RoadmapTimeline />
            <p className="mt-10 text-center font-mono text-[11px] tracking-[0.18em] text-graphite">
              STATUS LABELS ARE MANAGED BY FERRIVOX AND UPDATED AS DEVELOPMENT PROGRESSES
            </p>
          </div>
        </section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
