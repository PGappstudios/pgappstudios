import { Link } from 'react-router-dom';
import { getHealthApp } from '@/data/healthData';
import { guides } from '@/content/health';
import { useSEO } from '@/lib/useSEO';
import { SITE } from '@/data/catalog';
import { HealthFrame } from '@/components/health/HealthFrame';
import { Words } from '@/components/kit/Words';
import { Breadcrumbs, breadcrumbLd } from '@/components/kit/Breadcrumbs';
import { formatDate } from '@/components/blog/PostCard';

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Health', href: '/health' },
  { name: 'Guides', href: '/health/guides' },
];

const HealthGuides = () => {
  useSEO({
    title: 'Guides for Hard Weeks and Healthy Habits | PG Health',
    description:
      'Plain, practical guides on getting through a breakup, building gentle daily habits, fasting, walking and looking after yourself. Written by Pedro Gregório.',
    canonical: `${SITE}/health/guides`,
    jsonLd: breadcrumbLd(crumbs),
  });

  return (
    <HealthFrame>
      <section className="pb-12 pt-36 sm:pt-44">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 text-display-lg font-semibold">
            <Words text="*Guides*" now accentClass="serif-accent text-calm pr-[0.06em]" />
          </h1>
          <p className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-fg-2 [animation-delay:200ms]">
            Plain, practical writing about the things these apps are for. No jargon, no promises, nothing that pretends to
            replace a professional.
          </p>
        </div>
      </section>
      <section className="container pb-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {guides.map((a, i) => {
            const app = getHealthApp(a.primaryApp);
            return (
              <Link key={a.slug} to={`/health/guides/${a.slug}`} className="spot group p-7" data-reveal style={{ ['--d' as string]: i }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
                  {formatDate(a.publishedDate)} · {a.readingMinutes} min read
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] group-hover:text-calm">{a.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{a.excerpt}</p>
                {app && <p className="mt-5 text-[13.5px] font-medium text-calm">Goes with {app.name}</p>}
              </Link>
            );
          })}
        </div>
      </section>
    </HealthFrame>
  );
};

export default HealthGuides;
