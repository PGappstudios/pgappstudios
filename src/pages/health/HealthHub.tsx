import React from 'react';
import { Link } from 'react-router-dom';
import HealthShell, { useScrollReveal } from '@/components/health/HealthShell';
import { healthApps } from '@/data/healthData';
import { healthArticles } from '@/data/healthArticles';
import { useSEO } from '@/lib/useSEO';
import { trackHealthNav } from '@/lib/track';

const SITE = 'https://www.pgappstudios.com';

const HealthHub: React.FC = () => {
  useSEO({
    title: 'PG Health: small apps that help you get through hard things',
    description:
      'A collection of health, fitness and mental health apps from PG App Studios. Find the one that fits what you are going through right now.',
    canonical: `${SITE}/health`,
    ogImage: `${SITE}/health/aftermath-icon.png`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'PG App Studios',
        url: SITE,
        logo: `${SITE}/PGlogo.png`,
        description:
          'PG App Studios builds small health, fitness and mental health apps for everyday people.',
        founder: { '@type': 'Person', name: 'Pedro Gregório' },
        email: 'pgmetastudios@gmail.com',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'PG Health apps',
        numberOfItems: healthApps.length,
        itemListElement: healthApps.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE}/health/apps/${a.slug}`,
          name: a.name,
        })),
      },
    ],
  });

  useScrollReveal();

  const latest = [...healthArticles]
    .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1))
    .slice(0, 4);

  return (
    <HealthShell>
      {/* Hero */}
      <section className="h-wrap pt-20 pb-14 md:pt-28 md:pb-20 text-center">
        <p className="uppercase tracking-widest text-[13px] font-semibold mb-5" style={{ color: 'var(--h-accent)' }}>
          From PG App Studios
        </p>
        <h1 className="max-w-3xl mx-auto animate-fade-in">
          Small apps that help you <span className="gradient-text">get through hard things</span>.
        </h1>
        <p className="h-muted text-lg md:text-xl max-w-2xl mx-auto mt-6 animate-fade-in-delay-1">
          Health, fitness and mental health apps that ask for a minute a day, keep the promise small,
          and let you come back tomorrow. Start with whatever is heaviest right now.
        </p>
      </section>

      {/* Problem first navigation */}
      <section className="h-wrap pb-6" aria-labelledby="find-your-app">
        <h2 id="find-your-app" className="text-center mb-3">What are you <span className="gradient-text">dealing with</span>?</h2>
        <div className="w-24 h-1 bg-pg-purple mx-auto mb-5 rounded-full shadow-[0_0_10px_rgba(184,41,247,0.7)]" />
        <p className="h-muted text-center mb-10">Pick the sentence that sounds most like your week.</p>

        <div className="grid gap-5 sm:grid-cols-2">
          {healthApps.map((app) => (
            <Link
              key={app.slug}
              to={`/health/apps/${app.slug}`}
              onClick={() => trackHealthNav({ target: app.slug, sourcePage: '/health' })}
              className="h-card p-6 flex gap-5 items-start no-underline animate-on-scroll opacity-0"
            >
              <img
                src={app.icon}
                alt=""
                width={64}
                height={64}
                loading="lazy"
                className="rounded-2xl flex-none w-16 h-16"
                style={{ border: '1px solid var(--h-line)' }}
              />
              <div className="min-w-0">
                <h3 className="mb-1.5">{app.problemHeadline}</h3>
                <p className="h-muted text-[15px] mb-3">{app.problemSupport}</p>
                <p className="text-[14px] font-semibold" style={{ color: 'var(--h-accent-ink)' }}>
                  {app.name} · Learn more
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why these exist */}
      <section className="h-narrow py-16" aria-labelledby="why">
        <h2 id="why" className="mb-5">Why these exist</h2>
        <div className="h-muted space-y-4 text-[17.5px] leading-relaxed">
          <p>
            I build these on my own, from Lisbon. Every app here started with something I or someone
            close to me was going through, and a wish that the thing in my pocket would be quieter
            and kinder about it.
          </p>
          <p>
            None of them try to be your therapist, your doctor or your coach. They ask for about a
            minute a day, they keep the promise small, and they are built so that missing a day does
            not undo everything. That is the whole idea.
          </p>
          <p>
            <Link to="/health/about">More about who makes these and why</Link>.
          </p>
        </div>
      </section>

      {/* Latest guides */}
      {latest.length > 0 && (
        <section className="h-wrap pb-16" aria-labelledby="latest">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 id="latest">Latest guides</h2>
            <Link to="/health/guides" className="text-[15px] font-semibold whitespace-nowrap">
              All guides
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {latest.map((article) => (
              <Link
                key={article.slug}
                to={`/health/guides/${article.slug}`}
                className="h-card p-6 no-underline animate-on-scroll opacity-0"
              >
                <p className="h-muted text-[13px] mb-2">
                  {article.publishedDate} · {article.readingMinutes} min read
                </p>
                <h3 className="mb-2">{article.title}</h3>
                <p className="h-muted text-[15px]">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </HealthShell>
  );
};

export default HealthHub;
