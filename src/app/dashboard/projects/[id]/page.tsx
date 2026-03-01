'use client';
import { useRouter, useParams } from 'next/navigation';
import { useApp } from 'context/AppContext';
import { getDifficultyLabel, daysUntil } from 'types';

const difficultyColors: Record<string, string> = {
  beginner: 'text-green-600 bg-green-50',
  intermediate: 'text-blue-600 bg-blue-50',
  advanced: 'text-orange-600 bg-orange-50',
};

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { projects } = useApp();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  const dColor = difficultyColors[project.difficulty] || 'text-gray-600 bg-gray-50';
  const deadline = daysUntil(project.deadline);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-4 sm:px-6 pt-12 safe-top pb-8 rounded-b-[30px]">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()}>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-lg font-bold text-white">Project Details</h1>
          <button>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${dColor}`}>
            {getDifficultyLabel(project.difficulty)}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600">
            ⚡ {project.xpReward} XP
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">{project.title}</h2>
        <p className="text-white/70 text-sm">{project.category}</p>
      </div>

      <div className="px-4 sm:px-6 pt-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { icon: '👥', label: 'Participants', value: project.participantsCount.toString() },
            { icon: '⏱️', label: 'Duration', value: `${project.estimatedHours}h` },
            { icon: '📊', label: 'XP Reward', value: `${project.xpReward} XP` },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
              <span className="text-2xl">{s.icon}</span>
              <p className="text-lg font-bold text-slate-800 mt-1">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-slate-800 mb-2">Description</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-slate-800 mb-3">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((s) => (
              <span key={s} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-slate-800 mb-3">Requirements</h3>
          <ul className="space-y-2">
            {project.requirements.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deadline */}
        <div className={`rounded-2xl p-5 shadow-sm border ${deadline <= 3 ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{deadline <= 3 ? '🔥' : '📅'}</span>
            <div>
              <p className="font-bold text-slate-800">Deadline</p>
              <p className="text-sm text-gray-600">
                {new Date(project.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                {' '}({deadline} days left)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-full sm:max-w-[640px] lg:max-w-[768px] bg-white border-t border-gray-100 p-4 pb-safe">
        <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-semibold text-base shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition">
          Start Project
        </button>
      </div>
    </div>
  );
}
