import { Link, useParams } from 'react-router-dom';
import { getHealthApp, healthApps, type HealthApp } from '@/data/healthData';
import { guides } from '@/content/health';
import { useSEO } from '@/lib/useSEO';
import { SITE } from '@/data/catalog';
import { HealthFrame, HealthIcon } from '@/components/health/HealthFrame';
import { StoreButton } from '@/components/kit/StoreButton';
import { Words } from '@/components/kit/Words';
import { Breadcrumbs, breadcrumbLd } from '@/components/kit/Breadcrumbs';
import { Arrow } from '@/components/kit/Icons';
import NotFound from '@/pages/NotFound';

const HealthAppDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const app = getHealthApp(slug);
  if (!app) return <NotFound />;
  return <Page key={app.slug} app={app} />;
};

function Page({ app }: { app: HealthApp }) {
  const url = `${SITE}/health/apps/${app.slug}`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Health', href: '/health' },
    { name: app.name, href: `/health/apps/${app.slug}` },
  ];

  useSEO({
    // Long store names push the title past what Google shows; drop the subtitle then.
    title: `${app.name}: ${app.tagline}`.length > 62 ? `${app.name.split(':')[0]}: ${app.tagline}` : `${app.name}: ${app.tagline}`,
    description: app.metaDescription,
    canonical: url,
    ogImage: `${SITE}${app.icon}`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': ['SoftwareApplication', 'MobileApplication'],
        name: app.name,
        operatingSystem: app.playStoreUrl ? 'iOS, Android' : 'iOS',
        applicationCategory: 'HealthApplication',
        description: app.metaDescription,
        url,
        downloadUrl: app.appStoreUrl,
        image: `${SITE}${app.icon}`,
        screenshot: app.screenshots.map((s) => SITE + s.src),
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        author: { '@type': 'Organization', name: 'PG App Studios' },
      },
      breadcrumbLd(crumbs),
    ],
  });

  const related = app.relatedApps.map((s) => healthApps.find((a) => a.slug === s)).filter((a): a is HealthApp => Boolean(a));
  const articles = guides.filter((g) => g.primaryApp === app.slug || app.relatedArticles.includes(g.slug));

  return (
    <HealthFrame>
      <section className="pb-14 pt-36 sm:pt-44">
        <div className="container text-center">
          <div className="flex justify-center">
            <Breadcrumbs items={crumbs} />
          </div>
          <HealthIcon app={app} size={104} className="mx-auto mt-10 animate-float shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_24px_60px_-14px_rgba(205,189,246,0.55)]" />
          <h1 className="mx-auto mt-8 max-w-3xl text-display-md font-semibold sm:text-display-lg">
            <Words text={app.name} now />
          </h1>
          <p className="mx-auto mt-4 max-w-xl animate-fade-up font-serif text-2xl italic text-calm [animation-delay:200ms]">{app.tagline}</p>
          <div className="mt-9 flex animate-fade-up flex-wrap justify-center gap-3 [animation-delay:350ms]">
            <StoreButton href={app.appStoreUrl} app={app.name} size="lg" />
            {app.playStoreUrl && <StoreButton href={app.playStoreUrl} kind="play" app={app.name} size="lg" />}
          </div>
        </div>
      </section>

      <section className="container max-w-3xl pb-16" aria-labelledby="what-this-is-for">
        <p className="eyebrow" data-reveal="fade">What this is for</p>
        <h2 id="what-this-is-for" className="sr-only">
          What this is for
        </h2>
        <p className="mt-5 text-xl leading-[1.7] text-fg sm:text-2xl" data-reveal>
          {app.problemStatement}
        </p>
      </section>

      {app.screenshots.length > 0 && (
        <section className="container pb-16" aria-labelledby="inside">
          <h2 id="inside" className="text-display-sm font-semibold" data-reveal>
            Inside the app
          </h2>
          <div className="snap-row mt-8 lg:grid lg:grid-cols-4 lg:overflow-visible">
            {app.screenshots.map((s, i) => (
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                width={380}
                height={824}
                className="shot w-[62vw] max-w-[260px] shrink-0 lg:w-full lg:max-w-none"
                data-reveal
                style={{ ['--d' as string]: i }}
              />
            ))}
          </div>
        </section>
      )}

      <section className="container pb-16" aria-labelledby="features">
        <h2 id="features" className="text-display-sm font-semibold" data-reveal>
          What it does
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {app.features.map((f, i) => (
            <div key={f.title} className="spot p-7" data-reveal style={{ ['--d' as string]: i }}>
              <h3 className="text-lg font-semibold tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-fg-2">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {articles.length > 0 && (
        <section className="container pb-16" aria-labelledby="reading">
          <h2 id="reading" className="text-display-sm font-semibold">
            Worth reading
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {articles.map((a) => (
              <Link key={a.slug} to={`/health/guides/${a.slug}`} className="spot group p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">{a.readingMinutes} min read</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] group-hover:text-calm">{a.title}</h3>
                <p className="mt-2 text-[15px] text-fg-2">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="container pb-8" aria-labelledby="also">
          <h2 id="also" className="text-display-sm font-semibold">
            Also from PG Health
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} to={`/health/apps/${r.slug}`} className="spot group flex items-center gap-4 p-6">
                <HealthIcon app={r} size={52} />
                <div className="flex-1">
                  <h3 className="font-semibold">{r.name}</h3>
                  <p className="text-[14.5px] text-fg-2">{r.tagline}</p>
                </div>
                <Arrow size={16} className="text-fg-3 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </HealthFrame>
  );
}

export default HealthAppDetail;
