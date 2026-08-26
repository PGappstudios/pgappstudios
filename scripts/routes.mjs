/**
 * Every URL the site publishes. Single source of truth for static generation.
 * Keep in sync with public/sitemap.xml when you add a page.
 */
const BASE = [
  '/',
  '/our-apps',
  '/blog',
  '/contact',
  '/apps/aftermath-healing-companion',
  '/apps/portugal-lifestyle-pro',
  '/apps/portugal-lifestyle-learn-it',
  '/apps/dinkup',
  '/apps/gritvit',
  '/apps/cyclebuddy',
  '/apps/fasting-and-walking',
  '/apps/aquafasty-diet-plan',
  '/apps/voice-to-caption',
  '/apps/docyscan',
  '/apps/megaconverter',
  '/apps/soccer-legends',
  '/apps/basketball-legends',
  '/apps/bible-test-your-faith',
  '/apps/baby-learning-games',
  '/apps/european-portuguese-quest',
  '/apps/expats-in-portugal',
];

const BLOG_SLUGS = [
  // original posts
  'dinkup-pickleball-app',
  'gritvit-fitness-dating-app',
  'portugal-lifestyle-learn-european-portuguese',
  'fasting-and-walking-app-ios',
  'voice-to-caption-ai-writer-ios',
  'soccer-legends-quiz-ios',
  'basketball-legends-quiz-ios',
  'bible-test-your-faith-ios',
  'baby-learning-games-ios',
  'aquafasty-diet-plan-ios',
  // added July 2026
  'learn-european-portuguese-beginners-guide',
  'european-vs-brazilian-portuguese-differences',
  'does-duolingo-teach-european-portuguese',
  'essential-european-portuguese-phrases-travellers',
  'european-portuguese-pronunciation-guide',
  'a2-portuguese-citizenship-test-guide',
  'european-portuguese-slang-guide',
  'moving-to-portugal-from-us-2026',
  'portugal-d7-vs-d8-visa-guide',
  'how-to-get-nif-portugal',
  'aima-appointment-guide-portugal',
  'cost-of-living-portugal-2026',
  'best-places-to-live-portugal-expats',
  'how-to-find-pickleball-players-near-you',
  'pickleball-for-beginners-guide',
  'pickleball-etiquette-rules',
  'how-to-organize-pickleball-game',
  'why-fitness-dating-apps-growing',
  'meet-gym-partner-shared-goals',
  'intermittent-fasting-for-beginners',
  'how-much-water-to-drink-weight-loss',
  'walking-for-weight-loss-steps-per-day',
  'combining-fasting-and-walking',
  'find-group-ride-new-cyclist',
  'road-gravel-mtb-cycling-guide',
  'write-better-social-media-captions-ai',
  'best-way-to-scan-documents-iphone',
  'football-trivia-questions-quiz',
  'daily-bible-study-habit-guide',
  'best-educational-games-toddlers-1-4',
];

const HEALTH_APP_SLUGS = ['aftermath', 'fasting-and-walking', 'aquafasty', 'gritvit', 'cyclebuddy'];

const HEALTH_GUIDE_SLUGS = [
  'first-weeks-after-a-breakup',
  'start-walking-and-fasting-without-overdoing-it',
];

export const ROUTES = [
  ...BASE,
  ...BLOG_SLUGS.map((s) => `/blog/${s}`),
  '/health',
  '/health/guides',
  '/health/about',
  ...HEALTH_APP_SLUGS.map((s) => `/health/apps/${s}`),
  ...HEALTH_GUIDE_SLUGS.map((s) => `/health/guides/${s}`),
];
