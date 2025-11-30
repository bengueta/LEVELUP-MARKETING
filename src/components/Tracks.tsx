import Link from 'next/link';

export default function Tracks() {
  const tracks = [
    {
      type: 'startup',
      badge: 'שותפות 50/50',
      title: 'מסלול סטארטאפים',
      subtitle: 'נכנסים כשותפים לכל דבר. פיתוח, אסטרטגיה, שיווק, חיבור למשקיעים – הכל ביחד עד ה-Exit.',
      features: [
        'פיתוח מוצר מלא – מ-0 ועד Scale',
        'אסטרטגיה עסקית ושיווקית',
        'חיבור לרשת משקיעים ואנשי עסקים',
        'צוות פיתוח גלובלי מנוסה'
      ],
      ideal: 'יזמים עם רעיון חד, קשרים חזקים, ויכולת לפעול. לא לכל אחד – רק למי שבא לנצח.',
      cta: '🚀 בדוק התאמה עכשיו - 0₪'
    },
    {
      type: 'business',
      badge: 'תשלומים חודשיים',
      title: 'מסלול בעלי עסקים',
      subtitle: 'פיתוח תוכנה מלא בתשלומים חודשיים קבועים. בלי הלוואות, בלי סיכון – המערכת גדלה איתך.',
      features: [
        'פיתוח מלא – אפליקציות, מערכות, אתרים',
        'תשלום חודשי קבוע ונוח',
        'עדכונים ותחזוקה שוטפת',
        'תמיכה טכנית מלאה 24/7'
      ],
      ideal: 'בעלי עסקים עם תזרים יציב שרוצים להשקיע בטכנולוגיה בלי לסכן את העסק.',
      cta: '💰 קבל הצעת מחיר עכשיו'
    }
  ];

  return (
    <section id="tracks" className="py-24 px-8 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold text-purple-600 uppercase tracking-[2px] mb-4 px-4 py-2 border-2 border-purple-600/30 rounded-full">
            הפתרון
          </span>
          <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black leading-[1.1] tracking-[-3px] mb-6 gradient-text">
            בחר את המסלול שמתאים לך
          </h2>
          <p className="text-[1.1875rem] text-[#a1a1aa] max-w-[600px] mx-auto leading-[1.75]">
            שני מסלולים. עיקרון אחד: <strong className="text-[#fafafa]">האינטרס שלנו זהה לשלך.</strong> הצלחת? הצלחנו. נכשלת? נכשלנו ביחד.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-[1]">
          {tracks.map((track, i) => (
            <article 
              key={i}
              className={`glass-effect rounded-[32px] p-10 relative overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] ${
                track.type === 'startup' 
                  ? 'hover:border-purple-500/50 hover:glow-purple' 
                  : 'hover:border-blue-500/50 hover:glow-blue'
              }`}
            >
              <div className={`absolute top-[-120px] left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 transition-all group-hover:opacity-30 group-hover:scale-125 ${
                track.type === 'startup' ? 'bg-purple-600' : 'bg-blue-600'
              }`} />

              <div className="relative z-[1]">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 ${
                  track.type === 'startup'
                    ? 'bg-purple-600/15 text-purple-400 border border-purple-600/30'
                    : 'bg-blue-600/15 text-blue-400 border border-blue-600/30'
                }`}>
                  {track.badge}
                </div>

                <h3 className="text-[1.875rem] font-extrabold mb-4 tracking-tight">
                  {track.title}
                </h3>

                <p className="text-base text-[#a1a1aa] leading-[1.7] mb-8">
                  {track.subtitle}
                </p>

                <ul className="flex flex-col gap-4 mb-8">
                  {track.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-4 p-4 bg-[#1a1a1e] rounded-xl">
                      <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </span>
                      <span className="text-[0.9375rem] text-[#fafafa] leading-[1.5]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="bg-[#1a1a1e] border border-dashed border-white/15 rounded-xl p-5 mb-8">
                  <div className="text-[0.6875rem] font-bold text-[#71717a] uppercase tracking-wider mb-2">
                    מתאים ל:
                  </div>
                  <p className="text-sm text-[#a1a1aa] leading-[1.6]">
                    {track.ideal}
                  </p>
                </div>

                <Link
                  href="#contact"
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold transition-all hover:-translate-y-1 hover:scale-105 ${
                    track.type === 'startup'
                      ? 'gradient-primary text-white glow-purple border-2 border-white/20'
                      : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white glow-blue border-2 border-white/20'
                  }`}
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
      </div>
    </section>
  );
}

