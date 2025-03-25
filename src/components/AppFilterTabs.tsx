
import React from 'react';
import { cn } from '@/lib/utils';

interface AppFilterTabsProps {
  activeFilter: 'all' | 'ios' | 'web';
  setActiveFilter: (filter: 'all' | 'ios' | 'web') => void;
}

const AppFilterTabs: React.FC<AppFilterTabsProps> = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex bg-white/5 rounded-full p-1">
        <button
          onClick={() => setActiveFilter('all')}
          className={cn(
            'tab-button',
            activeFilter === 'all' && 'active'
          )}
        >
          All Apps
        </button>
        <button
          onClick={() => setActiveFilter('ios')}
          className={cn(
            'tab-button',
            activeFilter === 'ios' && 'active'
          )}
        >
          iOS Apps
        </button>
        <button
          onClick={() => setActiveFilter('web')}
          className={cn(
            'tab-button',
            activeFilter === 'web' && 'active'
          )}
        >
          Web Apps
        </button>
      </div>
    </div>
  );
};

export default AppFilterTabs;
