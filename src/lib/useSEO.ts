import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLd?: object | object[];
}

export function useSEO({ title, description, canonical, ogImage, ogType, jsonLd }: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Helper to set or create meta tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrValue] = selector.replace('meta[', '').replace(']', '').split('=');
        el.setAttribute(attrName, attrValue.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
      // Keep social-card URLs in sync with the canonical (the static head
      // hard-codes the homepage; without this every page shares one og:url).
      setMeta('meta[property="og:url"]', 'content', canonical);
      setMeta('meta[name="twitter:url"]', 'content', canonical);
    }

    if (ogType) {
      setMeta('meta[property="og:type"]', 'content', ogType);
    }

    if (ogImage) {
      setMeta('meta[property="og:image"]', 'content', ogImage);
      setMeta('meta[name="twitter:image"]', 'content', ogImage);
    }

    // JSON-LD structured data
    if (jsonLd) {
      const existing = document.getElementById('page-jsonld');
      if (existing) existing.remove();

      const script = document.createElement('script');
      script.id = 'page-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, ogImage]);
}
