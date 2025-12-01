'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SmartCTAProps {
  section?: string;
}

export default function SmartCTA({ section }: SmartCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);

  // Context-aware CTA text based on section
  const getCTAText = () => {
    switch (section) {
      case 'hero':
        return '🚀 בדוק התאמה עכשיו - 0₪';
      case 'tracks':
        return '💰 בחר מסלול';
      case 'testimonials':
        return '✨ הצטרף ללקוחות המרוצים';
      case 'about':
        return '📞 בואו נדבר';
      default:
        return 'התחל פרויקט';
    }
  };

  useEffect(() => {
    // Show floating CTA after scrolling
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showExitIntent]);

  return (
    <>
      {/* Floating CTA Button */}
      {isVisible && (
        <Link
          href="#contact"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] px-8 py-4 gradient-primary text-white text-base font-bold rounded-full transition-all hover:-translate-y-1 hover:scale-105 glow-purple border-2 border-white/20 shadow-2xl animate-fadeIn"
        >
          {getCTAText()}
        </Link>
      )}

      {/* Sticky CTA Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-[89] glass-effect-2 border-t border-white/10 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-[1600px] mx-auto px-16 py-4 flex items-center justify-between">
          <div className="text-sm text-[#a1a1aa]">
            <span className="text-white font-semibold">מוכן להתחיל?</span> בואו נדבר על הפרויקט שלך
          </div>
          <Link
            href="#contact"
            className="px-6 py-3 gradient-primary text-white text-sm font-bold rounded-full transition-all hover:scale-105"
          >
            התחל עכשיו
          </Link>
        </div>
      </div>

      {/* Exit Intent Popup */}
      {showExitIntent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="glass-effect-2 rounded-2xl p-8 max-w-md mx-4 relative">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 left-4 text-[#a1a1aa] hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-bold text-white mb-4">רגע לפני שאתה עוזב...</h3>
            <p className="text-[#a1a1aa] mb-6">
              יש לך שאלות? בואו נדבר. אנחנו כאן כדי לעזור.
            </p>
            <Link
              href="#contact"
              onClick={() => setShowExitIntent(false)}
              className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white font-bold rounded-full transition-all hover:scale-105 w-full justify-center"
            >
              בואו נדבר
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

