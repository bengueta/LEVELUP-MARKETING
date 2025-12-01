'use client';

import { useEffect, useState } from 'react';
import { Z_INDEX } from '@/lib/zIndex';

export default function UrgencyBar() {
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [viewerCount, setViewerCount] = useState(12);
  const [spotsLeft, setSpotsLeft] = useState(3);

  useEffect(() => {
    const endDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = endDate.getTime() - now;
      
      if (diff <= 0) return;
      
      setDays(String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0'));
      setHours(String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'));
      setMinutes(String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'));
      setSeconds(String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0'));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    // Viewer count fluctuation
    const viewerInterval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(8, Math.min(25, prev + change));
      });
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(viewerInterval);
    };
  }, []);

  // No close button - part of header

  const progressPercentage = Math.max(0, Math.min(100, ((10 - spotsLeft) / 10) * 100));

  return (
    <>
      <div 
        id="urgencyBar"
        className="gradient-primary px-6 py-3 flex items-center justify-center gap-4"
        style={{ zIndex: Z_INDEX.URGENCY_BAR }}
      >
        <span className="text-sm font-semibold text-white flex items-center gap-2 flex-wrap justify-center">
          <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
          <span>רק {spotsLeft} מקומות נותרו לשותפות Q1 2025</span>
          <span className="inline-flex items-center gap-2 bg-black/20 px-3 py-1 rounded text-xs font-bold font-english direction-ltr">
            <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </span>
          <span className="text-xs opacity-90">
            • {viewerCount} אנשים צופים עכשיו
          </span>
        </span>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <div 
            className="h-full bg-white/30 transition-all duration-1000"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

      </div>

    </>
  );
}

