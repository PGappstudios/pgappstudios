
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AppCardProps {
  title: string;
  description: string;
  image: string;
  platforms: string[];
  url?: string;
  className?: string;
  initials?: string;
  initialsColor?: string;
}

const AppCard: React.FC<AppCardProps> = ({ 
  title, 
  description, 
  image, 
  platforms,
  url,
  className,
  initials,
  initialsColor
}) => {
  return (
    <div 
      className={cn(
        "glass-card group h-full transition-all duration-500 hover:shadow-[0_0_20px_rgba(184,41,247,0.4)] opacity-0",
        className
      )}
    >
      <div className="aspect-video bg-gradient-to-br from-pg-purple/20 to-pg-blue/20 flex items-center justify-center overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={`${title} screenshot`} 
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
        ) : initials ? (
          <Avatar className="w-24 h-24">
            <AvatarFallback 
              style={{ backgroundColor: initialsColor || '#9b87f5' }}
              className="text-white text-2xl font-bold"
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
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pg-purple transition-colors duration-300">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {platforms.map((platform, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/5 text-gray-300"
            >
              {platform}
            </span>
          ))}
        </div>
        
        {url && (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block text-pg-purple hover:text-pg-pink transition-colors text-sm font-medium"
          >
            Visit App →
          </a>
        )}
      </div>
    </div>
  );
};

export default AppCard;
