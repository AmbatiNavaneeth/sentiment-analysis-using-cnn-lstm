import React from 'react';
import { Database, PieChart, FileText, Hash, CheckCircle, Layers, Cpu, Server } from 'lucide-react';

export const AboutModel: React.FC = () => {
  const specs = [
    {
      title: 'Dataset Source',
      value: 'IMDb Movie Reviews',
      subtitle: 'Benchmark NLP Corpus',
      icon: Database,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
      details: 'Contains highly polar movie reviews for binary sentiment classification.'
    },
    {
      title: 'Dataset Size',
      value: '50,000 Reviews',
      subtitle: '25k Positive / 25k Negative',
      icon: FileText,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
      details: 'Strictly balanced binary distribution ensuring zero class imbalance bias.'
    },
    {
      title: 'Training / Testing Split',
      value: '80% / 20%',
      subtitle: '40,000 Train / 10,000 Test',
      icon: PieChart,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      details: '80% used for model training with 5-fold cross-validation and 20% held-out test evaluation.'
    },
    {
      title: 'Vocabulary Size',
      value: '10,000 Words',
      subtitle: 'Top Frequency Tokens',
      icon: Hash,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      details: 'Indexed top 10,000 most frequent word tokens using Keras Tokenizer.'
    },
    {
      title: 'Max Sequence Length',
      value: '300 Words',
      subtitle: 'Post-padding Window',
      icon: Layers,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      details: 'Reviews padded or truncated to uniform fixed length of 300 sequence steps.'
    },
    {
      title: 'Loss & Optimizer',
      value: 'Binary Crossentropy',
      subtitle: 'Adam Optimizer (lr=0.001)',
      icon: Cpu,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
      details: 'Optimized using Adam with early stopping callback to prevent overfitting.'
    },
  ];

  return (
    <section id="about" className="py-16 bg-slate-900/95 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-semibold">
            <Database className="w-3.5 h-3.5 text-purple-400" />
            <span>Dataset & Training Configuration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-white">
            About the IMDb Sentiment Model
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Engineered on the benchmark IMDb Movie Reviews dataset consisting of 50,000 labeled reviews.
            The CNN-LSTM model is designed for high accuracy and fast real-time inference.
          </p>
        </div>

        {/* 6-Grid Specification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {specs.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/60 backdrop-blur-md p-6 rounded-3xl border border-slate-700/80 shadow-xl space-y-3 hover:border-indigo-500/40 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-slate-900 px-2 py-1 rounded-md border border-slate-800">
                    Param #{index + 1}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    {item.title}
                  </span>
                  <h3 className="text-2xl font-bold font-headline text-white mt-1 group-hover:text-indigo-300 transition-colors">
                    {item.value}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-400 mt-0.5">{item.subtitle}</p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-700/60 pt-3">
                  {item.details}
                </p>
              </div>
            );
          })}
        </div>

        {/* Data Pipeline Flow Banner */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-indigo-950/80 p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold font-headline text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-400" />
                <span>IMDb Data Preprocessing Pipeline</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Text is cleaned, lowercased, stripped of HTML markup and special characters, tokenized into word indices using the top 10k vocabulary, and padded to uniform 300-word sequences.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-700 text-xs font-mono text-emerald-400 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Balanced 50/50 Positive/Negative Split</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
