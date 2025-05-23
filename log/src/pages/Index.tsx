"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import ScholarlyQuoteSection from "@/components/home/ScholarlyQuoteSection";
import RecentDocumentsSection from "@/components/home/RecentDocumentsSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import { containerVariant, fadeUp } from "@/lib/animations";

const Index = () => {
  // Create refs for scroll animations
  const featuresRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 });
  
  const categoriesRef = useRef(null);
  const isCategoriesInView = useInView(categoriesRef, { once: true, amount: 0.2 });
  
  const quoteRef = useRef(null);
  const isQuoteInView = useInView(quoteRef, { once: true, amount: 0.3 });
  
  const documentsRef = useRef(null);
  const isDocumentsInView = useInView(documentsRef, { once: true, amount: 0.2 });
  
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.4 });

  return (
    <MainLayout>
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp}>
          <HeroSection />
        </motion.div>
        
        <motion.div
          ref={featuresRef}
          initial="hidden"
          animate={isFeaturesInView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <FeaturesSection />
        </motion.div>
        
        <motion.div
          ref={categoriesRef}
          initial="hidden"
          animate={isCategoriesInView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <CategoriesSection />
        </motion.div>
        
        <motion.div
          ref={quoteRef}
          initial="hidden"
          animate={isQuoteInView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <ScholarlyQuoteSection />
        </motion.div>
        
        <motion.div
          ref={documentsRef}
          initial="hidden"
          animate={isDocumentsInView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <RecentDocumentsSection />
        </motion.div>
        
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={isCtaInView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <CallToActionSection />
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default Index;
