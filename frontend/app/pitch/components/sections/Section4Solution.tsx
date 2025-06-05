'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Section4Solution() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Solution components
  const solutionFeatures = [
    {
      title: "AI-Powered Text Digitization",
      description: "Our OCR AI system specializes in Arabic and Arabic-influenced scripts, converting centuries-old manuscripts into searchable digital text.",
      before: "Manual scanning and transcription requiring years of effort",
      after: "95% accuracy in automated text extraction within minutes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    },
    {
      title: "Semantic Network Analysis",
      description: "Our AI creates connections between related concepts, arguments, and rulings across different texts and pesantren traditions.",
      before: "Scholars independently rediscover connections, often missing crucial insights",
      after: "Instant visualization of intellectual lineages and related scholarly opinions",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      title: "Collaborative Digital Majlis",
      description: "A structured environment for scholars worldwide to collaborate, annotate, and extend traditional discourse into contemporary issues.",
      before: "Isolated research communities with limited cross-pollination of ideas",
      after: "Global network of scholars building upon each other's insights",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Interactive Visualization Tools",
      description: "Visual argument maps and knowledge graphs making complex jurisprudence accessible to scholars and students alike.",
      before: "Dense text requiring extensive background to parse effectively",
      after: "Intuitive visual exploration enabling rapid comprehension",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    }
  ];

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-6xl mx-auto px-6"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">Our Solution</h2>
        <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
          BahtsulMasail.tech brings centuries of Islamic scholarly discourse into the digital age, creating a living network of knowledge.
        </p>
      </motion.div>
      
      {/* Connected Network Visual */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative h-64 md:h-80 w-full mb-16 overflow-hidden rounded-lg bg-black/40"
      >
        {/* Connected Nodes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 rounded-full bg-emerald-900/40 border border-emerald-500/50 flex items-center justify-center text-emerald-400"
            initial={{ 
              x: `${10 + Math.random() * 80}%`, 
              y: `${10 + Math.random() * 80}%`,
              opacity: 0.6
            }}
            animate={inView ? { 
              opacity: [0.6, 0.9, 0.6],
              scale: [1, 1.05, 1]
            } : {}}
            transition={{ 
              repeat: Infinity,
              duration: 3 + Math.random() * 2,
              repeatType: "reverse"
            }}
          >
            <span className="text-xs">Node {i+1}</span>
          </motion.div>
        ))}
        
        {/* Connections that pulse with energy */}
        {Array.from({ length: 20 }).map((_, i) => {
          const start = {
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80
          };
          const end = {
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80
          };
          const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
          const angle = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
          
          return (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-emerald-600 to-emerald-300"
              style={{
                width: `${length}%`,
                left: `${start.x}%`,
                top: `${start.y}%`,
                transformOrigin: 'left center',
                transform: `rotate(${angle}deg)`
              }}
              initial={{ opacity: 0.3 }}
              animate={inView ? { 
                opacity: [0.3, 0.7, 0.3],
              } : { opacity: 0.3 }}
              transition={{ 
                duration: 1 + Math.random() * 3,
                delay: Math.random() * 2,
                repeat: Infinity,
              }}
            >
              {/* Traveling Pulse */}
              <motion.div 
                className="absolute h-2 w-2 rounded-full bg-emerald-400 top-1/2 -mt-1"
                initial={{ left: '0%' }}
                animate={{ left: '100%' }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2
                }}
              />
            </motion.div>
          );
        })}
        
        <div className="absolute inset-0 flex items-center justify-center text-xl text-emerald-300 font-medium">
          Intelligent Knowledge Network
        </div>
      </motion.div>

      {/* Side-by-Side Benefits */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl text-emerald-400 font-semibold">Before & After Comparison</h3>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutionFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1 + (index * 0.2) }}
              className="bg-black/30 backdrop-blur-sm rounded-lg border border-emerald-900/50 overflow-hidden"
            >
              <div className="p-6 border-b border-emerald-900/30">
                <div className="flex items-start gap-4 mb-4">
                  <div className="mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl text-emerald-400 font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 border-r border-emerald-900/30 bg-red-950/10">
                  <div className="text-sm text-red-300 mb-1 uppercase font-medium">Before</div>
                  <p className="text-gray-300 text-sm">{feature.before}</p>
                </div>
                <div className="p-4 bg-emerald-950/10">
                  <div className="text-sm text-emerald-300 mb-1 uppercase font-medium">With BahtsulMasail.tech</div>
                  <p className="text-gray-300 text-sm">{feature.after}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Final Impact Statement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="text-center mt-12 p-6 bg-emerald-900/20 border border-emerald-800/30 rounded-lg"
      >
        <h3 className="text-xl font-medium text-emerald-300 mb-3">Impact:</h3>
        <p className="text-lg text-white">
          Scholars achieve <span className="font-bold">95% faster research</span>, students gain <span className="font-bold">unprecedented access</span>, and the rich tradition of Islamic jurisprudence becomes <span className="font-bold">globally accessible</span> while preserving its depth and authenticity.
        </p>
      </motion.div>
    </motion.div>
  );
} 