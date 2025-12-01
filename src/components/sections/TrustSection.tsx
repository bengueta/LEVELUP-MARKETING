'use client';

import { useEffect, useRef } from 'react';

const caseStudies = [
  {
    title: 'SaaS FinTech',
    before: { revenue: '₪0', users: 0, conversion: '0%' },
    after: { revenue: '₪2.4M', users: 15000, conversion: '85%' },
    period: '6 חודשים',
  },
  {
    title: 'E-commerce Platform',
    before: { revenue: '₪50K', users: 500, conversion: '12%' },
    after: { revenue: '₪800K', users: 8000, conversion: '68%' },
    period: '4 חודשים',
  },
  {
    title: 'Health App',
    before: { revenue: '₪0', users: 0, conversion: '0%' },
    after: { revenue: '₪1.2M', users: 12000, conversion: '72%' },
    period: '8 חודשים',
  },
];

const awards = [
  { name: 'Top Developer 2024', issuer: 'Tech Awards', year: '2024' },
  { name: 'Best Partnership Model', issuer: 'Startup Nation', year: '2023' },
  { name: 'Innovation Award', issuer: 'Digital Israel', year: '2024' },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      if (sectionRef.current) {
        gsap.fromTo(sectionRef.current.querySelectorAll('.trust-item'), 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    };

    animate();
  }, []);

  return (
    <section ref={sectionRef} id="trust" className="py-24 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-[1600px] mx-auto">
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold text-purple-600 uppercase tracking-[2px] mb-4 px-4 py-2 border border-purple-600/30 rounded-full bg-purple-600/10">
            אמון והצלחות
          </span>
          <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-black leading-[1.1] tracking-[-2px] mb-4 text-white">
            תוצאות <span className="gradient-text">אמיתיות</span>
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-[700px] mx-auto leading-[1.75]">
            לא הבטחות - תוצאות. הנה מה שהשגנו עם הלקוחות שלנו.
          </p>
        </header>

        {/* Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {caseStudies.map((study, i) => (
            <article 
              key={i} 
              className="trust-item group relative"
            >
              <div className="glass-effect-2 rounded-2xl p-8 h-full relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(147,51,234,0.3)] hover:border-purple-500/40">
                {/* Depth layers - עיצוב זכוכית עמוק */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 right-0 h-[3px] gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-6">{study.title}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-[#71717a] mb-2">לפני</div>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-sm text-[#a1a1aa]">הכנסות</div>
                          <div className="text-lg font-bold text-white">{study.before.revenue}</div>
                        </div>
                        <div>
                          <div className="text-sm text-[#a1a1aa]">המרה</div>
                          <div className="text-lg font-bold text-white">{study.before.conversion}</div>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div>
                      <div className="text-xs text-[#71717a] mb-2">אחרי ({study.period})</div>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-sm text-[#a1a1aa]">הכנסות</div>
                          <div className="text-lg font-bold text-green-400">{study.after.revenue}</div>
                        </div>
                        <div>
                          <div className="text-sm text-[#a1a1aa]">המרה</div>
                          <div className="text-lg font-bold text-green-400">{study.after.conversion}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* לחצן לצפייה בממשקים */}
                  <button className="mt-6 w-full px-4 py-3 glass-effect rounded-xl text-sm font-semibold text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <span>צפה בממשקים</span>
                    <svg className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Awards & Certifications */}
        <div className="glass-effect-2 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">פרסים והכרות</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award, i) => (
              <div key={i} className="text-center trust-item">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="text-lg font-bold text-white mb-1">{award.name}</div>
                <div className="text-sm text-[#a1a1aa]">{award.issuer} • {award.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

