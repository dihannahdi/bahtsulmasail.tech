import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  id: string;
  title: string;
  content: string;
  expandedContent: string;
  icon: string;
  isExpanded: boolean;
  onToggle: () => void;
  onLearnMore: () => void;
  theme: 'light' | 'dark';
  textSize: 'normal' | 'large';
}

export const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  content,
  expandedContent,
  icon,
  isExpanded,
  onToggle,
  onLearnMore,
  theme,
  textSize,
}) => {
  return (
    <motion.div
      layout
      className={cn(
        "mb-8 rounded-xl overflow-hidden transition-all duration-300",
        theme === 'light' ? 'bg-white shadow-lg' : 'bg-slate-800/50 shadow-lg shadow-emerald-900/5',
        "border border-transparent hover:border-emerald-200 dark:hover:border-emerald-900"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon with Animation */}
          <motion.div 
            className={cn(
              "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl",
              "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
            )}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          
          <div className="flex-1">
            {/* Title with Animation */}
            <motion.h3 
              className={cn(
                "font-serif mb-3 text-slate-900 dark:text-white",
                textSize === 'normal' ? "text-xl" : "text-2xl"
              )}
              layout="position"
              id={`${id}-title`}
            >
              {title}
            </motion.h3>
            
            {/* Main Content */}
            <motion.p 
              className={cn(
                "mb-4 text-slate-600 dark:text-slate-300",
                textSize === 'normal' ? "text-base" : "text-lg"
              )}
              layout="position"
            >
              {content}
            </motion.p>
            
            {/* Expanded Content with Animation */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "p-4 rounded-lg mb-4 text-slate-700 dark:text-slate-300 bg-emerald-50 dark:bg-emerald-900/20",
                    textSize === 'normal' ? "text-sm" : "text-base"
                  )}
                  id={`${id}-expanded`}
                >
                  {expandedContent}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "text-emerald-600 dark:text-emerald-400 font-medium flex items-center",
                  "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg px-3 py-1",
                  textSize === 'normal' ? "text-sm" : "text-base"
                )}
                onClick={onLearnMore}
                aria-label={`Learn more about ${title}`}
              >
                <span>Selengkapnya</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex items-center text-slate-500 dark:text-slate-400",
                  "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg px-3 py-1",
                  textSize === 'normal' ? "text-xs" : "text-sm"
                )}
                onClick={onToggle}
                aria-expanded={isExpanded}
                aria-controls={`${id}-expanded`}
              >
                <span>{isExpanded ? "Sembunyikan" : "Detail"}</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </motion.svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Card Bottom Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-500"></div>
    </motion.div>
  );
}; 