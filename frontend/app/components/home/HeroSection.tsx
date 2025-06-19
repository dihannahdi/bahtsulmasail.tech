'use client';

import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Users, Shield, Globe, ChevronRight, Sparkles, Verified } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentExample, setCurrentExample] = useState(0);
  const [particles, setParticles] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([]);
  
  const searchExamples = [
    { query: "حكم البيع بالتقسيط", category: "Financial Jurisprudence", translation: "Ruling on installment sales" },
    { query: "أحكام الصلاة في السفر", category: "Worship", translation: "Prayer rulings while traveling" },
    { query: "زكاة الأسهم والاستثمارات", category: "Zakat Law", translation: "Zakat on stocks and investments" },
    { query: "مقاصد الشريعة في المعاملات", category: "Principles", translation: "Objectives of Sharia in transactions" }
  ];

  const trustIndicators = [
    { icon: Shield, label: "Blockchain Verified", description: "Cryptographically secured scholarly opinions" },
    { icon: Users, label: "50+ Verified Scholars", description: "Global network of certified Islamic authorities" },
    { icon: BookOpen, label: "1000+ Authentic Texts", description: "Comprehensive Islamic legal corpus" },
    { icon: Globe, label: "Multi-Language Support", description: "Arabic, English, Indonesian, Malay" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % searchExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate particles only on client-side to avoid hydration mismatch
    const generatedParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 2}s`
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-emerald-50/20 to-background dark:from-background dark:via-emerald-950/20 dark:to-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Islamic Patterns */}
        <div className="absolute top-20 left-10 w-64 h-64 opacity-10 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="currentColor" className="text-emerald-500" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#islamic-pattern)" />
          </svg>
        </div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-emerald-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-blue-500/15 to-transparent rounded-full blur-3xl animate-pulse animation-delay-1000" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/30 rounded-full animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Revolutionary Islamic AI Platform</span>
          <Verified className="w-4 h-4 text-emerald-600" />
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up">
          <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent">
            BahtsulMasail
          </span>
          <span className="block text-3xl md:text-4xl lg:text-5xl font-medium text-foreground/80 mt-4">
            Where Tradition Meets Innovation
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-foreground/70 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
          The world's first AI-powered Islamic legal discourse platform, preserving traditional scholarly methodologies 
          while enabling global collaboration through cutting-edge technology.
        </p>

        {/* Semantic Search Showcase */}
        <div className="max-w-4xl mx-auto mb-16 animate-fade-in-up animation-delay-400">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-2xl p-8">
            <h3 className="text-lg font-semibold mb-4 text-foreground/90">Experience AI-Powered Semantic Search</h3>
            
            {/* Search Interface */}
            <div className="relative mb-6">
              <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-emerald-200 dark:border-emerald-700 p-4 focus-within:border-emerald-500 transition-colors">
                <Search className="w-6 h-6 text-emerald-600 mr-4" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search across 1000+ Islamic texts using natural language..."
                  className="flex-1 border-0 bg-transparent text-lg placeholder:text-gray-500 focus-visible:ring-0"
                />
                <Button className="ml-4 bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                  Search
                </Button>
              </div>
            </div>

            {/* Example Queries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchExamples.map((example, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all duration-500 cursor-pointer ${
                    index === currentExample
                      ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg"
                      : "border-gray-200 dark:border-gray-700 hover:border-emerald-300"
                  }`}
                  onClick={() => setCurrentExample(index)}
                >
                  <div className="text-right mb-2">
                    <span className="font-arabic text-lg text-foreground">{example.query}</span>
                  </div>
                  <div className="text-left text-sm text-foreground/70">{example.translation}</div>
                  <div className="text-xs text-emerald-600 mt-1">{example.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16 animate-fade-in-up animation-delay-600">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <indicator.icon className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{indicator.label}</h4>
              <p className="text-sm text-foreground/60">{indicator.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-800">
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all group"
          >
            Explore Platform
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-8 py-4 text-lg rounded-xl"
          >
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-fade-in-up animation-delay-1000">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">1000+</div>
            <div className="text-sm text-foreground/60">Islamic Texts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">50+</div>
            <div className="text-sm text-foreground/60">Verified Scholars</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">24/7</div>
            <div className="text-sm text-foreground/60">Platform Availability</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 