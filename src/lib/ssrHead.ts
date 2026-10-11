/**
 * Collects the SEO data a page declares through useSEO while it is being
 * rendered at build time; scripts/ssg.mjs writes it into the HTML.
 */
export interface HeadData {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLd?: object | object[];
  noindex?: boolean;
  lang?: 'en' | 'de';
  /** hreflang alternates, e.g. [{ lang: 'en', href }, { lang: 'de', href }] */
  alternates?: { lang: string; href: string }[];
}

let current: HeadData | null = null;

export const setSSRHead = (data: HeadData) => {
  current = data;
};

/** Reads and clears the collected head data. */
export const takeSSRHead = (): HeadData | null => {
  const value = current;
  current = null;
  return value;
};

export const isServer = typeof window === 'undefined';
