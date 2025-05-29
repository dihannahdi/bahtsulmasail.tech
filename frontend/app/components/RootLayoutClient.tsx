"use client";

import React from 'react';
import { ThemeProvider } from "next-themes";
import { Inter, Playfair_Display, Amiri } from "next/font/google";
import NextAuthProvider from "@/components/auth/NextAuthProvider";
import MainLayout from "@/components/layout/MainLayout";

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

interface RootLayoutClientProps {
  children: React.ReactNode;
}

const RootLayoutClient: React.FC<RootLayoutClientProps> = ({ children }) => {
  return (
    <html 
      lang="id" 
      className={`${inter.variable} ${playfairDisplay.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body 
        className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 antialiased"
        suppressHydrationWarning
      >
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
      </body>
    </html>
  );
};

export default RootLayoutClient; 