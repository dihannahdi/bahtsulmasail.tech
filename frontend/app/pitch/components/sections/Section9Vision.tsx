'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layers, Globe, BrainCircuit, TrendingUp, Star, Rocket } from 'lucide-react';

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

// YC Principle: Show path to $10B+ company
const marketExpansion = [
  {
    phase: "Years 1-3",
    title: "Islamic Jurisprudence Platform",
    tam: "$2.5B",
    market: "Global Islamic Education & Research",
    description: "Dominate Islamic legal research globally",
    icon: <Layers className="w-8 h-8 text-emerald-400" />,
    milestones: ["100 pesantren partnerships", "50K active scholars", "$10M ARR"]
  },
  {
    phase: "Years 4-6", 
    title: "Universal Religious Knowledge OS",
    tam: "$15B",
    market: "Broader Religious Education Technology",
    description: "Expand to other religious traditions using same AI framework",
    icon: <Globe className="w-8 h-8 text-emerald-400" />,
    milestones: ["Multi-faith platform", "1M users globally", "$100M ARR"]
  },
  {
    phase: "Years 7-10",
    title: "Global Wisdom Intelligence Network",
    tam: "$50B+",
    market: "AI-Powered Decision Support Systems",
    description: "AI that provides ethical guidance for governments, businesses, individuals",
    icon: <BrainCircuit className="w-8 h-8 text-emerald-400" />,
    milestones: ["B2B enterprise", "Government contracts", "$1B+ ARR"]
  },
];

const globalOpportunities = [
  {
    region: "Southeast Asia",
    market: "$500M",
    population: "240M Muslims",
    opportunity: "Digital-first Islamic education transformation"
  },
  {
    region: "Middle East & North Africa",
    market: "$800M",
    population: "350M Muslims", 
    opportunity: "Government digitization initiatives"
  },
  {
    region: "Global Muslim Diaspora",
    market: "$1.2B",
    population: "400M Muslims",
    opportunity: "Online learning and spiritual guidance"
  }
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
      {/* Section Header - YC: $10B+ Vision */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <div className="inline-flex items-center bg-gradient-to-r from-emerald-900/20 to-blue-900/20 px-6 py-3 rounded-full border border-emerald-500/30 mb-6">
          <Rocket className="h-6 w-6 text-emerald-400 mr-3" />
          <span className="text-emerald-300 font-semibold">The $10B+ Vision</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          From Platform to Global Operating System
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          BahtsulMasail.tech will become the definitive AI-powered wisdom intelligence network, starting with Islamic jurisprudence and expanding to transform how humanity accesses ethical guidance.
        </p>
      </motion.div>

      {/* Market Expansion Roadmap */}
      <motion.div variants={itemVariants} className="mb-16">
        <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 text-center mb-8">
          Path to $10B+ Market Leadership
        </h3>
        
        <div className="space-y-8">
          {marketExpansion.map((phase, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-r from-black/50 to-emerald-900/20 backdrop-blur-md p-8 rounded-xl border border-emerald-500/30 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400"></div>
              
              <div className="grid lg:grid-cols-12 gap-6 items-center">
                {/* Phase Info */}
                <div className="lg:col-span-3">
                  <div className="flex items-center space-x-3 mb-3">
                    {phase.icon}
                    <div>
                      <div className="text-sm text-emerald-300 font-medium">{phase.phase}</div>
                      <div className="text-lg font-bold text-white">{phase.title}</div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-emerald-400">{phase.tam}</div>
                  <div className="text-sm text-gray-400">{phase.market}</div>
                </div>
                
                {/* Description */}
                <div className="lg:col-span-5">
                  <p className="text-lg text-gray-300 mb-4">{phase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.milestones.map((milestone, idx) => (
                      <span key={idx} className="bg-emerald-500/10 px-3 py-1 rounded-full text-sm text-emerald-300 border border-emerald-500/30">
                        {milestone}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Visual Growth Indicator */}
                <div className="lg:col-span-4">
                  <div className="bg-black/40 p-4 rounded-lg border border-emerald-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Market Potential</span>
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          index === 0 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' :
                          index === 1 ? 'bg-gradient-to-r from-emerald-400 to-blue-400' :
                          'bg-gradient-to-r from-blue-400 to-purple-400'
                        }`}
                        initial={{ width: '0%' }}
                        animate={inView ? { width: `${30 + index * 30}%` } : { width: '0%' }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Global Market Opportunities */}
      <motion.div variants={itemVariants} className="mb-16">
        <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Global Market Opportunities
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {globalOpportunities.map((region, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-black/40 to-emerald-900/20 p-6 rounded-xl border border-emerald-500/30 text-center"
            >
              <h4 className="text-xl font-bold text-emerald-400 mb-2">{region.region}</h4>
              <div className="text-3xl font-bold text-white mb-1">{region.market}</div>
              <div className="text-sm text-gray-400 mb-3">{region.population}</div>
              <p className="text-gray-300 text-sm">{region.opportunity}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 p-6 rounded-xl border border-emerald-400/40">
            <p className="text-xl md:text-2xl text-white font-bold">
              Combined Total Addressable Market: <span className="text-emerald-400">$2.5B+</span>
            </p>
            <p className="text-lg text-gray-300 mt-2">
              Just the beginning of our expansion into broader wisdom intelligence markets
            </p>
          </div>
        </div>
      </motion.div>

      {/* Technology Expansion Vision */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="bg-gradient-to-br from-black/60 to-purple-900/30 p-8 rounded-2xl border border-purple-500/40 relative overflow-hidden">
          {/* Futuristic background pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="tech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8B5CF6" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#tech-grid)" />
            </svg>
          </div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-purple-300 mb-6">
              Beyond Islamic Jurisprudence: Universal Wisdom Intelligence
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">Technology Expansions:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Multi-religious text analysis (Christianity, Judaism, Buddhism)</li>
                  <li>• Government policy wisdom engines</li>
                  <li>• Corporate ethics decision support</li>
                  <li>• Personal moral guidance systems</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white">Revenue Streams:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Enterprise AI ethics consulting</li>
                  <li>• Government wisdom intelligence contracts</li>
                  <li>• Consumer spiritual guidance apps</li>
                  <li>• Educational institution licenses</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
              <p className="text-lg text-purple-200 font-medium">
                🚀 "The company that democratizes access to humanity's accumulated wisdom will be worth $10B+"
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ultimate Vision: Islam Digdaya */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="bg-gradient-to-tr from-emerald-950 via-black to-emerald-950 border-2 border-emerald-700 rounded-2xl shadow-2xl shadow-emerald-900/50 p-8 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent"
              animate={{
                background: [
                  'linear-gradient(45deg, rgba(16, 185, 129, 0.2) 0%, transparent 100%)',
                  'linear-gradient(225deg, rgba(16, 185, 129, 0.2) 0%, transparent 100%)',
                  'linear-gradient(45deg, rgba(16, 185, 129, 0.2) 0%, transparent 100%)',
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Star className="h-8 w-8 text-emerald-400 mr-3" />
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                The Ultimate Vision: <span className="text-emerald-400">Islam Digdaya</span>
              </h3>
              <Star className="h-8 w-8 text-emerald-400 ml-3" />
            </div>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8 leading-relaxed">
              An intellectually vibrant, globally influential, and digitally empowered Islamic civilization, where timeless wisdom guides modern progress and enlightens global decision-making.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
                <div className="text-2xl font-bold text-emerald-400">$10B+</div>
                <div className="text-sm text-emerald-300">Company Valuation Potential</div>
              </div>
              <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
                <div className="text-2xl font-bold text-emerald-400">1B+</div>
                <div className="text-sm text-emerald-300">Lives Impacted Globally</div>
              </div>
              <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
                <div className="text-2xl font-bold text-emerald-400">∞</div>
                <div className="text-sm text-emerald-300">Wisdom Preserved Forever</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 