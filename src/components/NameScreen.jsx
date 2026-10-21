import React, { useState } from 'react';
import { Rocket, Sparkles, Smile, Star } from 'lucide-react';

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
    <div className="w-full max-w-xl mx-auto px-4 py-1">
      <div className="bg-white/95 backdrop-blur-md rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 text-center border-4 border-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
        
        {/* Floating background decorative stars */}
        <div className="absolute top-4 left-6 text-amber-400 opacity-80 animate-bounce-slow">
          <Star className="w-6 h-6 fill-amber-300" />
        </div>
        <div className="absolute top-6 right-8 text-pink-400 opacity-80 animate-pulse">
          <Sparkles className="w-7 h-7" />
        </div>

        {/* Robot Mascot Illustration */}
        <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 rounded-3xl p-1 shadow-lg shadow-indigo-300 mb-4 flex items-center justify-center transform hover:rotate-3 transition-transform">
          <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-sky-50 rounded-[20px] flex flex-col items-center justify-center text-5xl sm:text-6xl select-none">
            🤖
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-1 tracking-tight">
          Hi Little Techie! 👋
        </h2>
        <p className="text-base sm:text-xl text-slate-600 font-bold mb-6">
          Welcome to our survey! What is your name?
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
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
              className={`w-full text-center text-xl sm:text-2xl font-black py-3.5 sm:py-4 px-5 rounded-2xl border-3 transition-all duration-200 outline-none shadow-inner placeholder:text-slate-300 placeholder:font-bold ${
                error
                  ? 'border-rose-400 bg-rose-50 text-rose-800 ring-4 ring-rose-200'
                  : 'border-indigo-200 focus:border-indigo-500 bg-slate-50 text-indigo-950 focus:bg-white'
              }`}
            />
            {error && (
              <p className="text-rose-500 text-sm font-extrabold mt-2 animate-bounce">
                Please type your name first! 😊
              </p>
            )}
          </div>

          {/* Action Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xl sm:text-2xl py-3.5 sm:py-4 px-6 rounded-2xl border-b-6 border-emerald-700 active:border-b-3 shadow-lg shadow-emerald-400/30 flex items-center justify-center gap-2.5 transition-all duration-150 btn-3d cursor-pointer"
            >
              <span>Let's Start!</span>
              <Rocket className="w-6 h-6 sm:w-7 sm:h-7 animate-pulse" />
            </button>
          </div>
        </form>

        {/* Facilitator helper note */}
        <div className="mt-5 pt-3 border-t-2 border-indigo-50 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500">
          <Smile className="w-4 h-4 text-indigo-500" />
          <span>Facilitator can type the child's name, then let the child tap their answers!</span>
        </div>
      </div>
    </div>
  );
}
