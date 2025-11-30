# CoreSide Landing Page

דף נחיתה פשוט ב-HTML, CSS ו-JavaScript לפריסה ב-Vercel.

## 📁 מבנה הפרויקט

```
.
├── index.html      # קובץ HTML הראשי
├── styles.css      # כל הסגנונות
├── script.js       # כל הלוגיקה והאנימציות
├── vercel.json     # הגדרות Vercel
└── README.md       # קובץ זה
```

## 🚀 פריסה ל-Vercel

### דרך 1: דרך GitHub (מומלץ)

1. **צור repository ב-GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **חבר ל-Vercel:**
   - היכנס ל-[vercel.com](https://vercel.com)
   - לחץ על "New Project"
   - בחר את ה-repository שלך
   - Vercel יזהה אוטומטית את הפרויקט ויפרס אותו

### דרך 2: דרך Vercel CLI

1. **התקן Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **התחבר:**
   ```bash
   vercel login
   ```

3. **פרס:**
   ```bash
   vercel
   ```

4. **לפריסה ל-production:**
   ```bash
   vercel --prod
   ```

## 🛠️ פיתוח מקומי

### שרת פשוט עם Python:

```bash
# Python 3
python -m http.server 8000

# או Python 2
python -m SimpleHTTPServer 8000
```

### שרת עם Node.js:

```bash
npx http-server -p 8000
```

### שרת עם PHP:

```bash
php -S localhost:8000
```

ואז פתח בדפדפן: `http://localhost:8000`

## 📝 שינויים נדרשים

לפני הפריסה, ודא שאתה מעדכן:

1. **אימייל בטופס** - בקובץ `script.js`, שורה 456:
   ```javascript
   const response = await fetch('https://formsubmit.co/ajax/YOUR_EMAIL@example.com', {
   ```

2. **אימייל ב-HTML** - בקובץ `index.html`, חפש `info@bengueta.com` והחלף

3. **מספר טלפון** - חפש `058-696-6886` והחלף

4. **קישורי WhatsApp** - חפש `wa.me/972586966886` והחלף

## 🎨 תכונות

- ✅ עיצוב רספונסיבי מלא
- ✅ תמיכה בנגישות (WCAG 2.1 AA)
- ✅ מצב כהה/בהיר
- ✅ אנימציות עם GSAP
- ✅ טופס יצירת קשר
- ✅ טיימר ספירה לאחור
- ✅ תמיכה בעברית (RTL)

## 📦 תלויות חיצוניות

הפרויקט משתמש ב:
- **GSAP** - ספריית אנימציות (מוטענת מ-CDN)
- **Google Fonts** - גופנים (Heebo, Inter)

## 🔧 התאמה אישית

### שינוי צבעים:
ערוך את המשתנים ב-`styles.css`:
```css
:root {
    --accent-purple: #a855f7;
    --accent-blue: #3b82f6;
    /* ... */
}
```

### שינוי תאריך הספירה לאחור:
ערוך את `script.js`:
```javascript
const CONFIG = {
    countdownEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    // 14 ימים מהיום
};
```

## 📄 רישיון

כל הזכויות שמורות © 2024 CoreSide

## 🆘 תמיכה

לשאלות או בעיות, צור קשר:
- אימייל: info@bengueta.com
- WhatsApp: 058-696-6886

