'use client';

import { useState, useEffect } from 'react';
import { Z_INDEX } from '@/lib/zIndex';

export default function A11yPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('normal');
  const [contrast, setContrast] = useState('normal');
  const [motion, setMotion] = useState('normal');
  const [direction, setDirection] = useState<'rtl' | 'ltr'>('rtl');

  useEffect(() => {
    // Apply accessibility settings
    const root = document.documentElement;
    const html = document.documentElement;
    const body = document.body;
    
    // Font size
    root.style.setProperty('--font-size-multiplier', 
      fontSize === 'large' ? '1.2' : fontSize === 'xlarge' ? '1.4' : '1'
    );
    
    // Contrast
    if (contrast === 'high') {
      root.classList.add('high-contrast');
      body.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
      body.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (motion === 'reduced') {
      root.classList.add('reduced-motion');
      body.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
      body.classList.remove('reduced-motion');
    }

    // Theme - מוחל על html ו-body
    if (theme === 'light') {
      html.classList.add('light-theme');
      html.classList.remove('dark-theme');
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
      html.style.backgroundColor = '#fafafa';
      body.style.backgroundColor = '#fafafa';
      body.style.color = '#09090b';
    } else {
      html.classList.add('dark-theme');
      html.classList.remove('light-theme');
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      html.style.backgroundColor = '#09090b';
      body.style.backgroundColor = '#09090b';
      body.style.color = '#fafafa';
    }

    // Direction (RTL/LTR)
    html.setAttribute('dir', direction);
    html.setAttribute('lang', direction === 'rtl' ? 'he' : 'en');
    body.style.direction = direction;

    // Save to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('direction', direction);

    // Dispatch events for Header sync
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme } }));
    window.dispatchEvent(new CustomEvent('direction-change', { detail: { direction } }));
  }, [fontSize, contrast, motion, theme, direction]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const savedDirection = localStorage.getItem('direction') as 'rtl' | 'ltr' | null;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedDirection) setDirection(savedDirection);
  }, []);

  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      if (e.key === 'a' && e.ctrlKey) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-1/2 left-0 -translate-y-1/2 glass-effect rounded-r-lg p-3 cursor-pointer transition-all hover:pl-5 text-[#fafafa]"
        style={{ zIndex: Z_INDEX.A11Y_PANEL }}
        aria-label="פתח הגדרות נגישות"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[22px] h-[22px]">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="8" r="2"/>
          <path d="M12 10v8M8 14h8"/>
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity"
            style={{ zIndex: Z_INDEX.A11Y_PANEL - 1 }}
            onClick={() => setIsOpen(false)}
          />
          <aside 
            className={`fixed top-0 left-0 w-80 h-full glass-effect border-r border-white/10 p-8 overflow-y-auto transition-transform duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            style={{ zIndex: Z_INDEX.A11Y_PANEL }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">נגישות</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 bg-[#1a1a1e] border-none rounded-lg cursor-pointer text-[#fafafa] flex items-center justify-center hover:bg-[#1e1e22] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-3">מצב תצוגה</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center gap-2 ${theme === 'dark' ? 'border-purple-600 bg-purple-600/10' : 'border-transparent bg-[#1a1a1e]'}`}
                    aria-pressed={theme === 'dark'}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span>לילה</span>
                  </button>
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center gap-2 ${theme === 'light' ? 'border-purple-600 bg-purple-600/10' : 'border-transparent bg-[#1a1a1e]'}`}
                    aria-pressed={theme === 'light'}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>יום</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-3">כיוון שפה</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDirection('rtl')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center gap-2 ${direction === 'rtl' ? 'border-purple-600 bg-purple-600/10' : 'border-transparent bg-[#1a1a1e]'}`}
                    aria-pressed={direction === 'rtl'}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2h2.945M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>עברית (RTL)</span>
                  </button>
                  <button
                    onClick={() => setDirection('ltr')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center gap-2 ${direction === 'ltr' ? 'border-purple-600 bg-purple-600/10' : 'border-transparent bg-[#1a1a1e]'}`}
                    aria-pressed={direction === 'ltr'}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2h2.945M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>English (LTR)</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-3">גודל טקסט</h3>
                <div className="flex gap-2">
                  {['normal', 'large', 'xlarge'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        fontSize === size ? 'border-purple-600 bg-purple-600/10' : 'border-transparent bg-[#1a1a1e]'
                      }`}
                      aria-pressed={fontSize === size}
                    >
                      {size === 'normal' ? 'רגיל' : size === 'large' ? 'גדול' : 'גדול מאוד'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-3">ניגודיות</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setContrast('normal')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      contrast === 'normal' ? 'border-purple-600 bg-purple-600/10' : 'border-transparent bg-[#1a1a1e]'
                    }`}
                    aria-pressed={contrast === 'normal'}
                  >
                    רגיל
                  </button>
                  <button
                    onClick={() => setContrast('high')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      contrast === 'high' ? 'border-purple-600 bg-purple-600/10' : 'border-transparent bg-[#1a1a1e]'
                    }`}
                    aria-pressed={contrast === 'high'}
                  >
                    גבוה
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-3">אנימציות</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMotion('normal')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      motion === 'normal' ? 'border-purple-600 bg-purple-600/10' : 'border-transparent bg-[#1a1a1e]'
                    }`}
                    aria-pressed={motion === 'normal'}
                  >
                    רגיל
                  </button>
                  <button
                    onClick={() => setMotion('reduced')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      motion === 'reduced' ? 'border-purple-600 bg-purple-600/10' : 'border-transparent bg-[#1a1a1e]'
                    }`}
                    aria-pressed={motion === 'reduced'}
                  >
                    מופחת
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-[#71717a] mb-2">קיצורי מקלדת:</p>
                <ul className="text-xs text-[#a1a1aa] space-y-1">
                  <li>Ctrl+A - פתח נגישות</li>
                  <li>Esc - סגור</li>
                  <li>Tab - ניווט</li>
                </ul>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

