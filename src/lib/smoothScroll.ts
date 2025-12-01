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
    // Wait for DOM to be ready
    if (typeof window === 'undefined') return;
    
    // Wait a bit for lazy-loaded components to render
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const element = document.getElementById(elementId);
    if (!element) {
      // Retry after a short delay for lazy-loaded sections
      setTimeout(() => {
        const retryElement = document.getElementById(elementId);
        if (retryElement) {
          smoothScrollTo(elementId, offset);
        }
      }, 300);
      return;
    }

    // Try GSAP first
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
    } catch (gsapError) {
      // Fallback ל-smooth scroll רגיל אם GSAP לא זמין
      smoothScrollTo(elementId, offset);
    }
  } catch (error) {
    // Fallback ל-smooth scroll רגיל
    smoothScrollTo(elementId, offset);
  }
};

