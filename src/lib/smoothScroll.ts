/**
 * פונקציה לגלילה חלקה לאזור ספציפי
 * משתמשת ב-smooth scroll behavior עם fallback
 */
export const smoothScrollTo = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

/**
 * פונקציה לגלילה חלקה עם GSAP (אם זמין)
 */
export const smoothScrollToGSAP = async (elementId: string, offset: number = 80) => {
  try {
    const { gsap } = await import('gsap');
    const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
    
    gsap.registerPlugin(ScrollToPlugin);
    
    const element = document.getElementById(elementId);
    if (!element) return;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: element,
        offsetY: offset,
      },
      ease: 'power2.inOut',
    });
  } catch (error) {
    // Fallback ל-smooth scroll רגיל
    smoothScrollTo(elementId, offset);
  }
};

