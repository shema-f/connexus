import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { LogoLockup } from "@/components/brand/LogoMark";

/**
 * Internal typography specimen. Unindexed and unlinked from navigation —
 * used to compare font candidates side by side at real UI scale.
 * Delete or keep hidden once the brand type is locked in.
 */
export const metadata: Metadata = {
  title: "Typography Specimen (internal)",
  robots: { index: false, follow: false },
};

export default function TypographyPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-ink">
        <PageHero
          eyebrow="INTERNAL · SPECIMEN"
          title="Typography specimen"
          description="Side-by-side font candidates at real UI scale. Not indexed, not linked."
        />

        {/* Display scale — Sora */}
        <section className="section-pad hairline">
          <div className="container-page space-y-14">
            <div>
              <p className="tech-label-cyan">DISPLAY · SORA · HERO-LG</p>
              <h1 className="mt-4 text-hero-lg font-display font-bold tracking-tight text-white">
                Your digital world shouldn&apos;t stop when the{" "}
                <span className="brand-accent text-gradient">Internet does.</span>
              </h1>
            </div>
            <div>
              <p className="tech-label-cyan">DISPLAY · SORA · HERO-MD (PAGE HEROES)</p>
              <h2 className="mt-4 max-w-3xl text-hero-md font-display font-bold tracking-tight text-white">
                Developers, build with us.
              </h2>
            </div>
            <div>
              <p className="tech-label-cyan">DISPLAY · SORA · SECTION HEADINGS</p>
              <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Questions, answered honestly.
              </h2>
            </div>
            <div>
              <p className="tech-label-cyan">WORDMARK</p>
              <div className="mt-4">
                <LogoLockup tagline />
              </div>
            </div>
          </div>
        </section>

        {/* Serif candidates — Cormorant Garamond (loaded) vs Playfair Display (imported here) */}
        <section className="section-pad hairline">
          <div className="container-page space-y-12">
            <p className="tech-label-cyan">ACCENT SERIF CANDIDATES · &ldquo;IRON WILL, INFINITE DREAMS.&rdquo;</p>

            <div className="grid gap-10 lg:grid-cols-2">
              <div className="glass rounded-2xl p-8">
                <p className="font-mono text-[11px] tracking-[0.22em] text-cyanx">A · CORMORANT GARAMOND (ACTIVE)</p>
                <p className="brand-accent mt-6 text-4xl leading-snug text-white">
                  &ldquo;Iron will, infinite dreams.&rdquo;
                </p>
                <p className="mt-4 font-castle text-2xl not-italic text-graphite">
                  Regular weight — Connect beyond the Internet.
                </p>
              </div>
              <div className="glass rounded-2xl p-8">
                <p className="font-mono text-[11px] tracking-[0.22em] text-cyanx">B · PLAYFAIR DISPLAY</p>
                <p
                  className="mt-6 text-4xl italic leading-snug text-white"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  &ldquo;Iron will, infinite dreams.&rdquo;
                </p>
                <p
                  className="mt-4 text-2xl text-graphite"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Regular weight — Connect beyond the Internet.
                </p>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-graphite">
              To switch candidates, change the <code className="font-mono text-signal-300">castle</code> font in{" "}
              <code className="font-mono text-signal-300">src/app/layout.tsx</code>. The utilities stay the same.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap");
:root { --font-playfair: "Playfair Display"; }`}</style>
    </>
  );
}
