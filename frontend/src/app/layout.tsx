import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
// import { Geist, Geist_Mono } from "next/font/google"; // Comment out or remove if Geist not used elsewhere
import "./globals.css";
// import Navbar from "@/components/layout/Navbar"; // Navbar is now rendered by MainLayout
import NextAuthProvider from "@/components/auth/NextAuthProvider";
import MainLayout from "@/components/layout/MainLayout"; // Import MainLayout

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "BahtsulMasail.tech - Islamic Insight Nexus",
  description: "Platform komprehensif untuk menjelajahi teks-teks hukum Islam dengan kemampuan pencarian lanjutan dan alat analisis modern.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
      </body>
    </html>
  );
}
