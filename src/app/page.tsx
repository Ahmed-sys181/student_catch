'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => router.push('/onboarding'), 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
      <div className={`flex flex-col items-center transition-all duration-1000 px-6 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-white rounded-[24px] sm:rounded-[30px] flex items-center justify-center shadow-2xl">
          <span className="text-5xl sm:text-6xl">🚀</span>
        </div>
        <h1 className="mt-6 sm:mt-8 text-2xl sm:text-3xl font-bold text-white tracking-wider">Career Launchpad</h1>
        <p className="mt-2 text-white/70 tracking-widest text-xs sm:text-sm">Launch Your Career</p>
        <div className="mt-12 w-10 h-10">
          <div className="w-10 h-10 border-[3px] border-white/30 border-t-white/80 rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}