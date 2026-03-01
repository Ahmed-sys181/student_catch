'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const steps = [
  {
    emoji: '🔬',
    title: 'Micro-Projects',
    subtitle: 'Learn by Building',
    description:
      'Work on real micro-projects from Tunisian companies. Build your skills with hands-on experience that matters.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    emoji: '💼',
    title: 'Smart Portfolio',
    subtitle: 'Showcase Your Work',
    description:
      'Automatically build a verified portfolio as you complete projects. Let your work speak for itself.',
    color: 'from-green-500 to-green-700',
  },
  {
    emoji: '🎯',
    title: 'Career Missions',
    subtitle: 'Level Up Your Career',
    description:
      'Complete missions from top companies. Earn XP, badges, and unlock real job opportunities.',
    color: 'from-purple-500 to-purple-700',
  },
  {
    emoji: '💰',
    title: 'Career Monetization',
    subtitle: 'Earn While You Learn',
    description:
      'Get compensated for your skills. From freelance gigs to full-time positions, monetize your talent.',
    color: 'from-amber-500 to-amber-700',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < steps.length - 1) setCurrent(current + 1);
    else router.push('/login');
  };

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-white">
      {/* Skip */}
      <div className="flex justify-end p-4 safe-top">
        {current < steps.length - 1 && (
          <button
            onClick={() => router.push('/login')}
            className="text-gray-500 text-sm font-medium p-1"
          >
            Skip
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8 text-center">
        <div
          className={`w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] rounded-full bg-gradient-to-br ${steps[current].color} flex items-center justify-center mb-8 sm:mb-10 shadow-xl animate-scaleIn`}
          key={current}
        >
          <span className="text-5xl sm:text-7xl">{steps[current].emoji}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">
          {steps[current].title}
        </h2>
        <p className="text-blue-600 font-semibold text-sm mb-3 sm:mb-4">
          {steps[current].subtitle}
        </p>
        <p className="text-gray-500 leading-relaxed max-w-xs text-sm sm:text-base">
          {steps[current].description}
        </p>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-blue-600' : 'w-2.5 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Button */}
      <div className="px-6 sm:px-8 pb-10 pb-safe">
        <button
          onClick={next}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-semibold text-base shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors"
        >
          {current === steps.length - 1 ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
}
