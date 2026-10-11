import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/lib/useSEO';
import { SITE } from '@/data/catalog';
import { CATEGORIES, posts } from '@/content/blog';
import { PostCard, PostCover, formatDate } from '@/components/blog/PostCard';
import { Words } from '@/components/kit/Words';
import { Breadcrumbs, breadcrumbLd } from '@/components/kit/Breadcrumbs';
import { Arrow } from '@/components/kit/Icons';
import { cn } from '@/lib/utils';

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
];

const Blog = () => {
  const [cat, setCat] = useState<string>('All');
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);
  const shown = cat === 'All' ? rest : posts.filter((p) => p.category === cat);

  useSEO({
    title: 'Blog: European Portuguese, Portugal, Health & App Guides',
    description: `${posts.length} practical guides from PG App Studios: learning European Portuguese, moving to Portugal, fasting and walking, parenting, pickleball, cycling and the apps we build.`,
    canonical: `${SITE}/blog`,
    jsonLd: [
      breadcrumbLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'PG App Studios Blog',
        url: `${SITE}/blog`,
        publisher: { '@type': 'Organization', name: 'PG App Studios', url: SITE },
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${SITE}/blog/${p.slug}`,
          datePublished: p.date,
          description: p.metaDescription || p.excerpt,
        })),
      },
    ],
  });

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-36 sm:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_30%_0%,rgba(240,171,252,0.14),transparent)]" />
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 max-w-4xl text-display-lg font-semibold">
            <Words text="Field notes for" now /> <Words text="*everyday life.*" now delay={200} />
          </h1>
          <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-fg-2 [animation-delay:300ms]">
            {posts.length} practical guides on learning European Portuguese, moving to Portugal, health habits, parenting, sport,
            and the apps we build.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="container pb-20">
        <Link to={`/blog/${featured.slug}`} className="group grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]" data-reveal>
          <PostCover post={featured} large className="aspect-[16/10] lg:aspect-[16/11]" />
          <div>
            <p className="eyebrow">Featured · {featured.category}</p>
            <h2 className="mt-5 text-display-sm font-semibold transition-colors group-hover:text-brand">{featured.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-fg-2">{featured.excerpt}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
              <time dateTime={featured.date}>{formatDate(featured.date)}</time> · {featured.readTime} min read
            </p>
            <span className="btn-link mt-6">
              Read the guide <Arrow size={16} className="arrow" />
            </span>
          </div>
        </Link>
      </section>

      {/* Filters */}
      <section className="container pb-24">
        <div className="sticky top-[84px] z-30 -mx-1 mb-10 rounded-full border border-white/[0.08] bg-ink-900/80 p-1.5 backdrop-blur-xl">
          <div className="snap-row gap-1 pb-0">
            {['All', ...CATEGORIES].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={cn(
                  'h-9 shrink-0 rounded-full px-4 text-sm font-medium transition-colors',
                  cat === c ? 'bg-fg text-ink-950' : 'text-fg-2 hover:bg-white/[0.06] hover:text-fg'
                )}
              >
                {c}
                <span className="ml-1.5 font-mono text-[11px] opacity-60">
                  {c === 'All' ? posts.length : posts.filter((p) => p.category === c).length}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <PostCard key={p.slug} post={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Blog;
