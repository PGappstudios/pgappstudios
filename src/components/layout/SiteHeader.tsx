import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Close, Menu } from '@/components/kit/Icons';
import { cn } from '@/lib/utils';
import { langOf } from '@/lib/i18n';
import { deSlugs } from '@/data/appData.de';

const NAV = [
  { to: '/our-apps', label: 'Apps' },
  { to: '/health', label: 'Health' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const NAV_DE = [
  { to: '/de', label: 'Apps auf Deutsch' },
  { to: '/our-apps', label: 'Alle Apps' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Kontakt' },
];

/** The same page in the other language, if there is one. */
export function counterpart(path: string): string | null {
  if (path === '/') return '/de';
  if (path === '/de') return '/';
  const en = path.match(/^\/apps\/([^/]+)$/);
  if (en && deSlugs.includes(en[1])) return `/de/apps/${en[1]}`;
  const de = path.match(/^\/de\/apps\/([^/]+)$/);
  if (de) return `/apps/${de[1]}`;
  return null;
}

function LangSwitch({ path }: { path: string }) {
  const other = counterpart(path);
  if (!other) return null;
  const de = langOf(path) === 'de';
  return (
    <div className="flex items-center rounded-full border border-white/10 p-0.5 font-mono text-[11px] uppercase tracking-[0.1em]" role="group" aria-label="Language">
      {de ? (
        <Link to={other} hrefLang="en" lang="en" className="rounded-full px-2.5 py-1.5 text-fg-2 hover:text-fg">
          EN
        </Link>
      ) : (
        <span className="rounded-full bg-white/10 px-2.5 py-1.5 text-fg" aria-current="true">EN</span>
      )}
      {de ? (
        <span className="rounded-full bg-white/10 px-2.5 py-1.5 text-fg" aria-current="true">DE</span>
      ) : (
        <Link to={other} hrefLang="de" lang="de" className="rounded-full px-2.5 py-1.5 text-fg-2 hover:text-fg">
          DE
        </Link>
      )}
    </div>
  );
}

export function Logo({ className, to = '/' }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn('group flex items-center gap-2.5', className)}>
      <span aria-hidden className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-[10px] bg-fg text-ink-950 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_6px_20px_-6px_rgba(196,181,253,0.7)]">
        <span className="font-serif text-[19px] italic leading-none">pg</span>
      </span>
      <span className="text-[15px] font-semibold tracking-[-0.02em] text-fg">
        PG App Studios
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const path = pathname.replace(/\/+$/, '') || '/';
  const de = langOf(path) === 'de';
  const nav = de ? NAV_DE : NAV;
  const isActive = (to: string) =>
    path === to || (to !== '/de' && path.startsWith(to + '/')) || (to === '/our-apps' && path.startsWith('/apps/')) || (to === '/de' && path.startsWith('/de/'));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          'mx-auto flex h-14 max-w-[1240px] items-center justify-between rounded-full border pl-4 pr-2 transition-all duration-500 ease-out sm:pl-5',
          scrolled || open
            ? 'border-white/[0.09] bg-ink-900/70 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-transparent bg-transparent'
        )}
      >
        <Logo to={de ? '/de' : '/'} />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={cn(
                'relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors',
                isActive(n.to) ? 'bg-white/[0.07] text-fg' : 'text-fg-2 hover:text-fg'
              )}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch path={path} />
          <Link to={de ? '/de' : '/our-apps'} className="btn-primary hidden min-h-[40px] px-4 text-[14px] sm:inline-flex" data-magnetic>
            {de ? 'Zu den Apps' : 'Get the apps'}
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-fg md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          'fixed inset-x-3 top-[76px] origin-top rounded-3xl border border-white/10 bg-ink-900/95 p-3 backdrop-blur-xl transition-all duration-300 ease-out md:hidden',
          open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((n, i) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={cn(
                'flex items-center justify-between rounded-2xl px-4 py-4 text-2xl font-semibold tracking-[-0.03em]',
                isActive(n.to) ? 'bg-white/[0.06] text-fg' : 'text-fg-2'
              )}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {n.label}
              <span className="font-mono text-xs text-fg-3">0{i + 1}</span>
            </NavLink>
          ))}
          <Link to={de ? '/de' : '/our-apps'} className="btn-primary mt-3 w-full">
            {de ? 'Zu den Apps' : 'Get the apps'}
          </Link>
        </nav>
      </div>
    </header>
  );
}
