import React from 'react';
import { Words } from './Words';
import { cn } from '@/lib/utils';

/** Standard section intro: mono eyebrow, word-reveal title, supporting line. */
export function SectionHead({
  eyebrow,
  title,
  sub,
  align = 'left',
  className,
  as = 'h2',
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  children?: React.ReactNode;
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className="eyebrow mb-5" data-reveal="fade">
          {eyebrow}
        </p>
      )}
      <Words as={as} text={title} className="text-display-md font-semibold" />
      {sub && (
        <p className="mt-5 text-lg leading-relaxed text-fg-2" data-reveal style={{ ['--d' as string]: 2 }}>
          {sub}
        </p>
      )}
      {children}
    </div>
  );
}

export function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn('relative py-24 sm:py-32', className)}>
      <div className="container">{children}</div>
    </section>
  );
}
