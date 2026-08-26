/**
 * GA4 event helpers.
 *
 * gtag is loaded in index.html. These helpers no op safely when it is not
 * available (local dev, prerender, blockers) so nothing ever throws.
 */

type Gtag = (command: string, eventName: string, params?: Record<string, unknown>) => void;

const gtag = (): Gtag | null => {
  const w = window as unknown as { gtag?: Gtag };
  return typeof w?.gtag === 'function' ? w.gtag : null;
};

/**
 * Outbound click on an App Store or Google Play link.
 * Lets us see which page and which article actually drives installs.
 */
export function trackStoreClick(params: {
  appName: string;
  store: 'app_store' | 'play_store';
  sourcePage: string;
}) {
  gtag()?.('event', 'store_outbound_click', {
    app_name: params.appName,
    store: params.store,
    source_page: params.sourcePage,
    transport_type: 'beacon',
  });
}

/** Tap on a cross promotion row inside the health hub. */
export function trackHealthNav(params: { target: string; sourcePage: string }) {
  gtag()?.('event', 'health_internal_click', {
    target: params.target,
    source_page: params.sourcePage,
  });
}
