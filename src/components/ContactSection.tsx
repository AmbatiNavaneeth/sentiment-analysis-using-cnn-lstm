import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Github, Server } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 bg-slate-900 text-white relative border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>Developer Support & Integration</span>
          </div>
          <h2 className="text-3xl font-bold font-headline text-white">
            Get in Touch
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Have questions about integrating the FastAPI backend or running custom training scripts on IMDb? Send us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Info & Deployment Cards */}
          <div className="space-y-4">
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-3">
              <h3 className="text-base font-bold font-headline text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-400" />
                <span>Production Deployment Architecture</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The application is architected for dual deployment: React frontend optimized for Vercel, and FastAPI model server optimized for Render or Docker containers.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-1 bg-slate-900 text-indigo-300 rounded-lg border border-slate-700">
                  Frontend: Vercel SPA
                </span>
                <span className="px-2.5 py-1 bg-slate-900 text-emerald-300 rounded-lg border border-slate-700">
                  Backend: Render FastAPI
                </span>
              </div>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 space-y-3">
              <h3 className="text-base font-bold font-headline text-white flex items-center gap-2">
                <Github className="w-5 h-5 text-purple-400" />
                <span>Open Source Repository</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Access full Jupyter notebook training scripts, Keras model architecture code, preprocessing utilities, and Docker setup instructions on GitHub.
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline"
              >
                <span>Browse TensorFlow Training Scripts →</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800/90 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-headline text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <span>Send Message</span>
            </h3>

            {submitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Thank you for reaching out. We will review your inquiry and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="text-xs font-semibold text-slate-300 ml-1">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full mt-1 bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 ml-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full mt-1 bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 ml-1">Message</label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help with your CNN-LSTM model deployment?"
                    className="w-full mt-1 bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs shadow-md shadow-indigo-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
