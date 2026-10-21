import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NameScreen from './components/NameScreen';
import QuestionCard from './components/QuestionCard';
import CelebrationScreen from './components/CelebrationScreen';
import AdminDashboard from './components/AdminDashboard';
import { SURVEY_QUESTIONS } from './data/surveyConfig';
import { getResponses, saveResponse, deleteResponse, clearAllResponses } from './utils/storage';

export default function App() {
  const [view, setView] = useState('name'); // 'name' | 'question' | 'celebration' | 'admin'
  const [childName, setChildName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [responses, setResponses] = useState([]);
  const [lastSavedRecord, setLastSavedRecord] = useState(null);

  // Load responses on initial mount
  useEffect(() => {
    setResponses(getResponses());
  }, []);

  const refreshResponses = () => {
    setResponses(getResponses());
  };

  const handleStartSurvey = (name) => {
    setChildName(name);
    setCurrentQuestionIndex(0);
    setCurrentAnswers({});
    setView('question');
  };

  const handleSelectOption = (option) => {
    const currentQuestion = SURVEY_QUESTIONS[currentQuestionIndex];
    const updatedAnswers = {
      ...currentAnswers,
      [currentQuestion.id]: {
        id: option.id,
        label: option.label,
        emoji: option.emoji,
      },
    };
    setCurrentAnswers(updatedAnswers);

    if (currentQuestionIndex < SURVEY_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed last question -> save & celebrate!
      try {
        const saved = saveResponse(childName, updatedAnswers);
        setLastSavedRecord(saved);
        refreshResponses();
        setView('celebration');
      } catch (err) {
        console.error('Save failed:', err);
        setView('celebration');
      }
    }
  };

  const handleBackQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setView('name');
    }
  };

  const handleResetForNextChild = () => {
    setChildName('');
    setCurrentAnswers({});
    setCurrentQuestionIndex(0);
    setLastSavedRecord(null);
    setView('name');
  };

  const handleDeleteResponse = (id) => {
    const updated = deleteResponse(id);
    setResponses(updated);
  };

  const handleClearAll = () => {
    const updated = clearAllResponses();
    setResponses(updated);
  };

  const isSurveyView = view !== 'admin';

  return (
    <div
      className={`relative w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-between overflow-x-hidden ${
        isSurveyView
          ? 'h-screen max-h-screen overflow-hidden'
          : 'min-h-screen overflow-y-auto'
      }`}
    >
      {/* Playful Colorful Background Blobs & Polka Dots */}
      <div className="fixed inset-0 bg-dots-pattern opacity-25 pointer-events-none" />
      <div className="fixed -top-24 -left-24 w-80 h-80 bg-yellow-300/35 rounded-full blur-3xl pointer-events-none animate-pulse-fast" />
      <div className="fixed top-1/3 -right-24 w-80 h-80 bg-cyan-300/35 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -bottom-24 left-1/4 w-80 h-80 bg-pink-400/35 rounded-full blur-3xl pointer-events-none" />

      {/* Playful floating corner emojis */}
      <div className="fixed top-8 left-6 text-3xl opacity-25 select-none pointer-events-none hidden lg:block animate-bounce-slow">
        🚀
      </div>
      <div className="fixed top-16 right-10 text-3xl opacity-25 select-none pointer-events-none hidden lg:block animate-pulse">
        ⭐
      </div>
      <div className="fixed bottom-12 left-8 text-3xl opacity-25 select-none pointer-events-none hidden lg:block">
        🎨
      </div>
      <div className="fixed bottom-8 right-10 text-3xl opacity-25 select-none pointer-events-none hidden lg:block animate-bounce-slow">
        🤖
      </div>

      {/* Top Header */}
      <div className="relative z-10 w-full shrink-0">
        <Header
          responseCount={responses.length}
          currentView={view}
          onOpenAdmin={() => setView((prev) => (prev === 'admin' ? 'name' : 'admin'))}
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-2 py-1 overflow-hidden">
        {view === 'name' && (
          <NameScreen onStart={handleStartSurvey} />
        )}

        {view === 'question' && (
          <QuestionCard
            question={SURVEY_QUESTIONS[currentQuestionIndex]}
            childName={childName}
            currentIndex={currentQuestionIndex}
            totalQuestions={SURVEY_QUESTIONS.length}
            onSelectOption={handleSelectOption}
            onBack={handleBackQuestion}
          />
        )}

        {view === 'celebration' && (
          <CelebrationScreen
            childName={childName}
            lastResponse={lastSavedRecord}
            onReset={handleResetForNextChild}
          />
        )}

        {view === 'admin' && (
          <AdminDashboard
            responses={responses}
            onDeleteResponse={handleDeleteResponse}
            onClearAll={handleClearAll}
            onRefresh={refreshResponses}
            onClose={() => setView('name')}
          />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 w-full flex justify-center pb-2 pt-1 px-4 select-none shrink-0">
        <div className="bg-white/80 backdrop-blur-md px-4 py-1 rounded-full shadow-xs border border-white/60 text-[11px] sm:text-xs font-black text-indigo-950 flex items-center gap-2">
          <span>Little Techies</span>
          <span className="text-pink-500">•</span>
          <span>Brainy Bunch × U.N.I. MART</span>
          <span className="text-pink-500">•</span>
          <span className="text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full font-black">
            100% Offline
          </span>
        </div>
      </footer>
    </div>
  );
}
