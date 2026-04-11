import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10',
        scrolled ? 'bg-pg-dark/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/eee92472-0f2a-4f4e-a56e-d489de6b1130.png" 
            alt="PG App Studios" 
            className="h-8 w-8"
          />
          <span className="text-white text-xl font-medium">PG App Studios</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
          <NavLink to="/our-apps" active={location.pathname === "/our-apps"}>Our Apps</NavLink>
          <NavLink to="/blog" active={location.pathname === "/blog"}>Blog</NavLink>
          <NavLink to="/contact" active={location.pathname === "/contact"}>Contact</NavLink>
        </div>
        
        <div className="md:hidden">
          {/* Mobile menu button (simplified for this implementation) */}
          <button className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  active: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, active }) => {
  return (
    <Link
      to={to}
      className={cn(
        "relative text-white font-medium hover:text-pg-purple transition-colors duration-300",
        active && "text-pg-purple"
      )}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pg-purple rounded-full shadow-[0_0_5px_#B829F7]" />
      )}
    </Link>
  );
};

export default Navbar;
