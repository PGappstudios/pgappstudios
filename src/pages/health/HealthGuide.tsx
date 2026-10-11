import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getHealthApp } from '@/data/healthData';
import { getGuide, guideBody, type GuideMeta } from '@/content/health';
import type { Body } from '@/content/lazyBody';
import { useSEO } from '@/lib/useSEO';
import { SITE } from '@/data/catalog';
import { HealthAppCta, HealthFrame } from '@/components/health/HealthFrame';
import { ReadingProgress, Toc } from '@/components/blog/ArticleParts';
import { Breadcrumbs, breadcrumbLd } from '@/components/kit/Breadcrumbs';
import { formatDate } from '@/components/blog/PostCard';
import NotFound from '@/pages/NotFound';

const HealthGuide = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const guide = getGuide(slug);
  if (!guide) return <NotFound />;
  return <Guide key={guide.slug} guide={guide} />;
};

function Guide({ guide }: { guide: GuideMeta }) {
  const [body, setBody] = useState<Body | undefined>(() => guideBody.get(guide.slug));
  useEffect(() => {
    if (!body) guideBody.preload(guide.slug).then(setBody);
  }, [guide.slug, body]);

  const app = getHealthApp(guide.primaryApp);
  const url = `${SITE}/health/guides/${guide.slug}`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Health', href: '/health' },
    { name: 'Guides', href: '/health/guides' },
    { name: guide.title, href: `/health/guides/${guide.slug}` },
  ];

  useSEO({
    title: `${guide.title} | PG Health`,
    description: guide.metaDescription,
    canonical: url,
    ogType: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.metaDescription,
        datePublished: guide.publishedDate,
        dateModified: guide.updatedDate,
        author: { '@type': 'Person', name: 'Pedro Gregório', url: `${SITE}/health/about` },
        publisher: { '@type': 'Organization', name: 'PG App Studios', logo: { '@type': 'ImageObject', url: `${SITE}/icon-512.png` } },
        mainEntityOfPage: url,
        url,
        wordCount: guide.wordCount,
      },
      breadcrumbLd(crumbs),
    ],
  });

  const i = body?.html.indexOf('<!--app-promo-->') ?? -1;
  const before = body ? (i === -1 ? body.html : body.html.slice(0, i)) : '';
  const after = body && i !== -1 ? body.html.slice(i + '<!--app-promo-->'.length) : '';

  return (
    <HealthFrame>
      <ReadingProgress target="#guide-body" />
      <article>
        <header className="pb-12 pt-36 sm:pt-44">
          <div className="container max-w-4xl">
            <Breadcrumbs items={crumbs.slice(0, 3)} />
            <h1 className="mt-6 animate-fade-up text-display-md font-semibold sm:text-display-lg">{guide.title}</h1>
            <p className="mt-6 text-[15px] text-fg-2">
              By{' '}
              <Link to="/health/about" rel="author" className="text-fg underline decoration-calm/60 underline-offset-4">
                Pedro Gregório
              </Link>{' '}
              · Published <time dateTime={guide.publishedDate}>{formatDate(guide.publishedDate)}</time>
              {guide.updatedDate !== guide.publishedDate && (
                <>
                  {' '}
                  · Updated <time dateTime={guide.updatedDate}>{formatDate(guide.updatedDate)}</time>
                </>
              )}{' '}
              · {guide.readingMinutes} min read
            </p>
          </div>
        </header>

        <div className="container grid max-w-6xl gap-12 lg:grid-cols-[1fr_230px]">
          <div id="guide-body" className="min-w-0">
            {body ? (
              <>
                <div className="prose-pg is-first" dangerouslySetInnerHTML={{ __html: before }} />
                {app && <HealthAppCta app={app} />}
                {after && <div className="prose-pg" dangerouslySetInnerHTML={{ __html: after }} />}
                {app && <HealthAppCta app={app} end />}
              </>
            ) : (
              <div className="h-96 animate-pulse rounded-3xl bg-white/[0.04]" aria-busy="true" />
            )}
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-28">{body && <Toc items={body.toc} />}</div>
          </aside>
        </div>
      </article>
    </HealthFrame>
  );
}

export default HealthGuide;
