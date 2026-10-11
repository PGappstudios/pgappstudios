import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import './index.css';
import App from './App';
import { preloadRoute } from './AppRoutes';

const rootEl = document.getElementById('root')!;

// Every page is pre-rendered at build time (scripts/ssg.mjs). Load this page's
// chunk and article body first, so the first client render matches the HTML
// exactly and hydration never has to throw anything away.
preloadRoute(window.location.pathname)
  .catch(() => undefined)
  .then(() => {
    if (rootEl.hasChildNodes()) hydrateRoot(rootEl, <App />);
    else createRoot(rootEl).render(<App />);
  });
