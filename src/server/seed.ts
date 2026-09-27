import { db, type ContentItem } from "./collections";
import type { WithMeta } from "./db";

let seeded = false;

const SEED_TIMESTAMP = "2026-09-01T00:00:00.000Z";

/**
 * Launch content set, in code. It seeds the file-backed store on first run AND
 * acts as the render-time fallback: serverless/CI environments may build without
 * the .data store, and pages must never render empty SEO content (FAQ schema,
 * roadmap timeline) just because the store file was absent at build time.
 */
export const FALLBACK_CONTENT: Omit<ContentItem, keyof WithMeta>[] = [
  // ---- Roadmap ----
  { kind: "roadmap", title: "Research", body: "Network architecture research, prototype design and hardware exploration.", order: 1, published: true },
  { kind: "roadmap", title: "Prototype", body: "Local communication between devices, Connexus Box prototype and a basic dashboard.", order: 2, published: true },
  { kind: "roadmap", title: "Pilot", body: "Working with organizations, developers and real-world testing environments.", order: 3, published: true },
  { kind: "roadmap", title: "Platform", body: "SDK, APIs, cloud synchronization and an admin console for operators.", order: 4, published: true },
  { kind: "roadmap", title: "Hardware", body: "Production hardware, improved reliability and commercial deployment.", order: 5, published: true },

  // ---- FAQ ----
  { kind: "faq", title: "What is Connexus?", body: "Connexus is an offline-first local digital infrastructure platform being developed by Ferrivox Ltd. It is designed to let devices communicate, share content and run services over a local network — without depending on the public Internet for every interaction.", published: true },
  { kind: "faq", title: "Does Connexus require Internet?", body: "No. Connexus is being designed so that core services operate entirely over the local network. Internet connectivity is optional and used for synchronization when available and appropriate.", published: true },
  { kind: "faq", title: "What is the Connexus Box?", body: "The Connexus Box is our hardware concept — a compact local computing and networking appliance that runs Connexus services locally for connected devices. It is currently a prototype concept and its design is still evolving.", published: true },
  { kind: "faq", title: "How does offline communication work?", body: "Devices connect to a local Connexus environment through Wi-Fi or other local links. Messages and data are stored and forwarded inside the local network, so communication continues even when the Internet is unavailable.", published: true },
  { kind: "faq", title: "Can Android devices use Connexus?", body: "That is the plan. Android is expected to be a primary platform because of its support for local networking capabilities. Specific platform support will be confirmed as development continues.", published: true },
  { kind: "faq", title: "Can Windows devices use Connexus?", body: "We intend for Connexus services to be accessible from standard browsers and desktop platforms, including Windows. Details will be shared as the platform matures.", published: true },
  { kind: "faq", title: "Can Connexus synchronize when Internet returns?", body: "Yes — optional synchronization is a core part of the design. When connectivity returns, changes made locally are designed to synchronize with cloud services.", published: true },
  { kind: "faq", title: "Is Connexus open source?", body: "Ferrivox may open-source selected components of the Connexus ecosystem — such as the protocol, SDK or developer tools — where appropriate. Nothing is claimed as open source until it actually is.", published: true },
  { kind: "faq", title: "Can developers build on Connexus?", body: "That is the goal. Connexus is intended to become a developer platform with an SDK, local APIs and service discovery. Developer previews will open as components stabilize — join the developer list to get early access.", published: true },
  { kind: "faq", title: "Can organizations request a pilot?", body: "Yes. Organizations interested in testing Connexus in a real environment can request a pilot through our pilot request form. Pilots are scheduled as the platform matures.", published: true },
  { kind: "faq", title: "Is Connexus available now?", body: "Not yet. Connexus is currently in development by Ferrivox Ltd. You can join the early access list to follow progress and get notified as it becomes available.", published: true },
  { kind: "faq", title: "Who is developing Connexus?", body: "Connexus is developed by Ferrivox Ltd, a technology company based in Rwanda building AI, data and software solutions.", published: true },
  { kind: "faq", title: "What is Ferrivox?", body: "Ferrivox Ltd is a technology company developing AI, data and software solutions. Its slogan: 'Iron will, infinite dreams.' Connexus is one of several projects under active development.", published: true },
  { kind: "faq", title: "What data does Connexus store?", body: "Connexus is being designed around local-first storage: data lives on the local network by default and syncs to the cloud only when configured. Data minimization is a design principle.", published: true },
  { kind: "faq", title: "How is security handled?", body: "Encrypted communication, authenticated devices and secure local services are part of the design goals. Specifics will be published as implementations are finalized.", published: true },
  { kind: "faq", title: "Can Connexus run local AI?", body: "Local AI services are part of the long-term vision for the platform — running assistive services on the edge, close to users, without requiring Internet. This is under research and not yet a shipped feature.", published: true },

  // ---- Updates: intentionally empty; the page shows its own empty state ----
];

/** Idempotently seed content collections with the launch content set. */
export async function ensureSeeded() {
  if (seeded) return;
  seeded = true;

  const existing = await db.content.list();
  if (existing.length > 0) return;

  await db.content.insertMany(FALLBACK_CONTENT);
}

/**
 * Published content for a kind, with the in-code launch set as fallback.
 * Use this instead of db.content.list() for anything rendered on public pages.
 */
export async function listContent(kind: ContentItem["kind"]): Promise<ContentItem[]> {
  await ensureSeeded();
  const items = await db.content.list((c) => c.kind === kind && c.published);
  if (items.length > 0) return items;
  return FALLBACK_CONTENT.filter((c) => c.kind === kind && c.published).map((c, i) => ({
    ...c,
    id: `fallback-${kind}-${i}`,
    createdAt: SEED_TIMESTAMP,
    updatedAt: SEED_TIMESTAMP,
  }));
}
