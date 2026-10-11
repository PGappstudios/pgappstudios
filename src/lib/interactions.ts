/**
 * Site-wide motion and tracking, attached once by the app shell.
 *
 *  - Scroll reveal: any element with [data-reveal] or .words fades in the
 *    first time it enters the viewport.
 *  - Spotlight: .spot cards get --mx/--my so their border light follows the
 *    pointer.
 *  - Magnetic: [data-magnetic] elements lean a few pixels toward the pointer.
 *  - Store clicks: every App Store / Google Play link, including those inside
 *    blog posts, sends a GA4 event with the app and the page it came from.
 */
import { trackStoreClick } from './track';

let io: IntersectionObserver | null = null;

const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Observe every not-yet-revealed element currently in the DOM. */
export function scanReveals(root: ParentNode = document) {
  const els = root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in), .words:not(.is-in):not([data-now])');
  if (!('IntersectionObserver' in window) || reduceMotion()) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  io ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io!.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  els.forEach((el) => io!.observe(el));
}

let attached = false;

export function attachGlobalInteractions() {
  if (attached || typeof window === 'undefined') return;
  attached = true;

  // Pick up content that appears after first render (filters, lazy articles).
  const mo = new MutationObserver((records) => {
    if (records.some((r) => r.addedNodes.length)) scanReveals();
  });
  mo.observe(document.body, { childList: true, subtree: true });

  const fine = window.matchMedia?.('(pointer: fine)').matches;

  if (fine) {
    let raf = 0;
    let last: PointerEvent | null = null;
    let magnet: HTMLElement | null = null;

    const frame = () => {
      raf = 0;
      const e = last!;
      const target = e.target as Element | null;

      const card = target?.closest?.<HTMLElement>('.spot');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }

      const m = target?.closest?.<HTMLElement>('[data-magnetic]') ?? null;
      if (magnet && magnet !== m) magnet.style.transform = '';
      magnet = m;
      if (m && !reduceMotion()) {
        const r = m.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / r.width;
        const y = (e.clientY - (r.top + r.height / 2)) / r.height;
        m.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0)`;
      }
    };

    window.addEventListener(
      'pointermove',
      (e) => {
        last = e;
        if (!raf) raf = requestAnimationFrame(frame);
      },
      { passive: true }
    );
  }

  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest?.('a') as HTMLAnchorElement | null;
    if (!a) return;
    const store = a.href.includes('apps.apple.com') ? 'app_store' : a.href.includes('play.google.com') ? 'play_store' : null;
    if (!store) return;
    trackStoreClick({
      appName: a.dataset.app || a.href.match(/id(\d+)/)?.[1] || 'unknown',
      store,
      sourcePage: window.location.pathname,
    });
  });
}
