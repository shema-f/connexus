import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnnouncementBar, ProductStatus } from "@/components/ProductStatus";
import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { WhatIs } from "@/components/home/WhatIs";
import { InteractiveNetwork } from "@/components/home/InteractiveNetwork";
import { ConnexusBoxSection } from "@/components/home/ConnexusBox";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Technology } from "@/components/home/Technology";
import { OfflineFirst } from "@/components/home/OfflineFirst";
import { UseCases } from "@/components/home/UseCases";
import { Ecosystem } from "@/components/home/Ecosystem";
import { Developers } from "@/components/home/Developers";
import { RoadmapTeaser } from "@/components/home/RoadmapTeaser";
import { FeedbackTeaser } from "@/components/home/FeedbackTeaser";
import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { db } from "@/server/collections";
import { ensureSeeded } from "@/server/seed";
import { orgJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Connexus — Offline-First Digital Infrastructure | Ferrivox",
  description:
    "Connexus is an offline-first digital infrastructure platform being developed by Ferrivox Ltd for local communication, content, applications and edge services.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  await ensureSeeded();
  const faqs = (await db.content.list((c) => c.kind === "faq" && c.published)).slice(0, 8);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
      />
      <AnnouncementBar />
      <Navbar />
      <main id="main">
        <Hero />
        <ProductStatus />
        <Problem />
        <WhatIs />
        <InteractiveNetwork />
        <ConnexusBoxSection />
        <HowItWorks />
        <Technology />
        <OfflineFirst />
        <UseCases />
        <Ecosystem />
        <Developers />
        <RoadmapTeaser />
        <FeedbackTeaser />
        <FaqSection items={faqs} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
