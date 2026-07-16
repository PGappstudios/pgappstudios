# SEO improvements — July 2026

Changes made to promote **all** apps and make the site crawlable by Google + AI engines.

## What changed

1. **A landing page for every app** — new route `/apps/:slug` (`src/pages/AppDetail.tsx`), data-driven from `src/data/appData.ts`. Every app now has its own indexable page with a hero, features, description, FAQ, App Store / Google Play buttons, related apps, and JSON-LD schema (`SoftwareApplication` + `BreadcrumbList` + `FAQPage`). 14 pages, equal quality:
   `/apps/portugal-lifestyle-pro`, `/apps/dinkup`, `/apps/gritvit`, `/apps/cyclebuddy`, `/apps/fasting-and-walking`, `/apps/aquafasty-diet-plan`, `/apps/voice-to-caption`, `/apps/docyscan`, `/apps/megaconverter`, `/apps/soccer-legends`, `/apps/basketball-legends`, `/apps/bible-test-your-faith`, `/apps/baby-learning-games`, `/apps/portugal-lifestyle-learn-it`.

2. **App cards now link to those pages** — `AppCard` got a "Learn more" internal link (plus the existing App Store button). Internal linking from Home and Our Apps into every app page.

3. **Prerendering** — `npm run build` now runs `scripts/prerender.mjs` after the Vite build, writing real static HTML per route into `dist/`. Crawlers and AI engines that don't run JavaScript now get full content, meta tags and schema per page. `src/main.tsx` hydrates the prerendered HTML.
   - The step is **non-fatal**: if Chromium can't launch in CI, it prints "prerender skipped" and the normal SPA still deploys. Your build never breaks.
   - Uses `puppeteer` (a devDependency). On first deploy it downloads Chromium.

4. **Complete sitemap** — `public/sitemap.xml` now lists all app pages + blog posts (was 4 URLs).

5. **robots.txt** — explicitly allows AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended, etc.).

6. **Removed** the leftover Lovable `gptengineer.js` editor script from `index.html`.

## To deploy
Commit and push to `github.com/PGappstudios/pgappstudios`; your host (Netlify/Vercel) runs `npm run build`, which includes the prerender. The SPA rewrite still applies — prerendered files are served first because they exist on disk.

## Recommended next (not done yet)
- **Optimize images** — the PNGs in `public/` are 1–2 MB each (`basketballlegendslogo.png` 2.2 MB, etc.). Convert to WebP and resize to ~512px. Biggest remaining Core Web Vitals win; affects every page.
- **Add real screenshots** to app pages (there's a natural slot in `AppDetail.tsx`).
- **Point the blog-automation prompt** (`BLOG_AUTOMATION_SETUP.md`) at your actual apps instead of generic "iOS development" filler — those `content/posts/*.md` are currently unused by the site but the automation keeps generating off-topic content.
- When you add/rename an app, update the route list in `scripts/prerender.mjs` and `public/sitemap.xml` (or wire a generator).

A backup of the pre-change code is at `../pgappstudios-main.backup-2026-07-13`.
