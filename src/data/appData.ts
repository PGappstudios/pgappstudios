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
    url: "https://www.genifinance.com/home",
    initials: "GF",
    initialsColor: "#F59E0B" // Amber/gold for finance theme
  },
  {
    id: 10,
    title: "Tiny Steps Tracker",
    description: "From first smiles to first steps, capture and celebrate every milestone with our comprehensive child development tracker designed for modern parents.",
    image: "/tiny.png",
    platforms: ["Web App"],
    category: 'web',
    url: "https://www.tinystepstracker.com/",
    initials: "TST",
    initialsColor: "#06B6D4" // Cyan color for child development theme
  }
];
