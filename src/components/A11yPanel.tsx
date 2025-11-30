'use client';

import { useState } from 'react';

export default function A11yPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('normal');
  const [contrast, setContrast] = useState('normal');
  const [motion, setMotion] = useState('normal');

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

            <div className="mb-6">
              <h3 className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-3">מצב תצוגה</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${theme === 'dark' ? 'border-purple-600 bg-purple-600/10' : 'border-transparent bg-[#1a1a1e]'}`}
                >
                  🌙 לילה
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${theme === 'light' ? 'border-purple-600 bg-purple-600/10' : 'border-transparent bg-[#1a1a1e]'}`}
                >
                  ☀️ יום
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

