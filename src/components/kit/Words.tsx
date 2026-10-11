import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Splits a headline into words that blur in one after another.
 * `now` animates on load (hero); otherwise it waits until scrolled into view.
 * Wrap a phrase in *asterisks* to set it in the serif accent.
 */
export function Words({
  text,
  as: Tag = 'span',
  className,
  now,
  delay = 0,
  accentClass = 'serif-accent text-gradient pr-[0.06em]',
}: {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  now?: boolean;
  delay?: number;
  accentClass?: string;
}) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  let w = 0;
  const nodes: React.ReactNode[] = [];
  parts.forEach((part, pi) => {
    const accent = part.startsWith('*') && part.endsWith('*');
    const words = (accent ? part.slice(1, -1) : part).split(/(\s+)/);
    words.forEach((word, i) => {
      if (!word) return;
      if (/^\s+$/.test(word)) {
        nodes.push(' ');
        return;
      }
      nodes.push(
        <span key={`${pi}-${i}`} className={accent ? accentClass : undefined} style={{ ['--w' as string]: w++ }}>
          {word}
        </span>
      );
    });
  });
  const Comp = Tag as React.ElementType;
  return (
    <Comp className={cn('words', className)} data-now={now ? '' : undefined} style={{ ['--base' as string]: `${delay}ms` }}>
      {nodes}
    </Comp>
  );
}
