/**
 * מערכת Z-Index מרכזית - מונעת התנגשויות
 * כל הקומפוננטות משתמשות בערכים האלה
 */
export const Z_INDEX = {
  BACKGROUND: 0,
  CONTENT: 1,
  FOOTER: 50, // מתחת ל-widgets
  SMART_CTA_STICKY: 88,
  SMART_CTA_FLOATING: 89,
  WIDGETS: 90, // WhatsAppFloat, AIChatWidget
  A11Y_PANEL: 99,
  URGENCY_BAR: 100, // חלק מה-Header
  HEADER: 100,
  EXIT_INTENT: 200, // מופיע מעל Header
  MODALS: 200,
  LOADER: 10000,
} as const;

