'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAnimatedCounter } from '../../../documents/hooks';
import { Database, Users, FileText, CheckCircle } from 'lucide-react';

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

const kpis = [
  { value: 10000, label: "Texts Digitized", icon: <Database /> },
  { value: 5, label: "Partner Pesantren", icon: <Users /> },
  { value: 50000, label: "Scholarly Arguments Mapped", icon: <FileText /> },
  { value: 90, label: "Search Accuracy (%)", icon: <CheckCircle /> },
];

const AnimatedKPI = ({ value, label, icon }: { value: number; label: string; icon: React.ReactNode }) => {
  const { ref, count } = useAnimatedCounter(value, 2);
  return (
    <div ref={ref} className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-emerald-800/60 text-center">
      <div className="text-emerald-400 w-12 h-12 mx-auto mb-4 flex items-center justify-center">{icon}</div>
      <div className="text-4xl font-bold text-white">{count.toLocaleString()}{label.includes('%') && '%'}</div>
      <div className="text-gray-400 mt-2">{label}</div>
    </div>
  );
};

export default function Section5TractionInDepth() {
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
        <h2 className="text-3xl md:text-4xl font-bold text-white">Traction & Milestones</h2>
        <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
          Demonstrable progress and a clear roadmap for future growth.
        </p>
      </motion.div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {kpis.map((kpi, index) => (
          <motion.div key={index} variants={itemVariants}>
            <AnimatedKPI {...kpi} />
          </motion.div>
        ))}
      </div>

      {/* Milestones Timeline */}
      <motion.div variants={itemVariants} className="mb-16">
        <h3 className="text-2xl font-bold text-center text-white mb-8">Project Milestones</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 w-0.5 h-full bg-emerald-800/50"></div>
          
          {/* Milestones */}
          <div className="space-y-12">
            <div className="flex items-center w-full">
              <div className="w-1/2 pr-8 text-right">
                <motion.div variants={itemVariants} className="p-4 bg-black/40 rounded-lg border border-emerald-900">
                  <p className="font-bold text-emerald-400">Q2 2024</p>
                  <p className="text-gray-300">MVP Development & Initial Partner Outreach</p>
                </motion.div>
              </div>
              <div className="w-1/2 pl-8"></div>
            </div>
            <div className="flex items-center w-full">
              <div className="w-1/2 pr-8"></div>
              <div className="w-1/2 pl-8 text-left">
                <motion.div variants={itemVariants} className="p-4 bg-black/40 rounded-lg border border-emerald-900">
                  <p className="font-bold text-emerald-400">Q3 2024</p>
                  <p className="text-gray-300">Achieved 10,000+ texts digitized</p>
                </motion.div>
              </div>
            </div>
             <div className="flex items-center w-full">
              <div className="w-1/2 pr-8 text-right">
                <motion.div variants={itemVariants} className="p-4 bg-black/40 rounded-lg border border-emerald-900">
                  <p className="font-bold text-emerald-400">Q4 2024</p>
                  <p className="text-gray-300">Beta launch with 5 partner pesantren</p>
                </motion.div>
              </div>
              <div className="w-1/2 pl-8"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 