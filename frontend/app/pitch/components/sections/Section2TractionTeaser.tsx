'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAnimatedCounter } from '../../../documents/hooks';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const AnimatedStat = ({ value, text }: { value: number; text: string }) => {
  const { ref, count } = useAnimatedCounter(value, 2);
  return (
    <div ref={ref}>
      <div className="mb-4">
        <span className="text-5xl md:text-7xl font-bold text-emerald-400">
          {count.toLocaleString()}+
        </span>
      </div>
      <p className="text-xl md:text-2xl text-gray-200">{text}</p>
    </div>
  );
};

export default function Section2TractionTeaser() {
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
      <div className="flex flex-col items-center text-center">
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Initial Momentum</h2>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        </motion.div>

        {/* Key Traction Metrics */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 w-full">
          <motion.div
            variants={itemVariants}
            className="bg-black/40 backdrop-blur-md p-10 rounded-xl border border-emerald-500/30"
          >
            <AnimatedStat value={10000} text="scholarly texts digitized from partner pesantren" />
            <div className="w-full h-4 bg-black/60 rounded-full mt-6 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-700 to-emerald-400"
                initial={{ width: '0%' }}
                animate={inView ? { width: '70%' } : { width: '0%' }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
            </div>
            <div className="mt-2 text-xs text-emerald-300 text-right">70% of Phase 1 goal</div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-black/40 backdrop-blur-md p-10 rounded-xl border border-emerald-500/30 flex flex-col justify-center"
          >
            <AnimatedStat value={90} text="% relevance in Semantic Search MVP" />
             <div className="mt-4 text-lg text-gray-400">
              Outperforming initial benchmarks by 25%
            </div>
          </motion.div>
        </div>

        {/* Animated Chart */}
        <motion.div variants={itemVariants} className="w-full mt-8">
           <h3 className="text-2xl font-bold text-white mb-4">6-Month Growth in Search Accuracy</h3>
          <div className="h-48 md:h-64 w-full flex items-end justify-between gap-2 md:gap-4 p-4 bg-black/20 rounded-lg border border-white/10">
            {[30, 45, 58, 65, 73, 90].map((height, index) => (
              <motion.div
                key={index}
                className="h-full flex-1 flex flex-col justify-end group"
                variants={itemVariants}
              >
                <motion.div
                  className="bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md relative overflow-hidden flex justify-center items-end pb-2"
                  initial={{ height: '0%' }}
                  animate={inView ? { height: `${height}%` } : { height: '0%' }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1, type: 'spring', stiffness: 50 }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {height}%
                  </div>
                </motion.div>
                <div className="text-xs md:text-sm mt-2 text-gray-400">
                  {['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'][index]}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-12">
           <p className="text-lg md:text-xl text-emerald-300 font-medium">
              This is why BahtsulMasail.tech is poised to redefine Islamic scholarship.
            </p>
        </motion.div>
      </div>
    </motion.div>
  );
} 