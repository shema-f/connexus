"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Hero3DLazy } from "@/components/three/Hero3DLazy";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle grid + radial glow backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-faint bg-grid mask-fade-b opacity-70"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-signal-600/12 blur-[140px]"
      />

      <div className="container-page relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-24">
        <div>
          <Reveal>
            <p className="tech-label-cyan mb-5 flex items-center gap-2">
              <span className="status-dot inline-flex bg-cyanx" />
              {siteConfig.hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-hero-lg text-balance font-display font-bold tracking-tight text-white">
              Your digital world shouldn&apos;t stop when the{" "}
              <span className="brand-accent text-gradient">Internet does.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-graphite sm:text-lg">
              {siteConfig.hero.sub}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href={siteConfig.cta.earlyAccess.href} className="btn-primary">
                {siteConfig.cta.earlyAccess.label}
              </Link>
              <Link href={siteConfig.cta.explore.href} className="btn-secondary">
                {siteConfig.cta.explore.label}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-5 font-mono text-[11px] tracking-[0.18em] text-graphite">
              CURRENTLY IN DEVELOPMENT · FERRIVOX LTD
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <Hero3DLazy />
        </Reveal>
      </div>
    </section>
  );
}
