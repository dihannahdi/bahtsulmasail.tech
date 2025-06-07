'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lightbulb, Book, Users } from 'lucide-react';

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

const insights = [
  {
    title: "Beyond 'Search': The Need for 'Understanding'",
    description: "The market doesn't just need a search engine for old texts; it needs a system that understands and maps the intricate relationships between arguments, scholars, and traditions. This is a knowledge network problem, not just a data retrieval problem.",
    icon: <Lightbulb className="w-8 h-8 text-emerald-400" />,
  },
  {
    title: "Pesantren as the Epicenter of Innovation",
    description: "Often viewed as traditionalist, pesantren are actually dynamic intellectual hubs. By partnering directly with them, we tap into a living tradition and gain access to invaluable, often un-digitized, knowledge capital that others overlook.",
    icon: <Book className="w-8 h-8 text-emerald-400" />,
  },
  {
    title: "Community is the Moat",
    description: "While our AI is a powerful tool, the ultimate defensible moat is the collaborative community of scholars we are building. The network effects from shared annotations, discussions, and new research create a self-improving ecosystem that is impossible to replicate.",
    icon: <Users className="w-8 h-8 text-emerald-400" />,
  },
];

export default function Section8UniqueInsights() {
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
        <h2 className="text-3xl md:text-4xl font-bold text-white">Our Intellectual Edge</h2>
        <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
          Our approach is built on non-obvious insights about the problem, the market, and the technology.
        </p>
      </motion.div>

      {/* Insights Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-black/30 backdrop-blur-md p-8 rounded-xl border border-emerald-900/50 flex flex-col text-center"
          >
            <div className="mx-auto bg-emerald-900/50 p-4 rounded-full mb-6">
              {insight.icon}
            </div>
            <h3 className="text-xl font-semibold text-emerald-400 mb-4">{insight.title}</h3>
            <p className="text-gray-300">{insight.description}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div variants={itemVariants} className="mt-16 text-center p-6 bg-gradient-to-r from-emerald-950 via-black to-emerald-950 border-y-2 border-emerald-700">
        <p className="text-xl text-white font-semibold">
          This deep understanding allows us to build a solution that is not just <span className="text-emerald-400">10x better</span>, but <span className="text-emerald-400">fundamentally different</span>.
        </p>
      </motion.div>
    </motion.div>
  );
} 