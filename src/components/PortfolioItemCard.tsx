import { PortfolioItem, getPortfolioTypeIcon } from '../types';

const typeColors: Record<string, string> = { project: '#2563EB', mission: '#10B981', challenge: '#F59E0B' };

export default function PortfolioItemCard({ item, onClick }: { item: PortfolioItem; onClick?: () => void }) {
  const tc = typeColors[item.type] || '#9CA3AF';
  return (
    <div onClick={onClick} className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm cursor-pointer hover:shadow-md active:scale-[0.98] transition-all">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: tc + '1a' }}>
          {getPortfolioTypeIcon(item.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[15px] font-semibold text-slate-800 truncate">{item.title}</h3>
            {item.isVerified && <span className="text-blue-600 text-sm shrink-0">✓</span>}
          </div>
          <p className="text-xs text-gray-500">{item.companyName || (item.type === 'project' ? 'Personal Project' : item.type === 'mission' ? 'Company Mission' : 'Coding Challenge')}</p>
        </div>
        {item.rating != null && (
          <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-amber-50 text-amber-500 flex items-center gap-1 shrink-0">
            ⭐ {item.rating.toFixed(1)}
          </span>
        )}
      </div>
      <p className="text-[13px] text-gray-500 mt-3 line-clamp-2 leading-relaxed">{item.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {item.skills.slice(0, 4).map(s => (
          <span key={s} className="text-[10px] font-medium px-2 py-1 rounded-md bg-violet-50 text-violet-600">{s}</span>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-3 text-[11px] text-gray-400">
        <span>👁 {item.viewsCount} views</span>
        <span>❤️ {item.likesCount} likes</span>
        <div className="ml-auto flex gap-3">
          {item.githubUrl && <span>💻</span>}
          {item.liveUrl && <span>🔗</span>}
        </div>
      </div>
    </div>
  );
}
