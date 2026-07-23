import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Bot, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { AdminUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: AdminUser = {
      id: `USR-${Date.now().toString().slice(-3)}`,
      name: fullName.trim() || (email ? email.split('@')[0] : 'Rajesh Kumar'),
      role: 'Enterprise Analytics Director',
      plan: 'Enterprise',
      lastActive: 'active just now',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX5_n1iLBC4bilgwYj5dsDv3b4x3W-ckDeoPtMz6o6Sdek26RyrbyObdBOoGmiNqI0aXpVCBjomxE7gpQxaXLwH-Tt_1jrL3yhfJVBZK-zOtEJGTa99J_l9u-b-jVgjerpGkzwrwK6VTp7SGHKvE86CCSuGujEGVAri2JcKKtq819644Z3Om-nPdPr81WpI1B0iV4J-39X3VtIEJfo5CfjNsqrGxQj5fFvrMEqMySw5aqZJqFqIFbiVjuzXE8ov6ECZWKbGLisAdIq',
      initials: (fullName || 'Rajesh Kumar').split(' ').map((n) => n[0]).join('').slice(0, 2),
      email: email || 'rajesh.kumar@techtel.co.in',
      status: 'Active',
    };

    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-2xl p-6 shadow-xl bg-white border border-slate-200 space-y-5 my-auto max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <Bot className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold font-headline text-slate-900">Sentiment Insight AI</h2>
          <p className="text-xs text-slate-400">Precision Analysis for High-Growth Teams</p>
        </div>

        {/* Form Title */}
        <div className="text-center pt-1">
          <h3 className="text-lg font-bold font-headline text-slate-900">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-slate-500">
            {isRegister ? 'Start your AI sentiment journey' : 'Sign in to your enterprise dashboard'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-slate-600 ml-1">Full Name</label>
              <div className="relative flex items-center rounded-xl bg-slate-50 border border-slate-200">
                <User className="w-4 h-4 ml-3 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full bg-transparent border-none focus:outline-none px-3 py-2.5 text-xs text-slate-900"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1 text-left">
            <label className="text-xs font-semibold text-slate-600 ml-1">Email Address</label>
            <div className="relative flex items-center rounded-xl bg-slate-50 border border-slate-200">
              <Mail className="w-4 h-4 ml-3 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.in"
                className="w-full bg-transparent border-none focus:outline-none px-3 py-2.5 text-xs text-slate-900"
                required
              />
            </div>
          </div>

          <div className="space-y-1 text-left">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-semibold text-slate-600">Password</label>
              {!isRegister && (
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] font-semibold text-indigo-600 hover:underline">
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative flex items-center rounded-xl bg-slate-50 border border-slate-200">
              <Lock className="w-4 h-4 ml-3 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-none focus:outline-none px-3 py-2.5 text-xs text-slate-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mr-3 text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{isRegister ? 'Get Started' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative py-1 flex items-center">
          <div className="flex-grow border-t border-slate-200" />
          <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase">
            Or continue with
          </span>
          <div className="flex-grow border-t border-slate-200" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
            className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700 cursor-pointer"
          >
            <span className="font-bold text-[#4285F4]">G</span>
            <span>Google</span>
          </button>

          <button
            onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
            className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700 cursor-pointer"
          >
            <span className="font-bold text-[#0A66C2]">in</span>
            <span>LinkedIn</span>
          </button>
        </div>

        <div className="text-center pt-2">
          <p className="text-xs text-slate-500">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            >
              {isRegister ? 'Sign In' : 'Register Now'}
            </button>
          </p>
        </div>

        <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-indigo-700 font-semibold bg-indigo-50 py-1.5 rounded-full border border-indigo-100">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>AI-Powered Verification Active</span>
        </div>
      </div>
    </div>
  );
};
