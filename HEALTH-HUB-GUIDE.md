# PG Health Hub: how to add an app or an article

Everything in `/health` is driven by data files. You do not need a developer to
add an app or publish a guide, and you never touch the page code.

| What you want to do | File to edit |
|---|---|
| Add or change an app | `src/data/healthData.ts` |
| Publish a guide | a new `.md` file in `src/content/health/` |
| Change the support notice or helpline link | bottom of `src/data/healthData.ts` |

**House style for this section: no dashes in anything a visitor reads.** Use
commas, colons or the word "to" instead. Write "12 to 16 hours", not "12-16".

After any edit, run `npm run build`, then commit and push. The hub card, the
detail page, the sitemap entry and the cross links all update by themselves.

---

## Add a new app

### Step 1: make sure the app has a main app page

The hub reuses the icon and the four screenshots from the app's main page
(`public/icons/<slug>.webp` and `public/screens/<slug>/1..4.webp`), so the two
sections can never drift apart. If the app is already on pgappstudios.com
there is nothing to do; otherwise add it there first (see `README.md`).

Then add the health slug to the `PRODUCT` map at the top of
`src/data/healthData.ts`, pointing at the main page slug and a short label:

```ts
aftermath: { slug: 'aftermath-healing-companion', label: 'Aftermath' },
```

When you refresh an app's screenshots, replace the files in
`public/screens/<slug>/` and both the app page and the hub update.

### Step 2: add the entry

Open `src/data/healthData.ts` and add one object to `healthApps`. Here is a
complete filled in example you can copy:

```ts
{
  slug: 'aftermath',
  name: 'Aftermath: Healing Companion',
  icon: icon('aftermath'),
  tagline: 'One small step a day, through the hard part',   // 60 characters max
  problemHeadline: 'Get through the first weeks after a loss',
  problemSupport: 'A breakup, a death, a job that ended, a friendship that fell apart.',
  problemStatement:
    'Right now something hurts and the days feel very long. Aftermath asks for one minute: ' +
    'you check in with how your heart feels, read something short, and take one small step.',
  screenshots: shots('aftermath'),
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
- `shots()` and `icon()` take the health slug and pull the current files from
  the main app page, with alt text written for screen readers.
- `relatedApps` and `relatedArticles` are just slugs. They build the cross
  promotion blocks automatically.

### Step 3: build and push

The page, its route and its sitemap entry are created automatically from
`healthData.ts`. There is nothing else to register.

```bash
npm run build
```

You should see the static generation count include your route. Then commit and push.

---

## Publish a new article

Create a markdown file in `src/content/health/`, named after the slug, for
example `src/content/health/first-weeks-after-a-breakup.md`:

```md
---
slug: first-weeks-after-a-breakup
title: What To Do In The First Weeks After A Breakup
metaDescription: What the first weeks actually feel like, and the small things that help.
excerpt: A plain description of the shape of the first weeks, and what tends to help.
publishedDate: '2026-08-12'
updatedDate: '2026-08-12'
readingMinutes: 7
primaryApp: aftermath
relatedApps:
  - fasting-and-walking
---
Opening paragraph. No H1 here, the page prints the title for you.

## First section heading

Normal paragraphs, **bold**, lists:

- point one
- point two

> A short quote or an idea worth pausing on.

## Second section heading

More writing.
```

Rules that keep the page working:

- **Do not add app links or download buttons in the body.** The page inserts
  one app block before the third `##` section and one at the end,
  automatically. More than two starts to feel like an advert.
- Use `##` for main sections. The table of contents on the right builds itself
  from them.
- Health writing rule: say plainly that it is not medical care and point people
  to a professional. Both existing articles do this in the opening.

The page, its route and its sitemap entry appear automatically on the next build.

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

The build prints how many pages it wrote and fails loudly if any page is
broken. `dist/sitemap.xml` is generated from the same data, so it is always
complete. After deploying, submit the sitemap once in Google Search
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
