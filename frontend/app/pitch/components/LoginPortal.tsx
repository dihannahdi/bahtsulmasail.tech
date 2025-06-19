'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface LoginPortalProps {
  onLogin: (username: string, password: string) => boolean;
}

export default function LoginPortal({ onLogin }: LoginPortalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  
  const formRef = useRef<HTMLDivElement>(null);

  // Auto-show hint after failed attempts
  useEffect(() => {
    if (attempts >= 2) {
      setShowHint(true);
    }
  }, [attempts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = onLogin(username, password);
    
    if (!success) {
      setError('Access denied. Invalid credentials.');
      setAttempts(prev => prev + 1);
      
      // Shake animation on error
      if (formRef.current) {
        formRef.current.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.style.animation = '';
          }
        }, 500);
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.15) 1px, transparent 0)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-200 rounded-full opacity-60"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-slate-300 rounded-full opacity-40"></div>
      <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-emerald-300 rounded-full opacity-50"></div>
      <div className="absolute bottom-20 right-20 w-1 h-1 bg-slate-400 rounded-full opacity-30"></div>

      {/* Main login interface */}
      <motion.div
        ref={formRef}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 25,
          duration: 0.6
        }}
        className="relative z-10 w-full max-w-md mx-auto px-6"
      >
        {/* Clean card design */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 backdrop-blur-sm">
          <div className="p-8">
            {/* Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Simplified logo */}
              <motion.div 
                className="relative mx-auto w-16 h-16 mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              >
                <div className="w-full h-full bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">BM</span>
                </div>
              </motion.div>

              <motion.h1 
                className="text-2xl font-bold text-slate-900 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                BahtsulMasail.tech
              </motion.h1>
              
              <motion.p 
                className="text-emerald-600 text-lg mb-3 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Exclusive Pitch Access
              </motion.p>
              
              <motion.div
                className="flex items-center justify-center space-x-2 text-sm text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <LockClosedIcon className="w-4 h-4" />
                <span>Secured Portal</span>
                <SparklesIcon className="w-4 h-4 text-emerald-500" />
              </motion.div>
            </motion.div>

            {/* Login form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Username field */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <UserIcon className="w-4 h-4 mr-2 text-emerald-500" />
                  Access Code
                </label>
                <motion.div 
                  className="relative"
                  whileFocus={{ scale: 1.005 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-200 outline-none"
                    placeholder="Enter your access code..."
                    required
                  />
                </motion.div>
              </div>

              {/* Password field */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <LockClosedIcon className="w-4 h-4 mr-2 text-emerald-500" />
                  Security Key
                </label>
                <motion.div 
                  className="relative"
                  whileFocus={{ scale: 1.005 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-200 outline-none"
                    placeholder="Enter your security key..."
                    required
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showPassword ? 
                      <EyeSlashIcon className="w-5 h-5" /> : 
                      <EyeIcon className="w-5 h-5" />
                    }
                  </motion.button>
                </motion.div>
              </div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hint */}
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-700 text-sm"
                  >
                    <div className="flex items-start space-x-2">
                      <SparklesIcon className="w-4 h-4 mt-0.5 text-emerald-500" />
                      <div>
                        <p className="font-medium mb-2">Access Hint:</p>
                        <p className="text-xs text-slate-600">
                          Username: <span className="font-mono bg-white px-2 py-1 rounded border">bahtsulmasail</span><br />
                          Password: <span className="font-mono bg-white px-2 py-1 rounded border mt-1 inline-block">airesearch</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl relative overflow-hidden"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <LockClosedIcon className="w-5 h-5" />
                      <span>Access Pitch Deck</span>
                    </>
                  )}
                </span>
              </motion.button>
            </motion.form>

            {/* Footer */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-xs text-slate-400">
                Secured by BahtsulMasail.tech • AI-Powered Islamic Research
              </p>
              <motion.div 
                className="mt-3 flex justify-center space-x-1"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* CSS for shake animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
} 