import React from 'react';
import { Link } from 'react-router-dom';
import HealthShell, { Breadcrumbs } from '@/components/health/HealthShell';
import { healthApps } from '@/data/healthData';
import { useSEO } from '@/lib/useSEO';

const SITE = 'https://www.pgappstudios.com';

const HealthAbout: React.FC = () => {
  useSEO({
    title: 'About PG Health and Pedro Gregório',
    description:
      'Who builds these health apps, why they exist, and what they will never try to be. PG Health is made by Pedro Gregório in Lisbon, Portugal.',
    canonical: `${SITE}/health/about`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About PG Health',
        url: `${SITE}/health/about`,
        mainEntity: {
          '@type': 'Person',
          name: 'Pedro Gregório',
          jobTitle: 'Founder, PG App Studios',
          email: 'pgmetastudios@gmail.com',
          url: `${SITE}/health/about`,
          address: { '@type': 'PostalAddress', addressLocality: 'Lisbon', addressCountry: 'PT' },
          worksFor: { '@type': 'Organization', name: 'PG App Studios', url: SITE },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Health', item: `${SITE}/health` },
          { '@type': 'ListItem', position: 3, name: 'About', item: `${SITE}/health/about` },
        ],
      },
    ],
  });

  return (
    <HealthShell>
      <div className="h-wrap">
        <Breadcrumbs trail={[{ label: 'Home', to: '/' }, { label: 'Health', to: '/health' }, { label: 'About' }]} />
      </div>

      <section className="h-narrow pt-8 pb-14">
        <h1 className="animate-fade-in">About <span className="gradient-text">PG Health</span></h1>

        <div className="flex items-center gap-5 mt-8 mb-10">
          <img
            src="/PGlogo.png"
            alt="PG App Studios"
            width={72}
            height={72}
            className="rounded-2xl flex-none"
            style={{ width: 72, height: 72, boxShadow: '0 8px 22px rgba(0,0,0,0.4)' }}
          />
          <div>
            <p className="font-semibold text-[17px]">Pedro Gregório</p>
            <p className="h-muted text-[15px]">Founder, PG App Studios. Lisbon, Portugal.</p>
          </div>
        </div>

        <div className="h-prose">
          <p>
            I am Pedro Gregório. I build small iOS apps on my own from just outside Lisbon, and PG
            Health is the part of that work that deals with the harder things: grief, breakups,
            starting to move again, drinking enough water, showing up when you do not feel like it.
          </p>

          <h2>Why these apps exist</h2>
          <p>
            Every app in this collection started somewhere real. Something I was going through, or
            someone close to me was going through, and the feeling that most apps about it were
            either shouting at me or trying to sell me a transformation.
          </p>
          <p>
            So the rule for everything here is the same. Ask for about a minute. Keep the promise
            small. Make sure that missing a day does not undo the whole thing. Nothing in this
            collection is designed to make you feel behind.
          </p>

          <h2>What these apps are not</h2>
          <p>
            They are not medical care and they are not therapy. They do not diagnose anything, they
            will not treat anything, and they are not a substitute for talking to a professional. If
            you are in real trouble, please speak to a doctor or a qualified professional, or contact
            a helpline in your country. That is genuinely the better move, and using one of these
            apps alongside that is fine.
          </p>

          <h2>How they are built</h2>
          <p>
            I write the content, design the screens and ship the updates myself. There is no team
            and no investor asking for your attention to go up. When something in an app feels
            pushy, that is a bug, and you can tell me about it directly at{' '}
            <a href="mailto:pgmetastudios@gmail.com">pgmetastudios@gmail.com</a>.
          </p>

          <h2>The apps in this collection</h2>
          <ul>
            {healthApps.map((a) => (
              <li key={a.slug}>
                <Link to={`/health/apps/${a.slug}`}>{a.name}</Link>: {a.tagline.toLowerCase()}
              </li>
            ))}
          </ul>
          <p>
            You can also see <Link to="/our-apps">everything else PG App Studios makes</Link>, from
            language learning to pickleball.
          </p>
        </div>
      </section>
    </HealthShell>
  );
};

export default HealthAbout;
