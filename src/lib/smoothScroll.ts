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
 * Polling אגרסיבי - עד 2 שניות
 */
export const smoothScrollToGSAP = async (elementId: string, offset: number = 80) => {
  if (typeof window === 'undefined') return;
  
  // Polling אגרסיבי - עד 2 שניות (20 ניסיונות * 100ms)
  const maxAttempts = 20;
  const delay = 100;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise(resolve => setTimeout(resolve, delay));
    
    const element = document.getElementById(elementId);
    if (element) {
      // Element נמצא - גלול
      try {
        const { gsap } = await import('gsap');
        const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
        gsap.registerPlugin(ScrollToPlugin);
        
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: element,
            offsetY: offset,
          },
          ease: 'power2.inOut',
        });
        return; // הצלחה - יציאה
      } catch (gsapError) {
        // Fallback ל-native smooth scroll
        smoothScrollTo(elementId, offset);
        return;
      }
    }
  }
  
  // אחרי כל ה-retries - ניסיון אחרון עם native scroll
  smoothScrollTo(elementId, offset);
};

