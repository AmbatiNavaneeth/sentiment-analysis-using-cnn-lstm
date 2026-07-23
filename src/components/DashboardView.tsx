import React, { useState } from 'react';
import { Calendar, MessageSquareQuote, ThumbsUp, ThumbsDown, Download, Sparkles, Check, ArrowRight } from 'lucide-react';
import { BatchReviewItem } from '../types';

interface DashboardViewProps {
  userAnalyses: BatchReviewItem[];
  onNavigateToAnalyze: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ userAnalyses, onNavigateToAnalyze }) => {
  const [downloaded, setDownloaded] = useState(false);

  const total = userAnalyses.length;
  const positiveItems = userAnalyses.filter((a) => a.sentiment === 'Positive');
  const negativeItems = userAnalyses.filter((a) => a.sentiment === 'Negative');
  const neutralItems = userAnalyses.filter((a) => a.sentiment === 'Neutral');

  const posCount = positiveItems.length;
  const negCount = negativeItems.length;
  const neuCount = neutralItems.length;

  const posPct = total > 0 ? Math.round((posCount / total) * 100) : 0;
  const negPct = total > 0 ? Math.round((negCount / total) * 100) : 0;
  const neuPct = total > 0 ? Math.round((neuCount / total) * 100) : 0;

  const avgConfidence = total > 0
    ? Math.round(userAnalyses.reduce((acc, curr) => acc + (curr.confidence || 0), 0) / total)
    : 0;

  // Extract top positive and negative keywords dynamically from real user analyses
  const posKeywords = Array.from(
    new Set(positiveItems.flatMap((i) => i.keywords || []))
  ).slice(0, 8);

  const negKeywords = Array.from(
    new Set(negativeItems.flatMap((i) => i.keywords || []))
  ).slice(0, 8);

  // Group user analyses by day of week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayCounts = daysOfWeek.map((dayName, idx) => {
    const count = userAnalyses.filter((item) => {
      const dateObj = new Date(item.date);
      return !isNaN(dateObj.getTime()) && dateObj.getDay() === idx;
    }).length;
    return { day: dayName, count };
  });

  const maxDayCount = Math.max(...dayCounts.map((d) => d.count), 1);

  const handleDownloadReport = () => {
    const reportData = {
      title: 'Personal Sentiment Insight Summary',
      generatedAt: new Date().toLocaleString(),
      totalReviewsAnalyzed: total,
      breakdown: {
        positive: { count: posCount, percentage: posPct },
        neutral: { count: neuCount, percentage: neuPct },
        negative: { count: negCount, percentage: negPct },
      },
      averageConfidenceScore: avgConfidence,
      extractedPositiveKeywords: posKeywords,
      extractedNegativeKeywords: negKeywords,
      userAnalyses,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `My_Sentiment_Report_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  if (total === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-24 text-center py-12">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-headline text-slate-900">
              No Sentiment Analyses Stored Yet
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Your Sentiment Overview is calculated strictly from your personal submitted review analyses. Run your first review in the classifier or process a batch file to populate your live metrics.
            </p>
          </div>

          <button
            onClick={onNavigateToAnalyze}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <span>Analyze Your First Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24">
      {/* Dashboard Title & Subheader */}
      <section className="flex flex-col gap-1 py-2 text-left">
        <h2 className="text-2xl md:text-3xl font-bold font-headline text-slate-900">
          Sentiment Overview
        </h2>
        <div className="flex items-center gap-2 text-slate-500">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-medium">Calculated directly from your {total} stored review analyses</span>
        </div>
      </section>

      {/* Real Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Positive Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Positive</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-bold font-mono border border-emerald-100">
              {posPct}%
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 font-headline">{posCount}</span>
            <span className="text-slate-400 text-xs">reviews</span>
          </div>
        </div>

        {/* Neutral Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Neutral</span>
            <span className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-xs font-bold font-mono border border-slate-200">
              {neuPct}%
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 font-headline">{neuCount}</span>
            <span className="text-slate-400 text-xs">reviews</span>
          </div>
        </div>

        {/* Negative Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Negative</span>
            <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-xs font-bold font-mono border border-rose-100">
              {negPct}%
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 font-headline">{negCount}</span>
            <span className="text-slate-400 text-xs">reviews</span>
          </div>
        </div>
      </section>

      {/* Model Confidence & Total Count Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Total Reviews */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">
                Total Reviews Analyzed
              </p>
              <h3 className="text-3xl font-bold font-headline text-slate-900">
                {total}
              </h3>
            </div>
            <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 border border-indigo-100">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Real user analysis activity log stored in session memory
          </p>
        </div>

        {/* Average Model Confidence */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Avg Model Confidence</p>
            <h3 className="text-3xl font-bold font-headline text-indigo-600">
              {avgConfidence}%
            </h3>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${avgConfidence}%` }}
            />
          </div>
        </div>
      </section>

      {/* Activity Distribution Bar Chart */}
      <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Analysis Activity Distribution
        </h4>
        <div className="h-40 flex items-end justify-between gap-2 pt-6 px-2">
          {dayCounts.map((item, index) => {
            const heightPct = total > 0 ? Math.max((item.count / maxDayCount) * 100, 10) : 10;
            return (
              <div key={index} className="flex flex-col items-center flex-1 gap-2 group">
                <div className="w-full bg-slate-50 rounded-t-lg relative h-28 flex items-end">
                  <div
                    className="w-full bg-indigo-600 rounded-t-lg group-hover:bg-indigo-700 transition-all duration-300"
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-500">{item.day}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Key Findings extracted from user's data */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Key Extracted Keywords
          </h4>
        </div>

        {/* Positive Keywords */}
        <div className="bg-white rounded-2xl p-5 border-l-4 border-l-emerald-500 border-t border-r border-b border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              Top Positive Terms ({posKeywords.length})
            </span>
          </div>
          {posKeywords.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No positive reviews analyzed yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              {posKeywords.map((word, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-100"
                >
                  {word}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Negative Keywords */}
        <div className="bg-white rounded-2xl p-5 border-l-4 border-l-rose-500 border-t border-r border-b border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center gap-2">
            <ThumbsDown className="w-4 h-4 text-rose-600" />
            <span className="text-xs font-bold text-rose-900 uppercase tracking-wider">
              Top Negative Terms ({negKeywords.length})
            </span>
          </div>
          {negKeywords.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No negative reviews analyzed yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              {negKeywords.map((word, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-rose-50 text-rose-700 rounded-lg text-xs font-semibold border border-rose-100"
                >
                  {word}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Export Button */}
      <section className="pt-2">
        <button
          onClick={handleDownloadReport}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-semibold text-xs shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {downloaded ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Report Exported Successfully!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Export Personal Sentiment Summary</span>
            </>
          )}
        </button>
      </section>
    </div>
  );
};
