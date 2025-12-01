'use client';

import { useState } from 'react';
import ThreeDCard from '../ui/ThreeDCard';

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
    const maxIndex = Math.max(0, filteredTestimonials.length - 3);
    if (currentIndex < maxIndex) {
      setCurrentIndex(Math.min(currentIndex + 1, maxIndex));
    }
  };

  const prevTestimonials = () => {
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  return (
    <section id="testimonials" className="py-24 px-4 md:px-8 lg:px-16 bg-[#121215] relative overflow-hidden">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-[1]">
            {visibleTestimonials.map((testimonial, i) => (
              <article 
                key={`${currentIndex}-${i}`}
                className="glass-effect-2 rounded-2xl p-6 md:p-8 flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(147,51,234,0.3)] hover:border-purple-500/40 relative overflow-hidden group h-full will-change-transform"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Breathing glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-purple-500/8 group-hover:via-purple-500/5 group-hover:to-blue-500/8 transition-all duration-500 pointer-events-none" />
                
                {/* Depth shadow */}
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <svg 
                        key={j} 
                        className="w-5 h-5 text-yellow-400 transition-transform duration-300 group-hover:scale-110" 
                        style={{ transitionDelay: `${j * 50}ms` }}
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Project Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4 w-fit">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-xs text-purple-300 font-semibold">{testimonial.project}</span>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-[1.0625rem] text-[#e4e4e7] leading-[1.85] flex-1 mb-8 relative">
                    <span className="absolute -top-2 -right-2 text-4xl text-purple-500/20 font-serif leading-none">"</span>
                    {testimonial.quote}
                  </blockquote>

                  <footer className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg ring-2 ring-purple-500/30">
                      {testimonial.name[0]}
                    </div>
                    <div className="flex-1">
                      <cite className="text-base font-bold block mb-1.5 not-italic text-white">
                        {testimonial.name}
                      </cite>
                      <div className="text-sm text-[#a1a1aa] mb-2">
                        {testimonial.role}
                      </div>
                      {testimonial.verified && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400 font-semibold">
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

          {/* Carousel Controls */}
          {filteredTestimonials.length > 3 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevTestimonials}
                disabled={currentIndex === 0}
                className={`w-12 h-12 rounded-full glass-effect-2 flex items-center justify-center transition-all ${
                  currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
                aria-label="המלצה קודמת"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <div className="flex gap-2 items-center">
                {Array.from({ length: Math.ceil(filteredTestimonials.length / 3) }).map((_, i) => {
                  const isActive = Math.floor(currentIndex / 3) === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i * 3)}
                      className={`rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-purple-500 w-8 h-2 shadow-lg shadow-purple-500/50' 
                          : 'bg-white/20 w-2 h-2 hover:bg-white/30'
                      }`}
                      aria-label={`עבור להמלצה ${i + 1}`}
                    />
                  );
                })}
              </div>

              <button
                onClick={nextTestimonials}
                disabled={currentIndex >= Math.max(0, filteredTestimonials.length - 3)}
                className={`w-12 h-12 rounded-full glass-effect-2 flex items-center justify-center transition-all ${
                  currentIndex >= Math.max(0, filteredTestimonials.length - 3) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
                aria-label="המלצה הבאה"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

