"use client";

import React from 'react';
import { ThemeProvider } from "next-themes";
import { Inter, Playfair_Display, Amiri } from "next/font/google";
import NextAuthProvider from "@/components/auth/NextAuthProvider";
import QueryProvider from "@/components/providers/QueryProvider";
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
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NextAuthProvider>
        <QueryProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </QueryProvider>
      </NextAuthProvider>
    </ThemeProvider>
  );
};

export default RootLayoutClient; 