import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface QuoteBoxProps {
  quote: string;
  source: string;
  theme: 'light' | 'dark';
  textSize: 'normal' | 'large';
}

export const QuoteBox: React.FC<QuoteBoxProps> = ({
  quote,
  source,
  theme,
  textSize,
}) => {
  return (
    <motion.div
      className={cn(
        "relative my-10 px-8 py-6 rounded-xl overflow-hidden",
        theme === 'light' 
          ? "bg-emerald-50 shadow-sm" 
          : "bg-emerald-900/20 shadow-emerald-900/10 shadow-lg"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative Quotes */}
      <div className="absolute top-4 left-4 text-6xl opacity-10 text-emerald-500 font-serif">"</div>
      <div className="absolute bottom-4 right-4 text-6xl opacity-10 text-emerald-500 font-serif transform rotate-180">"</div>
      
      {/* Pattern Background */}
      <div className="absolute inset-0 bg-[url('/pattern-islamic.svg')] bg-repeat opacity-5"></div>
      
      {/* Quote Text */}
      <motion.p
        className={cn(
          "text-center font-arabic mb-4 relative z-10 text-slate-900 dark:text-white",
          textSize === 'normal' ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
        )}
        initial={{ opacity: 0.8 }}
        whileHover={{ scale: 1.02, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {quote}
      </motion.p>
      
      {/* Source */}
      <motion.p 
        className={cn(
          "text-right text-slate-600 dark:text-slate-400 relative z-10",
          textSize === 'normal' ? "text-sm" : "text-base"
        )}
      >
        — {source}
      </motion.p>
      
      {/* Left Border Accent */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-emerald-400 to-teal-500"></div>
    </motion.div>
  );
}; 