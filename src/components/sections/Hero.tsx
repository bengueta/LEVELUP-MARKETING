'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import DataVisualization from '../DataVisualization';
import { smoothScrollToGSAP } from '@/lib/smoothScroll';
import LiveConnections from '@/components/widgets/LiveConnections';

export default function Hero() {
  const [viewerCount, setViewerCount] = useState(12);
  const [chartReady, setChartReady] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const heroHighlights = [
    {
      label: 'הכנסות ממוצעות',
      value: '2.4M',
      detail: 'בדולרים בשנה הראשונה'
    },
    {
      label: 'המרה ממוצעת',
      value: '85%',
      detail: 'מוביל לפגישות סגירה'
    },
    {
      label: 'עלויות ניהול',
      value: '12K',
      detail: 'תחזוקה חודשית מלאה'
    },
  ];
  const heroBenefits = [
    {
      title: '+10 שנים',
      description: 'ניסיון בבניית מערכות עם צמיחה מהירה והוכחות מהשטח.',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: 'תוכנית בוטיק',
      description: 'יחס אישי, צוות ייעודי והבנה עמוקה של האתגרים העסקיים.',
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
    },
    {
      title: 'סקייל חכם',
      description: 'שילוב של פיתוח, מחקר ושיווק כדי להניע לקוחות למיקוד תוצאות.',
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
    },
  ];

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

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    
    const checkDimensions = () => {
      const { width, height } = chartContainerRef.current!.getBoundingClientRect();
      if (width > 0 && height > 0) {
        setChartReady(true);
      }
    };
    
    checkDimensions();
    const resizeObserver = new ResizeObserver(checkDimensions);
    resizeObserver.observe(chartContainerRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center px-4 md:px-8 lg:px-16 py-12 md:py-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[160%] h-full bg-gradient-to-br from-purple-600/20 via-blue-600/15 to-green-500/10 blur-[100px] animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(var(--border-default)_1px,transparent_1px),linear-gradient(90deg,var(--border-default)_1px,transparent_1px)] bg-[length:80px_80px] opacity-30" 
             style={{ maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)' }} />
      </div>

      <div className="relative z-[2] w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-center">
        {/* Left: Data Visualization */}
        <div 
          ref={chartContainerRef}
          className="h-[400px] md:h-[500px] lg:h-[600px] order-2 lg:order-1 min-w-0 w-full"
        >
          {chartReady && <DataVisualization />}
        </div>

        {/* Right: Content */}
        <div className="text-right order-1 lg:order-2">
          {/* Trust Badge */}
          <div id="heroBadge" className="mb-6 opacity-0 translate-y-5">
            <LiveConnections />
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
          <div id="heroActions" className="mb-6 flex flex-wrap justify-end gap-3 opacity-0 translate-y-5">
            <button
              onClick={(e) => {
                e.preventDefault();
                smoothScrollToGSAP('contact', 100);
              }}
              className="inline-flex items-center gap-3 px-7 py-4 gradient-primary text-white text-base font-bold rounded-full transition-all hover:-translate-y-1 hover:scale-[1.05] glow-purple border-2 border-white/20 relative overflow-hidden group"
            >
              <span className="relative z-10">התחל פרויקט</span>
              <svg className="w-5 h-5 relative z-10 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l-7 7 7 7"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <Link
              href="#roicalculator"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full text-sm font-semibold hover:border-white transition-all text-white"
            >
              צפה ב-ROI שנוצר
              <span className="text-xs text-[#a1a1aa]">עוד רגע</span>
            </Link>
          </div>

          <div id="heroFeatures" className="opacity-0 translate-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {heroHighlights.map((highlight) => (
                <article key={highlight.label} className="glass-effect rounded-2xl p-5 text-left">
                  <p className="text-xs text-[#a1a1aa] uppercase tracking-[2px] mb-2">{highlight.label}</p>
                  <p className="text-3xl font-black text-white leading-none">{highlight.value}</p>
                  <p className="text-sm text-[#9ca3af] mt-1">{highlight.detail}</p>
                </article>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {heroBenefits.map((benefit) => (
                <article key={benefit.title} className="glass-effect rounded-2xl p-6 text-right flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                      <p className="text-sm text-[#a1a1aa]">{benefit.description}</p>
                    </div>
                    <div className="w-11 h-11 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

