import React from 'react';
import { Sparkles, ArrowRight, Play, Database, Zap, CheckCircle2, Cpu } from 'lucide-react';

interface HeroProps {
  onAnalyzeClick: () => void;
  onLearnMoreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyzeClick, onLearnMoreClick }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-900 text-white">
      {/* Background Neural Grid & Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Decorative Grid SVG */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span>Deep Learning Keras & TensorFlow Pipeline</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tight text-white leading-tight">
            AI Powered Movie Review <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
              Sentiment Analysis
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Analyze IMDb movie reviews instantly using a trained Deep Learning <strong className="text-white font-semibold">CNN-LSTM</strong> model.
            Combines local feature extraction with long-term sequence dependency modeling.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onAnalyzeClick}
              className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Analyze Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onLearnMoreClick}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white rounded-xl font-semibold text-sm border border-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>About Architecture</span>
            </button>
          </div>

          {/* Key Quick Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-3xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/60 text-left">
              <div className="flex items-center gap-2 text-indigo-400 mb-1">
                <Database className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Dataset</span>
              </div>
              <p className="text-lg font-bold text-white font-headline">50,000 IMDb</p>
              <p className="text-[10px] text-slate-400">Balanced Reviews</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/60 text-left">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Accuracy</span>
              </div>
              <p className="text-lg font-bold text-white font-headline">90.4%</p>
              <p className="text-[10px] text-slate-400">On Test Set</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/60 text-left">
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <Cpu className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Architecture</span>
              </div>
              <p className="text-lg font-bold text-white font-headline">CNN + LSTM</p>
              <p className="text-[10px] text-slate-400">Hybrid Deep Model</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/60 text-left">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Inference</span>
              </div>
              <p className="text-lg font-bold text-white font-headline">&lt;120 ms</p>
              <p className="text-[10px] text-slate-400">Fast Response</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
