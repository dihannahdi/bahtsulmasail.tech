'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { containerVariant, fadeUp } from '@/lib/animations';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import ScholarlyQuoteSection from '@/components/home/ScholarlyQuoteSection';
import RecentDocumentsSection from '@/components/home/RecentDocumentsSection';
// import TestimonialsSection from '@/components/home/TestimonialsSection'; // Removed import
import CallToActionSection from '@/components/home/CallToActionSection';

// Placeholder components for each section
// We will create these actual components based on the Vite project next.
// const RecentDocumentsSection = () => <div className="min-h-[70vh] bg-secondary/10 flex items-center justify-center text-3xl font-bold text-secondary-foreground">Recent Documents Placeholder</div>; // Removed placeholder

const HomePage = () => {
  const featuresRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });
  
  const categoriesRef = useRef(null);
  const isCategoriesInView = useInView(categoriesRef, { once: true, amount: 0.2 });
  
  const quoteRef = useRef(null);
  const isQuoteInView = useInView(quoteRef, { once: true, amount: 0.3 });
  
  const documentsRef = useRef(null);
  const isDocumentsInView = useInView(documentsRef, { once: true, amount: 0.2 });
  
  // const testimonialsRef = useRef(null); // Removed ref
  // const isTestimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 }); // Removed inView hook
  
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.4 });

  return (
    <motion.div
      className="w-full"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      <motion.div>
        <HeroSection />
      </motion.div>
      
      <motion.div
        ref={featuresRef}
        initial="hidden"
        animate={isFeaturesInView ? "visible" : "hidden"}
        variants={fadeUp}
        className="my-4 md:my-6 lg:my-8" // Halved spacing
      >
        <FeaturesSection />
      </motion.div>
      
      <motion.div
        ref={categoriesRef}
        initial="hidden"
        animate={isCategoriesInView ? "visible" : "hidden"}
        variants={fadeUp}
        className="my-4 md:my-6 lg:my-8" // Halved spacing
      >
        <CategoriesSection />
      </motion.div>
      
      <motion.div
        ref={quoteRef}
        initial="hidden"
        animate={isQuoteInView ? "visible" : "hidden"}
        variants={fadeUp}
        className="my-4 md:my-6 lg:my-8" // Halved spacing
      >
        <ScholarlyQuoteSection />
      </motion.div>
      
      <motion.div
        ref={documentsRef}
        initial="hidden"
        animate={isDocumentsInView ? "visible" : "hidden"}
        variants={fadeUp}
        className="my-4 md:my-6 lg:my-8" // Halved spacing
      >
        <RecentDocumentsSection />
      </motion.div>
      
      {/* Removed TestimonialsSection usage */}
      {/* 
      <motion.div
        ref={testimonialsRef}
        initial="hidden"
        animate={isTestimonialsInView ? "visible" : "hidden"}
        variants={fadeUp}
        className="my-4 md:my-6 lg:my-8"
      >
        <TestimonialsSection />
      </motion.div>
      */}
      
      <motion.div
        ref={ctaRef}
        initial="hidden"
        animate={isCtaInView ? "visible" : "hidden"}
        variants={fadeUp}
        className="my-4 md:my-6 lg:my-8" // Halved spacing
      >
        <CallToActionSection />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
