import { db } from "@/server/collections";
import { Reveal } from "@/components/motion/Reveal";

function initials(name: string) {
  return name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export async function DeveloperDirectory() {
  const devs = (await db.developers.list((d) => d.status === "approved"))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 12);

  if (devs.length === 0) {
    return (
      <div className="glass rounded-2xl px-8 py-10 text-center">
        <p className="text-sm text-graphite">
          No approved developer profiles yet — the directory opens with the developer preview.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {devs.map((d, i) => (
        <Reveal key={d.id} delay={(i % 2) * 0.05}>
          <div className="feature-card">
            <div className="flex items-center gap-4">
              {d.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={d.avatarUrl} alt="" className="h-12 w-12 rounded-full border border-white/15 object-cover" />
              ) : (
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-signal-400/40 bg-signal-500/10 font-mono text-sm text-cyanx">
                  {initials(d.name)}
                </span>
              )}
              <div>
                <p className="font-semibold text-white">{d.name}</p>
                <p className="font-mono text-[11px] text-graphite">@{d.username} · {d.country}</p>
              </div>
            </div>
            {d.bio ? <p className="mt-4 text-sm leading-relaxed text-graphite">{d.bio}</p> : null}
            <p className="mt-3 text-xs text-signal-300">{d.skills}</p>
            {d.projects ? <p className="mt-2 text-xs text-graphite">Projects: {d.projects}</p> : null}
            <div className="mt-4 flex gap-4 text-xs font-semibold">
              {d.github ? (
                <a href={`https://github.com/${d.github}`} rel="noopener noreferrer nofollow" target="_blank" className="text-graphite hover:text-white">GitHub</a>
              ) : null}
              {d.portfolio ? (
                <a href={d.portfolio} rel="noopener noreferrer nofollow" target="_blank" className="text-graphite hover:text-white">Website</a>
              ) : null}
              {d.showEmail ? (
                <a href={`mailto:${d.email}`} className="text-graphite hover:text-white">Email</a>
              ) : null}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
