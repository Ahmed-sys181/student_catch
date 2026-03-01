import { Project, getDifficultyLabel } from '../types';

const diffColors: Record<string, string> = { beginner: '#10B981', intermediate: '#F59E0B', advanced: '#EF4444' };

export default function ProjectCard({ project, onClick }: { project: Project; onClick?: () => void }) {
  const dc = diffColors[project.difficulty] || '#2563EB';
  return (
    <div onClick={onClick} className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm cursor-pointer hover:shadow-md active:scale-[0.98] transition-all h-full flex flex-col">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-1 rounded-lg" style={{ backgroundColor: dc + '1a', color: dc }}>
          {getDifficultyLabel(project.difficulty)}
        </span>
        <span className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-amber-50 text-amber-500 flex items-center gap-1">
          ⚡ {project.xpReward} XP
        </span>
      </div>
      <h3 className="mt-3 text-[15px] font-semibold text-slate-800 line-clamp-2">{project.title}</h3>
      <p className="text-xs text-gray-500 mt-1">{project.category}</p>
      <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-gray-400">
        <span>👥 {project.participantsCount} enrolled</span>
        <span>⏱ {project.estimatedHours}h</span>
      </div>
    </div>
  );
}
