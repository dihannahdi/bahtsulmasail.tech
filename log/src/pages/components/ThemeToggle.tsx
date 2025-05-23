import React from 'react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="fixed top-6 right-6 z-40 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden">
        {/* Sun Icon */}
        <motion.div
          animate={{
            rotate: theme === 'dark' ? 45 : 0,
            opacity: theme === 'light' ? 1 : 0,
            scale: theme === 'light' ? 1 : 0.5,
          }}
          transition={{ duration: 0.5 }}
          className="absolute text-emerald-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </motion.div>
        
        {/* Moon Icon */}
        <motion.div
          animate={{
            rotate: theme === 'light' ? -45 : 0,
            opacity: theme === 'dark' ? 1 : 0,
            scale: theme === 'dark' ? 1 : 0.5,
          }}
          transition={{ duration: 0.5 }}
          className="absolute text-emerald-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </motion.div>
      </div>
      
      {/* Background Effect */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: theme === 'light' 
            ? 'rgba(255, 255, 255, 0.2)' 
            : 'rgba(15, 23, 42, 0.3)',
          boxShadow: theme === 'light'
            ? '0 0 10px rgba(16, 185, 129, 0.3), inset 0 0 5px rgba(16, 185, 129, 0.2)'
            : '0 0 10px rgba(16, 185, 129, 0.2), inset 0 0 5px rgba(16, 185, 129, 0.1)'
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}; 