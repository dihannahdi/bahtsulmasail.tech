'use client';

import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 geometric-pattern opacity-10" />
      
      {/* Main Content */}
      <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-text">
              Bahtsul Masail untuk
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                {" "}Islam Digdaya
              </span>
            </h1>
            
            <p className="arabic-text mt-4">
              منبر الحكمة
            </p>
            
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the depths of Islamic legal reasoning with clarity and confidence.
              Join us in fostering an enlightened understanding for a vibrant future.
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for wisdom..."
                className="search-input"
              />
              <MagnifyingGlassIcon className="search-icon h-6 w-6" />
            </div>

            {/* Search Suggestions */}
            <motion.div 
              className="mt-4 flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button className="px-4 py-2 rounded-full bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors">
                Fiqh
              </button>
              <button className="px-4 py-2 rounded-full bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors">
                Contemporary Issues
              </button>
              <button className="px-4 py-2 rounded-full bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors">
                Islamic Ethics
              </button>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
              <h3 className="text-xl font-semibold text-primary-900">Intellectual Heritage</h3>
              <p className="mt-2 text-gray-600">Access centuries of Islamic scholarly wisdom through modern technology.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
              <h3 className="text-xl font-semibold text-primary-900">Contemporary Relevance</h3>
              <p className="mt-2 text-gray-600">Bridge classical knowledge with modern challenges and opportunities.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
              <h3 className="text-xl font-semibold text-primary-900">Global Community</h3>
              <p className="mt-2 text-gray-600">Connect with scholars and learners worldwide in pursuit of knowledge.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
