import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  {
    id: 11,
    title: 'SwiftUI Best Practices for 2025',
    excerpt: 'Essential SwiftUI techniques and patterns every iOS developer should know for building modern, performant applications.',
    date: 'January 10, 2025',
    author: 'PG App Studios',
    category: 'Development',
  },
  {
    id: 12,
    title: 'App Store Optimization: Complete Guide',
    excerpt: 'Master the art of App Store Optimization with proven strategies to increase your app\'s visibility and downloads.',
    date: 'January 5, 2025',
    author: 'PG App Studios',
    category: 'Apps',
  },
  {
    id: 13,
    title: 'Building Accessible iOS Apps',
    excerpt: 'Learn how to create inclusive iOS applications that work for everyone, including users with disabilities.',
    date: 'December 30, 2024',
    author: 'PG App Studios',
    category: 'Development',
  },
  {
    id: 14,
    title: 'Core Data vs SwiftData: Which to Choose?',
    excerpt: 'A comprehensive comparison of Core Data and SwiftData to help you choose the right data persistence solution.',
    date: 'December 25, 2024',
    author: 'PG App Studios',
    category: 'Development',
  },
  {
    id: 15,
    title: 'Mobile App Security Best Practices',
    excerpt: 'Essential security practices every mobile app developer should implement to protect user data and app integrity.',
    date: 'December 20, 2024',
    author: 'PG App Studios',
    category: 'Technology',
  },
  {
    id: 16,
    title: 'The Future of Augmented Reality in Apps',
    excerpt: 'Exploring the potential of AR technology in mobile applications and how it\'s changing user experiences.',
    date: 'December 15, 2024',
    author: 'PG App Studios',
    category: 'Technology',
  },
  {
    id: 17,
    title: 'Monetization Strategies for Indie Developers',
    excerpt: 'Effective ways independent developers can monetize their apps without compromising user experience.',
    date: 'December 10, 2024',
    author: 'PG App Studios',
    category: 'Apps',
  },
  {
    id: 18,
    title: 'Machine Learning in iOS Apps',
    excerpt: 'How to integrate machine learning capabilities into your iOS applications using Core ML and Create ML.',
    date: 'December 5, 2024',
    author: 'PG App Studios',
    category: 'Development',
  },
];

const POSTS_PER_PAGE = 12;

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sort posts by date (newest first) and calculate pagination
  const { sortedPosts, totalPages, currentPosts } = useMemo(() => {
    // Parse dates and sort (newest first)
    const sorted = [...blogPosts].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    const totalPages = Math.ceil(sorted.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentPosts = sorted.slice(startIndex, endIndex);

    return {
      sortedPosts: sorted,
      totalPages,
      currentPosts
    };
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0118] to-[#1E0142]">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Blog</h1>
          <p className="text-gray-300 text-lg">
            Showing {currentPosts.length} of {sortedPosts.length} posts
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post) => (
            <Link 
              to={`/blog/${post.id}`} 
              key={post.id}
              className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              <article>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    post.category === 'Apps' ? 'bg-purple-600' :
                    post.category === 'Technology' ? 'bg-blue-600' :
                    post.category === 'Development' ? 'bg-green-600' :
                    'bg-orange-600'
                  }`}>
                    {post.category}
                  </span>
                  <time className="text-gray-400 text-sm">{post.date}</time>
                </div>
                <h2 className="text-xl font-semibold text-white mb-3 hover:text-purple-400 transition-colors">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mb-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={`cursor-pointer text-white hover:text-purple-400 hover:bg-white/10 ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                />
              </PaginationItem>
              
              {generatePageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === 'ellipsis' ? (
                    <PaginationEllipsis className="text-gray-400" />
                  ) : (
                    <PaginationLink
                      onClick={() => handlePageChange(page as number)}
                      isActive={currentPage === page}
                      className={`cursor-pointer transition-colors ${
                        currentPage === page
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'text-white hover:text-purple-400 hover:bg-white/10'
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={`cursor-pointer text-white hover:text-purple-400 hover:bg-white/10 ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Blog;