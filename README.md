# Connexus — Connect beyond the Internet

Public website, developer portal and admin dashboard for **Connexus**, the offline-first
digital infrastructure platform being developed by **Ferrivox Ltd** (Rwanda).

> Connexus is currently **in development / coming soon**. Nothing on this site should be read
> as commercial availability, certification or claimed deployments — by design.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **React Three Fiber / Three.js** — procedural 3D Connexus Box (zero asset weight, no GLB downloads)
- **Framer Motion** — scroll reveals & subtle motion (respects `prefers-reduced-motion`)
- **Zod** — server-side validation for every form
- **File-backed JSON store** (`.data/db.json`) behind a narrow collection API — swap for
  Postgres/Prisma by reimplementing `src/server/db.ts` without touching callers

## Quick start

```bash
npm install
cp .env.example .env.local   # set AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD (site URL optional)
npm run dev
```

Production:

```bash
npm run build && npm start
```

## Configuration

All configuration lives in environment variables (see `.env.example`). Only `AUTH_SECRET`
and the admin credentials are required; everything else has a working default.

| Variable | Required | Purpose |
| --- | --- | --- |
| `AUTH_SECRET` | ✅ | HMAC key for signed admin session cookies — generate with `openssl rand -base64 32` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | ✅ | Seeded admin login for `/admin` |
| `NEXT_PUBLIC_SITE_URL` | — | Canonical origin for SEO (see below). Leave empty on Vercel |
| `NEXT_PUBLIC_CONTACT_EMAIL` | — | Public contact email (default `hello@ferrivox.com`) |
| `DATA_DIR` | — | Location of the JSON store (default `.data/`) |
| `CONNEXUS_AI_API_URL` / `CONNEXUS_AI_API_KEY` / `CONNEXUS_AI_MODEL` | — | Optional grounded LLM for the Connexus Bot |
| `EMAIL_API_KEY` / `EMAIL_FROM` | — | Optional transactional email provider |
| `STORAGE_ACCESS_KEY` / `STORAGE_SECRET_KEY` / `STORAGE_BUCKET` | — | Optional S3-compatible storage |
| `NEXT_PUBLIC_ANALYTICS_ID` | — | Optional privacy-respecting analytics |

### Site URL resolution

`getSiteUrl()` in `src/lib/site-config.ts` resolves the canonical origin in this order:

1. `NEXT_PUBLIC_SITE_URL` — if set; trailing slashes are stripped, empty never crashes the build
2. `VERCEL_PROJECT_PRODUCTION_URL` — injected automatically by Vercel
3. `VERCEL_URL` — per-deployment fallback, also injected by Vercel
4. `http://localhost:3000`

Canonical URLs, `og:url`, `sitemap.xml`, `robots.txt` and every JSON-LD `url` derive from
that single value — set one variable and the whole site follows. On Vercel you can leave
`NEXT_PUBLIC_SITE_URL` unset and the production domain is detected for you.

### Custom domain (when you outgrow `*.vercel.app`)

1. **Add the domain in Vercel** — Project → Settings → Domains — and follow the DNS
   prompts it shows (an apex `A` record or a `CNAME` for subdomains). Wait for the
   certificate to be issued.
2. **Point SEO at it** — set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in Vercel →
   Settings → Environment Variables (Production) and redeploy. Canonicals, sitemap,
   OG URLs and structured data all switch over automatically; no code changes needed.
3. **Update Google Search Console** — a `vercel.app` URL-prefix property can't be
   upgraded to a Domain property. Add a property for the new origin, verify (the HTML
   file and meta tag work as-is), and submit `https://your-domain.com/sitemap.xml`.
4. **Redirect the old origin** — configure Vercel to 301 `*.vercel.app` traffic to the
   custom domain so accumulated signals and old links transfer.
5. **Re-run the checks** — `npm run seo:check` after deploy: JSON-LD URLs and the
   sitemap should all reference the new origin, with 0 errors.

## Routes

### Public
| Route | Purpose |
| --- | --- |
| `/` | Full homepage: hero 3D, problem, what-is, network viz, box, how-it-works, technology, offline-first, use cases, ecosystem, developers, roadmap, feedback, FAQ, CTA |
| `/technology` | Architecture layers, offline-first timeline |
| `/connexus-box` | Hardware concept with interactive 3D + hotspots |
| `/use-cases` | Potential use cases (clearly labeled) |
| `/developers` | Developer platform + profile registration + directory |
| `/developers/projects` | Project submissions + moderated directory |
| `/community` | Community areas + feedback/review form |
| `/roadmap` | Stage-based roadmap (no invented dates) |
| `/updates` | News feed (admin-published) |
| `/faq` | Full FAQ + FAQPage structured data |
| `/pilot` `/demo` `/early-access` | Request flows |
| `/partners` `/investors` `/contact` | Business pages |
| `/privacy` `/terms` `/cookies` `/developer-terms` | Legal |

### Social links

Official accounts are managed in `src/lib/site-config.ts` (`siteConfig.socials`). Only
configured links render — footer icons and the contact page stay honest until real accounts
go live. GitHub, LinkedIn, YouTube and X have brand icons; anything else gets a globe.

### Admin
- `/admin` — dashboard (redirects to `/admin/login` without a session)
- Moderation queues: reviews, developer profiles, developer projects
- Pipelines: pilots, demos, contacts, early access, newsletter
- Audit log of admin actions

## API

`POST /api/early-access`, `/api/pilot`, `/api/demo`, `/api/contact`, `/api/reviews`,
`/api/developers`, `/api/developers/projects`, `/api/newsletter`, `/api/assistant` — all
Zod-validated, rate-limited per IP.

### Connexus Bot (AI assistant)

Every public page carries a floating **Connexus Bot** chat widget. It answers questions about
the platform from a curated knowledge base (`src/lib/assistant-kb.ts`) in two modes:

- **Local (default)** — keyword-scored retrieval over pre-approved copy. No internet, no data
  leaves the server. On-brand: the bot itself works offline.
- **Grounded LLM (optional)** — set `CONNEXUS_AI_API_URL` + `CONNEXUS_AI_API_KEY` to route
  through any OpenAI-compatible chat API. The knowledge base is injected as grounding context
  and the system prompt forbids inventing customers, dates or deployments; any LLM failure
  falls back to local mode automatically.

The bot is hidden on `/admin` routes and rate-limited (20 req/min/IP).

`POST /api/admin/login`, `POST /api/admin/logout`,
`GET|PATCH|DELETE /api/admin/[collection]` — session-cookie authenticated, audited.

## Content model

Everything is stored in typed collections (`src/server/collections.ts`): early access,
pilot requests, demo requests, contact requests, reviews, developer profiles/projects,
newsletter, admins, comments, content items (roadmap/FAQ/updates), audit logs.

Reviews and developer content are **never published automatically** — they start `pending`
and require admin approval. Developer emails are private unless the developer opts in.

## Security

- Server-side validation (Zod) on every endpoint
- Per-IP rate limiting on all public forms and login
- scrypt password hashing; HMAC-signed, timing-safe session tokens (httpOnly, 12h)
- Security headers via `next.config.mjs`
- Admin routes excluded from `robots.txt`; admin pages `noindex`
- No secrets in frontend code; `.env.example` documents required variables

## SEO

Metadata templates, canonical URLs, Open Graph + dynamic OG image, Twitter cards,
`sitemap.xml`, `robots.txt`, Google Search Console verification (HTML file at the site
root **and** a `google-site-verification` meta tag), and structured data: Organization +
WebSite (global), WebApplication (technology), FAQPage (FAQ), BreadcrumbList. No fake
ratings or reviews in structured data.

- Launch content ships as an in-code fallback (`listContent()` in `src/server/seed.ts`),
  so SEO-critical pages never render empty on serverless builds where the `.data` store
  is absent.
- `npm run seo:check` validates every JSON-LD block against Google's rich-results
  requirements (required fields per type, duplicate entities, canonicals) — once against
  the local build, once against the live site.

## Performance

- 3D canvas loads **after first paint** via dynamic import (no WebGL before LCP)
- Procedural geometry — zero 3D asset downloads
- System font fallbacks; `next/font` self-hosted Inter (body), JetBrains Mono (technical),
  Sora (display) and Cormorant Garamond (accent serif)
- Reduced-motion support throughout

## Internationalization

Copy is centralized in `src/lib/site-config.ts` and components, ready for extraction to
`next-intl` when Kinyarwanda translations are added. Do not machine-translate legal pages
without review.

## Data layer swap

The JSON store exists so the site runs anywhere (including serverless with a writable
volume) with zero infra. To move to Postgres: implement the same
`list/find/insert/update/remove` surface in `src/server/db.ts` with Prisma or Drizzle and
delete `.data/`. The schema in `collections.ts` maps 1:1 to proposed tables.
