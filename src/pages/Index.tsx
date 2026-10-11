import { Link } from 'react-router-dom';
import { useSEO } from '@/lib/useSEO';
import {
  DEVELOPER_URL,
  FLAGSHIP_SLUG,
  GROUPS,
  SITE,
  STATS,
  appsInGroup,
  getProduct,
  glowFor,
  iosApps,
  products,
  screensFor,
  shortName,
} from '@/data/catalog';
import { posts } from '@/content/blog';
import { Words } from '@/components/kit/Words';
import { SectionHead } from '@/components/kit/Section';
import { StoreButton } from '@/components/kit/StoreButton';
import { AppIcon } from '@/components/kit/AppIcon';
import { CountUp } from '@/components/kit/CountUp';
import { Apple, Arrow, Star } from '@/components/kit/Icons';
import { ScreenWall } from '@/components/apps/ScreenWall';
import { IconMarquee } from '@/components/apps/IconMarquee';
import { PhoneFan } from '@/components/apps/PhoneFan';
import { AppCard } from '@/components/apps/AppCard';
import { PostCard } from '@/components/blog/PostCard';
import { cn } from '@/lib/utils';

const PRINCIPLES = [
  {
    n: '01',
    title: 'One job, done properly',
    text: 'Every app starts from one everyday problem and stays focused on it. No feature soup, no settings maze.',
  },
  {
    n: '02',
    title: 'Real content, not filler',
    text: 'WHO growth standards, harmonic tide maths checked against NOAA, Portuguese as it is spoken in Lisbon and Porto.',
  },
  {
    n: '03',
    title: 'Honest about what it is',
    text: 'Health apps say clearly that they are educational, not medical. What an app costs is shown before you pay.',
  },
  {
    n: '04',
    title: 'Small studio, close to you',
    text: 'Designed, written and shipped from Lisbon. Email us and you reach the person who built the app.',
  },
];

const Index = () => {
  const flagship = getProduct(FLAGSHIP_SLUG)!;
  const showcase = products.filter((a) => a.slug !== FLAGSHIP_SLUG && screensFor(a).length).slice(0, 6);
  // The hero wall shows the strongest screenshot sets; trivia games and the
  // older utility listings read weaker at this size.
  const WALL_SKIP = ['soccer-legends', 'basketball-legends', 'megaconverter', 'docyscan', 'bible-test-your-faith', 'baby-learning-games'];
  const wallApps = products.filter((a) => screensFor(a).length && !WALL_SKIP.includes(a.slug!));
  const half = Math.ceil(iosApps.length / 2);
  const latest = [...posts.filter((p) => p.featured), ...posts.filter((p) => !p.featured)].slice(0, 3);

  useSEO({
    title: 'PG App Studios | iPhone Apps for Everyday Life, Made in Lisbon',
    description: `Independent app studio in Lisbon. ${STATS.appsOnStore} iPhone apps for everyday life: learn European Portuguese, track your baby's growth, plan fishing tides and more.`,
    canonical: `${SITE}/`,
    alternates: [
      { lang: 'en', href: `${SITE}/` },
      { lang: 'de', href: `${SITE}/de` },
      { lang: 'x-default', href: `${SITE}/` },
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Apps by PG App Studios',
        itemListElement: products.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE}/apps/${a.slug}`,
          name: a.title,
        })),
      },
    ],
  });

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="grain relative isolate overflow-hidden pb-20 pt-32 sm:pt-40 lg:min-h-[100svh] lg:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-[10%] top-[-20%] h-[70vh] w-[60vw] animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.28),transparent)] blur-2xl" />
          <div className="absolute right-[-10%] top-[10%] h-[60vh] w-[50vw] animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(240,171,252,0.16),transparent)] blur-2xl [animation-delay:-8s]" />
          <div className="absolute bottom-[-30%] left-[30%] h-[50vh] w-[50vw] animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(253,186,116,0.10),transparent)] blur-2xl [animation-delay:-15s]" />
        </div>

        {/* Screenshot wall: right side on desktop */}
        <div className="fade-y absolute inset-y-0 right-[-14%] hidden w-[62%] lg:block xl:right-[-8%]">
          <ScreenWall apps={wallApps} columns={4} />
        </div>
        <div aria-hidden className="absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent lg:block" />

        <div className="container relative">
          <div className="max-w-[640px]">
            <p className="eyebrow animate-fade-up">Independent app studio · Lisbon, Portugal</p>
            <h1 className="mt-6 text-display-xl font-semibold">
              <Words text="Apps people" now />{' '}
              <Words text="*open every day.*" now delay={180} />
            </h1>
            <p className="mt-7 max-w-[520px] animate-fade-up text-lg leading-relaxed text-fg-2 [animation-delay:350ms] sm:text-xl">
              We design and build iPhone apps for the everyday: learning European Portuguese, getting through a hard week,
              planning tomorrow's fishing trip, watching a baby grow.
            </p>
            <div className="mt-9 flex animate-fade-up flex-wrap gap-3 [animation-delay:500ms]">
              <Link to="/our-apps" className="btn-primary min-h-[52px] px-6 text-base" data-magnetic>
                Explore {STATS.appsOnStore} apps <Arrow size={18} />
              </Link>
              <a href={DEVELOPER_URL} target="_blank" rel="noopener" className="btn-ghost min-h-[52px] px-6 text-base">
                <Apple size={18} /> See us on the App Store
              </a>
            </div>
            <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-3 text-sm text-fg-2 [animation-delay:650ms]">
              <span className="flex items-center gap-2">
                <span className="flex text-[#FDBA74]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={14} />
                  ))}
                </span>
                <span>
                  <strong className="font-semibold text-fg">{flagship.rating?.value.toFixed(1)}</strong> for Portugal Lifestyle Pro
                  <span className="text-fg-3"> · US App Store</span>
                </span>
              </span>
              <span className="hidden h-4 w-px bg-white/15 sm:block" />
              <span>Free to download</span>
              <span className="hidden h-4 w-px bg-white/15 sm:block" />
              <span>Made for iPhone</span>
            </div>
          </div>
        </div>

        {/* Screenshot wall: below the copy on phones and tablets */}
        <div className="fade-y relative mt-12 h-[440px] overflow-hidden sm:h-[520px] lg:hidden">
          <ScreenWall apps={wallApps} columns={4} className="mx-auto w-[760px] -translate-x-[8%]" />
        </div>
      </section>

      {/* ---------------------------------------------------- Icon marquee */}
      <section aria-label="All our apps" className="relative border-y border-white/[0.06] bg-ink-900/40 py-6">
        <IconMarquee apps={iosApps.slice(0, half)} duration={70} />
        <IconMarquee apps={iosApps.slice(half)} duration={80} reverse />
      </section>

      {/* -------------------------------------------------------- Flagship */}
      <section className="relative py-24 sm:py-32">
        <div className="container">
          <div
            className="ring-animated surface grid items-center gap-12 overflow-hidden rounded-[2rem] p-7 sm:p-12 lg:grid-cols-[1.05fr_1fr] lg:p-16"
            style={{ ['--glow' as string]: glowFor(flagship) }}
          >
            <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.22),transparent)]" />
            <div className="relative">
              <p className="eyebrow" data-reveal="fade">Our flagship · Learn a language</p>
              <Words as="h2" text="Real European Portuguese. *Real Portugal.*" className="mt-5 text-display-md font-semibold" />
              <p className="mt-6 text-lg leading-relaxed text-fg-2" data-reveal style={{ ['--d' as string]: 2 }}>
                Most apps teach Brazilian Portuguese and call it Portuguese. Portugal Lifestyle Pro teaches the language the way
                it is spoken in Lisbon and Porto, with the culture, food, history and slang woven into every lesson, from A1 to C2.
              </p>
              <ul className="mt-7 grid gap-3 text-[15px] text-fg" data-reveal style={{ ['--d' as string]: 3 }}>
                {['European pronunciation, never a Brazilian course with a flag swapped', '20 games, a camera that names what you point at, and listening drills', 'AIMA, NIF and visa guides for people moving to Portugal'].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--glow))] shadow-[0_0_10px_rgb(var(--glow))]" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-3" data-reveal style={{ ['--d' as string]: 4 }}>
                <StoreButton href={flagship.url} app={flagship.title} />
                {flagship.androidUrl && <StoreButton href={flagship.androidUrl} kind="play" app={flagship.title} />}
                <Link to={`/apps/${flagship.slug}`} className="btn-link ml-2">
                  Why it's different <Arrow size={16} className="arrow" />
                </Link>
              </div>
              <div className="mt-8 border-t border-white/10 pt-6" data-reveal style={{ ['--d' as string]: 5 }}>
                <Link to="/moving-to-portugal" className="btn-link text-[15px]">
                  Moving to Portugal from the US, UK, Germany or Australia? Start here <Arrow size={16} className="arrow" />
                </Link>
              </div>
            </div>
            <div className="relative" data-reveal="scale">
              <PhoneFan shots={screensFor(flagship)} alt="Portugal Lifestyle Pro lessons screen" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Categories */}
      <section className="relative pb-24 sm:pb-32">
        <div className="container">
          <SectionHead
            eyebrow="Find your app"
            title="Whatever your day needs, *there's one for that.*"
            sub="Six shelves, each with apps built around one kind of everyday problem."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GROUPS.map((g, i) => {
              const apps = appsInGroup(g.id);
              const wide = i === 0 || i === 4;
              const shot = apps.map((a) => screensFor(a, 'sm')[0]).filter(Boolean).slice(0, 2);
              return (
                <Link
                  key={g.id}
                  to={`/our-apps#${g.id}`}
                  className={cn('spot group relative flex min-h-[280px] flex-col overflow-hidden p-7', wide && 'lg:col-span-2')}
                  style={{ ['--glow' as string]: hexToTriplet(g.accent), ['--d' as string]: i }}
                  data-reveal
                >
                  <div className="flex -space-x-3">
                    {apps.slice(0, 5).map((a) => (
                      <AppIcon key={a.slug} app={a} size={44} className="ring-2 ring-ink-900 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                    ))}
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">{g.label}</h3>
                  <p className={cn('mt-2 text-[15px] leading-relaxed text-fg-2', wide ? 'max-w-[300px]' : '')}>{g.blurb}</p>
                  <span className="btn-link mt-auto pt-6 text-sm">
                    {apps.length} apps <Arrow size={15} className="arrow" />
                  </span>
                  {wide && shot.length > 0 && (
                    <div aria-hidden className="pointer-events-none absolute -bottom-16 right-6 hidden w-[42%] gap-3 sm:flex">
                      {shot.map((s, k) => (
                        <img
                          key={s}
                          src={s}
                          alt=""
                          loading="lazy"
                          width={300}
                          height={650}
                          className={cn('shot w-1/2 transition-transform duration-700 ease-out', k ? 'translate-y-8 group-hover:translate-y-2' : 'group-hover:-translate-y-4')}
                        />
                      ))}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Showcase */}
      <section className="relative pb-24 sm:pb-32">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Recently shipped" title="New and *noteworthy.*" />
            <Link to="/our-apps" className="btn-ghost" data-reveal="fade">
              All {STATS.appsOnStore} apps <Arrow size={16} />
            </Link>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {showcase.map((a, i) => (
              <AppCard key={a.slug} app={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Stats */}
      <section className="relative border-y border-white/[0.06] bg-ink-900/40 py-16 sm:py-20">
        <div className="container grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {[
            { v: STATS.appsOnStore, label: 'apps on the App Store' },
            { v: STATS.groups, label: 'everyday categories' },
            { v: posts.length, label: 'free guides on the blog' },
            { v: flagship.rating?.value ?? 4.8, d: 1, label: 'stars for Portugal Lifestyle Pro (US)' },
          ].map((s, i) => (
            <div key={s.label} className="border-l border-white/10 pl-5 sm:pl-8" data-reveal style={{ ['--d' as string]: i }}>
              <p className="text-display-md font-semibold tracking-[-0.04em]">
                <CountUp value={s.v} decimals={s.d ?? 0} />
              </p>
              <p className="mt-2 text-sm text-fg-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- Principles */}
      <section className="relative py-24 sm:py-32">
        <div className="container grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              eyebrow="How we build"
              title="Small apps, *made with care.*"
              sub="PG App Studios is an independent studio run by Pedro Gregório. Four rules shape everything we ship."
            />
            <Link to="/about" className="btn-link mt-8" data-reveal="fade">
              About the studio <Arrow size={16} className="arrow" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <div key={p.n} className="spot p-7" data-reveal style={{ ['--d' as string]: i }}>
                <p className="font-serif text-5xl italic text-gradient">{p.n}</p>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-2">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Blog */}
      <section className="relative pb-24 sm:pb-32">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="From the blog" title="Guides worth *bookmarking.*" />
            <Link to="/blog" className="btn-ghost" data-reveal="fade">
              Read the blog <Arrow size={16} />
            </Link>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {latest.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Health */}
      <section className="relative pb-24 sm:pb-32">
        <div className="container">
          <Link
            to="/health"
            className="spot group grid items-center gap-8 overflow-hidden p-8 sm:p-12 md:grid-cols-[1.4fr_1fr]"
            style={{ ['--glow' as string]: '205 189 246' }}
            data-reveal
          >
            <div>
              <p className="eyebrow">PG Health</p>
              <h2 className="mt-5 text-display-sm font-semibold">
                Going through something harder? <span className="serif-accent text-calm">Start here.</span>
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-fg-2">
                Our health and wellbeing apps live together in one calm place, grouped by what you are actually going through:
                a breakup, a habit you want to break, a body you want to look after.
              </p>
              <span className="btn-link mt-7">
                Visit PG Health <Arrow size={16} className="arrow" />
              </span>
            </div>
            <div className="flex justify-center gap-3">
              {appsInGroup('health').slice(0, 4).map((a, i) => (
                <AppIcon key={a.slug} app={a} size={64} className={cn('transition-transform duration-500 ease-out', i % 2 ? 'translate-y-4 group-hover:translate-y-0' : 'group-hover:translate-y-3')} />
              ))}
            </div>
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------ Final CTA */}
      <section className="relative overflow-hidden pb-8 pt-8">
        <div className="container text-center">
          <Words as="h2" text="Your next everyday app is *one tap away.*" className="mx-auto max-w-4xl text-display-lg font-semibold" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-fg-2" data-reveal style={{ ['--d' as string]: 3 }}>
            Every app is free to download on the App Store. Have a look around, or tell us what your day is missing.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3" data-reveal style={{ ['--d' as string]: 4 }}>
            <Link to="/our-apps" className="btn-primary min-h-[52px] px-6 text-base" data-magnetic>
              Browse all apps <Arrow size={18} />
            </Link>
            <Link to="/contact" className="btn-ghost min-h-[52px] px-6 text-base">
              Say hello
            </Link>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-2" data-reveal="fade">
            {iosApps.map((a) => (
              <Link key={a.slug} to={`/apps/${a.slug}`} title={shortName(a)} className="transition-transform duration-300 ease-spring hover:-translate-y-1 hover:scale-110">
                <AppIcon app={a} size={40} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

function hexToTriplet(hex: string) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(' ');
}

export default Index;
