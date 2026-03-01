import { Mission, getMissionTypeLabel } from '../types';

const typeColors: Record<string, string> = { shortTerm: '#2563EB', project: '#10B981', internship: '#8B5CF6' };

export default function MissionCard({ mission, onClick }: { mission: Mission; onClick?: () => void }) {
  const tc = typeColors[mission.type] || '#2563EB';
  return (
    <div onClick={onClick} className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center text-2xl shrink-0">{mission.companyLogo}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-slate-800 truncate">{mission.title}</h3>
          <p className="text-[13px] text-gray-500">{mission.companyName}</p>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg shrink-0" style={{ backgroundColor: tc + '1a', color: tc }}>
          {getMissionTypeLabel(mission.type)}
        </span>
      </div>
      <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
        <span>📍 {mission.isRemote ? 'Remote' : mission.location}</span>
        <span>💰 {mission.compensation.toFixed(0)} {mission.compensationType === 'hourly' ? '/hr' : 'TND'}</span>
        <span>⏱ {mission.durationDays} days</span>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {mission.requiredSkills.slice(0, 3).map(s => (
          <span key={s} className="text-[10px] font-medium px-2 py-1 rounded-md bg-violet-50 text-violet-600">{s}</span>
        ))}
      </div>
    </div>
  );
}
