import React from 'react';
import { Link } from 'react-router-dom';
import { SUPPORT_LINK, SUPPORT_NOTICE, type HealthApp } from '@/data/healthData';
import { StoreButton } from '@/components/kit/StoreButton';
import { cn } from '@/lib/utils';

/**
 * PG Health uses the studio design with a calmer setting: a soft lavender
 * light, gentler motion and the support notice on every page.
 * House style for this section: no dashes in any visitor facing copy.
 */
export function HealthFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate" style={{ ['--glow' as string]: '205 189 246' }}>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] bg-[radial-gradient(70%_60%_at_50%_0%,rgba(205,189,246,0.16),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[420px] -z-10 h-[600px] bg-[radial-gradient(50%_50%_at_80%_20%,rgba(167,215,197,0.07),transparent)]" />
      {children}
      <div className="container pb-8 pt-16">
        <SupportNotice />
      </div>
    </div>
  );
}

/** Quiet, reusable notice. Calm styling on purpose, never a red alarm. */
export function SupportNotice({ className }: { className?: string }) {
  return (
    <aside role="note" className={cn('mx-auto flex max-w-3xl gap-4 rounded-3xl border border-calm/20 bg-calm/[0.06] p-6 text-[15px] leading-relaxed text-fg-2', className)}>
      <span aria-hidden className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-calm shadow-[0_0_14px_rgba(205,189,246,0.9)]" />
      <p>
        {SUPPORT_NOTICE}{' '}
        <a href={SUPPORT_LINK.href} target="_blank" rel="noopener" className="font-medium text-fg underline decoration-calm/60 underline-offset-4 hover:decoration-calm">
          {SUPPORT_LINK.label}
        </a>
        .
      </p>
    </aside>
  );
}

export function HealthIcon({ app, size = 64, className }: { app: HealthApp; size?: number; className?: string }) {
  return (
    <img
      src={app.icon}
      alt={`${app.name} app icon`}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={cn('app-icon', className)}
      style={{ width: size, height: size }}
    />
  );
}

/** Card that sends readers from a guide to the app that helps with it. */
export function HealthAppCta({ app, end }: { app: HealthApp; end?: boolean }) {
  return (
    <aside className="spot my-12 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center">
      <HealthIcon app={app} size={60} />
      <div className="min-w-0 flex-1">
        <p className="text-lg font-semibold text-fg">{end ? 'Want help doing this daily?' : app.name}</p>
        <p className="mt-1 text-[15px] leading-snug text-fg-2">{end ? `${app.name}: ${app.tagline.toLowerCase()}.` : app.tagline}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Link to={`/health/apps/${app.slug}`} className="btn-ghost text-sm">
          About {app.name.split(':')[0]}
        </Link>
        <StoreButton href={app.appStoreUrl} app={app.name} />
      </div>
    </aside>
  );
}
