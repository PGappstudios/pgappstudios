import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import AppRoutes from './AppRoutes';
import { takeSSRHead, type HeadData } from '@/lib/ssrHead';

/**
 * Renders one route to HTML at build time. No browser involved, so this runs
 * anywhere the build runs, including Vercel.
 */
export function render(url: string): { html: string; head: HeadData | null } {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Must mirror src/App.tsx exactly, or the client tree will not line
            up with this markup and hydration fails on every page. */}
        <Toaster />
        <Sonner />
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );

  return { html, head: takeSSRHead() };
}
