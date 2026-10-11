import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { App } from '@/data/appData';
import { glowFor, shortName, screensFor } from '@/data/catalog';
import { AppIcon } from '@/components/kit/AppIcon';
import { StoreButton } from '@/components/kit/StoreButton';
import { Arrow } from '@/components/kit/Icons';
import { cn } from '@/lib/utils';

export type TocItem = { id: string; text: string; depth: number };

/** Thin progress line at the very top of the viewport. */
export function ReadingProgress({ target }: { target: string }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.querySelector(target);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setP(Math.min(1, Math.max(0, -r.top / Math.max(total, 1))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [target]);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div
        className="h-full origin-left bg-gradient-to-r from-brand-violet via-brand-pink to-brand-peach"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}

/** Table of contents that highlights the section you are reading. */
export function Toc({ items, className }: { items: TocItem[]; className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const h2 = items.filter((t) => t.depth === 2);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const els = h2.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  if (h2.length < 2) return null;
  return (
    <nav aria-label="On this page" className={className}>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">On this page</p>
      <ol className="mt-4 space-y-1 border-l border-white/10">
        {h2.map((t) => (
          <li key={t.id}>
            <a
              href={`#${t.id}`}
              className={cn(
                '-ml-px block border-l py-1.5 pl-4 text-[13.5px] leading-snug transition-colors',
                active === t.id ? 'border-brand text-fg' : 'border-transparent text-fg-3 hover:text-fg-2'
              )}
            >
              {t.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** In-article card for the app the post is about. */
export function AppPromo({ app, compact }: { app: App; compact?: boolean }) {
  const shot = screensFor(app, 'sm')[0];
  return (
    <aside
      className={cn('spot not-prose relative my-12 flex items-center gap-5 overflow-hidden p-5 sm:p-6', compact && 'my-0 flex-col items-start')}
      style={{ ['--glow' as string]: glowFor(app) }}
    >
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgb(var(--glow)/0.25),transparent)]" />
      <AppIcon app={app} size={compact ? 56 : 64} />
      <div className="relative min-w-0 flex-1">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-fg-3">The app for this</p>
        <p className="mt-1 text-lg font-semibold leading-snug text-fg">{shortName(app)}</p>
        <p className="mt-1 text-[14.5px] leading-snug text-fg-2">{app.tagline}</p>
        <div className={cn('mt-4 flex flex-wrap items-center gap-3', compact && 'flex-col items-start')}>
          <StoreButton href={app.url} app={app.title} />
          <Link to={`/apps/${app.slug}`} className="btn-link text-sm">
            Learn more <Arrow size={14} className="arrow" />
          </Link>
        </div>
      </div>
      {!compact && shot && (
        <img src={shot} alt="" aria-hidden loading="lazy" width={300} height={650} className="shot relative hidden w-24 rotate-6 sm:block" />
      )}
    </aside>
  );
}

export function StudioBox() {
  return (
    <div className="surface flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-fg text-ink-950">
        <span className="font-serif text-3xl italic leading-none">pg</span>
      </span>
      <div className="flex-1">
        <p className="font-semibold text-fg">Written by PG App Studios</p>
        <p className="mt-1 text-[15px] leading-relaxed text-fg-2">
          An independent app studio in Lisbon run by Pedro Gregório. We write about the problems our apps solve, from
          learning European Portuguese to raising a toddler.
        </p>
      </div>
      <Link to="/about" className="btn-ghost shrink-0 text-sm">
        About the studio
      </Link>
    </div>
  );
}
