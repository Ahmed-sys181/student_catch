import { Job, getJobTypeLabel, getExperienceLevelLabel, getSalaryRange, timeAgo } from '../types';

export default function JobCard({ job, onClick, onSave }: { job: Job; onClick?: () => void; onSave?: () => void }) {
  return (
    <div onClick={onClick} className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl shrink-0">{job.companyLogo}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-slate-800">{job.title}</h3>
          <p className="text-[13px] text-gray-500">{job.companyName}</p>
        </div>
        <button onClick={e => { e.stopPropagation(); onSave?.(); }} className="text-xl shrink-0">
          {job.isSaved ? '🔖' : '🏷️'}
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-blue-50 text-blue-600">{getJobTypeLabel(job.type)}</span>
        <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-emerald-50 text-emerald-600">{getExperienceLevelLabel(job.experienceLevel)}</span>
        {job.isRemote && <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-violet-50 text-violet-600">Remote</span>}
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
        <span>📍 {job.location}</span>
        <span>💰 {getSalaryRange(job)}</span>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {job.requiredSkills.slice(0, 4).map(s => (
          <span key={s} className="text-[10px] font-medium px-2 py-1 rounded-md bg-slate-100 text-slate-500">{s}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
        <span>{job.applicantsCount} applicants</span>
        <span>{timeAgo(job.postedDate)}</span>
      </div>
    </div>
  );
}
