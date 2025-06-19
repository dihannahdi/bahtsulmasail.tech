'use client';

import React, { useState } from 'react';
import { Brain, Search, Shield, Zap, Database, Globe, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';

const TechnologyShowcaseSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const techFeatures = [
    {
      icon: Search,
      title: "AI-Powered Semantic Search",
      description: "Advanced Natural Language Processing specifically trained on Islamic texts and Arabic language nuances",
      details: [
        "Contextual understanding of classical Arabic",
        "Cross-referencing across multiple schools of thought",
        "Intelligent query interpretation and expansion",
        "Real-time search across 1000+ authenticated texts"
      ],
      demoQuery: "What is the ruling on cryptocurrency trading?",
      demoResult: "Found 12 relevant scholarly opinions across 4 madhabs with 94% confidence"
    },
    {
      icon: Shield,
      title: "Blockchain Authentication",
      description: "Cryptographically secure verification system ensuring the integrity and authenticity of every scholarly opinion",
      details: [
        "Immutable record of scholarly contributions",
        "Tamper-proof fatwa authentication",
        "Transparent chain of scholarly approval",
        "Decentralized verification network"
      ],
      demoQuery: "Verify fatwa authenticity",
      demoResult: "✓ Verified by 3 scholars, blockchain hash: 0x2a8f9b..."
    },
    {
      icon: Brain,
      title: "Advanced Arabic NLP",
      description: "Sophisticated linguistic analysis designed specifically for Quranic and Hadith interpretation",
      details: [
        "Classical Arabic morphological analysis",
        "Contextual meaning extraction",
        "Hadith chain (isnad) verification",
        "Multi-dialect Arabic comprehension"
      ],
      demoQuery: "Analyze hadith authenticity",
      demoResult: "Strong chain (sahih) - 95% confidence based on narrator analysis"
    },
    {
      icon: Database,
      title: "Comprehensive Knowledge Graph",
      description: "Intelligent connections between Islamic concepts, creating a living map of Islamic knowledge",
      details: [
        "Interconnected Islamic concept mapping",
        "Automated precedent discovery",
        "Cross-madhab comparison engine",
        "Historical development tracking"
      ],
      demoQuery: "Show related concepts for 'Riba'",
      demoResult: "Connected to: Interest, Banking, Trade, Gharar (32 connections found)"
    }
  ];

  const performanceMetrics = [
    { label: "Search Speed", value: "<0.5s", description: "Average response time" },
    { label: "Accuracy", value: "94%", description: "Semantic search precision" },
    { label: "Languages", value: "4+", description: "Arabic, English, Indonesian, Malay" },
    { label: "Uptime", value: "99.9%", description: "Platform availability" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-gray-50 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Technology That Serves Tradition
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Our AI technology is specifically designed to enhance, not replace, traditional Islamic scholarship. 
            Every feature respects and preserves the integrity of Islamic legal methodology.
          </p>
        </div>

        {/* Interactive Technology Demo */}
        <div className="mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Feature Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200 dark:border-gray-700">
              {techFeatures.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`p-6 text-left transition-all ${
                    activeFeature === index 
                      ? "bg-blue-50 dark:bg-blue-900/20 border-b-2 border-blue-600" 
                      : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <feature.icon className={`w-8 h-8 mb-3 ${
                    activeFeature === index ? "text-blue-600" : "text-gray-600"
                  }`} />
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-foreground/60">{feature.description}</p>
                </button>
              ))}
            </div>

            {/* Feature Content */}
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    {techFeatures[activeFeature].title}
                  </h3>
                  <p className="text-foreground/70 mb-8 leading-relaxed">
                    {techFeatures[activeFeature].description}
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    {techFeatures[activeFeature].details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronDown className="w-5 h-5 text-blue-600 mr-3 mt-0.5 rotate-[-90deg]" />
                        <span className="text-foreground/80">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Demo Interface */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                  <div className="mb-4">
                    <label className="text-sm font-medium text-foreground/70 mb-2 block">Demo Query:</label>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <p className="text-foreground">{techFeatures[activeFeature].demoQuery}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="text-sm font-medium text-foreground/70 mb-2 block">AI Response:</label>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <p className="text-blue-800 dark:text-blue-200">{techFeatures[activeFeature].demoResult}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-foreground/50">
                    <span>Response time: 0.3s</span>
                    <span>Confidence: 94%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
              <div className="font-semibold text-foreground mb-1">{metric.label}</div>
              <div className="text-sm text-foreground/60">{metric.description}</div>
            </div>
          ))}
        </div>

        {/* Technology Stack Showcase */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Built with Cutting-Edge Technology
            </h3>
            <p className="text-white/90 max-w-2xl mx-auto">
              Our platform leverages the latest advances in AI and blockchain technology, 
              specifically adapted for Islamic scholarship and Arabic language processing.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Neural Networks</h4>
              <p className="text-sm text-white/80">Advanced deep learning models</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Blockchain</h4>
              <p className="text-sm text-white/80">Immutable authentication</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Real-time</h4>
              <p className="text-sm text-white/80">Instant collaboration</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Global Scale</h4>
              <p className="text-sm text-white/80">Worldwide accessibility</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcaseSection; 