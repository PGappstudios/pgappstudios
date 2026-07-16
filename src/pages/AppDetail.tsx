import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppCard from '@/components/AppCard';
import NotFound from './NotFound';
import { getAppBySlug, allApps, type App } from '@/data/appData';
import { useSEO } from '@/lib/useSEO';

const SITE = 'https://www.pgappstudios.com';

// Public images live at the site root. Some data entries omit the leading
// slash, which would break on a nested /apps/:slug route — normalise here.
const imgSrc = (image?: string): string => {
  if (!image) return '';
  if (image.startsWith('http') || image.startsWith('/')) return image;
  return `/${image}`;
};

const AppDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const app = slug ? getAppBySlug(slug) : undefined;

  const isWebsite = app?.category === 'web' && !app?.platforms.includes('iOS App');
  const pageUrl = `${SITE}/apps/${slug}`;

  useSEO({
    title: app ? `${app.title} — ${app.tagline ?? app.description}` : 'App — PG App Studios',
    description: app?.metaDescription ?? app?.description ?? '',
    canonical: pageUrl,
    ogImage: app ? `${SITE}${imgSrc(app.image)}` : undefined,
    jsonLd: app
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: app.title,
            operatingSystem: app.platforms.includes('Android App') ? 'iOS, Android' : 'iOS',
            applicationCategory: app.appCategory ?? 'MobileApplication',
            description: app.metaDescription ?? app.description,
            url: pageUrl,
            downloadUrl: app.url,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            author: { '@type': 'Organization', name: 'PG App Studios' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
              { '@type': 'ListItem', position: 2, name: 'Our Apps', item: `${SITE}/our-apps` },
              { '@type': 'ListItem', position: 3, name: app.title, item: pageUrl },
            ],
          },
          ...(app.faqs && app.faqs.length
            ? [
                {
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: app.faqs.map((f) => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: f.a },
                  })),
                },
              ]
            : []),
        ]
      : undefined,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const els = document.querySelectorAll('.animate-on-scroll');
    els.forEach((el) => observerRef.current?.observe(el));
    return () => els.forEach((el) => observerRef.current?.unobserve(el));
  }, [slug]);

  if (!app) return <NotFound />;

  // Related apps: same category first, then fill up to 3.
  const related: App[] = allApps
    .filter((a) => a.slug && a.slug !== app.slug)
    .sort((a, b) => (a.appCategory === app.appCategory ? -1 : 1) - (b.appCategory === app.appCategory ? -1 : 1))
    .slice(0, 3);

  const storeLabel = isWebsite ? 'Visit Website' : 'Download on the App Store';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-24 px-6">
        <div className="max-w-5xl mx-auto text-sm text-gray-500">
          <Link to="/" className="hover:text-pg-purple">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/our-apps" className="hover:text-pg-purple">Our Apps</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">{app.title}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-8 pb-16 px-6 bg-hero-pattern relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[420px] h-[420px] top-0 left-1/2 -translate-x-1/2 bg-pg-purple/20 rounded-full blur-[110px]" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-[22px] overflow-hidden shadow-[0_0_30px_rgba(184,41,247,0.35)] bg-gradient-to-br from-pg-purple/30 to-pg-blue/30 flex items-center justify-center">
            {app.image ? (
              <img
                src={imgSrc(app.image)}
                alt={`${app.title} app icon`}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className="text-white text-2xl font-bold"
                style={{ backgroundColor: app.initialsColor }}
              >
                {app.initials}
              </span>
            )}
          </div>

          {app.tagline && (
            <p className="text-pg-purple font-semibold uppercase tracking-widest text-xs mb-3">
              {app.tagline}
            </p>
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-5">
            <span className="gradient-text">{app.title}</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">{app.description}</p>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {app.platforms.map((p) => (
              <span key={p} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10">
                {p}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={app.url} target="_blank" rel="noopener noreferrer" className="neon-button group">
              <span className="z-10 relative">{storeLabel}</span>
            </a>
            {app.androidUrl && (
              <a
                href={app.androidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-white/20 text-white rounded-lg hover:border-pg-purple hover:text-pg-purple transition-all duration-300"
              >
                Get it on Google Play
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      {app.features && app.features.length > 0 && (
        <section className="py-16 px-6 bg-pg-dark relative">
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Why you'll love {app.title}</h2>
              <div className="w-24 h-1 bg-pg-purple mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(184,41,247,0.7)]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {app.features.map((f) => (
                <div key={f.title} className="glass-card p-6 animate-on-scroll opacity-0">
                  <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-400">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About / long description */}
      {app.longDescription && app.longDescription.length > 0 && (
        <section className="py-16 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pg-purple/5 to-pg-blue/5" />
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">About {app.title}</h2>
            {app.longDescription.map((para, i) => (
              <p key={i} className="text-gray-300 text-lg leading-relaxed mb-5">{para}</p>
            ))}
            <a href={app.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-pg-purple hover:text-pg-pink font-medium transition-colors">
              {isWebsite ? 'Visit the website →' : `Get ${app.title} on the App Store →`}
            </a>
          </div>
        </section>
      )}

      {/* FAQ */}
      {app.faqs && app.faqs.length > 0 && (
        <section className="py-16 px-6 bg-pg-dark relative">
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently asked questions</h2>
              <div className="w-24 h-1 bg-pg-purple mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(184,41,247,0.7)]" />
            </div>
            <div className="space-y-3">
              {app.faqs.map((f, i) => (
                <details key={i} className="glass-card p-5 group" open={i === 0}>
                  <summary className="cursor-pointer font-semibold text-white flex justify-between items-center list-none">
                    {f.q}
                    <span className="text-pg-purple text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-gray-400 mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related apps */}
      {related.length > 0 && (
        <section className="py-16 px-6 relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white">More apps from PG App Studios</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((a) => (
                <AppCard
                  key={a.id}
                  title={a.title}
                  description={a.description}
                  image={a.image}
                  platforms={a.platforms}
                  url={a.url}
                  androidUrl={a.androidUrl}
                  initials={a.initials}
                  initialsColor={a.initialsColor}
                  isWebsite={a.category === 'web'}
                  slug={a.slug}
                />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/our-apps" className="text-pg-purple hover:text-pg-pink transition-colors font-medium">
                Browse all apps →
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default AppDetail;
