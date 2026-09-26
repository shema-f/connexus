import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { EarlyAccessForm } from "@/components/forms/EarlyAccessForm";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Early Access",
  description:
    "Join the Connexus early access list — get notified as the platform develops and be first in line for previews and pilots.",
  alternates: { canonical: "/early-access" },
};

export default function EarlyAccessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Early Access", path: "/early-access" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="EARLY ACCESS"
          title="Be first to hear when Connexus is ready."
          description="One quick form. We'll use it only to contact you about Connexus — previews, pilots and launch news."
        />
        <section className="section-pad">
          <div className="container-page max-w-2xl">
            <EarlyAccessForm />
            <p className="mt-6 text-center text-xs text-graphite">
              See the <a href="/privacy" className="text-signal-300 underline">Privacy Policy</a> for how your information is handled.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
