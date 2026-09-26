import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Developer Terms",
  description: "Terms for participating in the Connexus developer preview and directory.",
  alternates: { canonical: "/developer-terms" },
};

const sections = [
  { title: "Preview status", body: "The Connexus SDK, APIs and related tools are pre-release software under active development. They may change or break without notice and are provided for evaluation." },
  { title: "Profiles and projects", body: "Developer profiles and project listings are moderated. Ferrivox may decline or remove listings that are spammy, unsafe, misleading or incompatible with the platform's direction." },
  { title: "Your content", body: "You keep ownership of the code and content you submit. By submitting a project you grant Ferrivox the right to list and describe it in the directory." },
  { title: "Security", body: "Don't submit code containing malicious behavior, hidden telemetry or unlawful content. Projects may be reviewed before publication." },
  { title: "Feedback", body: "Feedback and suggestions about Connexus may be used by Ferrivox to improve the platform without obligation." },
  { title: "No warranty", body: "Preview components are provided as-is. Don't use them for safety-critical systems." },
];

export default function DeveloperTermsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero eyebrow="LEGAL" title="Developer Terms" description="Last updated: September 2026" />
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
