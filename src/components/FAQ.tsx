'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'איך עובד מסלול השותפות?',
      answer: 'אנחנו נכנסים כשותפים ב-50/50. אתה מביא את הרעיון, הקשרים והמחויבות – אנחנו מביאים פיתוח, שיווק ואסטרטגיה. משקיעים ביחד, מצליחים ביחד. 0₪ מראש.'
    },
    {
      question: 'מה התנאים לשותפות?',
      answer: 'אני סלקטיבי. מחפש יזמים עם רעיון חד, יכולת לפעול, וקשרים רלוונטיים. לא כל אחד מתאים – וזה בכוונה. אם עברת שיחה ראשונית, זה כבר אומר משהו.'
    },
    {
      question: 'כמה עולה מסלול בעלי עסקים?',
      answer: 'תלוי בפרויקט. בסיום השיחה נבין מה אתה צריך ונתן הצעה מדויקת עם תשלומים חודשיים קבועים. בלי הפתעות, בלי עלויות נסתרות.'
    },
    {
      question: 'כמה זמן לוקח פיתוח?',
      answer: 'MVP תוך 2-4 חודשים. מוצר מלא 4-8 חודשים. אבל בניגוד לאחרים – אנחנו לא נעלמים אחרי. נשארים שותפים או ספקי שירות קבועים.'
    }
  ];

  return (
    <section id="faq" className="py-24 px-8 bg-[#121215] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <header className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold text-purple-600 uppercase tracking-[2px] mb-4 px-4 py-2 border-2 border-purple-600/30 rounded-full">
            שאלות נפוצות
          </span>
          <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-black leading-[1.1] tracking-[-3px] mb-6 gradient-text">
            לפני שתשאל
          </h2>
        </header>

        <div className="max-w-[800px] mx-auto flex flex-col gap-4 relative z-[1]">
          {faqs.map((faq, i) => (
            <details
              key={i}
              open={i === openIndex}
              className="glass-effect rounded-2xl overflow-hidden transition-all hover:border-purple-500/20"
            >
              <summary
                className="p-6 text-[1.0625rem] font-semibold text-[#fafafa] cursor-pointer flex items-center justify-between gap-4 list-none transition-colors hover:text-purple-400"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(openIndex === i ? -1 : i);
                }}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-[#71717a] transition-transform flex-shrink-0 ${openIndex === i ? 'rotate-180 text-purple-600' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </summary>
              {openIndex === i && (
                <div className="px-6 pb-6 animate-fadeIn">
                  <p className="text-[0.9375rem] text-[#a1a1aa] leading-[1.8]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

