/**
 * Central site configuration for Connexus by Ferrivox Ltd.
 * Single source of truth for brand strings, navigation and product status.
 */

const FALLBACK_SITE_URL = "http://localhost:3000";

/**
 * Resolve the canonical site URL safely.
 * An unset OR EMPTY NEXT_PUBLIC_SITE_URL (common on hosting platforms) must
 * never produce `new URL("")` — that throws ERR_INVALID_URL during build.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return raw && raw.length > 0 ? raw : FALLBACK_SITE_URL;
}

export const siteConfig = {
  url: getSiteUrl(),
  productName: "Connexus",
  company: {
    name: "Ferrivox Ltd",
    slogan: "Iron will, infinite dreams.",
    country: "Rwanda",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@ferrivox.com",
  },
  tagline: "Connect beyond the Internet.",
  supportStatement:
    "Local digital infrastructure for a connected world — even when connectivity isn't available.",
  hero: {
    eyebrow: "FERRIVOX LTD · TECHNOLOGY IN DEVELOPMENT",
    heading: "Your digital world shouldn't stop when the Internet does.",
    sub: "Connexus is building an offline-first digital infrastructure layer for communication, content, applications and local computing.",
  },
  status: {
    label: "IN DEVELOPMENT",
    stages: [
      { key: "research", label: "Research", done: true },
      { key: "prototype", label: "Prototype", done: true },
      { key: "pilot", label: "Pilot", done: false },
      { key: "release", label: "Public Release", done: false },
    ],
  },
  nav: [
    { label: "Vision", href: "/#problem" },
    { label: "Technology", href: "/technology" },
    { label: "Connexus Box", href: "/connexus-box" },
    { label: "Use Cases", href: "/use-cases" },
    { label: "Developers", href: "/developers" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Community", href: "/community" },
    { label: "FAQ", href: "/faq" },
  ],
  cta: {
    earlyAccess: { label: "Join Early Access", href: "/early-access" },
    explore: { label: "Explore the Technology", href: "/technology" },
    pilot: { label: "Request a Pilot", href: "/pilot" },
    build: { label: "Build with Connexus", href: "/developers" },
  },
  ecosystem: [
    { name: "CONNEXUS", kind: "Offline-first infrastructure", flagship: true, href: "/technology" },
    { name: "ISHAMI", kind: "Education & training", flagship: false, href: null },
    { name: "GENDA", kind: "R&D project", flagship: false, href: null },
    { name: "IFARANGA", kind: "R&D project", flagship: false, href: null },
    { name: "AP IKIBINA", kind: "R&D project", flagship: false, href: null },
    { name: "FIESTA STUDIO", kind: "Creative studio", flagship: false, href: null },
  ],
  /**
   * Official social profiles. Leave empty until real URLs exist — the footer
   * renders icons only for populated entries. Fill these in as accounts go live.
   */
  socials: [
    { label: "GitHub", href: "https://github.com/shema-f/connexus" },
    // { label: "LinkedIn", href: "" },
    // { label: "YouTube", href: "" },
    // { label: "X", href: "" },
  ] as { label: string; href: string }[],
  assistant: {
    name: "Connexus Bot",
    tagline: "Ask me about Connexus — I run locally, no internet required.",
    /** When CONNEXUS_AI_API_KEY + CONNEXUS_AI_API_URL are set, replies come from the LLM;
     *  otherwise the bot answers entirely from the local knowledge base below. */
    model: "connexus-local-v1",
    suggestions: [
      "What is Connexus?",
      "Does it work without internet?",
      "What is the Connexus Box?",
      "How can developers build on it?",
      "How do I request a pilot?",
      "Is Connexus available now?",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
