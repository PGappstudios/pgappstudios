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
}

export const allApps: App[] = [
  {
    id: 1,
    title: "MegaConverter: Unit & Data",
    description: "Powerful unit conversion tool for everyday measurements, scientific calculations, and data transformations.",
    image: "/lovable-uploads/579945c0-96f2-4360-a099-7f302844ec77.png",
    platforms: ["iOS App"],
    category: 'ios',
    url: "https://apps.apple.com/pt/app/megaconverter-unit-data/id6738279962?l=en-GB"
  },
  {
    id: 2,
    title: "Star Seekers: A Galaxy of Fun in One App!",
    description: "Embark on a celestial journey with Star Seekers! Explore thrilling mini-games and compete with friends on our Records Board. Download now and reach for the stars!",
    image: "/lovable-uploads/star-seekers.png",
    platforms: ["iOS App"],
    category: 'ios',
    url: "https://apps.apple.com/pt/app/star-seekers/id6738390556?l=en-GB"
  },
  {
    id: 4,
    title: "DocyScan",
    description: "Streamlined document scanning solution with intelligent text recognition and organization features.",
    image: "/DocyScan.png",
    platforms: ["iOS App"],
    category: 'ios',
    url: "https://apps.apple.com/pt/app/docyscan/id6740208487?l=en-GB"
  },
  {
    id: 10,
    title: "Aquafasty Diet Plan",
    description: "Track water, steps & fasting with Aquafasty! Start your weight loss journey today with smart hydration, healthy habits, and clean eating support.",
    image: "/drinklogo.png",
    platforms: ["iOS App"],
    category: 'ios',
    url: "https://apps.apple.com/pt/app/aquafasty-diet-plan/id6746637395?l=en-GB"
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
  initialsColor: "#9C4FE8" // Purple to match the brand gradient and creativity
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
  initialsColor: "#FF9EC4"
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
  initialsColor: "#4A6EDB"
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
  initialsColor: "#1EB53A"
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
  initialsColor: "#F7931A"
},
  {
  id: 22,
  title: "Portugal Lifestyle: Learn it",
  description: "Learn real European Portuguese with slang, culture, history, food, places, and fun mini-games. Explore Portugal while mastering the language the way it’s actually spoken.",
  image: "portugallifestylelogo.png",
  platforms: ["iOS App"],
  category: "ios",
  url: "https://apps.apple.com/pt/app/portugal-lifestyle-learn-it/id6755307562?l=en-GB",
  initials: "PL",
  initialsColor: "#006699"
},
  {
  id: 25,
  title: "Fasting and Walking",
  description: "Combine intermittent fasting with daily walking to build healthy habits and reach your wellness goals.",
  image: "fastingwalkinglogo.png",
  platforms: ["iOS App"],
  category: "ios",
  url: "https://apps.apple.com/pt/app/fasting-and-walking/id6755205850?l=en-GB"
},
  {
  id: 23,
  title: "DinkUp",
  description: "The app for pickleball players. Find games, connect with players, and level up your pickleball experience.",
  image: "dinkuplogo.png",
  platforms: ["iOS App"],
  category: "ios",
  url: "https://apps.apple.com/pt/app/dinkup/id6760656546?l=en-GB"
},
  {
  id: 26,
  title: "Star Seekers 2",
  description: "The sequel to Star Seekers — more mini-games, more challenges, and even more fun. Compete with friends and reach for the stars!",
  image: "/lovable-uploads/star-seekers.png",
  platforms: ["iOS App"],
  category: "ios",
  url: "https://apps.apple.com/pt/app/star-seekers-2/id6759613787?l=en-GB"
},
  {
  id: 30,
  title: "Portugal Lifestyle",
  description: "The official website for Portugal Lifestyle — learn European Portuguese, explore culture, food, and places.",
  image: "portugallifestylelogo.png",
  platforms: ["Website"],
  category: "web",
  url: "https://www.portugal-lifestyle.com/"
},
  {
  id: 31,
  title: "Gritvit",
  description: "GritVit is a fitness dating app that connects people through their passion for working out and an active lifestyle.",
  image: "GritVit.png",
  platforms: ["Website"],
  category: "web",
  url: "https://www.gritvit.com/"
},
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
  id: 24,
  title: "Portugal Lifestyle Pro",
  description: "Master European Portuguese with immersive lessons, real culture, and everyday language. Available on iOS and Android.",
  image: "portugallifestylelogo.png",
  platforms: ["iOS App", "Android App"],
  category: "ios",
  url: "https://apps.apple.com/pt/app/portugal-lifestyle-pro/id6757080577?l=en-GB",
  androidUrl: "https://play.google.com/store/apps/details?id=com.pgappstudios.portugal_lifestyle_pro&pcampaignid=web_share"
}
];
