import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ConnexusBoxSection } from "@/components/home/ConnexusBox";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FinalCta } from "@/components/home/FinalCta";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Connexus Box",
  description:
    "The Connexus Box is Ferrivox's hardware concept for running Connexus services locally — a compact local computing and networking appliance. Concept hardware, under development.",
  alternates: { canonical: "/connexus-box" },
};

export default function ConnexusBoxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Connexus Box", path: "/connexus-box" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="HARDWARE CONCEPT"
          title="Meet the Connexus Box."
          description="A small box with a bigger idea. The Connexus Box is our hardware concept for running Connexus services locally — providing local digital services to connected devices, even when normal Internet connectivity is unavailable."
        />
        <ConnexusBoxSection />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
