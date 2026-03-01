'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from 'context/AppContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();
  const [email, setEmail] = useState('ahmed@insat.tn');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    login(email, password);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 pt-12">
      {/* Back */}
      <button onClick={() => router.back()} className="self-start mb-6">
        <svg className="w-6 h-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Header */}
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back! 👋</h1>
      <p className="text-gray-500 mb-8">Sign in to continue your career journey</p>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {/* Forgot */}
        <button type="button" className="self-end text-blue-600 text-sm font-medium -mt-2">
          Forgot Password?
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-semibold text-base shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors disabled:opacity-60 mt-2"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-400 text-sm">Or continue with</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Social */}
      <div className="flex gap-4 justify-center">
        {[
          { label: 'G', bg: 'bg-red-50 text-red-500 border-red-100' },
          { label: 'f', bg: 'bg-blue-50 text-blue-600 border-blue-100' },
          { label: 'in', bg: 'bg-sky-50 text-sky-600 border-sky-100' },
        ].map((s) => (
          <button
            key={s.label}
            className={`w-16 h-14 rounded-xl border font-bold text-lg ${s.bg} hover:opacity-80 transition`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Register */}
      <p className="text-center text-gray-500 text-sm mt-auto pb-8 pt-8">
        Don&apos;t have an account?{' '}
        <button
          onClick={() => router.push('/register')}
          className="text-blue-600 font-semibold"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
