import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SUPPORT_NOTICE, SUPPORT_LINK } from '@/data/healthData';

/**
 * Reveals `.animate-on-scroll` elements as they enter the viewport, the same
 * way the rest of the site does.
 */
export function useScrollReveal(deps: unknown[] = []) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const els = document.querySelectorAll('.animate-on-scroll');
    els.forEach((el) => observerRef.current?.observe(el));
    return () => els.forEach((el) => observerRef.current?.unobserve(el));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

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
 * Wraps every /health page. Uses the studio navbar, gradient background and
 * footer so the section looks like the rest of pgappstudios.com.
 */
const HealthShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('health-mode');
    return () => document.body.classList.remove('health-mode');
  }, []);

  return (
    <>
      <div className="health-scope min-h-screen flex flex-col">
        <Navbar />
        <main id="health-main" className="flex-1 pt-24">
          {children}
        </main>

        <div className="h-wrap py-14">
          <SupportNotice />
        </div>
      </div>
      {/* Outside .health-scope on purpose: the shared footer keeps its own
          styling, and the section's colour rules must not reach into it. */}
      <Footer />
    </>
  );
};

export default HealthShell;
