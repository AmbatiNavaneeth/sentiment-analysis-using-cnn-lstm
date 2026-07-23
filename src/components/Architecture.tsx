import React, { useState } from 'react';
import { Layers, ArrowRight, ArrowDown, Cpu, Filter, Zap, Activity, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export const Architecture: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(4); // CNN Layer default

  const layers = [
    {
      step: 1,
      title: 'Input Text',
      type: 'Raw IMDb Review',
      shape: 'String',
      badge: 'Raw Input',
      description: 'Accepts raw review text from movie viewers of variable lengths.',
      details: [
        'Supports reviews up to several paragraphs',
        'Handles punctuation and special characters',
        'Captures raw word order and sentiment context'
      ],
      icon: FileText,
      color: 'text-indigo-400',
      borderColor: 'border-indigo-500/40',
      bgColor: 'bg-indigo-500/10'
    },
    {
      step: 2,
      title: 'Text Cleaning',
      type: 'Regex Preprocessing',
      shape: 'Cleaned String',
      badge: 'Data Preprocessing',
      description: 'Lowercases text, strips HTML tags like <br/>, and removes non-alphanumeric noise.',
      details: [
        'Converts all characters to lowercase',
        'Removes HTML line breaks & tags',
        'Strips punctuation marks and symbols'
      ],
      icon: Filter,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/40',
      bgColor: 'bg-purple-500/10'
    },
    {
      step: 3,
      title: 'Tokenization',
      type: 'Keras Tokenizer',
      shape: '1D Integer Array',
      badge: 'Word Indexing',
      description: 'Maps clean words to integer indices based on the top 10,000 vocabulary dictionary.',
      details: [
        'Fitted on top 10,000 IMDb vocabulary',
        'Out-of-vocabulary (OOV) tokens handled',
        'Transforms words into numerical vector inputs'
      ],
      icon: Cpu,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      bgColor: 'bg-cyan-500/10'
    },
    {
      step: 4,
      title: 'Padding',
      type: 'Sequence Standardization',
      shape: '(Batch, 300)',
      badge: 'Fixed Dimension',
      description: 'Pads or truncates sequences to a fixed sequence length of 300 words.',
      details: [
        'Ensures uniform tensor shapes for GPU computation',
        'Applies post-padding with zero tokens',
        'Truncates reviews longer than 300 words'
      ],
      icon: Layers,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      bgColor: 'bg-amber-500/10'
    },
    {
      step: 5,
      title: 'Embedding Layer',
      type: 'Word Embedding',
      shape: '(Batch, 300, 128)',
      badge: '128-Dim Vector Space',
      description: 'Projects index tokens into a dense 128-dimensional continuous vector space.',
      details: [
        'Learns semantic relationships between movie terms',
        'Captures word similarities (e.g., "fantastic" ≈ "brilliant")',
        'Dimension output: (300 timesteps × 128 features)'
      ],
      icon: Zap,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      bgColor: 'bg-emerald-500/10'
    },
    {
      step: 6,
      title: 'CNN Layer',
      type: 'Conv1D (128 Filters, Kernel=5)',
      shape: '(Batch, 296, 128)',
      badge: 'Feature Extractor',
      description: 'Applies 1D convolution filters to extract local n-gram phrase features.',
      details: [
        'Extracts local sentiment keyphrases (e.g., "acting was fantastic")',
        'Kernel size = 5 captures 5-word phrases',
        'ReLU activation introduces non-linearity'
      ],
      icon: Filter,
      color: 'text-indigo-400',
      borderColor: 'border-indigo-500/40',
      bgColor: 'bg-indigo-500/10'
    },
    {
      step: 7,
      title: 'Max Pooling',
      type: 'MaxPooling1D (Pool Size=2)',
      shape: '(Batch, 148, 128)',
      badge: 'Downsampling',
      description: 'Downsamples sequence spatial size by 50% while retaining dominant features.',
      details: [
        'Reduces computational parameters',
        'Extracts maximum activation features across regions',
        'Prevents model overfitting on training noise'
      ],
      icon: Activity,
      color: 'text-rose-400',
      borderColor: 'border-rose-500/40',
      bgColor: 'bg-rose-500/10'
    },
    {
      step: 8,
      title: 'LSTM Layer',
      type: 'LSTM (128 Memory Units)',
      shape: '(Batch, 128)',
      badge: 'Sequence Dependencies',
      description: 'Captures long-term temporal dependencies across the full review narrative.',
      details: [
        'Remembers long-range review context (e.g., "Started bad BUT ended great")',
        'Gates control memory cell state (Forget, Input, Output gates)',
        'Outputs final 128-dimensional hidden context vector'
      ],
      icon: Cpu,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/40',
      bgColor: 'bg-purple-500/10'
    },
    {
      step: 9,
      title: 'Dense Layer',
      type: 'Fully Connected (64 Units)',
      shape: '(Batch, 64)',
      badge: 'Classifier',
      description: 'Fully connected layer that aggregates high-level representations.',
      details: [
        'Dense linear combinations with ReLU activation',
        'Dropout (0.2) applied for regularization',
        'Prepares feature vector for final decision boundary'
      ],
      icon: Layers,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/40',
      bgColor: 'bg-blue-500/10'
    },
    {
      step: 10,
      title: 'Sigmoid Output',
      type: 'Dense (1 Unit, Sigmoid)',
      shape: '(Batch, 1)',
      badge: 'Binary Sentiment',
      description: 'Outputs a scalar probability score between 0.0 (Negative) and 1.0 (Positive).',
      details: [
        'Threshold = 0.50 (≥0.50 → Positive, <0.50 → Negative)',
        'Calibrated confidence score percentage',
        'Fast response output in ~120ms'
      ],
      icon: ShieldCheck,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      bgColor: 'bg-emerald-500/10'
    }
  ];

  return (
    <section id="architecture" className="py-16 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Deep Learning Pipeline Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-white">
            Hybrid CNN-LSTM Model Architecture
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Why combine CNN and LSTM? <strong className="text-white">CNN layers</strong> act as fast n-gram feature extractors to detect local phrases, while <strong className="text-white">LSTM layers</strong> process sequence order to capture long-range contextual dependencies.
          </p>
        </div>

        {/* Visual Flow Diagram Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Complete End-to-End Tensor Flow
            </h3>
            <span className="text-xs text-indigo-400 font-mono">10 Sequential Layers</span>
          </div>

          {/* Cards connected in grid with arrows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {layers.map((layer, index) => {
              const Icon = layer.icon;
              const isSelected = selectedLayer === index;
              return (
                <div key={layer.step} className="relative flex flex-col justify-between">
                  <button
                    onClick={() => setSelectedLayer(index)}
                    className={`p-4 rounded-2xl border text-left transition-all h-full flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500'
                        : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          Step 0{layer.step}
                        </span>
                        <div className={`w-7 h-7 rounded-lg ${layer.bgColor} flex items-center justify-center`}>
                          <Icon className={`w-3.5 h-3.5 ${layer.color}`} />
                        </div>
                      </div>

                      <h4 className="text-sm font-bold font-headline text-white leading-tight">
                        {layer.title}
                      </h4>
                      <p className="text-[11px] font-semibold text-indigo-300 font-mono">
                        {layer.type}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Shape:</span>
                      <span className="font-mono text-slate-200">{layer.shape}</span>
                    </div>
                  </button>

                  {/* Desktop Connecting Arrow between columns */}
                  {index < layers.length - 1 && (
                    <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-slate-600">
                      <ArrowRight className="w-4 h-4 text-indigo-400/60" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Layer Detail Highlight Box */}
        {selectedLayer !== null && (
          <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/80 pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${layers[selectedLayer].bgColor} border ${layers[selectedLayer].borderColor} flex items-center justify-center`}>
                  {React.createElement(layers[selectedLayer].icon, { className: `w-6 h-6 ${layers[selectedLayer].color}` })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">Layer {layers[selectedLayer].step} of 10</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {layers[selectedLayer].badge}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-headline text-white mt-0.5">
                    {layers[selectedLayer].title} — <span className="text-indigo-400 font-mono text-lg">{layers[selectedLayer].type}</span>
                  </h3>
                </div>
              </div>

              <div className="bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-700 font-mono text-xs text-slate-300">
                Tensor Output: <strong className="text-emerald-400">{layers[selectedLayer].shape}</strong>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {layers[selectedLayer].description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {layers[selectedLayer].details.map((detail, idx) => (
                <div key={idx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
