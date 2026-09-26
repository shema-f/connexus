import { Reveal } from "@/components/motion/Reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06]">
      <div aria-hidden className="absolute inset-0 bg-grid-faint bg-grid mask-fade-b opacity-60" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-140px] h-[320px] w-[640px] -translate-x-1/2 rounded-full bg-signal-600/12 blur-[120px]"
      />
      <div className="container-page relative py-16 sm:py-20">
        <Reveal>
          <span className="tech-label-cyan">{eyebrow}</span>
          <h1 className="mt-4 max-w-3xl text-balance text-hero-md font-bold text-white">{title}</h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-graphite sm:text-lg">{description}</p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
