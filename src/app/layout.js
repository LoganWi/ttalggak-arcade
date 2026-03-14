import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "딸깍아케이드 (Ttalggak Arcade) - 하이퍼캐주얼 게임 허브",
  description: "심심할 때 즐기는 가벼운 웹 게임 모음",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SX9HVL60RV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SX9HVL60RV');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
