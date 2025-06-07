'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Lock, Search, Clock } from 'lucide-react';

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

const problemScenarios = [
  {
    title: "Fragmented Knowledge",
    description: "Valuable traditional Islamic jurisprudence texts remain scattered across thousands of physical pesantren libraries.",
    icon: <BookOpen className="h-8 w-8 text-emerald-400" />,
  },
  {
    title: "Inaccessible Archives",
    description: "Researching across diverse pesantren traditions requires physical visits taking months or even years.",
    icon: <Lock className="h-8 w-8 text-emerald-400" />,
  },
  {
    title: "Manual Analysis",
    description: "Cross-referencing arguments across different texts is manual, error-prone, and extraordinarily time-consuming.",
    icon: <Search className="h-8 w-8 text-emerald-400" />,
  },
  {
    title: "Lost Intellectual Capital",
    description: "As senior scholars age, invaluable knowledge and interpretative methods are at risk of being lost forever.",
    icon: <Clock className="h-8 w-8 text-emerald-400" />,
  },
];

export default function Section3Problem() {
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
      className="w-full max-w-6xl mx-auto px-6"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white">The Core Problem</h2>
        <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
          Centuries of wisdom are trapped in fragmented, inaccessible formats, creating a bottleneck for modern scholarship.
        </p>
      </motion.div>

      {/* Problem Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {problemScenarios.map((scenario, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-emerald-900/50 hover:border-emerald-700 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-emerald-900/50 p-3 rounded-lg">{scenario.icon}</div>
              <div>
                <h3 className="text-xl text-emerald-400 font-semibold mb-2">{scenario.title}</h3>
                <p className="text-gray-300">{scenario.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Central Impact Statement */}
      <motion.div
        variants={itemVariants}
        className="relative p-8 bg-red-900/20 border border-red-800/30 rounded-lg text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <h3 className="text-2xl font-bold text-red-300 mb-4 z-10 relative">This Leads To A Crisis:</h3>
        <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto z-10 relative">
          <strong className="text-red-200">Limited Access,</strong>
          <strong className="text-red-200"> Duplicated Efforts,</strong> and a
          <strong className="text-red-200"> Generational Knowledge Gap</strong> that threatens the future of Islamic jurisprudential tradition.
        </p>
      </motion.div>

      {/* Transition to Solution */}
      <motion.div
        variants={itemVariants}
        className="text-center mt-16"
      >
        <p className="text-xl text-emerald-400 font-semibold">
          This is the challenge BahtsulMasail.tech is built to solve.
        </p>
      </motion.div>
    </motion.div>
  );
} 