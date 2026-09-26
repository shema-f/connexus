import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ferrivox Ltd about Connexus — general, partnership, developer, pilot, investment and media inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="CONTACT"
          title="Get in touch with Ferrivox."
          description="Pick a category so your message reaches the right people."
        />
        <section className="section-pad">
          <div className="container-page grid gap-12 lg:grid-cols-[1fr_0.8fr]">
            <ContactForm />
            <aside className="space-y-4">
              <div className="glass rounded-2xl p-6">
                <span className="tech-label-cyan">COMPANY</span>
                <p className="mt-4 text-sm font-semibold text-white">Ferrivox Ltd</p>
                <p className="text-sm text-graphite">{siteConfig.company.country}</p>
                <a href={`mailto:${siteConfig.company.email}`} className="mt-3 inline-block text-sm text-signal-300 hover:text-signal-200">
                  {siteConfig.company.email}
                </a>
                <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-graphite">
                  &ldquo;{siteConfig.company.slogan}&rdquo;
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <span className="tech-label-cyan">FOLLOW</span>
                <SocialLinks className="mt-4" />
                <p className="mt-3 text-xs leading-relaxed text-graphite">
                  Only official Ferrivox accounts are listed. We&apos;ll add channels as they go live.
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <span className="tech-label-cyan">FASTER ROUTES</span>
                <ul className="mt-4 space-y-2.5 text-sm text-graphite">
                  <li><a href="/pilot" className="hover:text-white">Request a pilot →</a></li>
                  <li><a href="/demo" className="hover:text-white">Book a demo →</a></li>
                  <li><a href="/early-access" className="hover:text-white">Join early access →</a></li>
                  <li><a href="/developers" className="hover:text-white">Developer program →</a></li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
