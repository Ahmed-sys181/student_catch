import { Skill, getSkillLevelLabel } from '../types';
import CircularProgress from './CircularProgress';

const levelColors: Record<number, string> = { 1: '#9CA3AF', 2: '#10B981', 3: '#2563EB', 4: '#8B5CF6', 5: '#F59E0B' };

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
      <CircularProgress percent={skill.level / 5} size={56} stroke={5} color={levelColors[skill.level] || '#2563EB'} bgColor="#E5E7EB">
        {skill.level}
      </CircularProgress>
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[15px] font-semibold text-slate-800">{skill.name}</span>
          {skill.isVerified && <span className="text-blue-600 text-sm">✓</span>}
        </div>
        <p className="text-xs text-gray-500">{getSkillLevelLabel(skill.level)}</p>
        <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400">
          <span>📁 {skill.projectsCompleted} projects</span>
          <span>⚡ {skill.xpEarned} XP</span>
        </div>
      </div>
    </div>
  );
}
