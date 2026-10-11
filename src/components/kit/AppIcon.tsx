import type { App } from '@/data/appData';
import { iconFor, shortName } from '@/data/catalog';
import { cn } from '@/lib/utils';

export function AppIcon({ app, size = 56, className, eager }: { app: App; size?: number; className?: string; eager?: boolean }) {
  return (
    <img
      src={iconFor(app)}
      alt={`${shortName(app)} app icon`}
      width={size}
      height={size}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={cn('app-icon', className)}
      style={{ width: size, height: size }}
    />
  );
}
