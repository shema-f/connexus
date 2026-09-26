import { SectionHeader, Reveal } from "@/components/motion/Reveal";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";

export function RoadmapTeaser() {
  return (
    <section className="section-pad hairline">
      <div className="container-page">
        <SectionHeader
          eyebrow="ROADMAP"
          title="Where Connexus is headed."
          description="Five stages from research to commercial hardware. Stages without committed dates are marked as planned."
        />
        <div className="mt-14">
          <RoadmapTimeline />
        </div>
      </div>
    </section>
  );
}
