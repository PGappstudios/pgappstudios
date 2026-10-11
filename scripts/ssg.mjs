/**
 * Static site generation, no browser required.
 *
 * Renders every URL with react-dom/server at build time and writes real HTML
 * to dist/<route>/index.html, with that page's title, meta, canonical, social
 * tags, JSON-LD and the exact JS chunks it needs (modulepreload) baked in.
 * Also writes dist/404.html and dist/sitemap.xml from the same data, so the
 * sitemap can never drift from the site.
 *
 * Do NOT replace this with Puppeteer/browser prerendering: it cannot run in
 * Vercel's build container and once silently left the live site as an empty
 * shell for weeks.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { build } from 'vite';

const DIST = 'dist';
const SSR_DIST = 'dist-ssr';
const SITE = 'https://www.pgappstudios.com';

const escapeAttr = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeHtml = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Replaces a tag if present, otherwise appends it before </head>. */
function upsert(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace('</head>', `    ${replacement}\n  </head>`);
}

function injectHead(template, head, url, preloads) {
  let html = template;
  const canonical = head.canonical || SITE + (url === '/' ? '/' : url);
  const robots = head.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1';

  html = upsert(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(head.title)}</title>`);
  html = upsert(html, /<meta name="title" content="[^"]*"\s*\/?>/, `<meta name="title" content="${escapeAttr(head.title)}" />`);
  html = upsert(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeAttr(head.description)}" />`);
  html = upsert(html, /<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${robots}" />`);
  html = head.noindex
    ? html.replace(/\s*<link rel="canonical" href="[^"]*"\s*\/?>/, '')
    : upsert(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escapeAttr(canonical)}" />`);

  html = upsert(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeAttr(head.title)}" />`);
  html = upsert(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeAttr(head.description)}" />`);
  html = upsert(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${escapeAttr(canonical)}" />`);
  html = upsert(html, /<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${escapeAttr(head.ogType || 'website')}" />`);
  html = upsert(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeAttr(head.title)}" />`);
  html = upsert(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeAttr(head.description)}" />`);
  html = upsert(html, /<meta name="twitter:url" content="[^"]*"\s*\/?>/, `<meta name="twitter:url" content="${escapeAttr(canonical)}" />`);
  if (head.ogImage) {
    html = upsert(html, /<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${escapeAttr(head.ogImage)}" />`);
    html = upsert(html, /<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${escapeAttr(head.ogImage)}" />`);
  }

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${head.lang || 'en'}">`);
  html = upsert(html, /<meta property="og:locale" content="[^"]*"\s*\/?>/, `<meta property="og:locale" content="${head.lang === 'de' ? 'de_DE' : 'en_US'}" />`);

  const extra = [];
  for (const a of head.alternates ?? []) extra.push(`<link rel="alternate" hreflang="${a.lang}" href="${escapeAttr(a.href)}" />`);
  for (const href of preloads) extra.push(`<link rel="modulepreload" crossorigin href="${href}" />`);
  if (head.jsonLd) {
    const blocks = Array.isArray(head.jsonLd) ? head.jsonLd : [head.jsonLd];
    for (const b of blocks) {
      extra.push(`<script type="application/ld+json" data-page-ld>${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`);
    }
  }
  return html.replace('</head>', `    ${extra.join('\n    ')}\n  </head>`);
}

/** All JS files a source module needs, following static imports. */
function chunkClosure(manifest, key, seen = new Set()) {
  const entry = manifest[key];
  if (!entry || seen.has(key)) return [];
  seen.add(key);
  const files = entry.isEntry ? [] : [entry.file];
  for (const imp of entry.imports ?? []) {
    if (manifest[imp]?.isEntry) continue; // already loaded by index.html
    files.push(...chunkClosure(manifest, imp, seen));
  }
  return files;
}

async function main() {
  await build({
    logLevel: 'warn',
    build: { ssr: 'src/entry-server.tsx', outDir: SSR_DIST, emptyOutDir: true, copyPublicDir: false },
  });

  const server = await import(path.resolve(SSR_DIST, 'entry-server.js'));
  await server.prepare();

  const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');
  const manifest = JSON.parse(await fs.readFile(path.join(DIST, '.vite', 'manifest.json'), 'utf8'));

  // Preload the two faces visible above the fold.
  const assets = await fs.readdir(path.join(DIST, 'assets'));
  const fonts = assets.filter((f) => /^geist-latin-wght-normal.*\.woff2$|^instrument-serif-latin-400-italic.*\.woff2$/.test(f));
  const fontLinks = fonts.map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`).join('\n    ');
  const base = template.replace('</head>', `    ${fontLinks}\n  </head>`);

  const routes = server.siteRoutes();
  const seenTitles = new Map();
  const problems = [];
  let ok = 0;

  const writePage = async (url, file) => {
    const { html, head } = server.render(url);
    if (!head) throw new Error('no SEO data collected');
    const preloads = [...new Set(server.modulesFor(url).flatMap((m) => chunkClosure(manifest, m)))].map((f) => '/' + f);
    const page = injectHead(base, head, url, preloads).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, page, 'utf8');
    return head;
  };

  for (const { url } of routes) {
    try {
      const head = await writePage(url, path.join(DIST, url === '/' ? '' : url, 'index.html'));
      if (head.noindex) problems.push(`${url}: rendered as not found`);
      if (seenTitles.has(head.title)) problems.push(`${url}: duplicate title with ${seenTitles.get(head.title)}`);
      seenTitles.set(head.title, url);
      ok += 1;
    } catch (err) {
      problems.push(`${url}: ${err.message}`);
    }
  }

  // Real 404 page with a real 404 status (Vercel serves dist/404.html).
  await writePage('/__404__', path.join(DIST, '404.html'));

  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    routes
      .map(
        (r) =>
          `  <url><loc>${SITE}${r.url === '/' ? '/' : r.url}</loc>${r.lastmod ? `<lastmod>${r.lastmod}</lastmod>` : ''}<priority>${r.priority.toFixed(2)}</priority></url>`
      )
      .join('\n') +
    '\n</urlset>\n';
  await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');

  await fs.rm(SSR_DIST, { recursive: true, force: true });

  console.log(`Static generation: ${ok}/${routes.length} routes written, 404.html, sitemap.xml (${routes.length} URLs).`);
  if (problems.length) {
    console.log('Problems:');
    problems.forEach((p) => console.log('  -', p));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('Static generation failed:', err);
  process.exit(1);
});
