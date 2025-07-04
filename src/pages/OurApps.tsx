import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppCard from '@/components/AppCard';
import AppFilterTabs from '@/components/AppFilterTabs';
import AppsCTA from '@/components/AppsCTA';
import { allApps, type App } from '@/data/appData';

const OurApps: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ios' | 'web'>('all');
  const [visibleApps, setVisibleApps] = useState<App[]>([]);
  
  useEffect(() => {
    filterApps(activeFilter);
  }, [activeFilter]);
  
  const filterApps = (filter: 'all' | 'ios' | 'web') => {
    let filtered: App[];
    
    if (filter === 'all') {
      filtered = allApps;
    } else if (filter === 'ios') {
      filtered = allApps.filter(app => app.category === 'ios' || app.category === 'both');
    } else {
      filtered = allApps.filter(app => app.category === 'web' || app.category === 'both');
    }
    
    setVisibleApps(filtered);
  };

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
  }, [visibleApps]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 px-6 bg-hero-pattern">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">Our Applications</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-delay-1">
            Discover our collection of innovative iOS and web applications designed with the future in mind.
          </p>
        </div>
      </section>
      
      {/* Filter Tabs */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <AppFilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          
          {/* Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleApps.map((app) => (
              <AppCard
                key={app.id}
                title={app.title}
                description={app.description}
                image={app.image}
                platforms={app.platforms}
                url={app.url}
                initials={app.initials}
                initialsColor={app.initialsColor}
                className="animate-on-scroll opacity-0"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <AppsCTA />
      
      <Footer />
    </div>
  );
};

export default OurApps;
