'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from 'context/AppContext';
import type { ProjectStatus } from 'types';
import ProjectCard from 'components/ProjectCard';

const tabs = ['Available', 'In Progress', 'Completed'] as const;
const categories = ['All', 'Web', 'Mobile', 'AI/ML', 'Data', 'DevOps', 'Design'];

export default function ProjectsPage() {
  const router = useRouter();
  const { projects } = useApp();
  const [tab, setTab] = useState(0);
  const [category, setCategory] = useState('All');

  const statusMap: Record<number, ProjectStatus> = {
    0: 'available',
    1: 'inProgress',
    2: 'completed',
  };

  const filtered = projects
    .filter((p) => p.status === statusMap[tab])
    .filter((p) => category === 'All' || p.category === category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-4 sm:px-6 pt-12 safe-top pb-6 rounded-b-[30px]">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.back()}>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-xl font-bold text-white">Projects</h1>
          <div className="w-6" />
        </div>

        {/* Tabs */}
        <div className="flex bg-white/10 rounded-xl p-1">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
                tab === i ? 'bg-white text-blue-600 shadow' : 'text-white/80'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 sm:px-6 py-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              category === c
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-4 sm:px-6 space-y-3 pb-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl">📁</span>
            <p className="text-gray-500 mt-4">No projects found</p>
          </div>
        ) : (
          filtered.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onClick={() => router.push(`/dashboard/projects/${p.id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
