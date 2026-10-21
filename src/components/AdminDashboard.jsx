import React, { useState } from 'react';
import {
  Download,
  Trash2,
  Search,
  BarChart3,
  ListFilter,
  ArrowLeft,
  Users,
  AlertCircle,
  Sparkles,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';
import { SURVEY_QUESTIONS, APP_CONFIG } from '../data/surveyConfig';
import { exportToCSV, loadMockResponses } from '../utils/storage';

export default function AdminDashboard({
  responses,
  onDeleteResponse,
  onClearAll,
  onRefresh,
  onClose,
}) {
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'analytics'
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredResponses = responses.filter((r) =>
    (r.childName || '').toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const handleDelete = (id, name) => {
    onDeleteResponse(id);
    setDeleteConfirmId(null);
    showToast(`Deleted response for "${name}"`);
  };

  const handleExport = () => {
    exportToCSV(responses);
    showToast('Exported CSV successfully!');
  };

  const handleLoadDemo = () => {
    loadMockResponses();
    onRefresh();
    showToast('Loaded 7 sample responses!');
  };

  // Helper to compute question option counts
  const computeStats = (questionId) => {
    const question = SURVEY_QUESTIONS.find((q) => q.id === questionId);
    if (!question) return [];

    const total = responses.length;
    const counts = {};

    question.options.forEach((opt) => {
      counts[opt.label] = 0;
    });

    responses.forEach((r) => {
      const answer = r.answers?.[questionId];
      if (answer && answer.label) {
        counts[answer.label] = (counts[answer.label] || 0) + 1;
      }
    });

    return question.options.map((opt) => {
      const count = counts[opt.label] || 0;
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
      return {
        ...opt,
        count,
        percentage,
      };
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Main Admin Card */}
      <div className="bg-white rounded-3xl border-4 border-indigo-100 card-shadow overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-sky-600 p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 text-white text-xs font-black uppercase px-2.5 py-0.5 rounded-full">
                Facilitator Portal
              </span>
              <span className="text-indigo-200 text-xs">
                {APP_CONFIG.organization}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
              Reviews & Survey Data 📊
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              disabled={responses.length === 0}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-sm px-4 py-2.5 rounded-2xl transition-all shadow-md btn-press"
            >
              <Download className="w-4 h-4" />
              <span>Download CSV</span>
            </button>

            <button
              onClick={onClose}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold text-sm px-4 py-2.5 rounded-2xl transition-all btn-press"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Survey</span>
            </button>
          </div>
        </div>

        {/* Stats Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-indigo-50/60 border-b border-indigo-100 p-4 gap-3 text-center">
          <div className="bg-white p-3 rounded-2xl border border-indigo-100 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase">Completed</p>
            <p className="text-2xl font-black text-indigo-900 mt-0.5">
              {responses.length}{' '}
              <span className="text-sm font-semibold text-slate-400">
                / {APP_CONFIG.targetParticipants}
              </span>
            </p>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-indigo-100 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase">Target Audience</p>
            <p className="text-lg font-black text-indigo-900 mt-1">6-Year-Olds</p>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-indigo-100 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase">Questions</p>
            <p className="text-lg font-black text-indigo-900 mt-1">4 Visual</p>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-indigo-100 shadow-sm flex flex-col justify-center items-center">
            <p className="text-xs font-bold text-slate-500 uppercase">Status</p>
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 text-xs font-black px-2 py-0.5 rounded-full mt-1">
              Offline Ready ✅
            </span>
          </div>
        </div>

        {/* Navigation Tabs & Actions Toolbar */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab('list')}
              className={`flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-sm font-black transition-all flex-1 md:flex-initial ${
                activeTab === 'list'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-4 h-4" />
              <span>All Reviews ({responses.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-sm font-black transition-all flex-1 md:flex-initial ${
                activeTab === 'analytics'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Summary & Charts</span>
            </button>
          </div>

          {/* Search bar & utility actions */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            {activeTab === 'list' && (
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search child's name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* Test Helpers */}
            {responses.length === 0 && (
              <button
                onClick={handleLoadDemo}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-xl border border-indigo-200 transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load 7 Demo Kids</span>
              </button>
            )}

            {responses.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl border border-rose-200 transition-colors whitespace-nowrap"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: ALL REVIEWS LIST */}
        {activeTab === 'list' && (
          <div className="p-4 sm:p-6">
            {filteredResponses.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400 text-2xl">
                  🤖
                </div>
                <h4 className="text-lg font-extrabold text-slate-700">
                  {searchQuery ? 'No reviews match your search' : 'No reviews recorded yet!'}
                </h4>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
                  {searchQuery
                    ? `No child named "${searchQuery}" was found.`
                    : 'Start the survey or click "Load 7 Demo Kids" above to preview how it looks!'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredResponses.map((record, index) => {
                  const isConfirmingDelete = deleteConfirmId === record.id;
                  return (
                    <div
                      key={record.id}
                      className="bg-slate-50 hover:bg-indigo-50/40 border border-slate-200 hover:border-indigo-200 rounded-2xl p-4 transition-all"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        
                        {/* Child info */}
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center shrink-0">
                            {index + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-lg font-black text-slate-900">
                                {record.childName}
                              </h4>
                              <span className="text-xs bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                                {record.formattedTime}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400">
                              Date: {record.formattedDate}
                            </p>
                          </div>
                        </div>

                        {/* Child's Answers Display */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 lg:max-w-2xl">
                          {/* Q1 */}
                          <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] font-bold text-slate-600 block truncate">
                              Q1: Robots obey?
                            </span>
                            <span className="text-xs font-black text-slate-800 flex items-center gap-1 mt-0.5">
                              <span>{record.answers?.q1?.emoji || '❔'}</span>
                              <span className="truncate">{record.answers?.q1?.label || 'N/A'}</span>
                            </span>
                          </div>

                          {/* Q2 */}
                          <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] font-bold text-slate-600 block truncate">
                              Q2: Guess drawing?
                            </span>
                            <span className="text-xs font-black text-slate-800 flex items-center gap-1 mt-0.5">
                              <span>{record.answers?.q2?.emoji || '❔'}</span>
                              <span className="truncate">{record.answers?.q2?.label || 'N/A'}</span>
                            </span>
                          </div>

                          {/* Q3 */}
                          <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] font-bold text-slate-600 block truncate">
                              Q3: Like computers?
                            </span>
                            <span className="text-xs font-black text-slate-800 flex items-center gap-1 mt-0.5">
                              <span>{record.answers?.q3?.emoji || '❔'}</span>
                              <span className="truncate">{record.answers?.q3?.label || 'N/A'}</span>
                            </span>
                          </div>

                          {/* Q4 */}
                          <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-2xs">
                            <span className="text-[10px] font-bold text-slate-600 block truncate">
                              Q4: Fav booth?
                            </span>
                            <span className="text-xs font-black text-slate-800 flex items-center gap-1 mt-0.5">
                              <span>{record.answers?.q4?.emoji || '❔'}</span>
                              <span className="truncate">{record.answers?.q4?.label || 'N/A'}</span>
                            </span>
                          </div>
                        </div>

                        {/* Individual Delete Action */}
                        <div className="shrink-0 flex items-center justify-end">
                          {isConfirmingDelete ? (
                            <div className="flex items-center gap-1.5 bg-rose-100 p-1.5 rounded-xl border border-rose-200">
                              <span className="text-xs font-bold text-rose-800 px-1">Delete?</span>
                              <button
                                onClick={() => handleDelete(record.id, record.childName)}
                                className="bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-lg hover:bg-rose-700 transition-colors"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="bg-white text-slate-700 text-xs font-bold px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(record.id)}
                              title="Delete accidental review"
                              className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-xl transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: VISUAL ANALYTICS & SUMMARY */}
        {activeTab === 'analytics' && (
          <div className="p-4 sm:p-6 space-y-6">
            {responses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-500 font-bold">No data to chart yet!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SURVEY_QUESTIONS.map((question) => {
                  const stats = computeStats(question.id);
                  return (
                    <div
                      key={question.id}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-xs"
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
                        Question {question.questionNumber}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-800 mt-0.5 mb-4">
                        {question.title}
                      </h4>

                      <div className="space-y-3">
                        {stats.map((opt) => (
                          <div key={opt.id}>
                            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                              <span className="flex items-center gap-1">
                                <span>{opt.emoji}</span>
                                <span>{opt.label}</span>
                              </span>
                              <span>
                                {opt.count} ({opt.percentage}%)
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-3.5 overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${opt.colorClass} transition-all duration-500 rounded-full`}
                                style={{ width: `${opt.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full card-shadow text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Clear All Reviews?
            </h3>
            <p className="text-sm text-slate-600 mb-6 font-medium">
              This will remove all {responses.length} responses. This action cannot be undone. Make sure you downloaded the CSV first!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                  showToast('All reviews cleared.');
                }}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition-colors"
              >
                Yes, Clear All
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
