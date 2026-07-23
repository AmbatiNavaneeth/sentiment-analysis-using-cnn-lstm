import React from 'react';
import { Bot, User, LogIn, Sparkles } from 'lucide-react';
import { AdminUser } from '../types';

interface HeaderProps {
  currentUser: AdminUser;
  onOpenAuth: () => void;
  onNavigateToProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenAuth,
  onNavigateToProfile,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm">
          <Bot className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg md:text-xl font-bold font-headline text-slate-900 tracking-tight leading-tight">
            Sentiment Insight <span className="text-indigo-600">AI</span>
          </h1>
          <span className="hidden md:inline-flex text-[10px] font-bold text-indigo-600 tracking-wider uppercase items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Indian Enterprise Edition
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onNavigateToProfile}
          className="flex items-center gap-2 p-1 pl-2.5 pr-1 bg-white border border-slate-200 rounded-full hover:border-indigo-400 transition-all shadow-xs active:scale-95 cursor-pointer"
          title={`Signed in as ${currentUser.name}`}
        >
          <span className="text-xs font-semibold text-slate-700 hidden md:inline px-1">
            {currentUser.name}
          </span>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
          />
        </button>

        <button
          onClick={onOpenAuth}
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Sign in / Switch account"
        >
          <LogIn className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
