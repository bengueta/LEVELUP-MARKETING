'use client';

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

/**
 * רקע אסתטי עם גריד וגרדיאנטים שמגיב למצב בהירות.
 */
export default function AnimatedBackground() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedTheme = (localStorage.getItem('theme') as Theme | null) ?? 'dark';
    setTheme(savedTheme);

    const handler = (event: CustomEvent<{ theme: Theme }>) => {
      setTheme(event.detail.theme);
    };

    window.addEventListener('theme-change' as any, handler);
    return () => window.removeEventListener('theme-change' as any, handler);
  }, []);

  if (theme === 'light') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #f8fafc 0%, #ede9fe 30%, #dbeafe 60%, #f0fdf4 100%)',
          }}
        />

        {/* Soft glow blobs */}
        <div className="absolute inset-0 opacity-70">
          <div
            className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full blur-[160px]"
            style={{
              background: 'radial-gradient(circle, rgba(196,181,253,0.7) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-[-200px] left-[-120px] w-[620px] h-[620px] rounded-full blur-[160px]"
            style={{
              background: 'radial-gradient(circle, rgba(191,219,254,0.8) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px]"
            style={{
              background: 'radial-gradient(circle, rgba(248,250,252,0.9) 0%, transparent 80%)',
            }}
          />
        </div>

        {/* Light grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '90px 90px',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Accent lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-px opacity-40"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(147,51,234,0.2), rgba(59,130,246,0.2), transparent)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-40"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), rgba(147,51,234,0.2), transparent)',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dark base */}
      <div className="absolute inset-0 bg-[#09090b]" />

      {/* Gradients */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
          }}
        />

        <div
          className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
          }}
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[150px]"
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Accent lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.5), rgba(37, 99, 235, 0.5), transparent)',
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.5), rgba(147, 51, 234, 0.5), transparent)',
          }}
        />
      </div>

      {/* Glow */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            radial-gradient(ellipse at top, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(37, 99, 235, 0.1) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}

