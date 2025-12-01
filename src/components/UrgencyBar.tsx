'use client';

import { useEffect, useState } from 'react';

const socialProofMessages = [
  { name: 'יוסי', location: 'ירושלים', time: '5 דקות' },
  { name: 'שירה', location: 'תל אביב', time: '12 דקות' },
  { name: 'מיכאל', location: 'חיפה', time: '18 דקות' },
  { name: 'דני', location: 'באר שבע', time: '25 דקות' },
];

export default function UrgencyBar() {
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [viewerCount, setViewerCount] = useState(12);
  const [spotsLeft, setSpotsLeft] = useState(3);
  const [currentSocialProof, setCurrentSocialProof] = useState(socialProofMessages[0]);
  const [showSocialProof, setShowSocialProof] = useState(false);

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

    // Social proof rotation
    const socialProofInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * socialProofMessages.length);
      setCurrentSocialProof(socialProofMessages[randomIndex]);
      setShowSocialProof(true);
      setTimeout(() => setShowSocialProof(false), 5000);
    }, 15000);

    // Show bar
    setTimeout(async () => {
      setIsVisible(true);
      const { gsap } = await import('gsap');
      gsap.to('#urgencyBar', { y: 0, duration: 0.5, ease: 'power3.out' });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(viewerInterval);
      clearInterval(socialProofInterval);
    };
  }, []);

  const handleClose = async () => {
    const { gsap } = await import('gsap');
    gsap.to('#urgencyBar', {
      y: -100,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => setIsHidden(true)
    });
  };

  if (isHidden) return null;

  const progressPercentage = ((10 - spotsLeft) / 10) * 100;

  return (
    <>
      <div 
        id="urgencyBar"
        className="fixed top-0 left-0 right-0 z-[101] gradient-primary px-6 py-3 flex items-center justify-center gap-4 -translate-y-full"
      >
        <span className="text-sm font-semibold text-white flex items-center gap-2 flex-wrap justify-center">
          <span>🔥</span>
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

        <button 
          onClick={handleClose}
          className="absolute left-4 bg-transparent border-none text-white cursor-pointer p-2 opacity-80 hover:opacity-100 transition-opacity"
          aria-label="סגור הודעה"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Social Proof Notification */}
      {showSocialProof && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] glass-effect-2 rounded-full px-6 py-3 animate-fadeIn">
          <span className="text-sm text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>
              <strong>{currentSocialProof.name}</strong> מ-{currentSocialProof.location} התחיל פרויקט לפני {currentSocialProof.time}
            </span>
          </span>
        </div>
      )}
    </>
  );
}

