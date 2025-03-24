
import React, { useEffect } from 'react';
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

const Blog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of Mobile App Design in 2023",
      excerpt: "Explore the latest trends in mobile app design and how they're shaping user experiences across platforms.",
      date: "August 15, 2023",
      author: "Alex Turner",
      category: "Design"
    },
    {
      id: 2,
      title: "Building Secure Web Applications: Best Practices",
      excerpt: "Learn essential security practices to protect your web applications from common vulnerabilities and threats.",
      date: "July 28, 2023",
      author: "Sam Rivera",
      category: "Security"
    },
    {
      id: 3,
      title: "How AI is Transforming App Development",
      excerpt: "Discover how artificial intelligence is revolutionizing the way we build, test, and deploy mobile and web applications.",
      date: "June 12, 2023",
      author: "Maya Johnson",
      category: "Technology"
    },
    {
      id: 4,
      title: "Optimizing App Performance: A Developer's Guide",
      excerpt: "A comprehensive guide to improving the speed and efficiency of your applications across different devices.",
      date: "May 5, 2023",
      author: "Chris Wong",
      category: "Development"
    }
  ];

  const observerRef = React.useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        animatedElements.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 px-6 bg-hero-pattern">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">Our Blog</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-delay-1">
            Insights, tutorials, and updates from the PG App Studios team.
          </p>
        </div>
      </section>
      
      {/* Blog Posts */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <div key={post.id} className="glass-card p-8 opacity-0 animate-on-scroll">
                <span className="inline-block px-3 py-1 bg-pg-purple/20 text-pg-purple text-xs rounded-full mb-4">
                  {post.category}
                </span>
                <h2 className="text-2xl font-bold text-white mb-3 hover:text-pg-purple transition-colors duration-300">
                  <a href="#">{post.title}</a>
                </h2>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-sm text-gray-500">By {post.author}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="neon-button group animate-on-scroll opacity-0">
              <span className="z-10 relative">Load More</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20 px-6 bg-gradient-to-br from-pg-purple/10 to-pg-blue/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4 animate-on-scroll opacity-0">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-300 mb-8 animate-on-scroll opacity-0">
            Stay updated with the latest articles, tutorials, and app development insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-on-scroll opacity-0">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 flex-grow focus:outline-none focus:ring-2 focus:ring-pg-purple"
            />
            <button className="neon-button whitespace-nowrap">
              <span className="z-10 relative">Subscribe</span>
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;
