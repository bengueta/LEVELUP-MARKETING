'use client';

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
        .to('#heroStats', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('#heroActions', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to('#heroTrust', { opacity: 1, duration: 0.5 }, '-=0.2');

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
    <section className="min-h-screen flex flex-col justify-center items-center px-8 py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[160%] h-full bg-gradient-to-br from-purple-600/20 via-blue-600/15 to-green-500/10 blur-[100px] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(var(--border-default)_1px,transparent_1px),linear-gradient(90deg,var(--border-default)_1px,transparent_1px)] bg-[length:80px_80px] opacity-30" 
             style={{ maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)' }} />
      </div>

      <div className="relative z-[2] text-center max-w-[900px]">
        {/* Trust Badge */}
        <div id="heroBadge" className="inline-flex items-center gap-3 px-5 py-2 glass-effect rounded-full text-sm font-medium text-[#a1a1aa] mb-8 opacity-0 translate-y-5">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </span>
          <span>מקבלים שותפויות חדשות • נותרו 3 מקומות</span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(3rem,9vw,6rem)] font-black leading-[1.05] tracking-[-4px] mb-8 gradient-text">
          <span className="hero-title-word block overflow-hidden opacity-0 translate-y-full">
            אנחנו לא בית תוכנה.
          </span>
          <span className="hero-title-word block overflow-hidden opacity-0 translate-y-full">
            אנחנו שותפים.
          </span>
        </h1>

        {/* Subtitle */}
        <p id="heroSubtitle" className="text-[clamp(1.125rem,2vw,1.375rem)] text-[#a1a1aa] max-w-[640px] mx-auto mb-8 leading-[1.7] opacity-0 translate-y-5">
          שותפות טכנולוגית עם skin in the game אמיתי.<br />
          <strong className="text-[#fafafa]">אנחנו מרוויחים רק אם אתה מרוויח.</strong> 0₪ מראש.
        </p>

        {/* Stats */}
        <div id="heroStats" className="flex justify-center gap-12 mb-10 opacity-0 translate-y-5">
          <div className="text-center relative">
            <div data-count="0" className="font-english text-[2.5rem] font-black gradient-text mb-2">0</div>
            <div className="text-[0.8125rem] text-[#71717a]">שנות ניסיון</div>
          </div>
          <div className="text-center relative before:content-[''] before:absolute before:-left-6 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-10 before:bg-white/8">
            <div className="font-english text-[2.5rem] font-black gradient-text mb-2">50/50</div>
            <div className="text-[0.8125rem] text-[#71717a]">שותפות אמיתית</div>
          </div>
          <div className="text-center relative before:content-[''] before:absolute before:-left-6 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-10 before:bg-white/8">
            <div className="font-english text-[2.5rem] font-black gradient-text mb-2">0₪</div>
            <div className="text-[0.8125rem] text-[#71717a]">תשלום מראש</div>
          </div>
        </div>

        {/* CTA */}
        <div id="heroActions" className="flex flex-col items-center gap-4 opacity-0 translate-y-5">
          <Link 
            href="#contact" 
            className="inline-flex items-center justify-center gap-3 px-10 py-6 gradient-primary text-white text-[1.125rem] font-bold rounded-full min-w-[320px] transition-all hover:-translate-y-1 hover:scale-[1.05] glow-purple border-2 border-white/10 relative overflow-hidden group"
          >
            <span className="relative z-10">🚀 בדוק אם אתה מתאים לשותפות</span>
            <svg className="w-[18px] h-[18px] relative z-10 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l-7 7 7 7"/>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <div className="flex items-center gap-2 text-[0.8125rem] text-[#71717a] mt-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span><strong className="text-purple-600 text-[1.1em]">{viewerCount}</strong> אנשים צופים בדף עכשיו</span>
          </div>
          
          <Link href="#tracks" className="text-[#a1a1aa] hover:text-[#fafafa] transition-colors text-[0.9375rem] font-medium">
            ראה את שני המסלולים ↓
          </Link>
        </div>

        {/* Trust line */}
        <div id="heroTrust" className="flex items-center justify-center gap-8 mt-8 flex-wrap opacity-0">
          {['בלי התחייבות', 'תשובה תוך 24 שעות', 'סודיות מלאה'].map((text, i) => (
            <span key={i} className="flex items-center gap-2 text-sm text-[#71717a]">
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

