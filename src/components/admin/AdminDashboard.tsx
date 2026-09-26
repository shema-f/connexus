"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogoMark } from "@/components/brand/LogoMark";

type Review = { id: string; name: string; email: string; rating: number; review: string; country: string; role: string; wants: string; wouldPilot: boolean; status: string; createdAt: string };
type Developer = { id: string; name: string; username: string; email: string; skills: string; country: string; status: string; createdAt: string };
type Project = { id: string; projectName: string; developerName: string; repoUrl: string; description: string; status: string; moderation: string; createdAt: string };
type Pilot = { id: string; fullName: string; organization: string; organizationType: string; country: string; potentialUsers: string; useCase: string; status: string; createdAt: string };
type Demo = { id: string; fullName: string; email: string; demoType: string; status: string; createdAt: string };
type Contact = { id: string; name: string; email: string; category: string; message: string; status: string; createdAt: string };
type Early = { id: string; email: string; country: string; role: string; interest: string; createdAt: string };
type AuditEntry = { id: string; actor: string; action: string; detail: string; createdAt: string };

type AdminData = {
  reviews: Review[];
  developers: Developer[];
  projects: Project[];
  pilots: Pilot[];
  demos: Demo[];
  contacts: Contact[];
  earlyAccess: Early[];
  newsletter: { id: string; email: string; createdAt: string }[];
  content: { id: string; kind: string; title: string; published: boolean; createdAt: string }[];
  audit: AuditEntry[];
};

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "reviews", label: "Reviews" },
  { key: "developers", label: "Developers" },
  { key: "projects", label: "Projects" },
  { key: "pilots", label: "Pilots" },
  { key: "demos", label: "Demos" },
  { key: "contacts", label: "Contacts" },
  { key: "earlyAccess", label: "Early Access" },
  { key: "audit", label: "Audit Log" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function AdminDashboard({ session, data }: { session: { email: string; role: string }; data: AdminData }) {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("overview");
  const [pending, startTransition] = useTransition();

  const pendingReviews = data.reviews.filter((r) => r.status === "pending").length;
  const pendingDevs = data.developers.filter((d) => d.status === "pending").length;
  const pendingProjects = data.projects.filter((p) => p.moderation === "pending").length;
  const newPilots = data.pilots.filter((p) => p.status === "new").length;

  async function action(collection: string, id: string, patch: Record<string, unknown>) {
    await fetch(`/api/admin/${collection}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, patch }),
    });
    startTransition(() => router.refresh());
  }

  async function remove(collection: string, id: string) {
    await fetch(`/api/admin/${collection}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    startTransition(() => router.refresh());
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const stats = [
    { label: "EARLY ACCESS", value: data.earlyAccess.length },
    { label: "PILOT REQUESTS", value: data.pilots.length },
    { label: "DEMO REQUESTS", value: data.demos.length },
    { label: "REVIEWS PENDING", value: pendingReviews },
    { label: "DEVELOPERS PENDING", value: pendingDevs },
    { label: "PROJECTS PENDING", value: pendingProjects },
    { label: "CONTACTS", value: data.contacts.length },
    { label: "SUBSCRIBERS", value: data.newsletter.length },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <LogoMark className="h-8 w-8" />
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-graphite">CONNEXUS ADMIN</p>
            <p className="text-sm font-semibold text-white">{session.email} · {session.role}</p>
          </div>
        </div>
        <button onClick={logout} className="btn-secondary !px-4 !py-2 text-xs">Sign out</button>
      </div>

      {/* Tabs */}
      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Admin sections">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
            className={`rounded-full px-4 py-2 font-mono text-[11px] tracking-widest transition ${
              tab === t.key ? "bg-signal-500 text-white" : "glass text-graphite hover:text-white"
            }`}
          >
            {t.label.toUpperCase()}
          </button>
        ))}
      </nav>

      <div className={`mt-8 ${pending ? "opacity-70" : ""}`}>
        {tab === "overview" ? (
          <div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-5">
                  <p className="text-3xl font-bold text-white">{s.value}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-widest text-graphite">{s.label}</p>
                </div>
              ))}
            </div>
            <h3 className="mt-10 font-mono text-xs tracking-widest text-graphite">RECENT ACTIVITY</h3>
            <div className="glass mt-4 divide-y divide-white/5 rounded-2xl">
              {data.audit.length === 0 ? (
                <p className="px-6 py-5 text-sm text-graphite">No admin activity recorded yet.</p>
              ) : (
                data.audit.map((a) => (
                  <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 px-6 py-3.5 text-sm">
                    <span className="text-white">{a.action}</span>
                    <span className="text-xs text-graphite">{a.actor} · {new Date(a.createdAt).toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : null}

        {tab === "reviews" ? (
          <Queue
            title="Review moderation — approve, reject or archive"
            empty="No reviews submitted yet."
            items={data.reviews.map((r) => ({
              id: r.id,
              title: `${r.name} · ${r.rating}/5 · ${r.role}${r.country ? ` · ${r.country}` : ""}`,
              body: r.review,
              badge: r.status,
              created: r.createdAt,
            }))}
            renderActions={(item) => (
              <>
                <button onClick={() => action("reviews", item.id, { status: "approved" })} className="btn-primary !px-4 !py-2 text-xs">Approve</button>
                <button onClick={() => action("reviews", item.id, { status: "rejected" })} className="btn-secondary !px-4 !py-2 text-xs">Reject</button>
                <button onClick={() => remove("reviews", item.id)} className="btn-ghost !px-3 !py-2 text-xs">Delete</button>
              </>
            )}
          />
        ) : null}

        {tab === "developers" ? (
          <Queue
            title="Developer profiles — approve to publish"
            empty="No developer registrations yet."
            items={data.developers.map((d) => ({
              id: d.id,
              title: `${d.name} (@${d.username}) · ${d.country}`,
              body: d.skills,
              badge: d.status,
              created: d.createdAt,
            }))}
            renderActions={(item) => (
              <>
                <button onClick={() => action("developers", item.id, { status: "approved" })} className="btn-primary !px-4 !py-2 text-xs">Approve</button>
                <button onClick={() => action("developers", item.id, { status: "rejected" })} className="btn-secondary !px-4 !py-2 text-xs">Reject</button>
                <button onClick={() => remove("developers", item.id)} className="btn-ghost !px-3 !py-2 text-xs">Delete</button>
              </>
            )}
          />
        ) : null}

        {tab === "projects" ? (
          <Queue
            title="Developer projects — security/moderation review"
            empty="No project submissions yet."
            items={data.projects.map((p) => ({
              id: p.id,
              title: `${p.projectName} by ${p.developerName} · ${p.status}`,
              body: `${p.description}\n${p.repoUrl}`,
              badge: p.moderation,
              created: p.createdAt,
            }))}
            renderActions={(item) => (
              <>
                <button onClick={() => action("projects", item.id, { moderation: "approved" })} className="btn-primary !px-4 !py-2 text-xs">Approve</button>
                <button onClick={() => action("projects", item.id, { moderation: "rejected" })} className="btn-secondary !px-4 !py-2 text-xs">Reject</button>
                <button onClick={() => remove("projects", item.id)} className="btn-ghost !px-3 !py-2 text-xs">Delete</button>
              </>
            )}
          />
        ) : null}

        {tab === "pilots" ? (
          <Queue
            title="Pilot requests — follow up by preferred contact method"
            empty="No pilot requests yet."
            items={data.pilots.map((p) => ({
              id: p.id,
              title: `${p.fullName} — ${p.organization} (${p.organizationType}) · ${p.country} · ~${p.potentialUsers} users`,
              body: p.useCase,
              badge: p.status,
              created: p.createdAt,
            }))}
            renderActions={(item) => (
              <>
                <button onClick={() => action("pilots", item.id, { status: "contacted" })} className="btn-primary !px-4 !py-2 text-xs">Mark contacted</button>
                <button onClick={() => action("pilots", item.id, { status: "in-review" })} className="btn-secondary !px-4 !py-2 text-xs">In review</button>
                <button onClick={() => action("pilots", item.id, { status: "accepted" })} className="btn-secondary !px-4 !py-2 text-xs">Accept</button>
                <button onClick={() => action("pilots", item.id, { status: "declined" })} className="btn-secondary !px-4 !py-2 text-xs">Decline</button>
              </>
            )}
          />
        ) : null}

        {tab === "demos" ? (
          <Queue
            title="Demo requests"
            empty="No demo requests yet."
            items={data.demos.map((d) => ({
              id: d.id,
              title: `${d.fullName} · ${d.demoType}`,
              body: d.email,
              badge: d.status,
              created: d.createdAt,
            }))}
            renderActions={(item) => (
              <>
                <button onClick={() => action("demos", item.id, { status: "scheduled" })} className="btn-primary !px-4 !py-2 text-xs">Mark scheduled</button>
                <button onClick={() => action("demos", item.id, { status: "completed" })} className="btn-secondary !px-4 !py-2 text-xs">Complete</button>
                <button onClick={() => action("demos", item.id, { status: "declined" })} className="btn-secondary !px-4 !py-2 text-xs">Decline</button>
              </>
            )}
          />
        ) : null}

        {tab === "contacts" ? (
          <Queue
            title="Contact messages"
            empty="No contact messages yet."
            items={data.contacts.map((c) => ({
              id: c.id,
              title: `${c.name} · ${c.category}`,
              body: c.message,
              badge: c.status,
              created: c.createdAt,
            }))}
            renderActions={(item) => (
              <>
                <button onClick={() => action("contacts", item.id, { status: "resolved" })} className="btn-primary !px-4 !py-2 text-xs">Mark resolved</button>
                <button onClick={() => remove("contacts", item.id)} className="btn-ghost !px-3 !py-2 text-xs">Delete</button>
              </>
            )}
          />
        ) : null}

        {tab === "earlyAccess" ? (
          <Queue
            title="Early access signups (lead export-ready)"
            empty="No early access signups yet."
            items={data.earlyAccess.map((e) => ({
              id: e.id,
              title: e.email,
              body: `${e.role || "—"} · ${e.country || "—"} · interest: ${e.interest}`,
              badge: "registered",
              created: e.createdAt,
            }))}
            renderActions={(item) => (
              <button onClick={() => remove("earlyAccess", item.id)} className="btn-ghost !px-3 !py-2 text-xs">Delete</button>
            )}
          />
        ) : null}

        {tab === "audit" ? (
          <div>
            <h3 className="font-mono text-xs tracking-widest text-graphite">AUDIT LOG (LAST 30)</h3>
            <div className="glass mt-4 divide-y divide-white/5 rounded-2xl">
              {data.audit.length === 0 ? (
                <p className="px-6 py-5 text-sm text-graphite">No entries.</p>
              ) : (
                data.audit.map((a) => (
                  <div key={a.id} className="px-6 py-3.5">
                    <p className="text-sm text-white">{a.action}</p>
                    <p className="mt-1 text-xs text-graphite">{a.actor} · {a.detail} · {new Date(a.createdAt).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Queue({
  title,
  empty,
  items,
  renderActions,
}: {
  title: string;
  empty: string;
  items: { id: string; title: string; body: string; badge: string; created: string }[];
  renderActions: (item: { id: string }) => React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-mono text-xs tracking-widest text-graphite">{title.toUpperCase()}</h3>
      {items.length === 0 ? (
        <div className="glass mt-4 rounded-2xl px-6 py-8 text-center text-sm text-graphite">{empty}</div>
      ) : (
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="glass rounded-2xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1.5 whitespace-pre-wrap break-words text-sm text-graphite">{item.body}</p>
                  <p className="mt-2 font-mono text-[10px] tracking-widest text-graphite">
                    {item.badge.toUpperCase()} · {new Date(item.created).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">{renderActions(item)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
