import React from 'react';
import type { Metadata } from "next";
<<<<<<< HEAD
import { ThemeProvider } from "next-themes";
// import { Geist, Geist_Mono } from "next/font/google"; // Comment out or remove if Geist not used elsewhere
=======
import { Inter, Playfair_Display, Amiri } from "next/font/google";
>>>>>>> temp-work
import "./globals.css";
// import Navbar from "@/components/layout/Navbar"; // Navbar is now rendered by MainLayout
import NextAuthProvider from "@/components/auth/NextAuthProvider";
import MainLayout from "@/components/layout/MainLayout"; // Import MainLayout

<<<<<<< HEAD
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "BahtsulMasail.tech | Bahtsul Masail untuk Islam Digdaya",
  description: "Platform komprehensif untuk menjelajahi teks-teks hukum Islam dengan kemampuan pencarian lanjutan dan alat analisis modern.",
  openGraph: {
    title: "BahtsulMasail.tech",
    description: "Platform untuk teks hukum Islam dan analisis modern.",
    url: "https://www.bahtsulmasail.tech",
    siteName: "BahtsulMasail.tech",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BahtsulMasail.tech - Bahtsul Masail untuk Islam Digdaya",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BahtsulMasail.tech",
    description: "Platform untuk teks hukum Islam dan analisis modern.",
    images: ["/og-image.png"],
  },
=======
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
  title: "BahtsulMasail.tech - Islam Digdaya",
  description: "Empowering Islamic legal reasoning through sophisticated intellectualism and clarity",
>>>>>>> temp-work
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
<<<<<<< HEAD
    <html lang="id" suppressHydrationWarning>
      {/* Add a class here if you want to set a default theme, e.g., class="light" or class="dark" */}
      {/* For now, it will rely on prefers-color-scheme or manual toggling via dev tools */}
      <body className={"antialiased"}>
        {/* Ensure body has some base classes for font, bg, text from globals.css */}
        {/* Tailwind applies these via @layer base, so direct className might not be needed if font-family is set in globals.css body */}
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <MainLayout>
              {children} 
            </MainLayout>
          </NextAuthProvider>
        </ThemeProvider>
=======
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable} ${amiri.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50" suppressHydrationWarning={true}>
        {children}
>>>>>>> temp-work
      </body>
    </html>
  );
};

export default RootLayout;
