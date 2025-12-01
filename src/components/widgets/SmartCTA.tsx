'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { smoothScrollToGSAP } from '@/lib/smoothScroll';
import { Z_INDEX } from '@/lib/zIndex';

interface SmartCTAProps {
  section?: string;
}

export default function SmartCTA({ section }: SmartCTAProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showExitIntent, setShowExitIntent] = useState(false);

  // Context-aware CTA text based on section
  const getCTAText = () => {
    switch (section) {
      case 'hero':
        return 'בדוק התאמה עכשיו - 0₪';
      case 'tracks':
        return 'בחר מסלול';
      case 'testimonials':
        return 'הצטרף ללקוחות המרוצים';
      case 'about':
        return 'בואו נדבר';
      default:
        return 'התחל פרויקט';
    }
  };

  useEffect(() => {
    // Show CTA bar after scrolling
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      {/* Sticky CTA Bar - חלק מהפוטר */}
      <div 
        className="glass-effect-2 border-t border-white/10"
        style={{ zIndex: Z_INDEX.SMART_CTA_STICKY }}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 py-3 md:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs md:text-sm text-[#a1a1aa] text-center sm:text-right">
            <span className="text-white font-semibold">מוכן להתחיל?</span> בואו נדבר על הפרויקט שלך
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              smoothScrollToGSAP('contact', 100);
            }}
            className="px-5 md:px-6 py-2 md:py-3 gradient-primary text-white text-xs md:text-sm font-bold rounded-full transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 whitespace-nowrap"
          >
            התחל עכשיו
          </button>
        </div>
      </div>

      {/* Exit Intent Popup */}
      {showExitIntent && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm" 
          style={{ zIndex: Z_INDEX.EXIT_INTENT }}
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="exit-intent-title"
        >
          <div className="glass-effect-2 rounded-2xl p-8 max-w-md mx-4 relative" onKeyDown={(e) => {
            if (e.key === 'Escape') setShowExitIntent(false);
          }}>
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 left-4 text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
              aria-label="סגור"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 id="exit-intent-title" className="text-2xl font-bold text-white mb-4">רגע לפני שאתה עוזב...</h3>
            <p className="text-[#a1a1aa] mb-6">
              יש לך שאלות? בואו נדבר. אנחנו כאן כדי לעזור.
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowExitIntent(false);
                smoothScrollToGSAP('contact', 100);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white font-bold rounded-full transition-all hover:scale-105 w-full justify-center focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              בואו נדבר
            </button>
          </div>
        </div>
      )}
    </>
  );
}

