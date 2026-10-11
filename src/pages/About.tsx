import { Link } from 'react-router-dom';
import { useSEO } from '@/lib/useSEO';
import { DEVELOPER_URL, GROUPS, SITE, STATS, appsInGroup, iosApps } from '@/data/catalog';
import { posts } from '@/content/blog';
import { Words } from '@/components/kit/Words';
import { Breadcrumbs, breadcrumbLd } from '@/components/kit/Breadcrumbs';
import { AppIcon } from '@/components/kit/AppIcon';
import { Apple, Arrow, Mail } from '@/components/kit/Icons';
import { SOCIALS } from '@/components/layout/SiteFooter';

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
];

const About = () => {
  useSEO({
    title: 'About PG App Studios | Independent iPhone App Studio in Lisbon',
    description:
      'PG App Studios is an independent app studio in Lisbon, Portugal, founded by Pedro Gregório. We design and build iPhone apps for everyday life.',
    canonical: `${SITE}/about`,
    jsonLd: [
      breadcrumbLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        url: `${SITE}/about`,
        name: 'About PG App Studios',
        mainEntity: {
          '@type': 'Organization',
          name: 'PG App Studios',
          url: SITE,
          logo: `${SITE}/icon-512.png`,
          foundingLocation: { '@type': 'Place', name: 'Lisbon, Portugal' },
          founder: { '@type': 'Person', name: 'Pedro Gregório', jobTitle: 'Founder' },
          email: 'pgmetastudios@gmail.com',
          sameAs: [DEVELOPER_URL, ...SOCIALS.map((s) => s.href)],
        },
      },
    ],
  });

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_60%_at_70%_0%,rgba(253,186,116,0.12),transparent)]" />
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 max-w-5xl text-display-lg font-semibold">
            <Words text="A small studio making" now /> <Words text="*everyday apps* from Lisbon." now delay={220} />
          </h1>
        </div>
      </section>

      <section className="container grid gap-14 pb-24 lg:grid-cols-[1fr_1.3fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="surface grid grid-cols-5 gap-3 p-5" data-reveal="scale">
            {iosApps.slice(0, 15).map((a, i) => (
              <Link key={a.slug} to={`/apps/${a.slug}`} className="transition-transform duration-300 ease-spring hover:-translate-y-1 hover:scale-105" style={{ transitionDelay: `${i * 10}ms` }}>
                <AppIcon app={a} size={64} className="h-auto w-full" />
              </Link>
            ))}
          </div>
          <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              [STATS.appsOnStore, 'apps'],
              [STATS.groups, 'categories'],
              [posts.length, 'guides'],
            ].map(([v, l]) => (
              <div key={l} className="surface py-5">
                <dt className="sr-only">{l}</dt>
                <dd className="text-3xl font-semibold tracking-[-0.03em]">{v}</dd>
                <dd className="mt-1 text-xs text-fg-3">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-6 text-lg leading-[1.8] text-fg-2">
          <p className="text-xl leading-[1.7] text-fg" data-reveal>
            PG App Studios is an independent app studio in the Lisbon area of Portugal, founded and run by Pedro Gregório. We
            design and build iPhone apps for people who find their apps in the App Store, not on developer forums.
          </p>
          <p data-reveal>
            Our flagship came from a very local problem. People moving to Portugal kept finding that language apps taught
            Brazilian Portuguese and called it Portuguese. Portugal Lifestyle Pro was built to teach the language the way it is
            actually spoken here, with the culture and history that make it stick.
          </p>
          <p data-reveal>
            Today the studio has {STATS.appsOnStore} apps across {STATS.groups} everyday shelves: languages,
            wellbeing, family, sport and outdoors, games, and small tools. They have one thing in common. Each starts from a
            problem someone has on an ordinary day, and tries to solve that one problem properly.
          </p>
          <h2 className="pt-8 text-display-sm font-semibold" data-reveal>
            How we work
          </h2>
          <p data-reveal>
            We use modern tools to move quickly as a small team, and we spend the time we save on the parts that
            matter: real content, careful design and honest copy. Growth charts follow WHO standards. Tide times are real
            harmonic predictions. Health apps say clearly that they are educational and supportive, not medical care.
          </p>
          <p data-reveal>
            If one of our apps helped you, or let you down, we want to hear about it. Email goes straight to the person who
            built it.
          </p>

          <div className="flex flex-wrap gap-3 pt-6" data-reveal>
            <a href="mailto:pgmetastudios@gmail.com" className="btn-primary" data-magnetic>
              <Mail size={17} /> pgmetastudios@gmail.com
            </a>
            <a href={DEVELOPER_URL} target="_blank" rel="noopener" className="btn-ghost">
              <Apple size={17} /> Our App Store page
            </a>
          </div>

          <div className="grid gap-3 pt-12 sm:grid-cols-2">
            {GROUPS.map((g, i) => (
              <Link key={g.id} to={`/our-apps#${g.id}`} className="spot group p-5" data-reveal style={{ ['--d' as string]: i, ['--glow' as string]: '196 181 253' }}>
                <p className="font-semibold text-fg">{g.label}</p>
                <p className="mt-1 text-sm text-fg-3">{appsInGroup(g.id).length} apps</p>
                <span className="btn-link mt-3 text-sm">
                  Browse <Arrow size={14} className="arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
