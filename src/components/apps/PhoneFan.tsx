import { cn } from '@/lib/utils';

/** Three screenshots fanned out, the middle one forward. Used in app heroes. */
export function PhoneFan({ shots, alt, className, eager }: { shots: string[]; alt: string; className?: string; eager?: boolean }) {
  const [a, b, c] = shots;
  const img = (src: string, cls: string, i: number) => (
    <img
      src={src}
      alt={i === 1 ? alt : ''}
      aria-hidden={i === 1 ? undefined : true}
      width={600}
      height={1300}
      loading={eager ? 'eager' : 'lazy'}
      {...(eager && i === 1 ? { fetchpriority: 'high' } : {})}
      decoding="async"
      className={cn('shot absolute top-0 w-[46%] transition-transform duration-700 ease-out', cls)}
    />
  );
  return (
    <div className={cn('group relative mx-auto aspect-[10/11] w-full max-w-[560px]', className)}>
      {c && img(c, 'left-[52%] translate-x-[8%] translate-y-[10%] rotate-[8deg] opacity-80 group-hover:translate-x-[16%] group-hover:rotate-[11deg]', 2)}
      {a && img(a, 'left-[2%] -translate-x-[8%] translate-y-[10%] -rotate-[8deg] opacity-80 group-hover:-translate-x-[16%] group-hover:-rotate-[11deg]', 0)}
      {b && img(b, 'left-[27%] z-10 group-hover:-translate-y-[3%]', 1)}
    </div>
  );
}
