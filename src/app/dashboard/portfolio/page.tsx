'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from 'context/AppContext';
import CircularProgress from 'components/CircularProgress';
import SkillCard from 'components/SkillCard';
import PortfolioItemCard from 'components/PortfolioItemCard';

const tabs = ['Work', 'Skills', 'Badges'] as const;

export default function PortfolioPage() {
  const router = useRouter();
  const { currentUser, skills, portfolioItems, isAuthenticated } = useApp();
  const [tab, setTab] = useState(0);

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => router.push('/login')} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 px-4 sm:px-6 pt-12 safe-top pb-8 rounded-b-[30px]">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()}>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-xl font-bold text-white">Portfolio</h1>
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          </button>
        </div>

        {/* Avatar + Info */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold text-white border-4 border-white/40 mb-3">
            {currentUser.name.charAt(0)}
          </div>
          <h2 className="text-xl font-bold text-white">{currentUser.name}</h2>
          <p className="text-white/70 text-sm">{currentUser.university} • {currentUser.major}</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="text-center">
              <p className="text-lg font-bold text-white">#{currentUser.rank}</p>
              <p className="text-white/60 text-xs">Rank</p>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="text-center">
              <p className="text-lg font-bold text-white">{currentUser.xpPoints}</p>
              <p className="text-white/60 text-xs">XP</p>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="text-center">
              <p className="text-lg font-bold text-white">{currentUser.completedProjects}</p>
              <p className="text-white/60 text-xs">Projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white mx-4 sm:mx-6 mt-4 rounded-xl p-1 shadow-sm border border-gray-100">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
              tab === i ? 'bg-amber-500 text-white shadow' : 'text-gray-500'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 pt-4 pb-4">
        {tab === 0 && (
          <div className="space-y-3">
            {portfolioItems.length === 0 ? (
              <div className="text-center py-16">
                <span className="text-5xl">📂</span>
                <p className="text-gray-500 mt-4">No portfolio items yet</p>
              </div>
            ) : (
              portfolioItems.map((item) => (
                <PortfolioItemCard key={item.id} item={item} />
              ))
            )}
          </div>
        )}

        {tab === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.length === 0 ? (
              <div className="col-span-1 sm:col-span-2 text-center py-16">
                <span className="text-5xl">🛠️</span>
                <p className="text-gray-500 mt-4">No skills added yet</p>
              </div>
            ) : (
              skills.map((skill) => <SkillCard key={skill.id} skill={skill} />)
            )}
          </div>
        )}

        {tab === 2 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {currentUser.badges.length === 0 ? (
              <div className="col-span-2 sm:col-span-3 text-center py-16">
                <span className="text-5xl">🏅</span>
                <p className="text-gray-500 mt-4">No badges earned yet</p>
              </div>
            ) : (
              currentUser.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-center"
                >
                  <span className="text-4xl mb-2">{badge.icon}</span>
                  <span className="text-xs font-semibold text-slate-800 leading-tight">{badge.name}</span>
                  <span className="text-[10px] text-gray-500 mt-1">{badge.description}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
