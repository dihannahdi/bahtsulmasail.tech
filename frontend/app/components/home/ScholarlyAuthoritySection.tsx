'use client';

import React from 'react';
import { Award, BookOpen, Users, CheckCircle, Star, Quote } from 'lucide-react';
// import { cn } from '@/lib/utils';

const ScholarlyAuthoritySection = () => {
  const scholarshipMethods = [
    {
      name: "Qauliy Method",
      nameArabic: "الطريقة القولية",
      description: "Traditional textual analysis and direct quotation methodology",
      icon: Quote,
      features: ["Direct text citations", "Authenticated chains", "Source verification"]
    },
    {
      name: "Ilhaqiy Method", 
      nameArabic: "الطريقة الإلحاقية",
      description: "Analogical reasoning and precedent-based jurisprudence",
      icon: BookOpen,
      features: ["Precedent matching", "Analogical reasoning", "Cross-referencing"]
    },
    {
      name: "Manhajiy Method",
      nameArabic: "الطريقة المنهجية", 
      description: "Systematic methodological approach to Islamic legal discourse",
      icon: Award,
      features: ["Systematic analysis", "Methodological consistency", "Scholarly consensus"]
    }
  ];

  const verifiedScholars = [
    {
      name: "Dr. Abdullah Al-Faqih",
      position: "Senior Mufti, Al-Azhar University",
      specialization: "Comparative Fiqh",
      country: "Egypt",
      verified: true
    },
    {
      name: "Prof. Yusuf Al-Qaradawi",
      position: "Islamic Scholar",
      specialization: "Contemporary Issues",
      country: "Qatar", 
      verified: true
    },
    {
      name: "Dr. Wahbah Al-Zuhayli",
      position: "Professor of Islamic Jurisprudence",
      specialization: "Hanafi School",
      country: "Syria",
      verified: true
    },
    {
      name: "KH. Ma'ruf Amin",
      position: "Chairman, Indonesian Ulema Council",
      specialization: "Indonesian Fiqh",
      country: "Indonesia",
      verified: true
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-emerald-50/30 to-background dark:from-emerald-950/20 dark:to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Preserving Scholarly Authority
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Our platform maintains the integrity of traditional Islamic scholarship methodologies 
            while leveraging technology to enhance accessibility and collaboration.
          </p>
        </div>

        {/* Traditional Methods */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12 text-foreground">
            Traditional Scholarly Methodologies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scholarshipMethods.map((method, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-emerald-100 dark:border-emerald-900/30 hover:shadow-xl transition-all group"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <method.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">{method.name}</h4>
                  <p className="font-arabic text-lg text-emerald-600 mb-4">{method.nameArabic}</p>
                  <p className="text-foreground/70">{method.description}</p>
                </div>
                
                <ul className="space-y-3">
                  {method.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-foreground/80">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Scholars Network */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Global Network of Verified Scholars
            </h3>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Our platform is trusted by leading Islamic scholars worldwide, ensuring authenticity and scholarly rigor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verifiedScholars.map((scholar, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {scholar.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex items-center justify-center mb-2">
                    <h4 className="font-semibold text-foreground">{scholar.name}</h4>
                    <CheckCircle className="w-4 h-4 text-emerald-600 ml-2" />
                  </div>
                  
                  <p className="text-sm text-foreground/70 mb-1">{scholar.position}</p>
                  <p className="text-xs text-emerald-600 mb-2">{scholar.specialization}</p>
                  <p className="text-xs text-foreground/50">{scholar.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <Star className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Uncompromising Quality Standards
            </h3>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Every scholarly opinion undergoes rigorous verification through our blockchain-secured authentication system, 
              ensuring the highest standards of Islamic legal discourse.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">100%</div>
                <div className="text-sm text-white/80">Verified Sources</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">50+</div>
                <div className="text-sm text-white/80">Scholar Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">24/7</div>
                <div className="text-sm text-white/80">Quality Monitoring</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">Zero</div>
                <div className="text-sm text-white/80">Unverified Content</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScholarlyAuthoritySection; 