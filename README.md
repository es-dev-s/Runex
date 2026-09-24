# Runex public marketing site

Next.js (App Router) marketing + SEO/AEO site for [Runex](https://runex.cloud) — easy deployment platform for developers.

## Develop

```bash
cp .env.example .env.local   # if needed
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm run dev` binds `0.0.0.0:3000` so the site is reachable on your LAN (e.g. `http://<LAN-IP>:3000`).

Login / Deploy CTAs use `NEXT_PUBLIC_APP_URL` (default `https://runex.cloud`) and link to `/sign-in` and `/sign-up`.

## Build

```bash
npm run build
npm start
```

## Notes

See `NOTES.md` for strategy validation and gaps.
