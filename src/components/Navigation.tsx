import React from 'react';
import { BarChart3, LayoutDashboard, Layers, UserCheck } from 'lucide-react';

export type TabType = 'analyze' | 'dashboard' | 'batch' | 'profile';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    {
      id: 'analyze' as TabType,
      label: 'Analyze',
      icon: BarChart3,
    },
    {
      id: 'dashboard' as TabType,
      label: 'Dash',
      icon: LayoutDashboard,
    },
    {
      id: 'batch' as TabType,
      label: 'Batch',
      icon: Layers,
    },
    {
      id: 'profile' as TabType,
      label: 'Profile',
      icon: UserCheck,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center px-5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
              isActive
                ? 'text-indigo-600 bg-indigo-50 font-bold scale-105 shadow-xs border border-indigo-100'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-95'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className="text-xs font-medium mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
