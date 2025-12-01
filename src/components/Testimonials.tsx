export default function Testimonials() {
  const testimonials = [
    {
      rating: 5,
      quote: '"היו לי 3 ניסיונות כושלים עם חברות פיתוח. שרפתי כמעט 400,000₪. עם CoreSide, בפעם הראשונה הרגשתי שמישהו באמת רוצה שהפרויקט יצליח."',
      name: 'רועי כהן',
      role: 'מייסד, SaaS בתחום הפינטק',
      verified: true
    },
    {
      rating: 5,
      quote: '"המודל של תשלומים חודשיים שינה לי את המשחק. במקום הלוואה של 150,000₪, אני משלם סכום קבוע והמערכת גדלה איתי. גאוני."',
      name: 'מיכאל לוי',
      role: 'בעלים, רשת קמעונאית',
      verified: true
    },
    {
      rating: 5,
      quote: '"בן הבין את הרעיון שלי בשיחה הראשונה. הוא לא רק מתכנת – הוא חושב כמו יזם. זה ההבדל בין ספק לשותף אמיתי."',
      name: 'שירה אברהם',
      role: 'מייסדת, אפליקציית בריאות',
      verified: true
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-16 bg-[#121215] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold text-purple-600 uppercase tracking-[2px] mb-4 px-4 py-2 border border-purple-600/30 rounded-full bg-purple-600/10">
            המלצות
          </span>
          <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-black leading-[1.1] tracking-[-2px] mb-4 text-white">
            מה הלקוחות <span className="gradient-text">אומרים עלינו</span>
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-[700px] mx-auto leading-[1.75]">
            אל תאמינו לנו - תאמינו ללקוחות שלנו. הנה מה שיש להם להגיד על העבודה איתנו.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-[1]">
          {testimonials.map((testimonial, i) => (
            <article 
              key={i}
              className="glass-effect rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02] hover:border-purple-500/50 hover:glow-purple relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] gradient-primary scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left" />
              
              <div className="flex gap-0.5 mb-5">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <span key={j} className="text-base text-yellow-500">⭐</span>
                ))}
              </div>

              <blockquote className="text-[1.0625rem] text-[#a1a1aa] leading-[1.8] flex-1 mb-6 relative">
                {testimonial.quote}
              </blockquote>

              <footer className="flex items-center gap-4 pt-5 border-t border-white/8">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center font-bold text-white text-lg">
                  {testimonial.name[0]}
                </div>
                <div className="flex-1">
                  <cite className="text-base font-bold block mb-1 not-italic">
                    {testimonial.name}
                  </cite>
                  <div className="text-[0.8125rem] text-[#71717a]">
                    {testimonial.role}
                  </div>
                  {testimonial.verified && (
                    <span className="inline-flex items-center gap-1 text-[0.6875rem] text-green-500 font-semibold mt-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      לקוח מאומת
                    </span>
                  )}
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

