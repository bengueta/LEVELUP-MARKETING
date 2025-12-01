'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'פגישת היכרות',
    description: 'נפגש להבין את העסק שלך, האתגרים והמטרות. בלי התחייבות, בלי לחץ - רק שיחה אמיתית.',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    number: '02',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'אסטרטגיה ותכנון',
    description: 'נבנה יחד תוכנית עבודה מפורטת עם יעדים מדידים, לוחות זמנים ותקציב ברור.',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    number: '03',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'פיתוח וביצוע',
    description: 'צוות המומחים שלנו מתחיל לעבוד. עדכונים שוטפים, שקיפות מלאה ושיתוף פעולה הדוק.',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    number: '04',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'השקה ומעקב',
    description: 'משיקים יחד ומתחילים למדוד תוצאות. אופטימיזציה מתמדת להשגת היעדים.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    number: '05',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'צמיחה מתמשכת',
    description: 'לא נעלמים אחרי ההשקה. ממשיכים ביחד עם תמיכה, שדרוגים והרחבות.',
    gradient: 'from-orange-500 to-green-500'
  }
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    const animate = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      if (stepsRef.current) {
        const stepElements = stepsRef.current.children;
        
        gsap.fromTo(Array.from(stepElements), 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
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
    <section ref={sectionRef} id="process" className="py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold text-purple-600 uppercase tracking-[2px] mb-4 px-4 py-2 border border-purple-600/30 rounded-full bg-purple-600/10">
            תהליך העבודה
          </span>
          <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-black leading-[1.1] tracking-[-2px] mb-4 text-white">
            איך עובדים <span className="gradient-text">איתנו?</span>
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-[700px] mx-auto leading-[1.75]">
            תהליך ברור ושקוף מההתחלה ועד הסוף. אתה יודע בדיוק מה קורה בכל שלב.
          </p>
        </header>

        <div ref={stepsRef} className="relative">
          {/* Connection Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-20 hidden lg:block" 
               style={{ width: 'calc(100% - 12rem)', margin: '0 6rem' }} />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-[1]">
            {steps.map((step, i) => (
              <div 
                key={i}
                className={`text-center cursor-pointer transition-all duration-500 ${
                  activeStep === i ? 'scale-105' : ''
                }`}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                  {/* Number */}
                  <div className={`text-4xl font-black mb-4 transition-colors ${
                    activeStep === i || hoveredStep === i ? 'gradient-text' : 'text-[#71717a]'
                  }`}>
                    {step.number}
                  </div>
                  
                  {/* Icon - אנימציה קבועה עדינה */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-lg transition-all duration-500 will-change-transform ${
                    activeStep === i || hoveredStep === i ? 'scale-110 shadow-2xl ring-2 ring-purple-500/30' : 'animate-breathe'
                  }`}>
                    <div className={`transition-transform duration-500 will-change-transform ${
                      hoveredStep === i ? 'rotate-6' : ''
                    }`}>
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className={`text-sm leading-relaxed transition-all duration-300 ${
                    activeStep === i ? 'text-white' : 'text-[#a1a1aa]'
                  }`}>
                    {step.description}
                  </p>

                  {/* Expanded Details */}
                  {activeStep === i && (
                    <div className="mt-4 glass-effect-2 rounded-xl p-4 animate-fadeIn">
                      <div className="text-xs text-[#71717a] mb-2">פרטים נוספים:</div>
                      <ul className="text-sm text-[#a1a1aa] space-y-1 text-right">
                        <li>• משך זמן: {i === 0 ? '1-2 שעות' : i === 1 ? '2-3 שבועות' : i === 2 ? '1-3 חודשים' : i === 3 ? '1-2 שבועות' : 'מתמשך'}</li>
                        <li>• תדירות פגישות: {i === 0 ? 'פגישה אחת' : i === 1 ? 'פגישה שבועית' : i === 2 ? 'פגישה יומית' : i === 3 ? 'פגישה שבועית' : 'פגישה חודשית'}</li>
                        <li>• תוצרים: {i === 0 ? 'הבנה מלאה של הצרכים' : i === 1 ? 'תוכנית עבודה מפורטת' : i === 2 ? 'מוצר פועל' : i === 3 ? 'מוצר מושק' : 'תמיכה שוטפת'}</li>
                      </ul>
                    </div>
                  )}
                </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 glass-effect-2 rounded-full px-6 py-3">
              <span className="text-sm text-[#a1a1aa]">אתה בשלב:</span>
              <span className="text-base font-bold gradient-text">
                {activeStep !== null ? steps[activeStep].title : 'בחר שלב לפרטים'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

