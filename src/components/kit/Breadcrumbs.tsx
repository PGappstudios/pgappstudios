import { Link } from 'react-router-dom';

export type Crumb = { name: string; href: string };

/** Visible breadcrumb trail. Pages emit the matching BreadcrumbList schema. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i < items.length - 1 ? (
              <Link to={c.href} className="transition-colors hover:text-fg">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-fg-2">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export const breadcrumbLd = (items: Crumb[], site = 'https://www.pgappstudios.com') => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: site + c.href })),
});
