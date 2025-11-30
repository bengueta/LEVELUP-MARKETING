export default function About() {
  return (
    <section id="about" className="py-24 px-8 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-20 items-center relative z-[1]">
          <div className="relative">
            <div className="glass-effect rounded-[32px] overflow-hidden aspect-[4/5] relative">
              <div className="absolute inset-0 flex items-center justify-center text-[#71717a] text-sm">
                תמונה של בן
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-effect px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap shadow-lg">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>זמין לשותפויות חדשות</span>
            </div>
          </div>

          <div className="py-4">
            <span className="inline-flex items-center gap-2 text-xs font-extrabold text-purple-600 uppercase tracking-[2px] mb-4 px-4 py-2 border-2 border-purple-600/30 rounded-full">
              מי מאחורי CoreSide
            </span>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight mb-6">
              בן גואטה
            </h2>
            <p className="text-[1.0625rem] text-[#a1a1aa] leading-[1.8] mb-5">
              <span className="text-[#fafafa] font-semibold">13 שנות ניסיון בפיתוח</span> – התחלתי בגיל 15, היום אני יזם, אסטרטג, ומוביל צוות מפתחים מ-4 יבשות.
            </p>
            <p className="text-[1.0625rem] text-[#a1a1aa] leading-[1.8] mb-5">
              הבנתי שהבעיה בתעשייה היא לא טכנית – <span className="text-[#fafafa] font-semibold">היא מבנית.</span> ספק שמקבל כסף מראש? אין לו סיבה לדאוג שתצליח. לכן בניתי מודל אחר.
            </p>
            <p className="text-[1.0625rem] text-[#a1a1aa] leading-[1.8] mb-5">
              <span className="text-[#fafafa] font-semibold">אני סלקטיבי.</span> עובד רק עם יזמים שמוכנים להתחייב – לא לכסף, להצלחה. מי שמגיע עם רעיון, תשוקה, ויכולת לפעול.
            </p>
            <p className="text-sm text-[#71717a] mt-4 pt-4 border-t border-white/8">
              <strong className="text-[#a1a1aa]">עד היום:</strong> 27 פרויקטים שהושקו, 8 שותפויות פעילות, שיעור הצלחה של 89%.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {['אסטרטגיה', 'שיווק', 'Full-Stack', 'צוות גלובלי'].map((tag, i) => (
                <span key={i} className="px-5 py-3 bg-[#1a1a1e] border border-white/8 rounded-full text-sm font-medium flex items-center gap-2 hover:border-white/15 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

