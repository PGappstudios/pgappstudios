import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import HealthShell, { Breadcrumbs } from '@/components/health/HealthShell';
import NotFound from '@/pages/NotFound';
import { healthArticles } from '@/data/healthArticles';
import { getHealthApp, type HealthApp } from '@/data/healthData';
import { useSEO } from '@/lib/useSEO';
import { trackStoreClick } from '@/lib/track';

const SITE = 'https://www.pgappstudios.com';

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-');

/** Split the markdown at the H2 boundary closest to one third of the way down. */
function splitAtThird(body: string): [string, string] {
  const positions: number[] = [];
  const re = /\n## /g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) positions.push(m.index);
  if (positions.length < 2) return [body, ''];
  const target = body.length / 3;
  const cut = positions.reduce((best, p) =>
    Math.abs(p - target) < Math.abs(best - target) ? p : best
  );
  return [body.slice(0, cut), body.slice(cut)];
}

const AppCta: React.FC<{ app: HealthApp; sourcePage: string; variant?: 'inline' | 'end' }> = ({
  app,
  sourcePage,
  variant = 'inline',
}) => (
  <aside className="h-card p-6 my-10 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
    <img src={app.icon} alt="" width={60} height={60} loading="lazy" className="rounded-2xl flex-none" style={{ width: 60, height: 60 }} />
    <div className="flex-1 min-w-0">
      <h3 className="text-[18px] mb-1">
        {variant === 'end' ? `Want help doing this daily?` : app.name}
      </h3>
      <p className="h-muted text-[15px]">
        {variant === 'end' ? `${app.name}: ${app.tagline.toLowerCase()}.` : app.tagline}
      </p>
    </div>
    <div className="flex gap-3 flex-none">
      <Link to={`/health/apps/${app.slug}`} className="h-btn-quiet text-[15px]">
        Learn more
      </Link>
      <a
        className="h-btn text-[15px]"
        href={app.appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackStoreClick({ appName: app.name, store: 'app_store', sourcePage })}
      >
        Download free
      </a>
    </div>
  </aside>
);

const mdComponents = {
  h2: ({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) => (
    <h2 id={slugify(String(children))} {...props}>
      {children}
    </h2>
  ),
  img: ({ ...props }: React.ComponentPropsWithoutRef<'img'>) => (
    <img loading="lazy" {...props} />
  ),
};

const HealthGuide: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = healthArticles.find((a) => a.slug === slug);
  const pageUrl = `${SITE}/health/guides/${slug}`;
  const app = article ? getHealthApp(article.primaryApp) : undefined;

  useSEO({
    title: article ? `${article.title} | PG Health` : 'Guide | PG Health',
    description: article?.metaDescription ?? '',
    canonical: pageUrl,
    ogType: 'article',
    jsonLd: article
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.metaDescription,
            datePublished: article.publishedDate,
            dateModified: article.updatedDate,
            author: {
              '@type': 'Person',
              name: 'Pedro Gregório',
              url: `${SITE}/health/about`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'PG App Studios',
              logo: { '@type': 'ImageObject', url: `${SITE}/PGlogo.png` },
            },
            mainEntityOfPage: pageUrl,
            url: pageUrl,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
              { '@type': 'ListItem', position: 2, name: 'Health', item: `${SITE}/health` },
              { '@type': 'ListItem', position: 3, name: 'Guides', item: `${SITE}/health/guides` },
              { '@type': 'ListItem', position: 4, name: article.title, item: pageUrl },
            ],
          },
        ]
      : undefined,
  });

  if (!article) return <NotFound />;

  const headings = Array.from(article.body.matchAll(/^## (.+)$/gm)).map((m) => m[1].trim());
  const [firstPart, restPart] = splitAtThird(article.body);

  return (
    <HealthShell>
      <div className="h-wrap">
        <Breadcrumbs
          trail={[
            { label: 'Home', to: '/' },
            { label: 'Health', to: '/health' },
            { label: 'Guides', to: '/health/guides' },
            { label: article.title },
          ]}
        />
      </div>

      <article className="h-wrap pt-8 pb-16">
        <header className="max-w-[720px] mb-10">
          <h1>{article.title}</h1>
          <p className="h-muted mt-5 text-[15px]">
            By{' '}
            <Link to="/health/about" rel="author">
              Pedro Gregório
            </Link>{' '}
            · Published{' '}
            <time dateTime={article.publishedDate}>{article.publishedDate}</time>
            {article.updatedDate !== article.publishedDate && (
              <>
                {' '}· Updated <time dateTime={article.updatedDate}>{article.updatedDate}</time>
              </>
            )}{' '}
            · {article.readingMinutes} min read
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-[minmax(0,720px)_220px] lg:gap-12">
          <div className="h-prose min-w-0">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {firstPart}
            </ReactMarkdown>

            {app && <AppCta app={app} sourcePage={`/health/guides/${article.slug}`} />}

            {restPart && (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                {restPart}
              </ReactMarkdown>
            )}

            {app && <AppCta app={app} sourcePage={`/health/guides/${article.slug}`} variant="end" />}
          </div>

          {headings.length > 1 && (
            <nav className="hidden lg:block" aria-label="On this page">
              <div className="h-toc">
                <p className="h-muted text-[12.5px] uppercase tracking-wider font-semibold mb-3">
                  On this page
                </p>
                {headings.map((h) => (
                  <a key={h} href={`#${slugify(h)}`}>
                    {h}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </article>
    </HealthShell>
  );
};

export default HealthGuide;
