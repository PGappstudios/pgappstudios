import { cn } from '@/lib/utils';

/** The studio mark: Pedro's light-drawn portrait, cropped to the face. */
export function BrandMark({ size, className, alt = '' }: { size: number; className?: string; alt?: string }) {
  return (
    <img
      src="/brand/mark.webp"
      alt={alt}
      width={size}
      height={size}
      decoding="async"
      className={cn('shrink-0 rounded-[30%] object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_6px_20px_-6px_rgba(165,180,252,0.7)]', className)}
      style={{ width: size, height: size }}
    />
  );
}
