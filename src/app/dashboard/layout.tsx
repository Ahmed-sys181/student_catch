'use client';
import BottomNav from 'components/BottomNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-gray-50 pb-20 pb-safe">
      {children}
      <BottomNav />
    </div>
  );
}
