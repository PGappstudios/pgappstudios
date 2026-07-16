import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootEl = document.getElementById("root")!;

// When react-snap has pre-rendered the page, the root already contains markup —
// hydrate it. Otherwise mount normally (dev, or if prerender was skipped).
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, <App />);
} else {
  createRoot(rootEl).render(<App />);
}
