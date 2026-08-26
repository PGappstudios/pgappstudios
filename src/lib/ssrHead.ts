/**
 * Collects the SEO data a page declares through useSEO while it is being
 * rendered to a string at build time.
 *
 * In the browser useSEO writes straight to document.head in an effect. During
 * static generation there is no document and effects never run, so the hook
 * hands its data here instead and scripts/ssg.mjs writes the tags into the
 * HTML it emits.
 */

export interface HeadData {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLd?: object | object[];
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
