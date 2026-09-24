# Runex public site — NOTES

Built on Legion at:

`/home/pawan/Dashboard/YC - Projects/Harbor-Infra/Public_pages`

Strategy source: `../Runex_SEO_AEO_Strategy.md` (2026-09-24).

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

`npm run build` was verified exit 0 after implementation.

## Strategy validation — what aligns

| Strategy item | Status |
| --- | --- |
| Positioning: “Easy deployment for developers” / deployment platform | Homepage H1 + category eyebrow + About |
| Brand entity pages | `/`, `/about`, `/features`, `/security` |
| Technical SEO: unique titles, descriptions, canonicals, OG | `buildMetadata` + root layout |
| `sitemap.ts` / `robots.ts` | Present; disallows dashboard/auth-style paths |
| JSON-LD SoftwareApplication + Organization + WebSite | Root layout (no fake ratings/reviews) |
| FAQPage JSON-LD | Homepage + pricing + deploy pages where FAQs render |
| Docs: getting-started, GitHub deploy, custom domains | `/docs/*` as required |
| Deploy landings: Next.js, Node, Python, Go, Docker | `/deploy/*` |
| Compare: vs Vercel, Railway, Render | `/compare/*` factual tables + caveats |
| Blog ≥3 MDX posts | 4 posts under `content/blog/` |
| Accuracy: GitHub App, HTTPS, `*.runex.cloud`, `cname.runex.cloud`, container isolation | Consistently claimed; roadmap labeled |
| No Salesradar branding | Confirmed absent |
| No SOC2 / military-grade / fake ratings | Avoided |
| Pricing honesty | Points to dashboard as source of truth |
| Premium dark + amber, framer-motion, App Router SSG | Implemented |

## Gaps vs full strategy doc (intentional / later)

These are called out in the strategy as Phase 2–3 or optional — not blockers for this site scaffold:

1. **Docs depth** — strategy lists many more doc routes (`/docs/environments`, `/docs/logs`, `/docs/troubleshooting`, `/docs/https`, etc.). Only the required trio + overview are live.
2. **More compare pages** — vs Netlify / VPS / Kubernetes not built (only the three requested).
3. **Blog volume** — strategy lists ~20 topic ideas; we shipped 4 high-value posts to start.
4. **GitHub org / example repos** — external (github.com/runex-cloud, example apps); out of scope for this marketing app.
5. **Search Console / Bing Webmaster** — operational setup, not code.
6. **Contact page** — in recommended sitemap; not required by the task routes list.
7. **Screenshots / product UI media** — no real dashboard screenshots yet (hero uses a stylized terminal card).
8. **Live pricing amounts** — intentionally omitted so marketing never drifts from dashboard entitlements.
9. **Deeper network isolation / DB isolation claims** — marked as direction/roadmap on `/security`, per accuracy rule §48.
10. **`@tailwindcss/typography`** — used custom `.prose-runex` instead; fine for polish, optional later.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- `framer-motion` for scroll/entrance motion (client wrappers only)
- `next-mdx-remote` + `gray-matter` + `reading-time` for blog
- Server Components by default; client: `Header`, `Motion`

## Do not

- Push remotes unless asked (local git commit only)
- Touch VPS / harbor dashboard repo / other Harbor services from this tree

## Design system (RareUI landing craft)

Rare-inspired premium dark UI (not generic AI SaaS):

- Near-black canvas `#070707` + hot orange accent `#ff4d00`
- `Header` joined→split nav (see **Nav states** below)
- Centered hero: larger display type, blackspace, **non-circular** `HeroDepth` (angular grid + hex fragment + soft rectangular bloom — no orbit/ring watermark), badge, command + orange Deploy
- Bento capabilities with live `DeployExhibit` + hover-lift tiles
- Exhibit frames (`.frame` / `.frame-tight`), terminal/artboard surfaces
- Motion honors `prefers-reduced-motion`
- Huge typographic `Footer` with restrained orange bloom
- Shared shells: `PageHero`, `FeatureGrid`, `CTASection`, docs/blog/pricing/compare/deploy inherit Header

SEO routes, MDX blog/docs, sitemap/robots, JSON-LD unchanged.
Login → `NEXT_PUBLIC_APP_URL/sign-in`; Deploy → `/sign-up`.

## Nav states (`Header.tsx`)

Exact interaction (framer-motion springs; `prefers-reduced-motion` → instant):

| Phase | When | Visual |
| --- | --- | --- |
| **Joined · flush-top** | SSR / first paint (`scrollY≈0`, before entrance) | Single continuous pill, minimal top inset (attached to viewport top). Avoids flash of split islands. |
| **Joined · floating** | After mount entrance at top | Same joined bar settles down into ~16px floating inset (Apple-smooth spring). |
| **Split · three pills** | Scroll **down** past ~20px | Gap opens; shared container border dissolves; brand | links | utilities become three compact floating pills. |
| **Rejoin** | Scroll **up**, or `scrollY < 20` | Pills merge back into one bar. |
| **Joined · re-attach** | After leaving top once, return with `scrollY < 10` while joined | Inset tightens toward top-attached feel (~4px). |

CTAs: Login → `/sign-in`, Deploy → `/sign-up` via `NEXT_PUBLIC_APP_URL`.

### How to verify

1. `npm run dev` → open `/`
2. **Hard reload** at top: nav should appear as **one bar flush to top**, then ease into a floating joined bar (no three-island flash).
3. **Scroll down**: bar cleanly separates into three pills.
4. **Scroll up** / return to top: pills rejoin; near `scrollY≈0` inset tightens again.
5. DevTools → no hydration mismatch warning on `Header`.
6. `npm run build` must pass.
