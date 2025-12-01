import Link from 'next/link';

export default function Tracks() {
  const tracks = [
    {
      type: 'established',
      badge: null,
      popular: false,
      title: 'חברות מבוססות',
      price: 'מ-₪50,000',
      subtitle: 'חוזה מותאם מלא לכל הצרכים שלכם',
      features: [
        'פיתוח + עיצוב + שיווק + לוגיסטיקה',
        'יחס אישי וצוות כדי עלכם',
        'בחירת לקוחות - אנחנו בוחרים בזהירות',
        'תמיכה ממשכת עד לעסק מרוויח'
      ],
      cta: 'קבלו הצעה',
      ctaStyle: 'bg-[#1a1a1e] text-white hover:bg-[#242428]'
    },
    {
      type: 'business',
      badge: 'הבחירה הפופולרית',
      popular: true,
      title: 'אנשי עסק חזקים עם קשרים',
      price: 'שותפות אחוז',
      subtitle: 'בואו נכנסים ביחד בשותפות על אחוזים',
      features: [
        'לא תשלום מראש - רק כשאתה מרוויח',
        'אנחנו מרווחים כשאתה מרוויח',
        'צוות ייעודי מוקדש לעסקך',
        'מ-שותפות מלאה: גילוי עד ניהול חנויות'
      ],
      cta: 'בואו נהיה שותפים',
      ctaStyle: 'gradient-primary text-white glow-purple'
    },
    {
      type: 'startup',
      badge: null,
      popular: false,
      title: 'יזמים מתחילים',
      price: 'מ-₪2,500/חודש',
      subtitle: 'התחילו את הדרך עם תשלומים חודשיים קטנים',
      features: [
        'האפליקציה שלכם מתפתחת עם הבזק שלכם',
        'אנחנו כאן כל יום להנחות וליישם',
        'התחייבות ארוכת טווח - לא מעזבים אחרי לא',
        'התמיכה המלאה שלנו במהלך הדרך'
      ],
      cta: 'בואו נדבר',
      ctaStyle: 'bg-[#1a1a1e] text-white hover:bg-[#242428]'
    }
  ];

  return (
    <section id="tracks" className="py-24 px-16 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-black leading-[1.1] tracking-[-2px] mb-4 text-white">
            דרכים גמישות לגדול איתנו
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-[600px] mx-auto leading-[1.75]">
            בחרו את המסלול שמתאים לשלב שלכם בעסק
          </p>
        </header>

        <div className="grid grid-cols-3 gap-6 relative z-[1]">
          {tracks.map((track, i) => (
            <article 
              key={i}
              className={`glass-effect rounded-2xl p-8 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                track.popular ? 'border-2 border-purple-500/50' : ''
              }`}
            >
              {track.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  {track.badge}
                </div>
              )}

              <div className="relative z-[1]">
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {track.title}
                </h3>

                <p className="text-sm text-[#a1a1aa] mb-2 leading-relaxed">
                  {track.subtitle}
                </p>

                <div className="text-lg font-bold text-purple-400 mb-6">
                  {track.price}
                </div>

                <ul className="flex flex-col gap-3 mb-8">
                  {track.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </span>
                      <span className="text-sm text-[#fafafa] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contact"
                  className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full text-sm font-bold transition-all hover:-translate-y-1 ${track.ctaStyle}`}
                >
                  {track.cta}
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l-7 7 7 7"/>
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Partnership Explanation */}
        <div className="mt-24 glass-effect rounded-2xl p-12 max-w-[1000px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-2xl font-bold text-white">אחוז משותף? כך זה עובד</h3>
          </div>
          
          <div className="space-y-4 text-[#a1a1aa] leading-relaxed">
            <p>
              אנחנו לא רוצים להרוויח כסף וללכת. אנחנו רוצים להרוויח איתך. בשותפות על אחוזים, אנחנו משקיעים את הזמן שלנו ודעתנו - ואנחנו מרווחים רק כשהעסק שלך מרוויח.
            </p>
            <p>
              אם אתה חזק, עם קשרים טובים, ורוצה לגדול - אנחנו כאן. כי כשאתה מגדול ברוצה הצלחה, אנחנו מרוויחים איתך.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

