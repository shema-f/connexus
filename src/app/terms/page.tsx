import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the Connexus website by Ferrivox Ltd.",
  alternates: { canonical: "/terms" },
};

const sections = [
  { title: "Acceptance", body: "By using this website you agree to these terms. If you don't agree, please don't use the site." },
  { title: "About the product", body: "Connexus is under development by Ferrivox Ltd. Statements about capabilities describe design intent and planned functionality, not shipping features. Availability, features and specifications may change." },
  { title: "Acceptable use", body: "Don't misuse the site: no scraping, spam, injection attempts, impersonation or unlawful content in forms or submissions." },
  { title: "Submissions", body: "Feedback, reviews and project submissions may be reviewed and, if approved, published. Submit only content you have the right to share." },
  { title: "Intellectual property", body: "Connexus, Ferrivox and related branding belong to Ferrivox Ltd. Open-source components, when released, will carry their own licenses." },
  { title: "Disclaimer", body: "The site is provided as-is during development. Nothing here constitutes a commitment to deliver specific features by specific dates." },
  { title: "Contact", body: "Questions about these terms? Reach us through the contact page." },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero eyebrow="LEGAL" title="Terms of Use" description="Last updated: September 2026" />
        <section className="section-pad">
          <div className="container-page max-w-3xl space-y-8">
            {sections.map((s, i) => (
              <div key={s.title}>
                <h2 className="flex items-baseline gap-3 text-lg font-semibold text-white">
                  <span className="font-mono text-sm text-signal-300">{String(i + 1).padStart(2, "0")}.</span>
                  {s.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-graphite">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
