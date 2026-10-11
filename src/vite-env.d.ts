/// <reference types="vite/client" />

/** Frontmatter + derived fields of a markdown file (scripts/vite-plugin-md.mjs). */
declare module '*.md?meta' {
  const meta: Record<string, any>;
  export default meta;
}

/** Compiled body of a markdown file. */
declare module '*.md?body' {
  const body: {
    html: string;
    toc: { id: string; text: string; depth: number }[];
    faq: { q: string; a: string }[];
  };
  export default body;
}
