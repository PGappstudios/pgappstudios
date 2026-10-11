import { Link } from 'react-router-dom';
import { healthApps } from '@/data/healthData';
import { guides } from '@/content/health';
import { useSEO } from '@/lib/useSEO';
import { trackHealthNav } from '@/lib/track';
import { SITE } from '@/data/catalog';
import { HealthFrame, HealthIcon } from '@/components/health/HealthFrame';
import { Words } from '@/components/kit/Words';
import { Breadcrumbs, breadcrumbLd } from '@/components/kit/Breadcrumbs';
import { Arrow } from '@/components/kit/Icons';
import { formatDate } from '@/components/blog/PostCard';

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Health', href: '/health' },
];

const HealthHub = () => {
  useSEO({
    title: 'PG Health: small apps that help you get through hard things',
    description:
      'A collection of health, fitness and mental health apps from PG App Studios. Find the one that fits what you are going through right now.',
    canonical: `${SITE}/health`,
    jsonLd: [
      breadcrumbLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'PG Health apps',
        numberOfItems: healthApps.length,
        itemListElement: healthApps.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/health/apps/${a.slug}`, name: a.name })),
      },
    ],
  });

  const latest = guides.slice(0, 4);

  return (
    <HealthFrame>
      <section className="pb-16 pt-36 sm:pt-44">
        <div className="container text-center">
          <div className="flex justify-center">
            <Breadcrumbs items={crumbs} />
          </div>
          <p className="eyebrow mt-8 justify-center">From PG App Studios</p>
          <h1 className="mx-auto mt-6 max-w-4xl text-display-lg font-semibold">
            <Words text="Small apps that help you" now /> <Words text="*get through hard things.*" now delay={220} accentClass="serif-accent text-calm pr-[0.06em]" />
          </h1>
          <p className="mx-auto mt-7 max-w-2xl animate-fade-up text-lg leading-relaxed text-fg-2 [animation-delay:350ms] sm:text-xl">
            Health, fitness and mental health apps that ask for a minute a day, keep the promise small, and let you come back
            tomorrow. Start with whatever is heaviest right now.
          </p>
        </div>
      </section>

      <section className="container pb-20" aria-labelledby="find-your-app">
        <div className="text-center">
          <h2 id="find-your-app" className="text-display-sm font-semibold">
            What are you <span className="serif-accent text-calm">dealing with?</span>
          </h2>
          <p className="mt-3 text-fg-2">Pick the sentence that sounds most like your week.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {healthApps.map((app, i) => (
            <Link
              key={app.slug}
              to={`/health/apps/${app.slug}`}
              onClick={() => trackHealthNav({ target: app.slug, sourcePage: '/health' })}
              className="spot group flex items-start gap-5 p-6 sm:p-7"
              data-reveal
              style={{ ['--d' as string]: i }}
            >
              <HealthIcon app={app} size={64} className="transition-transform duration-500 ease-out group-hover:-rotate-3 group-hover:scale-105" />
              <div className="min-w-0">
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{app.problemHeadline}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{app.problemSupport}</p>
                <p className="btn-link mt-4 text-sm text-calm">
                  {app.name} <Arrow size={14} className="arrow" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container grid gap-10 pb-20 lg:grid-cols-[1fr_1.5fr]" aria-labelledby="why">
        <div>
          <p className="eyebrow" data-reveal="fade">The idea</p>
          <h2 id="why" className="mt-5 text-display-sm font-semibold" data-reveal>
            Why these exist
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-[1.8] text-fg-2">
          <p data-reveal>
            I build these on my own, from Lisbon. Every app here started with something I or someone close to me was going
            through, and a wish that the thing in my pocket would be quieter and kinder about it.
          </p>
          <p data-reveal>
            None of them try to be your therapist, your doctor or your coach. They ask for about a minute a day, they keep the
            promise small, and they are built so that missing a day does not undo everything. That is the whole idea.
          </p>
          <p data-reveal>
            <Link to="/health/about" className="text-fg underline decoration-calm/60 underline-offset-4 hover:decoration-calm">
              More about who makes these and why
            </Link>
            .
          </p>
        </div>
      </section>

      {latest.length > 0 && (
        <section className="container pb-8" aria-labelledby="latest">
          <div className="flex items-end justify-between gap-4 border-t border-white/[0.07] pt-10">
            <h2 id="latest" className="text-display-sm font-semibold">
              Latest guides
            </h2>
            <Link to="/health/guides" className="btn-link">
              All guides <Arrow size={16} className="arrow" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {latest.map((g, i) => (
              <Link key={g.slug} to={`/health/guides/${g.slug}`} className="spot group p-7" data-reveal style={{ ['--d' as string]: i }}>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
                  {formatDate(g.publishedDate)} · {g.readingMinutes} min read
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-calm">{g.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{g.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </HealthFrame>
  );
};

export default HealthHub;
