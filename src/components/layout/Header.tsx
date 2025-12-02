'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { smoothScrollToGSAP } from '@/lib/smoothScroll';
import { Z_INDEX } from '@/lib/zIndex';
import UrgencyBar from '@/components/widgets/UrgencyBar';
import { useI18n } from '@/lib/i18n';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { language, setLanguage, t } = useI18n();

  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Listen for changes from A11yPanel
  useEffect(() => {
    const handleThemeChange = (e: CustomEvent) => {
      setTheme(e.detail.theme);
      localStorage.setItem('theme', e.detail.theme);
    };

    window.addEventListener('theme-change' as any, handleThemeChange);

    return () => {
      window.removeEventListener('theme-change' as any, handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme: newTheme } }));
  };

  const toggleLanguage = () => {
    const newLang = language === 'he' ? 'en' : 'he';
    setLanguage(newLang);
  };

  const handleNavScroll = (target: string, offset = 100) => {
    smoothScrollToGSAP(target, offset);
    setIsMobileMenuOpen(false);
  };

  const navButtonClass =
    'text-sm font-medium text-[#a1a1aa] hover:text-white hover:bg-white/5 transition-colors rounded-xl px-3 py-1.5 focus-visible:outline-none focus-visible:ring-0';

  return (
    <header 
      className="fixed top-0 left-0 right-0 transition-all duration-300"
      style={{ zIndex: Z_INDEX.HEADER }}
    >
      {/* UrgencyBar - חלק מה-Header */}
      <UrgencyBar />
      
      {/* Header Content */}
      <div className="px-4 md:px-8 lg:px-16 py-3 md:py-4 flex justify-between items-center bg-[rgba(9,9,11,0.95)] backdrop-blur-[30px] border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Left: CTA Button + Icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleNavScroll('contact', 100);
            }}
            className="inline-flex items-center gap-2 px-5 md:px-7 py-2.5 md:py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs md:text-sm font-semibold rounded-xl transition-all hover:-translate-y-0.5 hover:scale-105 focus-visible:outline-none focus-visible:ring-0 shadow-lg shadow-purple-500/30"
          >
            <span className="hidden sm:inline">{t('nav.startProject')}</span>
            <span className="sm:hidden">{t('nav.start')}</span>
          </button>
      
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="hidden lg:flex w-9 h-9 items-center justify-center text-[#a1a1aa] hover:text-white transition-colors rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-0"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
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
          
          {/* Language Toggle (Globe) */}
          <button 
            onClick={toggleLanguage}
            className="hidden lg:flex w-9 h-9 items-center justify-center text-[#a1a1aa] hover:text-white transition-colors rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-0"
            aria-label={language === 'he' ? 'Switch to English' : 'עבור לעברית'}
            title={language === 'he' ? 'Switch to English' : 'עבור לעברית'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </button>
        </div>
        
        {/* Center: Navigation */}
        <nav className="hidden lg:flex items-center">
          <ul className="flex items-center gap-6 list-none">
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNavScroll('contact', 100);
                }}
                className={navButtonClass}
              >
                {t('nav.contact')}
              </button>
            </li>
            <li>
              <Link
                href="#"
                className={`${navButtonClass} inline-flex items-center`}
              >
                {t('nav.demos')}
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={`${navButtonClass} inline-flex items-center`}
              >
                {t('nav.blog')}
              </Link>
            </li>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNavScroll('about', 100);
                }}
                className={navButtonClass}
              >
                {t('nav.team')}
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNavScroll('testimonials', 100);
                }}
                className={navButtonClass}
              >
                {t('nav.testimonials')}
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNavScroll('process', 100);
                }}
                className={navButtonClass}
              >
                {t('nav.process')}
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNavScroll('tracks', 100);
                }}
                className={navButtonClass}
              >
                {t('nav.services')}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavScroll('hero', 0)}
                className={navButtonClass}
              >
                {t('nav.home')}
              </button>
            </li>
          </ul>
      </nav>
      
      {/* Right: Logo */}
        <Link href="#" className="font-english text-lg md:text-xl font-extrabold order-3 md:order-none focus-visible:outline-none">
          <span className="text-white">Core</span>
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Side</span>
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
      </div>
      
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
                  handleNavScroll('hero', 0);
                }}
                  className={`${navButtonClass} w-full text-right`}
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  handleNavScroll('tracks', 100);
                  }}
                  className={`${navButtonClass} w-full text-right`}
                >
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavScroll('process', 100);
                  }}
                  className={`${navButtonClass} w-full text-right`}
                >
                  {t('nav.process')}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavScroll('testimonials', 100);
                  }}
                  className={`${navButtonClass} w-full text-right`}
                >
                  {t('nav.testimonials')}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavScroll('about', 100);
                  }}
                  className={`${navButtonClass} w-full text-right`}
                >
                  {t('nav.team')}
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavScroll('contact', 100);
                  }}
                  className={`${navButtonClass} w-full text-right`}
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
            
            {/* Mobile Language & Theme */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-white/10">
              <button 
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 text-sm text-[#a1a1aa] hover:text-white transition-colors"
              >
                {theme === 'dark' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    מצב יום
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    מצב לילה
                  </>
                )}
              </button>
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 text-sm text-[#a1a1aa] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                {language === 'he' ? 'English' : 'עברית'}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
