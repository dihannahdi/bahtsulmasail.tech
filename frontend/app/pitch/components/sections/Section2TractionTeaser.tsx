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

const AnimatedStat = ({ value, text, prefix = '', suffix = '+' }: { 
  value: number; 
  text: string;
  prefix?: string;
  suffix?: string;
}) => {
  const { ref, count } = useAnimatedCounter(value, 2);
  return (
    <div ref={ref}>
      <div className="mb-4">
        <span className="text-5xl md:text-7xl font-bold text-emerald-400">
          {prefix}{count.toLocaleString()}{suffix}
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
        {/* Hero Hook - YC Principle: Lead with Strength */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-gradient-to-r from-emerald-900/50 to-black/50 backdrop-blur-md p-8 rounded-2xl border border-emerald-500/40 mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-emerald-400 mb-4">
              10,000+ Texts Digitized
            </h2>
            <p className="text-xl md:text-2xl text-emerald-300 font-medium">
              From Historic Pesantren Archives to AI-Powered Research Platform
            </p>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-white">
            This is why BahtsulMasail.tech is poised to redefine Islamic scholarship.
          </div>
        </motion.div>

        {/* Core Traction Metrics Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16 w-full">
          {/* Primary Metric: Content Scale */}
          <motion.div
            variants={itemVariants}
            className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-emerald-500/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
            <AnimatedStat 
              value={10000} 
              text="Historic Texts Digitized" 
            />
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm text-emerald-300">
                <span>Phase 1 Progress</span>
                <span>70%</span>
              </div>
              <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-700 to-emerald-400"
                  initial={{ width: '0%' }}
                  animate={inView ? { width: '70%' } : { width: '0%' }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
              </div>
            </div>
          </motion.div>

          {/* AI Performance Metric */}
          <motion.div
            variants={itemVariants}
            className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-emerald-500/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
            <AnimatedStat 
              value={90} 
              text="AI Search Relevance" 
              suffix="%" 
            />
            <div className="mt-4 space-y-2">
              <p className="text-lg text-emerald-300 font-medium">
                Exceeding benchmarks by 25%
              </p>
              <div className="bg-emerald-500/10 p-3 rounded-lg">
                <p className="text-sm text-gray-300">
                  Validated with 500+ test queries
                </p>
              </div>
            </div>
          </motion.div>

          {/* Partnership Validation */}
          <motion.div
            variants={itemVariants}
            className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-emerald-500/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
            <AnimatedStat 
              value={12} 
              text="Pesantren Partnerships" 
            />
            <div className="mt-4 space-y-2">
              <p className="text-lg text-emerald-300 font-medium">
                LOIs Signed
              </p>
              <div className="bg-emerald-500/10 p-3 rounded-lg">
                <p className="text-sm text-gray-300">
                  Including Indonesia's top 3 pesantren
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Growth Momentum Chart */}
        <motion.div variants={itemVariants} className="w-full mt-8">
          <div className="bg-black/30 backdrop-blur-md p-8 rounded-xl border border-emerald-500/30">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              AI Accuracy: 6-Month Development Journey
            </h3>
            <p className="text-emerald-300 mb-6">Semantic Search Performance</p>
            
            <div className="h-56 md:h-72 w-full flex items-end justify-between gap-2 md:gap-4 p-6 bg-black/30 rounded-lg border border-emerald-500/20">
              {[30, 45, 58, 65, 73, 90].map((height, index) => {
                const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
                const isLatest = index === 5;
                
                return (
                  <motion.div
                    key={index}
                    className="h-full flex-1 flex flex-col justify-end group relative"
                    variants={itemVariants}
                  >
                    <motion.div
                      className={`relative overflow-hidden flex justify-center items-end pb-2 rounded-t-md ${
                        isLatest 
                          ? 'bg-gradient-to-t from-emerald-500 to-emerald-300' 
                          : 'bg-gradient-to-t from-emerald-700 to-emerald-500'
                      }`}
                      initial={{ height: '0%' }}
                      animate={inView ? { height: `${height}%` } : { height: '0%' }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1, type: 'spring', stiffness: 50 }}
                    >
                      {/* Highlight effect for latest */}
                      {isLatest && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      )}
                      
                      {/* Value display */}
                      <div className={`text-xs md:text-sm font-bold text-white transition-opacity duration-300 ${
                        isLatest ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        {height}%
                      </div>
                      
                      {/* Achievement badge for latest */}
                      {isLatest && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-emerald-400 text-black px-2 py-1 rounded text-xs font-bold">
                          Current
                        </div>
                      )}
                    </motion.div>
                    
                    <div className="text-xs md:text-sm mt-3 text-gray-400 text-center">
                      {months[index]}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Key insight */}
            <div className="mt-6 bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
              <p className="text-lg text-emerald-300 font-medium text-center">
                🎯 Consistent 15% monthly improvement in AI performance
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Strong Closing Statement */}
        <motion.div variants={itemVariants} className="mt-12">
          <div className="bg-gradient-to-r from-emerald-600/20 to-emerald-400/20 p-6 rounded-xl border border-emerald-400/40">
            <p className="text-xl md:text-2xl text-emerald-300 font-bold text-center">
              "From prototype to production-ready AI in 6 months.<br />
              <span className="text-white">This momentum validates our approach."</span>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 