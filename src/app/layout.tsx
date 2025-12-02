import type { Metadata } from "next";
import { Inter, Heebo } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { I18nProvider } from "@/lib/i18n";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const heebo = Heebo({ 
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CoreSide | שותפות טכנולוגית, לא עסקת פיתוח",
  description: "שותפות טכנולוגית עם skin in the game אמיתי. אנחנו מרוויחים רק אם אתה מרוויח. 0₪ מראש.",
};

export const viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${inter.variable} ${heebo.variable}`} style={{ backgroundColor: '#09090b' }}>
      <head>
        <meta name="theme-color" content="#09090b" />
        <meta name="msapplication-navbutton-color" content="#09090b" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-hebrew dark-theme" style={{ backgroundColor: '#09090b' }}>
        <I18nProvider>
          {children}
          <div id="google_translate_element" className="hidden" aria-hidden="true" />
        </I18nProvider>
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              if (!window.google?.translate) return;
              new window.google.translate.TranslateElement(
                {pageLanguage: 'he', includedLanguages: 'he,en', autoDisplay: false},
                'google_translate_element'
              );
              window.dispatchEvent(new CustomEvent('google-translate-ready'));
            }
            window.googleTranslateElementInit = googleTranslateElementInit;
          `}
        </Script>
        <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
        <SpeedInsights />
      </body>
    </html>
  );
}
