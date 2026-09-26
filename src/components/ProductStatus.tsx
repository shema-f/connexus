import { siteConfig } from "@/lib/site-config";

/** Status strip: research → prototype → pilot → release. */
export function ProductStatus() {
  return (
    <section aria-label="Product status" className="container-page">
      <div className="glass mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-2xl px-6 py-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="status-dot bg-cyanx" />
          <span className="font-mono text-xs tracking-[0.2em] text-white">SYSTEM STATUS · CONNEXUS</span>
        </div>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {siteConfig.status.stages.map((stage, i) => (
            <li key={stage.key} className="flex items-center gap-2">
              {i > 0 ? <span aria-hidden className="h-px w-4 bg-white/20" /> : null}
              <span className={`font-mono text-[11px] tracking-widest ${stage.done ? "text-cyanx" : "text-graphite"}`}>
                {stage.done ? "●" : "○"} {stage.label.toUpperCase()}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Top announcement bar above the nav. */
export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-signal-700 via-signal-600 to-signal-700">
      <div className="container-page flex items-center justify-center gap-3 py-2 text-center">
        <span className="font-mono text-[11px] tracking-[0.18em] text-white/90">
          CONNEXUS IS COMING. JOIN THE EARLY ACCESS LIST
        </span>
        <a href={siteConfig.cta.earlyAccess.href} className="text-[11px] font-semibold text-cyanx underline-offset-2 hover:underline">
          →
        </a>
      </div>
    </div>
  );
}
