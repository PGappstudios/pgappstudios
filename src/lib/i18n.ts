/**
 * The site is English, with German pages for the apps that work in German
 * (see src/data/appData.de.ts). Language comes from the URL: /de/... is German.
 */
import type { GroupId } from '@/data/catalog';

export type Lang = 'en' | 'de';

export const langOf = (pathname: string): Lang => (pathname === '/de' || pathname.startsWith('/de/') ? 'de' : 'en');

export const UI = {
  en: {
    home: 'Home',
    apps: 'Apps',
    freeToDownload: 'Free to download',
    freeInBrowser: 'Free in your browser',
    note: 'Note',
    lookInside: 'A look inside',
    aboutTheApp: 'About the app',
    why: (n: string) => `Why *${n}*`,
    whatYouGet: 'What you get',
    everythingInside: (n: string) => `Everything inside *${n}.*`,
    faqTitle: 'Questions, *answered.*',
    ctaStore: (n: string) => `Get ${n} on your iPhone`,
    ctaWeb: (n: string) => `Try ${n} now`,
    open: (n: string) => `Open ${n}`,
    get: 'Get',
    youMightLike: 'You might also like',
    seeShelf: 'See the shelf',
    fromRatings: (c: number, s: string) => `from ${c} ratings · ${s}`,
    iphone: 'iPhone',
    iphoneAndroid: 'iPhone & Android',
    web: 'Web',
    screenshot: (n: string, i: number) => `${n} screenshot ${i}`,
    store: { appStore: ['Download on the', 'App Store'], play: ['Get it on', 'Google Play'], web: ['Visit the', 'website'] },
  },
  de: {
    home: 'Start',
    apps: 'Apps',
    freeToDownload: 'Kostenlos laden',
    freeInBrowser: 'Kostenlos im Browser',
    note: 'Hinweis',
    lookInside: 'Ein Blick hinein',
    aboutTheApp: 'Über die App',
    why: (n: string) => `Warum *${n}*`,
    whatYouGet: 'Was drin ist',
    everythingInside: (n: string) => `Alles in *${n}.*`,
    faqTitle: 'Fragen und *Antworten.*',
    ctaStore: (n: string) => `${n} für dein iPhone`,
    ctaWeb: (n: string) => `${n} jetzt ausprobieren`,
    open: (n: string) => `${n} öffnen`,
    get: 'Laden',
    youMightLike: 'Das könnte dir auch gefallen',
    seeShelf: 'Alle Apps auf Deutsch',
    fromRatings: (c: number, s: string) => `aus ${c} Bewertungen · ${s}`,
    iphone: 'iPhone',
    iphoneAndroid: 'iPhone & Android',
    web: 'Web',
    screenshot: (n: string, i: number) => `${n} Screenshot ${i}`,
    store: { appStore: ['Laden im', 'App Store'], play: ['Jetzt bei', 'Google Play'], web: ['Zur', 'Website'] },
  },
} as const;

export const GROUP_LABEL_DE: Record<GroupId, string> = {
  language: 'Sprachen lernen',
  health: 'Gesundheit',
  family: 'Familie & Kinder',
  sport: 'Sport & Natur',
  games: 'Spiele & Quiz',
  tools: 'Werkzeuge',
};
