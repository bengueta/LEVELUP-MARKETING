'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DataVisualization from './DataVisualization';

export default function Hero() {
  const [viewerCount, setViewerCount] = useState(12);

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap');
      
      // Animate hero elements
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.to('#heroBadge', { opacity: 1, y: 0, duration: 0.6 })
        .to('.hero-title-word', { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, '-=0.3')
        .to('#heroSubtitle', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to('#heroActions', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('#heroFeatures', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');

      // Counter animation
      gsap.to({ value: 0 }, {
        value: 13,
        duration: 2,
        delay: 1.2,
        onUpdate: function() {
          const counter = document.querySelector('[data-count]');
          if (counter) counter.textContent = String(Math.floor(this.targets()[0].value));
        }
      });
    };

    animate();

    // Viewer count fluctuation
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(8, Math.min(25, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center px-16 py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[160%] h-full bg-gradient-to-br from-purple-600/20 via-blue-600/15 to-green-500/10 blur-[100px] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(var(--border-default)_1px,transparent_1px),linear-gradient(90deg,var(--border-default)_1px,transparent_1px)] bg-[length:80px_80px] opacity-30" 
             style={{ maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)' }} />
      </div>

      <div className="relative z-[2] w-full max-w-[1600px] mx-auto grid grid-cols-[1fr_1.2fr] gap-16 items-center">
        {/* Left: Data Visualization */}
        <div className="h-[600px]">
          <DataVisualization />
        </div>

        {/* Right: Content */}
        <div className="text-right">
          {/* Trust Badge */}
          <div id="heroBadge" className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-600/30 rounded-full text-sm font-medium text-purple-300 mb-6 opacity-0 translate-y-5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>₪0 מראש - אנחנו מרוויחים רק כשאתה מרוויח</span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.1] tracking-[-2px] mb-6">
            <span className="hero-title-word block overflow-hidden opacity-0 translate-y-full">
              <span className="gradient-text-animated">שותפות טכנולוגיה,</span>
            </span>
            <span className="hero-title-word block overflow-hidden opacity-0 translate-y-full">
              לא רק <span className="gradient-text-animated">פיתוח</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p id="heroSubtitle" className="text-lg text-[#a1a1aa] mb-8 leading-[1.7] opacity-0 translate-y-5">
            סוכנות דיגיטלית מובילה המספקת תוצאות אמיתיות. אנחנו משלבים אסטרטגיה, יצירתיות וטכנולוגיה כדי להפוך את החזון שלך למציאות.
          </p>

          {/* CTA */}
          <div id="heroActions" className="mb-10 opacity-0 translate-y-5">
            <Link 
              href="#contact" 
              className="inline-flex items-center gap-3 px-8 py-4 gradient-primary text-white text-base font-bold rounded-full transition-all hover:-translate-y-1 hover:scale-[1.05] glow-purple border-2 border-white/20 relative overflow-hidden group ripple-effect"
            >
              <span className="relative z-10">התחל פרויקט</span>
              <svg className="w-5 h-5 relative z-10 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l-7 7 7 7"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-3 gap-4 opacity-0 translate-y-5" id="heroFeatures">
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-xl font-bold text-white mb-2">+10 שנים</div>
              <div className="text-sm text-[#a1a1aa]">ניסיון עמוק בעסקים והצלחות</div>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="text-xl font-bold text-white mb-2">תוכנית בוטיק</div>
              <div className="text-sm text-[#a1a1aa]">יחס אישי, לא תבניות</div>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="text-xl font-bold text-white mb-2">תשלום חודשי</div>
              <div className="text-sm text-[#a1a1aa]">התחלה קטנה, גדילה גדולה</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

