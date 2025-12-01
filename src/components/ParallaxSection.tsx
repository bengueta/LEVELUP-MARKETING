'use client';

import { useRef, useEffect, useState } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxSection({ children, speed = 0.5, className = '' }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;
    
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const newOffset = scrollProgress * 100 * speed;
      setOffset(newOffset);
    };

    const optimizedScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', optimizedScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

