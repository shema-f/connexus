import { db } from "@/server/collections";
import { Reveal } from "@/components/motion/Reveal";

/** Public approved testimonials. Emails are never rendered. */
export async function ApprovedReviews({ limit }: { limit?: number }) {
  let reviews = await db.reviews.list((r) => r.status === "approved");
  reviews = reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (limit) reviews = reviews.slice(0, limit);

  if (reviews.length === 0) {
    return (
      <div className="glass mx-auto max-w-2xl rounded-2xl px-8 py-10 text-center">
        <p className="text-sm text-graphite">
          No approved community feedback yet. Connexus is early — be among the first to share what you&apos;d want it to solve.
        </p>
        <p className="mt-3 font-mono text-[10px] tracking-widest text-graphite">
          REVIEWS ARE MODERATED BEFORE PUBLICATION
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((r, i) => (
        <Reveal key={r.id} delay={(i % 3) * 0.05}>
          <figure className="glass h-full rounded-2xl p-6">
            <div className="flex items-center gap-1" aria-label={`${r.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, s) => (
                <span key={s} className={s < r.rating ? "text-cyanx" : "text-white/15"} aria-hidden>
                  ★
                </span>
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-white/85">“{r.review}”</blockquote>
            <figcaption className="mt-4 text-xs text-graphite">
              {r.name} · {r.role}
              {r.country ? ` · ${r.country}` : ""}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
