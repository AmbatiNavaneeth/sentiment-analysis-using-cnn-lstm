import React, { useState } from 'react';
import { Send, Eraser, Sparkles, ThumbsUp, ThumbsDown, AlertCircle, Film, RefreshCw, MessageSquareQuote } from 'lucide-react';
import { PredictionResult, ExampleReview } from '../types';
import { predictSentimentApi } from '../api/client';
import { PredictionCard } from './PredictionCard';

export const EXAMPLE_REVIEWS: ExampleReview[] = [
  {
    id: 'ex-1',
    type: 'positive',
    movie: 'Inception (2010)',
    text: 'This movie was absolutely fantastic. The acting and story were amazing. Christopher Nolan crafts a breathtaking visual masterpiece with deep emotional resonance.',
    expectedConfidence: 97.2,
  },
  {
    id: 'ex-2',
    type: 'negative',
    movie: 'Uninspired Sequel (2022)',
    text: 'This movie was boring and a complete waste of time. The plot was predictable, pacing was horribly dull, and the dialog felt extremely unnatural.',
    expectedConfidence: 94.8,
  },
  {
    id: 'ex-3',
    type: 'positive',
    movie: 'The Dark Knight (2008)',
    text: 'A brilliant cinematic achievement! Heath Ledger delivers an unforgettable performance that keeps you on the edge of your seat from start to finish.',
    expectedConfidence: 98.5,
  },
  {
    id: 'ex-4',
    type: 'negative',
    movie: 'Flat Comedy (2021)',
    text: 'I really wanted to like this film, but it fell completely flat. Unfunny jokes, zero chemistry between leads, and lazy directing throughout.',
    expectedConfidence: 91.0,
  }
];

export const PredictionForm: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [showExamples, setShowExamples] = useState(false);

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;

  const handleAnalyze = async (textToAnalyze?: string) => {
    const text = textToAnalyze || inputText;
    if (!text || !text.trim()) {
      setError('Please enter or select a movie review before analyzing.');
      return;
    }

    if (text.trim().length < 5) {
      setError('Review is too short. Please type a meaningful movie review (at least 5 characters).');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const apiResult = await predictSentimentApi(text);
      setResult(apiResult);
    } catch (err) {
      console.error('Prediction error:', err);
      setError('Unable to process prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setError(null);
  };

  const handleSelectExample = (ex: ExampleReview) => {
    setInputText(ex.text);
    setError(null);
    setShowExamples(false);
    handleAnalyze(ex.text);
  };

  return (
    <section id="predict" className="py-12 bg-slate-900 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Real-time Inference Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-headline text-white">
            Classify IMDb Movie Review Sentiment
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Input any movie review text below. The CNN-LSTM deep learning network will preprocess the text and output sentiment probability in real time.
          </p>
        </div>

        {/* Glassmorphism Main Card */}
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Subtle Ambient Light Corner */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-600/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Bar: Examples Toggle & Word Spec */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-indigo-400" />
              <label htmlFor="movie-review-input" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Movie Review Text Input
              </label>
            </div>

            <button
              onClick={() => setShowExamples(!showExamples)}
              className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <MessageSquareQuote className="w-3.5 h-3.5 text-indigo-400" />
              <span>{showExamples ? 'Hide Examples' : 'Example Reviews'}</span>
            </button>
          </div>

          {/* Example Reviews Pills / Modal Card */}
          {showExamples && (
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Select a Sample IMDb Review:
                </p>
                <span className="text-[10px] text-slate-400">Click to load and analyze instantly</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {EXAMPLE_REVIEWS.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => handleSelectExample(ex)}
                    className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 rounded-xl text-left transition-all group cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {ex.movie}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ex.type === 'positive'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {ex.type === 'positive' ? '😊 Positive' : '😞 Negative'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 italic">"{ex.text}"</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Text Area Input */}
          <div className="relative">
            <textarea
              id="movie-review-input"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                if (error) setError(null);
              }}
              rows={5}
              placeholder="Enter your movie review... (e.g. 'This movie was absolutely fantastic! The acting and story were amazing.')"
              className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all resize-y font-sans leading-relaxed"
            />

            {/* Character & Word Counters */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
              <span className="flex items-center gap-1.5">
                <span>Model max vocab token window: 300 words</span>
              </span>
              <div className="flex items-center gap-3 font-mono">
                <span>{wordCount} words</span>
                <span className={charCount > 2500 ? 'text-amber-400 font-bold' : ''}>
                  {charCount.toLocaleString()} chars
                </span>
              </div>
            </div>
          </div>

          {/* Error Message banner */}
          {error && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleAnalyze()}
                disabled={loading}
                className="flex-1 sm:flex-none px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-xl font-semibold text-xs shadow-md shadow-indigo-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-white animate-spin" />
                    <span>Running CNN-LSTM Inference...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Analyze Review</span>
                  </>
                )}
              </button>

              <button
                onClick={handleClear}
                disabled={loading || (!inputText && !result)}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 hover:text-white border border-slate-700 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                title="Clear input and result"
              >
                <Eraser className="w-4 h-4 text-slate-400" />
                <span>Clear</span>
              </button>
            </div>

            {/* Example Pills Quick Bar */}
            <div className="hidden md:flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 text-[11px]">Quick try:</span>
              <button
                onClick={() => handleSelectExample(EXAMPLE_REVIEWS[0])}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-emerald-400 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                + Fantastic Example
              </button>
              <button
                onClick={() => handleSelectExample(EXAMPLE_REVIEWS[1])}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-rose-400 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                - Boring Example
              </button>
            </div>
          </div>
        </div>

        {/* Prediction Results Display Card */}
        {loading && (
          <div className="mt-8 bg-slate-800/60 border border-slate-700 p-8 rounded-3xl text-center space-y-4 animate-pulse">
            <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
            <div className="space-y-2">
              <p className="text-base font-bold text-white">Running Deep Neural Inference...</p>
              <p className="text-xs text-slate-400">
                Tokenizing → Padding sequence (300) → Conv1D Feature Extract → LSTM Temporal Memory → Sigmoid
              </p>
            </div>
            <div className="w-48 bg-slate-700 h-2 rounded-full mx-auto overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full animate-indeterminate" />
            </div>
          </div>
        )}

        {!loading && result && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <PredictionCard result={result} originalText={inputText} />
          </div>
        )}
      </div>
    </section>
  );
};
