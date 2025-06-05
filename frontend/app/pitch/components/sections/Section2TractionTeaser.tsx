'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Section2TractionTeaser() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-6xl mx-auto px-6"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center text-center">
        {/* Section Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">Initial Momentum</h2>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        </motion.div>
        
        {/* Key Traction Metric */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          className="mb-16 bg-black/40 backdrop-blur-md p-10 rounded-xl border border-emerald-500/30"
        >
          <div className="mb-6">
            <span className="text-5xl md:text-7xl font-bold text-emerald-400">10,000+</span>
          </div>
          <p className="text-xl md:text-2xl text-gray-200">
            scholarly texts digitized from partner pesantren
          </p>
          <div className="w-full h-4 bg-black/60 rounded-full mt-6 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-700 to-emerald-400"
              initial={{ width: "0%" }}
              animate={inView ? { width: "70%" } : { width: "0%" }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
          </div>
          <div className="mt-2 text-xs text-emerald-300 text-right">70% of Phase 1 goal completed</div>
        </motion.div>
        
        {/* Additional Highlight */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">
            Our Semantic Search MVP demonstrates <span className="text-emerald-400 font-bold">90%</span> relevance in initial testing.
          </p>
          <div className="mt-8">
            <p className="text-lg md:text-xl text-emerald-300 font-medium">
              This is why BahtsulMasail.tech is poised to redefine Islamic scholarship.
            </p>
          </div>
        </motion.div>
        
        {/* Animated Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="w-full mt-12"
        >
          <div className="h-48 md:h-64 w-full flex items-end justify-between gap-2 md:gap-4">
            {[30, 45, 58, 65, 73, 90].map((height, index) => (
              <motion.div
                key={index}
                className="h-full flex-1 flex flex-col justify-end"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + (index * 0.1) }}
              >
                <motion.div 
                  className="bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md relative overflow-hidden flex justify-center"
                  initial={{ height: "0%" }}
                  animate={inView ? { height: `${height}%` } : { height: "0%" }}
                  transition={{ duration: 1, delay: 1.4 + (index * 0.1) }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10"></div>
                  <div className="absolute bottom-2 text-xs font-medium">
                    {height}%
                  </div>
                </motion.div>
                <div className="text-xs md:text-sm mt-2 text-gray-400">
                  {['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'][index]}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 text-sm text-center text-gray-400">6-Month Growth in Semantic Search Accuracy</div>
        </motion.div>
      </div>
    </motion.div>
  );
} 