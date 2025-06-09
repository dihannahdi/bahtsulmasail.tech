'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Database, Share2, Users, BarChart2, ArrowRight, Zap, CheckCircle } from 'lucide-react';

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

// YC Principle: Side-by-side comparison showing how we solve the problem
const solutionComparisons = [
  {
    problem: "Student spends 6 months physically visiting libraries",
    solution: "Instant access to 10,000+ digitized texts from any device",
    impact: "95% time reduction",
    metric: "6 months → 3 days",
    icon: <Database className="h-6 w-6" />,
  },
  {
    problem: "Manual comparison across 50+ texts takes 3 weeks",
    solution: "AI semantic search finds connections in seconds",
    impact: "10x faster research",
    metric: "3 weeks → 30 minutes",
    icon: <Share2 className="h-6 w-6" />,
  },
  {
    problem: "Knowledge isolated in physical archives",
    solution: "Global collaborative platform for scholars",
    impact: "Unlimited access",
    metric: "1 pesantren → 1000s worldwide",
    icon: <Users className="h-6 w-6" />,
  },
];

const coreCapabilities = [
  {
    title: "AI-Powered Text Processing",
    description: "Specialized OCR + NLP for centuries-old Islamic texts",
    achievement: "95% accuracy on complex Arabic manuscripts",
    icon: <Database className="h-8 w-8 text-emerald-300" />,
  },
  {
    title: "Semantic Knowledge Graph",
    description: "AI creates connections between concepts across texts",
    achievement: "90% relevance in cross-reference suggestions",
    icon: <Share2 className="h-8 w-8 text-emerald-300" />,
  },
  {
    title: "Collaborative Research Platform",
    description: "Digital majlis for global scholarly collaboration",
    achievement: "Real-time annotation and discussion tools",
    icon: <Users className="h-8 w-8 text-emerald-300" />,
  },
  {
    title: "Visual Argument Mapping",
    description: "Interactive charts showing scholarly debate structures",
    achievement: "Complex rulings visualized in minutes",
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
      {/* Section Header - YC: Clear solution statement */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <div className="inline-flex items-center bg-emerald-900/20 px-6 py-3 rounded-full border border-emerald-500/30 mb-6">
          <Zap className="h-6 w-6 text-emerald-400 mr-3" />
          <span className="text-emerald-300 font-semibold">Our Solution</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          How We Fix The Problem
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          BahtsulMasail.tech transforms centuries of isolated Islamic scholarship into an intelligent, accessible, collaborative research ecosystem.
        </p>
      </motion.div>

      {/* Side-by-Side Problem → Solution Comparisons */}
      <motion.div variants={itemVariants} className="mb-16">
        <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 text-center mb-8">
          Before vs. With BahtsulMasail.tech
        </h3>
        
        <div className="space-y-8">
          {solutionComparisons.map((comparison, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-r from-black/50 to-emerald-900/20 backdrop-blur-md p-6 rounded-xl border border-emerald-500/30 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
              
              <div className="grid lg:grid-cols-12 gap-6 items-center">
                {/* Problem State */}
                <div className="lg:col-span-4 space-y-3">
                  <h4 className="text-lg font-semibold text-red-400 flex items-center">
                    <span className="mr-2">❌</span>
                    Before
                  </h4>
                  <p className="text-gray-300 bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                    {comparison.problem}
                  </p>
                </div>
                
                {/* Arrow and Icon */}
                <div className="lg:col-span-1 flex justify-center">
                  <div className="bg-emerald-500/20 p-3 rounded-full">
                    <ArrowRight className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
                
                {/* Solution State */}
                <div className="lg:col-span-4 space-y-3">
                  <h4 className="text-lg font-semibold text-emerald-400 flex items-center">
                    <span className="mr-2">✅</span>
                    With BahtsulMasail.tech
                  </h4>
                  <p className="text-gray-300 bg-emerald-900/20 p-3 rounded-lg border border-emerald-500/30">
                    {comparison.solution}
                  </p>
                </div>
                
                {/* Impact Metrics */}
                <div className="lg:col-span-3 text-center">
                  <div className="bg-black/40 p-4 rounded-lg border border-emerald-500/30">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">
                      {comparison.impact}
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      {comparison.metric}
                    </div>
                    <div className="text-emerald-300">
                      {comparison.icon}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Core Technology Capabilities */}
      <motion.div variants={itemVariants} className="mb-16">
        <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          How Our Technology Works
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreCapabilities.map((capability, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-black/40 to-emerald-900/20 backdrop-blur-sm p-6 rounded-xl border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-900/50 p-3 rounded-lg flex-shrink-0">
                  {capability.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-emerald-400 mb-2">
                    {capability.title}
                  </h4>
                  <p className="text-gray-300 mb-3">
                    {capability.description}
                  </p>
                  <div className="bg-emerald-500/10 p-2 rounded border border-emerald-500/30">
                    <p className="text-sm text-emerald-300 font-medium">
                      ✨ {capability.achievement}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Live Demo Preview */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="bg-gradient-to-br from-black/60 to-emerald-900/30 p-8 rounded-2xl border border-emerald-500/40 relative overflow-hidden">
          {/* Animated Network Background */}
          <div className="absolute inset-0 opacity-30">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <linearGradient id="network-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
                  <stop offset="50%" stopColor="#10B981" stopOpacity="1" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>
              {Array.from({ length: 15 }).map((_, i) => {
                const d = `M${Math.random() * 100}%,${Math.random() * 100}% L${Math.random() * 100}%,${Math.random() * 100}%`;
                return (
                  <motion.path
                    key={i}
                    d={d}
                    stroke="url(#network-gradient)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                      delay: i * 0.1,
                    }}
                  />
                );
              })}
            </svg>
          </div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-emerald-300 mb-4">
              The Intelligent Knowledge Network
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              Live connections between scholars, texts, and ideas across time and geography
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="bg-black/50 p-4 rounded-lg border border-emerald-500/30">
                <div className="text-2xl font-bold text-emerald-400">10,000+</div>
                <div className="text-sm text-gray-300">Texts Connected</div>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-emerald-500/30">
                <div className="text-2xl font-bold text-emerald-400">95%</div>
                <div className="text-sm text-gray-300">Search Accuracy</div>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-emerald-500/30">
                <div className="text-2xl font-bold text-emerald-400">12</div>
                <div className="text-sm text-gray-300">Partner Pesantren</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quantified Impact Statement */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="bg-gradient-to-r from-emerald-600/20 to-emerald-400/20 p-8 rounded-xl border border-emerald-400/40">
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-300 mb-6 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 mr-3" />
            Proven Impact
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-4xl font-bold text-emerald-400">95%</div>
              <div className="text-lg text-white">Faster Research</div>
              <div className="text-sm text-gray-400">vs traditional methods</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400">10x</div>
              <div className="text-lg text-white">More Texts Accessible</div>
              <div className="text-sm text-gray-400">than any physical visit</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400">90%</div>
              <div className="text-lg text-white">Search Relevance</div>
              <div className="text-sm text-gray-400">in semantic queries</div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-white font-medium">
            "We don't just digitize texts – we create an intelligent research ecosystem that transforms how Islamic scholarship works."
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
} 