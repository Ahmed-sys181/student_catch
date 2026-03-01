'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/dashboard', label: 'Home', icon: '🏠', activeIcon: '🏠' },
  { href: '/dashboard/projects', label: 'Projects', icon: '📁', activeIcon: '📂' },
  { href: '/dashboard/missions', label: 'Missions', icon: '🚀', activeIcon: '🚀' },
  { href: '/dashboard/portfolio', label: 'Portfolio', icon: '🏅', activeIcon: '🏅' },
  { href: '/dashboard/profile', label: 'Profile', icon: '👤', activeIcon: '👤' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-full sm:max-w-[640px] lg:max-w-[768px] bg-white border-t border-gray-100 z-50 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(tab => {
          const isActive = tab.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(tab.href);
          return (
            <Link key={tab.href} href={tab.href} className={`flex flex-col items-center gap-1 min-w-[56px] px-3 py-1.5 rounded-xl transition-colors ${isActive ? 'bg-blue-50' : ''}`}>
              <span className="text-lg sm:text-xl">{isActive ? tab.activeIcon : tab.icon}</span>
              <span className={`text-[11px] sm:text-xs ${isActive ? 'font-semibold text-blue-600' : 'font-medium text-gray-500'}`}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
