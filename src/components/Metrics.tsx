import React, { useState } from 'react';
import { Activity, CheckCircle, Target, Zap, BarChart3, ShieldCheck, TrendingUp } from 'lucide-react';

export const Metrics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'roc'>('matrix');

  const metricCards = [
    {
      name: 'Accuracy',
      value: '90.4%',
      percentage: 90.4,
      description: 'Overall correct predictions across 10,000 test reviews.',
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      name: 'Precision',
      value: '89.8%',
      percentage: 89.8,
      description: 'Proportion of reviews predicted positive that were truly positive.',
      icon: Target,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
    },
    {
      name: 'Recall',
      value: '91.2%',
      percentage: 91.2,
      description: 'Proportion of actual positive reviews correctly identified.',
      icon: Zap,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    {
      name: 'F1 Score',
      value: '90.5%',
      percentage: 90.5,
      description: 'Harmonic mean of precision and recall for balanced evaluation.',
      icon: ShieldCheck,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
  ];

  return (
    <section id="metrics" className="py-16 bg-slate-900/95 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Model Evaluation & Performance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-white">
            Model Metrics & Evaluation
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Tested on 10,000 unseen held-out IMDb reviews. The CNN-LSTM hybrid model achieves a superior 90.4% classification accuracy with balanced precision and recall.
          </p>
        </div>

        {/* Top 4 Key Metrics Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 p-5 rounded-3xl border border-slate-700/80 shadow-xl space-y-3 hover:border-slate-600 transition-all"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {m.name}
                  </span>
                  <div className={`p-2 rounded-xl ${m.bg} ${m.border} border`}>
                    <Icon className={`w-4 h-4 ${m.color}`} />
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-headline text-white">{m.value}</span>
                  <span className="text-[11px] font-mono text-slate-400">Target &gt;85%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                    style={{ width: `${m.percentage}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Confusion Matrix & ROC Curve Tab View */}
        <div className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-4">
            <div>
              <h3 className="text-xl font-bold font-headline text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                <span>Visual Performance Diagnostics</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Evaluated on 10,000 test set instances (5,000 positive + 5,000 negative)
              </p>
            </div>

            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('matrix')}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'matrix'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Confusion Matrix
              </button>
              <button
                onClick={() => setActiveTab('roc')}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'roc'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ROC Curve (AUC = 0.96)
              </button>
            </div>
          </div>

          {/* TAB 1: Confusion Matrix */}
          {activeTab === 'matrix' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="max-w-xl mx-auto">
                <div className="text-center mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Predicted Class
                  </span>
                  <div className="grid grid-cols-2 gap-2 mt-1 text-xs font-semibold text-slate-300">
                    <span className="bg-slate-900 py-1.5 rounded-t-xl border border-slate-800">
                      Predicted Positive
                    </span>
                    <span className="bg-slate-900 py-1.5 rounded-t-xl border border-slate-800">
                      Predicted Negative
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* True Positive */}
                  <div className="bg-emerald-500/10 border-2 border-emerald-500/40 p-5 rounded-2xl text-center space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                      True Positive (TP)
                    </span>
                    <p className="text-3xl font-bold font-headline text-white">4,560</p>
                    <p className="text-[11px] text-slate-300">
                      Correctly identified positive reviews (45.6%)
                    </p>
                  </div>

                  {/* False Negative */}
                  <div className="bg-rose-500/10 border-2 border-rose-500/30 p-5 rounded-2xl text-center space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                      False Negative (FN)
                    </span>
                    <p className="text-3xl font-bold font-headline text-white">440</p>
                    <p className="text-[11px] text-slate-300">
                      Positive reviews misclassified as negative (4.4%)
                    </p>
                  </div>

                  {/* False Positive */}
                  <div className="bg-amber-500/10 border-2 border-amber-500/30 p-5 rounded-2xl text-center space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      False Positive (FP)
                    </span>
                    <p className="text-3xl font-bold font-headline text-white">520</p>
                    <p className="text-[11px] text-slate-300">
                      Negative reviews misclassified as positive (5.2%)
                    </p>
                  </div>

                  {/* True Negative */}
                  <div className="bg-indigo-500/10 border-2 border-indigo-500/40 p-5 rounded-2xl text-center space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                      True Negative (TN)
                    </span>
                    <p className="text-3xl font-bold font-headline text-white">4,480</p>
                    <p className="text-[11px] text-slate-300">
                      Correctly identified negative reviews (44.8%)
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400 pt-4 border-t border-slate-700/60 mt-4">
                  <span>Total Test Samples: 10,000</span>
                  <span className="text-emerald-400 font-bold">Total Correct: 9,040 (90.4%)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROC Curve SVG Chart */}
          {activeTab === 'roc' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* SVG Curve Chart */}
                <div className="w-full md:w-2/3 bg-slate-900 p-4 rounded-2xl border border-slate-700 relative">
                  <div className="flex justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span>Receiver Operating Characteristic (ROC)</span>
                    <span className="text-emerald-400 font-bold">AUC = 0.962</span>
                  </div>

                  <svg viewBox="0 0 300 200" className="w-full h-52 stroke-current">
                    {/* Grid lines */}
                    <line x1="30" y1="20" x2="30" y2="170" stroke="#334155" strokeWidth="1" />
                    <line x1="30" y1="170" x2="280" y2="170" stroke="#334155" strokeWidth="1" />
                    <line x1="30" y1="95" x2="280" y2="95" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="155" y1="20" x2="155" y2="170" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Random Guess Diagonal Line */}
                    <line x1="30" y1="170" x2="280" y2="20" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />

                    {/* CNN-LSTM ROC Curve */}
                    <path
                      d="M 30 170 Q 35 30 280 20"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3.5"
                    />

                    {/* Shaded Area Under Curve */}
                    <path
                      d="M 30 170 Q 35 30 280 20 L 280 170 Z"
                      fill="url(#rocGradient)"
                      opacity="0.25"
                    />

                    <defs>
                      <linearGradient id="rocGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Axes Labels */}
                    <text x="140" y="192" fill="#94a3b8" fontSize="10" textAnchor="middle">False Positive Rate (FPR)</text>
                    <text x="12" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle" transform="rotate(-90 12 100)">True Positive Rate (TPR)</text>
                  </svg>
                </div>

                {/* Explanation text */}
                <div className="w-full md:w-1/3 space-y-3 bg-slate-900/60 p-5 rounded-2xl border border-slate-700/80">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4" />
                    <span>Area Under Curve (AUC)</span>
                  </div>
                  <p className="text-3xl font-bold font-headline text-white">0.962</p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    An AUC score of 0.962 demonstrates excellent classification discrimination capability, proving the model reliably separates positive and negative IMDb reviews at varying decision thresholds.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
