import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/lib/useSEO';
import { GROUPS, SITE, STATS, appsInGroup, products, websites, websiteIcon, type GroupId } from '@/data/catalog';
import { AppCard } from '@/components/apps/AppCard';
import { Words } from '@/components/kit/Words';
import { Breadcrumbs, breadcrumbLd } from '@/components/kit/Breadcrumbs';
import { ArrowUpRight, Close, Search } from '@/components/kit/Icons';
import { cn } from '@/lib/utils';

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Apps', href: '/our-apps' },
];

const OurApps = () => {
  const [q, setQ] = useState('');
  const [group, setGroup] = useState<GroupId | 'all'>('all');

  useSEO({
    title: `All Apps by PG App Studios | ${STATS.appsOnStore} iPhone Apps for Everyday Life`,
    description:
      'Every PG App Studios app in one place: European Portuguese and Spanish courses, baby growth, fishing tides, pickleball, healing after loss, games and tools.',
    canonical: `${SITE}/our-apps`,
    jsonLd: [
      breadcrumbLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Apps by PG App Studios',
        url: `${SITE}/our-apps`,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: products.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/apps/${a.slug}`, name: a.title })),
        },
      },
    ],
  });

  const query = q.trim().toLowerCase();
  const results = useMemo(
    () =>
      query
        ? products.filter((a) =>
            [a.title, a.tagline, a.description, a.keywords, a.appCategory].join(' ').toLowerCase().includes(query)
          )
        : [],
    [query]
  );

  const shownGroups = group === 'all' ? GROUPS : GROUPS.filter((g) => g.id === group);

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-36 sm:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(167,139,250,0.18),transparent)]" />
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 max-w-4xl text-display-lg font-semibold">
            <Words text="Every app we make," now /> <Words text="*in one place.*" now delay={200} />
          </h1>
          <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-fg-2 [animation-delay:300ms]">
            {STATS.appsOnStore} iPhone apps across {STATS.groups} everyday categories, all free to download on the App Store.
            Search by what you need, or browse a shelf.
          </p>

          {/* Search + shelves */}
          <div className="sticky top-[84px] z-30 mt-10 animate-fade-up [animation-delay:450ms]">
            <div className="flex flex-col gap-3 rounded-[1.75rem] border border-white/[0.08] bg-ink-900/80 p-2 backdrop-blur-xl lg:flex-row lg:items-center">
              <label className="relative flex flex-1 items-center">
                <Search size={18} className="pointer-events-none absolute left-4 text-fg-3" />
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search apps: tides, Portuguese, baby, pickleball…"
                  aria-label="Search apps"
                  className="h-12 w-full rounded-full bg-white/[0.04] pl-11 pr-10 text-[15px] text-fg outline-none ring-0 placeholder:text-fg-3 focus:bg-white/[0.07]"
                />
                {q && (
                  <button type="button" onClick={() => setQ('')} aria-label="Clear search" className="absolute right-3 grid h-7 w-7 place-items-center rounded-full text-fg-2 hover:bg-white/10">
                    <Close size={14} />
                  </button>
                )}
              </label>
              <div className="snap-row -mb-4 gap-1.5 px-1 lg:mb-0 lg:pb-0">
                {[{ id: 'all' as const, short: 'All' }, ...GROUPS].map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setGroup(g.id);
                      setQ('');
                    }}
                    className={cn(
                      'h-10 shrink-0 rounded-full px-4 text-sm font-medium transition-colors',
                      group === g.id && !query ? 'bg-fg text-ink-950' : 'text-fg-2 hover:bg-white/[0.06] hover:text-fg'
                    )}
                  >
                    {g.short}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {query ? (
        <section className="container pb-24" aria-live="polite">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-3">
            {results.length} {results.length === 1 ? 'result' : 'results'} for “{q.trim()}”
          </p>
          {results.length ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((a, i) => (
                <AppCard key={a.slug} app={a} index={i} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-lg text-fg-2">
              Nothing yet. <Link to="/contact" className="text-fg underline decoration-brand/50 underline-offset-4">Tell us what you were looking for</Link> and it might be next.
            </p>
          )}
        </section>
      ) : (
        shownGroups.map((g) => {
          const apps = appsInGroup(g.id);
          return (
            <section key={g.id} id={g.id} className="container scroll-mt-40 pb-20 sm:pb-24">
              <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/[0.07] pt-10">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: g.accent }}>
                    {apps.length} apps
                  </p>
                  <h2 className="mt-3 text-display-sm font-semibold">{g.label}</h2>
                  <p className="mt-2 max-w-xl text-fg-2">{g.blurb}</p>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {apps.map((a, i) => (
                  <AppCard key={a.slug} app={a} index={i} />
                ))}
              </div>
            </section>
          );
        })
      )}

      {!query && group === 'all' && (
        <section id="websites" className="container scroll-mt-40 pb-12">
          <div className="border-t border-white/[0.07] pt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">Websites</p>
            <h2 className="mt-3 text-display-sm font-semibold">Our websites</h2>
            <p className="mt-2 max-w-xl text-fg-2">Companion sites with guides, stories and more about the apps.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {websites.map((w, i) => (
              <a
                key={w.url}
                href={w.url}
                target="_blank"
                rel="noopener"
                className="spot group flex flex-col overflow-hidden"
                data-reveal
                style={{ ['--d' as string]: i }}
              >
                <div className="flex items-center gap-4 p-5">
                  <img src={websiteIcon(w)} alt="" width={56} height={56} loading="lazy" decoding="async" className="app-icon h-14 w-14" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{w.title}</h3>
                    <p className="mt-1 text-sm text-fg-3">{w.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</p>
                  </div>
                  <ArrowUpRight size={18} className="shrink-0 text-fg-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default OurApps;
