'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from 'context/AppContext';

const universities = [
  'INSAT', 'ENIT', 'ENSI', 'ISI', 'FST', 'ESPRIT', 'TEK-UP', 'SESAME',
  'SUP\'COM', 'IHEC Carthage', 'ESSECT', 'ISCAE', 'Other',
];

const majors = [
  'Computer Science', 'Software Engineering', 'Data Science', 'Cybersecurity',
  'Business Administration', 'Finance', 'Marketing', 'Electrical Engineering',
  'Mechanical Engineering', 'Telecommunications', 'Other',
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useApp();
  const [form, setForm] = useState({
    name: '', email: '', university: '', major: '', year: '1',
    password: '', confirmPassword: '', terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert('Passwords do not match');
    if (!form.terms) return alert('Please accept the terms');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    register({ name: form.name, email: form.email, password: form.password, university: form.university, major: form.major, yearOfStudy: parseInt(form.year) });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 pt-12 pb-8">
      {/* Back */}
      <button onClick={() => router.back()} className="self-start mb-6">
        <svg className="w-6 h-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Account 🚀</h1>
      <p className="text-gray-500 mb-6">Join the Career Launchpad community</p>

      <form onSubmit={handleRegister} className="flex flex-col gap-4 overflow-y-auto flex-1">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input
            type="text" required value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
            placeholder="Ahmed Ben Salem"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email" required value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
            placeholder="your@email.com"
          />
        </div>

        {/* University */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">University</label>
          <select
            required value={form.university}
            onChange={(e) => update('university', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 outline-none text-sm appearance-none"
          >
            <option value="">Select University</option>
            {universities.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        {/* Major + Year */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-1">Major</label>
            <select
              required value={form.major}
              onChange={(e) => update('major', e.target.value)}
              className="w-full px-3 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 outline-none text-sm appearance-none"
            >
              <option value="">Select</option>
              {majors.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="w-20">
            <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
            <select
              value={form.year}
              onChange={(e) => update('year', e.target.value)}
              className="w-full px-3 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 outline-none text-sm appearance-none"
            >
              {[1, 2, 3, 4, 5].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required value={form.password}
              onChange={(e) => update('password', e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
              placeholder="Min. 8 characters"
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
          <input
            type="password" required value={form.confirmPassword}
            onChange={(e) => update('confirmPassword', e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
            placeholder="Re-enter password"
            minLength={8}
          />
        </div>

        {/* Terms */}
        <label className="flex items-start gap-3 mt-2">
          <input
            type="checkbox"
            checked={form.terms}
            onChange={(e) => update('terms', e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-500">
            I agree to the <span className="text-blue-600 font-medium">Terms of Service</span> and{' '}
            <span className="text-blue-600 font-medium">Privacy Policy</span>
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-semibold text-base shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors disabled:opacity-60 mt-4"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>

        {/* Login */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-blue-600 font-semibold"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
}
