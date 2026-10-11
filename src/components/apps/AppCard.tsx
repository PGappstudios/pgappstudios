import { Link } from 'react-router-dom';
import type { App } from '@/data/appData';
import { glowFor, groupById, groupOf, screensFor, shortName, isStoreApp } from '@/data/catalog';
import { AppIcon } from '@/components/kit/AppIcon';
import { Arrow } from '@/components/kit/Icons';
import { cn } from '@/lib/utils';
import { GROUP_LABEL_DE, type Lang } from '@/lib/i18n';
import { appsDe } from '@/data/appData.de';

/**
 * The standard app tile: icon, name, one line, and two real screenshots that
 * rise out of the bottom on hover. The whole card links to the app's page.
 */
export function AppCard({ app, index = 0, className, lang = 'en' }: { app: App; index?: number; className?: string; lang?: Lang }) {
  const de = lang === 'de' ? appsDe[app.slug ?? ''] : undefined;
  const shots = screensFor(app, 'sm');
  const group = groupById(groupOf(app));
  return (
    <Link
      to={de ? `/de/apps/${app.slug}` : `/apps/${app.slug}`}
      className={cn('spot group flex h-full flex-col overflow-hidden p-6 transition-transform duration-500 ease-out hover:-translate-y-1', className)}
      style={{ ['--glow' as string]: glowFor(app), ['--d' as string]: index % 6 }}
      data-reveal
    >
      <div className="flex items-start justify-between gap-4">
        <AppIcon app={app} size={60} />
        <span className="chip">{de ? GROUP_LABEL_DE[group.id] : isStoreApp(app) ? group.short : 'Web'}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{shortName(app)}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{de?.tagline ?? app.tagline ?? app.description}</p>

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
