import { siteConfig } from "./site-config";

const BASE = siteConfig.url;

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ferrivox Ltd",
    slogan: siteConfig.company.slogan,
    url: BASE,
    email: siteConfig.company.email,
    address: { "@type": "PostalAddress", addressCountry: "RW" },
    department: {
      "@type": "Organization",
      name: "Connexus",
      slogan: siteConfig.tagline,
      url: BASE,
    },
  };
}

export function softwareAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Connexus",
    applicationCategory: "NetworkingApplication",
    operatingSystem: "Android, Linux, Web",
    description:
      "Offline-first local digital infrastructure platform being developed by Ferrivox Ltd.",
    url: BASE,
    author: { "@type": "Organization", name: "Ferrivox Ltd" },
    // No offers/ratings — product is not commercially available yet.
  };
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
