# pgappstudios.com

The website of PG App Studios, an independent iPhone app studio in the Algarve, Portugal.
React + Vite + TypeScript + Tailwind, statically generated at build time and
hosted on Vercel (every push to `main` deploys in about a minute).

## Everyday tasks

| I want to… | Do this |
|---|---|
| Add an app | Add an entry with a `slug` to `src/data/appData.ts`, put it on a shelf in `GROUP_OF` in `src/data/catalog.ts`, add `public/icons/<slug>.webp` and `public/screens/<slug>/1..4.webp` (+ `-sm.webp`). Its page, sitemap entry, footer link and cards appear automatically. |
| Publish a blog post | Add `src/content/blog/<slug>.md` (copy any existing post for the frontmatter). Link the app with its App Store URL in the text and the post picks up that app's cover, promo card and colour. |
| Publish a health guide | Add `src/content/health/<slug>.md`. See `HEALTH-HUB-GUIDE.md`. |
| Refresh share images | `npm run build`, serve `dist/` on port 4791, then `npm run og`. Commit `public/og/`. |

Never delete a published post: correct it or redirect it in `vercel.json`.

## How it works

- `npm run build` runs `tsc`, `vite build`, then `scripts/ssg.mjs`, which
  renders every URL with `react-dom/server` into real HTML (title, meta,
  canonical, social tags, JSON-LD, preloads), writes `dist/404.html` and
  generates `dist/sitemap.xml` from the same data. It fails loudly if a page
  breaks or two pages share a title.
- Each page and each article is its own small JS chunk (`src/AppRoutes.tsx`).
  Blog posts are compiled from markdown at build time
  (`scripts/vite-plugin-md.mjs`), so no markdown parser ships to the browser.
- Design tokens live in `tailwind.config.ts` and `src/index.css`. Each app's
  accent colour (`src/data/appColors.json`) is taken from its icon.
- Store clicks, including links inside blog posts, are tracked in GA4 as
  `store_outbound_click` (`src/lib/interactions.ts`).

## Local development

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # full static build into dist/
```
