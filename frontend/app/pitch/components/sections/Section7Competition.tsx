'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const competitors = [
  { name: 'Traditional Libraries', features: { 'Digital Access': false, 'Semantic Search': false, 'Collaboration': false, 'AI Analysis': false } },
  { name: 'General PDF Databases', features: { 'Digital Access': true, 'Semantic Search': false, 'Collaboration': false, 'AI Analysis': false } },
  { name: 'Maktaba Shamela', features: { 'Digital Access': true, 'Semantic Search': true, 'Collaboration': false, 'AI Analysis': false } },
  { name: 'BahtsulMasail.tech', features: { 'Digital Access': true, 'Semantic Search': true, 'Collaboration': true, 'AI Analysis': true } },
];

export default function Section7Competition() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="w-full max-w-7xl mx-auto px-6"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Competitive Landscape</h2>
        <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
          While others offer pieces of the puzzle, we are the only platform that provides an end-to-end, AI-powered ecosystem for Islamic jurisprudence.
        </p>
      </motion.div>

      {/* Competition Table */}
      <motion.div variants={itemVariants} className="bg-black/30 backdrop-blur-md rounded-xl border border-emerald-900/50 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-emerald-800/50">
              <th className="p-4 text-lg font-semibold text-white">Feature</th>
              {competitors.map(c => <th key={c.name} className={`p-4 text-center font-semibold ${c.name.includes('Bahtsul') ? 'text-emerald-400' : 'text-white'}`}>{c.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {['Digital Access', 'Semantic Search', 'Collaboration', 'AI Analysis'].map(feature => (
              <tr key={feature} className="border-b border-emerald-900/50 last:border-none">
                <td className="p-4 font-medium text-gray-300">{feature}</td>
                {competitors.map(c => (
                  <td key={c.name} className="p-4 text-center">
                    {c.features[feature as keyof typeof c.features] ? <Check className="mx-auto text-emerald-500" /> : <X className="mx-auto text-red-500" />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Defensible Moat */}
      <motion.div variants={itemVariants} className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Our Defensible Moat</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-black/40 rounded-lg border border-emerald-800/60">
            <h4 className="text-xl font-semibold text-emerald-400 mb-2">Proprietary AI Models</h4>
            <p className="text-gray-300">Trained specifically on classical Arabic and pesantren-specific terminologies.</p>
          </div>
          <div className="p-6 bg-black/40 rounded-lg border border-emerald-800/60">
            <h4 className="text-xl font-semibold text-emerald-400 mb-2">Exclusive Partnerships</h4>
            <p className="text-gray-300">Strong ties with leading pesantren provide unique access to invaluable texts.</p>
          </div>
          <div className="p-6 bg-black/40 rounded-lg border border-emerald-800/60">
            <h4 className="text-xl font-semibold text-emerald-400 mb-2">Network Effects</h4>
            <p className="text-gray-300">The platform becomes more valuable as more scholars and texts join the ecosystem.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 