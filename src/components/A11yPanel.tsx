'use client';

import { useState, useEffect } from 'react';

export default function A11yPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('normal');
  const [contrast, setContrast] = useState('normal');
  const [motion, setMotion] = useState('normal');

  useEffect(() => {
    // Apply accessibility settings
    const root = document.documentElement;
    
    // Font size
    root.style.setProperty('--font-size-multiplier', 
      fontSize === 'large' ? '1.2' : fontSize === 'xlarge' ? '1.4' : '1'
    );
    
    // Contrast
    if (contrast === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (motion === 'reduced') {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Theme
    if (theme === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    } else {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    }
  }, [fontSize, contrast, motion, theme]);

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
        className="fixed top-1/2 left-0 -translate-y-1/2 z-[99] glass-effect rounded-r-lg p-3 cursor-pointer transition-all hover:pl-5 text-[#fafafa]"
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
            className="fixed inset-0 bg-black/50 z-[997] transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <aside className={`fixed top-0 left-0 w-80 h-full glass-effect border-r border-white/10 z-[998] p-8 overflow-y-auto transition-transform duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme === 'dark' ? 'border-purple-600 bg-purple-600/10' : 'border-transparent bg-[#1a1a1e]'}`}
                    aria-pressed={theme === 'dark'}
                  >
                    🌙 לילה
                  </button>
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${theme === 'light' ? 'border-purple-600 bg-purple-600/10' : 'border-transparent bg-[#1a1a1e]'}`}
                    aria-pressed={theme === 'light'}
                  >
                    ☀️ יום
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

