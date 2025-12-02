'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'he' | 'en';

interface Translations {
  [key: string]: {
    he: string;
    en: string;
  };
}

// All UI strings - Hebrew is the source, English is the translation
export const translations: Translations = {
  // Header
  'nav.home': { he: 'בית', en: 'Home' },
  'nav.services': { he: 'שירותים', en: 'Services' },
  'nav.process': { he: 'תהליך', en: 'Process' },
  'nav.testimonials': { he: 'המלצות', en: 'Testimonials' },
  'nav.team': { he: 'צוות', en: 'Team' },
  'nav.blog': { he: 'בלוג', en: 'Blog' },
  'nav.demos': { he: 'ספריית דמוים', en: 'Demo Library' },
  'nav.contact': { he: 'יצירת קשר', en: 'Contact' },
  'nav.startProject': { he: 'התחל פרויקט', en: 'Start Project' },
  'nav.start': { he: 'התחל', en: 'Start' },

  // Hero
  'hero.badge': { he: 'כמה מחוברים עכשיו?', en: 'How many connected now?' },
  'hero.title1': { he: 'שותפות טכנולוגיה,', en: 'Technology Partnership,' },
  'hero.title2': { he: 'לא רק', en: 'Not Just' },
  'hero.title3': { he: 'פיתוח', en: 'Development' },
  'hero.subtitle': { 
    he: 'סוכנות דיגיטלית מובילה המספקת תוצאות אמיתיות. אנחנו משלבים אסטרטגיה, יצירתיות וטכנולוגיה כדי להפוך את החזון שלך למציאות.',
    en: 'A leading digital agency delivering real results. We combine strategy, creativity, and technology to turn your vision into reality.'
  },
  'hero.cta': { he: 'התחל פרויקט', en: 'Start Project' },
  'hero.feature1.title': { he: '+10 שנים', en: '10+ Years' },
  'hero.feature1.desc': { he: 'ניסיון עמוק בעסקים והצלחות', en: 'Deep business experience and success' },
  'hero.feature2.title': { he: 'תוכנית בוטיק', en: 'Boutique Program' },
  'hero.feature2.desc': { he: 'יחס אישי, לא תבניות', en: 'Personal attention, not templates' },
  'hero.feature3.title': { he: 'תשלום חודשי', en: 'Monthly Payment' },
  'hero.feature3.desc': { he: 'התחלה קטנה, גדילה גדולה', en: 'Start small, grow big' },

  // Tracks
  'tracks.title': { he: 'דרכים גמישות לגדול איתנו', en: 'Flexible Ways to Grow With Us' },
  'tracks.subtitle': { he: 'בחרו את המסלול שמתאים לשלב שלכם בעסק', en: 'Choose the track that fits your business stage' },
  'tracks.compare': { he: 'השווה בין המסלולים', en: 'Compare Tracks' },
  'tracks.hideCompare': { he: 'הסתר השוואה', en: 'Hide Comparison' },
  'tracks.popular': { he: 'הבחירה הפופולרית', en: 'Most Popular' },
  
  'tracks.startup.title': { he: 'יזמים מתחילים', en: 'Startups' },
  'tracks.startup.price': { he: 'מ-₪2,500/חודש', en: 'From ₪2,500/month' },
  'tracks.startup.cta': { he: 'בואו נדבר', en: "Let's Talk" },
  
  'tracks.business.title': { he: 'אנשי עסק חזקים עם קשרים', en: 'Strong Business Owners' },
  'tracks.business.price': { he: 'שותפות אחוז', en: 'Revenue Share' },
  'tracks.business.cta': { he: 'בואו נהיה שותפים', en: "Let's Partner" },
  
  'tracks.established.title': { he: 'חברות מבוססות', en: 'Established Companies' },
  'tracks.established.price': { he: 'מ-₪50,000', en: 'From ₪50,000' },
  'tracks.established.cta': { he: 'קבלו הצעה', en: 'Get a Quote' },

  // Process
  'process.title': { he: 'איך עובדים', en: 'How We Work' },
  'process.titleHighlight': { he: 'איתנו?', en: 'With Us?' },
  'process.subtitle': { he: 'תהליך ברור ושקוף מההתחלה ועד הסוף. אתה יודע בדיוק מה קורה בכל שלב.', en: 'A clear and transparent process from start to finish. You know exactly what happens at each stage.' },
  'process.badge': { he: 'תהליך העבודה', en: 'Work Process' },
  
  'process.step1.title': { he: 'פגישת היכרות', en: 'Discovery Meeting' },
  'process.step2.title': { he: 'אסטרטגיה ותכנון', en: 'Strategy & Planning' },
  'process.step3.title': { he: 'פיתוח וביצוע', en: 'Development' },
  'process.step4.title': { he: 'השקה ומעקב', en: 'Launch & Monitor' },
  'process.step5.title': { he: 'צמיחה מתמשכת', en: 'Ongoing Growth' },

  // Contact
  'contact.title': { he: 'מוכנים לגדול?', en: 'Ready to Grow?' },
  'contact.titleHighlight': { he: 'בואו נעשה זאת ביחד', en: "Let's Do It Together" },
  'contact.subtitle': { 
    he: 'אל תחכו עוד. כל יום שעובר הוא יום שהתחרויות שלך מתקדמות. התקן ייעוץ חינם וראה איך אנחנו יכולים לעזור.',
    en: "Don't wait. Every day that passes is a day your competitors advance. Schedule a free consultation and see how we can help."
  },
  'contact.cta': { he: 'התקן ייעוץ חינם', en: 'Schedule Free Consultation' },
  'contact.call': { he: 'קרא עכשיו', en: 'Call Now' },

  // Footer / SmartCTA
  'smartcta.ready': { he: 'מוכן להתחיל?', en: 'Ready to start?' },
  'smartcta.talk': { he: 'בואו נדבר על הפרויקט שלך', en: "Let's talk about your project" },
  'smartcta.now': { he: 'התחל עכשיו', en: 'Start Now' },

  // Cookie Banner
  'cookies.title': { he: 'הגדרות קוקי', en: 'Cookie Settings' },
  'cookies.description': { he: 'אנחנו משתמשים בקוקיז כדי לשפר את חווית הגלישה והנתח שימוש באתר.', en: 'We use cookies to improve browsing experience and analyze site usage.' },
  'cookies.settings': { he: 'הגדרות', en: 'Settings' },
  'cookies.essential': { he: 'רק הכרחי', en: 'Essential Only' },
  'cookies.acceptAll': { he: 'קבל הכל', en: 'Accept All' },
  'cookies.save': { he: 'שמור הגדרות', en: 'Save Settings' },
  'cookies.essentialTitle': { he: 'קוקיז הכרחיים', en: 'Essential Cookies' },
  'cookies.essentialDesc': { he: 'קוקיז אלה נדרשים לכדי שהאתר יפעל כראוי', en: 'These cookies are required for the site to function properly' },
  'cookies.analyticsTitle': { he: 'קוקיז ניתוח', en: 'Analytics Cookies' },
  'cookies.analyticsDesc': { he: 'עוזרים לנו להבין כיצד מבקרים משתמשים באתר', en: 'Help us understand how visitors use the site' },
  'cookies.marketingTitle': { he: 'קוקיז שיווק', en: 'Marketing Cookies' },
  'cookies.marketingDesc': { he: 'משמשים להצגת פרסומות רלוונטיות', en: 'Used to display relevant advertisements' },

  // Misc
  'whatsapp.tooltip': { he: 'דבר איתנו עכשיו', en: 'Chat with us now' },
  'chat.greeting': { he: 'שלום! אני כאן כדי לעזור. איך אני יכול לעזור לך היום?', en: 'Hello! I\'m here to help. How can I assist you today?' },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  direction: 'rtl' | 'ltr';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('he');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang && (savedLang === 'he' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const dir = language === 'he' ? 'rtl' : 'ltr';
    
    html.setAttribute('dir', dir);
    html.setAttribute('lang', language);
    body.style.direction = dir;
    
    localStorage.setItem('language', language);
    localStorage.setItem('direction', dir);
    
    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('language-change', { detail: { language, direction: dir } }));
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  const direction = language === 'he' ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, direction }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

