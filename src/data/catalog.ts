/**
 * Everything the new design needs to know about an app, on top of the copy in
 * appData.ts: which shelf it sits on, its icon, its real App Store
 * screenshots and its accent colour.
 *
 * Adding an app: give it a slug in appData.ts, add it to GROUP_OF below, drop
 * its icon at public/icons/<slug>.webp and screenshots at
 * public/screens/<slug>/1..4.webp (+ -sm.webp). That's it.
 */
import { allApps, type App } from './appData';
import colors from './appColors.json';

export const SITE = 'https://www.pgappstudios.com';
export const DEVELOPER_URL = 'https://apps.apple.com/developer/pedro-gregorio/id1779930740';

export type GroupId = 'language' | 'health' | 'family' | 'sport' | 'games' | 'tools';

export interface Group {
  id: GroupId;
  label: string;
  short: string;
  blurb: string;
  accent: string;
}

export const GROUPS: Group[] = [
  { id: 'language', label: 'Learn a language', short: 'Languages', blurb: 'European Portuguese and Castilian Spanish, taught with the culture behind them.', accent: '#34D399' },
  { id: 'health', label: 'Health & wellbeing', short: 'Wellbeing', blurb: 'Gentle daily companions for hard weeks, healthy habits and recovery.', accent: '#F0ABFC' },
  { id: 'family', label: 'Family & kids', short: 'Family', blurb: 'From the first scan to the first science experiment.', accent: '#7DD3FC' },
  { id: 'sport', label: 'Sport & outdoors', short: 'Outdoors', blurb: 'Pickleball, cycling, fishing and training, with real people and real places.', accent: '#FDBA74' },
  { id: 'games', label: 'Games & quizzes', short: 'Games', blurb: 'Space shooters, sports trivia and a daily verse. No ads where it matters.', accent: '#A78BFA' },
  { id: 'tools', label: 'Everyday tools', short: 'Tools', blurb: 'Scan, convert and write faster. Small apps that do one job well.', accent: '#93C5FD' },
];

const GROUP_OF: Record<string, GroupId> = {
  'portugal-lifestyle-pro': 'language',
  'portugal-lifestyle-learn-it': 'language',
  'european-portuguese-quest': 'language',
  'expats-in-portugal': 'language',
  'learn-spanish-with-lola': 'language',
  'aftermath-healing-companion': 'health',
  'kintsugi-unbroken': 'health',
  'fasting-and-walking': 'health',
  'aquafasty-diet-plan': 'health',
  'baby-growth-tracker-pro': 'family',
  'baby-learning-games': 'family',
  'kids-science-explorer': 'family',
  dinkup: 'sport',
  cyclebuddy: 'sport',
  'tidehook-fishing-tides': 'sport',
  gritvit: 'sport',
  'star-seekers-shard-war': 'games',
  'star-seekers-2': 'games',
  'soccer-legends': 'games',
  'basketball-legends': 'games',
  'bible-test-your-faith': 'games',
  'nuke-globe': 'games',
  'voice-to-caption': 'tools',
  docyscan: 'tools',
  megaconverter: 'tools',
};

/** The order apps appear in grids: flagship, then the strongest, newest work. */
const SHOWCASE_ORDER = [
  'portugal-lifestyle-pro',
  'tidehook-fishing-tides',
  'star-seekers-shard-war',
  'baby-growth-tracker-pro',
  'aftermath-healing-companion',
  'learn-spanish-with-lola',
  'dinkup',
  'kids-science-explorer',
  'kintsugi-unbroken',
  'voice-to-caption',
  'star-seekers-2',
  'cyclebuddy',
  'european-portuguese-quest',
  'expats-in-portugal',
  'portugal-lifestyle-learn-it',
  'fasting-and-walking',
  'aquafasty-diet-plan',
  'gritvit',
  'baby-learning-games',
  'bible-test-your-faith',
  'docyscan',
  'megaconverter',
  'soccer-legends',
  'basketball-legends',
  'nuke-globe',
];

export const FLAGSHIP_SLUG = 'portugal-lifestyle-pro';

const rank = (slug?: string) => {
  const i = SHOWCASE_ORDER.indexOf(slug ?? '');
  return i === -1 ? 999 : i;
};

/** Apps and web products that have their own page, in showcase order. */
export const products: App[] = allApps.filter((a) => a.slug).sort((a, b) => rank(a.slug) - rank(b.slug));

/** Marketing websites (cards that link out, no page of their own). */
export const websites: App[] = allApps.filter((a) => !a.slug);

export const iosApps = products.filter((a) => a.url.includes('apps.apple.com'));

export const groupOf = (app: App): GroupId => GROUP_OF[app.slug ?? ''] ?? 'tools';
export const groupById = (id: GroupId) => GROUPS.find((g) => g.id === id)!;
export const appsInGroup = (id: GroupId) => products.filter((a) => groupOf(a) === id);

export const isStoreApp = (app: App) => app.url.includes('apps.apple.com');

export const iconFor = (app: App) =>
  app.slug ? `/icons/${app.slug}.webp` : app.image.startsWith('/') ? app.image : `/${app.image}`;

/** Real App Store screenshots. Web products and marketing sites have none. */
export const screensFor = (app: App, size: 'lg' | 'sm' = 'lg'): string[] => {
  if (!app.slug || !isStoreApp(app)) return [];
  return [1, 2, 3, 4].map((n) => `/screens/${app.slug}/${n}${size === 'sm' ? '-sm' : ''}.webp`);
};

export const accentFor = (app: App): string => (colors as Record<string, string>)[app.slug ?? ''] ?? '#C4B5FD';

/** "r g b" triplet for use inside rgb(var(--glow) / a) */
export const glowFor = (app: App): string => {
  const hex = accentFor(app).replace('#', '');
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(' ');
};

/** Square icon for a marketing website card: the icon of the app it belongs to. */
const WEBSITE_ICON: Record<string, string> = {
  'https://www.cycle-buddy.app/': '/icons/cyclebuddy.webp',
  'https://www.dinkup.app/': '/icons/dinkup.webp',
  'https://www.humanskillsguide.com/': '/icons/human-skills.webp',
  'https://www.mesadeportugal.com/': '/icons/mesa-de-portugal.webp',
  'https://www.portugal-lifestyle.com/': '/icons/portugal-lifestyle-learn-it.webp',
  'https://www.starseekersapp.com/': '/icons/star-seekers-shard-war.webp',
};
export const websiteIcon = (w: App) => WEBSITE_ICON[w.url] ?? (w.image.startsWith('/') ? w.image : `/${w.image}`);

export const storeId = (app: App) => app.url.match(/id(\d+)/)?.[1];

export const getProduct = (slug: string) => products.find((a) => a.slug === slug);

const SHORT: Record<string, string> = {
  'star-seekers-shard-war': 'Shard War',
  'star-seekers-2': 'Star Seekers 2',
  'portugal-lifestyle-learn-it': 'Portugal Lifestyle: Learn it',
  'baby-learning-games': 'Baby Learning Games',
  'bible-test-your-faith': 'Bible: Test Your Faith',
  'learn-spanish-with-lola': 'Lola',
};

/** Short display name: drops the store subtitle ("TideHook: Fishing Tides" -> "TideHook") */
export const shortName = (app: App) => SHORT[app.slug ?? ''] ?? app.title.split(/:\s| - /)[0].trim();

export const STATS = {
  appsOnStore: iosApps.length,
  groups: GROUPS.length,
};
