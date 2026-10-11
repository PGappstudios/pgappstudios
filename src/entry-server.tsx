import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import AppRoutes, { ROUTE_DEFS, resolveRoute } from './AppRoutes';
import { takeSSRHead, type HeadData } from '@/lib/ssrHead';
import { products } from '@/data/catalog';
import { posts, postBody } from '@/content/blog';
import { guides, guideBody } from '@/content/health';
import { healthApps } from '@/data/healthData';
import { deSlugs } from '@/data/appData.de';

/** Loads every page chunk and article body so rendering never suspends. */
export async function prepare() {
  await Promise.all([...ROUTE_DEFS.map((d) => d.page.preload()), postBody.preloadAll(), guideBody.preloadAll()]);
}

/** Renders one URL to HTML. Must mirror src/App.tsx. */
export function render(url: string): { html: string; head: HeadData | null } {
  const html = renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
  return { html, head: takeSSRHead() };
}

/** Source modules a URL needs, for <link rel="modulepreload">. */
export function modulesFor(url: string): string[] {
  const { def, params } = resolveRoute(url);
  const mods = [def.module];
  if (def.path === '/blog/:id') mods.push(`src/content/blog/${params.id}.md?body`);
  if (def.path === '/health/guides/:slug') mods.push(`src/content/health/${params.slug}.md?body`);
  return mods;
}

export type SitemapEntry = { url: string; lastmod?: string; priority: number };

/** Every public URL, derived from the content itself. */
export function siteRoutes(): SitemapEntry[] {
  const today = new Date().toISOString().slice(0, 10);
  const newestPost = posts[0]?.date ?? today;
  return [
    { url: '/', lastmod: today, priority: 1 },
    { url: '/our-apps', lastmod: today, priority: 0.9 },
    ...products.map((a) => ({ url: `/apps/${a.slug}`, lastmod: today, priority: a.slug === 'portugal-lifestyle-pro' ? 0.95 : 0.8 })),
    { url: '/blog', lastmod: newestPost, priority: 0.8 },
    ...posts.map((p) => ({ url: `/blog/${p.slug}`, lastmod: p.updatedDate || p.date, priority: 0.7 })),
    { url: '/moving-to-portugal', lastmod: today, priority: 0.85 },
    { url: '/de', lastmod: today, priority: 0.7 },
    ...deSlugs.map((s) => ({ url: `/de/apps/${s}`, lastmod: today, priority: 0.6 })),
    { url: '/about', lastmod: today, priority: 0.6 },
    { url: '/contact', lastmod: today, priority: 0.5 },
    { url: '/health', lastmod: today, priority: 0.8 },
    { url: '/health/guides', lastmod: guides[0]?.updatedDate ?? today, priority: 0.7 },
    { url: '/health/about', lastmod: today, priority: 0.5 },
    ...healthApps.map((a) => ({ url: `/health/apps/${a.slug}`, lastmod: today, priority: 0.7 })),
    ...guides.map((g) => ({ url: `/health/guides/${g.slug}`, lastmod: g.updatedDate || g.publishedDate, priority: 0.7 })),
  ];
}
