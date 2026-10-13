import { Link } from 'react-router-dom';
import { GROUPS, appsInGroup, shortName, websites, DEVELOPER_URL } from '@/data/catalog';
import { Logo } from './SiteHeader';
import { useLocation } from 'react-router-dom';
import { langOf, GROUP_LABEL_DE } from '@/lib/i18n';
import { Apple, FacebookLogo, InstagramLogo, LinkedInLogo, Mail, ThreadsLogo, TikTokLogo, XLogo } from '@/components/kit/Icons';

export const SOCIALS = [
  { href: 'https://www.instagram.com/pg_app_studios', label: 'Instagram', Icon: InstagramLogo },
  { href: 'https://www.tiktok.com/@pg_app_studios', label: 'TikTok', Icon: TikTokLogo },
  { href: 'https://x.com/PG_App_Studios', label: 'X', Icon: XLogo },
  { href: 'https://www.threads.net/@pg_app_studios?xmt=AQGzhur3DF_F0Ou3H8ixj_3tqq1TUXntqjqFYoAzTtafwug', label: 'Threads', Icon: ThreadsLogo },
  { href: 'https://www.facebook.com/profile.php?id=61572233339159', label: 'Facebook', Icon: FacebookLogo },
  { href: 'https://www.linkedin.com/in/pg-studios-5b0434353/', label: 'LinkedIn', Icon: LinkedInLogo },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  const de = langOf(useLocation().pathname) === 'de';
  return (
    <footer className="relative mt-24 border-t border-white/[0.07] bg-ink-950">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      <div className="container py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo to={de ? '/de' : '/'} />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-fg-2">
              {de
                ? 'Ein unabhängiges App-Studio an der Algarve, Portugal. Wir entwickeln iPhone-Apps für den Alltag, vom Portugiesischlernen bis zum Angelausflug morgen früh.'
                : "An independent app studio in the Algarve, Portugal. We design and build iPhone apps for everyday life, from learning European Portuguese to planning tomorrow's fishing trip."}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={DEVELOPER_URL} target="_blank" rel="noopener" className="btn-ghost min-h-[40px] px-4 text-sm">
                <Apple size={16} /> {de ? 'Alle Apps im App Store' : 'All apps on the App Store'}
              </a>
              <a href="mailto:pgmetastudios@gmail.com" className="btn-ghost min-h-[40px] px-4 text-sm">
                <Mail size={16} /> pgmetastudios@gmail.com
              </a>
            </div>
            <div className="mt-6 flex gap-1">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={`PG App Studios on ${label}`}
                  className="grid h-10 w-10 place-items-center rounded-full text-fg-2 transition-colors hover:bg-white/[0.06] hover:text-fg"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {GROUPS.map((g) => (
              <div key={g.id}>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">{de ? GROUP_LABEL_DE[g.id] : g.label}</p>
                <ul className="mt-4 space-y-2.5">
                  {appsInGroup(g.id).map((a) => (
                    <li key={a.slug}>
                      <Link to={`/apps/${a.slug}`} className="text-[14px] text-fg-2 transition-colors hover:text-fg">
                        {shortName(a)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="hairline my-12" />

        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">Studio</p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li><Link to="/our-apps" className="text-fg-2 hover:text-fg">All apps</Link></li>
              <li><Link to="/health" className="text-fg-2 hover:text-fg">PG Health</Link></li>
              <li><Link to="/blog" className="text-fg-2 hover:text-fg">Blog</Link></li>
              <li><Link to="/moving-to-portugal" className="text-fg-2 hover:text-fg">Moving to Portugal</Link></li>
              <li><Link to="/de" className="text-fg-2 hover:text-fg" hrefLang="de" lang="de">Apps auf Deutsch</Link></li>
              <li><Link to="/about" className="text-fg-2 hover:text-fg">About</Link></li>
              <li><Link to="/contact" className="text-fg-2 hover:text-fg">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">{de ? 'Unsere Websites' : 'Our websites'}</p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {websites.map((w) => (
                <li key={w.url}>
                  <a href={w.url} target="_blank" rel="noopener" className="text-fg-2 hover:text-fg">
                    {w.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  </a>
                </li>
              ))}
              <li><a href="https://www.nukeglobe.com/" target="_blank" rel="noopener" className="text-fg-2 hover:text-fg">nukeglobe.com</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">{de ? 'Gemacht an der Algarve' : 'Made in the Algarve'}</p>
            <p className="mt-4 text-[14px] leading-relaxed text-fg-2">
              {de
                ? 'Unsere Gesundheits-Apps sind informative und unterstützende Werkzeuge, keine medizinische Beratung.'
                : 'Health and wellbeing apps are educational and supportive tools, not medical advice.'}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 text-[13px] text-fg-3 sm:flex-row">
          <p>© {year} PG App Studios · Pedro Gregório</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em]">{de ? 'Gebaut fürs iPhone, gestaltet in Portugal' : 'Built for iPhone, designed in Portugal'}</p>
        </div>
      </div>
    </footer>
  );
}
