import React from 'react';
import { Sparkles, Clock, Cpu, CheckCircle2, XCircle, BarChart3, Activity } from 'lucide-react';
import { PredictionResult } from '../types';

interface PredictionCardProps {
  result: PredictionResult;
  originalText?: string;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ result, originalText }) => {
  const isPositive = result.prediction === 'Positive';
  const confidencePct = result.confidence;
  const probability = result.probability;

  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden transition-all ${
        isPositive
          ? 'bg-slate-800/90 border-emerald-500/40 shadow-emerald-900/10'
          : 'bg-slate-800/90 border-rose-500/40 shadow-rose-900/10'
      }`}
    >
      {/* Background Accent Glow */}
      <div
        className={`absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
          isPositive ? 'bg-emerald-500/15' : 'bg-rose-500/15'
        }`}
      />

      <div className="relative z-10 space-y-6">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/80">
          <div className="flex items-center gap-3">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                isPositive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}
            >
              {isPositive ? '😊' : '😞'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Predicted Sentiment
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border ${
                    isPositive
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  }`}
                >
                  {result.model}
                </span>
              </div>
              <h3
                className={`text-2xl sm:text-3xl font-bold font-headline mt-0.5 ${
                  isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {result.prediction} Movie Review
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/70 px-4 py-2 rounded-2xl border border-slate-700">
            <Clock className="w-4 h-4 text-indigo-400" />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block leading-none">
                Inference Time
              </span>
              <span className="text-xs font-bold text-white font-mono">{result.processing_time}</span>
            </div>
          </div>
        </div>

        {/* Confidence & Probability Gauge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Confidence Score Bar */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-400" /> Confidence Score
              </span>
              <span
                className={`font-bold font-mono text-sm ${
                  isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {confidencePct}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  isPositive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : 'bg-gradient-to-r from-rose-500 to-red-400'
                }`}
                style={{ width: `${Math.max(10, confidencePct)}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400">
              Neural probability margin derived from dense layer sigmoid activation.
            </p>
          </div>

          {/* Probability Metric */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-400" /> Sigmoid Probability
              </span>
              <span className="font-bold font-mono text-sm text-white">
                {probability.toFixed(3)}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
              <span>0.0 (Negative)</span>
              <span>0.5 (Threshold)</span>
              <span>1.0 (Positive)</span>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full relative">
              <div
                className="absolute top-0 bottom-0 w-3 -ml-1.5 bg-indigo-400 rounded-full border border-white shadow-md"
                style={{ left: `${Math.round(probability * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* AI Model Summary Explanation */}
        {result.summary && (
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Deep Learning Reasoning</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-normal">
              {result.summary}
            </p>
          </div>
        )}

        {/* Extracted Key Tokens if available */}
        {result.extracted_features && (
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-700/60 text-xs">
            <span className="text-slate-400 font-semibold">Salient Feature Tokens:</span>
            {result.extracted_features.positive_tokens?.map((t, idx) => (
              <span key={idx} className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md font-mono text-[11px]">
                +{t}
              </span>
            ))}
            {result.extracted_features.negative_tokens?.map((t, idx) => (
              <span key={idx} className="bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-md font-mono text-[11px]">
                -{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
