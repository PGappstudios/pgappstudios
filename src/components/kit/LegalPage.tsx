import type { ReactNode } from 'react';
import { useSEO } from '@/lib/useSEO';
import { SITE } from '@/data/catalog';
import { Breadcrumbs, breadcrumbLd } from '@/components/kit/Breadcrumbs';

/** Shared layout for the Privacy and Terms pages: plain, readable, no animation. */
export function LegalPage(props: {
  path: string;
  title: string;
  seoTitle: string;
  description: string;
  updated: string;
  children: ReactNode;
}) {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: props.title, href: props.path },
  ];
  useSEO({
    title: props.seoTitle,
    description: props.description,
    canonical: `${SITE}${props.path}`,
    jsonLd: [breadcrumbLd(crumbs)],
  });

  return (
    <>
      <section className="pb-10 pt-36 sm:pt-44">
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 text-display-md font-semibold">{props.title}</h1>
          <p className="mt-4 text-fg-3">Last updated {props.updated}</p>
        </div>
      </section>
      <section className="container pb-24">
        <div className="legal max-w-3xl space-y-5 text-lg leading-[1.8] text-fg-2 [&_h2]:pt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-fg [&_a]:text-fg [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {props.children}
        </div>
      </section>
    </>
  );
}
