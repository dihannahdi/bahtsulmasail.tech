'use client';

import React from 'react';
import { Search, Shield, Brain, Users, Globe, BookOpen, Zap, Award } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "AI-Powered Semantic Search",
      description: "Revolutionary search technology that understands context and meaning in Islamic texts, not just keywords.",
      details: ["Natural language queries", "Cross-reference discovery", "Multi-madhab analysis", "Real-time results"],
      color: "emerald"
    },
    {
      icon: Shield,
      title: "Blockchain Authentication",
      description: "Cryptographically secure verification ensuring every scholarly opinion is authentic and tamper-proof.",
      details: ["Immutable records", "Scholar verification", "Chain of approval", "Transparent provenance"],
      color: "blue"
    },
    {
      icon: Brain,
      title: "Advanced Arabic NLP",
      description: "Sophisticated Natural Language Processing specifically trained on classical and modern Arabic texts.",
      details: ["Morphological analysis", "Contextual understanding", "Dialect recognition", "Quranic interpretation"],
      color: "purple"
    },
    {
      icon: Users,
      title: "Global Scholar Network",
      description: "Connect with verified Islamic scholars worldwide for real-time collaboration and knowledge sharing.",
      details: ["50+ verified scholars", "Real-time collaboration", "Peer review system", "Global accessibility"],
      color: "green"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Access Islamic knowledge in multiple languages with accurate translations and cultural context.",
      details: ["4+ languages supported", "Cultural localization", "Native script support", "Regional expertise"],
      color: "teal"
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Lightning-fast search and analysis powered by cutting-edge AI infrastructure.",
      details: ["<0.5s response time", "99.9% uptime", "Scalable architecture", "Cloud-native design"],
      color: "orange"
    }
  ];

  const useCases = [
    {
      title: "Academic Research",
      description: "Comprehensive research tools for Islamic studies scholars and students",
      icon: BookOpen,
      stats: "1000+ research papers supported"
    },
    {
      title: "Fatwa Verification",
      description: "Authenticate and cross-reference religious rulings with blockchain security",
      icon: Award,
      stats: "100% verified content"
    },
    {
      title: "Educational Resources",
      description: "Structured learning materials for Islamic institutions worldwide",
      icon: Users,
      stats: "50+ institutions partnered"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: "from-emerald-500 to-emerald-600 border-emerald-200 dark:border-emerald-800",
      blue: "from-blue-500 to-blue-600 border-blue-200 dark:border-blue-800",
      purple: "from-purple-500 to-purple-600 border-purple-200 dark:border-purple-800",
      green: "from-green-500 to-green-600 border-green-200 dark:border-green-800",
      teal: "from-teal-500 to-teal-600 border-teal-200 dark:border-teal-800",
      orange: "from-orange-500 to-orange-600 border-orange-200 dark:border-orange-800"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.emerald;
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Revolutionary Features
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Discover how cutting-edge AI technology enhances traditional Islamic scholarship, 
            making authentic knowledge more accessible and verifiable than ever before.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all group hover:-translate-y-1"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${getColorClasses(feature.color)} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform border`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4 text-center">{feature.title}</h3>
              <p className="text-foreground/70 mb-6 text-center leading-relaxed">{feature.description}</p>
              
              <ul className="space-y-3">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm text-foreground/80">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Use Cases Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-foreground">
            Transforming Islamic Scholarship Across Disciplines
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-emerald-100 dark:border-emerald-800 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <useCase.icon className="w-8 h-8 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-foreground mb-4">{useCase.title}</h4>
                <p className="text-foreground/70 mb-4">{useCase.description}</p>
                <div className="text-sm text-emerald-600 font-semibold">{useCase.stats}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Highlight */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            The Future of Islamic Knowledge Management
          </h3>
          <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Our platform represents the convergence of traditional Islamic scholarship with modern technology, 
            creating unprecedented opportunities for knowledge preservation, verification, and dissemination.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-2">94%</div>
              <div className="text-sm text-white/80">Search Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-2">0.5s</div>
              <div className="text-sm text-white/80">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-2">4+</div>
              <div className="text-sm text-white/80">Languages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-300 mb-2">24/7</div>
              <div className="text-sm text-white/80">Availability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 