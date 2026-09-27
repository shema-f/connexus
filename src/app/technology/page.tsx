import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Technology } from "@/components/home/Technology";
import { HowItWorks } from "@/components/home/HowItWorks";
import { OfflineFirst } from "@/components/home/OfflineFirst";
import { InteractiveNetwork } from "@/components/home/InteractiveNetwork";
import { FinalCta } from "@/components/home/FinalCta";
import { webAppJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "How Connexus works: local connection layers, the Connexus protocol, local services, a sync engine and optional cloud services.",
  alternates: { canonical: "/technology" },
};

export default function TechnologyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Technology", path: "/technology" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="TECHNOLOGY"
          title="Built as infrastructure, not just an app."
          description="Connexus is a layered platform: local connections between devices, a protocol for discovery and delivery, services that run locally, and optional cloud synchronization."
        />
        <Technology />
        <HowItWorks />
        <OfflineFirst />
        <InteractiveNetwork />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
