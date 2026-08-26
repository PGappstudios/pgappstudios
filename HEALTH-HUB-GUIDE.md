# PG Health Hub: how to add an app or an article

Everything in `/health` is driven by two files. You do not need a developer to
add an app or publish a guide, and you never touch the page code.

| What you want to do | File to edit |
|---|---|
| Add or change an app | `src/data/healthData.ts` |
| Publish a guide | `src/data/healthArticles.ts` |
| Change the support notice or helpline link | bottom of `src/data/healthData.ts` |

**House style for this section: no dashes in anything a visitor reads.** Use
commas, colons or the word "to" instead. Write "12 to 16 hours", not "12-16".

After any edit, run `npm run build`, then commit and push. The hub card, the
detail page, the sitemap entry and the cross links all update by themselves.

---

## Add a new app

### Step 1: put the images in place

Drop these into `public/health/`:

- `your-slug-icon.png` (square, 512px is plenty)
- `your-slug-shot1.webp` … `your-slug-shot4.webp` (screenshots)

Quick way to get them straight from your own App Store listing, replacing the
id with your app's id:

```bash
curl -s "https://itunes.apple.com/lookup?id=6796052485&country=pt" | python3 -m json.tool | grep -E "artworkUrl512|screenshotUrls" -A6
```

Download the icon, convert it to PNG and compress it:

```bash
cd public/health
curl -s -o your-slug-icon.jpg "PASTE_artworkUrl512_HERE"
sips -s format png your-slug-icon.jpg --out your-slug-icon.png && rm your-slug-icon.jpg
pngquant --quality=70-90 --force --ext .png your-slug-icon.png
```

For screenshots, take a `screenshotUrls` link and swap the ending
`320x480bb.jpg` for `600x0w.webp`, then save it as `your-slug-shot1.webp`.

### Step 2: add the entry

Open `src/data/healthData.ts` and add one object to `healthApps`. Here is a
complete filled in example you can copy:

```ts
{
  slug: 'aftermath',
  name: 'Aftermath: Healing Companion',
  icon: '/health/aftermath-icon.png',
  tagline: 'One small step a day, through the hard part',   // 60 characters max
  problemHeadline: 'Get through the first weeks after a loss',
  problemSupport: 'A breakup, a death, a job that ended, a friendship that fell apart.',
  problemStatement:
    'Right now something hurts and the days feel very long. Aftermath asks for one minute: ' +
    'you check in with how your heart feels, read something short, and take one small step.',
  screenshots: shots('aftermath', [
    'Aftermath candle screen for remembering someone you lost',
    'Aftermath home screen with the daily check in',
    'Aftermath journey screen showing progress through the program',
    'Aftermath no contact tracker screen',
  ]),
  features: [
    { title: 'A program shaped to your loss', text: 'The program, the words and the colours all adapt.' },
    { title: 'One minute a day', text: 'A check in, a short reading, one small step.' },
  ],
  appStoreUrl: 'https://apps.apple.com/pt/app/aftermath-healing-companion/id6796052485?l=en-GB',
  // playStoreUrl: 'https://play.google.com/...',   // optional, the badge hides itself when missing
  relatedApps: ['fasting-and-walking', 'cyclebuddy'],
  relatedArticles: ['first-weeks-after-a-breakup'],
  metaDescription: 'Aftermath is a gentle daily companion for a breakup, grief or job loss. Free on iOS.',
},
```

Notes on the fields that matter most:

- `slug` becomes the URL: `/health/apps/aftermath`. Lowercase, no spaces.
- `problemHeadline` is what people read on the hub. Write the problem, not the
  feature. "Get through the first weeks after a loss" beats "Healing tools".
- `problemStatement` should sound like you are talking to one person who is
  having a bad week.
- The `shots()` helper takes your slug and the alt text for each screenshot, in
  order. Alt text is not optional: it is what a screen reader announces.
- `relatedApps` and `relatedArticles` are just slugs. They build the cross
  promotion blocks automatically.

### Step 3: register the URL in two places

1. `scripts/prerender.mjs`, add the slug to `HEALTH_APP_SLUGS`.
2. `public/sitemap.xml`, copy one of the `/health/apps/...` lines and change
   the slug and the `lastmod` date.

### Step 4: build and push

```bash
npm run build
```

You should see your route in the prerender list. Then commit and push.

---

## Publish a new article

Open `src/data/healthArticles.ts` and add one object to `healthArticles`:

```ts
{
  slug: 'first-weeks-after-a-breakup',
  title: 'What To Do In The First Weeks After A Breakup',
  metaDescription: 'What the first weeks actually feel like, and the small things that help.',
  excerpt: 'A plain description of the shape of the first weeks, and what tends to help.',
  publishedDate: '2026-08-12',
  updatedDate: '2026-08-12',
  readingMinutes: 7,
  primaryApp: 'aftermath',              // the app the CTA points at
  relatedApps: ['fasting-and-walking'],
  body: `
Opening paragraph. No H1 here, the page prints the title for you.

## First section heading

Normal paragraphs, **bold**, lists:

- point one
- point two

> A short quote or an idea worth pausing on.

| Column | Column |
|:---|:---|
| a | b |

## Second section heading

More writing.
`,
},
```

Rules that keep the page working:

- **Never put a backtick inside `body`.** The text lives inside backticks, so
  one stray backtick breaks the build.
- **Do not add app links or download buttons in the body.** The page inserts
  one app block a third of the way down and one at the end, automatically. That
  is deliberate: more than two starts to feel like an advert.
- Use `##` for main sections. The table of contents on the right builds itself
  from them.
- Health writing rule: say plainly that it is not medical care and point people
  to a professional. Both existing articles do this in the opening.

Then add the slug to `HEALTH_GUIDE_SLUGS` in `scripts/prerender.mjs` and add a
line to `public/sitemap.xml`, same as for apps.

---

## Changing the support notice or the helpline

Bottom of `src/data/healthData.ts`:

```ts
export const SUPPORT_NOTICE = 'These apps are support tools, not medical care. ...';
export const SUPPORT_LINK = { href: 'https://findahelpline.com/', label: 'Find a helpline in your country' };
```

It appears on every page in the section, so one edit covers all of them.
`findahelpline.com` is a placeholder that covers most countries. Swap it for a
Portuguese service such as SNS 24 if you prefer a local one.

---

## Checking what you did

```bash
npm run build          # builds and prerenders every route
npx vite preview       # opens a local server, visit /health
```

If your new page shows up in the prerender list at the end of the build, it is
live and indexable. After deploying, submit the sitemap once in Google Search
Console so the new URLs get picked up faster.

---

## Tracking

Every App Store button in this section fires a GA4 event called
`store_outbound_click` with three parameters:

- `app_name`, for example "Aftermath: Healing Companion"
- `store`, either `app_store` or `play_store`
- `source_page`, for example `/health/guides/first-weeks-after-a-breakup`

In GA4, go to Reports, Engagement, Events, and open `store_outbound_click` to
see which article is actually sending people to which app. Give it 24 hours
after launch before you judge anything.
