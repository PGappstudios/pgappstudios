import React from 'react';
import { useParams, Link } from 'react-router-dom';
import HealthShell, { Breadcrumbs, useScrollReveal } from '@/components/health/HealthShell';
import NotFound from '@/pages/NotFound';
import { getHealthApp, healthApps } from '@/data/healthData';
import { healthArticles } from '@/data/healthArticles';
import { useSEO } from '@/lib/useSEO';
import { trackStoreClick } from '@/lib/track';

const SITE = 'https://www.pgappstudios.com';

const HealthAppDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const app = getHealthApp(slug);
  const pageUrl = `${SITE}/health/apps/${slug}`;

  useSEO({
    title: app ? `${app.name}: ${app.tagline}` : 'App | PG Health',
    description: app?.metaDescription ?? '',
    canonical: pageUrl,
    ogImage: app ? `${SITE}${app.icon}` : undefined,
    jsonLd: app
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: app.name,
            operatingSystem: app.playStoreUrl ? 'iOS, Android' : 'iOS',
            applicationCategory: 'HealthApplication',
            description: app.metaDescription,
            url: pageUrl,
            downloadUrl: app.appStoreUrl,
            image: `${SITE}${app.icon}`,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            author: { '@type': 'Organization', name: 'PG App Studios' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
              { '@type': 'ListItem', position: 2, name: 'Health', item: `${SITE}/health` },
              { '@type': 'ListItem', position: 3, name: app.name, item: pageUrl },
            ],
          },
        ]
      : undefined,
  });

  useScrollReveal([slug]);

  if (!app) return <NotFound />;

  const related = app.relatedApps
    .map((s) => healthApps.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const articles = app.relatedArticles
    .map((s) => healthArticles.find((x) => x.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const store = (kind: 'app_store' | 'play_store') => () =>
    trackStoreClick({ appName: app.name, store: kind, sourcePage: `/health/apps/${app.slug}` });

  return (
    <HealthShell>
      <div className="h-wrap">
        <Breadcrumbs
          trail={[{ label: 'Home', to: '/' }, { label: 'Health', to: '/health' }, { label: app.name }]}
        />
      </div>

      {/* Icon, tagline, primary download */}
      <section className="h-wrap pt-8 pb-12 text-center">
        <img
          src={app.icon}
          alt={`${app.name} app icon`}
          width={104}
          height={104}
          className="w-26 h-26 mx-auto rounded-3xl mb-6 hero-phone"
          style={{ width: 104, height: 104, boxShadow: '0 0 30px rgba(184,41,247,0.45)' }}
        />
        <h1 className="max-w-2xl mx-auto animate-fade-in">
          <span className="gradient-text">{app.name}</span>
        </h1>
        <p className="h-muted text-lg mt-4 max-w-xl mx-auto">{app.tagline}</p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <a className="h-btn" href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" onClick={store('app_store')}>
            Download on the App Store
          </a>
          {app.playStoreUrl && (
            <a className="h-btn-quiet" href={app.playStoreUrl} target="_blank" rel="noopener noreferrer" onClick={store('play_store')}>
              Get it on Google Play
            </a>
          )}
        </div>
      </section>

      {/* Problem statement */}
      <section className="h-narrow pb-14" aria-labelledby="what-this-is-for">
        <h2 id="what-this-is-for" className="mb-4">What this is for</h2>
        <p className="text-[18px] leading-relaxed">{app.problemStatement}</p>
      </section>

      {/* Screenshots */}
      {app.screenshots.length > 0 && (
        <section className="h-wrap pb-14" aria-labelledby="inside">
          <h2 id="inside" className="mb-6">Inside the app</h2>
          <div className="h-shots">
            {app.screenshots.map((s) => (
              <img key={s.src} src={s.src} alt={s.alt} loading="lazy" width={190} height={412} className="h-shot" />
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="h-wrap pb-14" aria-labelledby="features">
        <h2 id="features" className="mb-6">What it does</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {app.features.map((f) => (
            <div key={f.title} className="h-card p-6 animate-on-scroll opacity-0">
              <h3 className="mb-2">{f.title}</h3>
              <p className="h-muted text-[15.5px]">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related articles */}
      {articles.length > 0 && (
        <section className="h-wrap pb-14" aria-labelledby="reading">
          <h2 id="reading" className="mb-6">Worth reading</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {articles.map((a) => (
              <Link key={a.slug} to={`/health/guides/${a.slug}`} className="h-card p-6 no-underline">
                <p className="h-muted text-[13px] mb-2">{a.readingMinutes} min read</p>
                <h3 className="mb-2">{a.title}</h3>
                <p className="h-muted text-[15px]">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related apps */}
      {related.length > 0 && (
        <section className="h-wrap pb-14" aria-labelledby="also">
          <h2 id="also" className="mb-6">Also from PG Health</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} to={`/health/apps/${r.slug}`} className="h-card p-6 flex gap-4 items-center no-underline">
                <img src={r.icon} alt="" width={52} height={52} loading="lazy" className="rounded-xl flex-none w-13 h-13" style={{ width: 52, height: 52 }} />
                <div>
                  <h3 className="text-[17px] mb-1">{r.name}</h3>
                  <p className="h-muted text-[14.5px]">{r.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sticky download bar, mobile only */}
      <div className="h-sticky-cta">
        <img src={app.icon} alt="" width={40} height={40} className="rounded-xl" style={{ width: 40, height: 40 }} />
        <a className="h-btn" href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" onClick={store('app_store')}>
          Download free
        </a>
      </div>
    </HealthShell>
  );
};

export default HealthAppDetail;
