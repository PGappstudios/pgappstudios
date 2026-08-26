# SEO improvements — July 2026

Changes made to promote **all** apps and make the site crawlable by Google + AI engines.

## What changed

1. **A landing page for every app** — new route `/apps/:slug` (`src/pages/AppDetail.tsx`), data-driven from `src/data/appData.ts`. Every app now has its own indexable page with a hero, features, description, FAQ, App Store / Google Play buttons, related apps, and JSON-LD schema (`SoftwareApplication` + `BreadcrumbList` + `FAQPage`). 14 pages, equal quality:
   `/apps/portugal-lifestyle-pro`, `/apps/dinkup`, `/apps/gritvit`, `/apps/cyclebuddy`, `/apps/fasting-and-walking`, `/apps/aquafasty-diet-plan`, `/apps/voice-to-caption`, `/apps/docyscan`, `/apps/megaconverter`, `/apps/soccer-legends`, `/apps/basketball-legends`, `/apps/bible-test-your-faith`, `/apps/baby-learning-games`, `/apps/portugal-lifestyle-learn-it`.

2. **App cards now link to those pages** — `AppCard` got a "Learn more" internal link (plus the existing App Store button). Internal linking from Home and Our Apps into every app page.

3. **Static generation (no browser)** — `npm run build` runs `scripts/ssg.mjs` after the Vite build. It renders every route with `react-dom/server` and writes real HTML to `dist/<route>/index.html`, with that page's title, description, canonical, social tags and JSON-LD baked in. Crawlers and AI engines that don't run JavaScript get the full page.
   - This replaced an earlier Puppeteer approach that **could not run in Vercel's build container**, so it silently skipped on every deploy and the live site served an empty shell to crawlers for weeks. The new script needs no browser and runs anywhere the build runs.
   - Routes live in `scripts/routes.mjs`; `src/AppRoutes.tsx` is shared by the browser and the build so both render the same tree.

4. **Complete sitemap** — `public/sitemap.xml` now lists all app pages + blog posts (was 4 URLs).

5. **robots.txt** — explicitly allows AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended, etc.).

6. **Removed** the leftover Lovable `gptengineer.js` editor script from `index.html`.

## To deploy
Commit and push to `github.com/PGappstudios/pgappstudios`; Vercel runs `npm run build`, which includes static generation. Vercel serves the generated files before applying the SPA rewrite, so every URL returns its own HTML.

## Recommended next (not done yet)
- **Optimize images** — the PNGs in `public/` are 1–2 MB each (`basketballlegendslogo.png` 2.2 MB, etc.). Convert to WebP and resize to ~512px. Biggest remaining Core Web Vitals win; affects every page.
- **Add real screenshots** to app pages (there's a natural slot in `AppDetail.tsx`).
- **Point the blog-automation prompt** (`BLOG_AUTOMATION_SETUP.md`) at your actual apps instead of generic "iOS development" filler — those `content/posts/*.md` are currently unused by the site but the automation keeps generating off-topic content.
- When you add/rename an app, update the route list in `scripts/routes.mjs` and `public/sitemap.xml` (or wire a generator).

A backup of the pre-change code is at `../pgappstudios-main.backup-2026-07-13`.
