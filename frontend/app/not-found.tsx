'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div 
        className="absolute inset-0 bg-pattern opacity-5"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      />
      
      {/* Emerald Light Effects */}
      <div className="absolute inset-0">
        <div className="bg-blur-circle-green top-1/4 left-1/4" />
        <div className="bg-blur-circle-blue top-3/4 right-1/4" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="text-center relative z-10">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-9xl font-serif font-bold text-gradient-title mb-8">
              404
            </h1>
            <div className="absolute inset-0 bg-emerald-gradient opacity-20 blur-3xl" />
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-gradient-title">
              A Page Unwritten
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              It seems the wisdom you seek has taken an unexpected turn, or the page you were looking for is not currently illuminated. The digital currents may have shifted, or this particular codex is still being transcribed.
            </p>
          </motion.div>

          {/* Interactive Fragment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-24 h-24 mx-auto mb-8"
          >
            <div className="absolute inset-0 bg-emerald-gradient rounded-full opacity-20 animate-emerald-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-primary rounded-full animate-spin-slow" />
            </div>
          </motion.div>

          {/* Navigation Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4"
          >
            <Link 
              href="/"
              className="btn-islamic-primary px-8 py-3 inline-block"
            >
              Return to the Main Archive
            </Link>

            <div className="mt-8 space-y-2">
              <p className="text-muted-foreground">Perhaps you were looking for:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/search" className="link-emerald hover:underline">
                  Search
                </Link>
                <Link href="/about" className="link-emerald hover:underline">
                  About Us
                </Link>
                <Link href="/faq" className="link-emerald hover:underline">
                  FAQ
                </Link>
              </div>
            </div>

            {/* Mini Search */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search the archives..."
                  className="w-full px-4 py-2 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary/50" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 