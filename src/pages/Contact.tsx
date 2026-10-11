import { useSEO } from '@/lib/useSEO';
import { DEVELOPER_URL, SITE } from '@/data/catalog';
import { Words } from '@/components/kit/Words';
import { Breadcrumbs, breadcrumbLd } from '@/components/kit/Breadcrumbs';
import { Apple, ArrowUpRight, Mail } from '@/components/kit/Icons';
import { SOCIALS } from '@/components/layout/SiteFooter';

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
];

const Contact = () => {
  useSEO({
    title: 'Contact PG App Studios | Get in Touch with Pedro Gregório',
    description:
      'Questions, feedback, press or partnerships: email PG App Studios at pgmetastudios@gmail.com or find us on Instagram, TikTok, X, Threads and LinkedIn.',
    canonical: `${SITE}/contact`,
    jsonLd: [
      breadcrumbLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        url: `${SITE}/contact`,
        mainEntity: {
          '@type': 'Organization',
          name: 'PG App Studios',
          contactPoint: { '@type': 'ContactPoint', email: 'pgmetastudios@gmail.com', contactType: 'customer support', availableLanguage: ['English', 'Portuguese'] },
        },
      },
    ],
  });

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-36 sm:pt-44">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(167,139,250,0.16),transparent)]" />
        <div className="container">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 max-w-4xl text-display-lg font-semibold">
            <Words text="Say" now /> <Words text="*hello.*" now delay={120} />
          </h1>
          <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-fg-2 [animation-delay:250ms]">
            A question about one of our apps, a bug, an idea, press or a partnership. Email is the fastest way to reach us, and it
            goes straight to the person who built the app.
          </p>
        </div>
      </section>

      <section className="container grid gap-4 pb-24 lg:grid-cols-[1.3fr_1fr]">
        <a href="mailto:pgmetastudios@gmail.com" className="spot group flex flex-col justify-between gap-16 p-8 sm:p-10" data-reveal>
          <div className="flex items-center justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] text-fg">
              <Mail size={22} />
            </span>
            <ArrowUpRight size={22} className="text-fg-2 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">Email</p>
            <p className="mt-3 break-all text-2xl font-semibold tracking-[-0.02em] sm:text-4xl">pgmetastudios@gmail.com</p>
            <p className="mt-3 text-fg-2">Lisbon, Portugal</p>
          </div>
        </a>

        <div className="grid gap-4">
          <div className="surface p-6" data-reveal style={{ ['--d' as string]: 1 }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">Follow along</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-2 py-4 text-xs text-fg-2 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-fg"
                >
                  <Icon size={20} />
                  {label}
                </a>
              ))}
            </div>
          </div>
          <a href={DEVELOPER_URL} target="_blank" rel="noopener" className="spot group flex items-center gap-4 p-6" data-reveal style={{ ['--d' as string]: 2 }}>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-black text-fg ring-1 ring-white/15">
              <Apple size={22} />
            </span>
            <div className="flex-1">
              <p className="font-semibold">Leave a review</p>
              <p className="text-sm text-fg-2">Reviews on the App Store help other people find our apps.</p>
            </div>
            <ArrowUpRight size={18} className="text-fg-2" />
          </a>
        </div>
      </section>
    </>
  );
};

export default Contact;
