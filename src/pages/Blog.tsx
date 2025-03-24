import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'MegaConverter: Revolutionizing Unit Conversion',
    excerpt: 'Discover how MegaConverter is transforming everyday calculations with its comprehensive suite of conversion tools, from basic units to complex scientific calculations.',
    date: 'March 15, 2025',
    author: 'PG App Studios',
    category: 'Apps',
    slug: 'megaconverter-unit-conversion'
  },
  {
    id: 2,
    title: 'Star Seekers: A New Era of Mobile Gaming',
    excerpt: 'Explore the exciting world of Star Seekers, our latest mobile game that combines casual gaming with competitive elements and stunning visuals.',
    date: 'March 10, 2025',
    author: 'PG App Studios',
    category: 'Apps',
    slug: 'star-seekers-mobile-gaming'
  },
  {
    id: 3,
    title: 'The Rise of AI in SaaS Applications',
    excerpt: 'An in-depth look at how artificial intelligence is reshaping the Software as a Service landscape and revolutionizing user experiences.',
    date: 'March 1, 2025',
    author: 'PG App Studios',
    category: 'Technology',
    slug: 'ai-in-saas-applications'
  },
  {
    id: 4,
    title: 'DocyScan: Smart Document Management',
    excerpt: 'Learn about DocyScan's innovative approach to document scanning and management, featuring advanced OCR and intelligent organization.',
    date: 'February 20, 2025',
    author: 'PG App Studios',
    category: 'Apps',
    slug: 'docyscan-document-management'
  },
  {
    id: 5,
    title: 'AI Agents: The Future of Automation',
    excerpt: 'Discover how AI agents are transforming automation and creating new possibilities for businesses and developers alike.',
    date: 'February 15, 2025',
    author: 'PG App Studios',
    category: 'Technology',
    slug: 'ai-agents-automation'
  },
  {
    id: 6,
    title: 'BabyID AI: Tracking Growth with Intelligence',
    excerpt: 'See how BabyID AI is using artificial intelligence to help parents track and celebrate their baby's growth and development.',
    date: 'February 10, 2025',
    author: 'PG App Studios',
    category: 'Apps',
    slug: 'babyid-ai-growth-tracking'
  },
  {
    id: 7,
    title: 'The State of iOS App Development',
    excerpt: 'A comprehensive overview of current trends and best practices in iOS app development, including SwiftUI and latest Apple technologies.',
    date: 'February 1, 2025',
    author: 'PG App Studios',
    category: 'Development',
    slug: 'ios-app-development-state'
  },
  {
    id: 8,
    title: 'World Time Meetings: Global Collaboration Made Easy',
    excerpt: 'How World Time Meetings is simplifying international collaboration with its intuitive time zone management features.',
    date: 'January 25, 2025',
    author: 'PG App Studios',
    category: 'Apps',
    slug: 'world-time-meetings-collaboration'
  },
  {
    id: 9,
    title: 'Random Generator Tools: Beyond Random Numbers',
    excerpt: 'Explore the versatility of our Random Generator Tools and how they're helping users make decisions and spark creativity.',
    date: 'January 20, 2025',
    author: 'PG App Studios',
    category: 'Apps',
    slug: 'random-generator-tools'
  },
  {
    id: 10,
    title: 'Cursor AI: The Future of Code Editing',
    excerpt: 'Discover how Cursor AI is revolutionizing the coding experience with its intelligent features and AI-powered assistance.',
    date: 'January 15, 2025',
    author: 'PG App Studios',
    category: 'Technology',
    slug: 'cursor-ai-code-editing'
  }
];

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-sm">{post.date}</span>
                </div>
                <h2 className="text-xl font-semibold text-white mb-3">{post.title}</h2>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <span>By {post.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
