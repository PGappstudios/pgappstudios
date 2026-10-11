import { useEffect } from 'react';
import { isServer, setSSRHead } from './ssrHead';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLd?: object | object[];
  /** Keep the page out of search results (404s) */
  noindex?: boolean;
}

const DEFAULT_OG = 'https://www.pgappstudios.com/og/default.png';

/**
 * Declares a page's head. During static generation the data is collected and
 * written into the HTML by scripts/ssg.mjs; in the browser it updates
 * document.head when the user navigates between pages.
 */
export function useSEO(props: SEOProps) {
  const { title, description, canonical, ogImage = DEFAULT_OG, ogType = 'website', jsonLd, noindex } = props;

  if (isServer) setSSRHead({ title, description, canonical, ogImage, ogType, jsonLd, noindex });

  const ld = JSON.stringify(jsonLd ?? null);

  useEffect(() => {
    document.title = title;

    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'title', title);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1');

    if (canonical) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
      setMeta('property', 'og:url', canonical);
      setMeta('name', 'twitter:url', canonical);
    }

    // Page-level structured data. The static HTML already carries this page's
    // blocks (marked data-page-ld); replace them rather than adding duplicates.
    document.head.querySelectorAll('script[data-page-ld]').forEach((s) => s.remove());
    const blocks = JSON.parse(ld);
    if (blocks) {
      for (const b of Array.isArray(blocks) ? blocks : [blocks]) {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute('data-page-ld', '');
        s.text = JSON.stringify(b);
        document.head.appendChild(s);
      }
    }
  }, [title, description, canonical, ogImage, ogType, ld, noindex]);
}
