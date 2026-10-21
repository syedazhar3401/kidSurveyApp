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
    <div className="w-full max-w-2xl mx-auto px-4 py-4 sm:py-8">
      <div className="bg-white/95 backdrop-blur-md rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 text-center border-4 border-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
        
        {/* Celebration Trophy / Star */}
        <div className="mx-auto w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-tr from-amber-300 via-amber-400 to-yellow-500 rounded-[32px] p-1.5 shadow-xl shadow-amber-300/50 mb-6 flex items-center justify-center transform animate-bounce-slow">
          <div className="w-full h-full bg-amber-50 rounded-[28px] flex items-center justify-center text-6xl sm:text-7xl select-none">
            🌟
          </div>
        </div>

        {/* Headings */}
        <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-sm sm:text-base font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Survey Complete!
        </span>

        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-3 tracking-tight">
          Awesome Job, {childName}! 🎉
        </h2>

        <p className="text-lg sm:text-2xl text-slate-600 font-bold mb-8">
          Thank you for sharing your thoughts with us today!
        </p>

        {/* Passport Reminder Box */}
        <div className="bg-gradient-to-r from-amber-100/80 via-amber-50 to-orange-100/80 border-3 border-amber-300 rounded-3xl p-5 mb-8 text-left flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-amber-200/80 rounded-2xl text-amber-800 text-3xl shrink-0">
            🎫
          </div>
          <div>
            <h4 className="font-black text-amber-950 text-base sm:text-lg">
              Passport Sticker Reminder!
            </h4>
            <p className="text-sm sm:text-base text-amber-800 font-bold mt-0.5">
              Ask your group facilitator for your Little Techies passport sticker now!
            </p>
          </div>
        </div>

        {/* Button to start next survey */}
        <button
          onClick={onReset}
          className="w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white font-black text-2xl sm:text-3xl py-5 sm:py-6 px-8 rounded-3xl border-b-8 border-indigo-800 active:border-b-4 shadow-xl shadow-indigo-300 flex items-center justify-center gap-3 transition-all duration-150 btn-3d cursor-pointer"
        >
          <RotateCcw className="w-7 h-7 sm:w-8 sm:h-8" />
          <span>Start Next Survey</span>
        </button>
      </div>
    </div>
  );
}
