import React from 'react';
import { Home, Calendar, Dumbbell, ShieldAlert, Sparkles, MessageSquare, Award } from 'lucide-react';

export type TabType = 'home' | 'calendar' | 'relax' | 'lounge' | 'growth';

interface NavigationBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function NavigationBar({ activeTab, onTabChange }: NavigationBarProps) {
  const navItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'calendar', label: '달력', icon: Calendar },
    { id: 'relax', label: '쉼터', icon: Dumbbell },
    { id: 'growth', label: '성장', icon: Award },
    { id: 'lounge', label: '라운지', icon: MessageSquare }
  ] as const;

  return (
    <nav id="bottom-navigation-bar" className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-neutral-100 py-2 pb-safe shadow-lg">
      <div className="max-w-md mx-auto px-6 flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center justify-center space-y-1 py-1 px-3 relative group focus:outline-none"
            >
              <div 
                className={`p-1.5 rounded-xl transition-all duration-300 relative ${
                  isActive 
                    ? 'bg-sky-100 text-sky-900 scale-105' 
                    : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                
                {/* Micro notification dot for lounge */}
                {item.id === 'lounge' && !isActive && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-400 rounded-full"></span>
                )}
              </div>
              <span 
                className={`text-[10px] font-bold tracking-tight font-sans transition-colors ${
                  isActive ? 'text-sky-950' : 'text-neutral-400 group-hover:text-neutral-700'
                }`}
              >
                {item.label}
              </span>

              {/* Slider highlight indicator */}
              {isActive && (
                <span className="absolute bottom-0 w-4 h-0.5 bg-sky-500 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
