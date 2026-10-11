import type { App } from '@/data/appData';
import { screensFor } from '@/data/catalog';
import { cn } from '@/lib/utils';

/**
 * The hero wall: columns of real App Store screenshots drifting up and down
 * on a tilted plane. Pure CSS animation; holds still for reduced motion.
 *
 * The plane is sized to its container (1.6x its height, centred), so the 3D
 * tilt pivots around the middle of what you see, whatever the screen size.
 * Each column clips its own long strip.
 */
export function ScreenWall({ apps, columns = 4, className }: { apps: App[]; columns?: number; className?: string }) {
  const pool = apps.flatMap((a) => screensFor(a, 'sm').slice(0, 2));
  const cols = Array.from({ length: columns }, (_, c) => pool.filter((_, i) => i % columns === c));
  return (
    <div className={cn('pointer-events-none relative h-full select-none [perspective:1800px]', className)} aria-hidden>
      <div className="absolute inset-x-0 top-1/2 flex h-[160%] -translate-y-1/2 justify-center gap-4 [transform-style:preserve-3d] sm:gap-5">
        <div className="flex h-full gap-4 [transform:rotateX(22deg)_rotateY(-16deg)_rotateZ(9deg)] sm:gap-5">
          {cols.map((col, c) => (
            <div key={c} className="h-full w-[150px] shrink-0 overflow-hidden sm:w-[190px]" style={{ marginTop: c % 2 ? '-60px' : 0 }}>
              <div
                className="flex animate-marquee-y flex-col gap-4 sm:gap-5"
                style={{ ['--marquee-duration' as string]: `${70 + c * 14}s`, animationDirection: c % 2 ? 'reverse' : 'normal' }}
              >
                {[...col, ...col].map((src, i) => (
                  <img key={i} src={src} alt="" width={300} height={650} loading={i < 4 ? 'eager' : 'lazy'} decoding="async" className="shot" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
