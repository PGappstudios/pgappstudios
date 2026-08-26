/**
 * Static site generation, no browser required.
 *
 * Renders every route with react-dom/server at build time and writes real HTML
 * to dist/<route>/index.html, with that page's title, meta, canonical, social
 * tags and JSON LD baked in.
 *
 * This replaces the old Puppeteer snapshot approach, which could not run in
 * Vercel's build container and silently skipped on every deploy, leaving the
 * live site as an empty shell for crawlers.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { build } from 'vite';
import { ROUTES } from './routes.mjs';

const DIST = 'dist';
const SSR_DIST = 'dist-ssr';
const SITE = 'https://www.pgappstudios.com';

const escapeAttr = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeHtml = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Replaces a tag if present, otherwise appends it before </head>. */
function upsert(html, pattern, replacement) {
  return pattern.test(html)
    ? html.replace(pattern, replacement)
    : html.replace('</head>', `    ${replacement}\n  </head>`);
}

function injectHead(template, head, url) {
  if (!head) return template;
  let html = template;
  const canonical = head.canonical || SITE + (url === '/' ? '/' : url);

  html = upsert(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(head.title)}</title>`);
  html = upsert(html, /<meta name="title" content="[^"]*"\s*\/?>/, `<meta name="title" content="${escapeAttr(head.title)}" />`);
  html = upsert(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeAttr(head.description)}" />`);
  html = upsert(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${escapeAttr(canonical)}" />`);

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

  if (head.jsonLd) {
    const blocks = Array.isArray(head.jsonLd) ? head.jsonLd : [head.jsonLd];
    const scripts = blocks
      .map((b) => `<script type="application/ld+json">${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`)
      .join('\n    ');
    html = html.replace('</head>', `    ${scripts}\n  </head>`);
  }

  return html;
}

async function main() {
  // Build the server bundle. The client bundle already exists from `vite build`.
  await build({
    logLevel: 'warn',
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: SSR_DIST,
      emptyOutDir: true,
      copyPublicDir: false,
    },
  });

  const { render } = await import(path.resolve(SSR_DIST, 'entry-server.js'));
  const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');

  let ok = 0;
  const failed = [];
  for (const route of ROUTES) {
    try {
      const { html, head } = render(route);
      if (!head) failed.push(`${route} (no SEO data collected)`);
      const page = injectHead(template, head, route).replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      );
      const outDir = path.join(DIST, route === '/' ? '' : route);
      await fs.mkdir(outDir, { recursive: true });
      await fs.writeFile(path.join(outDir, 'index.html'), page, 'utf8');
      ok += 1;
    } catch (err) {
      failed.push(`${route}: ${err.message}`);
    }
  }

  await fs.rm(SSR_DIST, { recursive: true, force: true });

  console.log(`Static generation: ${ok}/${ROUTES.length} routes written.`);
  if (failed.length) {
    console.log('Problems:');
    failed.forEach((f) => console.log('  -', f));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('Static generation failed:', err);
  process.exit(1);
});
