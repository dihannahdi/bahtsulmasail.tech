'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Section11Funding() {
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
          Use of Funds & The Ask
        </motion.h2>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-emerald-500/30 max-w-4xl mx-auto mb-12"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">100 Juta Rupiah</h3>
            <p className="text-gray-300 text-lg">
              To achieve the following milestones within 18-24 months:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-black/30 rounded-lg border border-emerald-900/50">
              <h4 className="text-emerald-300 font-semibold mb-2">Content Digitization</h4>
              <p className="text-gray-300">50,000+ core texts from partner pesantren digitized and processed</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg border border-emerald-900/50">
              <h4 className="text-emerald-300 font-semibold mb-2">Platform Launch</h4>
              <p className="text-gray-300">V2 platform with advanced AI-driven semantic search and collaborative features</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg border border-emerald-900/50">
              <h4 className="text-emerald-300 font-semibold mb-2">Partnerships</h4>
              <p className="text-gray-300">20+ institutional partnerships with universities and research centers</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg border border-emerald-900/50">
              <h4 className="text-emerald-300 font-semibold mb-2">Revenue</h4>
              <p className="text-gray-300">$250K MRR from premium subscriptions and institutional licenses</p>
            </div>
          </div>
          
          <p className="text-emerald-400 text-xl font-semibold">
            Will you invest in BahtsulMasail.tech to help us achieve these milestones and co-author the future of Islamic scholarship?
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
} 