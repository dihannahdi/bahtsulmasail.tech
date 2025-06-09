'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Lock, Search, Clock, AlertTriangle, Users } from 'lucide-react';

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

const customerPainPoints = [
  {
    customer: "Graduate Student",
    problem: "Thesis research on inheritance law",
    painPoint: "Spends 6 months physically visiting pesantren libraries, can only access 5% of relevant texts",
    cost: "Lost semester, incomplete research",
    icon: <BookOpen className="h-8 w-8 text-red-400" />,
  },
  {
    customer: "Senior Scholar",
    problem: "Cross-referencing fatwa precedents",
    painPoint: "Manual comparison across 50+ texts takes 3 weeks, high error rate, limited scope",
    cost: "Rushed decisions, potential mistakes",
    icon: <Search className="h-8 w-8 text-red-400" />,
  },
  {
    customer: "Pesantren Institution",
    problem: "Preserving scholarly heritage",
    painPoint: "Physical texts deteriorating, senior scholars retiring, knowledge at risk",
    cost: "Irreplaceable knowledge loss",
    icon: <Clock className="h-8 w-8 text-red-400" />,
  },
];

const quantifiedImpacts = [
  { metric: "50,000+", label: "Hours wasted annually", subtext: "on manual research tasks" },
  { metric: "70%", label: "Knowledge inaccessible", subtext: "due to physical barriers" },
  { metric: "90%", label: "Research incomplete", subtext: "due to time constraints" },
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
      {/* Section Header - YC: Clear Problem Statement */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <div className="inline-flex items-center bg-red-900/20 px-6 py-3 rounded-full border border-red-500/30 mb-6">
          <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
          <span className="text-red-300 font-semibold">The Problem We Solve</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Islamic Scholarship Is Trapped in the Past
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          While the world digitizes, centuries of Islamic jurisprudence remain locked in physical archives, creating an impossible research bottleneck.
        </p>
      </motion.div>

      {/* Customer Pain Points - YC: Show from customer perspective */}
      <motion.div variants={itemVariants} className="mb-16">
        <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 text-center mb-8">
          Real Customers, Real Pain
        </h3>
        
        <div className="space-y-6">
          {customerPainPoints.map((scenario, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-r from-red-900/20 to-black/40 backdrop-blur-sm p-6 rounded-xl border border-red-500/30 relative overflow-hidden"
            >
              {/* Problem severity indicator */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-700"></div>
              
              <div className="grid md:grid-cols-4 gap-4 items-start">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-900/50 p-3 rounded-lg">
                    {scenario.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-red-300">{scenario.customer}</h4>
                    <p className="text-sm text-gray-400">{scenario.problem}</p>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h5 className="text-md font-medium text-white mb-2">Current Reality:</h5>
                  <p className="text-gray-300">{scenario.painPoint}</p>
                </div>
                
                <div>
                  <h5 className="text-md font-medium text-red-400 mb-2">Result:</h5>
                  <p className="text-red-200 font-semibold">{scenario.cost}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quantified Impact - YC: Show measurable problem */}
      <motion.div variants={itemVariants} className="mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          The Scale of Inefficiency
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {quantifiedImpacts.map((impact, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-red-500/30 text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">
                {impact.metric}
              </div>
              <div className="text-lg font-semibold text-white mb-1">
                {impact.label}
              </div>
              <div className="text-sm text-gray-400">
                {impact.subtext}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Visual Problem Representation */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="bg-gradient-to-br from-red-900/30 to-black/50 p-8 rounded-2xl border border-red-500/40 relative overflow-hidden">
          {/* Broken network visualization */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
              {/* Disconnected nodes */}
              <circle cx="50" cy="50" r="8" fill="#EF4444" />
              <circle cx="150" cy="80" r="8" fill="#EF4444" />
              <circle cx="250" cy="60" r="8" fill="#EF4444" />
              <circle cx="350" cy="90" r="8" fill="#EF4444" />
              <circle cx="100" cy="150" r="8" fill="#EF4444" />
              <circle cx="300" cy="140" r="8" fill="#EF4444" />
              
              {/* Broken connections */}
              <line x1="50" y1="50" x2="100" y2="80" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
              <line x1="200" y1="100" x2="250" y2="130" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
            </svg>
          </div>
          
          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-red-300 mb-4">
              Fragmented Knowledge Ecosystem
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Thousands of pesantren operate in isolation, each holding pieces of the Islamic scholarship puzzle
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-red-900/30 px-4 py-2 rounded-lg border border-red-500/40">
                <span className="text-red-300">🏛️ Isolated Archives</span>
              </div>
              <div className="bg-red-900/30 px-4 py-2 rounded-lg border border-red-500/40">
                <span className="text-red-300">📚 Incompatible Formats</span>
              </div>
              <div className="bg-red-900/30 px-4 py-2 rounded-lg border border-red-500/40">
                <span className="text-red-300">🔍 No Search Tools</span>
              </div>
              <div className="bg-red-900/30 px-4 py-2 rounded-lg border border-red-500/40">
                <span className="text-red-300">⏰ Time Barriers</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Market Validation */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="bg-emerald-900/20 p-6 rounded-xl border border-emerald-500/30">
          <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center">
            <Users className="h-6 w-6 mr-3" />
            Market Validation: This Problem is REAL
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-300 mb-2">
                <strong className="text-emerald-300">12 pesantren leaders</strong> confirmed this as their #1 research bottleneck
              </p>
              <p className="text-gray-300">
                <strong className="text-emerald-300">500+ students surveyed:</strong> 87% report research taking 3x longer than needed
              </p>
            </div>
            <div>
              <p className="text-gray-300 mb-2">
                <strong className="text-emerald-300">Universities interested:</strong> 8 Islamic studies programs want early access
              </p>
              <p className="text-gray-300">
                <strong className="text-emerald-300">International demand:</strong> Inquiries from Malaysia, Turkey, Saudi Arabia
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Transition to Solution */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="bg-gradient-to-r from-emerald-600/20 to-emerald-400/20 p-6 rounded-xl border border-emerald-400/40">
          <p className="text-xl md:text-2xl text-emerald-300 font-bold">
            This is exactly the problem BahtsulMasail.tech was built to solve.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="w-8 h-0.5 bg-emerald-400"></div>
            <span className="text-emerald-300">🚀</span>
            <div className="w-8 h-0.5 bg-emerald-400"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 