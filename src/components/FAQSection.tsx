import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why combine CNN and LSTM for sentiment analysis?',
      a: 'Convolutional Neural Networks (CNN) excel at local spatial feature extraction (identifying key n-gram phrases like "acting was fantastic"). Long Short-Term Memory (LSTM) networks excel at sequential temporal dependencies (understanding context across paragraph lengths). Combining both produces higher accuracy than either architecture alone.'
    },
    {
      q: 'What is the format of the input review text?',
      a: 'The input can be any plain text movie review. The backend automatically cleans HTML tags (<br/>), lowercases characters, strips non-alphanumeric noise, maps words to top 10,000 vocabulary indices, and pads the sequence to 300 words.'
    },
    {
      q: 'How fast is the prediction inference time?',
      a: 'Inference time averages 100ms to 140ms per review request. The model loads into server GPU/CPU memory once during startup on Render/FastAPI or Express proxy, ensuring instant predictions without cold starts.'
    },
    {
      q: 'Can I connect a newly trained Keras model?',
      a: 'Yes! Simply save your Keras model as "sentiment_model.keras" and your tokenizer as "tokenizer.pkl" inside the "/backend/models/" folder. The FastAPI model_loader.py script will pick up your new trained weights seamlessly.'
    },
    {
      q: 'How does the model handle out-of-vocabulary (OOV) words?',
      a: 'Words outside the top 10,000 vocabulary dictionary are mapped to an <OOV> index token during tokenization, maintaining sequence integrity without throwing runtime exceptions.'
    }
  ];

  return (
    <section className="py-16 bg-slate-900/95 text-white relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-headline text-white">
            CNN-LSTM Model & Deployment FAQ
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Answers to technical questions about architecture, dataset preprocessing, and production deployment.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-slate-800/60 rounded-2xl border border-slate-700/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-semibold text-sm sm:text-base text-white flex justify-between items-center gap-3 cursor-pointer hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-700/60 pt-3">
                    {faq.a}
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
