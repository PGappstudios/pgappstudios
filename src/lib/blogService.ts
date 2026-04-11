export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  category: string;
  featured: boolean;
  slug: string;
  metaDescription: string;
  metaKeywords: string;
  content: string;
}

// All blog posts embedded directly — no GitHub API dependency
const localPosts: BlogPost[] = [
  {
    id: "dinkup-pickleball-app",
    title: "DinkUp: The All-in-One Pickleball App for Courts, Games & Tournaments",
    excerpt: "DinkUp is the pickleball app that does everything — find courts, join games, run tournaments, and connect with your local pickleball community.",
    author: "PG App Studios",
    date: "2026-04-11",
    readTime: 7,
    tags: ["Pickleball", "Sports", "iOS", "Apps", "Community", "Tournaments"],
    category: "Apps",
    featured: true,
    slug: "dinkup-pickleball-app",
    metaDescription: "DinkUp is the best pickleball app for iOS. Find nearby courts, join open games, host tournaments with automatic brackets, track your ELO ranking, and connect with players in your city.",
    metaKeywords: "pickleball app, pickleball courts near me, pickleball tournaments, DinkUp app, find pickleball games, pickleball ranking, pickleball community, iOS pickleball app",
    content: `# DinkUp: The All-in-One Pickleball App for Courts, Games & Tournaments

Pickleball is the fastest-growing sport in the world — and finding games, courts, and players just got a whole lot easier. **DinkUp** is the iOS app built specifically for the pickleball community, putting courts, games, tournaments, and players all in one place.

## What Is DinkUp?

DinkUp is a free pickleball app for iOS that centralizes your entire pickleball experience. Forget scrolling through Facebook groups or texting your local club — DinkUp gives you real-time court data, one-tap game joining, and professional tournament management right from your phone.

**Download DinkUp free on the App Store:** [DinkUp on iOS](https://apps.apple.com/pt/app/dinkup/id6760656546?l=en-GB)

## Key Features

### Find Courts Near You
DinkUp's live map shows every pickleball, tennis, and padel court near you with real-time crowd levels and which players are currently on court.

### Join Open Games Instantly
Browse open games in your area with court details, skill levels, and player availability. Join any game with a single tap or create your own in seconds.

### Host & Play in Tournaments
- Single Elimination and Round Robin formats
- Automatic bracket generation with bye handling
- Live leaderboards tracking wins, losses, and points
- In-app notifications for all participants

### ELO Ranking & City Leaderboards
After every match, your rank updates automatically. DinkUp also integrates DUPR ratings for players who use the standard pickleball rating system.

### Connect with Your Community
- Direct messaging between players
- Community feed for sharing highlights
- Group creation for regular crews and clubs
- Browse player profiles by skill level
- "Dinks" reputation scoring system

## Free vs Pro

DinkUp is **free forever** for core features. The Pro tier unlocks unlimited game creation, global court access, and advanced statistics.

**Download DinkUp free:** [App Store](https://apps.apple.com/pt/app/dinkup/id6760656546?l=en-GB) | [Visit DinkUp.app](https://www.dinkup.app/)`
  },
  {
    id: "gritvit-fitness-dating-app",
    title: "GritVit: The Fitness Dating App That Matches Athletes by Workout Data",
    excerpt: "GritVit is a dating app for serious athletes that matches people based on verified fitness data — not just photos. Your workouts prove who you are.",
    author: "PG App Studios",
    date: "2026-04-10",
    readTime: 7,
    tags: ["Fitness", "Dating", "iOS", "Android", "Athletes", "Health", "Apps"],
    category: "Apps",
    featured: true,
    slug: "gritvit-fitness-dating-app",
    metaDescription: "GritVit is a fitness dating app that matches athletes using real workout data from Apple Health and Google Health Connect. No fake profiles — your fitness score speaks for itself.",
    metaKeywords: "fitness dating app, dating app for athletes, GritVit, workout dating app, Apple Health dating, fitness score dating, athlete dating app, active lifestyle dating",
    content: `# GritVit: The Fitness Dating App That Matches Athletes by Workout Data

What if your next match was based on how hard you train — not just how good your photos are? That's the idea behind **GritVit**, the fitness dating app that matches serious athletes using verified workout data.

GritVit reads your real workout history from **Apple Health** and **Google Health Connect** and calculates a **Fitness Score** that reflects how consistently and seriously you train.

## How GritVit Works

### Your Fitness Score (0–100)
Calculated from eight real training signals: resting heart rate (20%), workout frequency (18%), cardio volume (12%), recency (10%), daily steps (10%), active calories (8%), longest session (6%), and daily distance (6%).

### Trust Level System (L1–L5)
- L1–L4: Based on accumulated workout history
- L5 (Elite): Requires 30 consecutive days of wearable data with zero breaks

### Privacy First
Your raw workout data never leaves your device. Only aggregated scores are uploaded.

## Who Is GritVit For?
Runners who train 5x/week, CrossFit athletes, gym regulars, and daily trainers with wearables — anyone tired of matching with people who claim to be "active" but never actually train.

## Global Leaderboards
Compete across 10 categories: longest session, longest run, streaks, most active calories, and more.

## Free vs Premium
Fitness tracking is always free. Premium features unlock after completing a 7-day challenge: 50,000 steps, 40km, 200 active minutes.

**[Join the GritVit Whitelist →](https://www.gritvit.com/)**`
  },
  {
    id: "portugal-lifestyle-learn-european-portuguese",
    title: "Portugal Lifestyle: The Best App to Learn European Portuguese in 2026",
    excerpt: "Learn real European Portuguese with interactive lessons, cultural content, and 456+ CEFR-aligned lessons. The only app built for people moving to or living in Portugal.",
    author: "PG App Studios",
    date: "2026-04-09",
    readTime: 8,
    tags: ["Portuguese", "Language Learning", "Portugal", "iOS", "Android", "Expats", "Education"],
    category: "Apps",
    featured: true,
    slug: "portugal-lifestyle-learn-european-portuguese",
    metaDescription: "Portugal Lifestyle is the best app to learn European Portuguese. 456+ lessons from A1 to C2, interactive games, cultural content, AIMA visa guides, and offline mode. Download free on iOS and Android.",
    metaKeywords: "learn European Portuguese, European Portuguese app, Portugal Lifestyle app, learn Portuguese Portugal, Portuguese language app, expat Portugal, move to Portugal, Portuguese lessons, CEFR Portuguese",
    content: `# Portugal Lifestyle: The Best App to Learn European Portuguese in 2026

Most language apps teach Brazilian Portuguese. If you're moving to Portugal, already living there, or simply want to learn the real thing — **Portugal Lifestyle** is the app built for you.

**Download free:** [iOS App Store](https://apps.apple.com/pt/app/portugal-lifestyle-learn-it/id6755307562?l=en-GB) | [Google Play](https://play.google.com/store/apps/details?id=com.pgappstudios.portugal_lifestyle_pro&pcampaignid=web_share) | [portugal-lifestyle.com](https://www.portugal-lifestyle.com/)

## Why European Portuguese Is Different

European Portuguese and Brazilian Portuguese are not the same. The pronunciation, vocabulary, slang, and rhythm are significantly different. Portugal Lifestyle is built from the ground up to teach the Portuguese actually spoken in Portugal.

## What's Inside

### 456+ Lessons from A1 to C2
Full CEFR framework — complete beginner to mastery.

### Interactive Learning Games
- Sentence Builder, Word Match, Memory Match
- Speed Quiz, Word Builder, Listening Challenges

### 500+ Phrase Library
Everyday conversations with native speaker pronunciation guides.

### Portuguese Culture & Geography
District guides, Portuguese stories, cultural insights, and traditions.

### AIMA Visa & Immigration Guide
22 articles covering the full process of relocating to Portugal — NIF, AIMA residence permits, SNS health registration, and more.

## Key Features
- Offline Mode
- Daily Goals & streak tracking
- Achievement Badges
- Cross-Device Sync (iPhone, iPad, Mac)
- Native Speaker Pronunciation

**[Download on the App Store →](https://apps.apple.com/pt/app/portugal-lifestyle-learn-it/id6755307562?l=en-GB)**`
  },
  {
    id: "fasting-and-walking-app-ios",
    title: "Fasting and Walking: The iOS App That Tracks Intermittent Fasting & Daily Steps Together",
    excerpt: "Fasting and Walking is a clean, science-based iOS app that helps you track intermittent fasting protocols and daily step goals simultaneously — with zero distractions.",
    author: "PG App Studios",
    date: "2026-04-08",
    readTime: 6,
    tags: ["Fasting", "Walking", "Health", "Fitness", "iOS", "Intermittent Fasting", "Weight Loss"],
    category: "Apps",
    featured: false,
    slug: "fasting-and-walking-app-ios",
    metaDescription: "Fasting and Walking is a free iOS app for tracking intermittent fasting and daily steps together. Supports 12–72 hour fasts, OMAD, science-based fasting stages, hydration tracking, and step progress rings.",
    metaKeywords: "intermittent fasting app, fasting tracker iOS, walking tracker app, fasting and walking app, intermittent fasting iPhone, OMAD tracker, fasting stages app, step counter app, weight loss app iOS",
    content: `# Fasting and Walking: Track Intermittent Fasting & Daily Steps Together

Two of the most effective health habits — intermittent fasting and daily walking — finally have a dedicated app.

**Download free:** [Fasting and Walking on the App Store](https://apps.apple.com/pt/app/fasting-and-walking/id6755205850?l=en-GB)

## Fasting Features

### Multiple Protocols Supported
12:12, 16:8, 18:6, 20:4, OMAD, and extended fasts up to 72 hours.

### Science-Based Fasting Stages
The app explains what's happening in your body at each stage: glycogen depletion, fat burning, ketone production, light/deep ketosis, autophagy, and extended metabolic stages.

### Hydration Guidance
Built-in reminders and guidance to fast safely and effectively.

## Step Tracking
Daily step goals with visual progress rings. Works with iPhone motion sensors — no wearable required.

## App Philosophy
- No account required
- No social feed or distractions
- Clean, minimal design
- No data collection — health data stays on your device

## Free to Download
Core tracking is free. All Access available at €1.99 or €22.99.

**[Download Fasting and Walking Free →](https://apps.apple.com/pt/app/fasting-and-walking/id6755205850?l=en-GB)**`
  },
  {
    id: "star-seekers-2-space-shooter-ios",
    title: "Star Seekers 2: The Addictive Space Shooter Arcade Game for iPhone",
    excerpt: "Star Seekers 2 is an action-packed iOS space shooter with epic boss battles, ship upgrades, and multiple galaxy levels. Free to play — can you conquer the galaxy?",
    author: "PG App Studios",
    date: "2026-04-07",
    readTime: 5,
    tags: ["Games", "iOS", "Space", "Arcade", "Action", "Shooter", "Boss Battles"],
    category: "Apps",
    featured: false,
    slug: "star-seekers-2-space-shooter-ios",
    metaDescription: "Star Seekers 2 is a free iOS space shooter arcade game with progressive boss battles, ship upgrades, multiple galaxy levels, and offline gameplay. Download free on the App Store.",
    metaKeywords: "space shooter iOS, arcade game iPhone, Star Seekers 2, space game app, boss battle game iOS, free arcade game iPhone, top-down shooter iOS, space arcade game",
    content: `# Star Seekers 2: The Addictive Space Shooter Arcade Game for iPhone

**Download free:** [Star Seekers 2 on the App Store](https://apps.apple.com/pt/app/star-seekers-2/id6759613787?l=en-GB)

## Gameplay Features

### Fast-Paced Arcade Combat
Top-down space shooter with smooth controls, escalating difficulty, and satisfying combat across multiple galaxies.

### Epic Boss Battles
Every world ends with a unique boss requiring strategy and timing — each has distinct attack patterns, weak points, and phases.

### Unlock & Upgrade Your Fleet
Collect credits, unlock ships with unique power variations, and upgrade weapons and abilities.

### Multiple Galaxy Levels
Distinct galaxies with increasing enemy complexity and new challenges at every level.

### Play Offline, Anywhere
Fully offline — perfect for commutes, flights, or anywhere without Wi-Fi.

## Free to Play
Free to download. Credit packs available from €0.99 to €11.99.

**Compatible with:** iPhone (iOS 13+), iPad, Mac (M1+), Vision OS

**[Download Star Seekers 2 Free →](https://apps.apple.com/pt/app/star-seekers-2/id6759613787?l=en-GB)**`
  },
  {
    id: "voice-to-caption-ai-writer-ios",
    title: "Voice To Caption AI Writer: Turn Your Voice Into Social Media Captions Instantly",
    excerpt: "Voice To Caption uses AI to transform your spoken words into perfectly formatted captions with smart hashtags for Instagram, TikTok, X, LinkedIn, Threads, and more.",
    author: "PG App Studios",
    date: "2026-04-06",
    readTime: 5,
    tags: ["AI", "Social Media", "Captions", "iOS", "Instagram", "TikTok", "Content Creation"],
    category: "Apps",
    featured: false,
    slug: "voice-to-caption-ai-writer-ios",
    metaDescription: "Voice To Caption AI Writer is a free iOS app that converts your voice into AI-powered social media captions with smart hashtags for Instagram, TikTok, X, LinkedIn, and Threads.",
    metaKeywords: "voice to caption app, AI caption generator, social media caption app, Instagram caption generator, TikTok caption app, AI writer iOS, voice caption iPhone, hashtag generator app",
    content: `# Voice To Caption AI Writer: Turn Your Voice Into Social Media Captions Instantly

Just talk. AI does the rest.

**Download free:** [Voice To Caption on the App Store](https://apps.apple.com/pt/app/voice-to-caption-ai-writer/id6751542069?l=en-GB)

## How It Works
1. **Speak** — Record yourself talking about your post or idea
2. **AI Writes** — The app transcribes and crafts a polished caption
3. **Hashtags Generated** — Smart hashtags added automatically
4. **Copy & Post** — One tap to copy and paste into any app

From speaking to ready-to-post caption in about 30 seconds.

## Supported Platforms
Instagram, TikTok, X (Twitter), LinkedIn, Threads, and more. The AI adapts tone and format to each platform.

## Why Voice Is Faster
The average person speaks at 130 words per minute but types at 40. Speaking is 3x faster — and you capture your natural enthusiasm that makes captions authentic.

## Who It's For
Content creators, social media managers, small business owners, and anyone who finds writing captions tedious.

**[Download Voice To Caption Free →](https://apps.apple.com/pt/app/voice-to-caption-ai-writer/id6751542069?l=en-GB)**`
  },
  {
    id: "soccer-legends-quiz-ios",
    title: "Soccer Legends: The Ultimate Football Quiz App for iPhone",
    excerpt: "Test your football knowledge with Soccer Legends — the iOS quiz app featuring legendary players, epic challenges, and the entire history of the beautiful game.",
    author: "PG App Studios",
    date: "2026-04-05",
    readTime: 4,
    tags: ["Soccer", "Football", "Quiz", "iOS", "Games", "Sports", "Trivia"],
    category: "Apps",
    featured: false,
    slug: "soccer-legends-quiz-ios",
    metaDescription: "Soccer Legends is a free iOS football quiz app featuring legendary players, trivia challenges, and the history of the beautiful game. Download free on the App Store.",
    metaKeywords: "soccer quiz app, football quiz iPhone, Soccer Legends app, football trivia iOS, soccer legends game, football knowledge quiz, free football app iPhone, soccer trivia app",
    content: `# Soccer Legends: The Ultimate Football Quiz App for iPhone

**Download free:** [Soccer Legends on the App Store](https://apps.apple.com/pt/app/soccer-legends/id6753688926?l=en-GB)

## What Is Soccer Legends?
A free iPhone football trivia and quiz game covering legendary players from every era — from Pelé and Maradona to Ronaldo and Messi.

## Coverage
- Classic legends from the 1950s–1980s
- 90s icons who defined a generation
- Modern superstars from the current era
- Club legends from every major league
- International stars from across the globe
- Record breakers and award winners

## Features
- Fun trivia quizzes with multiple difficulty levels
- Epic challenges testing deep football knowledge
- Player profiles of the all-time greats
- Historical facts about legendary clubs and tournaments
- Free to play — no subscription required

## Who It's For
Football fans of any age, kids learning the history of the game, competitive friends settling debates, and anyone who loves sports trivia.

**[Download Soccer Legends Free →](https://apps.apple.com/pt/app/soccer-legends/id6753688926?l=en-GB)**`
  },
  {
    id: "basketball-legends-quiz-ios",
    title: "Basketball Legends: The iOS Quiz App for NBA History & Hoops Trivia",
    excerpt: "Challenge your basketball knowledge with Basketball Legends — the free iPhone quiz app featuring historic NBA players, iconic moments, and the greatest legends of the court.",
    author: "PG App Studios",
    date: "2026-04-04",
    readTime: 4,
    tags: ["Basketball", "NBA", "Quiz", "iOS", "Games", "Sports", "Trivia"],
    category: "Apps",
    featured: false,
    slug: "basketball-legends-quiz-ios",
    metaDescription: "Basketball Legends is a free iOS quiz app featuring NBA legends, basketball trivia, and iconic moments from the history of the sport. Download free on the App Store.",
    metaKeywords: "basketball quiz app, NBA trivia iOS, Basketball Legends app, basketball knowledge quiz, NBA legends game, hoops trivia iPhone, free basketball app, NBA quiz iPhone",
    content: `# Basketball Legends: The iOS Quiz App for NBA History & Hoops Trivia

**Download free:** [Basketball Legends on the App Store](https://apps.apple.com/pt/app/basketball-legends/id6753718461?l=en-GB)

## What Is Basketball Legends?
A free iPhone quiz game covering the full history of professional basketball — from Russell and Wilt to LeBron and Giannis.

## Eras Covered
- Golden Age legends — Russell, Wilt, West, Oscar Robertson
- 80s icons — Magic, Bird, Kareem, Isiah Thomas
- 90s legends — Jordan, Pippen, Barkley, Olajuwon, Shaq
- 2000s stars — Kobe, LeBron, Duncan, Dirk, Wade
- Modern superstars — Steph Curry, Giannis, Durant, Jokic
- International greats — Dirk, Pau Gasol, Tony Parker

## Features
- Multi-level trivia from easy to expert
- Player career questions — stats, championships, MVP awards
- Historic moments — iconic games, records, milestones
- Quick-play format perfect for short sessions
- Free to play

**[Download Basketball Legends Free →](https://apps.apple.com/pt/app/basketball-legends/id6753718461?l=en-GB)**`
  },
  {
    id: "bible-test-your-faith-ios",
    title: "Bible: Test Your Faith — The iOS App for Daily Bible Questions & Verses",
    excerpt: "Strengthen your faith with daily Bible questions, inspiring verses, and a gentle quiz experience designed for all ages. Free on iPhone.",
    author: "PG App Studios",
    date: "2026-04-03",
    readTime: 4,
    tags: ["Bible", "Faith", "Religion", "Quiz", "iOS", "Christian", "Devotional"],
    category: "Apps",
    featured: false,
    slug: "bible-test-your-faith-ios",
    metaDescription: "Bible: Test Your Faith is a free iOS app featuring daily Bible quiz questions, inspiring verses, and a gentle faith-building experience for Christians of all ages.",
    metaKeywords: "Bible quiz app, Bible test app, Christian quiz iOS, Bible verses app, faith app iPhone, daily Bible questions, Bible trivia app, Christian app iOS, Bible study quiz",
    content: `# Bible: Test Your Faith — Daily Bible Questions & Verses for iPhone

**Download free:** [Bible: Test Your Faith on the App Store](https://apps.apple.com/pt/app/bible-test-your-faith/id6753075938?l=en-GB)

## What Is It?
A gentle, encouraging iOS app that deepens your understanding of scripture through daily questions, inspiring verses, and faith-building quizzes for Christians of all ages.

## Features
- Daily Bible questions spanning Old and New Testament
- Inspiring scripture verses for daily encouragement
- All-ages design — accessible for beginners, challenging for experienced readers
- Topics: Old Testament history, New Testament teachings, life of Jesus, Epistles, Psalms, Proverbs, Prophets, Revelation

## Why Use It?
Your phone is already in your hand dozens of times a day. Bible: Test Your Faith turns those moments into brief, meaningful encounters with scripture. Five minutes of daily Bible questions adds up to significant knowledge growth over weeks and months.

## Who It's For
Regular churchgoers, parents looking for faith-based apps for children, new believers building a foundation, lifelong Christians reinforcing their knowledge, and Bible study groups.

**[Download Bible: Test Your Faith Free →](https://apps.apple.com/pt/app/bible-test-your-faith/id6753075938?l=en-GB)**`
  },
  {
    id: "baby-learning-games-ios",
    title: "Baby Learning Games 1-4: Fun Educational Mini-Games for Toddlers on iPhone",
    excerpt: "Baby Learning Games 1-4 is a safe, colorful iOS app packed with educational mini-games for babies and toddlers aged 1 to 4. Spark early learning through play.",
    author: "PG App Studios",
    date: "2026-04-02",
    readTime: 5,
    tags: ["Baby", "Toddler", "Educational", "Kids", "iOS", "Learning", "Games"],
    category: "Apps",
    featured: false,
    slug: "baby-learning-games-ios",
    metaDescription: "Baby Learning Games 1-4 is a free iOS app with colorful educational mini-games for babies and toddlers ages 1-4. Safe, ad-free, and designed to spark early learning. Download on the App Store.",
    metaKeywords: "baby learning games app, toddler games iOS, educational app for babies, kids learning app iPhone, baby games iPhone, toddler educational app, learning games 1 year old, educational games toddler iOS",
    content: `# Baby Learning Games 1-4: Educational Mini-Games for Toddlers

**Download free:** [Baby Learning Games 1-4 on the App Store](https://apps.apple.com/pt/app/baby-learning-games-1-4/id6754612338?l=en-GB)

## What Children Learn
Colors, shapes, numbers, letters, animals, and matching & memory — all through interactive, visually engaging gameplay.

## Designed for Tiny Fingers
- Large, tappable elements
- Bright, high-contrast visuals
- Instant positive feedback — sounds and animations
- Simple interactions: tap, drag, match

## Safe for Children
- No ads shown to children
- In-app purchases protected from accidental taps
- No social features, no external links
- No data collection — child privacy fully protected
- Age Rating: 4+ on the App Store

## Who It's For
Parents of babies and toddlers aged 1–4, grandparents, nursery and daycare workers, and any caregiver wanting a child-safe educational alternative to videos.

**[Download Baby Learning Games Free →](https://apps.apple.com/pt/app/baby-learning-games-1-4/id6754612338?l=en-GB)**`
  },
  {
    id: "aquafasty-diet-plan-ios",
    title: "Aquafasty Diet Plan: Track Water, Steps & Fasting in One iOS App",
    excerpt: "Aquafasty is the all-in-one iOS health app for tracking hydration, daily steps, and intermittent fasting together. Start your weight loss journey the smart way.",
    author: "PG App Studios",
    date: "2026-04-01",
    readTime: 5,
    tags: ["Fasting", "Hydration", "Health", "Weight Loss", "iOS", "Fitness", "Diet"],
    category: "Apps",
    featured: false,
    slug: "aquafasty-diet-plan-ios",
    metaDescription: "Aquafasty Diet Plan is a free iOS app for tracking water intake, daily steps, and intermittent fasting together. Smart hydration, clean eating support, and healthy habit tracking.",
    metaKeywords: "hydration tracker app, water intake app iOS, fasting tracker app, diet plan iPhone, Aquafasty app, weight loss app iOS, intermittent fasting app, step tracker iPhone, healthy habits app",
    content: `# Aquafasty Diet Plan: Track Water, Steps & Fasting Together

**Download free:** [Aquafasty Diet Plan on the App Store](https://apps.apple.com/pt/app/aquafasty-diet-plan/id6746637395?l=en-GB)

## Why Three Habits Together?
Water, movement, and meal timing interact synergistically. Tracking all three gives you a complete picture of your health habits and makes it harder to have an excuse for a bad day.

## Key Features

### Hydration Tracking
Log water intake throughout the day with daily goal progress and reminders — especially important during fasting windows.

### Step Tracking
Automatic daily step counting with visual goal indicators.

### Fasting Timer & Support
Start a fasting timer, track your current fasting window, and get guidance on fasting stages. Multiple protocols supported.

### Clean Design
No clutter, no unnecessary features. Fast to check, easy to use every day.

## Who It's For
Anyone starting a weight loss journey, intermittent fasters who want to track hydration and movement, people who struggle to drink enough water, fitness beginners building foundational habits.

**[Download Aquafasty Free →](https://apps.apple.com/pt/app/aquafasty-diet-plan/id6746637395?l=en-GB)**`
  }
];

export class BlogService {
  static async getAllPosts(): Promise<BlogPost[]> {
    return [...localPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getAllPosts();
    return posts.find(post => post.slug === slug || post.id === slug) || null;
  }

  static async getPostsByCategory(category: string): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
  }

  static async getFeaturedPosts(): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => post.featured);
  }
}
