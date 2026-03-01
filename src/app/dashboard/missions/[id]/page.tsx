'use client';
import { useRouter, useParams } from 'next/navigation';
import { useApp } from 'context/AppContext';
import { getMissionTypeLabel, daysUntil } from 'types';

export default function MissionDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { missions } = useApp();
  const mission = missions.find((m) => m.id === id);

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Mission not found</p>
      </div>
    );
  }

  const deadline = daysUntil(mission.deadline);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-700 px-5 pt-12 pb-8 rounded-b-[30px]">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()}>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-lg font-bold text-white">Mission Details</h1>
          <button>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
          </button>
        </div>

        {/* Company */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl font-bold text-green-600">
            {mission.companyName.charAt(0)}
          </div>
          <div>
            <p className="text-white/70 text-sm">{mission.companyName}</p>
            <h2 className="text-xl font-bold text-white">{mission.title}</h2>
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-5">
        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: '🏷️', label: 'Type', value: getMissionTypeLabel(mission.type) },
            { icon: '📍', label: 'Location', value: mission.location },
            { icon: '💰', label: 'Compensation', value: `${mission.compensation} ${mission.compensationType}` },
            { icon: '⏱️', label: 'Duration', value: `${mission.durationDays} days` },
          ].map((info) => (
            <div key={info.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <span className="text-2xl">{info.icon}</span>
              <p className="text-xs text-gray-500 mt-1">{info.label}</p>
              <p className="text-sm font-semibold text-slate-800">{info.value}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-semibold">
            {getMissionTypeLabel(mission.type)}
          </span>
          <span className="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold">
            {mission.industry}
          </span>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-slate-800 mb-2">Description</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{mission.description}</p>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-slate-800 mb-3">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {mission.requiredSkills.map((s) => (
              <span key={s} className="px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-slate-800 mb-3">About the Company</h3>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-2xl font-bold text-green-600">
              {mission.companyName.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{mission.companyName}</p>
              <p className="text-sm text-gray-500">{mission.industry}</p>
              <p className="text-sm text-gray-500">{mission.location}</p>
            </div>
          </div>
        </div>

        {/* Deadline */}
        <div className={`rounded-2xl p-5 shadow-sm border ${deadline <= 5 ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{deadline <= 5 ? '🔥' : '📅'}</span>
            <div>
              <p className="font-bold text-slate-800">Application Deadline</p>
              <p className="text-sm text-gray-600">
                {new Date(mission.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                {' '}({deadline} days left)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 p-4">
        <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-semibold text-base shadow-lg shadow-green-600/30 hover:bg-green-700 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
}
