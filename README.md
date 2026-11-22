# Mohammed Humaidhah — Interactive Portfolio

Next.js 16 · React 19 · TypeScript · Tailwind 4 (no extra dependencies).

## Features
- **Dev OS feel**: skippable boot intro (once per tab, off with reduced motion), command palette (Ctrl/⌘ + K), interactive terminal
- **Case studies in windows**: each project opens in a draggable, closable, minimizable window (full-screen sheet on phones) with problem → what I built → how it works → demo → stack → source, and an honest status label
- Demos: FruitScan architecture view, temperature-alarm logic, Debian/Nginx replay, and the Smart Parking / VisionCheck **concept** simulators
- Live network-canvas background, animated aurora hero, magnetic buttons, 3D tilt, scroll-driven reveals (all respect `prefers-reduced-motion`)
- Skills as an interactive map (or list), filterable journey timeline, certificates wall, spoken languages and courses
- Arabic (RTL) / English toggle without a first-paint flash, dark / light theme
- Live GitHub repos + language mix (falls back to a snapshot)
- Gallery with filters + lightbox, contact form → mailto, Download CV
- Terminal extras: `timeline`, `case <project>`, `certs`, `languages`, `courses`, `cv`, `boot`, `sudo hire-me`… Easter egg: Konami code 😉

## Edit your content
- All text (EN + AR), projects, timeline, certificates and skills live in `lib/data.ts`.
- Site URL, title and CV path live in `lib/site.ts`. After renaming the Vercel project, set
  `NEXT_PUBLIC_SITE_URL` (e.g. `https://new-name.vercel.app`) in Vercel → Settings → Environment Variables.
- CV: put the PDF at `public/cv/Mohammed-Humaidhah-CV.pdf`. The button switches from "coming soon" to download automatically.
- Open owner TODOs: search the code for `TODO(owner)`.

## Run
```bash
npm install
npm run dev
```
