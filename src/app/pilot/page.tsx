import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { PilotForm } from "@/components/forms/PilotForm";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request a Pilot",
  description:
    "Organizations can request a Connexus pilot — schools, universities, businesses, hotels, events, NGOs and communities. Pilots are evaluated as the platform matures.",
  alternates: { canonical: "/pilot" },
};

export default function PilotPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pilot", path: "/pilot" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="PILOT PROGRAM"
          title="Want to test Connexus?"
          description="Tell us about your organization and environment. We review every request and contact promising candidates to scope a pilot — submitting does not confirm a pilot date."
        />
        <section className="section-pad">
          <div className="container-page grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <PilotForm />
            <aside className="space-y-4">
              <div className="glass rounded-2xl p-6">
                <span className="tech-label-cyan">WHAT TO EXPECT</span>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-graphite">
                  <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyanx" />Ferrivox reviews your request and responds by your preferred contact method.</li>
                  <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyanx" />Shortlisted organizations get a scoping conversation — needs, environment, timeline.</li>
                  <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyanx" />Selected pilots receive prototype hardware and support as availability allows.</li>
                  <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyanx" />Your data is stored securely and never shared, per the <a href="/privacy" className="text-signal-300 underline">Privacy Policy</a>.</li>
                </ul>
              </div>
              <div className="glass rounded-2xl p-6">
                <span className="tech-label-cyan">GOOD TO KNOW</span>
                <p className="mt-4 text-sm leading-relaxed text-graphite">
                  Connexus is in development. Pilot deployments use prototype equipment and planned
                  capabilities — scope and features may evolve during the pilot.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
