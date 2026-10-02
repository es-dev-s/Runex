# Runex public marketing site

Static marketing + SEO/AEO site for [Runex](https://runex.cloud): easy deployment platform for developers.

Every page is a standalone `.html` file: all CSS (including the Geist fonts) is inlined in a `<style>` block, images are embedded as data URIs, and the small script for animations, the mobile menu, section sidebars, and the copy button is inlined at the end of `<body>`. There is no build step and no dependencies.

## View locally

Open `index.html` directly in a browser, or serve the folder:

```bash
npx serve .
```

Internal links use relative `.html` paths, so navigation works both from `file://` and from any static host.

## Deploy

Upload the folder to any static host. `sitemap.xml` and canonical URLs use clean paths (`/features`, not `/features.html`), so enable clean URLs on the host (Netlify, Vercel, and Cloudflare Pages serve `features.html` for `/features` by default).

## Editing

Pages share markup (header, footer, styles, script) by copy, not by include. A change to shared parts must be applied to every `.html` file.

## Notes

See `NOTES.md` for strategy validation and gaps.
