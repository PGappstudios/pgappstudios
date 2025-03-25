import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'MegaConverter: Revolutionizing Unit Conversion',
    excerpt: 'Discover how MegaConverter is transforming everyday calculations with its comprehensive suite of conversion tools, from basic units to complex scientific calculations.',
    date: 'March 15, 2025',
    author: 'PG App Studios',
    category: 'Apps',
  },
  {
    id: 2,
    title: 'Star Seekers: A New Era of Mobile Gaming',
    excerpt: 'Explore the exciting world of Star Seekers, our latest mobile game that combines casual gaming with competitive elements and stunning visuals.',
    date: 'March 10, 2025',
    author: 'PG App Studios',
    category: 'Apps',
  },
  {
    id: 3,
    title: 'The Rise of AI in SaaS Applications',
    excerpt: 'An in-depth look at how artificial intelligence is reshaping the Software as a Service landscape and revolutionizing user experiences.',
    date: 'March 1, 2025',
    author: 'PG App Studios',
    category: 'Technology',
  },
  {
    id: 4,
    title: 'DocyScan: Smart Document Management',
    excerpt: 'Learn about DocyScan\'s innovative approach to document scanning and management, featuring advanced OCR and intelligent organization.',
    date: 'February 20, 2025',
    author: 'PG App Studios',
    category: 'Apps',
  },
  {
    id: 5,
    title: 'AI Agents: The Future of Automation',
    excerpt: 'Discover how AI agents are transforming automation and creating new possibilities for businesses and developers alike.',
    date: 'February 15, 2025',
    author: 'PG App Studios',
    category: 'Technology',
  },
  {
    id: 6,
    title: 'BabyID AI: Tracking Growth with Intelligence',
    excerpt: 'See how BabyID AI is using artificial intelligence to help parents track and celebrate their baby\'s growth and development.',
    date: 'February 10, 2025',
    author: 'PG App Studios',
    category: 'Apps',
  },
  {
    id: 7,
    title: 'The State of iOS App Development',
    excerpt: 'A comprehensive overview of current trends and best practices in iOS app development, including SwiftUI and latest Apple technologies.',
    date: 'February 1, 2025',
    author: 'PG App Studios',
    category: 'Development',
  },
  {
    id: 8,
    title: 'World Time Meetings: Global Collaboration Made Easy',
    excerpt: 'How World Time Meetings is simplifying international collaboration with its intuitive time zone management features.',
    date: 'January 25, 2025',
    author: 'PG App Studios',
    category: 'Apps',
  },
  {
    id: 9,
    title: 'Random Generator Tools: Beyond Random Numbers',
    excerpt: 'Explore the versatility of our Random Generator Tools and how they\'re helping users make decisions and spark creativity.',
    date: 'January 20, 2025',
    author: 'PG App Studios',
    category: 'Apps',
  },
  {
    id: 10,
    title: 'Cursor AI: The Future of Code Editing',
    excerpt: 'Discover how Cursor AI is revolutionizing the coding experience with its intelligent features and AI-powered assistance.',
    date: 'January 15, 2025',
    author: 'PG App Studios',
    category: 'Technology',
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0118] to-[#1E0142]">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              to={`/blog/${post.id}`} 
              key={post.id}
              className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all duration-300"
            >
              <article>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    post.category === 'Apps' ? 'bg-purple-600' :
                    post.category === 'Technology' ? 'bg-blue-600' :
                    'bg-green-600'
                  }`}>
                    {post.category}
                  </span>
                  <time className="text-gray-400 text-sm">{post.date}</time>
                </div>
                <h2 className="text-xl font-semibold text-white mb-3 hover:text-purple-400">
                  {post.title}
                </h2>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400">{post.author}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;