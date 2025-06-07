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
    if (inView) {
      applyGlow(glowElement);
    } else {
      revokeGlow(glowElement);
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
      {/* Logo */}
      <motion.div variants={logoVariants} className="mb-12">
        <div
          ref={glowRef}
          className="relative mx-auto w-36 h-36 mb-6 transition-all duration-300"
          style={{ ['--start-angle' as any]: '0deg' }}
        >
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping-slow" />
          <div className="absolute inset-2 bg-emerald-500/40 rounded-full animate-ping-slow animation-delay-300" />
          <div className="absolute inset-4 bg-emerald-500/60 rounded-full animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-5xl font-bold">BM</span>
          </div>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text text-transparent">
          BahtsulMasail.tech
        </h1>
      </motion.div>

      {/* One-liner */}
      <motion.div variants={itemVariants} className="mb-12">
        <h2 className="text-2xl md:text-4xl text-emerald-300 font-medium">
          AI-Powered Platform for Islamic Jurisprudence Research & Collaboration
        </h2>
      </motion.div>

      {/* 2-Sentence Description */}
      <motion.div variants={itemVariants} className="mb-16 max-w-4xl mx-auto">
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
          BahtsulMasail.tech digitizes, analyzes, and democratizes access to centuries of Islamic scholarly discourse (Bahtsul Masail), particularly from the rich pesantren tradition, using cutting-edge AI. We empower scholars, students, and seekers globally with unprecedented tools for research, understanding, and collaborative learning.
        </p>
      </motion.div>

      {/* Example */}
      <motion.div variants={itemVariants} className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-emerald-500/30 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold text-emerald-400 mb-4">For instance:</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/2">
            <div className="aspect-video bg-black/60 rounded-md border border-emerald-500/20 p-4 flex items-center justify-center relative overflow-hidden">
              <div className="relative z-10 text-center">
                <p className="text-sm md:text-base text-gray-300">
                  A student researching inheritance laws can instantly compare arguments across multiple pesantren deliberations
                </p>
              </div>
              {/* Animated Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10,10 L90,10 L90,90 L10,90 L10,10"
                    fill="none"
                    stroke="url(#emeraldGradient)"
                    strokeWidth="0.5"
                    className="animate-dash"
                  />
                  <defs>
                    <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className="text-base md:text-lg text-gray-300">
            <p>
              See visual argument maps, and understand complex rulings in <span className="text-emerald-400 font-bold">minutes</span>—a task that previously took <span className="text-emerald-400 font-bold">weeks</span> of manual research.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-emerald-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </motion.div>
  );
} 