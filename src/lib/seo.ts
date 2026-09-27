import { siteConfig } from "./site-config";

const BASE = siteConfig.url;
const LOGO_URL = `${BASE}/brand/logo-512.png`;

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ferrivox Ltd",
    alternateName: "Ferrivox",
    slogan: siteConfig.company.slogan,
    url: BASE,
    email: siteConfig.company.email,
    logo: LOGO_URL,
    image: LOGO_URL,
    address: { "@type": "PostalAddress", addressCountry: "RW" },
    sameAs: siteConfig.socials.map((s) => s.href),
    department: {
      "@type": "Organization",
      name: "Connexus",
      slogan: siteConfig.tagline,
      url: BASE,
      logo: LOGO_URL,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Connexus",
    alternateName: "Connexus by Ferrivox",
    url: BASE,
    description:
      "Offline-first digital infrastructure platform for local communication, content, applications and edge services.",
    publisher: { "@type": "Organization", name: "Ferrivox Ltd", url: BASE, logo: LOGO_URL },
    inLanguage: "en",
  };
}

export function webAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Connexus",
    applicationCategory: "NetworkingApplication",
    applicationSubCategory: "Offline-first digital infrastructure",
    operatingSystem: "Android, Linux, Web",
    description:
      "Offline-first local digital infrastructure platform for communication, content, applications and edge services, being developed by Ferrivox Ltd.",
    url: BASE,
    author: { "@type": "Organization", name: "Ferrivox Ltd", url: BASE },
    publisher: { "@type": "Organization", name: "Ferrivox Ltd", url: BASE },
    featureList: [
      "Offline-first local networking",
      "Local content and application delivery",
      "Edge services and synchronization hub",
      "Developer SDK and local APIs (planned)",
    ],
    // No offers/ratings — product is not commercially available yet.
  };
}

/** @deprecated Use webAppJsonLd (schema.org WebApplication) instead. */
export function softwareAppJsonLd() {
  return webAppJsonLd();
}

export function faqJsonLd(items: { title: string; body: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.title,
      acceptedAnswer: { "@type": "Answer", text: i.body },
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${BASE}${t.path}`,
    })),
  };
}
