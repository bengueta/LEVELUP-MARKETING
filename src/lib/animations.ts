import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animations = {
  // Fade in from bottom
  fadeInUp: (element: HTMLElement | HTMLElement[], delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power3.out',
      }
    );
  },

  // Fade in from top
  fadeInDown: (element: HTMLElement | HTMLElement[], delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power3.out',
      }
    );
  },

  // Scale in
  scaleIn: (element: HTMLElement | HTMLElement[], delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay,
        ease: 'back.out(1.7)',
      }
    );
  },

  // Slide in from left
  slideInLeft: (element: HTMLElement | HTMLElement[], delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay,
        ease: 'power3.out',
      }
    );
  },

  // Slide in from right
  slideInRight: (element: HTMLElement | HTMLElement[], delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay,
        ease: 'power3.out',
      }
    );
  },

  // Stagger children
  staggerChildren: (
    parent: HTMLElement,
    childSelector: string,
    animation: (el: HTMLElement) => gsap.core.Tween,
    stagger = 0.1
  ) => {
    const children = Array.from(parent.querySelectorAll(childSelector)) as HTMLElement[];
    return gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger,
      ease: 'power3.out',
      onStart: () => {
        children.forEach((child) => {
          gsap.set(child, { opacity: 0, y: 50 });
        });
      },
    });
  },

  // Scroll triggered animation
  scrollTrigger: (
    element: HTMLElement | HTMLElement[],
    animation: gsap.core.Tween,
    options?: {
      start?: string;
      end?: string;
      toggleActions?: string;
    }
  ) => {
    return ScrollTrigger.create({
      trigger: element,
      start: options?.start || 'top 80%',
      end: options?.end || 'bottom 20%',
      toggleActions: options?.toggleActions || 'play none none none',
      animation,
    });
  },

  // Parallax effect
  parallax: (element: HTMLElement, speed = 0.5) => {
    return ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(element, {
          y: progress * 100 * speed,
          willChange: 'transform',
        });
      },
    });
  },

  // Counter animation
  counter: (
    element: HTMLElement,
    targetValue: number,
    duration = 2,
    prefix = '',
    suffix = ''
  ) => {
    const obj = { value: 0 };
    return gsap.to(obj, {
      value: targetValue,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = `${prefix}${Math.floor(obj.value)}${suffix}`;
      },
    });
  },
};

// Performance optimized animation defaults
gsap.defaults({
  force3D: true,
  willChange: 'transform, opacity',
});

