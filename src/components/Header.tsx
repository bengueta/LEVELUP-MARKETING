'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] px-8 py-5 flex justify-between items-center transition-all duration-300 ${
        scrolled 
          ? 'bg-[rgba(9,9,11,0.9)] backdrop-blur-[30px] border-b-2 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] py-4' 
          : ''
      }`}
    >
      <Link href="#" className="font-english text-[1.375rem] font-extrabold text-[#fafafa] flex items-center gap-2">
        <span className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center text-white text-base font-extrabold glow-purple">
          C
        </span>
        CORESIDE
      </Link>
      
      <nav className="flex items-center gap-10">
        <ul className="flex items-center gap-8 list-none">
          <li><Link href="#problems" className="text-[0.9375rem] font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all hover:after:w-full">הבעיה</Link></li>
          <li><Link href="#tracks" className="text-[0.9375rem] font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all hover:after:w-full">המסלולים</Link></li>
          <li><Link href="#testimonials" className="text-[0.9375rem] font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors relative pb-2 after:content-[''] after:absolute after:bottom-0 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all hover:after:w-full">לקוחות</Link></li>
          <li><Link href="#about" className="text-[0.9375rem] font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors relative pb-2 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all hover:after:w-full">מי אנחנו</Link></li>
        </ul>
        <Link 
          href="#contact" 
          className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white text-[0.9375rem] font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:scale-105 glow-purple border-2 border-white/20"
        >
          🚀 בדוק התאמה
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l-7 7 7 7"/>
          </svg>
        </Link>
      </nav>
    </header>
  );
}

