'use client';

import { motion } from 'framer-motion';

interface PitchHeaderProps {
  activeSection: number;
  goToSection: (index: number) => void;
  sectionCount: number;
}

export default function PitchHeader({ activeSection, goToSection, sectionCount }: PitchHeaderProps) {
  const sectionTitles = [
    'What We Do',
    'Traction Teaser',
    'Problem',
    'Solution',
    'Traction',
    'Market',
    'Competition',
    'Insights',
    'Vision',
    'Team',
    'Funding',
    'Contact'
  ];
  
  return (
    <motion.header 
      className="fixed top-0 left-0 w-full z-50 py-4 px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          onClick={() => goToSection(0)}
        >
          <div className="text-emerald-500 font-bold text-2xl cursor-pointer">
            BahtsulMasail.tech
          </div>
        </motion.div>
        
        {/* Navigation Dots */}
        <div className="hidden md:flex items-center space-x-1">
          {Array.from({ length: sectionCount }).map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                activeSection === index ? 'bg-emerald-400 scale-150' : 'bg-gray-500 hover:bg-emerald-300'
              }`}
              onClick={() => goToSection(index)}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              title={sectionTitles[index]}
            />
          ))}
        </div>
        
        {/* Current Section Title */}
        <motion.div 
          className="text-emerald-400 text-sm md:text-base font-medium"
          key={activeSection} // Force animation on section change
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {sectionTitles[activeSection]}
        </motion.div>
        
        {/* Navigation Arrows */}
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full bg-black/50 border border-emerald-500/30 ${
              activeSection === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer'
            }`}
            onClick={() => activeSection > 0 && goToSection(activeSection - 1)}
            disabled={activeSection === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full bg-black/50 border border-emerald-500/30 ${
              activeSection === sectionCount - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 cursor-pointer'
            }`}
            onClick={() => activeSection < sectionCount - 1 && goToSection(activeSection + 1)}
            disabled={activeSection === sectionCount - 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
} 