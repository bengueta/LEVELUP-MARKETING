'use client';

import { useEffect, useState } from 'react';

let gsap: any;
if (typeof window !== 'undefined') {
  gsap = require('gsap');
}

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 25;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsComplete(true);
        }, 200);
      }
      setProgress(currentProgress);
    }, 60);

    gsap.to('.loader-logo', { opacity: 1, duration: 0.4 });
    gsap.to('.loader-text', { opacity: 1, duration: 0.3, delay: 0.2 });

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isComplete) {
      gsap.to('#loader', {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: () => {
          const loader = document.getElementById('loader');
          if (loader) loader.style.display = 'none';
        }
      });
    }
  }, [isComplete]);

  if (isComplete) return null;

  return (
    <div id="loader" className="fixed inset-0 bg-[#09090b] z-[10000] flex flex-col items-center justify-center gap-8">
      <div className="loader-logo font-english text-[1.75rem] font-extrabold tracking-tight opacity-0">
        CORESIDE
      </div>
      <div className="w-60">
        <div className="w-full h-[3px] bg-white/8 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="loader-text text-[0.8125rem] text-[#71717a] text-center opacity-0">
        טוען חוויה מדהימה...
      </div>
    </div>
  );
}

