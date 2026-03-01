'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from 'context/AppContext';
import type { MissionStatus, MissionType } from 'types';
import { getMissionTypeLabel } from 'types';
import MissionCard from 'components/MissionCard';

const tabs = ['Open', 'Applied', 'Completed'] as const;
const types = [
  { label: 'All', value: null },
  { label: '🏢 Short-term', value: 'shortTerm' as MissionType },
  { label: '📝 Project', value: 'project' as MissionType },
  { label: '🎓 Internship', value: 'internship' as MissionType },
];

export default function MissionsPage() {
  const router = useRouter();
  const { missions } = useApp();
  const [tab, setTab] = useState(0);
  const [typeFilter, setTypeFilter] = useState<MissionType | null>(null);

  const statusMap: Record<number, MissionStatus> = {
    0: 'open',
    1: 'applied',
    2: 'completed',
  };

  const filtered = missions
    .filter((m) => m.status === statusMap[tab])
    .filter((m) => !typeFilter || m.type === typeFilter);

  const openCount = missions.filter((m) => m.status === 'open').length;
  const appliedCount = missions.filter((m) => m.status === 'applied').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-700 px-5 pt-12 pb-6 rounded-b-[30px]">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.back()}>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-xl font-bold text-white">Missions</h1>
          <button onClick={() => router.push('/dashboard/jobs')} className="text-white/80 text-sm font-medium">
            Jobs →
          </button>
        </div>

        {/* Stats banner */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{openCount}</p>
            <p className="text-white/70 text-xs">Open</p>
          </div>
          <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{appliedCount}</p>
            <p className="text-white/70 text-xs">Applied</p>
          </div>
          <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-white">{missions.length}</p>
            <p className="text-white/70 text-xs">Total</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/10 rounded-xl p-1">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
                tab === i ? 'bg-white text-green-600 shadow' : 'text-white/80'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Type filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-5 py-4">
        {types.map((t) => (
          <button
            key={t.label}
            onClick={() => setTypeFilter(t.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              typeFilter === t.value
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-5 space-y-3 pb-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl">🎯</span>
            <p className="text-gray-500 mt-4">No missions found</p>
          </div>
        ) : (
          filtered.map((m) => (
            <MissionCard
              key={m.id}
              mission={m}
              onClick={() => router.push(`/dashboard/missions/${m.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
