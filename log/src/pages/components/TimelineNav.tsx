import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface TimelineNavProps {
  activeEra: 'halaqah' | 'early' | 'modern';
  navigateToEra: (era: 'halaqah' | 'early' | 'modern') => void;
  theme: 'light' | 'dark';
}

export const TimelineNav = forwardRef<HTMLDivElement, TimelineNavProps>(
  ({ activeEra, navigateToEra, theme }, ref) => {
    return (
      <motion.div 
        ref={ref}
        className="sticky top-16 z-30 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="relative max-w-4xl mx-auto">
            {/* Background with blur effect */}
            <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl"></div>
            
            {/* Timeline Container */}
            <div className="relative z-10 flex items-center justify-between p-3">
              {/* Timeline Nodes */}
              <TimelineNode 
                era="halaqah"
                label="Halaqah Global"
                isActive={activeEra === 'halaqah'}
                onClick={() => navigateToEra('halaqah')}
                theme={theme}
              />
              
              {/* Connect Line 1 */}
              <motion.div 
                className="h-1 flex-1 mx-2 rounded-full overflow-hidden"
                style={{
                  background: theme === 'light' 
                    ? 'linear-gradient(to right, #10b981, #d1d5db)' 
                    : 'linear-gradient(to right, #10b981, #334155)'
                }}
              >
                <motion.div 
                  className="h-full bg-emerald-200 dark:bg-slate-700"
                  initial={{ width: activeEra === 'halaqah' ? '0%' : '100%' }}
                  animate={{ width: activeEra === 'halaqah' ? '0%' : '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
              
              <TimelineNode 
                era="early"
                label="Awal NU (1926–1989)"
                isActive={activeEra === 'early'}
                onClick={() => navigateToEra('early')}
                theme={theme}
              />
              
              {/* Connect Line 2 */}
              <motion.div 
                className="h-1 flex-1 mx-2 rounded-full overflow-hidden"
                style={{
                  background: theme === 'light' 
                    ? 'linear-gradient(to right, #d1d5db, #10b981)' 
                    : 'linear-gradient(to right, #334155, #10b981)'
                }}
              >
                <motion.div 
                  className="h-full bg-emerald-200 dark:bg-slate-700"
                  initial={{ width: activeEra === 'modern' ? '0%' : '100%' }}
                  animate={{ width: activeEra === 'modern' ? '0%' : '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
              
              <TimelineNode 
                era="modern"
                label="Reformasi & Modern"
                isActive={activeEra === 'modern'}
                onClick={() => navigateToEra('modern')}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

interface TimelineNodeProps {
  era: 'halaqah' | 'early' | 'modern';
  label: string;
  isActive: boolean;
  onClick: () => void;
  theme: 'light' | 'dark';
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ 
  era, label, isActive, onClick, theme 
}) => {
  return (
    <div className="flex flex-col items-center relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-full"
        aria-label={`Navigate to ${label}`}
      >
        {/* Node */}
        <motion.div 
          className={`w-5 h-5 rounded-full flex items-center justify-center ${
            isActive 
              ? 'bg-emerald-500' 
              : theme === 'light' ? 'bg-slate-300' : 'bg-slate-600'
          }`}
          animate={{ 
            scale: isActive ? [1, 1.2, 1] : 1,
            boxShadow: isActive 
              ? ['0 0 0 0 rgba(16, 185, 129, 0)', '0 0 0 10px rgba(16, 185, 129, 0.2)', '0 0 0 0 rgba(16, 185, 129, 0)']
              : '0 0 0 0 rgba(16, 185, 129, 0)'
          }}
          transition={{ 
            duration: isActive ? 2 : 0.3,
            repeat: isActive ? Infinity : 0,
            repeatDelay: 1
          }}
        >
          {isActive && (
            <motion.div 
              className="w-2 h-2 rounded-full bg-white"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
        
        {/* Label */}
        <motion.div 
          className={`mt-2 text-center text-xs sm:text-sm font-medium px-1 py-0.5 rounded ${
            isActive 
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
              : 'text-slate-600 dark:text-slate-400'
          }`}
          animate={{ 
            y: isActive ? [0, -2, 0] : 0,
          }}
          transition={{ 
            duration: 1.5,
            repeat: isActive ? Infinity : 0,
            repeatDelay: 1
          }}
        >
          {label}
        </motion.div>
      </motion.button>
    </div>
  );
};

TimelineNav.displayName = 'TimelineNav'; 