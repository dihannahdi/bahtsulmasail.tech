'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { applyGlow, revokeGlow } from '@/lib/glowEffect';

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
      damping: 10,
    },
  },
};

const logoVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      delay: 0.4,
    },
  },
};

export default function Section1Title() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glowElement = glowRef.current;
    if (inView && glowElement) {
      applyGlow(glowElement, { color: '#10B981', intensity: 1.5, duration: 800 });
    } else if (glowElement) {
      revokeGlow(glowElement, { duration: 800 });
    }
    return () => revokeGlow(glowElement);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="w-full max-w-6xl mx-auto text-center px-6"
    >
      {/* Logo with Enhanced Animation */}
      <motion.div variants={logoVariants} className="mb-12">
        <div
          ref={glowRef}
          className="relative mx-auto w-40 h-40 mb-8 transition-all duration-800"
        >
          {/* Pulsing outer rings */}
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping-slow" />
          <div className="absolute inset-2 bg-emerald-500/30 rounded-full animate-ping-slow animation-delay-300" />
          <div className="absolute inset-4 bg-emerald-500/40 rounded-full animate-ping-slow animation-delay-600" />
          
          {/* Core glow */}
          <div className="absolute inset-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full animate-pulse" />
          
          {/* Logo text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-4xl font-bold drop-shadow-lg">BM</span>
          </div>
          
          {/* Rotating accent ring */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400 border-dashed animate-spin-slow opacity-60" />
        </div>
        
        <motion.h1 
          className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-600 bg-clip-text text-transparent"
          animate={{ 
            backgroundPosition: inView ? ['0%', '100%', '0%'] : '0%'
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          BahtsulMasail.tech
        </motion.h1>
      </motion.div>

      {/* Clear One-liner (YC Principle: Impossible to Misunderstand) */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-3xl md:text-5xl text-emerald-300 font-semibold leading-tight">
          AI-Powered Platform for Islamic Jurisprudence Research & Collaboration
        </h2>
        <div className="mt-4 w-32 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mx-auto animate-pulse" />
      </motion.div>

      {/* 2-Sentence Clear Description (YC: Clarity is King) */}
      <motion.div variants={itemVariants} className="mb-12 max-w-5xl mx-auto">
        <div className="bg-black/30 backdrop-blur-md p-8 rounded-xl border border-emerald-500/30">
          <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-4">
            <span className="text-emerald-400 font-semibold">BahtsulMasail.tech digitizes, analyzes, and democratizes access to centuries of Islamic scholarly discourse</span> (Bahtsul Masail), particularly from the rich pesantren tradition, using cutting-edge AI.
          </p>
          <p className="text-xl md:text-2xl text-gray-100 leading-relaxed">
            <span className="text-emerald-400 font-semibold">We empower scholars, students, and seekers globally</span> with unprecedented tools for research, understanding, and collaborative learning.
          </p>
        </div>
      </motion.div>

      {/* Specific Example (YC: Show Don't Tell) */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-black/50 to-emerald-900/20 backdrop-blur-md p-10 rounded-2xl border border-emerald-500/40 max-w-4xl mx-auto relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#10B981" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center">
            <span className="mr-3">📚</span>
            Concrete Example:
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Before State */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-red-400">Before (Traditional Method):</h4>
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                <p className="text-gray-300">
                  Student researching inheritance laws manually searches through physical books across multiple pesantren libraries for <span className="text-red-400 font-bold">weeks</span>
                </p>
              </div>
            </div>
            
            {/* After State */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-emerald-400">With BahtsulMasail.tech:</h4>
              <div className="bg-emerald-900/20 p-4 rounded-lg border border-emerald-500/30">
                <p className="text-gray-300">
                  Instantly compare arguments across thousands of texts, see visual argument maps, understand complex rulings in <span className="text-emerald-400 font-bold">minutes</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Impact visualization */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-4 bg-emerald-500/10 p-4 rounded-lg">
              <span className="text-2xl font-bold text-emerald-400">95% time reduction</span>
              <span className="text-gray-300">|</span>
              <span className="text-2xl font-bold text-emerald-400">10x accuracy</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: [0, 1, 0], 
          y: [20, 0, -10] 
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          repeatType: "loop", 
          delay: 3 
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-emerald-400 flex flex-col items-center space-y-2"
      >
        <span className="text-sm font-medium">Discover Our Momentum</span>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            delay: 3.5
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 