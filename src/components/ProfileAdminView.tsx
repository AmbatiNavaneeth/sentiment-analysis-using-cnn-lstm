import React, { useState } from 'react';
import { User, Mail, ShieldCheck, LogOut, Search, Trash2, Download, Clock, Sparkles, MessageSquare } from 'lucide-react';
import { AdminUser, BatchReviewItem } from '../types';

interface ProfileAdminViewProps {
  currentUser: AdminUser;
  userAnalyses: BatchReviewItem[];
  onSignOut: () => void;
  onClearHistory: () => void;
  onDeleteAnalysis: (id: string) => void;
}

export const ProfileAdminView: React.FC<ProfileAdminViewProps> = ({
  currentUser,
  userAnalyses,
  onSignOut,
  onClearHistory,
  onDeleteAnalysis,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState<'All' | 'Positive' | 'Negative' | 'Neutral'>('All');

  const filteredAnalyses = userAnalyses.filter((item) => {
    const matchesSearch = item.reviewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.keywords && item.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesSentiment = sentimentFilter === 'All' || item.sentiment === sentimentFilter;
    return matchesSearch && matchesSentiment;
  });

  const posCount = userAnalyses.filter(a => a.sentiment === 'Positive').length;
  const negCount = userAnalyses.filter(a => a.sentiment === 'Negative').length;
  const neuCount = userAnalyses.filter(a => a.sentiment === 'Neutral').length;

  const handleExportCSV = () => {
    if (userAnalyses.length === 0) return;
    const csvContent = "ID,Date,ReviewText,Sentiment,Confidence,Keywords\n" +
      userAnalyses.map(item =>
        `"${item.id}","${item.date}","${item.reviewText.replace(/"/g, '""')}","${item.sentiment}",${item.confidence},"${(item.keywords || []).join(';')}"`
      ).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `My_Sentiment_Activity_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <section className="text-left space-y-1 pt-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-indigo-600" /> Account & Activity Log
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold font-headline text-slate-900">
          User Profile
        </h2>
        <p className="text-sm text-slate-500">
          Manage your personal account credentials, view login details, and track your sentiment analysis activity.
        </p>
      </section>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-headline text-slate-900">{currentUser.name}</h3>
                <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md text-xs font-bold border border-indigo-100">
                  {currentUser.plan}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{currentUser.role}</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-mono">
                <Mail className="w-3.5 h-3.5 text-indigo-600" /> {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSignOut}
              className="w-full sm:w-auto px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Account Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Account Status</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-bold text-slate-900">Active & Verified</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Plan Tier</span>
            <div className="mt-1">
              <span className="text-sm font-bold text-indigo-600">{currentUser.plan} Access</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Last Login</span>
            <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Today (Authenticated)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Activity Summary Metrics */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          My Analysis Statistics
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Run</p>
            <p className="text-2xl font-bold font-headline text-slate-900 mt-1">{userAnalyses.length}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">Positive</p>
            <p className="text-2xl font-bold font-headline text-emerald-700 mt-1">{posCount}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider">Negative</p>
            <p className="text-2xl font-bold font-headline text-rose-700 mt-1">{negCount}</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Neutral</p>
            <p className="text-2xl font-bold font-headline text-slate-700 mt-1">{neuCount}</p>
          </div>
        </div>
      </section>

      {/* My Activity Log List */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              My Analysis History
            </h3>
            <p className="text-xs text-slate-400">Only analyses submitted by your account are stored here</p>
          </div>

          {userAnalyses.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-indigo-600" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={onClearHistory}
                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter & Search Bar */}
        {userAnalyses.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your analyzed reviews..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {(['All', 'Positive', 'Negative', 'Neutral'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSentimentFilter(filter)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    sentimentFilter === filter
                      ? 'bg-white text-indigo-600 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Activity List or Empty State */}
        {userAnalyses.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">No Activity Recorded Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Analyze a review in the Real-time Classifier or upload a CSV in Batch Processing to start building your personal activity log.
            </p>
          </div>
        ) : filteredAnalyses.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center text-xs text-slate-400">
            No analyses match your search query.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAnalyses.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-indigo-200 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        item.sentiment === 'Positive'
                          ? 'bg-emerald-100 text-emerald-700'
                          : item.sentiment === 'Negative'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.sentiment}
                    </span>
                    <span className="text-xs font-bold font-mono text-slate-700">
                      {item.confidence}% confidence
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{item.date}</span>
                    <button
                      onClick={() => onDeleteAnalysis(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-800 font-medium italic">
                  "{item.reviewText}"
                </p>

                {item.keywords && item.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.keywords.map((kw, i) => (
                      <span key={i} className="bg-indigo-50 text-indigo-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-indigo-100">
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
