'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { smoothScrollToGSAP } from '@/lib/smoothScroll';

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
      className={`fixed top-0 left-0 right-0 z-[99] px-16 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled 
          ? 'bg-[rgba(9,9,11,0.9)] backdrop-blur-[30px] border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
          : ''
      }`}
    >
      {/* Left: CTA Button */}
      <button
        onClick={() => smoothScrollToGSAP('contact', 100)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        התחל פרויקט
      </button>
      
      {/* Center: Navigation */}
      <nav className="flex items-center gap-8">
        <ul className="flex items-center gap-8 list-none">
          <li>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              בית
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothScrollToGSAP('tracks', 100)}
              className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              שירותים
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothScrollToGSAP('process', 100)}
              className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              תהליך
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothScrollToGSAP('testimonials', 100)}
              className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              המלצות
            </button>
          </li>
          <li>
            <button
              onClick={() => smoothScrollToGSAP('about', 100)}
              className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              צוות
            </button>
          </li>
          <li><Link href="#" className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors">בלוג</Link></li>
          <li><Link href="#" className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors">ספריית דמוים</Link></li>
          <li>
            <button
              onClick={() => smoothScrollToGSAP('contact', 100)}
              className="text-sm font-medium text-[#a1a1aa] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
            >
              יצירת קשר
            </button>
          </li>
        </ul>
        
        {/* Icons */}
        <div className="flex items-center gap-4 mr-4">
          <button className="w-8 h-8 flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2h2.945M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Right: Logo */}
      <Link href="#" className="font-english text-xl font-extrabold text-white">
        CoreSide
      </Link>
    </header>
  );
}

