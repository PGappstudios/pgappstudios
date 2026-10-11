import React from 'react';

type P = React.SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 18): React.SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
});

export const Arrow = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const Search = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const Menu = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M4 8h16M4 16h16" /></svg>
);
export const Close = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Check = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const Globe = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" /></svg>
);
export const Mail = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>
);
export const Clock = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const Star = ({ size = 16, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8L12 2.8z" />
  </svg>
);
export const Apple = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.72-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.75 2.21 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.71.71 2.88.69 1.19-.02 1.94-1.08 2.67-2.14.84-1.23 1.19-2.42 1.21-2.48-.03-.01-2.32-.89-2.34-3.54zM14.2 6.13c.61-.74 1.02-1.76.91-2.78-.88.04-1.94.59-2.57 1.32-.56.65-1.06 1.69-.93 2.69.98.08 1.98-.5 2.59-1.23z" />
  </svg>
);
export const GooglePlay = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M4.2 2.6c-.3.3-.4.7-.4 1.2v16.4c0 .5.1.9.4 1.2l.1.1 9.2-9.2v-.2L4.3 2.5l-.1.1zm12.4 12.8-3.1-3.1v-.2l3.1-3.1.1.1 3.6 2.1c1 .6 1 1.6 0 2.2l-3.6 2-.1 0zm-.1.1L13.4 12l-9.2 9.4c.3.4.9.4 1.6 0l10.7-5.9m0-10.9L5.8 2.6c-.7-.4-1.3-.3-1.6.1l9.2 9.3 3.1-3.1z" />
  </svg>
);

// Brand marks (simple glyphs)
export const XLogo = (p: P) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
export const InstagramLogo = (p: P) => (
  <svg {...base(p.size)}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg>
);
export const LinkedInLogo = (p: P) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
);
export const TikTokLogo = (p: P) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" /></svg>
);
export const ThreadsLogo = (p: P) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12.19 24h-.01c-3.58-.02-6.33-1.2-8.18-3.51C2.35 18.44 1.5 15.59 1.47 12v-.01c.03-3.58.88-6.43 2.53-8.48C5.85 1.2 8.6.02 12.18 0h.01c2.75.02 5.04.73 6.83 2.1 1.68 1.29 2.86 3.13 3.51 5.47l-2.04.57c-1.1-3.96-3.9-5.99-8.3-6.02-2.91.02-5.11.94-6.54 2.72C4.3 6.51 3.62 8.94 3.62 12.06c0 3.13.68 5.55 2.02 7.22 1.43 1.78 3.63 2.7 6.54 2.72 2.62-.02 4.36-.63 5.8-2.05 1.65-1.62 1.62-3.6 1.09-4.81-.31-.71-.87-1.3-1.63-1.75-.19 1.35-.62 2.44-1.28 3.27-.88 1.1-2.13 1.7-3.73 1.79-1.21.07-2.37-.22-3.27-.81-1.07-.69-1.69-1.75-1.76-2.98-.07-1.2.41-2.3 1.33-3.1.88-.76 2.12-1.2 3.59-1.29 1.08-.06 2.09-.01 3.03.14-.12-.73-.37-1.3-.73-1.71-.5-.58-1.29-.87-2.33-.88h-.03c-.84 0-1.98.23-2.71 1.31l-1.74-1.17c.97-1.44 2.55-2.24 4.45-2.24h.04c3.18.02 5.07 1.97 5.26 5.37.11.05.21.09.32.14 1.48.7 2.56 1.75 3.13 3.05.79 1.8.86 4.74-1.53 7.08-1.83 1.79-4.05 2.6-7.2 2.62zm1-11.69c-.24 0-.48.01-.73.02-1.82.1-2.95.94-2.89 2.12.07 1.24 1.44 1.82 2.76 1.75 1.21-.07 2.79-.54 3.06-3.67-.66-.14-1.39-.22-2.2-.22z" /></svg>
);
export const FacebookLogo = (p: P) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" /></svg>
);
