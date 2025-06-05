'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Section10Team() {
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
          Our Team
        </motion.h2>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-emerald-500/30 max-w-4xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-black/30 rounded-lg">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 text-xl font-bold">FN</span>
              </div>
              <h3 className="text-emerald-400 font-bold mb-1">Farid Dihan Nahdi</h3>
              <p className="text-gray-300 text-sm">Architect & Technical Lead</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 text-xl font-bold">MIR</span>
              </div>
              <h3 className="text-emerald-400 font-bold mb-1">M. Ibrar Rasyid</h3>
              <p className="text-gray-300 text-sm">Islamic Scholarship Lead</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 text-xl font-bold">MFA</span>
              </div>
              <h3 className="text-emerald-400 font-bold mb-1">M. Fachry Alfareeza</h3>
              <p className="text-gray-300 text-sm">AI Research Lead</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 