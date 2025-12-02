'use client';

import { useState, useEffect } from 'react';
import { Z_INDEX } from '@/lib/zIndex';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const acceptEssential = () => {
    saveConsent(defaultPreferences);
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Banner */}
      {!showSettings && (
        <div 
          className="fixed bottom-0 left-0 right-0 glass-effect-2 border-t border-white/10 px-4 md:px-8 py-4 md:py-5 animate-slideUp"
          style={{ zIndex: Z_INDEX.WIDGETS + 10 }}
        >
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-right">
                <h3 className="text-base font-bold text-white mb-1">הגדרות קוקי</h3>
                <p className="text-sm text-[#a1a1aa]">
                  אנחנו משתמשים בקוקיז כדי לשפר את חווית הגלישה והנתח שימוש באתר.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                הגדרות
              </button>
              <button
                onClick={acceptEssential}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#27272a] hover:bg-[#3f3f46] rounded-full transition-colors"
              >
                רק הכרחי
              </button>
              <button
                onClick={acceptAll}
                className="px-5 py-2.5 text-sm font-bold text-white gradient-primary rounded-full hover:scale-105 transition-transform"
              >
                קבל הכל
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          style={{ zIndex: Z_INDEX.WIDGETS + 20 }}
        >
          <div className="w-full max-w-md glass-effect-2 rounded-3xl p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                הגדרות קוקי
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="w-8 h-8 flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Essential Cookies */}
              <div className="bg-[#1a1a1e] rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-1">קוקיז הכרחיים</h3>
                    <p className="text-xs text-[#71717a]">קוקיז אלה נדרשים לכדי שהאתר יפעל כראוי</p>
                  </div>
                  <div className="w-12 h-7 bg-purple-600 rounded-full relative cursor-not-allowed opacity-80">
                    <div className="absolute top-0.5 right-0.5 w-6 h-6 bg-white rounded-full shadow-md" />
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-[#1a1a1e] rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-1">קוקיז ניתוח</h3>
                    <p className="text-xs text-[#71717a]">עוזרים לנו להבין כיצד מבקרים משתמשים באתר</p>
                  </div>
                  <button
                    onClick={() => togglePreference('analytics')}
                    className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${
                      preferences.analytics ? 'bg-purple-600' : 'bg-[#3f3f46]'
                    }`}
                  >
                    <div 
                      className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                        preferences.analytics ? 'right-0.5' : 'left-0.5'
                      }`} 
                    />
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-[#1a1a1e] rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-1">קוקיז שיווק</h3>
                    <p className="text-xs text-[#71717a]">משמשים להצגת פרסומות רלוונטיות</p>
                  </div>
                  <button
                    onClick={() => togglePreference('marketing')}
                    className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${
                      preferences.marketing ? 'bg-purple-600' : 'bg-[#3f3f46]'
                    }`}
                  >
                    <div 
                      className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                        preferences.marketing ? 'right-0.5' : 'left-0.5'
                      }`} 
                    />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={savePreferences}
              className="w-full mt-6 px-6 py-4 text-base font-bold text-white gradient-primary rounded-full hover:scale-[1.02] transition-transform"
            >
              שמור הגדרות
            </button>
          </div>
        </div>
      )}
    </>
  );
}

