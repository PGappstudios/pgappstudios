/**
 * PG Health Hub data (/health)
 *
 * This is the only file you need to edit to add or change an app in the
 * health hub. Add an object to `healthApps` and the hub card, the detail
 * page at /health/apps/{slug}, the sitemap entry and the cross links all
 * appear automatically.
 *
 * See HEALTH-HUB-GUIDE.md in the repo root for a filled in example.
 *
 * House style for this section: no dashes in any copy that a visitor reads.
 */

export interface HealthFeature {
  title: string;
  text: string;
}

export interface HealthScreenshot {
  src: string;
  alt: string;
}

export interface HealthApp {
  /** URL segment: /health/apps/{slug} */
  slug: string;
  /** Exact App Store name */
  name: string;
  /** Square icon in /public/health/ */
  icon: string;
  /** Max 60 characters */
  tagline: string;
  /** Headline for the problem first grid on the hub home */
  problemHeadline: string;
  /** One supporting line under the problem headline */
  problemSupport: string;
  /** 2 to 3 sentences written to the reader's pain, not a feature list */
  problemStatement: string;
  screenshots: HealthScreenshot[];
  features: HealthFeature[];
  appStoreUrl: string;
  playStoreUrl?: string;
  /** Slugs of other health apps to cross promote */
  relatedApps: string[];
  /** Slugs from healthArticles.ts */
  relatedArticles: string[];
  metaDescription: string;
}

export interface HealthArticle {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  publishedDate: string;
  updatedDate: string;
  readingMinutes: number;
  /** Health app slug this article should send readers to */
  primaryApp: string;
  relatedApps: string[];
  /** Markdown body. No H1: the page renders the title. */
  body: string;
}

const shots = (slug: string, alts: string[]): HealthScreenshot[] =>
  alts.map((alt, i) => ({ src: `/health/${slug}-shot${i + 1}.webp`, alt }));

export const healthApps: HealthApp[] = [
  {
    slug: 'aftermath',
    name: 'Aftermath: Healing Companion',
    icon: '/health/aftermath-icon.png',
    tagline: 'One small step a day, through the hard part',
    problemHeadline: 'Get through the first weeks after a loss',
    problemSupport: 'A breakup, a death, a job that ended, a friendship that fell apart.',
    problemStatement:
      'Right now something hurts and the days feel very long. Aftermath asks for one minute: you check in with how your heart feels, read something short written for exactly where you are, and take one small step you can actually manage. The whole app adapts to your situation, so the words meet you where you are instead of somewhere you are not yet.',
    screenshots: shots('aftermath', [
      'Aftermath candle screen for remembering someone you lost',
      'Aftermath home screen with the daily check in',
      'Aftermath journey screen showing progress through the program',
      'Aftermath no contact tracker screen',
    ]),
    features: [
      { title: 'A program shaped to your loss', text: 'Breakup or divorce, grief, job loss, rejection, or a friendship that ended. The program, the words and the colours all adapt.' },
      { title: 'One minute a day', text: 'Check in with how your heart feels, read a short passage for that exact feeling, then take one small step.' },
      { title: 'Something that grows while you heal', text: 'Your daily check ins grow a small plant. Miss a day and it droops, but it never dies, because healing is not linear.' },
      { title: 'A button for the 2 AM moments', text: 'When the hard hour arrives without warning, there is one tap that meets you there.' },
      { title: 'Programs from 30 to 90 days', text: 'Long enough to carry you through the worst of it, short enough to feel possible today.' },
    ],
    appStoreUrl: 'https://apps.apple.com/app/id6796052485',
    relatedApps: ['fasting-and-walking', 'cyclebuddy'],
    relatedArticles: ['first-weeks-after-a-breakup'],
    metaDescription:
      'Aftermath is a gentle daily companion for a breakup, grief, job loss or rejection. One check in, one short reading, one small step a day. Free on iOS.',
  },
  {
    slug: 'fasting-and-walking',
    name: 'Fasting and Walking',
    icon: '/health/fasting-and-walking-icon.png',
    tagline: 'Fasting and daily steps in one place',
    problemHeadline: 'Move every day, even on the bad ones',
    problemSupport: 'Two habits that hold each other up, tracked together.',
    problemStatement:
      'Most people try to change everything at once and last about a week. Fasting and Walking keeps it to two habits that support each other: a clear eating window and a step goal you can actually hit today. Clean screens, no shouting, no plan you have to recover from.',
    screenshots: shots('fasting-and-walking', [
      'Fasting and Walking main screen showing the fasting timer and daily steps',
      'Fasting and Walking progress screen',
      'Fasting and Walking goal date screen',
      'Fasting and Walking step tracking screen',
    ]),
    features: [
      { title: 'A clear fasting timer', text: 'Start your window and see exactly where you are, without doing arithmetic in your head.' },
      { title: 'Daily step tracking', text: 'Your movement adds up in one view, so a slow day is still a day that counted.' },
      { title: 'Progress and a goal date', text: 'See the trend rather than a single number, and a realistic date to aim at.' },
      { title: 'Hydration alongside it', text: 'Water sits next to fasting and steps, because it is the part people forget first.' },
    ],
    appStoreUrl: 'https://apps.apple.com/app/id6755205850',
    relatedApps: ['aquafasty', 'cyclebuddy'],
    relatedArticles: ['start-walking-and-fasting-without-overdoing-it'],
    metaDescription:
      'Fasting and Walking tracks your eating window and your daily steps in one simple app, so two habits support each other. Free on iOS.',
  },
  {
    slug: 'aquafasty',
    name: 'Aquafasty: Diet & Fasting',
    icon: '/health/aquafasty-icon.png',
    tagline: 'Get past day nine of any diet plan',
    problemHeadline: 'Drink more water and eat better',
    problemSupport: 'Seven plans, five small missions every morning.',
    problemStatement:
      'Diets do not really fail. People stop doing them, usually around day nine. Aquafasty is built for that day: you pick a plan, you get five small missions each morning, and you keep a streak that is worth protecting. Small enough to do when motivation has already left the building.',
    screenshots: shots('aquafasty', [
      'Aquafasty home screen with the daily plan',
      'Aquafasty progress screen',
      'Aquafasty streaks screen',
      'Aquafasty diet plans screen',
    ]),
    features: [
      { title: 'Seven plans to choose from', text: 'Pick the eating approach that fits your life rather than one the app picked for you.' },
      { title: 'Five small missions a day', text: 'Every morning gives you a short list you can finish, not a lecture you have to survive.' },
      { title: 'Hydration front and centre', text: 'Water is tracked as a habit in its own right, because it makes everything else easier.' },
      { title: 'Streaks built to survive a bad day', text: 'Progress you can see, designed so one slip does not end the whole thing.' },
    ],
    appStoreUrl: 'https://apps.apple.com/app/id6746637395',
    relatedApps: ['fasting-and-walking', 'gritvit'],
    relatedArticles: ['start-walking-and-fasting-without-overdoing-it'],
    metaDescription:
      'Aquafasty gives you seven diet plans, five small daily missions and hydration tracking, built to get you past the day most plans die. Free on iOS.',
  },
  {
    slug: 'gritvit',
    name: 'Gritvit: Fitness Community',
    icon: '/health/gritvit-icon.png',
    tagline: 'A fitness community where training is verified',
    problemHeadline: 'Train with people who actually show up',
    problemSupport: 'Every athlete proves they train with real health data.',
    problemStatement:
      'Anyone can say they train. Gritvit asks for proof. Every athlete in the community verifies their training with real health data from their own device, so the people you meet are the people genuinely doing the work, not the ones with the best photos.',
    screenshots: shots('gritvit', [
      'Gritvit community screen',
      'Gritvit athlete profile with verified training data',
      'Gritvit leaderboard screen',
      'Gritvit home screen',
    ]),
    features: [
      { title: 'Training you can verify', text: 'Real health data from your device backs up what every profile claims.' },
      { title: 'A community of people who train', text: 'Meet people whose week actually looks like yours.' },
      { title: 'Leaderboards worth entering', text: 'Compete on numbers that were earned rather than typed in.' },
      { title: 'Your raw data stays yours', text: 'Only the summary is shared. The detail stays on your device.' },
    ],
    appStoreUrl: 'https://apps.apple.com/app/id6761624974',
    relatedApps: ['cyclebuddy', 'fasting-and-walking'],
    relatedArticles: [],
    metaDescription:
      'Gritvit is a fitness community where every athlete verifies their training with real health data. Meet people who actually show up. Free on iOS.',
  },
  {
    slug: 'cyclebuddy',
    name: 'Cyclebuddy',
    icon: '/health/cyclebuddy-icon.png',
    tagline: 'Find riders, plan routes, never ride alone',
    problemHeadline: 'Ride with people instead of alone',
    problemSupport: 'Riders near you, at your pace, on your kind of route.',
    problemStatement:
      'Most cyclists ride solo, and usually not by choice. Finding someone at the right time, pace and route is genuinely hard. Cyclebuddy puts the local riding community in one place so you can find riders, plan routes and actually get out with people.',
    screenshots: shots('cyclebuddy', [
      'Cyclebuddy screen showing riders nearby',
      'Cyclebuddy route planning screen',
      'Cyclebuddy group ride screen',
      'Cyclebuddy chat screen',
    ]),
    features: [
      { title: 'Find riders near you', text: 'See who rides where you ride, and at a pace that matches yours.' },
      { title: 'Join group rides', text: 'Plans you can join instead of another solo weekend.' },
      { title: 'Plan your routes', text: 'Work out where you are going before you clip in.' },
      { title: 'Keep the crew together', text: 'Chat that holds the meet time, the route and the last minute changes.' },
    ],
    appStoreUrl: 'https://apps.apple.com/app/id6762289803',
    relatedApps: ['gritvit', 'fasting-and-walking'],
    relatedArticles: [],
    metaDescription:
      'Cyclebuddy helps you find riders near you, plan routes and join group rides, so you never have to ride alone. Free on iOS.',
  },

  // ---------------------------------------------------------------------
  // WAITING ON A LIVE APP STORE LINK
  // The brief lists a gambling and addiction app ("Stop gambling and watch
  // the money add up"). Nothing matching it is live on the App Store yet, so
  // it is not shown. When it ships, copy the block below, fill it in, drop
  // the icon and screenshots into /public/health/ and it appears everywhere.
  //
  // {
  //   slug: 'unbroken',
  //   name: '',
  //   icon: '/health/unbroken-icon.png',
  //   tagline: '',
  //   problemHeadline: 'Stop gambling and watch the money add up',
  //   problemSupport: '',
  //   problemStatement: '',
  //   screenshots: shots('unbroken', ['', '', '', '']),
  //   features: [{ title: '', text: '' }],
  //   appStoreUrl: '',
  //   relatedApps: ['aftermath'],
  //   relatedArticles: [],
  //   metaDescription: '',
  // },
  // ---------------------------------------------------------------------
];

export const getHealthApp = (slug?: string): HealthApp | undefined =>
  healthApps.find((a) => a.slug === slug);

/** Support notice shown on every page in this section. */
export const SUPPORT_NOTICE =
  'These apps are support tools, not medical care. If you are struggling, please speak to a doctor or a qualified professional.';

/**
 * Helpline directory linked from the support notice.
 * Pedro: swap this for your preferred national or regional directory.
 * findahelpline.com covers most countries and is kept up to date.
 */
export const SUPPORT_LINK = {
  href: 'https://findahelpline.com/',
  label: 'Find a helpline in your country',
};
