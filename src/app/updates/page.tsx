import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { db } from "@/server/collections";
import { ensureSeeded } from "@/server/seed";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Updates",
  description:
    "Connexus product, engineering, hardware, community, developer and company updates — built in public by Ferrivox Ltd.",
  alternates: { canonical: "/updates" },
};

const CATEGORIES = ["Product", "Engineering", "Hardware", "Community", "Developer", "Company"];

export default async function UpdatesPage() {
  await ensureSeeded();
  const updates = (await db.content.list((c) => c.kind === "update" && c.published))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero
          eyebrow="NEWS & UPDATES"
          title="Built in public."
          description="Development progress, prototype milestones and community news — published as it happens, not as marketing."
        />
        <section className="section-pad">
          <div className="container-page">
            <div className="mb-10 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <span key={c} className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-[10px] tracking-widest text-graphite">
                  {c.toUpperCase()}
                </span>
              ))}
            </div>

            {updates.length === 0 ? (
              <div className="glass rounded-2xl px-8 py-12 text-center">
                <p className="text-sm text-graphite">
                  No updates published yet. The first development update will appear here — follow the early access list to get it by email.
                </p>
                <a href="/early-access" className="btn-primary mt-6 inline-flex">Join Early Access</a>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {updates.map((u, i) => (
                  <Reveal key={u.id} delay={Math.min(i, 3) * 0.05}>
                    <article className="feature-card">
                      <div className="flex items-center gap-3">
                        {u.category ? (
                          <span className="rounded-full border border-signal-400/30 bg-signal-500/10 px-3 py-1 font-mono text-[10px] tracking-widest text-cyanx">
                            {u.category.toUpperCase()}
                          </span>
                        ) : null}
                        <time className="font-mono text-[11px] text-graphite" dateTime={u.createdAt}>
                          {new Date(u.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </time>
                      </div>
                      <h2 className="mt-4 text-xl font-semibold text-white">{u.title}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-graphite">{u.body}</p>
                      {u.author ? <p className="mt-4 text-xs text-graphite">— {u.author}</p> : null}
                    </article>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
