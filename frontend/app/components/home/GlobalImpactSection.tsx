'use client';

import React from 'react';
import { Globe, Users, BookOpen, Award, TrendingUp } from 'lucide-react';

const GlobalImpactSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-background dark:from-gray-900 dark:to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent">
              Global Islamic Knowledge Network
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Connecting Islamic scholars and students across continents, breaking down geographical barriers 
            to create a unified platform for authentic Islamic knowledge sharing.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">10,000+</div>
            <div className="font-semibold text-foreground mb-2">Active Users</div>
            <div className="text-sm text-foreground/60 mb-2">Scholars and students worldwide</div>
            <div className="text-xs text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +45% this quarter
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">50+</div>
            <div className="font-semibold text-foreground mb-2">Countries</div>
            <div className="text-sm text-foreground/60 mb-2">Global reach across continents</div>
            <div className="text-xs text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              New regions monthly
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">1,000+</div>
            <div className="font-semibold text-foreground mb-2">Texts Analyzed</div>
            <div className="text-sm text-foreground/60 mb-2">Authenticated Islamic sources</div>
            <div className="text-xs text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Growing daily
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">99.9%</div>
            <div className="font-semibold text-foreground mb-2">Accuracy Rate</div>
            <div className="text-sm text-foreground/60 mb-2">Scholarly verification</div>
            <div className="text-xs text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Continuously improving
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <Globe className="w-16 h-16 mx-auto mb-6 text-white/90" />
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Join the Global Islamic Knowledge Revolution
          </h3>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Be part of a worldwide community of Islamic scholars and students working together to preserve, 
            authenticate, and share Islamic knowledge for future generations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all">
              Join Scholar Network
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all">
              Start Learning Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalImpactSection; 