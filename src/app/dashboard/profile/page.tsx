'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from 'context/AppContext';
import CircularProgress from 'components/CircularProgress';

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, logout } = useApp();
  const [showLogout, setShowLogout] = useState(false);

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => router.push('/login')} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold">
          Sign In
        </button>
      </div>
    );
  }

  const menuItems = [
    { icon: '✏️', label: 'Edit Profile', desc: 'Update your personal information' },
    { icon: '🎓', label: 'Education', desc: 'Manage your education details' },
    { icon: '💼', label: 'Experience', desc: 'Add work experience' },
    { icon: '🔗', label: 'Social Links', desc: 'Connect your social profiles' },
    { icon: '🔔', label: 'Notifications', desc: 'Manage notification preferences' },
    { icon: '🔒', label: 'Privacy', desc: 'Control your privacy settings' },
    { icon: '❓', label: 'Help & Support', desc: 'Get help or report an issue' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-700 to-slate-900 px-4 sm:px-6 pt-12 safe-top pb-8 rounded-b-[30px]">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()}>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-xl font-bold text-white">Profile</h1>
          <button>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
        </div>

        {/* Avatar + Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold text-white border-4 border-white/40">
              {currentUser.name.charAt(0)}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{currentUser.name}</h2>
            <p className="text-white/70 text-sm">{currentUser.email}</p>
            <p className="text-white/50 text-sm">{currentUser.university}</p>
          </div>
          <CircularProgress percent={Math.round(currentUser.profileCompleteness * 100)} size={55} stroke={4} />
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 sm:mx-6 -mt-1 grid grid-cols-3 gap-2 sm:gap-3 pt-5">
        {[
          { icon: '⚡', label: 'Total XP', value: currentUser.xpPoints },
          { icon: '📁', label: 'Projects', value: currentUser.completedProjects },
          { icon: '🏅', label: 'Badges', value: currentUser.badges.length },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <span className="text-xl">{s.icon}</span>
            <p className="text-lg font-bold text-slate-800 mt-1">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Menu Items */}
      <div className="mx-4 sm:mx-6 mt-5 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-gray-50 transition ${
              i < menuItems.length - 1 ? 'border-b border-gray-50' : ''
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        ))}
      </div>

      {/* Sign Out */}
      <div className="mx-4 sm:mx-6 mt-5 mb-8">
        <button
          onClick={() => setShowLogout(true)}
          className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-semibold text-base border border-red-100 hover:bg-red-100 transition"
        >
          Sign Out
        </button>
      </div>

      {/* Logout Confirmation */}
      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 sm:px-8">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowLogout(false)} />
          <div className="relative bg-white rounded-3xl p-5 sm:p-6 w-full max-w-sm text-center">
            <span className="text-5xl">👋</span>
            <h3 className="text-xl font-bold text-slate-800 mt-4">Sign Out?</h3>
            <p className="text-gray-500 text-sm mt-2">You&apos;ll need to sign in again to access your account.</p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
