import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/home/FinalCta";
import { listContent } from "@/server/seed";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Connexus: what it is, how offline communication works, platforms, synchronization, security and availability.",
  alternates: { canonical: "/faq" },
};

export default async function FaqPage() {
  const items = (await listContent("faq"))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="FAQ"
          title="Everything you're wondering, answered honestly."
          description="If something is still being researched, we say so."
        />
        <section className="section-pad">
          <div className="container-page max-w-3xl">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={Math.min(i, 5) * 0.03}>
                <div className="hairline">
                  <h2 className="py-5 text-lg font-semibold text-white">{item.title}</h2>
                  <p className="pb-6 text-sm leading-relaxed text-graphite">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
