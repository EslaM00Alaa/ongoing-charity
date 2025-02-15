import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-noto-sans-arabic",
});

export const metadata: Metadata = {
  title: "صدقة جارية عن روح المرحوم محمد صالح بكر",
  description: "موقع صدقة جارية عن روح المرحوم محمد صالح بكر، يحتوي على الخير والعلم النافع ليكون نورًا وصدقة جارية، نسأل الله أن يجعلها في ميزان حسناته وحسنات جميع أموات المسلمين.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className={`${notoSansArabic.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
