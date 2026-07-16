import React from 'react';
import { Link } from 'react-router-dom';
import { appPages } from '@/data/appData';

// Public images live at the site root; normalise paths missing the leading slash.
const imgSrc = (image: string): string => {
  if (!image) return '';
  if (image.startsWith('http') || image.startsWith('/')) return image;
  return `/${image}`;
};

/**
 * Infinite conveyor of iPhones, one per app. The track is rendered twice for a
 * seamless loop; hovering pauses it and each phone links to its landing page.
 */
const PhoneMarquee: React.FC = () => {
  const apps = appPages;

  const phones = (keyPrefix: string, hidden: boolean) =>
    apps.map((app, i) => (
      <Link
        key={`${keyPrefix}-${app.slug}`}
        to={`/apps/${app.slug}`}
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : undefined}
        aria-label={hidden ? undefined : `${app.title} — see the app page`}
        className="phone-bob-item shrink-0 px-5"
        style={{
          animation: `phone-bob ${5.5 + (i % 4) * 0.9}s ease-in-out infinite`,
          animationDelay: `${(i % 5) * 0.6}s`,
          ['--tilt' as string]: `${i % 2 === 0 ? -3.5 : 3.5}deg`,
        }}
      >
        <div className="phone-frame" style={{ transform: `rotate(${i % 2 === 0 ? -3.5 : 3.5}deg)` }}>
          <div className="phone-screen">
            <div className="flex-1 flex items-center justify-center overflow-hidden pt-6">
              {app.image ? (
                <img
                  src={imgSrc(app.image)}
                  alt={hidden ? '' : `${app.title} app on iPhone`}
                  loading="lazy"
                  width={140}
                  height={140}
                  className="w-[80%] aspect-square object-cover rounded-2xl shadow-lg shadow-black/50"
                />
              ) : (
                <div
                  className="w-[70%] aspect-square rounded-2xl flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: app.initialsColor || '#9b87f5' }}
                >
                  {app.initials}
                </div>
              )}
            </div>
            <div className="px-2 pb-3 pt-2 text-center bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white text-[11px] font-semibold leading-tight line-clamp-2">{app.title}</p>
              <p className="text-pg-purple text-[9px] font-medium mt-1 uppercase tracking-wider">View app →</p>
            </div>
          </div>
        </div>
      </Link>
    ));

  return (
    <section id="apps-showcase" aria-label="All our apps, showcased on iPhone" className="py-16 relative overflow-hidden">
      <div className="text-center mb-10 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Every app, <span className="gradient-text">in your pocket</span>
        </h2>
        <p className="text-gray-400 mt-3">
          Tap any phone to explore the app — all free on the App Store.
        </p>
      </div>

      <div className="marquee-mask py-6">
        <div className="marquee-track">
          {phones('a', false)}
          {phones('b', true)}
        </div>
      </div>
    </section>
  );
};

export default PhoneMarquee;
