import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ReviewForm } from "@/components/forms/ReviewForm";
import { ApprovedReviews } from "@/components/ApprovedReviews";
import { FinalCta } from "@/components/home/FinalCta";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join the Connexus community: developers, contributors, discussions, feedback and events.",
  alternates: { canonical: "/community" },
};

const areas = [
  { title: "Developers", desc: "Build on the platform, join the preview, submit your projects.", href: "/developers", cta: "Developer platform →" },
  { title: "Contributors", desc: "Documentation, testing, research and design contributions.", href: "/early-access", cta: "Contribute →" },
  { title: "Projects", desc: "Community-built prototypes and integrations.", href: "/developers/projects", cta: "Browse projects →" },
  { title: "Discussions", desc: "Technical discussion spaces open with the developer preview.", href: "/community#discussions", cta: "Learn more →" },
  { title: "Feedback", desc: "Tell us what Connexus should solve in your context.", href: "#feedback", cta: "Share feedback →" },
  { title: "Events", desc: "Community calls and demos will be announced on Updates.", href: "/updates", cta: "See updates →" },
];

export default function CommunityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Community", path: "/community" }])) }} />
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="COMMUNITY"
          title="Join the Connexus community."
          description="Connexus is early — which means the people who join now genuinely shape what it becomes."
        />

        <section className="section-pad">
          <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <div key={a.title} className="feature-card flex flex-col">
                <h3 className="text-base font-semibold text-white">{a.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-graphite">{a.desc}</p>
                <Link href={a.href} className="mt-4 text-xs font-semibold text-signal-300 hover:text-signal-200">{a.cta}</Link>
              </div>
            ))}
          </div>
        </section>

        <section id="discussions" className="section-pad hairline">
          <div className="container-page">
            <span className="tech-label-cyan">DISCUSSIONS · MODERATED</span>
            <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold text-white sm:text-3xl">
              Commenting and feature requests open with the developer preview.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-graphite">
              Discussions will be moderated with anti-spam protections. Until then, feedback and
              suggestions flow through the forms below and the contact page.
            </p>
          </div>
        </section>

        <section id="feedback" className="section-pad hairline">
          <div className="container-page grid gap-12 lg:grid-cols-2">
            <div>
              <span className="tech-label-cyan">FEEDBACK</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Tell us what you think.</h2>
              <p className="mt-4 text-sm leading-relaxed text-graphite">
                Reviews are moderated before publication and appear as &ldquo;early feedback from
                the community&rdquo; — never as customer reviews.
              </p>
              <div className="mt-8">
                <ReviewForm />
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Early feedback from the community</h2>
              <div className="mt-8">
                <ApprovedReviews />
              </div>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
