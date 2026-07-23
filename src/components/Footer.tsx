import React from 'react';
import { Film, Github, Linkedin, Mail, Heart, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const techStack = [
    'TensorFlow',
    'Keras',
    'CNN + LSTM',
    'Python FastAPI',
    'React 19',
    'Tailwind CSS',
    'Axios',
    'Scikit-learn',
    'NumPy'
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          {/* Brand */}
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Film className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-white tracking-tight">
                Sentiment Analysis Using CNN-LSTM
              </h4>
              <p className="text-[11px] text-slate-500">
                Deep Learning IMDb Movie Review Classification Engine
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-indigo-400 border border-slate-800 transition-colors cursor-pointer"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@ai-sentiment.org"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 transition-colors cursor-pointer"
              title="Email Contact"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-2 text-center md:text-left">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-center md:justify-start gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Built With Modern AI Tech Stack</span>
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg text-[11px] font-mono border border-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Sentiment Analysis Using CNN-LSTM. Production Ready.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Production Vercel & Render Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
