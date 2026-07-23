import React, { useState } from 'react';
import { Bot, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { AdminUser } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: AdminUser) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameToUse = fullName.trim() || (email ? email.split('@')[0] : 'Rajesh Kumar');
    const newUser: AdminUser = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: nameToUse.charAt(0).toUpperCase() + nameToUse.slice(1),
      role: 'Sentiment Analysis Specialist',
      plan: 'Enterprise',
      lastActive: 'active now',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      initials: nameToUse.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'US',
      email: email || 'user@enterprise.in',
      status: 'Active',
    };

    onLoginSuccess(newUser);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-indigo-500/20 selection:text-indigo-600">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-headline text-slate-900 tracking-tight">
              Sentiment Insight <span className="text-indigo-600">AI</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Authentication Required to Access Analytics Dashboard
            </p>
          </div>
        </div>

        {/* Form Title */}
        <div className="border-t border-slate-100 pt-5">
          <div className="text-center space-y-1">
            <h2 className="text-lg font-bold font-headline text-slate-900">
              {isRegister ? 'Create Your Account' : 'Sign In with Email & Password'}
            </h2>
            <p className="text-xs text-slate-400">
              {isRegister
                ? 'Enter details to setup your user profile'
                : 'Enter your account credentials to view your profile dashboard'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-slate-700 ml-1">Full Name</label>
              <div className="relative flex items-center rounded-xl bg-slate-50 border border-slate-200 focus-within:border-indigo-600 focus-within:bg-white transition-all">
                <User className="w-4 h-4 ml-3.5 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full bg-transparent border-none focus:outline-none px-3 py-3 text-xs text-slate-900"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1 text-left">
            <label className="text-xs font-semibold text-slate-700 ml-1">Email Address</label>
            <div className="relative flex items-center rounded-xl bg-slate-50 border border-slate-200 focus-within:border-indigo-600 focus-within:bg-white transition-all">
              <Mail className="w-4 h-4 ml-3.5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.in"
                className="w-full bg-transparent border-none focus:outline-none px-3 py-3 text-xs text-slate-900"
                required
              />
            </div>
          </div>

          <div className="space-y-1 text-left">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              {!isRegister && (
                <a
                  href="#forgot"
                  onClick={(e) => e.preventDefault()}
                  className="text-[11px] font-semibold text-indigo-600 hover:underline"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative flex items-center rounded-xl bg-slate-50 border border-slate-200 focus-within:border-indigo-600 focus-within:bg-white transition-all">
              <Lock className="w-4 h-4 ml-3.5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-none focus:outline-none px-3 py-3 text-xs text-slate-900"
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
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{isRegister ? 'Create Account & Access' : 'Sign In & Access Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative py-1 flex items-center">
          <div className="flex-grow border-t border-slate-200" />
          <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 uppercase">
            Quick Credentials Demo
          </span>
          <div className="flex-grow border-t border-slate-200" />
        </div>

        <button
          onClick={() => {
            setEmail('rajesh.kumar@techtel.co.in');
            setPassword('password123');
            setFullName('Rajesh Kumar');
          }}
          className="w-full py-2.5 px-3 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          Auto-fill Credentials (rajesh.kumar@techtel.co.in)
        </button>

        <div className="text-center pt-1">
          <p className="text-xs text-slate-500">
            {isRegister ? 'Already registered?' : "Don't have an account yet?"}{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-indigo-600 font-bold hover:underline cursor-pointer"
            >
              {isRegister ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-indigo-700 font-semibold bg-indigo-50 py-2 rounded-xl border border-indigo-100">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Secure Enterprise Access Granted</span>
        </div>
      </div>
    </div>
  );
};
