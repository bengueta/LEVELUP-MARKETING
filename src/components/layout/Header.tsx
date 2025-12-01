'use client';

import { useState } from 'react';
import Link from 'next/link';
import { smoothScrollToGSAP } from '@/lib/smoothScroll';
import { Z_INDEX } from '@/lib/zIndex';
import UrgencyBar from '@/components/widgets/UrgencyBar';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [direction, setDirection] = useState<'rtl' | 'ltr'>('rtl');

  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const savedDirection = localStorage.getItem('direction') as 'rtl' | 'ltr' | null;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedDirection) setDirection(savedDirection);
  }, []);

  // Listen for changes from A11yPanel
  useEffect(() => {
    const handleThemeChange = (e: CustomEvent) => {
      setTheme(e.detail.theme);
      localStorage.setItem('theme', e.detail.theme);
    };
    
    const handleDirectionChange = (e: CustomEvent) => {
      setDirection(e.detail.direction);
      localStorage.setItem('direction', e.detail.direction);
    };

    window.addEventListener('theme-change' as any, handleThemeChange);
    window.addEventListener('direction-change' as any, handleDirectionChange);

    return () => {
      window.removeEventListener('theme-change' as any, handleThemeChange);
      window.removeEventListener('direction-change' as any, handleDirectionChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: newTheme } }));
  };

  const toggleDirection = () => {
    const newDirection = direction === 'rtl' ? 'ltr' : 'rtl';
    setDirection(newDirection);
    localStorage.setItem('direction', newDirection);
    window.dispatchEvent(new CustomEvent('direction-change', { detail: { direction: newDirection } }));
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 transition-all duration-300"
      style={{ zIndex: Z_INDEX.HEADER }}
    >
      {/* UrgencyBar - חלק מה-Header */}
      <UrgencyBar />
      
      {/* Header Content */}
      <div className="px-4 md:px-8 lg:px-16 py-3 md:py-4 flex justify-between items-center bg-[rgba(9,9,11,0.95)] backdrop-blur-[30px] border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      {/* Left: CTA Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          smoothScrollToGSAP('contact', 100);
        }}
        className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs md:text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <span className="hidden sm:inline">התחל פרויקט</span>
        <span className="sm:hidden">התחל</span>
      </button>
      
      {/* Center: Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        <ul className="flex items-center gap-8 list-none">
          <li>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              בית
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                smoothScrollToGSAP('tracks', 100);
              }}
              className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              שירותים
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                smoothScrollToGSAP('process', 100);
              }}
              className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              תהליך
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                smoothScrollToGSAP('testimonials', 100);
              }}
              className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              המלצות
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                smoothScrollToGSAP('about', 100);
              }}
              className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              צוות
            </button>
          </li>
          <li><Link href="#" className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors">בלוג</Link></li>
          <li><Link href="#" className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors">ספריית דמוים</Link></li>
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                smoothScrollToGSAP('contact', 100);
              }}
              className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              יצירת קשר
            </button>
          </li>
        </ul>
        
        {/* Icons */}
        <div className="flex items-center gap-4 mr-4">
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors"
            aria-label={theme === 'dark' ? 'עבור למצב יום' : 'עבור למצב לילה'}
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button 
            onClick={toggleDirection}
            className="w-8 h-8 flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors"
            aria-label={direction === 'rtl' ? 'Switch to English (LTR)' : 'עבור לעברית (RTL)'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2h2.945M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Right: Logo */}
      <Link href="#" className="font-english text-lg md:text-xl font-extrabold text-white order-3 md:order-none">
        CoreSide
      </Link>
      
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden w-8 h-8 flex items-center justify-center text-white"
        aria-label="תפריט"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed top-[calc(48px+73px)] left-0 right-0 bg-[rgba(9,9,11,0.98)] backdrop-blur-[30px] border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          style={{ zIndex: Z_INDEX.HEADER }}
        >
          <nav className="px-4 py-6">
            <ul className="flex flex-col gap-4 list-none">
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToGSAP('hero', 0);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-base font-medium text-[#a1a1aa] hover:text-white transition-colors w-full text-right"
                >
                  בית
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToGSAP('tracks', 100);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-base font-medium text-[#a1a1aa] hover:text-white transition-colors w-full text-right"
                >
                  שירותים
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToGSAP('process', 100);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-base font-medium text-[#a1a1aa] hover:text-white transition-colors w-full text-right"
                >
                  תהליך
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToGSAP('testimonials', 100);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-base font-medium text-[#a1a1aa] hover:text-white transition-colors w-full text-right"
                >
                  המלצות
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToGSAP('about', 100);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-base font-medium text-[#a1a1aa] hover:text-white transition-colors w-full text-right"
                >
                  צוות
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToGSAP('contact', 100);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-base font-medium text-[#a1a1aa] hover:text-white transition-colors w-full text-right"
                >
                  יצירת קשר
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
      </div>
    </header>
  );
}

