import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site-config";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid-faint bg-grid opacity-50" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[380px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-600/15 blur-[130px]"
      />
      <div className="container-page relative section-pad text-center">
        <Reveal>
          <span className="tech-label-cyan">CONNEXUS · COMING SOON</span>
          <h2 className="mx-auto mt-5 max-w-3xl text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Help us build what comes next.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-graphite sm:text-lg">
            Connexus is being built by Ferrivox Ltd. We&apos;re inviting developers, organizations,
            researchers, creators and early users to help shape the platform.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={siteConfig.cta.earlyAccess.href} className="btn-primary">Join Early Access</Link>
            <Link href={siteConfig.cta.build.href} className="btn-secondary">Build With Us</Link>
            <Link href={siteConfig.cta.pilot.href} className="btn-secondary">Request a Pilot</Link>
            <Link href="/contact" className="btn-ghost">Contact Ferrivox →</Link>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 font-mono text-[11px] tracking-[0.2em] text-graphite">
            BUILT FROM RWANDA · DESIGNED FOR THE WORLD
          </p>
        </Reveal>
      </div>
    </section>
  );
}
