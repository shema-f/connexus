/**
 * Connexus Bot local knowledge base.
 *
 * The default assistant answers entirely from these entries — keyword-scored
 * retrieval with honest, pre-approved copy. No data leaves the server and no
 * internet is required, which is exactly the point of Connexus itself.
 *
 * When CONNEXUS_AI_API_URL + CONNEXUS_AI_API_KEY are configured, the same
 * entries are passed as grounding context to an OpenAI-compatible chat API.
 */

export type KnowledgeEntry = {
  id: string;
  keywords: string[];
  answer: string;
  /** Optional follow-up chips shown under the answer. */
  related?: string[];
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "what-is",
    keywords: ["what", "connexus", "about", "platform", "overview", "explain", "tell me"],
    answer:
      "Connexus is an offline-first local digital infrastructure platform being developed by Ferrivox Ltd. It's designed to let devices communicate, share content and run services over a local network — without depending on the public Internet for every interaction. Internet connectivity is optional and used for synchronization when available.",
    related: ["Does it work without internet?", "What is the Connexus Box?"],
  },
  {
    id: "offline",
    keywords: ["offline", "without internet", "no internet", "internet down", "outage", "work without", "disconnect"],
    answer:
      "Yes — that's the core idea. Connexus is being designed so core services operate entirely over the local network. When the Internet drops, the Connexus environment keeps running: messaging, content and local services continue. When connectivity returns, changes synchronize with the cloud (optionally).",
    related: ["What happens when internet comes back?", "Can I use it for my school?"],
  },
  {
    id: "sync",
    keywords: ["sync", "synchronize", "synchronization", "cloud", "when internet returns", "comes back", "reconnect"],
    answer:
      "When Internet connectivity returns, Connexus is designed to synchronize changes made locally with optional cloud services. Sync is configurable — a deployment can run fully local, or local + cloud. Nothing is lost while offline; data is stored locally and forwarded when a link is available.",
    related: ["Does it work without internet?"],
  },
  {
    id: "box",
    keywords: ["box", "hardware", "device", "appliance", "router", "equipment", "connexus box"],
    answer:
      "The Connexus Box is our hardware concept — a compact local computing and networking appliance that runs Connexus services locally for connected devices. It has local compute, storage, network ports and a status indicator. It's currently a prototype concept: hardware specifications are subject to change as development continues.",
    related: ["How much will it cost?", "Is Connexus available now?"],
  },
  {
    id: "price",
    keywords: ["price", "cost", "how much", "pricing", "buy", "purchase", "subscription", "expensive"],
    answer:
      "Pricing hasn't been announced yet — Connexus is still in development. Ferrivox is exploring several revenue streams (hardware, software licensing, cloud sync, deployment and support), but nothing has been finalized. Join the early access list and you'll hear pricing news first.",
    related: ["Is Connexus available now?", "How do I get updates?"],
  },
  {
    id: "availability",
    keywords: ["available", "available now", "when launch", "release", "launch date", "buy now", "get it", "coming soon", "when"],
    answer:
      "Not yet. Connexus is currently in development by Ferrivox Ltd — status: coming soon. There's no public release date yet. You can join the early access list to follow progress and be notified as previews and pilots open up.",
    related: ["How do I get updates?", "Can my organization pilot it?"],
  },
  {
    id: "pilot",
    keywords: ["pilot", "trial", "test", "organization", "school", "company", "partnership", "deploy"],
    answer:
      "Organizations — schools, universities, businesses, hotels, events, NGOs and communities — can request a pilot through the Request a Pilot page. Tell us about your environment and connectivity situation; Ferrivox reviews every request and follows up. Submitting doesn't confirm a pilot date, since the platform is still maturing.",
    related: ["Is Connexus available now?", "Can I book a demo?"],
  },
  {
    id: "demo",
    keywords: ["demo", "presentation", "show", "book", "see it", "walkthrough"],
    answer:
      "You can book a virtual demo, a technical discussion, an organization pilot discussion or a developer discussion on the Book a Demo page. The team contacts you to arrange timing — no calendar slot is confirmed automatically.",
    related: ["Can my organization pilot it?"],
  },
  {
    id: "developers",
    keywords: ["developer", "build", "sdk", "api", "code", "app", "integrate", "program", "hack"],
    answer:
      "Connexus is intended to become a developer platform: a planned SDK, local APIs, the Connexus protocol for service discovery and encrypted delivery, Connexus Hub for sync, and an edge runtime. Developers can already create a profile and submit projects on the Developers page. The developer preview opens as components stabilize.",
    related: ["Is Connexus open source?", "How do I join the community?"],
  },
  {
    id: "open-source",
    keywords: ["open source", "opensource", "github", "repository", "license", "source code"],
    answer:
      "Ferrivox may open-source selected components of the Connexus ecosystem — such as the protocol, SDK or developer tools — where appropriate. Nothing is claimed as open source until it actually is. Official repositories will be announced on the Updates page.",
    related: ["How can developers build on it?"],
  },
  {
    id: "platforms",
    keywords: ["android", "windows", "ios", "iphone", "linux", "mac", "phone", "laptop", "device support", "compatible"],
    answer:
      "Android is expected to be a primary platform thanks to its local networking capabilities, and Connexus services are intended to be reachable from standard browsers and desktop platforms including Windows. Specific platform support will be confirmed as development continues.",
    related: ["What is the Connexus Box?"],
  },
  {
    id: "security",
    keywords: ["security", "secure", "encryption", "encrypted", "privacy", "private", "safe", "data"],
    answer:
      "Encrypted communication, authenticated devices and secure local services are design goals — details will be published as implementations are finalized. On data: Connexus is being designed around local-first storage. Data lives on the local network by default and syncs to the cloud only when configured. Developer emails on this website are private by default, and reviews are moderated before publication.",
    related: ["What data does Connexus store?"],
  },
  {
    id: "ai",
    keywords: ["ai", "artificial intelligence", "machine learning", "llm", "model", "assistant", "chatbot", "bot"],
    answer:
      "Local AI services are part of the long-term vision — running assistive services on the edge, close to users, without requiring Internet. It's under research and not yet a shipped feature. Fun fact: this chat bot itself runs entirely locally — no internet required, which is rather the theme here.",
    related: ["What is Connexus?"],
  },
  {
    id: "data",
    keywords: ["data", "store", "storage", "information", "collect", "personal"],
    answer:
      "Connexus is being designed around local-first storage: data lives on the local network by default and only syncs to the cloud when configured. Data minimization is a design principle. For this website specifically, we only store what you submit through forms — see the Privacy Policy page.",
    related: ["How is security handled?"],
  },
  {
    id: "ferrivox",
    keywords: ["ferrivox", "company", "who", "rwanda", "ishami", "ecosystem", "vision", "mission"],
    answer:
      "Ferrivox Ltd is a technology company based in Rwanda developing AI, data and software solutions. Its slogan: 'Iron will, infinite dreams.' Connexus is one of several projects under active development, alongside Ishami (education & training) and other R&D efforts. Built from Rwanda, designed for the world.",
    related: ["Is Connexus available now?"],
  },
  {
    id: "community",
    keywords: ["community", "join", "contribute", "discuss", "forum", "feedback", "review", "newsletter", "updates", "early access", "contact"],
    answer:
      "There are a few ways in: join the early access list for product news, create a developer profile if you build things, share feedback through the community page, or reach the team directly via the Contact page. Approved community feedback appears on the site — moderated, never auto-published.",
    related: ["How can developers build on it?"],
  },
  {
    id: "usecases",
    keywords: ["use case", "school", "hotel", "event", "campus", "community", "business", "field", "who is it for", "education"],
    answer:
      "Potential use cases being explored: schools (local lessons, quizzes, announcements), universities (campus apps), events (schedules and maps), businesses (private local comms), hotels (guest services), field operations (intermittent connectivity) and communities (local digital services). These are directions under exploration — not deployments that exist today.",
    related: ["Can my organization pilot it?"],
  },
  {
    id: "internet-back",
    keywords: ["what happens", "internet comes back", "reconnect", "after outage", "resume"],
    answer:
      "When the Internet comes back, Connexus is designed to synchronize whatever changed while you were offline — messages, content and application data flow to optional cloud services. The local network never stopped working; the sync layer just catches up.",
    related: ["Does it work without internet?"],
  },
];

/** Greeting shown in the widget and used as the fallback conversation starter. */
export const botGreeting =
  "Hi! I'm the Connexus Bot — a little local assistant, no internet required. Ask me anything about Connexus: what it is, how offline mode works, the Connexus Box, pilots or building on the platform.";

export const fallbackAnswer =
  "I don't have a confident answer for that yet — my knowledge base covers the Connexus platform, the Connexus Box, offline operation, pilots, developers and Ferrivox. Try one of the suggestions below, or reach the team through the Contact page.";
