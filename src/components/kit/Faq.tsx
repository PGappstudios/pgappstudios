/** FAQ list using native <details>, readable by crawlers and usable without JS. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {items.map((f, i) => (
        <details key={f.q} data-reveal style={{ ['--d' as string]: i }}>
          <summary>
            <span>{f.q}</span>
            <span className="plus" aria-hidden />
          </summary>
          <p className="faq-a pb-6 pr-10 leading-relaxed text-fg-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export const faqLd = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
