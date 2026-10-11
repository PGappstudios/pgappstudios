import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSEO } from '@/lib/useSEO';
import type { App } from '@/data/appData';
import {
  SITE,
  appsInGroup,
  getProduct,
  glowFor,
  groupById,
  groupOf,
  iconFor,
  isStoreApp,
  screensFor,
  shortName,
  storeId,
} from '@/data/catalog';
import { posts } from '@/content/blog';
import { AppIcon } from '@/components/kit/AppIcon';
import { StoreButton } from '@/components/kit/StoreButton';
import { Words } from '@/components/kit/Words';
import { Faq, faqLd } from '@/components/kit/Faq';
import { Breadcrumbs, breadcrumbLd } from '@/components/kit/Breadcrumbs';
import { Arrow, Star } from '@/components/kit/Icons';
import { PhoneFan } from '@/components/apps/PhoneFan';
import { AppCard } from '@/components/apps/AppCard';
import { PostCard, relatedApp } from '@/components/blog/PostCard';
import NotFound from './NotFound';
import { cn } from '@/lib/utils';

/** Plain-language notices some apps must always carry. */
const NOTICE: Record<string, string> = {
  'aftermath-healing-companion': 'Aftermath is a supportive daily companion, not therapy or medical care. If you are struggling, please speak to a doctor or a local helpline.',
  'kintsugi-unbroken': 'Kintsugi is a support tool, not medical or addiction treatment. If you need help, please talk to a doctor or a local support service.',
  'fasting-and-walking': 'Educational, not medical advice. Check with your doctor before starting a fasting routine, especially if you have a medical condition or are pregnant.',
  'aquafasty-diet-plan': 'Educational, not medical advice. Check with your doctor before changing your diet or starting to fast.',
  'baby-growth-tracker-pro': 'Educational content, not medical advice. Decisions about you or your baby belong with your own clinician.',
  'tidehook-fishing-tides': 'TideHook is a fishing planning tool, not a navigation aid. Never use it for passage planning or safety at sea.',
};

const AppDetail = () => {
  const { slug = '' } = useParams();
  const app = getProduct(slug);
  if (!app) return <NotFound />;
  return <AppPage key={slug} app={app} />;
};

function AppPage({ app }: { app: App }) {
  const name = shortName(app);
  const store = isStoreApp(app);
  const shots = screensFor(app);
  const group = groupById(groupOf(app));
  const url = `${SITE}/apps/${app.slug}`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Apps', href: '/our-apps' },
    { name, href: `/apps/${app.slug}` },
  ];
  const related = appsInGroup(groupOf(app)).filter((a) => a.slug !== app.slug).slice(0, 3);
  const id = storeId(app);
  const articles = posts.filter((p) => (id && p.appIds.includes(id)) || relatedApp(p)?.slug === app.slug).slice(0, 3);
  const showRating = app.rating && app.rating.count >= 5;
  const isHealth = groupOf(app) === 'health';

  useSEO({
    title: app.metaTitle ?? `${app.title} — ${app.tagline ?? ''}`.replace(/ — $/, ''),
    description: app.metaDescription ?? app.description,
    canonical: url,
    ogImage: `${SITE}/og/apps/${app.slug}.png`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': store ? ['SoftwareApplication', 'MobileApplication'] : ['SoftwareApplication', 'WebApplication'],
        name: app.title,
        description: app.metaDescription ?? app.description,
        url,
        image: SITE + iconFor(app),
        ...(shots.length ? { screenshot: shots.map((s) => SITE + s) } : {}),
        operatingSystem: store ? (app.androidUrl ? 'iOS, Android' : 'iOS') : 'Any (web browser)',
        applicationCategory: app.appCategory ?? (store ? 'LifestyleApplication' : 'GameApplication'),
        ...(store ? { downloadUrl: app.url, installUrl: app.url } : {}),
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
        author: { '@type': 'Organization', name: 'PG App Studios', url: SITE },
        publisher: { '@type': 'Organization', name: 'PG App Studios', url: SITE },
        ...(showRating
          ? {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: app.rating!.value,
                ratingCount: app.rating!.count,
                bestRating: 5,
                worstRating: 1,
              },
            }
          : {}),
      },
      breadcrumbLd(crumbs),
      ...(app.faqs?.length ? [faqLd(app.faqs)] : []),
    ],
  });

  // Sticky download bar on phones, once the hero buttons scroll away.
  const heroCta = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState(false);
  useEffect(() => {
    const el = heroCta.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ ['--glow' as string]: glowFor(app) }}>
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-25%] h-[80vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.22),transparent)] blur-2xl" />
          <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
        </div>
        <div className="container grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Breadcrumbs items={crumbs} />
            <div className="mt-8 flex animate-fade-up items-center gap-4">
              <AppIcon app={app} size={84} eager className="shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_50px_-12px_rgb(var(--glow)/0.6)]" />
              <div className="flex flex-wrap gap-2">
                <Link to={`/our-apps#${group.id}`} className="chip hover:border-white/25 hover:text-fg">
                  {group.label}
                </Link>
                <span className="chip">{store ? (app.androidUrl ? 'iPhone & Android' : 'iPhone') : 'Web'}</span>
              </div>
            </div>
            <h1 className="mt-7 text-display-lg font-semibold">
              <Words text={app.title} now />
            </h1>
            {app.tagline && (
              <p className="mt-5 animate-fade-up font-serif text-2xl italic leading-snug text-fg [animation-delay:250ms] sm:text-3xl">
                {app.tagline}
              </p>
            )}
            <p className="mt-5 max-w-xl animate-fade-up text-lg leading-relaxed text-fg-2 [animation-delay:350ms]">{app.description}</p>

            <div ref={heroCta} className="mt-9 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:450ms]">
              {store ? (
                <StoreButton href={app.url} app={app.title} size="lg" />
              ) : (
                <StoreButton href={app.url} kind="web" app={app.title} label={`Open ${name}`} size="lg" />
              )}
              {app.androidUrl && <StoreButton href={app.androidUrl} kind="play" app={app.title} size="lg" />}
              {app.websiteUrl && <StoreButton href={app.websiteUrl} kind="web" app={app.title} size="lg" />}
            </div>

            <div className="mt-7 flex animate-fade-up flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-2 [animation-delay:550ms]">
              {showRating && (
                <span className="flex items-center gap-2">
                  <span className="flex text-[#FDBA74]">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} size={14} />
                    ))}
                  </span>
                  <strong className="text-fg">{app.rating!.value.toFixed(1)}</strong>
                  <span className="text-fg-3">
                    from {app.rating!.count} ratings · {app.rating!.source}
                  </span>
                </span>
              )}
              <span>{store ? 'Free to download' : 'Free in your browser'}</span>
            </div>
          </div>

          <div className="relative animate-fade-up [animation-delay:200ms]">
            {shots.length ? (
              <PhoneFan shots={shots.slice(0, 3)} alt={`${name} app screenshot`} eager />
            ) : (
              <div className="ring-animated surface overflow-hidden rounded-[2rem] p-2">
                <img src={app.image.startsWith('/') ? app.image : `/${app.image}`} alt={`${name} preview`} className="w-full rounded-[1.6rem]" />
              </div>
            )}
          </div>
        </div>
      </section>

      {NOTICE[app.slug!] && (
        <div className="container -mt-4 pb-6">
          <p className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm leading-relaxed text-fg-2">
            <span aria-hidden className="mt-0.5 font-mono text-xs text-fg-3">NOTE</span>
            {NOTICE[app.slug!]}
          </p>
        </div>
      )}

      {/* ---------------------------------------------------- Screenshots */}
      {shots.length > 0 && (
        <section className="relative py-16 sm:py-20" aria-label={`${name} screenshots`}>
          <div className="container">
            <p className="eyebrow" data-reveal="fade">A look inside</p>
            <div className="snap-row mt-8 lg:grid lg:grid-cols-4 lg:overflow-visible">
              {shots.map((s, i) => (
                <img
                  key={s}
                  src={s}
                  alt={`${name} screenshot ${i + 1}`}
                  width={600}
                  height={1300}
                  loading="lazy"
                  decoding="async"
                  className="shot w-[62vw] max-w-[280px] shrink-0 transition-transform duration-500 ease-out hover:-translate-y-2 lg:w-full lg:max-w-none"
                  data-reveal
                  style={{ ['--d' as string]: i }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- Story */}
      {app.longDescription?.length ? (
        <section className="relative py-16 sm:py-24">
          <div className="container grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="eyebrow" data-reveal="fade">About the app</p>
              <Words as="h2" text={`Why *${name}*`} className="mt-5 text-display-md font-semibold" />
            </div>
            <div className="space-y-6 text-lg leading-[1.8] text-fg-2 [&>p:first-child]:text-xl [&>p:first-child]:text-fg">
              {app.longDescription.map((p, i) => (
                <p key={i} data-reveal style={{ ['--d' as string]: i }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------- Features */}
      {app.features?.length ? <FeatureStory app={app} shots={shots} /> : null}

      {/* ------------------------------------------------------------ FAQ */}
      {app.faqs?.length ? (
        <section className="relative py-16 sm:py-24">
          <div className="container grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <p className="eyebrow" data-reveal="fade">FAQ</p>
              <Words as="h2" text="Questions, *answered.*" className="mt-5 text-display-md font-semibold" />
            </div>
            <Faq items={app.faqs} />
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------------ CTA */}
      <section className="relative py-16 sm:py-24">
        <div className="container">
          <div className="ring-animated surface relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12 sm:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgb(var(--glow)/0.22),transparent)]" />
            <div className="relative">
              <AppIcon app={app} size={96} className="mx-auto animate-float" />
              <h2 className="mx-auto mt-8 max-w-2xl text-display-sm font-semibold">
                {store ? `Get ${name} on your iPhone` : `Try ${name} now`}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-fg-2">{app.tagline}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {store ? <StoreButton href={app.url} app={app.title} size="lg" /> : <StoreButton href={app.url} kind="web" app={app.title} label={`Open ${name}`} size="lg" />}
                {app.androidUrl && <StoreButton href={app.androidUrl} kind="play" app={app.title} size="lg" />}
                {app.websiteUrl && <StoreButton href={app.websiteUrl} kind="web" app={app.title} size="lg" />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Reading */}
      {articles.length > 0 && (
        <section className="relative py-16 sm:py-20">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow" data-reveal="fade">From the blog</p>
                <h2 className="mt-5 text-display-sm font-semibold">Read more about {name}</h2>
              </div>
              <Link to="/blog" className="btn-link">
                All guides <Arrow size={16} className="arrow" />
              </Link>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-3">
              {articles.map((p, i) => (
                <PostCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------- Related */}
      {related.length > 0 && (
        <section className="relative py-16 sm:py-20">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow" data-reveal="fade">{group.label}</p>
                <h2 className="mt-5 text-display-sm font-semibold">You might also like</h2>
              </div>
              <Link to={`/our-apps#${group.id}`} className="btn-link">
                See the shelf <Arrow size={16} className="arrow" />
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a, i) => (
                <AppCard key={a.slug} app={a} index={i} />
              ))}
            </div>
            {isHealth && (
              <p className="mt-10 text-fg-2">
                Looking for support with something specific?{' '}
                <Link to="/health" className="text-fg underline decoration-brand/50 underline-offset-4 hover:decoration-brand">
                  Visit PG Health
                </Link>
                , where our wellbeing apps are grouped by what you are going through.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Sticky download bar (phones) */}
      <div
        className={cn(
          'fixed inset-x-3 bottom-3 z-40 flex items-center gap-3 rounded-full border border-white/10 bg-ink-900/90 p-2 pr-2 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-500 ease-out md:hidden',
          bar ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-24 opacity-0'
        )}
        aria-hidden={!bar}
      >
        <AppIcon app={app} size={40} />
        <span className="min-w-0 flex-1 text-sm font-semibold leading-tight">{name}</span>
        <a href={app.url} target="_blank" rel="noopener" data-app={app.title} tabIndex={bar ? 0 : -1} className="btn-primary min-h-[40px] px-5 text-sm">
          {store ? 'Get' : 'Open'}
        </a>
      </div>
    </div>
  );
}

/**
 * Features beside a sticky phone that changes screenshot as you scroll through
 * them (desktop). On phones it is a simple stack of cards.
 */
function FeatureStory({ app, shots }: { app: App; shots: string[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const features = app.features ?? [];

  useEffect(() => {
    if (!shots.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.i));
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [shots.length]);

  return (
    <section className="relative py-16 sm:py-24">
      <div className="container">
        <p className="eyebrow" data-reveal="fade">What you get</p>
        <Words as="h2" text={`Everything inside *${shortName(app)}.*`} className="mt-5 max-w-3xl text-display-md font-semibold" />
        <div className={cn('mt-14 grid gap-10', shots.length && 'lg:grid-cols-[1fr_1.15fr]')}>
          {shots.length > 0 && (
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="relative mx-auto w-[320px]">
                  <div aria-hidden className="absolute inset-0 -z-10 scale-125 rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.25),transparent)] blur-2xl" />
                  {shots.map((s, i) => (
                    <img
                      key={s}
                      src={s}
                      alt=""
                      aria-hidden
                      width={600}
                      height={1300}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        'shot transition-all duration-700 ease-out',
                        i === 0 ? 'relative' : 'absolute inset-0',
                        i === active % shots.length ? 'scale-100 opacity-100' : 'scale-[0.97] opacity-0'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="grid gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                ref={(el) => (refs.current[i] = el)}
                data-i={i}
                data-reveal
                className={cn(
                  'spot p-7 transition-colors duration-500 lg:min-h-[180px]',
                  shots.length && i === active ? 'lg:border-white/20 lg:bg-white/[0.05]' : ''
                )}
              >
                <p className="font-mono text-xs text-fg-3">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-fg-2">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppDetail;
