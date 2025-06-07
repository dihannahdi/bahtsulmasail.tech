'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Database, Share2, Users, BarChart2 } from 'lucide-react';

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

const solutionFeatures = [
  {
    title: "AI-Powered Text Digitization",
    description: "Specialized OCR converts centuries-old manuscripts into searchable digital text with 95% accuracy.",
    icon: <Database className="h-8 w-8 text-emerald-300" />,
  },
  {
    title: "Semantic Network Analysis",
    description: "AI creates connections between concepts, arguments, and rulings across different texts and traditions.",
    icon: <Share2 className="h-8 w-8 text-emerald-300" />,
  },
  {
    title: "Collaborative Digital Majlis",
    description: "A structured environment for scholars worldwide to collaborate, annotate, and extend traditional discourse.",
    icon: <Users className="h-8 w-8 text-emerald-300" />,
  },
  {
    title: "Interactive Visualization Tools",
    description: "Visual argument maps and knowledge graphs make complex jurisprudence accessible to all.",
    icon: <BarChart2 className="h-8 w-8 text-emerald-300" />,
  },
];

export default function Section4Solution() {
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
      <motion.div variants={itemVariants} className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Our Solution: A Living Network of Knowledge</h2>
        <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
          BahtsulMasail.tech transforms static texts into a dynamic, interconnected, and globally accessible intellectual ecosystem.
        </p>
      </motion.div>

      {/* Solution Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {solutionFeatures.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-6 rounded-xl border border-emerald-900/50 hover:border-emerald-600 transition-all duration-300 flex flex-col items-center text-center h-full"
          >
            <div className="mb-4 bg-emerald-800/40 p-4 rounded-full">{feature.icon}</div>
            <h3 className="text-xl text-emerald-400 font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300 flex-grow">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Central Visualization */}
      <motion.div variants={itemVariants} className="relative h-80 w-full mb-16 rounded-lg bg-black/40 border border-emerald-800/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/30 to-transparent"></div>
        {/* Animated connections */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          {Array.from({ length: 20 }).map((_, i) => {
            const d = `M${Math.random() * 100}%,${Math.random() * 100}% C${Math.random() * 100}%,${Math.random() * 100}% ${Math.random() * 100}%,${Math.random() * 100}% ${Math.random() * 100}%,${Math.random() * 100}%`;
            return (
              <motion.path
                key={i}
                d={d}
                stroke="url(#line-gradient)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4 bg-black/50 rounded-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-emerald-300">The Intelligent Knowledge Network</h3>
            <p className="text-gray-300 mt-2">Connecting scholars, texts, and ideas across time.</p>
          </div>
        </div>
      </motion.div>

      {/* Final Impact Statement */}
      <motion.div
        variants={itemVariants}
        className="text-center mt-12 p-8 bg-gradient-to-t from-emerald-950 to-emerald-900/80 border border-emerald-700/50 rounded-lg"
      >
        <h3 className="text-2xl font-bold text-emerald-300 mb-3">The Transformative Impact</h3>
        <p className="text-lg md:text-xl text-white max-w-4xl mx-auto">
          We empower scholars with <strong className="text-emerald-200">95% faster research capabilities</strong>, provide students with <strong className="text-emerald-200">unprecedented access to knowledge</strong>, and ensure the rich tradition of Islamic jurisprudence not only survives but <strong className="text-emerald-200">thrives in the digital age.</strong>
        </p>
      </motion.div>
    </motion.div>
  );
} 