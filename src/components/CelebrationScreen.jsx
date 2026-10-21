import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, CheckCircle2 } from 'lucide-react';

export default function CelebrationScreen({ childName, lastResponse, onReset }) {
  useEffect(() => {
    // Multi-stage confetti celebration
    const count = 250;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 30, startVelocity: 60 });
    fire(0.2, { spread: 65 });
    fire(0.35, { spread: 110, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 130, startVelocity: 30, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 130, startVelocity: 50 });
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-1">
      <div className="bg-white/95 backdrop-blur-md rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 text-center border-4 border-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
        
        {/* Celebration Star */}
        <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-amber-300 via-amber-400 to-yellow-500 rounded-3xl p-1 shadow-lg shadow-amber-300/40 mb-4 flex items-center justify-center transform animate-bounce-slow">
          <div className="w-full h-full bg-amber-50 rounded-[20px] flex items-center justify-center text-4xl sm:text-5xl select-none">
            🌟
          </div>
        </div>

        {/* Headings */}
        <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Survey Complete!
        </span>

        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-1.5 tracking-tight">
          Awesome Job, {childName}! 🎉
        </h2>

        <p className="text-base sm:text-lg text-slate-600 font-bold mb-5">
          Thank you for sharing your thoughts with us today!
        </p>

        {/* Passport Reminder Box */}
        <div className="bg-gradient-to-r from-amber-100/80 via-amber-50 to-orange-100/80 border-2 border-amber-300 rounded-2xl p-3.5 mb-6 text-left flex items-center gap-3 shadow-xs">
          <div className="p-2.5 bg-amber-200/80 rounded-xl text-amber-800 text-2xl shrink-0">
            🎫
          </div>
          <div>
            <h4 className="font-black text-amber-950 text-sm sm:text-base">
              Passport Sticker Reminder!
            </h4>
            <p className="text-xs sm:text-sm text-amber-800 font-bold mt-0.5">
              Ask your group facilitator for your Little Techies passport sticker now!
            </p>
          </div>
        </div>

        {/* Button to start next survey */}
        <button
          onClick={onReset}
          className="w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-black text-xl sm:text-2xl py-3.5 sm:py-4 px-6 rounded-2xl border-b-6 border-indigo-800 active:border-b-3 shadow-lg shadow-indigo-300 flex items-center justify-center gap-2.5 transition-all duration-150 btn-3d cursor-pointer"
        >
          <RotateCcw className="w-6 h-6" />
          <span>Start Next Survey</span>
        </button>
      </div>
    </div>
  );
}
