import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { DemoForm } from "@/components/forms/DemoForm";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Book a virtual Connexus demo, a technical discussion, an organization pilot discussion or a developer discussion with the Ferrivox team.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Demo", path: "/demo" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="BOOK A DEMO"
          title="See what Connexus could do for you."
          description="Choose the kind of session you want. We'll contact you to arrange a time — no calendar slot is confirmed automatically."
        />
        <section className="section-pad">
          <div className="container-page max-w-2xl">
            <DemoForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
