import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AppCardProps {
  title: string;
  description: string;
  image: string;
  platforms: string[];
  url?: string;
  androidUrl?: string;
  className?: string;
  initials?: string;
  initialsColor?: string;
  isWebsite?: boolean;
  slug?: string;
}

// Public images live at the site root; normalise paths that omit the leading
// slash so they resolve correctly on nested routes like /apps/:slug.
const imgSrc = (image: string): string => {
  if (!image) return '';
  if (image.startsWith('http') || image.startsWith('/')) return image;
  return `/${image}`;
};

const AppCard: React.FC<AppCardProps> = ({
  title,
  description,
  image,
  platforms,
  url,
  androidUrl,
  className,
  initials,
  initialsColor,
  isWebsite,
  slug
}) => {
  const media = (
    <div className="aspect-video bg-gradient-to-br from-pg-purple/20 to-pg-blue/20 flex items-center justify-center overflow-hidden">
      {image ? (
        <img
          src={imgSrc(image)}
          alt={`${title} app icon`}
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
      ) : initials ? (
        <Avatar className="w-16 h-16">
          <AvatarFallback
            style={{ backgroundColor: initialsColor || '#9b87f5' }}
            className="text-white text-lg font-bold"
          >
            {initials}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No image available
        </div>
      )}
    </div>
  );

  return (
    <div
      className={cn(
        "glass-card group h-full transition-all duration-500 hover:shadow-[0_0_20px_rgba(184,41,247,0.4)]",
        className
      )}
    >
      {slug ? <Link to={`/apps/${slug}`} aria-label={`Learn more about ${title}`}>{media}</Link> : media}

      <div className="p-4">
        {slug ? (
          <Link to={`/apps/${slug}`}>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pg-purple transition-colors duration-300 line-clamp-2">{title}</h3>
          </Link>
        ) : (
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pg-purple transition-colors duration-300 line-clamp-2">{title}</h3>
        )}
        <p className="text-gray-400 text-xs mb-3 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {platforms.map((platform, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white/5 text-gray-300"
            >
              {platform}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-1">
          {slug && (
            <Link
              to={`/apps/${slug}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-pg-purple text-white hover:bg-pg-pink transition-all duration-200 text-xs font-semibold min-h-[32px]"
            >
              Learn more
            </Link>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-pg-purple/15 border border-pg-purple/40 text-pg-purple hover:bg-pg-purple hover:text-white transition-all duration-200 text-xs font-semibold min-h-[32px]"
            >
              {isWebsite ? 'Visit Website' : '⬇ App Store'}
            </a>
          )}
          {androidUrl && (
            <a
              href={androidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-pg-purple/15 border border-pg-purple/40 text-pg-purple hover:bg-pg-purple hover:text-white transition-all duration-200 text-xs font-semibold min-h-[32px]"
            >
              ⬇ Google Play
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppCard;
