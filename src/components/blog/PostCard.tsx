import { Link } from 'react-router-dom';
import type { PostMeta } from '@/content/blog';
import { iosApps, storeId, glowFor, screensFor } from '@/data/catalog';
import type { App } from '@/data/appData';
import { AppIcon } from '@/components/kit/AppIcon';
import { cn } from '@/lib/utils';

const CATEGORY_HUE: Record<string, string> = {
  Language: '52 211 153',
  Culture: '253 186 116',
  Travel: '125 211 252',
  Health: '240 171 252',
  Fitness: '251 146 60',
  Parenting: '125 211 252',
  Faith: '253 224 71',
  Games: '167 139 250',
  Sports: '74 222 128',
  Pickleball: '74 222 128',
  Cycling: '96 165 250',
  Portugal: '248 113 113',
  Productivity: '147 197 253',
  Apps: '196 181 253',
};

export const hueFor = (category: string) => CATEGORY_HUE[category] ?? '196 181 253';

export function relatedApp(post: PostMeta): App | undefined {
  for (const id of post.appIds) {
    const a = iosApps.find((x) => storeId(x) === id);
    if (a) return a;
  }
  // Posts that only link the app's website: match the app by name instead.
  const hay = `${post.slug} ${post.title} ${post.tags.join(' ')}`.toLowerCase();
  return iosApps.find((a) => hay.includes((a.slug ?? '').split('-')[0]) && (a.slug ?? '').length > 4);
}

export const formatDate = (d: string) =>
  new Date(d + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Generated cover: category light, the related app's icon and a screenshot sliver. */
export function PostCover({ post, className, large }: { post: PostMeta; className?: string; large?: boolean }) {
  const app = relatedApp(post);
  const hue = app ? glowFor(app) : hueFor(post.category);
  const shot = app ? screensFor(app, 'sm')[0] : undefined;
  return (
    <div
      className={cn('relative isolate overflow-hidden rounded-[20px] bg-ink-850', className)}
      style={{
        backgroundImage: `radial-gradient(120% 90% at 85% 0%, rgb(${hue} / 0.45), transparent 55%), radial-gradient(90% 80% at 0% 100%, rgb(${hue} / 0.18), transparent 60%)`,
      }}
      aria-hidden
    >
      <div className="grid-bg absolute inset-0 opacity-60" />
      {shot && (
        <img
          src={shot}
          alt=""
          loading="lazy"
          decoding="async"
          width={300}
          height={650}
          className={cn(
            'shot absolute right-[8%] w-[30%] rotate-[8deg] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:rotate-[5deg]',
            large ? 'top-[14%]' : 'top-[18%]'
          )}
        />
      )}
      <div className="absolute bottom-5 left-5 flex items-center gap-3">
        {app ? <AppIcon app={app} size={large ? 64 : 44} /> : null}
        <span className="chip border-white/15 bg-black/30 text-fg backdrop-blur">{post.category}</span>
      </div>
    </div>
  );
}

export function PostCard({ post, index = 0, compact }: { post: PostMeta; index?: number; compact?: boolean }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex h-full flex-col"
      data-reveal
      style={{ ['--d' as string]: index % 6 }}
    >
      <PostCover post={post} className="aspect-[16/10]" />
      <div className="mt-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden>·</span>
        <span>{post.readTime} min read</span>
      </div>
      <h3 className={cn('mt-3 font-semibold tracking-[-0.02em] transition-colors group-hover:text-brand', compact ? 'text-lg' : 'text-xl')}>
        {post.title}
      </h3>
      {!compact && <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{post.excerpt}</p>}
    </Link>
  );
}
