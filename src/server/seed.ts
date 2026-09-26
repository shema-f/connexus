import { db } from "./collections";

let seeded = false;

/** Idempotently seed content collections with the launch content set. */
export async function ensureSeeded() {
  if (seeded) return;
  seeded = true;

  const existing = await db.content.list();
  if (existing.length > 0) return;

  const roadmap = [
    { title: "Research", body: "Network architecture research, prototype design and hardware exploration.", order: 1 },
    { title: "Prototype", body: "Local communication between devices, Connexus Box prototype and a basic dashboard.", order: 2 },
    { title: "Pilot", body: "Working with organizations, developers and real-world testing environments.", order: 3 },
    { title: "Platform", body: "SDK, APIs, cloud synchronization and an admin console for operators.", order: 4 },
    { title: "Hardware", body: "Production hardware, improved reliability and commercial deployment.", order: 5 },
  ];

  const faqs = [
    {
      title: "What is Connexus?",
      body: "Connexus is an offline-first local digital infrastructure platform being developed by Ferrivox Ltd. It is designed to let devices communicate, share content and run services over a local network — without depending on the public Internet for every interaction.",
    },
    {
      title: "Does Connexus require Internet?",
      body: "No. Connexus is being designed so that core services operate entirely over the local network. Internet connectivity is optional and used for synchronization when available and appropriate.",
    },
    {
      title: "What is the Connexus Box?",
      body: "The Connexus Box is our hardware concept — a compact local computing and networking appliance that runs Connexus services locally for connected devices. It is currently a prototype concept and its design is still evolving.",
    },
    {
      title: "How does offline communication work?",
      body: "Devices connect to a local Connexus environment through Wi-Fi or other local links. Messages and data are stored and forwarded inside the local network, so communication continues even when the Internet is unavailable.",
    },
    {
      title: "Can Android devices use Connexus?",
      body: "That is the plan. Android is expected to be a primary platform because of its support for local networking capabilities. Specific platform support will be confirmed as development continues.",
    },
    {
      title: "Can Windows devices use Connexus?",
      body: "We intend for Connexus services to be accessible from standard browsers and desktop platforms, including Windows. Details will be shared as the platform matures.",
    },
    {
      title: "Can Connexus synchronize when Internet returns?",
      body: "Yes — optional synchronization is a core part of the design. When connectivity returns, changes made locally are designed to synchronize with cloud services.",
    },
    {
      title: "Is Connexus open source?",
      body: "Ferrivox may open-source selected components of the Connexus ecosystem — such as the protocol, SDK or developer tools — where appropriate. Nothing is claimed as open source until it actually is.",
    },
    {
      title: "Can developers build on Connexus?",
      body: "That is the goal. Connexus is intended to become a developer platform with an SDK, local APIs and service discovery. Developer previews will open as components stabilize — join the developer list to get early access.",
    },
    {
      title: "Can organizations request a pilot?",
      body: "Yes. Organizations interested in testing Connexus in a real environment can request a pilot through our pilot request form. Pilots are scheduled as the platform matures.",
    },
    {
      title: "Is Connexus available now?",
      body: "Not yet. Connexus is currently in development by Ferrivox Ltd. You can join the early access list to follow progress and get notified as it becomes available.",
    },
    {
      title: "Who is developing Connexus?",
      body: "Connexus is developed by Ferrivox Ltd, a technology company based in Rwanda building AI, data and software solutions.",
    },
    {
      title: "What is Ferrivox?",
      body: "Ferrivox Ltd is a technology company developing AI, data and software solutions. Its slogan: 'Iron will, infinite dreams.' Connexus is one of several projects under active development.",
    },
    {
      title: "What data does Connexus store?",
      body: "Connexus is being designed around local-first storage: data lives on the local network by default and syncs to the cloud only when configured. Data minimization is a design principle.",
    },
    {
      title: "How is security handled?",
      body: "Encrypted communication, authenticated devices and secure local services are part of the design goals. Specifics will be published as implementations are finalized.",
    },
    {
      title: "Can Connexus run local AI?",
      body: "Local AI services are part of the long-term vision for the platform — running assistive services on the edge, close to users, without requiring Internet. This is under research and not yet a shipped feature.",
    },
  ];

  await db.content.insertMany(roadmap.map((r) => ({ kind: "roadmap", title: r.title, body: r.body, order: r.order, published: true })) as never);
  await db.content.insertMany(faqs.map((f) => ({ kind: "faq", title: f.title, body: f.body, published: true })) as never);
}
