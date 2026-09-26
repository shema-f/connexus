import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Developers } from "@/components/home/Developers";
import { DeveloperForm } from "@/components/forms/DeveloperForm";
import { DeveloperDirectory } from "@/components/DeveloperDirectory";
import { FinalCta } from "@/components/home/FinalCta";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Build with Connexus. SDK, APIs, protocol, Hub and Edge — plus the developer directory and preview program.",
  alternates: { canonical: "/developers" },
};

export default function DevelopersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Developers", path: "/developers" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="DEVELOPER PLATFORM"
          title="Developers, build with us."
          description="Connexus is intended to become a platform: an SDK, local APIs, a protocol for discovery and delivery, a hub for synchronization and an edge runtime. Join the preview to shape it."
        />
        <Developers />
        <section className="section-pad hairline">
          <div className="container-page grid gap-12 lg:grid-cols-2">
            <div>
              <span className="tech-label-cyan">DEVELOPER PREVIEW</span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Create your developer profile</h2>
              <p className="mt-4 text-sm leading-relaxed text-graphite">
                Profiles are reviewed before becoming publicly listed. Your email is private by
                default — you control whether it appears on your public profile.
              </p>
              <div className="mt-8">
                <DeveloperForm />
              </div>
            </div>
            <div>
              <span className="tech-label-cyan">COMMUNITY DIRECTORY</span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Connexus developers</h2>
              <p className="mt-4 text-sm leading-relaxed text-graphite">
                Approved public profiles of developers building with (or alongside) Connexus.
              </p>
              <div className="mt-8">
                <DeveloperDirectory />
              </div>
            </div>
          </div>
        </section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
