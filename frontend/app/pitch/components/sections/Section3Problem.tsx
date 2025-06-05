'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Section3Problem() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Problem scenarios
  const problemScenarios = [
    {
      title: "Fragmented Knowledge",
      description: "Valuable traditional Islamic jurisprudence texts remain scattered across thousands of physical pesantren libraries.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Inaccessible Archives",
      description: "Researching across diverse pesantren traditions requires physical visits taking months or even years.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Manual Analysis",
      description: "Cross-referencing arguments across different texts is manual, error-prone, and extraordinarily time-consuming.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: "Lost Intellectual Capital",
      description: "As senior scholars age, invaluable knowledge and interpretative methods are at risk of being lost forever.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
        <h2 className="text-3xl md:text-4xl font-bold text-white">The Problem</h2>
        <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-3xl mx-auto">
          Islamic scholarly discourse faces a critical juncture where centuries of wisdom remain trapped in fragmented, inaccessible formats.
        </p>
      </motion.div>

      {/* Broken Network Visual */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative h-64 md:h-80 w-full mb-16 overflow-hidden rounded-lg bg-black/40"
      >
        {/* Disconnected Nodes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 rounded-full bg-emerald-900/30 border border-emerald-600/40 flex items-center justify-center text-emerald-400"
            initial={{ 
              x: `${10 + Math.random() * 80}%`, 
              y: `${10 + Math.random() * 80}%`,
              opacity: 0.6
            }}
            animate={inView ? { 
              x: `${10 + Math.random() * 80}%`, 
              y: `${10 + Math.random() * 80}%`,
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.05, 1]
            } : {}}
            transition={{ 
              repeat: Infinity,
              duration: 5 + Math.random() * 10,
              repeatType: "reverse"
            }}
          >
            <span className="text-xs">Node {i+1}</span>
          </motion.div>
        ))}
        
        {/* Broken Connections that flash and disappear */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-emerald-500/30"
            style={{
              width: `${20 + Math.random() * 30}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              left: `${Math.random() * 70}%`,
              top: `${Math.random() * 80}%`
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { 
              opacity: [0, 0.5, 0],
            } : { opacity: 0 }}
            transition={{ 
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 4
            }}
          />
        ))}
        
        <div className="absolute inset-0 flex items-center justify-center text-xl text-gray-400 font-medium">
          Disconnected Knowledge Networks
        </div>
      </motion.div>

      {/* Problem Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {problemScenarios.map((scenario, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 + (index * 0.2) }}
            className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-emerald-900/50"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {scenario.icon}
              </div>
              <div>
                <h3 className="text-xl text-emerald-400 font-semibold mb-2">{scenario.title}</h3>
                <p className="text-gray-300">{scenario.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Problem Impact */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="mt-16 p-6 bg-red-900/20 border border-red-800/30 rounded-lg text-center"
      >
        <h3 className="text-xl font-medium text-red-300 mb-3">Resulting in:</h3>
        <p className="text-lg text-gray-200">
          <span className="font-semibold">Limited access to Islamic scholarship, </span> 
          <span className="font-semibold">duplicated research efforts, </span>
          <span className="font-semibold">and a generational knowledge gap </span>
          that threatens the continued vitality and relevance of Islamic jurisprudential tradition.
        </p>
      </motion.div>
      
      {/* Final Statement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="text-center mt-12"
      >
        <p className="text-xl text-emerald-400 font-semibold">
          This is the challenge BahtsulMasail.tech directly addresses.
        </p>
      </motion.div>
    </motion.div>
  );
} 