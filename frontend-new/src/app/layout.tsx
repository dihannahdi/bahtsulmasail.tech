import React from 'react'
import type { Metadata } from 'next'
import { Inter, Playfair_Display, Amiri } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const amiri = Amiri({ 
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-amiri',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BahtsulMasail.tech - Islam Digdaya',
  description: 'Empowering Islamic legal reasoning through sophisticated intellectualism and clarity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable} ${amiri.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {children}
      </body>
    </html>
  )
} 