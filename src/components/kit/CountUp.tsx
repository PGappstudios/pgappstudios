import { useEffect, useRef, useState } from 'react';

/**
 * A number that counts up when it scrolls into view. The static HTML carries
 * the final value, so crawlers and no-JS visitors see the real figure.
 */
export function CountUp({ value, decimals = 0, suffix = '' }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) return; // already on screen: leave it
    setShown(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const dur = 1400;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        setShown(value * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}
