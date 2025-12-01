'use client';

import { useState } from 'react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      track: formData.get('track'),
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@bengueta.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          _subject: `ליד חדש מ-CoreSide: ${data.name}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          (e.target as HTMLFormElement).reset();
        }, 3000);
      }
    } catch (error) {
      // Fallback to mailto
      const mailtoLink = `mailto:info@bengueta.com?subject=ליד חדש: ${encodeURIComponent(data.name as string)}&body=${encodeURIComponent(
        `שם: ${data.name}\nטלפון: ${data.phone}\nאימייל: ${data.email}\nמסלול: ${data.track || 'לא נבחר'}`
      )}`;
      window.location.href = mailtoLink;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] -right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-purple-600/15 to-transparent blur-[100px]" />
        <div className="absolute bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-gradient-to-br from-blue-600/10 to-transparent blur-[100px]" />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-[1]">
        <header className="text-center mb-8">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight mb-4">
            מוכן להתחיל?
          </h2>
          <p className="text-lg text-[#a1a1aa]">
            השאר פרטים ונחזור אליך תוך 24 שעות. <strong className="text-[#fafafa]">בלי התחייבות.</strong>
          </p>
        </header>

        <form onSubmit={handleSubmit} className="glass-effect rounded-[32px] p-8 text-right">
          <div className="flex gap-4 flex-wrap items-stretch">
            <div className="flex-1 min-w-[150px]">
              <input
                type="text"
                name="name"
                placeholder="שם מלא *"
                required
                className="w-full px-5 py-4 bg-[#1a1a1e] border-2 border-transparent rounded-xl text-base font-hebrew transition-all hover:bg-[#1e1e22] focus:outline-none focus:border-purple-600 focus:bg-[#1e1e22] h-[52px]"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <input
                type="tel"
                name="phone"
                placeholder="טלפון *"
                required
                dir="ltr"
                className="w-full px-5 py-4 bg-[#1a1a1e] border-2 border-transparent rounded-xl text-base font-hebrew transition-all hover:bg-[#1e1e22] focus:outline-none focus:border-purple-600 focus:bg-[#1e1e22] h-[52px]"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <input
                type="email"
                name="email"
                placeholder="אימייל *"
                required
                dir="ltr"
                className="w-full px-5 py-4 bg-[#1a1a1e] border-2 border-transparent rounded-xl text-base font-hebrew transition-all hover:bg-[#1e1e22] focus:outline-none focus:border-purple-600 focus:bg-[#1e1e22] h-[52px]"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <select
                name="track"
                className="w-full px-5 py-4 bg-[#1a1a1e] border-2 border-transparent rounded-xl text-base font-hebrew transition-all hover:bg-[#1e1e22] focus:outline-none focus:border-purple-600 focus:bg-[#1e1e22] h-[52px] cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%2371717a\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M8 11L3 6h10l-5 5z\'/%3E%3C/svg%3E')] bg-no-repeat bg-[length:12px] bg-[position:left_1.25rem_center] pr-5 pl-10"
              >
                <option value="">בחר מסלול</option>
                <option value="startup">סטארטאפים (50/50)</option>
                <option value="business">בעלי עסקים</option>
                <option value="both">שניהם</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || submitSuccess}
              className="flex-shrink-0 px-6 md:px-8 py-3 md:py-4 h-[52px] gradient-primary text-white text-sm md:text-base font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#09090b] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative z-10 flex items-center gap-2">
                {submitSuccess ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    נשלח בהצלחה!
                  </>
                ) : isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    שולח...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    שלח עכשיו - תשובה תוך 24 שעות
                  </>
                )}
              </span>
            </button>
          </div>

          <div className="flex justify-center gap-6 mt-6 pt-5 border-t border-white/8">
            {['מאובטח', 'בלי ספאם', 'תשובה ב-24 שעות'].map((text, i) => (
              <span key={i} className="flex items-center gap-2 text-xs text-[#71717a]">
                <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {text}
              </span>
            ))}
          </div>
        </form>

        <div className="flex justify-center gap-5 mt-10">
          <a
            href="https://wa.me/972586966886"
            className="flex items-center gap-4 px-6 py-5 glass-effect rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-[#1a1a1e] rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#a1a1aa]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <div className="text-xs text-[#71717a] mb-1">וואטסאפ</div>
              <div className="text-base font-semibold text-[#fafafa] direction-ltr text-left">058-696-6886</div>
            </div>
          </a>

          <a
            href="mailto:info@bengueta.com"
            className="flex items-center gap-4 px-6 py-5 glass-effect rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-[#1a1a1e] rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-[#a1a1aa]">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
            </div>
            <div>
              <div className="text-xs text-[#71717a] mb-1">אימייל</div>
              <div className="text-base font-semibold text-[#fafafa] direction-ltr text-left">info@bengueta.com</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

