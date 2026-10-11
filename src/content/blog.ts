/**
 * Blog content. Each post is a markdown file in ./blog/. The listing data
 * (frontmatter) is bundled with every page that needs it; the article body is
 * a separate chunk per post, loaded only on that post's page.
 */
import { lazyBody, type Body } from './lazyBody';

export interface PostMeta {
  slug: string;
  title: string;
  /** Shorter title for search results when the headline is long */
  seoTitle?: string;
  excerpt: string;
  author: string;
  date: string;
  updatedDate?: string;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  metaDescription: string;
  metaKeywords: string;
  wordCount: number;
  /** App Store ids linked from the post, used to pick the related app */
  appIds: string[];
}

const metas = import.meta.glob<PostMeta>('./blog/*.md', { eager: true, query: '?meta', import: 'default' });
const bodies = import.meta.glob<{ default: Body }>('./blog/*.md', { query: '?body' });

const slugOf = (path: string) => path.split('/').pop()!.replace(/\.md$/, '');

export const posts: PostMeta[] = Object.values(metas).sort(
  (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title)
);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const postBody = lazyBody(
  Object.fromEntries(Object.entries(bodies).map(([path, load]) => [slugOf(path), () => load().then((m) => m.default)]))
);

export const CATEGORIES = [...new Set(posts.map((p) => p.category))].sort();

/** Posts that share the most tags/category with this one. */
export function relatedPosts(post: PostMeta, n = 3): PostMeta[] {
  const tags = new Set(post.tags.map((t) => t.toLowerCase()));
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score:
        (p.category === post.category ? 2 : 0) +
        p.tags.filter((t) => tags.has(t.toLowerCase())).length +
        p.appIds.filter((id) => post.appIds.includes(id)).length * 3,
    }))
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, n)
    .map((x) => x.p);
}
