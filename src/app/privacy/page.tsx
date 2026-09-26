import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Ferrivox Ltd collects, uses and protects information submitted through the Connexus website.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "Who we are",
    body: "Ferrivox Ltd (Rwanda) operates this website for the Connexus project. For privacy questions, contact us through the contact page.",
  },
  {
    title: "What we collect",
    body: "Only what you submit: email and profile details when you join early access, request a pilot or demo, register as a developer, submit a project, leave feedback or contact us. We also keep minimal server logs for security.",
  },
  {
    title: "How we use it",
    body: "To respond to you, evaluate pilot and demo requests, moderate community content, and send Connexus updates you asked for. We do not sell your data.",
  },
  {
    title: "Developer profiles",
    body: "Developer email addresses are private by default. Public profiles show only what you choose to publish. You can request removal at any time.",
  },
  {
    title: "Reviews and comments",
    body: "Reviews are moderated before publication. We store submitted feedback internally even when it is not published.",
  },
  {
    title: "Security",
    body: "Data is stored with access controls, forms are rate-limited and validated server-side, and admin endpoints require authentication. No payment data is collected on this site.",
  },
  {
    title: "Your rights",
    body: "You may request access, correction or deletion of your personal data at any time through the contact page.",
  },
  {
    title: "Changes",
    body: "We will post any changes to this policy on this page with an updated revision date.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero eyebrow="LEGAL" title="Privacy Policy" description="Last updated: September 2026" />
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
