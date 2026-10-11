import React from 'react';

type Loader<P> = () => Promise<{ default: React.ComponentType<P> }>;

export type LazyPage<P = object> = React.FC<P> & { preload: () => Promise<void> };

/**
 * Route-level code splitting that hydrates cleanly.
 *
 * React.lazy alone always suspends on first render, even when the chunk is
 * already in memory. Here, once preload() has resolved (the build does it for
 * every page, the browser does it for the current page before hydrating) the
 * page renders synchronously, so server and client markup line up exactly.
 * Navigating to a page that is not loaded yet falls back to React.lazy.
 */
export function lazyPage<P extends object = object>(load: Loader<P>): LazyPage<P> {
  let Loaded: React.ComponentType<P> | null = null;
  let promise: Promise<void> | null = null;

  const preload = () =>
    (promise ??= load().then((m) => {
      Loaded = m.default;
    }));

  const Lazy = React.lazy(() => preload().then(() => ({ default: Loaded! })));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Page = ((props: any) => (Loaded ? <Loaded {...props} /> : <Lazy {...props} />)) as LazyPage<P>;
  Page.preload = preload;
  return Page;
}
