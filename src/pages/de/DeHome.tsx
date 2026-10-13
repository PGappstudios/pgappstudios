import { Link } from 'react-router-dom';
import { useSEO } from '@/lib/useSEO';
import { SITE, STATS, getProduct, iosApps, screensFor } from '@/data/catalog';
import { appsDe, deSlugs } from '@/data/appData.de';
import { Words } from '@/components/kit/Words';
import { AppCard } from '@/components/apps/AppCard';
import { IconMarquee } from '@/components/apps/IconMarquee';
import { ScreenWall } from '@/components/apps/ScreenWall';
import { Arrow, Mail } from '@/components/kit/Icons';

/** German landing page: the apps that work in German, honestly labelled. */
const DeHome = () => {
  const apps = deSlugs.map((s) => getProduct(s)!);
  const others = iosApps.filter((a) => !appsDe[a.slug!]);

  useSEO({
    title: 'PG App Studios: iPhone-Apps auf Deutsch, gemacht an der Algarve',
    description:
      'Unabhängiges App-Studio von der Algarve. iPhone-Apps auf Deutsch: Gezeiten zum Angeln, Babywachstum nach WHO, Wissenschaft für Kinder und Spanisch für Spanien.',
    canonical: `${SITE}/de`,
    lang: 'de',
    alternates: [
      { lang: 'en', href: `${SITE}/` },
      { lang: 'de', href: `${SITE}/de` },
      { lang: 'x-default', href: `${SITE}/` },
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Apps von PG App Studios auf Deutsch',
      inLanguage: 'de',
      itemListElement: apps.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/de/apps/${a.slug}`, name: a.title })),
    },
  });

  return (
    <>
      <section className="grain relative isolate overflow-hidden pb-16 pt-32 sm:pt-40 lg:min-h-[86svh]">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-[10%] top-[-20%] h-[70vh] w-[60vw] animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(167,139,250,0.26),transparent)] blur-2xl" />
          <div className="absolute right-[-10%] top-[10%] h-[60vh] w-[50vw] animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(253,186,116,0.12),transparent)] blur-2xl [animation-delay:-8s]" />
        </div>
        <div className="fade-y absolute inset-y-0 right-[-14%] hidden w-[60%] lg:block xl:right-[-8%]">
          <ScreenWall apps={apps.filter((a) => screensFor(a).length)} columns={4} />
        </div>
        <div aria-hidden className="absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent lg:block" />

        <div className="container relative">
          <div className="max-w-[640px]">
            <p className="eyebrow animate-fade-up">Unabhängiges App-Studio · Algarve, Portugal</p>
            <h1 className="mt-6 text-display-lg font-semibold">
              <Words text="Apps, die man" now /> <Words text="*jeden Tag öffnet.*" now delay={160} />
            </h1>
            <p className="mt-7 max-w-[540px] animate-fade-up text-lg leading-relaxed text-fg-2 [animation-delay:350ms] sm:text-xl">
              Wir entwickeln iPhone-Apps für den Alltag. Diese vier sprechen Deutsch: Gezeiten zum Angeln, das Wachstum deines
              Babys, echte Wissenschaft für Kinder und Spanisch für die nächste Reise nach Spanien.
            </p>
            <div className="mt-9 flex animate-fade-up flex-wrap gap-3 [animation-delay:500ms]">
              <a href="#apps" className="btn-primary min-h-[52px] px-6 text-base" data-magnetic>
                Apps auf Deutsch <Arrow size={18} />
              </a>
              <Link to="/our-apps" className="btn-ghost min-h-[52px] px-6 text-base">
                Alle {STATS.appsOnStore} Apps (Englisch)
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="apps" className="container scroll-mt-28 pb-24">
        <p className="eyebrow" data-reveal="fade">Auf Deutsch</p>
        <Words as="h2" text="Vier Apps, die *Deutsch sprechen.*" className="mt-5 text-display-md font-semibold" />
        <p className="mt-5 max-w-2xl text-lg text-fg-2" data-reveal>
          Die Apps selbst sind auf Deutsch. Die Beschreibungen im App Store sind derzeit noch auf Englisch.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {apps.map((a, i) => (
            <AppCard key={a.slug} app={a} index={i} lang="de" />
          ))}
        </div>
      </section>

      <section className="relative border-y border-white/[0.06] bg-ink-900/40 py-12" aria-label="Weitere Apps">
        <div className="container mb-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">Weitere Apps · derzeit auf Englisch</p>
        </div>
        <IconMarquee apps={others} duration={80} />
      </section>

      <section className="container grid gap-4 py-24 md:grid-cols-2">
        <Link to="/blog/moving-to-portugal-from-germany-2026" className="spot group flex flex-col p-8" data-reveal style={{ ['--glow' as string]: '248 113 113' }}>
          <p className="eyebrow">Auswandern</p>
          <h2 className="mt-5 text-display-sm font-semibold">Nach Portugal ziehen?</h2>
          <p className="mt-3 leading-relaxed text-fg-2">
            Unser Leitfaden für Deutsche: Anmeldung bei der Câmara, NIF, Krankenversicherung und S1, Auto und Rente, Schritt für
            Schritt (auf Englisch).
          </p>
          <span className="btn-link mt-auto pt-6">
            Zum Leitfaden <Arrow size={16} className="arrow" />
          </span>
        </Link>
        <div className="surface flex flex-col p-8" data-reveal style={{ ['--d' as string]: 1 }}>
          <p className="eyebrow">Über uns</p>
          <h2 className="mt-5 text-display-sm font-semibold">Ein kleines Studio an der Algarve</h2>
          <p className="mt-3 leading-relaxed text-fg-2">
            PG App Studios ist ein unabhängiges App-Studio, gegründet und geführt von Pedro Gregório. Jede App beginnt mit
            einem Problem aus dem Alltag und versucht, genau dieses eine Problem gut zu lösen.
          </p>
          <a href="mailto:pgmetastudios@gmail.com" className="btn-ghost mt-auto self-start text-sm">
            <Mail size={16} /> pgmetastudios@gmail.com
          </a>
        </div>
      </section>
    </>
  );
};

export default DeHome;
