import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router keeps the previous scroll position on client-side navigation.
// Jump to the top on every route change (but honour in-page #anchors).
// The jump must be instant: the site sets `scroll-behavior: smooth` globally,
// and a smooth animated scroll across a page change is slow and can be
// cancelled — so temporarily override it.
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.style.scrollBehavior = previous;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
