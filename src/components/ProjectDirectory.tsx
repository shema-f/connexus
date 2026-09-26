import { db } from "@/server/collections";
import { Reveal } from "@/components/motion/Reveal";

const STATUS_LABEL: Record<string, string> = {
  prototype: "Prototype",
  experimental: "Experimental",
  "in-development": "In Development",
  beta: "Beta",
  released: "Released",
};

export async function ProjectDirectory() {
  const projects = (await db.developerProjects.list((p) => p.moderation === "approved"))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 12);

  if (projects.length === 0) {
    return (
      <div className="glass rounded-2xl px-8 py-10 text-center">
        <p className="text-sm text-graphite">
          No approved projects yet. The directory will grow as the developer preview opens.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {projects.map((p, i) => (
        <Reveal key={p.id} delay={Math.min(i, 3) * 0.05}>
          <article className="feature-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{p.projectName}</h3>
              <span className="rounded-full border border-signal-400/30 bg-signal-500/10 px-3 py-1 font-mono text-[10px] tracking-widest text-cyanx">
                {STATUS_LABEL[p.status] ?? p.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-graphite">{p.description}</p>
            <p className="mt-3 text-xs text-signal-300">{p.technologies}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold">
              <a href={p.repoUrl} rel="noopener noreferrer nofollow" target="_blank" className="text-graphite hover:text-white">Repository</a>
              {p.website ? (
                <a href={p.website} rel="noopener noreferrer nofollow" target="_blank" className="text-graphite hover:text-white">Website</a>
              ) : null}
              {p.license ? <span className="text-graphite">{p.license}</span> : null}
              <span className="text-graphite">by {p.developerName}</span>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
