import type { Metadata } from "next";
import { Inter, Heebo } from "next/font/google";
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
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${inter.variable} ${heebo.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-hebrew">{children}</body>
    </html>
  );
}
