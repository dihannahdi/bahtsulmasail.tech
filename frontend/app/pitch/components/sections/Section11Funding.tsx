'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PieChart, Target, Rocket, DollarSign } from 'lucide-react';

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

const fundingBreakdown = [
  { name: 'R&D (AI Models)', percentage: 40, color: 'text-emerald-400' },
  { name: 'Platform Development', percentage: 30, color: 'text-green-400' },
  { name: 'Partnerships & Content Acquisition', percentage: 20, color: 'text-teal-400' },
  { name: 'Marketing & Sales', percentage: 10, color: 'text-cyan-400' },
];

export default function Section11Funding() {
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
        <h2 className="text-3xl md:text-4xl font-bold text-white">The Ask & Use of Funds</h2>
        <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
          We are seeking strategic investment to accelerate our growth and solidify our position as the market leader.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* The Ask */}
        <motion.div variants={itemVariants} className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-emerald-700/50 text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">We are raising:</h3>
          <div className="text-6xl font-bold text-emerald-400 mb-4">100 Juta Rupiah</div>
          <p className="text-lg text-gray-300">For an 18-month runway to achieve our next set of critical milestones and reach profitability.</p>
        </motion.div>

        {/* Use of Funds */}
        <motion.div variants={itemVariants} className="bg-black/40 p-8 rounded-xl border border-emerald-900/50">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Use of Funds</h3>
          <div className="flex flex-col gap-4">
            {fundingBreakdown.map(item => (
              <div key={item.name} className="flex items-center">
                <span className={`w-2/5 font-medium ${item.color}`}>{item.name}</span>
                <div className="w-3/5 bg-gray-700/50 rounded-full h-6">
                  <motion.div
                    className={`h-6 rounded-full bg-gradient-to-r from-emerald-600 to-green-400 flex items-center justify-end pr-2`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.percentage}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <span className="text-xs font-bold text-black">{item.percentage}%</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Milestones */}
      <motion.div variants={itemVariants} className="mt-16">
        <h3 className="text-2xl font-bold text-center text-white mb-8">Key Milestones (18 Months)</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-black/30 rounded-lg border border-emerald-900/50 text-center">
            <Target className="w-10 h-10 mx-auto text-emerald-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Secure 20+ Institutional Partners</h4>
            <p className="text-gray-400">Expand our content base and user network across Southeast Asia.</p>
          </div>
          <div className="p-6 bg-black/30 rounded-lg border border-emerald-900/50 text-center">
            <Rocket className="w-10 h-10 mx-auto text-emerald-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Full V2 Platform Launch</h4>
            <p className="text-gray-400">Roll out advanced collaborative features and AI-driven analytics.</p>
          </div>
          <div className="p-6 bg-black/30 rounded-lg border border-emerald-900/50 text-center">
            <DollarSign className="w-10 h-10 mx-auto text-emerald-400 mb-4" />
            <h4 className="text-xl font-semibold text-white mb-2">Achieve $250K MRR</h4>
            <p className="text-gray-400">Through a mix of premium subscriptions and institutional licenses.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 