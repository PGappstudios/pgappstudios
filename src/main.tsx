import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootEl = document.getElementById("root")!;

// The prerender step snapshots the live DOM rather than doing true server
// rendering, so the markup lacks React's SSR text separators. Attempting to
// hydrate it always fails, and React then discards the DOM and client renders
// anyway, paying for the failed attempt first. Rendering directly is the same
// end result without the errors. Crawlers still get the full prerendered HTML.
createRoot(rootEl).render(<App />);
