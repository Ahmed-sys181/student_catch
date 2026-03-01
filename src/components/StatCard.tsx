interface StatCardProps {
  icon: string;
  iconColor?: string;
  iconBg?: string;
  title: string;
  value: string;
  subtitle: string;
}
export default function StatCard({ icon, iconColor = '#2563EB', iconBg = '#EFF6FF', title, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="p-1.5 sm:p-2 rounded-lg" style={{ backgroundColor: iconBg }}>
          <span className="text-lg sm:text-xl" style={{ color: iconColor }}>{icon}</span>
        </div>
        <span className="text-[10px] sm:text-xs text-gray-500 truncate ml-1">{title}</span>
      </div>
      <div className="mt-2 sm:mt-3">
        <p className="text-lg sm:text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-[10px] sm:text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}
