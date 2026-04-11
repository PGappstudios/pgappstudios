import { useState, useMemo, useEffect } from 'react';
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
import { BlogService, BlogPost } from '@/lib/blogService';

const POSTS_PER_PAGE = 12;

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const posts = await BlogService.getAllPosts();
        setBlogPosts(posts);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Sort posts by date (newest first) and calculate pagination
  const { sortedPosts, totalPages, currentPosts } = useMemo(() => {
    // Posts are already sorted by the service, but we'll sort again to be sure
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
  }, [blogPosts, currentPage]);

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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'apps':
        return 'bg-pg-purple/20 text-pg-purple border border-pg-purple/30';
      case 'development':
        return 'bg-pg-cyan/20 text-pg-cyan border border-pg-cyan/30';
      case 'technology':
        return 'bg-pg-blue/20 text-pg-blue border border-pg-blue/30';
      default:
        return 'bg-pg-pink/20 text-pg-pink border border-pg-pink/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-pg-dark">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pg-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg font-medium">Loading blog posts...</p>
            <p className="text-gray-400 text-sm mt-2">Fetching the latest content from GitHub</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-pg-dark">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-20 px-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">Error Loading Blog Posts</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="neon-button group"
            >
              <span className="z-10 relative">Try Again</span>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-pg-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 bg-hero-pattern">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pg-purple/20 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-white">Our </span>
              <span className="gradient-text">Blog</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Insights, tutorials, and updates from the world of app development and technology innovation
            </p>
            
            {/* Post counter */}
            {blogPosts.length > 0 && (
              <div className="pt-4">
                <p className="text-gray-400">
                  Showing <span className="text-pg-purple font-medium">{currentPosts.length}</span> of <span className="text-pg-purple font-medium">{sortedPosts.length}</span> posts
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20 px-6 bg-pg-dark relative flex-1">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,41,247,0.05)_0%,rgba(10,1,24,0)_70%)]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          
          {blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-pg-purple/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pg-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">No Blog Posts Yet</h2>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                We're working on creating amazing content for you. Check back soon for new posts about app development, technology, and innovation!
              </p>
              <Link to="/" className="neon-button group">
                <span className="z-10 relative">Explore Our Apps</span>
              </Link>
            </div>
          ) : (
            <>
              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {currentPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group glass-card p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-pg-purple/20"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-sm">{post.readTime} min read</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pg-purple transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span className="font-medium">By {post.author}</span>
                      <span>{new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag} 
                            className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-1 bg-white/5 text-gray-300 rounded text-xs border border-white/10">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                          className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-pg-purple/20 hover:text-pg-purple'} text-white border-white/20`}
                        />
                      </PaginationItem>
                      
                      {generatePageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                          {page === 'ellipsis' ? (
                            <PaginationEllipsis className="text-white" />
                          ) : (
                            <PaginationLink
                              onClick={() => handlePageChange(page as number)}
                              isActive={currentPage === page}
                              className={`cursor-pointer border-white/20 ${
                                currentPage === page 
                                  ? 'bg-pg-purple text-white border-pg-purple shadow-[0_0_10px_rgba(184,41,247,0.5)]' 
                                  : 'text-white hover:bg-pg-purple/20 hover:text-pg-purple hover:border-pg-purple/50'
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
                          className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-pg-purple/20 hover:text-pg-purple'} text-white border-white/20`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;