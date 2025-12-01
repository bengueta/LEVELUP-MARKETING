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
    const animate = async () => {
      const { gsap } = await import('gsap');
      
      if (textRef.current) {
        const chars = text.split('');
        textRef.current.innerHTML = '';
        
        chars.forEach((char, i) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(20px)';
          textRef.current?.appendChild(span);
          
          gsap.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: delay + i * speed,
            ease: 'power3.out',
          });
        });
      }
    };

    animate();
  }, [text, delay, speed]);

  return <span ref={textRef} className={className} />;
}

