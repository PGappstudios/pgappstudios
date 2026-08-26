import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import OurApps from "./pages/OurApps";
import AppDetail from "./pages/AppDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import HealthHub from "./pages/health/HealthHub";
import HealthAppDetail from "./pages/health/HealthAppDetail";
import HealthGuides from "./pages/health/HealthGuides";
import HealthGuide from "./pages/health/HealthGuide";
import HealthAbout from "./pages/health/HealthAbout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/our-apps" element={<OurApps />} />
            <Route path="/apps/:slug" element={<AppDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/health" element={<HealthHub />} />
            <Route path="/health/apps/:slug" element={<HealthAppDetail />} />
            <Route path="/health/guides" element={<HealthGuides />} />
            <Route path="/health/guides/:slug" element={<HealthGuide />} />
            <Route path="/health/about" element={<HealthAbout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;