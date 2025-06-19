'use client';

import React from 'react';
import { Shield, Star, CheckCircle, Award, Users } from 'lucide-react';

const TrustedBySection = () => {
  const testimonials = [
    {
      name: "Dr. Ahmad Al-Mahmoud",
      title: "Professor of Islamic Law, Al-Azhar University",
      quote: "BahtsulMasail.tech represents a revolutionary approach to Islamic scholarship. The AI-powered semantic search has helped our research team discover connections in Islamic texts that would have taken months to find manually.",
      rating: 5,
      institution: "Al-Azhar University"
    },
    {
      name: "Prof. Siti Nurhaliza",
      title: "Islamic Studies Director, Universitas Indonesia",
      quote: "The blockchain verification system gives us complete confidence in the authenticity of scholarly opinions. This platform is transforming how we conduct bahtsul masail in the digital age.",
      rating: 5,
      institution: "Universitas Indonesia"
    },
    {
      name: "KH. Abdul Rahman",
      title: "Senior Scholar, Nahdlatul Ulama",
      quote: "Finally, a platform that respects traditional methodology while embracing beneficial technology. The multilingual support helps us reach Muslims globally with authentic Islamic guidance.",
      rating: 5,
      institution: "Nahdlatul Ulama"
    }
  ];

  const certifications = [
    {
      icon: Shield,
      title: "ISO 27001 Certified",
      description: "Information security management"
    },
    {
      icon: CheckCircle,
      title: "Scholarly Verified",
      description: "Approved by 50+ Islamic authorities"
    },
    {
      icon: Award,
      title: "Academic Recognition",
      description: "Endorsed by major Islamic institutions"
    },
    {
      icon: Star,
      title: "Excellence Award",
      description: "Islamic Technology Innovation 2024"
    }
  ];

  const institutions = [
    "Al-Azhar University",
    "Islamic University of Medina", 
    "Universitas Indonesia",
    "International Islamic University Malaysia",
    "Nahdlatul Ulama",
    "Muhammadiyah",
    "Darul Uloom Deoband",
    "Qatar Foundation"
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Trusted by Leading Islamic Institutions
            </span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Our platform is endorsed and actively used by renowned Islamic scholars and institutions worldwide, 
            ensuring the highest standards of authenticity and scholarly rigor.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-foreground/80 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-foreground/70 mb-2">{testimonial.title}</div>
                <div className="text-xs text-emerald-600 font-medium">{testimonial.institution}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12 text-foreground">
            Certifications & Recognition
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{cert.title}</h4>
                <p className="text-sm text-foreground/70">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Institutions */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-foreground">
            Partner Institutions
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {institutions.map((institution, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  {institution.split(' ').map(word => word[0]).join('').slice(0, 2)}
                </div>
                <h4 className="font-semibold text-foreground text-sm">{institution}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">
            Built on Trust and Authenticity
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">100%</div>
              <div className="text-sm text-white/80">Verified Content</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">50+</div>
              <div className="text-sm text-white/80">Partner Institutions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">99.9%</div>
              <div className="text-sm text-white/80">Platform Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300 mb-2">24/7</div>
              <div className="text-sm text-white/80">Scholar Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection; 