import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogService, BlogPost as BlogPostType } from '@/lib/blogService';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('No post ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fetchedPost = await BlogService.getPostBySlug(id);
        
        if (!fetchedPost) {
          setError('Post not found');
        } else {
          setPost(fetchedPost);
        }
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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
            <p className="text-white text-lg font-medium">Loading blog post...</p>
            <p className="text-gray-400 text-sm mt-2">Fetching content from GitHub</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
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
            <h2 className="text-xl font-bold text-white mb-3">Post Not Found</h2>
            <p className="text-gray-400 mb-6">{error || 'The blog post you\'re looking for doesn\'t exist.'}</p>
            <Link to="/blog" className="neon-button group">
              <span className="z-10 relative">Back to Blog</span>
            </Link>
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
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back to Blog */}
          <div className="mb-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-gray-400 hover:text-pg-purple transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Post Header */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                {post.category}
              </span>
              <span className="text-gray-400 text-sm">{post.readTime} min read</span>
              <span className="text-gray-400 text-sm">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {post.title}
            </h1>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-center text-gray-400">
              <span className="font-medium">By {post.author}</span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center pt-4">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 px-6 bg-pg-dark relative flex-1">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,41,247,0.05)_0%,rgba(10,1,24,0)_70%)]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <article className="glass-card p-8 md:p-12">
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-white mt-8 mb-6 first:mt-0 border-b border-white/10 pb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4 first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-white mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-lg font-bold text-white mt-4 mb-2">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-300 mb-6 leading-relaxed text-base">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="text-gray-300 mb-6 pl-6 space-y-2 list-disc">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="text-gray-300 mb-6 pl-6 space-y-2 list-decimal">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-300 leading-relaxed">
                      {children}
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-white font-semibold">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-gray-200 italic">
                      {children}
                    </em>
                  ),
                  code: ({ children }) => (
                    <code className="bg-white/10 text-pg-cyan px-2 py-1 rounded text-sm border border-white/20">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-white/5 text-gray-300 p-6 rounded-lg overflow-x-auto mb-6 border border-white/10">
                      {children}
                    </pre>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-pg-purple pl-6 my-6 text-gray-300 italic bg-white/5 py-4 rounded-r-lg">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a 
                      href={href} 
                      className="text-pg-purple hover:text-pg-pink underline transition-colors" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-6">
                      <table className="w-full border-collapse border border-white/20 rounded-lg overflow-hidden">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-white/20 px-4 py-2 bg-white/10 text-white font-semibold text-left">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-white/20 px-4 py-2 text-gray-300">
                      {children}
                    </td>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Link to="/blog" className="neon-button group">
              <span className="z-10 relative">Back to All Posts</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;