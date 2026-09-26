import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with Ferrivox on Connexus — schools, technology companies, hardware manufacturers, developers, research institutions, NGOs and infrastructure providers.",
  alternates: { canonical: "/partners" },
};

const partnerTypes = [
  { title: "Schools & Universities", desc: "Pilot local learning environments and campus services." },
  { title: "Technology Companies", desc: "Integrate products with offline-first local infrastructure." },
  { title: "Hardware Manufacturers", desc: "Explore the Connexus Box hardware concept together." },
  { title: "Developers", desc: "Build the SDK, tools and ecosystem applications." },
  { title: "Research Institutions", desc: "Study local networks, edge computing and adoption." },
  { title: "NGOs & Organizations", desc: "Deploy local digital services where connectivity fails." },
  { title: "Infrastructure Providers", desc: "Extend last-mile connectivity with local caching and services." },
];

export default function PartnersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Partners", path: "/partners" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="PARTNERSHIPS"
          title="Build the offline-first layer with us."
          description="Connexus will need hardware partners, research partners, deployment partners and developers. If that's you, we'd like to talk."
        />
        <section className="section-pad">
          <div className="container-page">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {partnerTypes.map((p, i) => (
                <Reveal key={p.title} delay={(i % 3) * 0.05}>
                  <div className="feature-card h-full">
                    <h3 className="text-base font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-graphite">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-14 text-center">
              <Link href="/contact" className="btn-primary">Become a Partner</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
