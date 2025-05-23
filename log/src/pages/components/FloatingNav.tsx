import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingNavProps {
  activeEra: 'halaqah' | 'early' | 'modern';
  navigateToEra: (era: 'halaqah' | 'early' | 'modern') => void;
  scrollToQuiz: () => void;
  theme: 'light' | 'dark';
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  activeEra,
  navigateToEra,
  scrollToQuiz,
  theme
}) => {
  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        damping: 20,
        stiffness: 100,
        delay: 1 
      }}
    >
      <div className={cn(
        "flex items-center gap-1 px-3 py-2 rounded-full backdrop-blur-md shadow-lg",
        theme === 'light' 
          ? "bg-white/70 border border-slate-200" 
          : "bg-slate-900/70 border border-slate-700"
      )}>
        {/* Era Navigation Buttons */}
        <NavButton 
          icon="📚" 
          label="Akar" 
          isActive={activeEra === 'halaqah'} 
          onClick={() => navigateToEra('halaqah')}
          theme={theme}
        />
        
        <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
        
        <NavButton 
          icon="📜" 
          label="Awal" 
          isActive={activeEra === 'early'} 
          onClick={() => navigateToEra('early')}
          theme={theme}
        />
        
        <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
        
        <NavButton 
          icon="💻" 
          label="Modern" 
          isActive={activeEra === 'modern'} 
          onClick={() => navigateToEra('modern')}
          theme={theme}
        />
        
        <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
        
        {/* Quiz Button */}
        <NavButton 
          icon="✓" 
          label="Quiz" 
          isActive={false} 
          onClick={scrollToQuiz}
          theme={theme}
          className="bg-emerald-500/10 dark:bg-emerald-500/20"
        />
      </div>
    </motion.div>
  );
};

interface NavButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  theme: 'light' | 'dark';
  className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  icon,
  label,
  isActive,
  onClick,
  theme,
  className
}) => {
  return (
    <motion.button
      className={cn(
        "relative flex flex-col items-center justify-center px-3 py-1 rounded-full transition-colors",
        isActive 
          ? theme === 'light'
            ? "text-emerald-600 bg-emerald-50"
            : "text-emerald-400 bg-emerald-900/20"
          : theme === 'light'
            ? "text-slate-600 hover:bg-slate-100"
            : "text-slate-400 hover:bg-slate-800/50",
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-sm">{icon}</span>
      <span className="text-xs mt-1">{label}</span>
      
      {isActive && (
        <motion.div 
          className="absolute -bottom-1 left-1/2 w-1 h-1 bg-emerald-500 rounded-full"
          layoutId="navIndicator"
          transition={{ type: "spring", damping: 15 }}
        />
      )}
    </motion.button>
  );
}; 