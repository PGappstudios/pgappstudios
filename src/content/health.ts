/** Health hub guides: same pipeline as the blog, see ./blog.ts. */
import { lazyBody, type Body } from './lazyBody';
import type { HealthArticle } from '@/data/healthData';

export type GuideMeta = Omit<HealthArticle, 'body'> & { wordCount: number };

const metas = import.meta.glob<GuideMeta>('./health/*.md', { eager: true, query: '?meta', import: 'default' });
const bodies = import.meta.glob<{ default: Body }>('./health/*.md', { query: '?body' });
const slugOf = (path: string) => path.split('/').pop()!.replace(/\.md$/, '');

export const guides: GuideMeta[] = Object.values(metas).sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);

export const guideBody = lazyBody(
  Object.fromEntries(Object.entries(bodies).map(([path, load]) => [slugOf(path), () => load().then((m) => m.default)]))
);
