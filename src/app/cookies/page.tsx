import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How the Connexus website uses cookies and local storage.",
  alternates: { canonical: "/cookies" },
};

const sections = [
  { title: "Essential cookies", body: "We use a single essential cookie for admin authentication (a signed session cookie). It is set only for logged-in administrators." },
  { title: "Analytics", body: "If analytics is enabled, it is configured to be privacy-respecting and anonymous. No advertising or cross-site tracking cookies are used." },
  { title: "No consent banners for tracking", body: "Because we don't run advertising trackers, you won't see a consent wall. Your form submissions are governed by the Privacy Policy." },
  { title: "Managing cookies", body: "You can clear or block cookies in your browser settings. Blocking the admin session cookie simply logs out admin users." },
];

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero eyebrow="LEGAL" title="Cookie Policy" description="Last updated: September 2026" />
        <section className="section-pad">
          <div className="container-page max-w-3xl space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-lg font-semibold text-white">{s.title}</h2>
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
