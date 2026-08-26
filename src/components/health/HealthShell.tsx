import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { SUPPORT_NOTICE, SUPPORT_LINK } from '@/data/healthData';

/** Quiet, reusable notice. Calm styling on purpose, never a red alarm. */
export const SupportNotice: React.FC<{ className?: string }> = ({ className = '' }) => (
  <aside className={`h-support ${className}`} role="note">
    <p>
      {SUPPORT_NOTICE}{' '}
      <a href={SUPPORT_LINK.href} target="_blank" rel="noopener noreferrer">
        {SUPPORT_LINK.label}
      </a>
      .
    </p>
  </aside>
);

export const Breadcrumbs: React.FC<{ trail: { label: string; to?: string }[] }> = ({ trail }) => (
  <nav aria-label="Breadcrumb" className="h-crumbs">
    {trail.map((item, i) => (
      <span key={item.label}>
        {i > 0 && <span aria-hidden="true" className="mx-2">/</span>}
        {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
      </span>
    ))}
  </nav>
);

/**
 * Wraps every /health page. Swaps the studio's violet gradient for the calm
 * health palette while mounted, and restores it on the way out.
 */
const HealthShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('health-mode');
    return () => document.body.classList.remove('health-mode');
  }, []);

  return (
    <>
    <div className="health-scope min-h-screen flex flex-col">
      <a href="#health-main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded">
        Skip to content
      </a>

      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: 'var(--h-surface)', borderColor: 'var(--h-line)' }}
      >
        <div className="h-wrap flex items-center gap-6 h-16">
          <Link to="/health" className="flex items-center gap-2.5 font-semibold" style={{ color: 'var(--h-text)' }}>
            <img src="/PGlogo.png" alt="" width={30} height={30} className="rounded-lg" loading="eager" />
            <span>
              PG Health
            </span>
          </Link>
          <nav className="ml-auto flex items-center gap-5 text-[15px]">
            <Link to="/health" className="hidden sm:inline">Apps</Link>
            <Link to="/health/guides">Guides</Link>
            <Link to="/health/about">About</Link>
            <Link to="/" className="h-muted hidden md:inline">All PG apps</Link>
          </nav>
        </div>
      </header>

      <main id="health-main" className="flex-1">{children}</main>

      <div className="h-wrap py-14">
        <SupportNotice />
      </div>
    </div>
    {/* Outside .health-scope on purpose: the shared footer keeps the studio's
        dark styling, and the section's colour rules must not reach into it. */}
    <Footer />
    </>
  );
};

export default HealthShell;
