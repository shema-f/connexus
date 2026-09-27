import { listContent } from "@/server/seed";
import { Reveal } from "@/components/motion/Reveal";

const STAGE_LABELS = ["RESEARCH", "PROTOTYPE", "PILOT", "PLATFORM", "HARDWARE"];

export async function RoadmapTimeline() {
  const items = (await listContent("roadmap"))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <ol className="relative space-y-4">
      <div aria-hidden className="absolute bottom-4 left-[19px] top-4 w-px bg-white/10" />
      {items.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.05}>
          <li className="relative flex gap-5">
            <span
              aria-hidden
              className={`relative z-10 mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs ${
                i <= 1 ? "border-cyanx/60 bg-cyanx/10 text-cyanx" : "border-white/15 bg-ink-800 text-graphite"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="glass flex-1 rounded-2xl px-6 py-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold tracking-[0.1em] text-white">
                  {STAGE_LABELS[i] ?? item.title.toUpperCase()}
                </h3>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] tracking-widest text-graphite">
                  {i <= 1 ? "IN PROGRESS / DONE" : "PLANNED"}
                </span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-graphite">{item.body}</p>
            </div>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
