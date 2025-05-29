import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "@/components/RootLayoutClient";

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
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
