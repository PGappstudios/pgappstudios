import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSEO } from '@/lib/useSEO';
import { allApps } from '@/data/appData';
import AppCard from '@/components/AppCard';
import PhoneMarquee from '@/components/PhoneMarquee';
import { BlogService } from '@/lib/blogService';

const featuredAppIds = [24, 23, 31, 22, 25, 17];

const Index: React.FC = () => {
  useSEO({
    title: 'Learn European Portuguese with Portugal Lifestyle Pro | PG App Studios',
    description: 'Home of Portugal Lifestyle Pro — learn real European Portuguese with Portugal\'s culture and history built in. Plus pickleball, fitness and game apps.',
    canonical: 'https://www.pgappstudios.com/',
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PG App Studios",
      "url": "https://www.pgappstudios.com",
      "logo": "https://www.pgappstudios.com/PGlogo.png",
      "description": "PG App Studios builds iOS apps used daily by real people — language learning, fitness, sports, games, and more.",
      "founder": { "@type": "Person", "name": "Pedro Gregório" },
      "email": "pgmetastudios@gmail.com",
      "sameAs": [
        "https://apps.apple.com/pt/developer/pedro-gregorio/id1738279962",
        "https://x.com/PG_App_Studios",
        "https://www.instagram.com/pg_app_studios",
        "https://www.linkedin.com/in/pg-studios-5b0434353/",
        "https://www.portugal-lifestyle.com/",
        "https://www.dinkup.app/",
        "https://www.gritvit.com/"
      ]
    }
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const [recentPosts, setRecentPosts] = React.useState<any[]>([]);

  useEffect(() => {
    BlogService.getAllPosts().then(posts => setRecentPosts(posts.slice(0, 3)));
  }, []);

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
  }, [recentPosts]);

  const featuredApps = featuredAppIds
    .map(id => allApps.find(app => app.id === id))
    .filter((app): app is NonNullable<typeof app> => Boolean(app));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 bg-hero-pattern overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pg-purple/20 rounded-full blur-[100px]" />
        </div>

        {/* Floating iPhones (decorative) */}
        <div aria-hidden="true" className="hidden lg:block absolute left-[3%] top-32 hero-phone opacity-80" style={{ ['--tilt' as string]: '-10deg', animationDuration: '7s' }}>
          <div className="phone-frame" style={{ width: '132px', transform: 'rotate(-10deg)' }}>
            <div className="phone-screen">
              <div className="flex-1 flex items-center justify-center pt-6">
                <img src="/portugallifestylelogo.png" alt="" loading="lazy" width={100} height={100} className="w-[78%] aspect-square object-cover rounded-2xl" />
              </div>
              <p className="text-white/90 text-[10px] font-semibold text-center pb-3">Portugal Lifestyle</p>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="hidden lg:block absolute right-[3%] top-40 hero-phone opacity-80" style={{ ['--tilt' as string]: '10deg', animationDuration: '8.5s', animationDelay: '1.2s' }}>
          <div className="phone-frame" style={{ width: '132px', transform: 'rotate(10deg)' }}>
            <div className="phone-screen">
              <div className="flex-1 flex items-center justify-center pt-6">
                <img src="/dinkuplogo.png" alt="" loading="lazy" width={100} height={100} className="w-[78%] aspect-square object-cover rounded-2xl" />
              </div>
              <p className="text-white/90 text-[10px] font-semibold text-center pb-3">DinkUp</p>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="hidden xl:block absolute right-[16%] top-16 hero-phone opacity-50" style={{ ['--tilt' as string]: '6deg', animationDuration: '9.5s', animationDelay: '2s' }}>
          <div className="phone-frame" style={{ width: '92px', transform: 'rotate(6deg)' }}>
            <div className="phone-screen">
              <div className="flex-1 flex items-center justify-center pt-5">
                <img src="/cyclebuddylogo.png" alt="" loading="lazy" width={70} height={70} className="w-[76%] aspect-square object-cover rounded-xl" />
              </div>
              <p className="text-white/80 text-[8px] font-semibold text-center pb-2">CycleBuddy</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <p className="text-pg-purple font-semibold uppercase tracking-widest text-sm animate-fade-in">
              PG App Studios
            </p>
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-white animate-fade-in">Apps People </span>
              <span className="gradient-text animate-fade-in-delay-1">Actually Use</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-delay-3">
              Home of <strong className="text-white">Portugal Lifestyle Pro</strong> — the app that teaches real European Portuguese with Portugal's culture and history built in. Plus pickleball, fitness, games and more. All free on the App Store.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
              <Link to="/apps/portugal-lifestyle-pro" className="neon-button group">
                <span className="z-10 relative">Learn European Portuguese</span>
              </Link>
              <Link to="/our-apps" className="px-8 py-3 border border-white/20 text-white rounded-lg hover:border-pg-purple hover:text-pg-purple transition-all duration-300 text-center">
                Browse All Apps
              </Link>
            </div>

            {/* App count badge */}
            <p className="text-gray-500 text-sm animate-fade-in-delay-3">
              {allApps.filter(a => a.category === 'ios').length}+ iOS apps available now
            </p>
          </div>
        </div>
      </section>

      {/* Flagship: Portugal Lifestyle Pro spotlight */}
      <section className="py-20 px-6 relative overflow-hidden" aria-label="Portugal Lifestyle Pro — our flagship app">
        <div className="absolute inset-0 bg-gradient-to-br from-pg-purple/10 via-transparent to-pg-blue/10"></div>
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-pg-purple font-semibold uppercase tracking-widest text-sm mb-4">Our flagship app</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Real European Portuguese.<br />
              <span className="gradient-text">Real culture. Real history.</span>
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Most apps teach Brazilian Portuguese — Duolingo doesn't offer European Portuguese at all.
              <strong className="text-white"> Portugal Lifestyle Pro</strong> teaches the language the way it's
              actually spoken in Portugal, with the culture, food, history and slang woven into every lesson.
              No other app does that.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Genuine European Portuguese — never a Brazilian course with a flag swapped',
                "Portugal's culture, history and traditions built into the lessons",
                'Made for expats, movers, AIMA and the A2 citizenship level',
                'Rated 4.7★ on the App Store · iOS & Android',
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-gray-300">
                  <span className="text-pg-purple font-bold mt-0.5">✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apps/portugal-lifestyle-pro" className="neon-button group">
                <span className="z-10 relative">Discover Portugal Lifestyle Pro</span>
              </Link>
              <a
                href="https://apps.apple.com/pt/app/portugal-lifestyle-pro/id6757080577?l=en-GB"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-white/20 text-white rounded-lg hover:border-pg-purple hover:text-pg-purple transition-all duration-300 text-center"
              >
                Download on the App Store
              </a>
            </div>
          </div>
          <div className="hidden md:flex justify-center" aria-hidden="true">
            <div className="hero-phone" style={{ ['--tilt' as string]: '-4deg', animationDuration: '8s' }}>
              <div className="phone-frame" style={{ width: '230px', transform: 'rotate(-4deg)' }}>
                <div className="phone-screen">
                  <div className="flex-1 flex items-center justify-center pt-8">
                    <img
                      src="/portugallifestylelogo.png"
                      alt=""
                      loading="lazy"
                      width={180}
                      height={180}
                      className="w-[80%] aspect-square object-cover rounded-3xl shadow-2xl shadow-black/60"
                    />
                  </div>
                  <div className="px-3 pb-5 pt-3 text-center bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-sm font-bold">Portugal Lifestyle Pro</p>
                    <p className="text-pg-purple text-xs font-semibold mt-1">★ 4.7 · Learn it. Live it.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Apps Section */}
      <section className="py-20 px-6 bg-black/25 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,41,247,0.08)_0%,rgba(10,1,24,0)_70%)]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white animate-on-scroll opacity-0">
              Featured Apps
            </h2>
            <p className="text-gray-400 mt-3 animate-on-scroll opacity-0">
              Handpicked from our portfolio — download free on the App Store
            </p>
            <div className="w-24 h-1 bg-pg-purple mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(184,41,247,0.7)] animate-on-scroll opacity-0"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredApps.map((app) => (
              <AppCard
                key={app.id}
                title={app.title}
                description={app.description}
                image={app.image}
                platforms={app.platforms}
                url={app.url}
                androidUrl={app.androidUrl}
                initials={app.initials}
                initialsColor={app.initialsColor}
                isWebsite={app.category === 'web'}
                slug={app.slug}
                className="animate-on-scroll opacity-0"
              />
            ))}
          </div>

          <div className="text-center">
            <Link to="/our-apps" className="text-pg-purple hover:text-pg-pink transition-colors font-medium">
              See all {allApps.filter(a => a.category === 'ios').length} iOS apps →
            </Link>
          </div>
        </div>
      </section>

      {/* iPhone showcase — every app gliding by */}
      <PhoneMarquee />

      {/* About Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pg-purple/5 to-pg-blue/5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center animate-on-scroll opacity-0">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-pg-purple/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pg-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Built for iPhone</h3>
              <p className="text-gray-400">Every app is designed native for iOS — fast, smooth, and optimized for the App Store experience users expect.</p>
            </div>

            <div className="glass-card p-8 text-center animate-on-scroll opacity-0">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-pg-purple/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pg-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Privacy by Default</h3>
              <p className="text-gray-400">No hidden tracking. Most of our apps collect zero data. Your phone, your data — we keep it that way.</p>
            </div>

            <div className="glass-card p-8 text-center animate-on-scroll opacity-0">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-pg-purple/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pg-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Free to Download</h3>
              <p className="text-gray-400">Every app starts free. No paywalls before you've seen the value. Download, try it, and upgrade only if it improves your life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {recentPosts.length > 0 && (
        <section className="py-20 px-6 bg-black/25 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,41,247,0.05)_0%,rgba(10,1,24,0)_70%)]"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white animate-on-scroll opacity-0">
                Latest from the Blog
              </h2>
              <p className="text-gray-400 mt-3 animate-on-scroll opacity-0">
                App guides, tips, and updates from PG App Studios
              </p>
              <div className="w-24 h-1 bg-pg-purple mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(184,41,247,0.7)] animate-on-scroll opacity-0"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group glass-card p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-pg-purple/20 animate-on-scroll opacity-0"
                >
                  <span className="text-xs text-pg-purple font-medium uppercase tracking-wide">{post.category}</span>
                  <h3 className="text-lg font-bold text-white mt-2 mb-3 group-hover:text-pg-purple transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
                  <p className="text-pg-purple text-sm mt-4 font-medium">Read more →</p>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link to="/blog" className="text-pg-purple hover:text-pg-pink transition-colors font-medium">
                View all posts →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pg-purple/10 to-pg-blue/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-on-scroll opacity-0">
            A new app for every part of your life
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-on-scroll opacity-0">
            From learning Portuguese to tracking your fasting window to finding a pickleball game — PG App Studios has an app for it. All free to download.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/our-apps" className="neon-button group animate-on-scroll opacity-0">
              <span className="z-10 relative">Browse All Apps</span>
            </Link>
            <Link to="/contact" className="px-8 py-3 border border-white/20 text-white rounded-lg hover:border-pg-purple hover:text-pg-purple transition-all duration-300 animate-on-scroll opacity-0">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
