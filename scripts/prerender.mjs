/**
 * Prerender the built SPA to static HTML, one file per route.
 *
 * Runs after `vite build`. Serves the `dist/` output with `vite preview`,
 * visits each route in headless Chromium, and writes the fully-rendered HTML
 * back into `dist/<route>/index.html`. Crawlers and AI engines that don't run
 * JavaScript then receive real content (title, meta, JSON-LD, body) per page.
 *
 * This step is best-effort: `postbuild` invokes it with a fallback so a
 * prerender failure never fails the deploy — you simply get the normal SPA.
 */
import { preview } from 'vite';
import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs/promises';

const PORT = 4321;

// Keep in sync with public/sitemap.xml. App routes are also discoverable via
// links, but listing them explicitly guarantees coverage.
const ROUTES = [
  '/',
  '/our-apps',
  '/blog',
  '/contact',
  '/apps/portugal-lifestyle-pro',
  '/apps/portugal-lifestyle-learn-it',
  '/apps/dinkup',
  '/apps/gritvit',
  '/apps/cyclebuddy',
  '/apps/fasting-and-walking',
  '/apps/aquafasty-diet-plan',
  '/apps/voice-to-caption',
  '/apps/docyscan',
  '/apps/megaconverter',
  '/apps/soccer-legends',
  '/apps/basketball-legends',
  '/apps/bible-test-your-faith',
  '/apps/baby-learning-games',
];

async function main() {
  const server = await preview({ preview: { port: PORT, strictPort: true } });
  const base = `http://localhost:${PORT}`;
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let ok = 0;
  for (const route of ROUTES) {
    const page = await browser.newPage();
    try {
      await page.goto(base + route, { waitUntil: 'networkidle0', timeout: 30000 });
      // Wait for React to paint content into #root.
      await page.waitForSelector('#root > *', { timeout: 15000 }).catch(() => {});
      const html = '<!DOCTYPE html>\n' + (await page.content()).replace(/^<!DOCTYPE html>/i, '');
      const outDir = path.join('dist', route === '/' ? '' : route);
      await fs.mkdir(outDir, { recursive: true });
      await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
      ok += 1;
      console.log(`  prerendered ${route}`);
    } catch (err) {
      console.warn(`  skipped ${route}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  await new Promise((resolve) => server.httpServer.close(resolve));
  console.log(`Prerender complete: ${ok}/${ROUTES.length} routes.`);
}

main().catch((err) => {
  console.error('Prerender failed:', err.message);
  process.exit(1);
});
