import React from 'react';
import { Bot, ClipboardList, Sparkles } from 'lucide-react';
import { APP_CONFIG } from '../data/surveyConfig';

export default function Header({ responseCount, onOpenAdmin, currentView }) {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
      {/* Brand & Mascot */}
      <div className="flex items-center space-x-2.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-sm border border-white/80">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-xs animate-pulse-fast">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-black tracking-wide text-indigo-950 flex items-center gap-1">
            {APP_CONFIG.eventName}
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          </h1>
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider leading-none">
            {APP_CONFIG.organization}
          </p>
        </div>
      </div>

      {/* Review / Admin Button */}
      <button
        onClick={onOpenAdmin}
        className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm btn-3d cursor-pointer ${
          currentView === 'admin'
            ? 'bg-indigo-600 text-white shadow-indigo-300'
            : 'bg-white/90 text-indigo-950 hover:bg-white border border-white/80'
        }`}
      >
        <ClipboardList className="w-4 h-4 text-indigo-500" />
        <span>Reviews & Data</span>
        <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs font-black">
          {responseCount}
        </span>
      </button>
    </header>
  );
}
