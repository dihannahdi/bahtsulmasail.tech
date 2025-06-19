'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Users, Target } from 'lucide-react';

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

const marketSegments = [
  {
    name: 'TAM (Total Addressable Market)',
    value: 'Rp 5T+',
    description: 'Indonesia Islamic Education & Digital Learning Market.',
    icon: <Globe className="w-8 h-8" />,
    color: 'emerald-500',
    size: 'w-96 h-96',
  },
  {
    name: 'SAM (Serviceable Addressable Market)',
    value: 'Rp 1.2T+',
    description: 'Indonesian pesantren, universities, and Islamic research institutions.',
    icon: <Users className="w-6 h-6" />,
    color: 'emerald-400',
    size: 'w-64 h-64',
  },
  {
    name: 'SOM (Serviceable Obtainable Market)',
    value: 'Rp 150B+',
    description: 'Initial focus on Java & Sumatra pesantren and Islamic universities.',
    icon: <Target className="w-5 h-5" />,
    color: 'emerald-300',
    size: 'w-40 h-40',
  },
];

export default function Section6MarketSize() {
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
        <h2 className="text-3xl md:text-4xl font-bold text-white">A Significant & Underserved Market</h2>
        <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
          The demand for accessible, digitized Islamic knowledge is global, growing, and ready for a technological solution.
        </p>
      </motion.div>

      {/* Market Size Visualization */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Concentric Circles */}
        <div className="relative flex items-center justify-center w-96 h-96">
          {marketSegments.map((segment, index) => (
            <motion.div
              key={segment.name}
              className={`absolute flex items-center justify-center rounded-full border-2 border-dashed border-${segment.color}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.3, type: 'spring' }}
              style={{ width: segment.size.split(' ')[0].slice(2) + 'px', height: segment.size.split(' ')[1].slice(2) + 'px' }}
            >
              <div className={`absolute -top-5 text-center text-${segment.color}`}>
                <span className="font-bold">{segment.name}</span>
              </div>
            </motion.div>
          ))}
           <div className="relative z-10 text-center">
              <p className="text-4xl font-bold text-white">Rp 1.8B+</p>
              <p className="text-lg text-emerald-300">Year 1 Target</p>
            </div>
        </div>

        {/* Descriptions */}
        <div className="w-full lg:w-1/2 space-y-6">
          {marketSegments.map((segment, index) => (
            <motion.div
              key={segment.name}
              variants={itemVariants}
              className="flex items-start gap-4 p-4 bg-black/30 rounded-lg border border-emerald-900/70"
            >
              <div className={`text-${segment.color}`}>{segment.icon}</div>
              <div>
                <h3 className={`text-xl font-bold text-${segment.color}`}>{segment.name} - {segment.value}</h3>
                <p className="text-gray-300">{segment.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
} 