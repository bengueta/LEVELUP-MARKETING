export default function Problems() {
  const problems = [
    {
      number: '01',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      title: 'המודל שבור',
      text: 'שילמת מראש = הספק קיבל את הכסף. למה שיהיה לו אכפת אם המוצר יצליח? אתה לקוח, לא שותף.'
    },
    {
      number: '02',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          <line x1="4" y1="4" x2="20" y2="20" strokeWidth="2"/>
        </svg>
      ),
      title: 'אפס מחויבות להצלחה',
      text: 'הם מקבלים תשלום לפי שעה. אין להם שום אינטרס שהפרויקט יצליח – רק שייגמר מהר.'
    },
    {
      number: '03',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      title: '"עוד חודשיים"',
      text: 'הפך לחצי שנה. התקציב נגמר, האנרגיה נגמרה, והחלום? מת. סיפור מוכר מדי.'
    }
  ];

  return (
    <section id="problems" className="py-24 px-4 md:px-8 bg-[#121215] relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[800px] mx-auto mb-16 text-center">
          <p className="text-[clamp(1.625rem,3.5vw,2.75rem)] font-bold leading-[1.35] text-[#a1a1aa]">
            שילמת <span className="text-red-500">200,000₪</span> על פיתוח.<br />
            קיבלת מוצר שלא עובד.<br />
            והספק? <strong className="text-[#fafafa]">הוא כבר עבר ללקוח הבא.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <article key={i} className="group relative perspective-1000">
              <div className="glass-effect rounded-[32px] p-10 h-full relative overflow-hidden transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-[1.02] group-hover:border-red-500/30 group-hover:shadow-[0_40px_80px_-20px_rgba(239,68,68,0.4)]">
                <div className="absolute top-6 left-6 text-xs font-semibold text-red-500 opacity-50 tracking-wider">
                  {problem.number}
                </div>
                
                <div className="relative w-16 h-16 mb-6">
                  <div className="w-16 h-16 border-2 border-red-500/20 rounded-full flex items-center justify-center text-red-500 relative transition-all group-hover:border-red-500/50 group-hover:bg-red-500/10 group-hover:scale-105 group-hover:-rotate-5">
                    {problem.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-[#fafafa] tracking-tight">
                  {problem.title}
                </h3>
                
                <p className="text-base text-[#a1a1aa] leading-[1.8]">
                  {problem.text}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 to-orange-500 scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

