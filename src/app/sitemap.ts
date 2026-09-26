import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = siteConfig.url;
  const now = new Date();

  const routes: { path: string; priority: number; freq: "daily" | "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/technology", priority: 0.9, freq: "monthly" },
    { path: "/connexus-box", priority: 0.9, freq: "monthly" },
    { path: "/use-cases", priority: 0.8, freq: "monthly" },
    { path: "/developers", priority: 0.8, freq: "weekly" },
    { path: "/developers/projects", priority: 0.7, freq: "weekly" },
    { path: "/community", priority: 0.7, freq: "weekly" },
    { path: "/roadmap", priority: 0.7, freq: "monthly" },
    { path: "/updates", priority: 0.7, freq: "daily" },
    { path: "/faq", priority: 0.7, freq: "monthly" },
    { path: "/pilot", priority: 0.8, freq: "monthly" },
    { path: "/demo", priority: 0.7, freq: "monthly" },
    { path: "/early-access", priority: 0.8, freq: "monthly" },
    { path: "/partners", priority: 0.6, freq: "monthly" },
    { path: "/investors", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.6, freq: "monthly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
    { path: "/terms", priority: 0.3, freq: "yearly" },
    { path: "/cookies", priority: 0.3, freq: "yearly" },
    { path: "/developer-terms", priority: 0.3, freq: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${site}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
