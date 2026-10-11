import { Apple, GooglePlay, Globe, ArrowUpRight } from './Icons';
import { cn } from '@/lib/utils';

type Kind = 'app-store' | 'play' | 'web';

/** Outbound button to a store or a product website. Clicks are tracked globally (lib/interactions). */
export function StoreButton({
  href,
  kind = 'app-store',
  app,
  label,
  className,
  size = 'md',
}: {
  href: string;
  kind?: Kind;
  app?: string;
  label?: string;
  className?: string;
  size?: 'md' | 'lg';
}) {
  const top = kind === 'app-store' ? 'Download on the' : kind === 'play' ? 'Get it on' : 'Visit the';
  const main = label ?? (kind === 'app-store' ? 'App Store' : kind === 'play' ? 'Google Play' : 'website');
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      data-app={app}
      data-magnetic
      className={cn('btn-store', size === 'lg' && 'min-h-[56px] pl-5 pr-6', className)}
    >
      {kind === 'app-store' && <Apple size={size === 'lg' ? 24 : 20} />}
      {kind === 'play' && <GooglePlay size={size === 'lg' ? 20 : 18} />}
      {kind === 'web' && <Globe size={size === 'lg' ? 20 : 18} />}
      <span className="flex flex-col items-start leading-none">
        <span className="text-[10px] font-normal uppercase tracking-[0.08em] text-fg-2">{top}</span>
        <span className={cn('mt-0.5 font-semibold tracking-[-0.01em]', size === 'lg' ? 'text-[19px]' : 'text-[16px]')}>{main}</span>
      </span>
      {kind === 'web' && <ArrowUpRight size={15} className="ml-0.5 text-fg-2" />}
    </a>
  );
}
