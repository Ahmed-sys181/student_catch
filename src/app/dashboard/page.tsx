'use client';
import { useRouter } from 'next/navigation';
import { useApp } from 'context/AppContext';
import CircularProgress from 'components/CircularProgress';
import StatCard from 'components/StatCard';
import ProjectCard from 'components/ProjectCard';
import MissionCard from 'components/MissionCard';

export default function DashboardHome() {
  const router = useRouter();
  const { currentUser, projects, missions, isAuthenticated } = useApp();

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please sign in to continue</p>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gradient Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 px-4 sm:px-6 pt-12 safe-top pb-8 rounded-b-[30px]">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 min-w-0">
            <p className="text-white/70 text-sm">Good morning,</p>
            <h1 className="text-xl sm:text-2xl font-bold text-white truncate">{currentUser.name.split(' ')[0]} 👋</h1>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="relative">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">3</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm border-2 border-white/40">
              {currentUser.name.charAt(0)}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <StatCard icon="⚡" title="XP" value={currentUser.xpPoints.toString()} subtitle="Total" />
          <StatCard icon="🏆" title="Rank" value={`#${currentUser.rank}`} subtitle="Global" />
          <StatCard icon="📁" title="Projects" value={currentUser.completedProjects.toString()} subtitle="Done" />
          <StatCard icon="🏅" title="Badges" value={currentUser.badges.length.toString()} subtitle="Earned" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 pt-6 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <CircularProgress percent={Math.round(currentUser.profileCompleteness * 100)} size={60} stroke={6} />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-800 text-sm sm:text-base">Profile Completion</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
                {currentUser.profileCompleteness < 1
                  ? 'Complete your profile to unlock more opportunities!'
                  : 'Your profile is complete!'}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {[
              { emoji: '🔬', label: 'Projects', path: '/dashboard/projects' },
              { emoji: '🎯', label: 'Missions', path: '/dashboard/missions' },
              { emoji: '💼', label: 'Jobs', path: '/dashboard/jobs' },
              { emoji: '📂', label: 'Portfolio', path: '/dashboard/portfolio' },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => router.push(a.path)}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <span className="text-2xl">{a.emoji}</span>
                <span className="text-xs font-medium text-slate-700">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Projects */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-800">Active Projects</h2>
            <button
              onClick={() => router.push('/dashboard/projects')}
              className="text-blue-600 text-sm font-medium"
            >
              See All
            </button>
          </div>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar -mx-4 sm:-mx-6 px-4 sm:px-6 snap-x snap-mandatory">
            {projects.slice(0, 3).map((p) => (
              <div key={p.id} className="min-w-[260px] sm:min-w-[300px] snap-start">
                <ProjectCard
                  project={p}
                  onClick={() => router.push(`/dashboard/projects/${p.id}`)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Missions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-800">Recent Missions</h2>
            <button
              onClick={() => router.push('/dashboard/missions')}
              className="text-blue-600 text-sm font-medium"
            >
              See All
            </button>
          </div>
          <div className="space-y-3">
            {missions.slice(0, 2).map((m) => (
              <MissionCard
                key={m.id}
                mission={m}
                onClick={() => router.push(`/dashboard/missions/${m.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Badges */}
        {currentUser.badges.length > 0 && (
          <div className="pb-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-3">Your Badges</h2>
            <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 sm:-mx-6 px-4 sm:px-6 snap-x snap-mandatory">
              {currentUser.badges.map((b) => (
                <div
                  key={b.id}
                  className="min-w-[100px] sm:min-w-[110px] flex flex-col items-center p-3 sm:p-4 bg-white rounded-2xl shadow-sm border border-gray-100 snap-start"
                >
                  <span className="text-2xl sm:text-3xl mb-2">{b.icon}</span>
                  <span className="text-xs font-semibold text-slate-800 text-center leading-tight">
                    {b.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
