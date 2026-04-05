import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-inter), var(--font-sans)" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
