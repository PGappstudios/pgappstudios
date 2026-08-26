import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootEl = document.getElementById("root")!;

// scripts/ssg.mjs renders every route with react-dom/server at build time, so
// the HTML we receive is genuine server output and can be hydrated. Fall back
// to a plain client render if a page ever ships without it.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, <App />);
} else {
  createRoot(rootEl).render(<App />);
}
