import { Link } from 'react-router-dom';
import type { App } from '@/data/appData';
import { glowFor, groupById, groupOf, screensFor, shortName, isStoreApp } from '@/data/catalog';
import { AppIcon } from '@/components/kit/AppIcon';
import { Arrow } from '@/components/kit/Icons';
import { cn } from '@/lib/utils';

/**
 * The standard app tile: icon, name, one line, and two real screenshots that
 * rise out of the bottom on hover. The whole card links to the app's page.
 */
export function AppCard({ app, index = 0, className }: { app: App; index?: number; className?: string }) {
  const shots = screensFor(app, 'sm');
  const group = groupById(groupOf(app));
  return (
    <Link
      to={`/apps/${app.slug}`}
      className={cn('spot group flex h-full flex-col overflow-hidden p-6 transition-transform duration-500 ease-out hover:-translate-y-1', className)}
      style={{ ['--glow' as string]: glowFor(app), ['--d' as string]: index % 6 }}
      data-reveal
    >
      <div className="flex items-start justify-between gap-4">
        <AppIcon app={app} size={60} />
        <span className="chip">{isStoreApp(app) ? group.short : 'Web'}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{shortName(app)}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{app.tagline ?? app.description}</p>

      {shots.length > 0 ? (
        <div className="relative -mb-24 mt-7 flex h-44 justify-center gap-3" aria-hidden>
          {shots.slice(0, 2).map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              width={300}
              height={650}
              className={cn(
                'shot w-[44%] transition-transform duration-700 ease-out',
                i === 0 ? 'translate-y-6 -rotate-3 group-hover:translate-y-0 group-hover:-rotate-6' : 'translate-y-10 rotate-3 group-hover:translate-y-2 group-hover:rotate-6'
              )}
            />
          ))}
        </div>
      ) : (
        <div className="mt-auto pt-8">
          <span className="btn-link text-sm">
            Open <Arrow size={15} className="arrow" />
          </span>
        </div>
      )}
    </Link>
  );
}
