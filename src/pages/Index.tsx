
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppCard from '@/components/AppCard';

const Index: React.FC = () => {
  const featuredApps = [
    {
      title: "NeoTask",
      description: "A futuristic task management app with AI-powered prioritization and smart reminders.",
      image: "/lovable-uploads/52881a08-349e-4feb-817b-799b028ec8ae.png",
      platforms: ["iOS App"]
    },
    {
      title: "QuantumChat",
      description: "Secure messaging platform with end-to-end encryption and disappearing messages.",
      image: "/lovable-uploads/ca55fb9d-fb6c-4a3a-a372-746b5f119630.png",
      platforms: ["Web App"]
    },
    {
      title: "PulseTrack",
      description: "Health monitoring application that tracks vital signs and provides personalized insights.",
      image: "/lovable-uploads/5417ea4a-f8da-4570-97fe-8deeb9698d04.png",
      platforms: ["iOS App", "Web App"]
    }
  ];

  const observerRef = useRef<IntersectionObserver | null>(null);

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
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 bg-hero-pattern">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-pg-purple/20 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-white animate-fade-in">Innovative </span>
              <span className="gradient-text animate-fade-in-delay-1">Apps </span>
              <span className="text-white animate-fade-in-delay-2">for the Future</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-delay-3">
              PG App Studios creates cutting-edge iOS and web applications designed to transform how you interact with technology. Explore our portfolio of futuristic solutions.
            </p>
            
            <div className="pt-4 animate-fade-in-delay-3">
              <Link 
                to="/our-apps"
                className="neon-button group"
              >
                <span className="z-10 relative">Explore Our Apps</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Apps Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white animate-on-scroll opacity-0">
              Featured Applications
            </h2>
            <div className="w-24 h-1 bg-pg-purple mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(184,41,247,0.7)] animate-on-scroll opacity-0"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredApps.map((app, index) => (
              <AppCard
                key={app.title}
                title={app.title}
                description={app.description}
                image={app.image}
                platforms={app.platforms}
                className={`animate-on-scroll opacity-0`}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/our-apps"
              className="text-pg-purple hover:text-white transition-colors duration-300 inline-flex items-center"
            >
              <span>View All Applications</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-pg-dark relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,41,247,0.15)_0%,rgba(10,1,24,0)_70%)]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white animate-on-scroll opacity-0">
              Why Choose PG App Studios?
            </h2>
            <div className="w-24 h-1 bg-pg-purple mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(184,41,247,0.7)] animate-on-scroll opacity-0"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center animate-on-scroll opacity-0">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-pg-purple/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pg-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Innovative Design</h3>
              <p className="text-gray-400">Our applications feature cutting-edge designs that push the boundaries of user experience.</p>
            </div>
            
            <div className="glass-card p-8 text-center animate-on-scroll opacity-0">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-pg-purple/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pg-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Security First</h3>
              <p className="text-gray-400">We build all our applications with security and privacy as core principles from the ground up.</p>
            </div>
            
            <div className="glass-card p-8 text-center animate-on-scroll opacity-0">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-pg-purple/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pg-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Performance Driven</h3>
              <p className="text-gray-400">Our apps are optimized for speed, reliability, and efficient resource management.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pg-purple/10 to-pg-blue/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-on-scroll opacity-0">
            Ready to Experience the Future?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-on-scroll opacity-0">
            Discover how our innovative applications can transform your digital experience.
          </p>
          <Link
            to="/contact"
            className="neon-button group animate-on-scroll opacity-0"
          >
            <span className="z-10 relative">Get in Touch</span>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
