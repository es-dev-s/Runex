# Runex public site — NOTES

Built on Legion at:

`/home/pawan/Dashboard/YC - Projects/Harbor-Infra/Public_pages`

Strategy sources:

- `../Runex_SEO_AEO_Strategy.md` (2026-09-24)
- `../Runex_SEO_AEO_Keyword_Analysis_Report.md` (2026-09-24)

## How to run

```bash
cd "/home/pawan/Dashboard/YC - Projects/Harbor-Infra/Public_pages"
cp .env.example .env.local   # already present with production defaults
npm install
npm run dev
```

- Local: http://localhost:3000
- Production build: `npm run build && npm start`
- Login CTA → `https://runex.cloud/sign-in`
- Deploy / sign-up CTA → `https://runex.cloud/sign-up`
- Controlled by `NEXT_PUBLIC_APP_URL` (see `.env.example`)

## SEO + AEO batch shipped (2026-09-24)

Entity sentence preserved across homepage, `/what-is-runex`, about, JSON-LD:

> **Runex is an easy cloud deployment platform for developers.**

| Item | Status |
| --- | --- |
| `/what-is-runex` brand entity + FAQ JSON-LD | Shipped |
| `/deploy` hub + `/deploy/github` commercial | Shipped |
| `/use-cases` + `/use-cases/full-stack-apps` | Shipped (external DBs only — no invented managed DB) |
| Homepage H1/copy/FAQ AEO polish (§11 / §12) | Shipped |
| `siteConfig` description + keywords; Org `slogan` / `alternateName` | Shipped (`sameAs` empty until real URLs) |
| Blog: `what-is-a-paas`, `paas-vs-vps`, `how-to-deploy-a-nextjs-app`, `how-to-deploy-a-docker-container` | Shipped |
| Docs: env vars + troubleshooting hub + 3 problem pages | Shipped |
| Breadcrumbs on deploy/docs/compare/what-is/use-cases | Shipped |
| Sitemap priorities (`/` + `/what-is-runex` high; deploy 0.8) | Shipped |
| Internal links (home → entity/deploy; deploy → docs/security) | Shipped |
| `public/llms.txt` + `public/ai.txt` | Shipped |
| Compare: vs Netlify + vs VPS | Shipped (nice-to-have) |
| No SearchAction schema | Skipped (no on-site search) |

## Gaps vs keyword report roadmap (remaining — ops / later content)

1. **More blog volume** — report §18 lists ~30 topics; we have 8 posts total.
2. **More use-case pages** — developers / startups / agencies not built (only full-stack).
3. **Docs depth** — logs, HTTPS-only page, deployments reference still optional.
4. **External authority** — GitHub org, Product Hunt, Dev.to, HN, example repos (not this repo).
5. **Search Console + Bing Webmaster + Bing AI Performance** — operational setup.
6. **`sameAs` profiles** — add to `siteConfig.sameAs` only when real public URLs exist.
7. **Screenshots / case studies** — still missing.
8. **Live pricing amounts** — still dashboard source of truth only.

## Accuracy rules (unchanged)

Never invent SOC2, military-grade, fake ratings, zero-downtime, DDoS, network isolation as product fact unless enforced and documented. Claim: GitHub App deploy, `*.runex.cloud`, `cname.runex.cloud`, HTTPS, container isolation, env vars, custom domains.


## Design system

- Canvas: near-black RareUI craft (`--background: #070707`, charcoal cards/borders)
- Accent: **Runex orange `#FC4C01`** (original brand accent)
  - `--accent: #FC4C01`
  - `--accent-soft: #ff6a2b` (hover)
  - `--accent-dim` / `--accent-glow`: rgba(252, 76, 1, …)
  - Primary buttons: `bg-accent text-black` for readable contrast on orange fill
- Nav chrome: inset `boxShadow` rings only — no CSS `borderWidth` on Header clusters (avoids white border blink on hard reload)
- Hero depth (`HeroDepth`): soft orange bloom + vignette + faint grain — **no** perspective/angular line grids, hex fragments, or circular watermarks
- Homepage testimonials marquee: six sample customer voices are placeholders; replace with real quotes before launch. No review/rating schema.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- `framer-motion` for scroll/entrance motion
- `next-mdx-remote` + `gray-matter` + `reading-time` for blog
- RareUI craft Header / HeroDepth (atmospheric blooms + vignette, no line grids or rings) — SEO work is content + structure

## Do not

- Push remotes unless asked (local git commit only)
- Touch VPS / harbor dashboard repo / other Harbor services from this tree
