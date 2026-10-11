import React, { Suspense, useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { attachGlobalInteractions, scanReveals } from '@/lib/interactions';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Header, footer, page transition, scroll restoration and global motion. */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    attachGlobalInteractions();
  }, []);

  // New page: start at the top (or at the #anchor), then look for reveals.
  useIsoLayoutEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname]);

  useEffect(() => {
    const id = requestAnimationFrame(() => scanReveals());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-ink-950">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" key={pathname} className="page-enter min-h-[70vh]">
        <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
      </main>
      <SiteFooter />
    </>
  );
}

function PageSkeleton() {
  return (
    <div className="container pt-40" aria-busy="true" aria-label="Loading">
      <div className="h-4 w-32 animate-pulse rounded-full bg-white/[0.06]" />
      <div className="mt-6 h-14 w-3/4 animate-pulse rounded-2xl bg-white/[0.06]" />
      <div className="mt-4 h-14 w-1/2 animate-pulse rounded-2xl bg-white/[0.04]" />
    </div>
  );
}
