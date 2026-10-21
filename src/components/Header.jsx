import React from 'react';
import { Bot, ClipboardList, Sparkles } from 'lucide-react';
import { APP_CONFIG } from '../data/surveyConfig';

export default function Header({ responseCount, onOpenAdmin, currentView }) {
  return (
    <header className="w-full max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
      {/* Brand & Mascot */}
      <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm border border-indigo-100">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md animate-pulse-fast">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wide text-indigo-950 flex items-center gap-1.5">
            {APP_CONFIG.eventName}
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          </h1>
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">
            {APP_CONFIG.organization}
          </p>
        </div>
      </div>

      {/* Review / Admin Button */}
      <button
        onClick={onOpenAdmin}
        className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200 card-shadow btn-press ${
          currentView === 'admin'
            ? 'bg-indigo-600 text-white shadow-indigo-200'
            : 'bg-white text-indigo-900 hover:bg-indigo-50 border border-indigo-200 shadow-sm'
        }`}
      >
        <ClipboardList className="w-4 h-4 text-indigo-500" />
        <span>Reviews & Data</span>
        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-black">
          {responseCount}
        </span>
      </button>
    </header>
  );
}
