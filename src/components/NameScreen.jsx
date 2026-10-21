import React, { useState } from 'react';
import { Rocket, Sparkles, Smile, Star, Bot } from 'lucide-react';

export default function NameScreen({ onStart }) {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onStart(name.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4 sm:py-8">
      <div className="bg-white/95 backdrop-blur-md rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 text-center border-4 border-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
        
        {/* Floating background decorative stars */}
        <div className="absolute top-5 left-8 text-amber-400 opacity-80 animate-bounce-slow">
          <Star className="w-8 h-8 fill-amber-300" />
        </div>
        <div className="absolute top-8 right-10 text-pink-400 opacity-80 animate-pulse">
          <Sparkles className="w-9 h-9" />
        </div>

        {/* Robot Mascot Illustration */}
        <div className="mx-auto w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 rounded-[32px] p-1.5 shadow-xl shadow-indigo-300 mb-6 flex items-center justify-center transform hover:rotate-3 transition-transform">
          <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-sky-50 rounded-[28px] flex flex-col items-center justify-center text-7xl sm:text-8xl select-none">
            🤖
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-3 tracking-tight">
          Hi Little Techie! 👋
        </h2>
        <p className="text-lg sm:text-2xl text-slate-600 font-bold mb-8">
          Welcome to our survey! What is your name?
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Type your name here..."
              autoFocus
              className={`w-full text-center text-2xl sm:text-3xl font-black py-5 px-6 rounded-3xl border-4 transition-all duration-200 outline-none shadow-inner placeholder:text-slate-300 placeholder:font-bold ${
                error
                  ? 'border-rose-400 bg-rose-50 text-rose-800 ring-4 ring-rose-200'
                  : 'border-indigo-200 focus:border-indigo-500 bg-slate-50 text-indigo-950 focus:bg-white'
              }`}
            />
            {error && (
              <p className="text-rose-500 text-base font-extrabold mt-3 animate-bounce">
                Please type your name first! 😊
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-2xl sm:text-3xl py-5 sm:py-6 px-8 rounded-3xl border-b-8 border-emerald-700 active:border-b-4 shadow-xl shadow-emerald-400/40 flex items-center justify-center gap-3 transition-all duration-150 btn-3d cursor-pointer"
            >
              <span>Let's Start!</span>
              <Rocket className="w-8 h-8 sm:w-9 sm:h-9 animate-pulse" />
            </button>
          </div>
        </form>

        {/* Facilitator helper note */}
        <div className="mt-8 pt-5 border-t-2 border-indigo-50 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-500">
          <Smile className="w-4 h-4 text-indigo-500" />
          <span>Facilitator can type the child's name, then let the child tap their answers!</span>
        </div>
      </div>
    </div>
  );
}
