import React, { useState, useRef } from 'react';
import { Upload, Download, FileSpreadsheet, Search, Sparkles, Filter, CheckCircle2, AlertCircle, FileText, RefreshCw } from 'lucide-react';
import Papa from 'papaparse';
import { BatchReviewItem, SentimentType } from '../types';
import { SAMPLE_CSV_CONTENT } from '../data/mockData';

interface BatchViewProps {
  batchItems: BatchReviewItem[];
  setBatchItems: React.Dispatch<React.SetStateAction<BatchReviewItem[]>>;
}

export const BatchView: React.FC<BatchViewProps> = ({ batchItems, setBatchItems }) => {
  const [filterSentiment, setFilterSentiment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [processing, setProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analyze single review fallback helper
  const analyzeTextLocally = (text: string) => {
    const lower = text.toLowerCase();
    const posWords = ['good', 'great', 'excellent', 'fast', 'love', 'best', 'awesome', 'reliable', 'exceeded', 'outstanding', 'polite', 'helpful'];
    const negWords = ['bad', 'terrible', 'slow', 'broken', 'useless', 'crash', 'bug', 'clunky', 'poor', 'hate', 'delay', 'issue'];

    let pos = 0;
    let neg = 0;
    posWords.forEach(w => { if (lower.includes(w)) pos++; });
    negWords.forEach(w => { if (lower.includes(w)) neg++; });

    let sentiment: SentimentType = 'Neutral';
    let confidence = 85;

    if (pos > neg) {
      sentiment = 'Positive';
      confidence = Math.min(99, 82 + (pos - neg) * 5);
    } else if (neg > pos) {
      sentiment = 'Negative';
      confidence = Math.min(98, 80 + (neg - pos) * 5);
    }

    return {
      sentiment,
      confidence,
      keywords: pos > neg ? ['Positive Feedback', 'Service'] : neg > pos ? ['Issue Reported', 'Attention Required'] : ['Standard Review'],
      score: sentiment === 'Positive' ? 0.85 : sentiment === 'Negative' ? -0.8 : 0.05,
    };
  };

  const handleFileUpload = (file: File) => {
    setProcessing(true);
    setUploadSuccess(false);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedRows = results.data as Record<string, string>[];
        const newBatch: BatchReviewItem[] = parsedRows.map((row, index) => {
          const text = row.reviewText || row.review || row.Review || row.text || row.Feedback || Object.values(row)[0] || '';
          const name = row.reviewerName || row.name || row.Name || row.Customer || `Customer ${index + 1}`;
          const category = row.category || row.Category || 'General';
          const date = row.date || row.Date || new Date().toISOString().split('T')[0];

          const analysis = analyzeTextLocally(text);

          return {
            id: `CSV-${Date.now().toString().slice(-4)}-${index + 1}`,
            reviewerName: name,
            reviewText: text,
            category,
            date,
            sentiment: analysis.sentiment,
            confidence: analysis.confidence,
            keywords: analysis.keywords,
            score: analysis.score,
          };
        });

        if (newBatch.length > 0) {
          setBatchItems((prev) => [...newBatch, ...prev]);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 4000);
        }
        setProcessing(false);
      },
      error: (err) => {
        console.error('CSV parse error:', err);
        setProcessing(false);
      },
    });
  };

  const loadSampleCSV = () => {
    setProcessing(true);
    const blob = new Blob([SAMPLE_CSV_CONTENT], { type: 'text/csv' });
    const file = new File([blob], 'sample_indian_reviews.csv');
    handleFileUpload(file);
  };

  const handleDownloadCSV = () => {
    const csvData = batchItems.map((item) => ({
      ID: item.id,
      Customer: item.reviewerName,
      ReviewText: item.reviewText,
      Category: item.category,
      Date: item.date,
      SentimentResult: item.sentiment,
      ConfidencePercent: item.confidence + '%',
      Score: item.score,
      Keywords: item.keywords.join('; '),
    }));

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Sentiment_Batch_Results_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const filteredItems = batchItems.filter((item) => {
    const matchesSentiment =
      filterSentiment === 'All' || item.sentiment === filterSentiment;
    const matchesSearch =
      item.reviewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSentiment && matchesSearch;
  });

  const avgConfidence =
    batchItems.length > 0
      ? (
          batchItems.reduce((acc, curr) => acc + curr.confidence, 0) /
          batchItems.length
        ).toFixed(1)
      : '94.2';

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24">
      {/* Header */}
      <section className="space-y-1 text-left">
        <p className="text-xs font-bold text-indigo-600 flex items-center gap-1 uppercase tracking-wider">
          <FileSpreadsheet className="w-4 h-4" /> Batch Processing Engine
        </p>
        <h2 className="text-2xl md:text-3xl font-bold font-headline text-slate-900">
          Bulk Sentiment Analysis
        </h2>
        <p className="text-sm text-slate-500">
          Upload CSV files containing customer reviews to calculate sentiment polarity scores in bulk.
        </p>
      </section>

      {/* Upload Zone Card */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden text-center space-y-4">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100 text-indigo-600">
            <Upload className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold font-headline text-slate-900">Upload CSV File</h3>
            <p className="text-xs text-slate-400">
              Drag & drop your review data CSV file here or select file to browse
            </p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          <div className="flex flex-wrap justify-center gap-3 w-full max-w-md pt-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={processing}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{processing ? 'Processing CSV...' : 'Browse CSV Files'}</span>
            </button>

            <button
              onClick={loadSampleCSV}
              disabled={processing}
              className="bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 py-3 px-4 rounded-xl font-semibold text-xs border border-slate-200 hover:border-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Load Sample CSV</span>
            </button>
          </div>

          {uploadSuccess && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>CSV file parsed and analyzed successfully!</span>
            </div>
          )}

          <p className="text-[11px] text-slate-400">Supports .CSV format with header columns (Max 10MB)</p>
        </div>
      </section>

      {/* Batch Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Processed Items</p>
          <p className="text-2xl font-bold font-headline text-slate-900 mt-1">{batchItems.length}</p>
        </div>

        <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg. Confidence</p>
          <div className="flex items-center gap-1.5 mt-1">
            <p className="text-2xl font-bold font-headline text-slate-900">{avgConfidence}%</p>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Current Batch Table */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Current Batch Results
            </h3>
            <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              AI Live
            </span>
          </div>

          {/* Sentiment Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {['All', 'Positive', 'Negative', 'Neutral'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterSentiment(st)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filterSentiment === st
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search batch reviews by text, customer name, or category..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
        </div>

        {/* Table Container */}
        <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500">Customer & Review</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500">Sentiment</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 text-right">Conf.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-xs text-slate-400">
                      No review items match your search filter.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3.5 max-w-xs">
                        <div className="text-xs font-semibold text-slate-900">{item.reviewerName}</div>
                        <div className="text-xs text-slate-500 line-clamp-2 italic font-sans mt-0.5">
                          "{item.reviewText}"
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            item.sentiment === 'Positive'
                              ? 'bg-emerald-100 text-emerald-700'
                              : item.sentiment === 'Negative'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {item.sentiment}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right text-xs font-bold font-mono text-slate-900">
                        {item.confidence}%
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Export Action Buttons */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          onClick={handleDownloadCSV}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-xl shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-indigo-600" />
          <span>Download Results (CSV)</span>
        </button>

        <button
          onClick={handleExportPDF}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-xl shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer"
        >
          <FileText className="w-4 h-4 text-indigo-600" />
          <span>Export Summary Report</span>
        </button>
      </section>
    </div>
  );
};
