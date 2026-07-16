
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Keep unknown URLs out of the index (SPA fallback serves 200, so
    // without this a soft-404 could get indexed).
    document.title = "Page Not Found | PG App Studios";
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const previous = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, follow");
    return () => {
      // Restore on client-side navigation away from the 404.
      if (previous) robots.setAttribute("content", previous);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-6 py-24 bg-hero-pattern">
        <div className="text-center">
          <h1 className="text-9xl font-bold gradient-text animate-pulse-glow mb-6">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Page Not Found</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="neon-button group">
            <span className="z-10 relative">Return to Home</span>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
