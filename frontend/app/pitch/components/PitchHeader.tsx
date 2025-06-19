'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, PauseIcon, HomeIcon } from '@heroicons/react/24/outline';

interface PitchHeaderProps {
  activeSection: number;
  goToSection: (index: number) => void;
  sectionCount: number;
}

const sectionTitles = [
  { title: 'The Vision', icon: '🎯', subtitle: 'Revolutionary Islamic Research Platform' },
  { title: 'Momentum', icon: '🚀', subtitle: 'Explosive Growth & Traction' },
  { title: 'The Problem', icon: '⚡', subtitle: 'Massive Gap in Islamic Knowledge Access' },
  { title: 'Our Solution', icon: '💡', subtitle: 'AI-Powered Research Revolution' },
  { title: 'Deep Traction', icon: '📈', subtitle: 'Proven Market Validation' },
  { title: 'Market Size', icon: '🌍', subtitle: '$50B+ Global Islamic Education Market' },
  { title: 'Competition', icon: '⚔️', subtitle: 'Unique Positioning & Advantages' },
  { title: 'Insights', icon: '🧠', subtitle: 'Proprietary Knowledge & IP' },
  { title: 'Future Vision', icon: '🔮', subtitle: 'Global Islamic Tech Leadership' },
  { title: 'Team', icon: '👥', subtitle: 'World-Class Expertise' },
  { title: 'Investment', icon: '💰', subtitle: '$1.5M for Global Expansion' },
  { title: 'Contact', icon: '🤝', subtitle: 'Join Our Revolutionary Journey' },
];

export default function PitchHeader({ activeSection, goToSection, sectionCount }: PitchHeaderProps) {
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      if (activeSection < sectionCount - 1) {
        goToSection(activeSection + 1);
      } else {
        setIsAutoPlay(false); // Stop at end
      }
    }, 8000); // 8 seconds per section

    return () => clearInterval(interval);
  }, [isAutoPlay, activeSection, sectionCount, goToSection]);

  const progress = ((activeSection + 1) / sectionCount) * 100;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-emerald-500/20"
    >
      {/* Main progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 relative overflow-hidden"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="relative">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center relative overflow-hidden"
                animate={{ 
                  boxShadow: [
                    '0 0 10px rgba(16, 185, 129, 0.3)',
                    '0 0 20px rgba(16, 185, 129, 0.6)',
                    '0 0 10px rgba(16, 185, 129, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white font-bold text-lg">BM</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">BahtsulMasail.tech</h1>
              <motion.p 
                className="text-emerald-300 text-sm"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Pitch Presentation
              </motion.p>
            </div>
          </motion.div>

          {/* Current section info */}
          <motion.div 
            className="hidden md:flex items-center space-x-6 bg-black/50 rounded-xl p-4 border border-emerald-500/30"
            key={activeSection}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">{sectionTitles[activeSection]?.icon}</div>
              <div className="text-xs text-gray-400">Section {activeSection + 1}</div>
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">
                {sectionTitles[activeSection]?.title}
              </h2>
              <p className="text-emerald-300 text-sm">
                {sectionTitles[activeSection]?.subtitle}
              </p>
            </div>
          </motion.div>

          {/* Navigation controls */}
          <div className="flex items-center space-x-2">
            {/* Mini-map toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMiniMap(!showMiniMap)}
              className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-all duration-300 border border-emerald-500/30"
            >
              <HomeIcon className="w-5 h-5" />
            </motion.button>

            {/* Auto-play toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`p-2 rounded-lg transition-all duration-300 border ${
                isAutoPlay 
                  ? 'bg-emerald-500/30 text-emerald-300 border-emerald-500/50' 
                  : 'bg-gray-500/20 text-gray-300 border-gray-500/30 hover:bg-gray-500/30'
              }`}
            >
              {isAutoPlay ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
            </motion.button>

            {/* Previous button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => activeSection > 0 && goToSection(activeSection - 1)}
              disabled={activeSection === 0}
              className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500/30"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </motion.button>

            {/* Section counter */}
            <div className="bg-black/50 px-4 py-2 rounded-lg border border-emerald-500/30">
              <span className="text-emerald-300 font-mono">
                {String(activeSection + 1).padStart(2, '0')} / {String(sectionCount).padStart(2, '0')}
              </span>
            </div>

            {/* Next button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => activeSection < sectionCount - 1 && goToSection(activeSection + 1)}
              disabled={activeSection === sectionCount - 1}
              className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500/30"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mini-map overlay */}
      <AnimatePresence>
        {showMiniMap && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-emerald-500/20 p-6"
          >
            <div className="container mx-auto">
              <h3 className="text-white font-bold text-lg mb-4 text-center">Presentation Navigation</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {sectionTitles.map((section, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setHoveredSection(index)}
                    onHoverEnd={() => setHoveredSection(null)}
                    onClick={() => {
                      goToSection(index);
                      setShowMiniMap(false);
                    }}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                      index === activeSection
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                        : index < activeSection
                        ? 'bg-green-500/10 border-green-500/30 text-green-300'
                        : 'bg-gray-500/10 border-gray-500/30 text-gray-300 hover:border-emerald-500/50'
                    }`}
                  >
                    {/* Progress indicator for completed sections */}
                    {index < activeSection && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="absolute top-0 left-0 h-1 bg-green-400"
                      />
                    )}
                    
                    {/* Current section indicator */}
                    {index === activeSection && (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute top-0 left-0 h-1 bg-emerald-400 w-full"
                      />
                    )}

                    <div className="text-2xl mb-2">{section.icon}</div>
                    <div className="text-sm font-medium">{section.title}</div>
                    <div className="text-xs opacity-70 mt-1">{index + 1}</div>

                    {/* Hover tooltip */}
                    <AnimatePresence>
                      {hoveredSection === index && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-xs text-white px-2 py-1 rounded whitespace-nowrap z-50 border border-emerald-500/30"
                        >
                          {section.subtitle}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating indicators for mobile */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="bg-black/80 backdrop-blur-md rounded-xl p-3 border border-emerald-500/30 flex items-center justify-between">
          <button
            onClick={() => activeSection > 0 && goToSection(activeSection - 1)}
            disabled={activeSection === 0}
            className="p-2 rounded-lg bg-blue-500/20 text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
          
          <div className="flex-1 mx-4">
            <div className="text-center text-white text-sm font-medium">
              {sectionTitles[activeSection]?.title}
            </div>
            <div className="text-xs text-emerald-300 text-center">
              {activeSection + 1} / {sectionCount}
            </div>
          </div>
          
          <button
            onClick={() => activeSection < sectionCount - 1 && goToSection(activeSection + 1)}
            disabled={activeSection === sectionCount - 1}
            className="p-2 rounded-lg bg-blue-500/20 text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.header>
  );
} 