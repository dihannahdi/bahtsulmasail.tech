import type { Metadata } from "next";
import { Inter, Playfair_Display, Amiri } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "@/components/RootLayoutClient";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Bahtsul Masail - Platform Diskusi Fiqih Islam Kontemporer',
  description: 'Platform diskusi dan kajian fiqih Islam kontemporer yang menghubungkan ulama, akademisi, dan masyarakat.',
  keywords: 'bahtsul masail, fiqih islam, hukum islam, kajian islam, ulama indonesia, diskusi syariah',
  openGraph: {
    title: 'Bahtsul Masail - Platform Diskusi Fiqih Islam Kontemporer',
    description: 'Platform diskusi dan kajian fiqih Islam kontemporer yang menghubungkan ulama, akademisi, dan masyarakat.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="id" 
      className={`${inter.variable} ${playfairDisplay.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 antialiased"
        suppressHydrationWarning
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
