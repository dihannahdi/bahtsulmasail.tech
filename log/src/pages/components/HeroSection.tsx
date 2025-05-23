import React, { forwardRef } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  textSize: 'normal' | 'large';
  scrollToContent: () => void;
  bgOpacity: MotionValue<number>;
  titleScale: MotionValue<number>;
}

export const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ textSize, scrollToContent, bgOpacity, titleScale }, ref) => {
    return (
      <motion.div 
        ref={ref}
        className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/30 dark:to-teal-800/30"
            style={{ opacity: bgOpacity }}
          />
          
          {/* Decorative Elements */}
          <motion.div 
            className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-emerald-500/20 dark:bg-emerald-500/10 blur-3xl"
            animate={{ 
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          
          <motion.div 
            className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-teal-500/20 dark:bg-teal-500/10 blur-3xl"
            animate={{ 
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{ 
              duration: 18, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          
          {/* Islamic Pattern Overlay */}
          <motion.div 
            className="absolute inset-0 bg-[url('/pattern-islamic.svg')] bg-repeat opacity-5 dark:opacity-10"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.05, 0.08, 0.05]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div 
            className="max-w-4xl mx-auto"
            style={{ scale: titleScale }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative inline-block mb-6"
            >
              <h1 className={cn(
                "font-serif font-bold text-slate-900 dark:text-white",
                textSize === 'normal' ? "text-5xl md:text-7xl" : "text-6xl md:text-8xl"
              )}>
                Sejarah <span className="relative">
                  <span className="relative z-10">Bahtsul Masail</span>
                  <span className="absolute -bottom-2 left-0 right-0 h-4 bg-emerald-400/30 dark:bg-emerald-400/20 -rotate-1 z-0"></span>
                </span>
              </h1>
              
              {/* Decorative Embellishment */}
              <motion.span 
                className="absolute -top-8 -right-8 text-6xl text-emerald-500/30 dark:text-emerald-400/20 font-arabic"
                animate={{
                  rotate: [0, 5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                ٱلْعِلْمُ
              </motion.span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "font-arabic mb-8 text-slate-700 dark:text-slate-300",
                textSize === 'normal' ? "text-xl md:text-3xl" : "text-2xl md:text-4xl"
              )}
            >
              Akar Intelektual & Perkembangannya dalam NU
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "mb-12 text-slate-500 dark:text-slate-400 inline-block relative",
                textSize === 'normal' ? "text-lg" : "text-xl"
              )}
            >
              <span className="px-2 py-1 relative z-10">
                Intelektual – Kontekstual – Institusional
              </span>
              <span className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-md -rotate-1 z-0"></span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-emerald-600 dark:bg-emerald-500 text-white rounded-xl shadow-lg relative overflow-hidden group"
                onClick={scrollToContent}
                aria-label="Jelajahi Sejarah Bahtsul Masail"
              >
                {/* Button background animation */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                
                <span className="relative z-10 flex items-center">
                  <span className={cn(
                    "font-medium", 
                    textSize === 'normal' ? "text-base" : "text-lg"
                  )}>
                    Jelajahi Sejarah
                  </span>
                  <motion.span 
                    className="inline-block ml-2"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ↓
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Decorative scrolling Arabic text */}
          <div className="absolute bottom-10 left-0 right-0 overflow-hidden">
            <motion.div 
              className="flex space-x-8 text-emerald-800/10 dark:text-emerald-200/10 text-5xl font-arabic whitespace-nowrap"
              animate={{ x: [0, '-50%'] }}
              transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
            >
              <span>البحث المسائل</span>
              <span>نهضة العلماء</span>
              <span>الفقه الإسلامي</span>
              <span>العلم والعمل</span>
              <span>البحث المسائل</span>
              <span>نهضة العلماء</span>
              <span>الفقه الإسلامي</span>
              <span>العلم والعمل</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }
);

HeroSection.displayName = 'HeroSection'; 