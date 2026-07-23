import React from 'react';
import { HelpCircle, MessageSquare, Filter, Cpu, Layers, Sparkles, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'User Enters Review',
      subtitle: 'Raw Text Input',
      description: 'The user types or selects a movie review text in the interactive review form.',
      icon: MessageSquare,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
    },
    {
      step: '02',
      title: 'Text Preprocessing',
      subtitle: 'Tokenization & Padding',
      description: 'Input text is cleaned, lowercased, indexed via Keras Tokenizer (top 10k vocab), and padded to 300 words.',
      icon: Filter,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    {
      step: '03',
      title: 'CNN Local Feature Extraction',
      subtitle: 'Conv1D + Max Pooling',
      description: '1D Convolutional filters slide across the embedded word vectors to extract local 5-gram sentiment phrases.',
      icon: Cpu,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
    {
      step: '04',
      title: 'LSTM Long-Term Dependencies',
      subtitle: 'Recurrent Memory Gating',
      description: 'The downsampled feature vectors pass through 128 LSTM memory units that preserve long-range review order context.',
      icon: Layers,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      step: '05',
      title: 'Model Sentiment Prediction',
      subtitle: 'Dense Sigmoid Activation',
      description: 'The dense layer computes the final scalar probability score outputting Positive (≥0.50) or Negative (<0.50).',
      icon: Sparkles,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Step-by-Step Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-white">
            How the CNN-LSTM Pipeline Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            From raw user review text to high-confidence deep learning prediction in 5 seamless automated stages.
          </p>
        </div>

        {/* 5 Sequential Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-slate-800/70 p-5 rounded-3xl border border-slate-700/80 shadow-xl space-y-3 relative hover:border-indigo-500/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Step {item.step}
                    </span>
                    <div className={`w-9 h-9 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold font-headline text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-indigo-300 mt-0.5 font-mono">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400">
                      <ArrowRight className="w-3 h-3 text-indigo-400" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
