'use client';

import React from 'react';
import { ArrowRight, BookOpen, Users, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToActionSection = () => {
  const actionCards = [
    {
      icon: BookOpen,
      title: "For Scholars",
      description: "Join our network of verified Islamic scholars and contribute to global knowledge",
      actionText: "Apply to Join",
      benefits: ["Blockchain verification", "Global reach", "Scholarly recognition"]
    },
    {
      icon: Users,
      title: "For Students",
      description: "Access authenticated Islamic knowledge and learn from verified sources",
      actionText: "Start Learning",
      benefits: ["Verified content", "Multi-language", "24/7 access"]
    },
    {
      icon: Shield,
      title: "For Institutions",
      description: "Partner with us to digitize and authenticate your scholarly collections",
      actionText: "Partner With Us",
      benefits: ["Institutional access", "Custom solutions", "API integration"]
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-emerald-50 dark:to-emerald-950/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main CTA Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-8">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Ready to Transform Islamic Scholarship?</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Join the Revolution
            </span>
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-12 leading-relaxed">
            Be part of the future of Islamic scholarship. Whether you're a scholar, student, or institution, 
            BahtsulMasail.tech offers the tools to preserve, authenticate, and share Islamic knowledge globally.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all group"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-12 py-6 text-lg rounded-xl"
            >
              Watch Platform Demo
            </Button>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {actionCards.map((card, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <card.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4 text-center">{card.title}</h3>
              <p className="text-foreground/70 mb-6 text-center">{card.description}</p>
              
              <ul className="space-y-2 mb-8">
                {card.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-foreground/80">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                    {benefit}
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl group"
              >
                {card.actionText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with Islamic Knowledge Innovation
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Get the latest updates on new features, scholarly content, and platform developments. 
            Join thousands of scholars and students in our community.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder:text-gray-500 border-0 focus:ring-2 focus:ring-white/20"
              />
              <Button 
                className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold whitespace-nowrap"
              >
                Subscribe Now
              </Button>
            </div>
            <p className="text-xs text-white/70 mt-3">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>

        {/* Final Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
            <div className="text-sm text-foreground/60">Platform Access</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">10,000+</div>
            <div className="text-sm text-foreground/60">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">50+</div>
            <div className="text-sm text-foreground/60">Countries Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">1000+</div>
            <div className="text-sm text-foreground/60">Authenticated Texts</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection; 