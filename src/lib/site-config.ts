/**
 * Central site configuration for Connexus by Ferrivox Ltd.
 * Single source of truth for brand strings, navigation and product status.
 */

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
  socials: [] as { label: string; href: string }[], // Only populated when official URLs are provided.
} as const;

export type SiteConfig = typeof siteConfig;
