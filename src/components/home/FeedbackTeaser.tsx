import Link from "next/link";
import { SectionHeader, Reveal } from "@/components/motion/Reveal";
import { ApprovedReviews } from "@/components/ApprovedReviews";

export function FeedbackTeaser() {
  return (
    <section className="section-pad hairline">
      <div className="container-page">
        <SectionHeader
          eyebrow="COMMUNITY"
          title="Early feedback from the community."
          description="Honest impressions from people following the project — not customer reviews. Connexus hasn't shipped yet."
        />
        <div className="mt-12">
          <ApprovedReviews limit={3} />
        </div>
        <Reveal>
          <div className="mt-10 text-center">
            <Link href="/community#feedback" className="btn-secondary">Share feedback →</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
