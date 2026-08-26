import { Routes, Route } from "react-router-dom";
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

/**
 * The route table, shared by the browser entry (src/App.tsx) and the static
 * generation entry (src/entry-server.tsx) so both always render the same tree.
 */
const AppRoutes = () => (
  <>
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
  </>
);

export default AppRoutes;
