import React, { useState } from 'react';
import { Star, ChevronLeft, Sparkles } from 'lucide-react';

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
    // 280ms satisfying delay for the child to see the button squish & bounce
    setTimeout(() => {
      onSelectOption(option);
      setSelectedId(null);
    }, 280);
  };

  const isGrid = question.options.length > 3;

  return (
    <div key={question.id} className="w-full max-w-5xl mx-auto px-4 py-1 animate-card-pop">
      <div className="bg-white/95 backdrop-blur-md rounded-[28px] sm:rounded-[36px] p-5 sm:p-7 md:p-8 border-4 border-white shadow-2xl shadow-indigo-900/20 relative transition-all">
        
        {/* Top Bar: Back button, Child Name, and Question Progress */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b-2 border-indigo-50">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-slate-700 hover:text-indigo-900 font-extrabold text-xs sm:text-sm bg-indigo-50 hover:bg-indigo-100 px-3.5 py-1.5 rounded-xl transition-all toy-btn"
          >
            <ChevronLeft className="w-4 h-4 text-indigo-600" />
            <span>Back</span>
          </button>

          {/* Child badge */}
          <div className="bg-gradient-to-r from-indigo-500 to-sky-500 text-white px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 animate-soft-float">
            <span className="opacity-80">Techie:</span>
            <span className="font-black tracking-wide text-amber-200">{childName}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          </div>

          {/* Question stars progress with glowing active star */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalQuestions }).map((_, idx) => (
              <Star
                key={idx}
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                  idx <= currentIndex
                    ? 'text-amber-400 fill-amber-400 scale-125 drop-shadow-md animate-pulse'
                    : 'text-slate-200 fill-slate-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Heading */}
        <div className="text-center mb-4 sm:mb-6">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-[11px] sm:text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 shadow-xs">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight max-w-3xl mx-auto">
            {question.title}
          </h2>
          {question.subtitle && (
            <p className="text-slate-500 text-xs sm:text-sm md:text-base font-bold mt-1">
              {question.subtitle}
            </p>
          )}
        </div>

        {/* Options Cards */}
        {isGrid ? (
          /* Q4: 2x2 Punchy Vertical Toy Cards (Keeps energy high & fits without scroll) */
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {question.options.map((option) => {
              const isSelected = selectedId === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={`group relative flex flex-col items-center justify-center p-3 sm:p-4 min-h-[115px] sm:min-h-[135px] rounded-2xl sm:rounded-3xl border-3 border-b-6 sm:border-b-8 bg-gradient-to-b ${option.colorClass} toy-btn cursor-pointer ${
                    isSelected ? 'toy-btn-selected ring-4 ring-offset-2 ring-indigo-500 animate-jelly' : ''
                  }`}
                >
                  {/* Big bouncy emoji */}
                  <span className="text-4xl sm:text-5xl mb-1 transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-200 select-none drop-shadow-md">
                    {option.emoji}
                  </span>
                  {/* Bold label */}
                  <span className="font-black text-base sm:text-xl block tracking-wide text-center drop-shadow-sm leading-tight">
                    {option.label}
                  </span>
                  {option.sublabel && (
                    <span className="text-[10px] sm:text-xs font-extrabold opacity-90 block text-center mt-0.5 px-2 py-0.2 bg-black/15 rounded-full">
                      {option.sublabel}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          /* Q1-Q3: 1 row of 3 massive tactile toy buttons */
          <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-4xl mx-auto">
            {question.options.map((option) => {
              const isSelected = selectedId === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={`group relative flex flex-col items-center justify-center p-4 sm:p-6 min-h-[180px] sm:min-h-[220px] md:min-h-[240px] rounded-2xl sm:rounded-3xl border-3 border-b-8 sm:border-b-[10px] bg-gradient-to-b ${option.colorClass} toy-btn cursor-pointer ${
                    isSelected ? 'toy-btn-selected ring-4 ring-offset-4 ring-indigo-500 animate-jelly' : ''
                  }`}
                >
                  <span className="text-6xl sm:text-7xl md:text-8xl mb-2 sm:mb-3 transform group-hover:scale-125 group-hover:-rotate-6 transition-all duration-200 select-none drop-shadow-md">
                    {option.emoji}
                  </span>
                  <span className="text-xl sm:text-3xl md:text-4xl font-black tracking-wide text-center drop-shadow-md">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
