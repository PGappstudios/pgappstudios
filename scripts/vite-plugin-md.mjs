/**
 * Markdown content, compiled at build time.
 *
 * Blog posts and health guides live as plain .md files with frontmatter in
 * src/content/. Importing one gives you either half of it:
 *
 *   import meta from './post.md?meta'   frontmatter + derived fields (small)
 *   import body from './post.md?body'   { html, toc, faq }      (the article)
 *
 * Splitting them keeps the blog index tiny: listing pages import every ?meta,
 * and each article page lazy-loads only its own ?body chunk. No markdown
 * parser ever ships to the browser.
 */
import fs from 'node:fs';
import matter from 'gray-matter';
import { Marked } from 'marked';

const SITE_HOST = 'www.pgappstudios.com';

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 64);

const stripTags = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

/** Pages render the title themselves, so a leading "# Title" would be a second H1. */
function stripLeadingH1(md) {
  const lines = md.split('\n');
  const i = lines.findIndex((l) => l.trim() !== '');
  if (i >= 0 && /^#\s+/.test(lines[i])) lines.splice(i, 1);
  return lines.join('\n').replace(/^\s+/, '');
}

function compile(markdown) {
  const toc = [];
  const used = new Map();
  const faq = [];
  let inFaq = false;
  let pendingQ = null;
  let h2Count = 0;

  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        const text = stripTags(inner);
        let id = slugify(text) || `section-${toc.length + 1}`;
        const n = used.get(id) || 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n + 1}`;
        if (depth === 2) {
          h2Count += 1;
          inFaq = /faq|frequently asked|common questions/i.test(text);
        }
        if (depth === 2 || depth === 3) toc.push({ id, text, depth });
        if (inFaq && depth === 3 && text.trim().endsWith('?')) pendingQ = { q: text.trim(), a: '' };
        else if (depth <= 3) pendingQ = null;
        // a marker the article page swaps for an in-line app card
        const marker = depth === 2 && h2Count === 3 ? '<!--app-promo-->' : '';
        return `${marker}<h${depth} id="${id}"><a class="h-anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${inner}</h${depth}>\n`;
      },
      paragraph({ tokens }) {
        const html = this.parser.parseInline(tokens);
        if (pendingQ) {
          pendingQ.a += (pendingQ.a ? ' ' : '') + stripTags(html);
          if (!faq.includes(pendingQ)) faq.push(pendingQ);
        }
        return `<p>${html}</p>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const t = title ? ` title="${title}"` : '';
        let external = false;
        try {
          const u = new URL(href, `https://${SITE_HOST}`);
          external = u.host !== SITE_HOST && /^https?:$/.test(u.protocol);
          if (!external && u.host === SITE_HOST) href = u.pathname + u.search + u.hash;
        } catch {
          /* relative or odd link: leave as is */
        }
        if (!external) return `<a href="${href}"${t}>${text}</a>`;
        const store = /apps\.apple\.com|play\.google\.com/.test(href) ? ' data-store="1"' : '';
        return `<a href="${href}"${t} target="_blank" rel="noopener"${store}>${text}</a>`;
      },
      image({ href, title, text }) {
        const t = title ? ` title="${title}"` : '';
        return `<img src="${href}" alt="${text}"${t} loading="lazy" decoding="async" />`;
      },
      table(token) {
        const html = marked.Renderer.prototype.table.call(this, token);
        return `<div class="table-wrap">${html}</div>\n`;
      },
    },
  });

  const html = marked.parse(markdown);
  return { html, toc, faq: faq.filter((f) => f.a) };
}

const words = (s) => (s.replace(/[#*_>`\[\]()!-]/g, ' ').match(/\S+/g) || []).length;

export default function mdContent() {
  return {
    name: 'pg-md-content',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!/\.md\?(meta|body)$/.test(source)) return null;
      const [file, q] = source.split('?');
      const resolved = await this.resolve(file, importer, { skipSelf: true });
      return resolved ? `${resolved.id}?${q}` : null;
    },
    load(id) {
      const m = id.match(/^(.*\.md)\?(meta|body)$/);
      if (!m) return null;
      const [, file, part] = m;
      this.addWatchFile(file);
      const raw = fs.readFileSync(file, 'utf8');
      const { data, content } = matter(raw);
      const md = stripLeadingH1(content);

      if (part === 'meta') {
        const date = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d);
        const appIds = [...new Set([...md.matchAll(/apps\.apple\.com\/(?:[a-z]{2}\/)?app\/(?:[^/\s)]+\/)?id(\d+)/g)].map((x) => x[1]))];
        const wc = words(md);
        const meta = {
          ...data,
          date: date(data.date),
          publishedDate: date(data.publishedDate),
          updatedDate: date(data.updatedDate),
          wordCount: wc,
          readTime: data.readTime || data.readingMinutes || Math.max(3, Math.round(wc / 230)),
          appIds,
        };
        Object.keys(meta).forEach((k) => meta[k] === undefined && delete meta[k]);
        return `export default ${JSON.stringify(meta)};`;
      }

      return `export default ${JSON.stringify(compile(md))};`;
    },
  };
}
