import { Link } from 'react-router-dom';
import { useSEO } from '@/lib/useSEO';
import { SITE, getProduct, glowFor } from '@/data/catalog';
import { getPost } from '@/content/blog';
import { Words } from '@/components/kit/Words';
import { Breadcrumbs, breadcrumbLd } from '@/components/kit/Breadcrumbs';
import { Faq, faqLd } from '@/components/kit/Faq';
import { AppCard } from '@/components/apps/AppCard';
import { PostCard } from '@/components/blog/PostCard';
import { StoreButton } from '@/components/kit/StoreButton';
import { Arrow } from '@/components/kit/Icons';

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Moving to Portugal', href: '/moving-to-portugal' },
];

const COUNTRIES = [
  { code: 'US', name: 'the United States', short: 'From the US', slug: 'moving-to-portugal-from-us-2026', line: 'D7 and D8 visas, the consulate, AIMA and a realistic timeline.' },
  { code: 'UK', name: 'the United Kingdom', short: 'From the UK', slug: 'moving-to-portugal-from-uk-2026', line: 'Life after Brexit: the 90/180 rule, S1 healthcare, pensions and your licence.' },
  { code: 'DE', name: 'Germany', short: 'From Germany', slug: 'moving-to-portugal-from-germany-2026', line: 'No visa as an EU citizen, but Câmara registration, NIF, S1 and your car.' },
  { code: 'AU', name: 'Australia', short: 'From Australia', slug: 'moving-to-portugal-from-australia-2026', line: 'AFP checks and DFAT apostilles first, then the visa, from the other side of the world.' },
];

const ROWS: [string, string, string, string, string][] = [
  ['Visa needed to live there', 'Yes (D7, D8, work)', 'Yes, since Brexit', 'No, EU citizen', 'Yes (D7, D8, work)'],
  ['Visiting without a visa', '90 days in 180', '90 days in 180', 'No limit', '90 days in 180'],
  ['Where you get residency', 'Consulate, then AIMA', 'Consulate, then AIMA', 'Câmara Municipal', 'Embassy, then AIMA'],
  ['Healthcare at first', 'Private insurance', 'S1 for State Pensioners, else private', 'EHIC, S1 for pensioners', 'Private insurance'],
  ['Driving licence', 'Check IMT exchange rules', 'Exchange with IMT once resident', 'EU licence stays valid', 'Check IMT exchange rules'],
];

const STEPS = [
  { t: 'Get a NIF', d: 'Your Portuguese tax number. Nothing else works without it.', href: '/blog/how-to-get-nif-portugal' },
  { t: 'Choose your route', d: 'D7 for passive income, D8 for remote work, registration for EU citizens.', href: '/blog/portugal-d7-vs-d8-visa-guide' },
  { t: 'Pick where to live', d: 'From the Algarve to Porto, what each region costs and who it suits.', href: '/blog/best-places-to-live-portugal-expats' },
  { t: 'Budget honestly', d: 'Rent, food, healthcare and bills in 2026, city by city.', href: '/blog/cost-of-living-portugal-2026' },
  { t: 'Get through AIMA', d: 'What to bring to your residence permit appointment, and how to get one.', href: '/blog/aima-appointment-guide-portugal' },
  { t: 'Learn the language', d: 'A2 European Portuguese for citizenship, and for everyday life.', href: '/blog/a2-portuguese-citizenship-test-guide' },
];

const FAQS = [
  { q: 'Do I need a visa to move to Portugal?', a: 'Americans, Brits and Australians do: you apply for a national residence visa (such as the D7 or D8) before you travel, then for a residence permit from AIMA in Portugal. Germans and other EU citizens do not need a visa; after three months they register with their local Câmara Municipal.' },
  { q: 'Which visa is best for retirees?', a: 'Usually the D7, which is designed for people living on pensions or other passive income. The income threshold is tied to the Portuguese minimum wage, so check the current figure when you apply.' },
  { q: 'Can I work remotely from Portugal?', a: 'Yes. Non-EU remote workers typically use the D8 digital nomad visa, which needs a much higher income than the D7. EU citizens can live and work in Portugal freely.' },
  { q: 'Do I need to speak Portuguese?', a: 'Not to get residency, but citizenship requires A2 European Portuguese, and day-to-day life at the health centre, the Câmara and Finanças runs in Portuguese. Learn European Portuguese, not Brazilian.' },
  { q: 'How long until I can become a Portuguese citizen?', a: 'Portugal lengthened the residence requirement for many new arrivals in 2026, up from the previous five years, with transitional rules for people already resident. Check the final law for your arrival date.' },
];

const MovingToPortugal = () => {
  const plp = getProduct('portugal-lifestyle-pro')!;
  const helpers = ['portugal-lifestyle-pro', 'expats-in-portugal', 'european-portuguese-quest'].map((s) => getProduct(s)!);
  const more = ['how-to-get-nif-portugal', 'cost-of-living-portugal-2026', 'essential-european-portuguese-phrases-travellers']
    .map((s) => getPost(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getPost>>[];

  useSEO({
    title: 'Moving to Portugal from the US, UK, Germany or Australia (2026)',
    description:
      'Moving to Portugal in 2026? Visas, residency, healthcare and driving compared for Americans, Brits, Germans and Australians, with step-by-step guides.',
    canonical: `${SITE}/moving-to-portugal`,
    jsonLd: [breadcrumbLd(crumbs), faqLd(FAQS)],
  });

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-36 sm:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_60%_at_40%_0%,rgba(248,113,113,0.16),transparent)]" />
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 max-w-5xl text-display-lg font-semibold">
            <Words text="Moving to Portugal," now /> <Words text="*wherever you're coming from.*" now delay={200} />
          </h1>
          <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-fg-2 [animation-delay:300ms]">
            Practical guides for Americans, Brits, Germans and Australians: which visa, which office, which order, and how to
            learn the Portuguese people actually speak here. Written in the Algarve.
          </p>
        </div>
      </section>

      {/* Country guides */}
      <section className="container pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COUNTRIES.map((c, i) => (
            <Link key={c.code} to={`/blog/${c.slug}`} className="spot group flex flex-col p-7" data-reveal style={{ ['--d' as string]: i }}>
              <span className="font-mono text-4xl font-medium tracking-[-0.04em] text-fg">{c.code}</span>
              <h2 className="mt-6 text-xl font-semibold tracking-[-0.02em]">Moving {c.short.replace("From", "from")}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{c.line}</p>
              <span className="btn-link mt-auto pt-6 text-sm">
                Read the guide <Arrow size={15} className="arrow" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="container pb-24">
        <p className="eyebrow" data-reveal="fade">At a glance</p>
        <Words as="h2" text="What depends on *your passport.*" className="mt-5 text-display-md font-semibold" />
        <div className="mt-10 overflow-x-auto rounded-3xl border border-white/10" data-reveal>
          <table className="w-full min-w-[760px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="bg-white/[0.04]">
                <th className="px-5 py-4 font-medium text-fg-3"> </th>
                {COUNTRIES.map((c) => (
                  <th key={c.code} className="px-5 py-4 font-semibold text-fg">
                    <span className="font-mono text-xs text-fg-3">{c.code}</span> {c.name.replace('the ', '')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, ...cells]) => (
                <tr key={label} className="border-t border-white/[0.07]">
                  <th scope="row" className="px-5 py-4 font-medium text-fg">{label}</th>
                  {cells.map((v, i) => (
                    <td key={i} className="px-5 py-4 text-fg-2">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-fg-3">Rules and thresholds change often. Check each one with the official source before you rely on it. Not legal advice.</p>
      </section>

      {/* Steps */}
      <section className="container grid gap-12 pb-24 lg:grid-cols-[1fr_1.5fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow" data-reveal="fade">Everyone does these</p>
          <Words as="h2" text="Six steps, *in order.*" className="mt-5 text-display-md font-semibold" />
        </div>
        <ol className="grid gap-4">
          {STEPS.map((s, i) => (
            <li key={s.t}>
              <Link to={s.href} className="spot group flex items-start gap-5 p-6" data-reveal style={{ ['--d' as string]: i }}>
                <span className="font-serif text-4xl italic leading-none text-gradient">{i + 1}</span>
                <span className="flex-1">
                  <span className="block text-lg font-semibold text-fg">{s.t}</span>
                  <span className="mt-1 block text-[15px] text-fg-2">{s.d}</span>
                </span>
                <Arrow size={16} className="mt-2 text-fg-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Language */}
      <section className="container pb-24">
        <div className="ring-animated surface relative overflow-hidden rounded-[2rem] p-8 sm:p-12" style={{ ['--glow' as string]: glowFor(plp) }}>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">The step people skip</p>
              <h2 className="mt-5 text-display-sm font-semibold">
                Learn the Portuguese <span className="serif-accent text-gradient">they speak in Portugal.</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-fg-2">
                Most apps teach Brazilian Portuguese. Our apps teach European Portuguese, from your first words up to the A2
                level citizenship asks for, with AIMA, NIF and visa guides along the way.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <StoreButton href={plp.url} app={plp.title} />
                <Link to="/apps/portugal-lifestyle-pro" className="btn-link">
                  About Portugal Lifestyle Pro <Arrow size={15} className="arrow" />
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              {helpers.slice(1).map((a) => (
                <AppCard key={a.slug} app={a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More reading */}
      {more.length > 0 && (
        <section className="container pb-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-display-sm font-semibold">More guides for the move</h2>
            <Link to="/blog" className="btn-link">
              All guides <Arrow size={16} className="arrow" />
            </Link>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {more.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className="container grid gap-10 pb-8 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="eyebrow" data-reveal="fade">FAQ</p>
          <Words as="h2" text="Moving questions, *answered.*" className="mt-5 text-display-md font-semibold" />
        </div>
        <Faq items={FAQS} />
      </section>
    </>
  );
};

export default MovingToPortugal;
