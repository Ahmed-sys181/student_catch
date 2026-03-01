'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from 'context/AppContext';
import type { JobType } from 'types';
import { getJobTypeLabel, getExperienceLevelLabel, getSalaryRange } from 'types';
import JobCard from 'components/JobCard';

const typeFilters = [
  { label: 'All', value: null },
  { label: '🏢 Full-time', value: 'fullTime' as JobType },
  { label: '⏰ Part-time', value: 'partTime' as JobType },
  { label: '📋 Contract', value: 'contract' as JobType },
  { label: '🏠 Freelance', value: 'freelance' as JobType },
  { label: '🎓 Internship', value: 'internship' as JobType },
];

export default function JobsPage() {
  const router = useRouter();
  const { jobs, toggleSaveJob } = useApp();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<JobType | null>(null);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const filtered = jobs
    .filter((j) => !typeFilter || j.type === typeFilter)
    .filter(
      (j) =>
        !search ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.companyName.toLowerCase().includes(search.toLowerCase())
    );

  const detail = jobs.find((j) => j.id === selectedJob);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 px-5 pt-12 pb-6 rounded-b-[30px]">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.back()}>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-xl font-bold text-white">Job Opportunities</h1>
          <div className="w-6" />
        </div>

        {/* Search */}
        <div className="relative">
          <svg className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs, companies..."
            className="w-full pl-11 pr-4 py-3 bg-white/10 text-white placeholder-white/50 rounded-xl border border-white/20 focus:border-white/40 outline-none text-sm"
          />
        </div>
      </div>

      {/* Type filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-5 py-4">
        {typeFilters.map((t) => (
          <button
            key={t.label}
            onClick={() => setTypeFilter(t.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              typeFilter === t.value
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="px-5 mb-3">
        <p className="text-sm text-gray-500">{filtered.length} jobs found</p>
      </div>

      {/* List */}
      <div className="px-5 space-y-3 pb-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-5xl">💼</span>
            <p className="text-gray-500 mt-4">No jobs found</p>
          </div>
        ) : (
          filtered.map((j) => (
            <JobCard
              key={j.id}
              job={j}
              onSave={() => toggleSaveJob(j.id)}
              onClick={() => setSelectedJob(j.id)}
            />
          ))
        )}
      </div>

      {/* Detail Bottom Sheet */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedJob(null)} />
          <div className="relative bg-white w-full max-w-[430px] rounded-t-3xl max-h-[85vh] overflow-y-auto pb-8">
            <div className="sticky top-0 bg-white pt-3 pb-2 px-5 border-b border-gray-100 rounded-t-3xl">
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">Job Details</h3>
                <button onClick={() => setSelectedJob(null)} className="text-gray-400">✕</button>
              </div>
            </div>

            <div className="px-5 pt-5 space-y-5">
              {/* Company + Title */}
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl font-bold text-purple-600">
                  {detail.companyName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-800">{detail.title}</h4>
                  <p className="text-sm text-gray-500">{detail.companyName}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold">
                  {getJobTypeLabel(detail.type)}
                </span>
                <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                  {getExperienceLevelLabel(detail.experienceLevel)}
                </span>
                {detail.isRemote && (
                  <span className="px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-semibold">
                    🏠 Remote
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-semibold text-slate-800">{detail.location}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500">Salary</p>
                  <p className="text-sm font-semibold text-slate-800">{getSalaryRange(detail)}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h5 className="font-bold text-slate-800 mb-2">Description</h5>
                <p className="text-sm text-gray-600 leading-relaxed">{detail.description}</p>
              </div>

              {/* Skills */}
              <div>
                <h5 className="font-bold text-slate-800 mb-2">Required Skills</h5>
                <div className="flex flex-wrap gap-2">
                  {detail.requiredSkills.map((s) => (
                    <span key={s} className="px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">{s}</span>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h5 className="font-bold text-slate-800 mb-2">Responsibilities</h5>
                <ul className="space-y-2">
                  {detail.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-purple-600 mt-0.5">✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply */}
              <button className="w-full py-4 bg-purple-600 text-white rounded-2xl font-semibold text-base shadow-lg shadow-purple-600/30 hover:bg-purple-700 transition">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
