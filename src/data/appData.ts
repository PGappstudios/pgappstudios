export interface AppFeature {
  title: string;
  text: string;
}

export interface AppFAQ {
  q: string;
  a: string;
}

export interface App {
  id: number;
  title: string;
  description: string;
  image: string;
  platforms: string[];
  category: 'ios' | 'web' | 'both';
  url: string;
  androidUrl?: string;
  initials?: string;
  initialsColor?: string;
  // SEO landing-page fields (a page is generated for any app with a slug)
  slug?: string;
  appCategory?: string;      // schema.org applicationCategory + human label
  tagline?: string;
  metaDescription?: string;
  longDescription?: string[];
  features?: AppFeature[];
  faqs?: AppFAQ[];
  keywords?: string;
}

export const allApps: App[] = [
  // iOS Apps (A–Z)
  {
    id: 10,
    title: "Aquafasty Diet Plan",
    description: "Track water, steps & fasting with Aquafasty! Start your weight loss journey today with smart hydration, healthy habits, and clean eating support.",
    image: "/drinklogo.png",
    platforms: ["iOS App"],
    category: 'ios',
    url: "https://apps.apple.com/pt/app/aquafasty-diet-plan/id6746637395?l=en-GB",
    slug: "aquafasty-diet-plan",
    appCategory: "HealthApplication",
    tagline: "Water, steps and fasting — one simple weight-loss tracker",
    metaDescription: "Aquafasty combines water tracking, steps and an intermittent fasting timer in one simple, habit-first weight-loss app. Free on iOS.",
    longDescription: [
      "Aquafasty Diet Plan brings three core weight-loss habits — hydration, movement and intermittent fasting — into a single, easy tracker. Instead of juggling a water app, a step counter and a fasting timer, you see your whole day in one dashboard and stay on plan without app-switching.",
      "Hydration is the signature angle: staying well-watered supports your metabolism, curbs false hunger during fasting windows and keeps energy up while you cut back. Log your water, watch your steps climb and keep your eating window on track — a lightweight but complete system built on consistency, not crash dieting."
    ],
    features: [
      { title: "Hydration tracking", text: "Set a daily water goal and log intake with a tap. Smart reminders keep you drinking through the day." },
      { title: "Step & activity tracking", text: "Watch your daily movement add up and stay motivated to keep going." },
      { title: "Fasting timer", text: "Track your intermittent fasting window so eating and fasting stay on schedule." },
      { title: "One combined dashboard", text: "Water, steps and fasting in a single view — the full picture of your day at a glance." }
    ],
    faqs: [
      { q: "Is Aquafasty free?", a: "Yes, Aquafasty is free to download on the App Store, with optional in-app content." },
      { q: "Does it work for intermittent fasting?", a: "Yes — Aquafasty includes a fasting timer alongside hydration and step tracking, so you can run popular fasting schedules and see everything in one place." },
      { q: "Why track water for weight loss?", a: "Staying hydrated supports metabolism and reduces false hunger, which makes fasting windows easier to stick to." }
    ],
    keywords: "water tracker app, hydration and fasting app, intermittent fasting app, diet plan app, simple weight loss tracker"
  },
  {
    id: 18,
    title: "Baby Learning Games 1 - 4",
    description: "Fun educational mini-games for babies and toddlers ages 1 to 4. Safe, colorful, and designed to spark early learning and joy.",
    image: "babylearninglogo.png",
    platforms: ["iOS App"],
    category: 'ios',
    url: "https://apps.apple.com/pt/app/baby-learning-games-1-4/id6754612338?l=en-GB",
    initials: "BLG",
    initialsColor: "#FF9EC4",
    slug: "baby-learning-games",
    appCategory: "EducationalApplication",
    tagline: "Safe, colorful learning games for toddlers ages 1–4",
    metaDescription: "Gentle, colorful learning games for toddlers aged 1–4 — colors, shapes, animals and sounds. Safe screen time parents can feel good about. Free on iOS.",
    longDescription: [
      "Baby Learning Games 1-4 is a collection of gentle, colorful mini-games designed for the youngest learners. Each game builds early-development basics — colors, shapes, animals, sounds and simple cause-and-effect — in a bright, tap-friendly interface little fingers can actually use.",
      "The games are intentionally simple and forgiving: no reading required, no complicated rules and no way to lose. Big touch targets, cheerful visuals and instant rewards keep toddlers engaged while gently building recognition and motor skills. For parents, it turns a few minutes of screen time into something purposeful — on a car ride, at a restaurant, or during a busy moment at home."
    ],
    features: [
      { title: "Built for ages 1–4", text: "Content and controls designed specifically for toddlers — nothing too hard, nothing too easy." },
      { title: "Early-learning basics", text: "Colors, shapes, animals and sounds introduced through playful, repeatable games." },
      { title: "Toddler-friendly controls", text: "Big touch targets and forgiving gameplay made for little fingers — no reading needed." },
      { title: "Rewarding feedback", text: "Bright visuals and cheerful responses keep young learners happily engaged." }
    ],
    faqs: [
      { q: "What age is Baby Learning Games for?", a: "It's designed for toddlers from 1 to 4 years old, with simple games suited to early development." },
      { q: "Is it safe for young children?", a: "Yes — the games are built to be gentle, simple and age-appropriate, with no way to 'lose' and easy controls for little hands." },
      { q: "Do children need to read to play?", a: "No. The games rely on visuals, colors and sounds, so no reading is required." }
    ],
    keywords: "toddler learning games, baby games for 1 year old, educational games for toddlers, games for 2 year olds, learning app for toddlers"
  },
  {
    id: 21,
    title: "Basketball Legends",
    description: "Challenge your basketball knowledge with fun quizzes featuring historic players, epic moments, and the greatest legends of the court.",
    image: "basketballlegendslogo.png",
    platforms: ["iOS App"],
    category: 'ios',
    url: "https://apps.apple.com/pt/app/basketball-legends/id6753718461?l=en-GB",
    initials: "BL",
    initialsColor: "#F7931A",
    slug: "basketball-legends",
    appCategory: "GameApplication",
    tagline: "The trivia game that tests your basketball IQ",
    metaDescription: "Fun basketball trivia for hoops fans — historic players, dynasties and iconic moments from every era. Settle the GOAT debate. Free on iOS.",
    longDescription: [
      "Basketball Legends is a trivia game for hoops fans who live for the debate. It quizzes you on the legendary players, dynasties and unforgettable moments that shaped basketball — from the old-school greats to the modern superstars.",
      "The quiz format keeps sessions short and addictive — perfect for a quick round on a commute or head-to-head with friends who think they know ball better than you. Chase a high score, close your knowledge gaps and settle the GOAT arguments once and for all."
    ],
    features: [
      { title: "Trivia across every era", text: "Questions span old-school greats, dynasties, records and today's stars." },
      { title: "Quick, replayable rounds", text: "Short quiz sessions that are easy to pick up and hard to put down." },
      { title: "Chase your high score", text: "Compete against yourself and climb as your basketball IQ grows." },
      { title: "Great for fans of all levels", text: "Fun whether you've watched every Finals or you're catching up on the classics." }
    ],
    faqs: [
      { q: "Is Basketball Legends free?", a: "Yes, it's free to download on the App Store." },
      { q: "What kind of questions does it ask?", a: "Trivia on historic and modern players, teams, records and iconic basketball moments across every era." },
      { q: "Is it good for casual fans?", a: "Absolutely — rounds are short and easy to learn, so it's fun for die-hards and newer fans alike." }
    ],
    keywords: "basketball trivia game, nba quiz app, guess the basketball player, basketball knowledge quiz, nba trivia"
  },
  {
    id: 19,
    title: "Bible: Test Your Faith",
    description: "Strengthen your faith with daily Bible questions, inspiring verses, and a gentle quiz experience designed for all ages.",
    image: "biblelogo.png",
    platforms: ["iOS App"],
    category: 'ios',
    url: "https://apps.apple.com/pt/app/bible-test-your-faith/id6753075938?l=en-GB",
    initials: "BTYF",
    initialsColor: "#4A6EDB",
    slug: "bible-test-your-faith",
    appCategory: "LifestyleApplication",
    tagline: "A gentle daily Bible quiz to grow in scripture",
    metaDescription: "Turn Bible study into a simple daily habit — thoughtful questions, meaningful verses and a gentle quiz to deepen your scripture knowledge. Free on iOS.",
    longDescription: [
      "Bible: Test Your Faith turns Bible study into a simple daily habit. Each day it serves thoughtful questions, meaningful verses and a gentle quiz designed to deepen your knowledge of scripture without pressure or gimmicks.",
      "The quiz is intentionally gentle — about growth and reflection, not competition. Questions draw you back into the text, verses give you something to carry through the day, and the daily rhythm builds consistency. Whether you're a lifelong reader or new to the Bible, the app meets you where you are."
    ],
    features: [
      { title: "Daily Bible questions", text: "A fresh, thoughtful quiz each day to keep you engaged with scripture." },
      { title: "Meaningful verses", text: "Inspiring verses to reflect on and carry with you through the day." },
      { title: "Gentle, low-pressure format", text: "Designed for reflection and growth, not scoring anxiety or competition." },
      { title: "For all ages and levels", text: "Approachable for new believers and rewarding for lifelong readers." }
    ],
    faqs: [
      { q: "Is Bible: Test Your Faith free?", a: "Yes, it's free to download on the App Store." },
      { q: "Which Bible does it use?", a: "The app draws on scripture for its questions and verses — see the App Store listing for translation details." },
      { q: "Is it suitable for new believers?", a: "Yes — the gentle, daily format is designed to be approachable for newcomers and meaningful for experienced readers." }
    ],
    keywords: "bible quiz app, daily bible verse app, bible trivia game, bible study app, test your bible knowledge"
  },
  {
    id: 27,
    title: "CycleBuddy",
    description: "Find riders nearby, join group rides, and chat with your crew. Built for cyclists who ride smarter.",
    image: "cyclebuddylogo.png",
    platforms: ["iOS App"],
    category: "ios",
    url: "https://apps.apple.com/pt/app/cyclebuddy/id6762289803?l=en-GB",
    slug: "cyclebuddy",
    appCategory: "SportsApplication",
    tagline: "Find riders near you and turn solo miles into group rides",
    metaDescription: "CycleBuddy helps cyclists find riders nearby, join group rides and chat with their crew. Road, gravel or MTB. Free on iOS.",
    longDescription: [
      "CycleBuddy is the app that turns solo miles into group rides. It helps cyclists find riders nearby, discover and join group rides, and stay connected with their crew through built-in chat. Whether you ride road, gravel or MTB, the hardest part is often finding people to ride with at your pace — CycleBuddy solves that.",
      "Instead of hoping the local club's Facebook page is active, you can see who's riding near you, jump into planned group rides and coordinate details without the back-and-forth. Pace and skill awareness helps you find rides that match your level, so you're neither getting dropped nor soft-pedaling."
    ],
    features: [
      { title: "Find riders near you", text: "See cyclists in your area and connect with people who ride where you ride." },
      { title: "Join group rides", text: "Discover planned rides and jump in — no more riding alone every weekend." },
      { title: "Chat with your crew", text: "Coordinate routes, meet times and last-minute changes in one place." },
      { title: "Pace & skill aware", text: "Match with rides at your level so every ride is fun, not frustrating." }
    ],
    faqs: [
      { q: "Is CycleBuddy free?", a: "Yes, it's free to download on the App Store." },
      { q: "What types of cycling does it support?", a: "Road, gravel and MTB riders of all levels use CycleBuddy to find people to ride with." },
      { q: "How does it find rides at my level?", a: "Ride discovery is pace- and skill-aware, so you can find group rides that match your ability." }
    ],
    keywords: "cycling app to find riders, find group rides near me, cycling partner finder, group ride app, cycling community app"
  },
  {
    id: 23,
    title: "DinkUp",
    description: "The app for pickleball players. Find games, connect with players, and level up your pickleball experience.",
    image: "dinkuplogo.png",
    platforms: ["iOS App"],
    category: "ios",
    url: "https://apps.apple.com/pt/app/dinkup/id6760656546?l=en-GB",
    slug: "dinkup",
    appCategory: "SportsApplication",
    tagline: "Find pickleball games and players near you",
    metaDescription: "DinkUp is the pickleball app for finding games near you and matching with players at your level. More court time, less group-chat chaos. Free on iOS.",
    longDescription: [
      "DinkUp is the community app built for pickleball players who want to spend less time hunting for a game and more time on the court. Find open games nearby, match with players at your skill level, and plug into the fastest-growing sport in the world — no more group-chat chaos or showing up to courts hoping someone's around.",
      "The app connects players to each other and to games, so it's easy to organize a session, join an existing one, or meet new partners at your pace. As you play more, you build a local crew and steadily level up — the social and competitive sides of pickleball in one place."
    ],
    features: [
      { title: "Find games near you", text: "See open play and pickleball games happening nearby and join in a tap." },
      { title: "Match by skill level", text: "Get paired with players at your level so games are fun and competitive." },
      { title: "Connect with players", text: "Message and organize with a local pickleball crew between sessions." },
      { title: "Level up as you play", text: "Build connections and progress in the sport the more you get on court." }
    ],
    faqs: [
      { q: "Is DinkUp free?", a: "Yes, DinkUp is free to download on the App Store." },
      { q: "How does DinkUp find games near me?", a: "DinkUp uses your location to surface open games and players nearby, so you can join a session close to you." },
      { q: "Can I find players at my skill level?", a: "Yes — DinkUp matches you with players at your level so games stay fun and balanced." }
    ],
    keywords: "pickleball app, find pickleball players near me, pickleball games near me, pickleball partner finder, pickleball community app"
  },
  {
    id: 4,
    title: "DocyScan",
    description: "Streamlined document scanning solution with intelligent text recognition and organization features.",
    image: "/DocyScan.png",
    platforms: ["iOS App"],
    category: 'ios',
    url: "https://apps.apple.com/pt/app/docyscan/id6740208487?l=en-GB",
    slug: "docyscan",
    appCategory: "ProductivityApplication",
    tagline: "Scan, recognize and organize documents from your iPhone",
    metaDescription: "DocyScan turns your iPhone into a document scanner with smart text recognition and easy organization. Scan receipts, contracts and more. Free on iOS.",
    longDescription: [
      "DocyScan turns your iPhone into a streamlined document scanner. Capture receipts, contracts, notes and paperwork, and let intelligent text recognition make them searchable and easy to reuse.",
      "Built-in organization keeps your scans tidy so you can find what you need later without digging through a camera roll. It's a fast, no-friction way to go paperless and keep important documents at your fingertips."
    ],
    features: [
      { title: "Fast document scanning", text: "Capture clean, sharp scans of any document straight from your iPhone camera." },
      { title: "Intelligent text recognition", text: "Turn scans into recognized text so documents are searchable and reusable." },
      { title: "Simple organization", text: "Keep scans tidy and easy to find instead of lost in your camera roll." },
      { title: "Go paperless", text: "Digitize receipts, contracts and paperwork and keep them at your fingertips." }
    ],
    faqs: [
      { q: "Is DocyScan free?", a: "Yes, it's free to download on the App Store." },
      { q: "Does DocyScan recognize text in scans?", a: "Yes — it includes intelligent text recognition so your scanned documents become searchable." },
      { q: "What can I scan with it?", a: "Receipts, contracts, notes, forms and any paper document you want to digitize and organize." }
    ],
    keywords: "document scanner app iphone, scan documents to pdf, text recognition scanner, receipt scanner app, paperless app"
  },
  {
    id: 25,
    title: "Fasting and Walking",
    description: "Combine intermittent fasting with daily walking to build healthy habits and reach your wellness goals.",
    image: "fastingwalkinglogo.png",
    platforms: ["iOS App"],
    category: "ios",
    url: "https://apps.apple.com/pt/app/fasting-and-walking/id6755205850?l=en-GB",
    slug: "fasting-and-walking",
    appCategory: "HealthApplication",
    tagline: "Pair intermittent fasting with daily walking",
    metaDescription: "Combine an intermittent fasting timer with daily walking goals to build simple, sustainable healthy habits. Two proven habits, one app. Free on iOS.",
    longDescription: [
      "Fasting and Walking pairs two of the simplest, most sustainable health habits — intermittent fasting and daily walking — in one focused app. Track your fasting window and your steps together so both habits reinforce each other on the way to your wellness goals.",
      "There's no crash dieting and no complicated program: just a clear fasting timer, daily walking targets and visible progress that keeps you consistent. It's built for people who want a realistic routine they can actually stick to."
    ],
    features: [
      { title: "Intermittent fasting timer", text: "Track your eating and fasting windows with a clear, easy timer." },
      { title: "Daily walking goals", text: "Set step targets and watch your daily movement build momentum." },
      { title: "Two habits, one app", text: "Fasting and walking reinforce each other for steady, sustainable results." },
      { title: "Simple progress tracking", text: "See your streaks and progress to stay motivated day to day." }
    ],
    faqs: [
      { q: "Is Fasting and Walking free?", a: "Yes, it's free to download on the App Store." },
      { q: "What fasting schedules does it support?", a: "You can track your fasting window with a flexible timer suited to popular intermittent fasting schedules." },
      { q: "How does walking help with fasting?", a: "Light daily movement pairs well with fasting to support energy and consistency — the app keeps both habits in one view." }
    ],
    keywords: "intermittent fasting and walking app, fasting timer app, walking app, healthy habits app, weight loss walking"
  },
  {
    id: 1,
    title: "MegaConverter: Unit & Data",
    description: "Powerful unit conversion tool for everyday measurements, scientific calculations, and data transformations.",
    image: "/lovable-uploads/579945c0-96f2-4360-a099-7f302844ec77.png",
    platforms: ["iOS App"],
    category: 'ios',
    url: "https://apps.apple.com/pt/app/megaconverter-unit-data/id6738279962?l=en-GB",
    slug: "megaconverter",
    appCategory: "UtilitiesApplication",
    tagline: "Convert any unit — measurements, data and more",
    metaDescription: "Powerful unit and data conversion for everyday measurements, science and data sizes. Fast, accurate results in one app. Free on iOS.",
    longDescription: [
      "MegaConverter is a powerful, easy unit conversion tool covering everyday measurements, scientific calculations and data transformations. Convert length, weight, volume, temperature, data sizes and much more without hunting for a formula.",
      "A clean, fast interface gives you accurate results instantly, whether you're cooking, studying, travelling or working. It's the one converter to keep on your home screen for whenever the numbers don't line up."
    ],
    features: [
      { title: "Everyday measurements", text: "Length, weight, volume, temperature and more — converted instantly." },
      { title: "Data & tech units", text: "Convert data sizes and technical units alongside standard measurements." },
      { title: "Fast and accurate", text: "A clean interface delivers precise results the moment you type." },
      { title: "One app for it all", text: "Skip the web searches — every conversion you need in a single tool." }
    ],
    faqs: [
      { q: "Is MegaConverter free?", a: "Yes, it's free to download on the App Store." },
      { q: "What can it convert?", a: "Everyday measurements (length, weight, volume, temperature), data sizes and many scientific and technical units." },
      { q: "Does it work offline?", a: "Core conversions are calculated on-device — check the App Store listing for full details." }
    ],
    keywords: "unit converter app, measurement converter, data size converter, conversion calculator, metric to imperial"
  },
  {
    id: 22,
    title: "Portugal Lifestyle: Learn it",
    description: "Learn real European Portuguese with slang, culture, history, food, places, and fun mini-games. Explore Portugal while mastering the language the way it's actually spoken.",
    image: "portugallifestylelogo.png",
    platforms: ["iOS App"],
    category: "ios",
    url: "https://apps.apple.com/pt/app/portugal-lifestyle-learn-it/id6755307562?l=en-GB",
    initials: "PL",
    initialsColor: "#006699",
    slug: "portugal-lifestyle-learn-it",
    appCategory: "EducationalApplication",
    tagline: "Learn real European Portuguese through culture and play",
    metaDescription: "Learn real European Portuguese — slang, culture, history and food — through fun mini-games. The language as actually spoken in Portugal. Free on iOS.",
    longDescription: [
      "Portugal Lifestyle: Learn it teaches real European Portuguese — the language as it's actually spoken in Portugal, not Brazil. It weaves slang, culture, history, food and places into fun mini-games so learning feels like exploring the country.",
      "Instead of dry drills, you pick up everyday language in the context that makes it stick. It's a playful, culture-first way to build vocabulary and understanding, perfect for travellers, expats and anyone curious about Portugal."
    ],
    features: [
      { title: "Genuine European Portuguese", text: "Vocabulary and pronunciation as used in Portugal — not a Brazilian course." },
      { title: "Culture, food and places", text: "Learn the language through Portugal's real culture, history and everyday life." },
      { title: "Fun mini-games", text: "Short, playful challenges that make new words and phrases stick." },
      { title: "Slang and real speech", text: "Pick up the expressions locals actually use to sound natural." }
    ],
    faqs: [
      { q: "Does it teach European or Brazilian Portuguese?", a: "European Portuguese — the language as spoken in Portugal, including slang and culture." },
      { q: "Is it good for beginners?", a: "Yes — the game-based approach introduces the language gently, making it approachable for newcomers." },
      { q: "Is it free?", a: "Yes, it's free to download on the App Store." }
    ],
    keywords: "learn european portuguese, portuguese app not brazilian, learn portuguese from portugal, portuguese for travellers, portuguese culture app"
  },
  {
    id: 24,
    title: "Portugal Lifestyle Pro",
    description: "Master European Portuguese with immersive lessons, real culture, and everyday language. Available on iOS and Android.",
    image: "portugallifestylelogo.png",
    platforms: ["iOS App", "Android App"],
    category: "ios",
    url: "https://apps.apple.com/pt/app/portugal-lifestyle-pro/id6757080577?l=en-GB",
    androidUrl: "https://play.google.com/store/apps/details?id=com.pgappstudios.portugal_lifestyle_pro&pcampaignid=web_share",
    initials: "PL",
    initialsColor: "#006699",
    slug: "portugal-lifestyle-pro",
    appCategory: "EducationalApplication",
    tagline: "Master European Portuguese — spoken in Portugal, not Brazil",
    metaDescription: "Master real European Portuguese with immersive lessons, culture and everyday language. Built for expats and movers. On iOS and Android.",
    longDescription: [
      "Portugal Lifestyle Pro helps you master real European Portuguese — the way it's actually spoken in Portugal, not Brazil. Immersive lessons, real culture, slang, food and everyday phrases give you the language you'll use from day one.",
      "Most big apps teach Brazilian Portuguese, and Duolingo doesn't offer European Portuguese at all. Portugal Lifestyle Pro is built for Portugal — ideal if you're moving there, preparing for AIMA, or working toward the A2 citizenship level. Available on both iOS and Android."
    ],
    features: [
      { title: "Genuinely European Portuguese", text: "Lisbon-and-Porto pronunciation, real spelling and vocabulary you'll actually hear." },
      { title: "Everyday language first", text: "Lessons prioritise what you'll really say, not textbook filler." },
      { title: "Culture and slang built in", text: "Understand the context behind the words to sound natural, not robotic." },
      { title: "iOS and Android", text: "Learn on any phone, with your progress in sync wherever you go." }
    ],
    faqs: [
      { q: "Does it teach European or Brazilian Portuguese?", a: "European Portuguese — the language as spoken in Portugal, including pronunciation, slang and culture. It is not a Brazilian course." },
      { q: "Is it available on Android?", a: "Yes. Portugal Lifestyle Pro is on both the Apple App Store and Google Play." },
      { q: "Will it help with the A2 citizenship level?", a: "It builds the everyday listening, reading and speaking skills the A2 CIPLE exam tests. It's a learning app rather than official exam prep, but a strong foundation." }
    ],
    keywords: "learn european portuguese app, european portuguese app, learn portuguese from portugal, portuguese for expats, portuguese not brazilian"
  },
  {
    id: 20,
    title: "Soccer Legends",
    description: "Test your football knowledge with fun quizzes, epic challenges, and legendary players from every era of the beautiful game.",
    image: "soccerlegendslogo.png",
    platforms: ["iOS App"],
    category: 'ios',
    url: "https://apps.apple.com/pt/app/soccer-legends/id6753688926?l=en-GB",
    initials: "SL",
    initialsColor: "#1EB53A",
    slug: "soccer-legends",
    appCategory: "GameApplication",
    tagline: "The football trivia game for true fans",
    metaDescription: "Fun football trivia — legendary players, epic moments and great teams from every era of the beautiful game. Free on iOS.",
    longDescription: [
      "Soccer Legends is a trivia game for football fans who love to prove their knowledge. Quiz yourself on the legendary players, epic moments and greatest teams from every era of the beautiful game, from the classics to today's superstars.",
      "The quiz format keeps rounds short and addictive — great for a commute or a challenge with friends who reckon they know the game better. Chase a high score, learn a little history and settle the debates that never end."
    ],
    features: [
      { title: "Trivia from every era", text: "Legendary players, iconic moments and great teams across football history." },
      { title: "Quick, replayable rounds", text: "Short quiz sessions that are easy to start and hard to stop." },
      { title: "Challenge your friends", text: "Compare scores and settle who really knows the beautiful game." },
      { title: "Fun for every fan", text: "Enjoyable whether you're a lifelong supporter or a newer fan learning the history." }
    ],
    faqs: [
      { q: "Is Soccer Legends free?", a: "Yes, it's free to download on the App Store." },
      { q: "What does it quiz you on?", a: "Legendary and modern players, famous matches, teams and moments from across football history." },
      { q: "Is it for casual fans too?", a: "Yes — rounds are short and easy to learn, so it's fun for die-hards and casual fans alike." }
    ],
    keywords: "football quiz game, soccer trivia app, guess the footballer, football knowledge quiz, soccer quiz app"
  },
  {
    id: 17,
    title: "Voice To Caption: AI Writer",
    description: "Turn your voice into AI-powered captions with smart hashtags, perfectly formatted for Instagram, TikTok, X, LinkedIn, Threads, and more.",
    image: "voicelogo.png",
    platforms: ["iOS App"],
    category: 'ios',
    url: "https://apps.apple.com/pt/app/voice-to-caption-ai-writer/id6751542069?l=en-GB",
    initials: "VC",
    initialsColor: "#9C4FE8",
    slug: "voice-to-caption",
    appCategory: "ProductivityApplication",
    tagline: "Speak it — get AI captions and hashtags for every platform",
    metaDescription: "Turn your voice into polished AI captions with smart hashtags for Instagram, TikTok, X, LinkedIn and Threads. Free on iOS.",
    longDescription: [
      "Voice To Caption: AI Writer turns what you say into ready-to-post social captions. Just speak your idea and the app writes a polished caption with smart hashtags, formatted for the platform you're posting to.",
      "It's built for creators, marketers and busy people who'd rather talk than type. Get platform-perfect captions for Instagram, TikTok, X, LinkedIn and Threads in seconds — no more staring at a blank caption box."
    ],
    features: [
      { title: "Voice to caption", text: "Speak your idea and get a written, ready-to-post caption instantly." },
      { title: "Smart hashtags", text: "Relevant hashtags added automatically to boost reach." },
      { title: "Platform formatting", text: "Captions tuned for Instagram, TikTok, X, LinkedIn and Threads." },
      { title: "Beat the blank box", text: "Turn a quick voice note into polished copy in seconds." }
    ],
    faqs: [
      { q: "Is Voice To Caption free?", a: "Yes, it's free to download on the App Store." },
      { q: "Which platforms does it format for?", a: "Instagram, TikTok, X, LinkedIn, Threads and more, with formatting suited to each." },
      { q: "How does it work?", a: "You speak your idea, and the AI writes a caption with smart hashtags ready to copy and post." }
    ],
    keywords: "ai caption generator, voice to text caption app, instagram caption generator, social media caption writer, hashtag generator app"
  },

  // Apps also available on the web (A–Z)
  {
    id: 31,
    title: "GritVit",
    description: "GritVit is a fitness dating app that connects people through their passion for working out and an active lifestyle.",
    image: "GritVit.png",
    platforms: ["iOS App", "Website"],
    category: "web",
    url: "https://www.gritvit.com/",
    slug: "gritvit",
    appCategory: "LifestyleApplication",
    tagline: "The dating app for people who love to train",
    metaDescription: "GritVit is the fitness dating app connecting people through a shared passion for working out and an active lifestyle. Find your match.",
    longDescription: [
      "GritVit is a fitness dating app that connects people through a shared passion for working out and an active lifestyle. Instead of endless swiping on mismatched profiles, GritVit brings together people who actually value fitness — so your workouts and your dating life finally point in the same direction.",
      "Whether you're a gym regular, a runner or someone who just loves staying active, GritVit helps you meet partners who share your commitment. It's built for people who want a relationship that fits their active life, not one they have to fight against."
    ],
    features: [
      { title: "Fitness-first matching", text: "Connect with people who genuinely value working out and staying active." },
      { title: "Shared lifestyle", text: "Meet partners whose routines and priorities line up with yours." },
      { title: "Motivation built in", text: "Date someone who gets — and supports — your commitment to training." },
      { title: "Active community", text: "Join a community centered on fitness, energy and an active lifestyle." }
    ],
    faqs: [
      { q: "What is GritVit?", a: "GritVit is a fitness dating app that connects people through a shared love of working out and an active lifestyle." },
      { q: "Who is GritVit for?", a: "Anyone who values fitness and wants to meet partners who share that commitment — from gym regulars to runners and active people generally." },
      { q: "Where can I get GritVit?", a: "Learn more and get started at gritvit.com." }
    ],
    keywords: "fitness dating app, dating app for gym goers, dating app for athletes, meet gym partners, active lifestyle dating"
  },

  // Websites (A–Z)
  {
    id: 32,
    title: "DinkUp",
    description: "The official DinkUp website — the app for pickleball players.",
    image: "dinkuplogo.png",
    platforms: ["Website"],
    category: "web",
    url: "https://www.dinkup.app/"
  },
  {
    id: 30,
    title: "Portugal Lifestyle",
    description: "The official website for Portugal Lifestyle — learn European Portuguese, explore culture, food, and places.",
    image: "portugallifestylelogo.png",
    platforms: ["Website"],
    category: "web",
    url: "https://www.portugal-lifestyle.com/"
  }
];

// Every app that has its own SEO landing page.
export const appPages: App[] = allApps.filter((a) => Boolean(a.slug));

export function getAppBySlug(slug: string): App | undefined {
  return allApps.find((a) => a.slug === slug);
}
