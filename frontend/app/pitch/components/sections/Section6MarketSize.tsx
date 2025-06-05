'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Section6MarketSize() {
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
      <div className="text-center">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Market Size
        </motion.h2>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-emerald-500/30 max-w-4xl mx-auto mb-12"
        >
          <p className="text-gray-300 text-lg">
            Detailed market size analysis with interactive visualizations showing TAM, SAM, and SOM calculations would be displayed here.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
} 