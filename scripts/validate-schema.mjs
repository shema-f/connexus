/**
 * Structured-data smoke test: extracts every
 * <script type="application/ld+json"> block, validates the JSON and checks
 * Google's required/recommended properties per type.
 *
 * Usage:
 *   node scripts/validate-schema.mjs            # live site (default: production)
 *   node scripts/validate-schema.mjs --local    # prerendered .next output on disk
 *   SEO_BASE_URL=https://deploy node scripts/validate-schema.mjs
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const LIVE = (process.env.SEO_BASE_URL ?? "https://connexus-tau.vercel.app").replace(/\/+$/, "");
// Origin the JSON-LD URLs were baked with (local builds carry production URLs).
const CANONICAL = (process.env.SEO_CANONICAL_BASE ?? LIVE).replace(/\/+$/, "");

const REQUIRED = {
  Organization: ["name", "url", "logo"],
  WebSite: ["name", "url"],
  WebApplication: ["name", "applicationCategory", "operatingSystem", "url"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  PostalAddress: ["addressCountry"],
  ListItem: ["position", "name", "item"],
  Question: ["name", "acceptedAnswer"],
};

function collect(node, out) {
  if (Array.isArray(node)) return node.forEach((n) => collect(n, out));
  if (!node || typeof node !== "object") return;
  if (typeof node["@type"] === "string") out.push(node);
  for (const v of Object.values(node)) collect(v, out);
}

/** List pages as { route, html } — live fetches, --local reads prerendered files. */
function loadPages() {
  if (!process.argv.includes("--local")) return null;

  const appDir = join(process.cwd(), ".next", "server", "app");
  if (!existsSync(appDir)) throw new Error("No .next build found — run `npm run build` first.");

  const pages = [];
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith(".html")) {
        const rel = relative(appDir, full);
        const route =
          rel === "index.html" ? "/" : "/" + rel.slice(0, -".html".length).split(sep).join("/");
        if (route.startsWith("/_")) continue; // internal framework files
        pages.push({ route, html: readFileSync(full, "utf8") });
      }
    }
  }
  walk(appDir);
  return pages;
}

const localPages = loadPages();

let pages = 0;
let errors = 0;
let warnings = 0;
const typeCounts = {};

const pageList =
  localPages ??
  (async function* () {
    const xml = await (await fetch(`${LIVE}/sitemap.xml`)).text();
    const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1].slice(LIVE.length) || "/")
      .concat("/"); // sitemap lists "/" as "" — normalize duplicates away
    for (const route of [...new Set(routes)]) {
      yield { route, html: await (await fetch(LIVE + route)).text() };
    }
  })();

for await (const { route, html } of pageList) {
  pages++;

  const blocks = [
    ...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ].map((m) => m[1]);

  // Canonical is required on indexable pages; noindexed pages are exempt.
  if (!html.includes('<link rel="canonical"') && !html.includes("noindex")) {
    console.log(`✗ ${route}: missing <link rel="canonical">`);
    errors++;
  }

  if (blocks.length === 0) {
    console.log(`· ${route}: no JSON-LD (ok for form/admin pages)`);
    continue;
  }

  const parsed = [];
  for (const b of blocks) {
    try {
      parsed.push(JSON.parse(b));
    } catch (e) {
      console.log(`✗ ${route}: INVALID JSON-LD — ${e.message}`);
      errors++;
    }
  }

  const nodes = [];
  collect(parsed, nodes);

  // Flag the same top-level type emitted in two separate blocks. Nested
  // references (publisher, department…) legitimately repeat across blocks.
  const topLevel = parsed.map((p) => p?.["@type"]).filter(Boolean);
  for (const t of new Set(topLevel)) {
    const n = topLevel.filter((x) => x === t).length;
    if (n > 1) {
      console.log(`⚠ ${route}: top-level "${t}" appears in ${n} separate JSON-LD blocks`);
      warnings++;
    }
  }

  for (const node of nodes) {
    const type = node["@type"];
    typeCounts[type] = (typeCounts[type] ?? 0) + 1;
    // Google requires these fields on the entity the page declares
    // (top level); nested references may legitimately be sparser.
    if (parsed.includes(node)) {
      for (const field of REQUIRED[type] ?? []) {
        const val = node[field];
        if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0)) {
          console.log(`✗ ${route}: ${type} missing required "${field}" — ${JSON.stringify(node).slice(0, 160)}`);
          errors++;
        }
      }
    }
    // All URLs in JSON-LD must point at the canonical origin — except
    // @context (always schema.org) and sameAs (by definition external).
    for (const [k, v] of Object.entries(node)) {
      if (k === "@context" || k === "sameAs") continue;
      if (typeof v === "string" && /^https?:\/\//.test(v) && !v.startsWith(CANONICAL)) {
        console.log(`⚠ ${route}: ${type}.${k} points off-site: ${v}`);
        warnings++;
      }
    }
  }
}

console.log(`\n—— ${pages} pages crawled${localPages ? " (from .next build)" : ""} ——`);
for (const [t, c] of Object.entries(typeCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t}: ${c}`);
}
console.log(errors === 0 ? `✔ ${errors} errors, ${warnings} warnings` : `✘ ${errors} errors, ${warnings} warnings`);
process.exit(errors === 0 ? 0 : 1);
