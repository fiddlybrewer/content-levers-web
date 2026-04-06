import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Content Levers",
    template: "%s | Content Levers",
  },
  description:
    "Actionable SEO strategies, content frameworks, and growth insights for modern marketers.",
  metadataBase: new URL("https://contentlevers.xyz"),
  openGraph: {
    siteName: "Content Levers",
    type: "website",
  },
  other: {
    "google-site-verification": "Uzulyjj7hAImv43mYlIuwX0eKimxy7tw8dmO20Ac32s",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "w7igl3nqbg");
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-inter), var(--font-sans)" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
