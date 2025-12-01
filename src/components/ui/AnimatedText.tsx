'use client';

import { useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function AnimatedText({ text, className = '', delay = 0, speed = 0.05 }: AnimatedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const animate = async () => {
      const { gsap } = await import('gsap');
      
      if (textRef.current) {
        // Clear previous content
        textRef.current.innerHTML = '';
        
        const chars = text.split('');
        const spans: HTMLSpanElement[] = [];
        
        chars.forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(20px)';
          textRef.current?.appendChild(span);
          spans.push(span);
          
          gsap.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: delay + i * speed,
            ease: 'power3.out',
          });
        });

        // Cleanup function
        return () => {
          spans.forEach(span => {
            gsap.killTweensOf(span);
          });
        };
      }
    };

    const cleanup = animate();
    
    return () => {
      if (cleanup) cleanup.then(fn => fn?.());
      if (textRef.current) {
        textRef.current.innerHTML = '';
      }
    };
  }, [text, delay, speed]);

  return <span ref={textRef} className={className} />;
}

