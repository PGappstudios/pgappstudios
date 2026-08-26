import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HealthShell, { Breadcrumbs } from '@/components/health/HealthShell';
import { healthArticles } from '@/data/healthArticles';
import { getHealthApp } from '@/data/healthData';
import { useSEO } from '@/lib/useSEO';

const SITE = 'https://www.pgappstudios.com';
const PER_PAGE = 9;

const HealthGuides: React.FC = () => {
  useSEO({
    title: 'Guides | PG Health',
    description:
      'Plain, practical guides on getting through a breakup, building gentle daily habits, fasting, walking and looking after yourself. Written by Pedro Gregório.',
    canonical: `${SITE}/health/guides`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Health', item: `${SITE}/health` },
        { '@type': 'ListItem', position: 3, name: 'Guides', item: `${SITE}/health/guides` },
      ],
    },
  });

  const sorted = [...healthArticles].sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const visible = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <HealthShell>
      <div className="h-wrap">
        <Breadcrumbs trail={[{ label: 'Home', to: '/' }, { label: 'Health', to: '/health' }, { label: 'Guides' }]} />
      </div>

      <section className="h-wrap pt-8 pb-12">
        <h1>Guides</h1>
        <p className="h-muted text-lg mt-4 max-w-2xl">
          Plain, practical writing about the things these apps are for. No jargon, no promises,
          nothing that pretends to replace a professional.
        </p>
      </section>

      <section className="h-wrap pb-10">
        <div className="grid gap-5 sm:grid-cols-2">
          {visible.map((a) => {
            const app = getHealthApp(a.primaryApp);
            return (
              <Link key={a.slug} to={`/health/guides/${a.slug}`} className="h-card p-6 no-underline">
                <p className="h-muted text-[13px] mb-2">
                  {a.publishedDate} · {a.readingMinutes} min read
                </p>
                <h2 className="text-[21px] mb-2">{a.title}</h2>
                <p className="h-muted text-[15px] mb-4">{a.excerpt}</p>
                {app && (
                  <p className="text-[13.5px] font-semibold" style={{ color: 'var(--h-accent-ink)' }}>
                    Goes with {app.name}
                  </p>
                )}
              </Link>
            );
          })}
        </div>

        {pages > 1 && (
          <nav className="flex gap-2 justify-center mt-10" aria-label="Pagination">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                aria-current={n === page ? 'page' : undefined}
                className="px-4 py-2 rounded-full text-[15px] font-semibold"
                style={{
                  background: n === page ? 'var(--h-accent)' : 'transparent',
                  color: n === page ? '#fff' : 'var(--h-muted)',
                  border: '1px solid var(--h-line)',
                }}
              >
                {n}
              </button>
            ))}
          </nav>
        )}
      </section>
    </HealthShell>
  );
};

export default HealthGuides;
