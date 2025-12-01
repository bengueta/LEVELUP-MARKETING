'use client';

import { useState } from 'react';
import ThreeDCard from './ThreeDCard';

const categories = ['הכל', 'שותפות אחוז', 'תשלום חודשי', 'חברות מבוססות'];

export default function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState('הכל');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      rating: 5,
      quote: '"היו לי 3 ניסיונות כושלים עם חברות פיתוח. שרפתי כמעט 400,000₪. עם CoreSide, בפעם הראשונה הרגשתי שמישהו באמת רוצה שהפרויקט יצליח."',
      name: 'רועי כהן',
      role: 'מייסד, SaaS בתחום הפינטק',
      verified: true,
      category: 'שותפות אחוז',
      project: 'FinTech SaaS Platform'
    },
    {
      rating: 5,
      quote: '"המודל של תשלומים חודשיים שינה לי את המשחק. במקום הלוואה של 150,000₪, אני משלם סכום קבוע והמערכת גדלה איתי. גאוני."',
      name: 'מיכאל לוי',
      role: 'בעלים, רשת קמעונאית',
      verified: true,
      category: 'תשלום חודשי',
      project: 'E-commerce Platform'
    },
    {
      rating: 5,
      quote: '"בן הבין את הרעיון שלי בשיחה הראשונה. הוא לא רק מתכנת – הוא חושב כמו יזם. זה ההבדל בין ספק לשותף אמיתי."',
      name: 'שירה אברהם',
      role: 'מייסדת, אפליקציית בריאות',
      verified: true,
      category: 'שותפות אחוז',
      project: 'Health App'
    },
    {
      rating: 5,
      quote: '"הצוות המקצועי והמסירות שלהם ראויים לציון. הפרויקט הושלם בזמן ובתקציב, והתוצאות עברו את כל הציפיות שלנו."',
      name: 'דני רוזן',
      role: 'CTO, חברת טכנולוגיה',
      verified: true,
      category: 'חברות מבוססות',
      project: 'Enterprise System'
    },
    {
      rating: 5,
      quote: '"התחלנו עם רעיון קטן, ועכשיו יש לנו מוצר מלא שעובד. התמיכה שלהם לא נגמרת אחרי ההשקה - זה ההבדל."',
      name: 'עמית כהן',
      role: 'יזם, Marketplace',
      verified: true,
      category: 'תשלום חודשי',
      project: 'Marketplace Platform'
    },
  ];

  const filteredTestimonials = selectedCategory === 'הכל' 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory);

  const visibleTestimonials = filteredTestimonials.slice(currentIndex, currentIndex + 3);

  const nextTestimonials = () => {
    if (currentIndex + 3 < filteredTestimonials.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevTestimonials = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

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

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentIndex(0);
              }}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === category
                  ? 'gradient-primary text-white glow-purple'
                  : 'glass-effect-2 text-[#a1a1aa] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-[1]">
            {visibleTestimonials.map((testimonial, i) => (
              <ThreeDCard key={`${currentIndex}-${i}`} intensity={8}>
                <article className="glass-effect-2 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02] hover:border-purple-500/50 hover:glow-purple relative overflow-hidden group h-full">
                  <div className="absolute top-0 left-0 right-0 h-[3px] gradient-primary scale-x-0 origin-right transition-transform duration-500 group-hover:scale-x-100 group-hover:origin-left" />
                  
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <span key={j} className="text-base text-yellow-500 animate-fadeIn" style={{ animationDelay: `${j * 0.1}s` }}>⭐</span>
                    ))}
                  </div>

                  <div className="text-xs text-purple-400 mb-2 font-semibold">{testimonial.project}</div>

                  <blockquote className="text-[1.0625rem] text-[#a1a1aa] leading-[1.8] flex-1 mb-6 relative">
                    {testimonial.quote}
                  </blockquote>

                  <footer className="flex items-center gap-4 pt-5 border-t border-white/8">
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center font-bold text-white text-lg">
                      {testimonial.name[0]}
                    </div>
                    <div className="flex-1">
                      <cite className="text-base font-bold block mb-1 not-italic text-white">
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
              </ThreeDCard>
            ))}
          </div>

          {/* Carousel Controls */}
          {filteredTestimonials.length > 3 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevTestimonials}
                disabled={currentIndex === 0}
                className={`w-12 h-12 rounded-full glass-effect-2 flex items-center justify-center transition-all ${
                  currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(filteredTestimonials.length / 3) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i * 3)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      Math.floor(currentIndex / 3) === i ? 'bg-purple-500 w-8' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonials}
                disabled={currentIndex + 3 >= filteredTestimonials.length}
                className={`w-12 h-12 rounded-full glass-effect-2 flex items-center justify-center transition-all ${
                  currentIndex + 3 >= filteredTestimonials.length ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

