'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PieChart, Target, Rocket, DollarSign, HandHeart, Clock, TrendingUp } from 'lucide-react';

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

// YC Principle: Clear fund allocation with specific purposes
const fundingBreakdown = [
  { 
    name: 'AI Development & Infrastructure', 
    percentage: 45, 
    amount: '$675K',
    details: 'Advanced NLP models, semantic search, cloud infrastructure',
    color: 'text-emerald-400' 
  },
  { 
    name: 'Engineering Team (5 hires)', 
    percentage: 30, 
    amount: '$450K',
    details: 'Senior ML engineers, full-stack developers, DevOps',
    color: 'text-green-400' 
  },
  { 
    name: 'Content & Partnerships', 
    percentage: 15, 
    amount: '$225K',
    details: 'Pesantren partnerships, digitization contracts, content acquisition',
    color: 'text-teal-400' 
  },
  { 
    name: 'Marketing & Sales', 
    percentage: 10, 
    amount: '$150K',
    details: 'User acquisition, conference presence, sales team',
    color: 'text-cyan-400' 
  },
];

// YC Principle: Milestone-driven with revenue targets and timeline
const keyMilestones = [
  {
    timeline: "Month 6",
    title: "Full Platform Launch & 50 Pesantren Partnerships",
    description: "Complete V2 platform with advanced AI features",
    metric: "10,000 active users",
    revenue: "$25K MRR",
    icon: <Rocket className="w-8 h-8 text-emerald-400" />,
  },
  {
    timeline: "Month 12", 
    title: "Regional Market Leadership",
    description: "Establish dominance in Indonesian Islamic research market",
    metric: "50,000 active users",
    revenue: "$100K MRR", 
    icon: <Target className="w-8 h-8 text-emerald-400" />,
  },
  {
    timeline: "Month 18",
    title: "International Expansion Ready",
    description: "Proven model ready for Series A and global expansion",
    metric: "100,000 active users",
    revenue: "$250K MRR",
    icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
  },
];

export default function Section11Funding() {
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
      {/* Section Header - YC: Direct, specific ask */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <div className="inline-flex items-center bg-gradient-to-r from-blue-900/20 to-emerald-900/20 px-6 py-3 rounded-full border border-blue-500/30 mb-6">
          <HandHeart className="h-6 w-6 text-blue-400 mr-3" />
          <span className="text-blue-300 font-semibold">Investment Opportunity</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Use of Funds & The Ask
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          We are raising capital to accelerate our path to market leadership and international expansion.
        </p>
      </motion.div>

      {/* The Ask - YC: Specific amount and timeframe */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="bg-gradient-to-r from-blue-900/30 to-emerald-900/30 backdrop-blur-md p-10 rounded-2xl border border-blue-500/40 text-center relative overflow-hidden">
          {/* Background animation */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-emerald-400/20"
              animate={{
                background: [
                  'linear-gradient(45deg, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
                  'linear-gradient(225deg, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
                  'linear-gradient(45deg, rgba(59, 130, 246, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">We are raising:</h3>
            <div className="text-6xl md:text-8xl font-bold text-gradient bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-6">
              $1.5M
            </div>
            <div className="text-xl md:text-2xl text-blue-300 font-medium mb-4">
              Seed Round | 18-Month Runway
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              To achieve market leadership in Islamic jurisprudence research and prepare for Series A international expansion.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Use of Funds - YC: Detailed breakdown */}
      <motion.div variants={itemVariants} className="mb-16">
        <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          Strategic Fund Allocation
        </h3>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Visual breakdown */}
          <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-emerald-500/30">
            <h4 className="text-xl font-semibold text-emerald-400 mb-6 text-center">Fund Distribution</h4>
            <div className="space-y-4">
              {fundingBreakdown.map((item, index) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${item.color} text-sm md:text-base`}>
                      {item.name}
                    </span>
                    <span className="text-white font-bold">{item.amount}</span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-4">
                    <motion.div
                      className="h-4 rounded-full bg-gradient-to-r from-emerald-600 to-blue-400 flex items-center justify-end pr-3"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${item.percentage}%` } : { width: 0 }}
                      transition={{ duration: 1.5, delay: 0.2 + index * 0.1 }}
                    >
                      <span className="text-xs font-bold text-white">{item.percentage}%</span>
                    </motion.div>
                  </div>
                  <p className="text-xs text-gray-400">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Strategic rationale */}
          <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-blue-500/30">
            <h4 className="text-xl font-semibold text-blue-400 mb-6 text-center">Why These Investments?</h4>
            <div className="space-y-6">
              <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/30">
                <h5 className="text-emerald-400 font-semibold mb-2">🤖 AI-First Moat</h5>
                <p className="text-gray-300 text-sm">Advanced Islamic text processing creates 10x better search accuracy than generic solutions</p>
              </div>
              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                <h5 className="text-blue-400 font-semibold mb-2">👥 Talent Acquisition</h5>
                <p className="text-gray-300 text-sm">Top-tier ML engineers are crucial for maintaining technological leadership</p>
              </div>
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                <h5 className="text-purple-400 font-semibold mb-2">🏛️ Content Partnerships</h5>
                <p className="text-gray-300 text-sm">Exclusive pesantren relationships create defensible content moat</p>
              </div>
              <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/30">
                <h5 className="text-orange-400 font-semibold mb-2">🚀 Growth Engine</h5>
                <p className="text-gray-300 text-sm">Strategic marketing drives network effects and viral adoption</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Milestones Timeline - YC: Revenue-driven milestones */}
      <motion.div variants={itemVariants} className="mb-16">
        <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          18-Month Milestone-Driven Roadmap
        </h3>
        
        <div className="space-y-6">
          {keyMilestones.map((milestone, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-r from-black/50 to-blue-900/20 backdrop-blur-md p-6 rounded-xl border border-blue-500/30 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-emerald-400"></div>
              
              <div className="grid lg:grid-cols-12 gap-6 items-center">
                {/* Timeline */}
                <div className="lg:col-span-2 text-center">
                  <div className="bg-blue-500/20 p-3 rounded-full inline-flex items-center justify-center mb-2">
                    {milestone.icon}
                  </div>
                  <div className="text-lg font-bold text-blue-400">{milestone.timeline}</div>
                </div>
                
                {/* Milestone details */}
                <div className="lg:col-span-6">
                  <h4 className="text-xl font-bold text-white mb-2">{milestone.title}</h4>
                  <p className="text-gray-300 mb-3">{milestone.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-emerald-500/10 px-3 py-1 rounded-full text-sm text-emerald-300 border border-emerald-500/30">
                      {milestone.metric}
                    </span>
                  </div>
                </div>
                
                {/* Revenue target */}
                <div className="lg:col-span-4 text-center">
                  <div className="bg-black/50 p-4 rounded-lg border border-emerald-500/30">
                    <div className="text-sm text-gray-400 mb-1">Revenue Target</div>
                    <div className="text-2xl font-bold text-emerald-400">{milestone.revenue}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Investment Value Proposition */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 p-8 rounded-2xl border border-emerald-500/40">
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-300 text-center mb-6">
            The Investment Opportunity
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">$10B+</div>
              <div className="text-lg text-white">Market Opportunity</div>
              <div className="text-sm text-gray-400">Global religious education & AI wisdom</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">10x</div>
              <div className="text-lg text-white">Performance Advantage</div>
              <div className="text-sm text-gray-400">vs existing research methods</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">1st</div>
              <div className="text-lg text-white">Mover Advantage</div>
              <div className="text-sm text-gray-400">AI-powered Islamic jurisprudence</div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl md:text-2xl text-white font-bold mb-4">
              The key question for you:
            </p>
            <p className="text-2xl md:text-3xl text-gradient bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-bold">
              "Will you invest in BahtsulMasail.tech to help us achieve these milestones and co-author the future of Islamic scholarship?"
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 