
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppCard from '@/components/AppCard';
import { cn } from '@/lib/utils';

interface App {
  id: number;
  title: string;
  description: string;
  image: string;
  platforms: string[];
  category: 'ios' | 'web' | 'both';
}

const OurApps: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ios' | 'web'>('all');
  const [visibleApps, setVisibleApps] = useState<App[]>([]);
  
  const allApps: App[] = [
    {
      id: 1,
      title: "NeoTask",
      description: "A futuristic task management app with AI-powered prioritization and smart reminders.",
      image: "/lovable-uploads/52881a08-349e-4feb-817b-799b028ec8ae.png",
      platforms: ["iOS App"],
      category: 'ios'
    },
    {
      id: 2,
      title: "QuantumChat",
      description: "Secure messaging platform with end-to-end encryption and disappearing messages.",
      image: "/lovable-uploads/ca55fb9d-fb6c-4a3a-a372-746b5f119630.png",
      platforms: ["Web App"],
      category: 'web'
    },
    {
      id: 3,
      title: "PulseTrack",
      description: "Health monitoring application that tracks vital signs and provides personalized insights.",
      image: "/lovable-uploads/5417ea4a-f8da-4570-97fe-8deeb9698d04.png",
      platforms: ["iOS App", "Web App"],
      category: 'both'
    },
    {
      id: 4,
      title: "StellarNav",
      description: "Advanced navigation system with AR capabilities and real-time traffic analysis.",
      image: "/lovable-uploads/52881a08-349e-4feb-817b-799b028ec8ae.png",
      platforms: ["iOS App"],
      category: 'ios'
    },
    {
      id: 5,
      title: "CodeForge",
      description: "Collaborative coding platform with AI-assisted suggestions and real-time pair programming.",
      image: "/lovable-uploads/ca55fb9d-fb6c-4a3a-a372-746b5f119630.png",
      platforms: ["Web App"],
      category: 'web'
    },
    {
      id: 6,
      title: "HoloLearn",
      description: "Educational platform using AR technology to create immersive learning experiences.",
      image: "/lovable-uploads/5417ea4a-f8da-4570-97fe-8deeb9698d04.png",
      platforms: ["iOS App", "Web App"],
      category: 'both'
    }
  ];
  
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
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white/5 rounded-full p-1">
              <button
                onClick={() => setActiveFilter('all')}
                className={cn(
                  'tab-button',
                  activeFilter === 'all' && 'active'
                )}
              >
                All Apps
              </button>
              <button
                onClick={() => setActiveFilter('ios')}
                className={cn(
                  'tab-button',
                  activeFilter === 'ios' && 'active'
                )}
              >
                iOS Apps
              </button>
              <button
                onClick={() => setActiveFilter('web')}
                className={cn(
                  'tab-button',
                  activeFilter === 'web' && 'active'
                )}
              >
                Web Apps
              </button>
            </div>
          </div>
          
          {/* Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleApps.map((app, index) => (
              <AppCard
                key={app.id}
                title={app.title}
                description={app.description}
                image={app.image}
                platforms={app.platforms}
                className="animate-on-scroll opacity-0"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden mt-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pg-purple/10 to-pg-blue/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-on-scroll opacity-0">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-on-scroll opacity-0">
            We create tailored applications to meet your specific business needs. Get in touch to discuss your project.
          </p>
          <a
            href="/contact"
            className="neon-button group animate-on-scroll opacity-0"
          >
            <span className="z-10 relative">Contact Us</span>
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default OurApps;
