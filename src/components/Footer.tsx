'use client';

import Link from 'next/link';
import { smoothScrollToGSAP } from '@/lib/smoothScroll';
import { Z_INDEX } from '@/lib/zIndex';

export default function Footer() {
  return (
    <footer 
      className="py-12 md:py-16 px-4 md:px-8 bg-[#121215] border-t border-white/10 relative"
      style={{ zIndex: Z_INDEX.FOOTER }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-8 md:mb-12">
          <div className="max-w-[300px]">
            <Link href="#" className="font-english text-[1.375rem] font-extrabold text-[#fafafa] flex items-center gap-2 mb-5">
              <span className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center text-white text-base font-extrabold">
                C
              </span>
              CORESIDE
            </Link>
            <p className="text-[0.9375rem] text-[#71717a] leading-[1.7] mb-6">
              Technology Partnership Studio.<br />
              שותפות טכנולוגית, לא עסקת פיתוח.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center text-[#a1a1aa] transition-all hover:border-white/15 hover:text-[#fafafa] hover:-translate-y-0.5">
                in
              </a>
              <a href="#" className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center text-[#a1a1aa] transition-all hover:border-white/15 hover:text-[#fafafa] hover:-translate-y-0.5">
                𝕏
              </a>
            </div>
          </div>

          <nav>
            <h4 className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-5">ניווט</h4>
            <ul className="list-none space-y-3">
              {['הבעיה', 'המסלולים', 'לקוחות', 'מי אנחנו', 'צור קשר'].map((link, i) => {
                const sectionId = ['problems', 'tracks', 'testimonials', 'about', 'contact'][i];
                return (
                  <li key={i}>
                    <button
                      onClick={() => smoothScrollToGSAP(sectionId, 100)}
                      className="text-[0.9375rem] text-[#a1a1aa] hover:text-[#fafafa] transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                    >
                      {link}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div>
            <h4 className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-5">מסלולים</h4>
            <ul className="list-none space-y-3">
              <li>
                <button
                  onClick={() => smoothScrollToGSAP('tracks', 100)}
                  className="text-[0.9375rem] text-[#a1a1aa] hover:text-[#fafafa] transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                >
                  סטארטאפים
                </button>
              </li>
              <li>
                <button
                  onClick={() => smoothScrollToGSAP('tracks', 100)}
                  className="text-[0.9375rem] text-[#a1a1aa] hover:text-[#fafafa] transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
                >
                  בעלי עסקים
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-5">צור קשר</h4>
            <ul className="list-none space-y-3">
              <li><a href="tel:0586966886" className="text-[0.9375rem] text-[#a1a1aa] hover:text-[#fafafa] transition-colors">058-696-6886</a></li>
              <li><a href="mailto:info@bengueta.com" className="text-[0.9375rem] text-[#a1a1aa] hover:text-[#fafafa] transition-colors">info@bengueta.com</a></li>
              <li><a href="https://wa.me/972586966886" className="text-[0.9375rem] text-[#a1a1aa] hover:text-[#fafafa] transition-colors">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 md:pt-8 border-t border-white/8">
          <p className="text-xs md:text-[0.8125rem] text-[#71717a] text-center sm:text-right">© 2024 CoreSide. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}

