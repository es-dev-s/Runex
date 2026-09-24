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
- Nav chrome: **always-split** three floating dark-glass pills (logo | links | Login+Deploy); dense ~4px gaps; no joined outer parent / no join↔split scroll animation. Inset `boxShadow` rings only — no CSS `borderWidth` (avoids white border blink). Subtle top-pad / shadow when scrolled.
- Hero depth (`HeroDepth`): soft orange bloom + vignette + faint grain — **no** perspective/angular line grids, hex fragments, or circular watermarks
- Homepage proximity sidebar (`ProximitySidebar`): left-side Rare-style section nav (lg+ only); Introduction → Deploy; nearest label in accent, neighbors graduated opacity/scale; footer-gated (hidden over footer); `aria-current`; reduced-motion skips scale. Overlay (pointer-events on links only).
- Homepage testimonials: Rare-style **3-column vertical marquee** — placed **after FAQ, before final CTA**. Placeholders — replace before launch. No review/rating schema.
- Homepage section rhythm: no full-bleed `border-t` / `border-y` rails between sections (padding + blackspace only). Footer: full-bleed two-column (`RUNEX` left / link columns right, `max-w-[1600px]`), soft accent glow behind wordmark, legal under hairline. Card/frame borders on tiles unchanged.
- Homepage section ids (sidebar): `introduction`, `capabilities`, `how-it-works`, `stacks`, `learn`, `faq`, `voices`, `deploy` (`scroll-mt-28`).

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- `framer-motion` for scroll/entrance motion
- `next-mdx-remote` + `gray-matter` + `reading-time` for blog
- RareUI craft: always-split Header, ProximitySidebar, HeroDepth, wide Footer, bottom marquee — SEO work is content + structure

## Do not

- Push remotes unless asked (local git commit only)
- Touch VPS / harbor dashboard repo / other Harbor services from this tree


## Polish pass — footer + section indicators (2026-09-24)

Local Legion only (no clone, no push).

| Item | Detail |
| --- | --- |
| Footer | Full-bleed shell (`max-w-[1600px]`, wide `px-6/8/12/16`); **RUNEX** large left wordmark + soft `#FC4C01` glow; PRODUCT/DOCS/COMPARE/COMPANY columns right; legal row under hairline; `data-site-footer` |
| Footer gate | `useFooterGate` observes `[data-site-footer]` (fallback `footer`); fades indicators to opacity 0 + `pointer-events: none` when footer intersects |
| Homepage | `ProximitySidebar` only (+ footer gate). Stacks: monochrome inline SVGs via `StackIcons` / `stackIconMap` (GitHub, Next.js, Node.js, Python, Go, Docker) |
| Hook sidebar | `what-is-runex`, `features`, `security` — L-tick active marker; lg+; reduced-motion; footer-gated. Docs left nav unchanged (no double nav) |
| Bouncy indicator | `pricing`, `deploy`, `about`, `use-cases/full-stack-apps` — spring thumb; labels on hover/active; footer-gated; instant jump if reduced-motion |
| Skipped | `use-cases` index (<2 sections); docs article pages (DocsNav already present) |

Verify: `npm run build` (must pass). Commit message: `feat: full-width footer; footer-gated indicators (proximity/hook/bouncy)`.

## Brand logo watermark (2026-09-24)

Local Legion only (no clone, no push).

| Item | Detail |
| --- | --- |
| Assets | Cleaned `public/runex.svg` (~2.3KB, C2PA `<metadata>` stripped; fill `#FD4E00`); compact crop `public/runex-mark.svg` for nav/favicon |
| Component | `BrandAura` / `RunexLogoMark` — faded (~0.08–0.20) + blurred (26–36px) + faint sharp layer; `pointer-events-none`; `aria-hidden`; placements `tr\|tl\|br\|bl\|center\|hero-right` |
| Hero | `HeroDepth` — large `hero-right` aura behind H1 (under vignette/content) |
| Nav | `Header` `RunexMark` → crisp `/runex-mark.svg` ~18px (no blur) |
| Pages | `PageHero` default `tr`; Deploy templates `br`; Compare templates `bl`; `CTASection` `br` (faint); Footer `bl` (very faint); Docs shell `tr` (optional ultra-faint) |
| Metadata | `layout.tsx` icons → `/runex-mark.svg` |
| Accent | Unchanged `#FC4C01` |

Verify: `npm run build`. Commit: `feat: runex.svg brand watermark on hero and pages`.
