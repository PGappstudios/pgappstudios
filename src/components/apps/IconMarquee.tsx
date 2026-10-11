import { Link } from 'react-router-dom';
import type { App } from '@/data/appData';
import { shortName } from '@/data/catalog';
import { AppIcon } from '@/components/kit/AppIcon';

/** Endless row of app icons with names; hover pauses it. */
export function IconMarquee({ apps, reverse, duration = 60 }: { apps: App[]; reverse?: boolean; duration?: number }) {
  const row = [...apps, ...apps];
  return (
    <div className="marquee-pause fade-x overflow-hidden py-2">
      <div
        className="flex w-max animate-marquee-x gap-3"
        style={{ ['--marquee-duration' as string]: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {row.map((a, i) => (
          <Link
            key={i}
            to={`/apps/${a.slug}`}
            tabIndex={i >= apps.length ? -1 : undefined}
            aria-hidden={i >= apps.length ? true : undefined}
            className="flex items-center gap-3 rounded-full border border-white/[0.07] bg-white/[0.025] py-2 pl-2 pr-5 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
          >
            <AppIcon app={a} size={36} />
            <span className="whitespace-nowrap text-sm font-medium text-fg">{shortName(a)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
