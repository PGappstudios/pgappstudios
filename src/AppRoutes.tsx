import { Routes, Route, matchPath } from 'react-router-dom';
import { lazyPage, type LazyPage } from '@/lib/lazyPage';
import { AppShell } from '@/components/layout/AppShell';
import { postBody } from '@/content/blog';
import { guideBody } from '@/content/health';

/**
 * The route table, shared by the browser entry (main.tsx) and the static
 * generation entry (entry-server.tsx). Each page is its own chunk.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Def = { path: string; page: LazyPage<any>; module: string; body?: (params: Record<string, string>) => Promise<unknown> };

export const ROUTE_DEFS: Def[] = [
  { path: '/', page: lazyPage(() => import('./pages/Index')), module: 'src/pages/Index.tsx' },
  { path: '/our-apps', page: lazyPage(() => import('./pages/OurApps')), module: 'src/pages/OurApps.tsx' },
  { path: '/apps/:slug', page: lazyPage(() => import('./pages/AppDetail')), module: 'src/pages/AppDetail.tsx' },
  { path: '/blog', page: lazyPage(() => import('./pages/Blog')), module: 'src/pages/Blog.tsx' },
  {
    path: '/blog/:id',
    page: lazyPage(() => import('./pages/BlogPost')),
    module: 'src/pages/BlogPost.tsx',
    body: (p) => postBody.preload(p.id),
  },
  { path: '/moving-to-portugal', page: lazyPage(() => import('./pages/MovingToPortugal')), module: 'src/pages/MovingToPortugal.tsx' },
  { path: '/de', page: lazyPage(() => import('./pages/de/DeHome')), module: 'src/pages/de/DeHome.tsx' },
  { path: '/de/apps/:slug', page: lazyPage(() => import('./pages/de/DeAppDetail')), module: 'src/pages/de/DeAppDetail.tsx' },
  { path: '/about', page: lazyPage(() => import('./pages/About')), module: 'src/pages/About.tsx' },
  { path: '/contact', page: lazyPage(() => import('./pages/Contact')), module: 'src/pages/Contact.tsx' },
  { path: '/privacy', page: lazyPage(() => import('./pages/Privacy')), module: 'src/pages/Privacy.tsx' },
  { path: '/terms', page: lazyPage(() => import('./pages/Terms')), module: 'src/pages/Terms.tsx' },
  { path: '/health', page: lazyPage(() => import('./pages/health/HealthHub')), module: 'src/pages/health/HealthHub.tsx' },
  { path: '/health/apps/:slug', page: lazyPage(() => import('./pages/health/HealthAppDetail')), module: 'src/pages/health/HealthAppDetail.tsx' },
  { path: '/health/guides', page: lazyPage(() => import('./pages/health/HealthGuides')), module: 'src/pages/health/HealthGuides.tsx' },
  {
    path: '/health/guides/:slug',
    page: lazyPage(() => import('./pages/health/HealthGuide')),
    module: 'src/pages/health/HealthGuide.tsx',
    body: (p) => guideBody.preload(p.slug),
  },
  { path: '/health/about', page: lazyPage(() => import('./pages/health/HealthAbout')), module: 'src/pages/health/HealthAbout.tsx' },
  { path: '*', page: lazyPage(() => import('./pages/NotFound')), module: 'src/pages/NotFound.tsx' },
];

/** Which route a URL resolves to (the 404 route if nothing else matches). */
export function resolveRoute(pathname: string) {
  for (const def of ROUTE_DEFS) {
    if (def.path === '*') continue;
    const m = matchPath(def.path, pathname.replace(/\/+$/, '') || '/');
    if (m) return { def, params: m.params as Record<string, string> };
  }
  return { def: ROUTE_DEFS[ROUTE_DEFS.length - 1], params: {} };
}

/** Loads the page chunk (and article body) for a URL before rendering it. */
export async function preloadRoute(pathname: string) {
  const { def, params } = resolveRoute(pathname);
  await Promise.all([def.page.preload(), def.body?.(params)]);
}

const AppRoutes = () => (
  <AppShell>
    <Routes>
      {ROUTE_DEFS.map(({ path, page: Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  </AppShell>
);

export default AppRoutes;
