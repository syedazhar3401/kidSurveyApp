import React, { useState } from 'react';
import { Star, ChevronLeft } from 'lucide-react';

export default function QuestionCard({
  question,
  childName,
  currentIndex,
  totalQuestions,
  onSelectOption,
  onBack,
}) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (option) => {
    setSelectedId(option.id);
    // Slight delay so the child sees their button tap feedback
    setTimeout(() => {
      onSelectOption(option);
      setSelectedId(null);
    }, 250);
  };

  const isGrid = question.options.length > 3;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-6">
      <div className="bg-white/95 backdrop-blur-md rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-12 border-4 border-white shadow-2xl shadow-indigo-900/20 relative transition-all">
        
        {/* Top Bar: Back button, Child Name, and Question Progress */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b-2 border-indigo-50">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-700 hover:text-indigo-900 font-extrabold text-sm sm:text-base bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-2xl transition-all btn-3d"
          >
            <ChevronLeft className="w-5 h-5 text-indigo-600" />
            <span>Back</span>
          </button>

          {/* Child badge */}
          <div className="bg-gradient-to-r from-indigo-500 to-sky-500 text-white px-5 py-1.5 rounded-full font-bold text-sm sm:text-base shadow-sm flex items-center gap-2">
            <span className="opacity-80">Techie:</span>
            <span className="font-black tracking-wide text-amber-200">{childName}</span>
          </div>

          {/* Question stars progress */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalQuestions }).map((_, idx) => (
              <Star
                key={idx}
                className={`w-6 h-6 sm:w-7 sm:h-7 transition-all ${
                  idx <= currentIndex
                    ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-sm'
                    : 'text-slate-200 fill-slate-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs sm:text-sm md:text-base font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-xs">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight max-w-4xl mx-auto">
            {question.title}
          </h2>
          {question.subtitle && (
            <p className="text-slate-500 text-base sm:text-lg md:text-xl font-bold mt-3">
              {question.subtitle}
            </p>
          )}
        </div>

        {/* Big Touch-Friendly Option Cards */}
        <div
          className={`gap-5 sm:gap-8 ${
            isGrid
              ? 'grid grid-cols-1 sm:grid-cols-2'
              : 'grid grid-cols-1 sm:grid-cols-3'
          }`}
        >
          {question.options.map((option) => {
            const isSelected = selectedId === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`relative group flex flex-col items-center justify-center rounded-[28px] sm:rounded-[36px] border-4 border-b-8 sm:border-b-[10px] bg-gradient-to-b ${option.colorClass} shadow-xl hover:shadow-2xl transition-all duration-150 transform hover:-translate-y-2 active:translate-y-2 active:border-b-4 btn-3d cursor-pointer ${
                  isGrid
                    ? 'p-6 sm:p-8 min-h-[190px] sm:min-h-[230px]'
                    : 'p-6 sm:p-10 min-h-[220px] sm:min-h-[280px] md:min-h-[310px]'
                } ${
                  isSelected ? 'ring-4 ring-offset-4 ring-indigo-500 scale-95' : ''
                }`}
              >
                {/* Giant Animated Emoji */}
                <span
                  className={`transform group-hover:scale-125 transition-transform duration-200 select-none drop-shadow-md ${
                    isGrid ? 'text-6xl sm:text-7xl mb-2' : 'text-7xl sm:text-8xl md:text-9xl mb-4'
                  }`}
                >
                  {option.emoji}
                </span>

                {/* Big Bold Label */}
                <span
                  className={`font-black tracking-wide text-center drop-shadow-md ${
                    isGrid ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl md:text-5xl'
                  }`}
                >
                  {option.label}
                </span>

                {/* Sublabel for Booths */}
                {option.sublabel && (
                  <span className="text-xs sm:text-base font-extrabold opacity-95 mt-1.5 text-center px-2 py-0.5 bg-black/15 rounded-full">
                    {option.sublabel}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
