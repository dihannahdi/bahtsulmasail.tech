'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LoginPortal from './components/LoginPortal';
import PitchContent from './components/PitchContent';

export default function PitchPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Enhanced loading simulation with realistic progress
  useEffect(() => {
    const loadingSteps = [
      { progress: 10, message: 'Initializing BahtsulMasail.tech...' },
      { progress: 25, message: 'Loading AI engines...' },
      { progress: 45, message: 'Connecting to scholarly networks...' },
      { progress: 65, message: 'Preparing pitch presentation...' },
      { progress: 85, message: 'Finalizing experience...' },
      { progress: 100, message: 'Welcome to the future of Islamic research!' }
    ];

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingProgress(loadingSteps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          // Check if user is already logged in
          const authStatus = localStorage.getItem('pitchAuth');
          if (authStatus === 'authenticated') {
            setIsLoggedIn(true);
            setShowWelcome(true);
            setTimeout(() => setShowWelcome(false), 3000);
          }
        }, 500);
      }
    }, 400);

    return () => clearInterval(timer);
  }, []);

  // Prepare ambient sound effect (optional)
  useEffect(() => {
    // Future: Add ambient Islamic/scholarly atmosphere sound
    // audioRef.current = new Audio('/sounds/ambient-scholarly.mp3');
    // audioRef.current.volume = 0.1;
    // audioRef.current.loop = true;
  }, []);

  const handleLogin = (username: string, password: string) => {
    if (username === 'bahtsulmasail' && password === 'airesearch') {
      localStorage.setItem('pitchAuth', 'authenticated');
      setIsLoggedIn(true);
      setShowWelcome(true);
      
      // Optional: Play welcome sound
      // if (audioRef.current) audioRef.current.play();
      
      setTimeout(() => setShowWelcome(false), 3000);
      return true;
    }
    return false;
  };

  // Lightweight loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-black via-gray-900 to-emerald-900/10 flex items-center justify-center">
        {/* Simple animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/5 to-blue-900/5"></div>

        {/* Main loading content */}
        <div className="relative z-10 text-center max-w-md mx-auto px-6">
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl font-bold">BM</span>
              </div>
            </div>
          </motion.div>

          {/* Loading text */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-white mb-2"
          >
            BahtsulMasail.tech
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-emerald-300 mb-8"
          >
            Revolutionizing Islamic Research
          </motion.p>

          {/* Enhanced progress bar */}
          <div className="w-full bg-gray-800/30 rounded-full h-2 mb-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-400 text-sm"
          >
            {loadingProgress}%
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-emerald-900/5 text-white relative">
      {/* Simple background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 60%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)`
        }} />
      </div>

      {/* Welcome message overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <div className="text-center max-w-md mx-auto px-6">
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="bg-gradient-to-br from-emerald-900/40 to-emerald-700/20 p-8 rounded-2xl border border-emerald-400/30 backdrop-blur-md"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-lg font-bold">✓</span>
                </motion.div>
                <h2 className="text-xl font-bold text-emerald-300 mb-2">Welcome!</h2>
                <p className="text-gray-300 text-sm">Prepare to experience the future of Islamic research</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <LoginPortal onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="pitch"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <PitchContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightweight floating action button */}
      {isLoggedIn && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white p-3 rounded-full shadow-lg transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
} 