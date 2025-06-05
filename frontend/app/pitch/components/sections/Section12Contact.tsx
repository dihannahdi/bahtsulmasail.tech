'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Section12Contact() {
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
          Contact & Next Steps
        </motion.h2>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-emerald-500/30 max-w-4xl mx-auto mb-12"
        >
          <div className="max-w-md mx-auto">
            <p className="text-gray-300 text-lg mb-8">
              We're excited to discuss how we're building the future of Islamic scholarship together.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="p-4 bg-black/30 rounded-lg border border-emerald-900/50 flex items-center justify-between">
                <span className="text-emerald-300">Email</span>
                <span className="text-white">contact@bahtsulmasail.tech</span>
              </div>
              
              <div className="p-4 bg-black/30 rounded-lg border border-emerald-900/50 flex items-center justify-between">
                <span className="text-emerald-300">Phone</span>
                <span className="text-white">+62 812 3456 7890</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-600 hover:to-emerald-400 text-white py-4 px-6 rounded-md font-medium flex items-center justify-center transition-all duration-300"
              >
                Schedule a Meeting
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 