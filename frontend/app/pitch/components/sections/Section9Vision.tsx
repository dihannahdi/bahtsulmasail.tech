'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layers, Globe, BrainCircuit } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const visionStages = [
  {
    title: "Phase 1: The Foundation",
    description: "Become the definitive digital archive and research tool for Indonesian pesantren.",
    icon: <Layers className="w-10 h-10 text-emerald-400" />,
  },
  {
    title: "Phase 2: The Global Network",
    description: "Expand to become the global OS for Islamic jurisprudence, connecting scholars and institutions worldwide.",
    icon: <Globe className="w-10 h-10 text-emerald-400" />,
  },
  {
    title: "Phase 3: The Living Intelligence",
    description: "Evolve into a predictive, AI-driven platform that helps model solutions for contemporary challenges based on historical data.",
    icon: <BrainCircuit className="w-10 h-10 text-emerald-400" />,
  },
];

export default function Section9Vision() {
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
        <h2 className="text-3xl md:text-4xl font-bold text-white">Our Vision for the Future</h2>
        <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
          We are not just building a product; we are architecting the future of Islamic intellectual tradition.
        </p>
      </motion.div>

      {/* Vision Stages */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-emerald-800/50"></div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {visionStages.map((stage, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-emerald-900/50 flex flex-col items-center text-center z-10"
            >
              <div className="mb-6 bg-emerald-900/50 p-4 rounded-full">
                {stage.icon}
              </div>
              <h3 className="text-2xl font-semibold text-emerald-400 mb-4">{stage.title}</h3>
              <p className="text-gray-300">{stage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ultimate Goal */}
      <motion.div
        variants={itemVariants}
        className="mt-16 text-center p-8 bg-gradient-to-tr from-emerald-950 via-black to-emerald-950 border-2 border-emerald-700 rounded-2xl shadow-2xl shadow-emerald-900/50"
      >
        <h3 className="text-3xl font-bold text-white mb-4">The Ultimate Goal: <span className="text-emerald-400">Islam Digdaya</span></h3>
        <p className="text-xl text-gray-200 max-w-4xl mx-auto">
          An intellectually vibrant, globally influential, and digitally empowered Islamic civilization, where timeless wisdom informs modern progress.
        </p>
      </motion.div>
    </motion.div>
  );
} 