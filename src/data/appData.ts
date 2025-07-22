export interface App {
  id: number;
  title: string;
  description: string;
  image: string;
  platforms: string[];
  category: 'ios' | 'web' | 'both';
  url: string;
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
    id: 3,
    title: "BabyID AI",
    description: "Use advanced AI to capture and track your baby's milestones and growth through intelligent photo analysis.",
    image: "/Baby Growth.png",
    platforms: ["iOS App"],
    category: 'ios',
    url: "https://apps.apple.com/pt/app/babyid-ai/id6741074866?l=en-GB"
  },
  {
    id: 5,
    title: "World Time Meetings",
    description: "Simplify scheduling across time zones with this intuitive meeting planner for global teams.",
    image: "",
    platforms: ["Web App"],
    category: 'web',
    url: "https://www.worldtimemeeting.com/",
    initials: "WTM",
    initialsColor: "#0EA5E9" // Ocean Blue
  },
  {
    id: 6,
    title: "Random Generator Tools",
    description: "Collection of randomization tools for various purposes, from decision-making to creative brainstorming.",
    image: "",
    platforms: ["Web App"],
    category: 'web',
    url: "https://www.randomwheely.com/",
    initials: "RGT",
    initialsColor: "#8B5CF6" // Vivid Purple
  },
  {
    id: 7,
    title: "Travel Goofy",
    description: "Find the best deals on flights, hotels, tours, and more with TravelGoofy.",
    image: "/travel.png",
    platforms: ["Web App"],
    category: 'web',
    url: "https://www.travelgoofy.com/",
    initials: "TG",
    initialsColor: "#22C55E" // Green color for travel theme
  },
  {
    id: 8,
    title: "Retro Markets 80s",
    description: "Iconic 80's Products. Journey back to the decade of neon colors, big hair, and revolutionary gadgets.",
    image: "/retro.png",
    platforms: ["Web App"],
    category: 'web',
    url: "https://www.retromarket80s.com/",
    initials: "RM",
    initialsColor: "#EC4899" // Pink color for retro 80s theme
  },
  {
    id: 9,
    title: "Geni Finance",
    description: "Geni Finance empowers you with tools to understand, manage, and grow your money with confidence and clarity.",
    image: "/geni.png",
    platforms: ["Web App"],
    category: 'web',
    url: "https://genifinance.com/home",
    initials: "GF",
    initialsColor: "#F59E0B" // Amber/gold for finance theme
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
    id: 11,
    title: "Tiny Steps Tracker",
    description: "From first smiles to first steps, capture and celebrate every milestone with our comprehensive child development tracker designed for modern parents.",
    image: "/tiny.png",
    platforms: ["Web App"],
    category: 'web',
    url: "https://tinystepstracker.com/",
    initials: "TST",
    initialsColor: "#10B981" // Emerald green for child development theme
  },
  {
    id: 12,
    title: "Wine Sage AI",
    description: "Discover perfect wine pairings for any meal or occasion. Choose your food and find the ideal wine match with our intelligent wine recommendation system.",
    image: "/winelogo.png",
    platforms: ["Web App"],
    category: 'web',
    url: "https://www.winesageai.com/",
    initials: "WS",
    initialsColor: "#800020" // Burgundy color for wine theme
  },
  {
    id: 13,
    title: "AI Future - AI Tools Directory",
    description: "Discover the best AI tools across different categories. A curated collection of cutting-edge AI tools for writing, video, marketing, SEO, and design to help you work smarter.",
    image: "/ailogo.png",
    platforms: ["Web App"],
    category: 'web',
    url: "https://www.artificialintelligencefuture.com/",
    initials: "AF",
    initialsColor: "#6366F1" // Indigo color for AI/tech theme
  },
  {
    id: 14,
    title: "Recipes for Gods",
    description: "From quick weeknight dinners to impressive weekend treats, find your next favorite recipe in our carefully curated collection of delicious dishes.",
    image: "/recipes.png",
    platforms: ["Web App"],
    category: 'web',
    url: "https://recipes4gods.com/",
    initials: "RG",
    initialsColor: "#DC2626" // Red color for food/recipe theme
  },
  {
  id: 15,
  title: "Fishing & Hunting Tips",
  description: "Discover expert strategies, gear reviews, and seasonal insights for fishing and hunting around the world. Perfect for beginners and seasoned outdoorsmen alike.",
  image: "Fishandhuntlogo.png",
  platforms: ["Web App"],
  category: 'web',
  url: "https://www.fishingandhuntingtips.com/",
  initials: "FHT",
  initialsColor: "#065F46" // Deep green for outdoors and nature theme
}
];
