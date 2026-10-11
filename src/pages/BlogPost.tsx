import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSEO } from '@/lib/useSEO';
import { SITE } from '@/data/catalog';
import { getPost, postBody, relatedPosts, type PostMeta } from '@/content/blog';
import type { Body } from '@/content/lazyBody';
import { PostCard, PostCover, formatDate, relatedApp } from '@/components/blog/PostCard';
import { AppPromo, ReadingProgress, StudioBox, Toc } from '@/components/blog/ArticleParts';
import { Breadcrumbs, breadcrumbLd } from '@/components/kit/Breadcrumbs';
import { faqLd } from '@/components/kit/Faq';
import { Arrow, Clock, LinkedInLogo, XLogo } from '@/components/kit/Icons';
import NotFound from './NotFound';

const BlogPost = () => {
  const { id = '' } = useParams();
  const post = getPost(id);
  if (!post) return <NotFound />;
  return <Article key={post.slug} post={post} />;
};

function useBody(slug: string): Body | undefined {
  const [body, setBody] = useState(() => postBody.get(slug));
  useEffect(() => {
    if (!body) postBody.preload(slug).then(setBody);
  }, [slug, body]);
  return body;
}

function Article({ post }: { post: PostMeta }) {
  const body = useBody(post.slug);
  const app = relatedApp(post);
  const url = `${SITE}/blog/${post.slug}`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.title, href: `/blog/${post.slug}` },
  ];
  const [before, after] = body ? splitPromo(body.html) : ['', ''];

  useSEO({
    title: post.seoTitle ?? (post.title.length <= 44 ? `${post.title} | PG App Studios` : post.title),
    description: post.metaDescription || post.excerpt,
    canonical: url,
    ogType: 'article',
    ogImage: `${SITE}/og/blog/${post.slug}.png`,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription || post.excerpt,
        image: `${SITE}/og/blog/${post.slug}.png`,
        datePublished: post.date,
        dateModified: post.updatedDate || post.date,
        author: { '@type': 'Organization', name: 'PG App Studios', url: `${SITE}/about` },
        publisher: {
          '@type': 'Organization',
          name: 'PG App Studios',
          url: SITE,
          logo: { '@type': 'ImageObject', url: `${SITE}/icon-512.png`, width: 512, height: 512 },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: post.category,
        keywords: post.metaKeywords || post.tags.join(', '),
        wordCount: post.wordCount,
        inLanguage: 'en',
        ...(app ? { about: { '@type': 'SoftwareApplication', name: app.title, url: `${SITE}/apps/${app.slug}` } } : {}),
      },
      breadcrumbLd(crumbs),
      ...(body?.faq.length ? [faqLd(body.faq)] : []),
    ],
  });

  const share = encodeURIComponent(url);
  const related = relatedPosts(post);

  return (
    <article>
      <ReadingProgress target="#article-body" />

      <header className="relative overflow-hidden pb-12 pt-32 sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(196,181,253,0.14),transparent)]" />
        <div className="container max-w-4xl">
          <Breadcrumbs items={crumbs.slice(0, 2)} />
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="chip">{post.category}</span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
              <Clock size={13} /> {post.readTime} min read
            </span>
          </div>
          <h1 className="mt-6 animate-fade-up text-display-md font-semibold sm:text-display-lg">{post.title}</h1>
          <p className="mt-6 animate-fade-up text-xl leading-relaxed text-fg-2 [animation-delay:150ms]">{post.excerpt}</p>
          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fg-2 [animation-delay:250ms]">
            <span className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-fg text-ink-950">
                <span className="font-serif text-base italic leading-none">pg</span>
              </span>
              PG App Studios
            </span>
            <span className="text-fg-3">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updatedDate && post.updatedDate !== post.date && (
              <>
                <span className="text-fg-3">·</span>
                <span>Updated {formatDate(post.updatedDate)}</span>
              </>
            )}
          </div>
        </div>
        <div className="container mt-12 max-w-5xl">
          <PostCover post={post} large className="aspect-[2/1] animate-fade-up [animation-delay:300ms]" />
        </div>
      </header>

      <div className="container grid max-w-6xl gap-12 pb-16 lg:grid-cols-[1fr_250px]">
        <div id="article-body" className="min-w-0">
          {body && body.toc.filter((t) => t.depth === 2).length > 2 && (
            <details className="surface mb-10 px-5 py-4 lg:hidden">
              <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.16em] text-fg-2">On this page</summary>
              <ol className="mt-3 space-y-2 text-[15px]">
                {body.toc
                  .filter((t) => t.depth === 2)
                  .map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="text-fg-2 hover:text-fg">
                        {t.text}
                      </a>
                    </li>
                  ))}
              </ol>
            </details>
          )}

          {body ? (
            <>
              <div className="prose-pg is-first" dangerouslySetInnerHTML={{ __html: before }} />
              {app && after && <AppPromo app={app} />}
              {after && <div className="prose-pg mt-[1.25em]" dangerouslySetInnerHTML={{ __html: after }} />}
            </>
          ) : (
            <div className="max-w-prose space-y-4" aria-busy="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 animate-pulse rounded bg-white/[0.06]" style={{ width: `${70 + ((i * 37) % 30)}%` }} />
              ))}
            </div>
          )}

          {/* Tags + share */}
          <div className="mt-14 flex max-w-prose flex-wrap items-center justify-between gap-6 border-t border-white/[0.08] pt-8">
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-1">
              <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">Share</span>
              <a
                href={`https://x.com/intent/post?url=${share}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener"
                aria-label="Share on X"
                className="grid h-9 w-9 place-items-center rounded-full text-fg-2 hover:bg-white/[0.07] hover:text-fg"
              >
                <XLogo size={15} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${share}`}
                target="_blank"
                rel="noopener"
                aria-label="Share on LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-full text-fg-2 hover:bg-white/[0.07] hover:text-fg"
              >
                <LinkedInLogo size={15} />
              </a>
            </div>
          </div>

          <div className="mt-10 max-w-prose">
            <StudioBox />
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-8">
            {body && <Toc items={body.toc} />}
            {app && <AppPromo app={app} compact />}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="container pb-8 pt-16">
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/[0.07] pt-12">
            <h2 className="text-display-sm font-semibold">Keep reading</h2>
            <Link to="/blog" className="btn-link">
              All guides <Arrow size={16} className="arrow" />
            </Link>
          </div>
          <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {related.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function splitPromo(html: string): [string, string] {
  const i = html.indexOf('<!--app-promo-->');
  return i === -1 ? [html, ''] : [html.slice(0, i), html.slice(i + '<!--app-promo-->'.length)];
}

export default BlogPost;
