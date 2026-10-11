/**
 * A tiny loader for per-article chunks that works the same during static
 * generation and in the browser:
 *
 *  - preload(key) fetches the chunk and remembers it.
 *  - get(key) returns it synchronously once loaded (or undefined).
 *
 * The build preloads every body before rendering, and the browser preloads the
 * current page's body before hydrating, so the first render on both sides has
 * the article and the markup matches exactly. In-app navigation to a new
 * article shows a skeleton for the moment it takes to load.
 */
export type Body = {
  html: string;
  toc: { id: string; text: string; depth: number }[];
  faq: { q: string; a: string }[];
};

export function lazyBody(loaders: Record<string, () => Promise<Body>>) {
  const cache = new Map<string, Body>();
  const pending = new Map<string, Promise<Body | undefined>>();

  const preload = (key: string): Promise<Body | undefined> => {
    if (cache.has(key)) return Promise.resolve(cache.get(key));
    if (!loaders[key]) return Promise.resolve(undefined);
    if (!pending.has(key)) {
      pending.set(
        key,
        loaders[key]().then((b) => {
          cache.set(key, b);
          return b;
        })
      );
    }
    return pending.get(key)!;
  };

  return {
    keys: Object.keys(loaders),
    preload,
    get: (key: string) => cache.get(key),
    preloadAll: () => Promise.all(Object.keys(loaders).map(preload)),
  };
}
