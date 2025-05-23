"use client";

import React, { ReactNode, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { PageLoader } from "../ui/page-loader";

interface MainLayoutProps {
  children: ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      when: "beforeChildren",
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first visit in this session
    const isFirstVisit = !sessionStorage.getItem('hasVisitedBefore');
    
    // Show longer loading time for first visits
    const loadingTime = isFirstVisit ? 2500 : 1200;
    
    const timer = setTimeout(() => {
      setLoading(false);
      // Set the flag for future visits
      sessionStorage.setItem('hasVisitedBefore', 'true');
    }, loadingTime);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden">
      {/* Page Loader */}
      <PageLoader show={loading} />
      
      {/* Background decoration elements */}
      <div className="fixed top-0 right-0 pointer-events-none opacity-30 dark:opacity-10">
        <div className="bg-blur-circle-gold top-0 right-0"></div>
      </div>
      <div className="fixed bottom-0 left-0 pointer-events-none opacity-30 dark:opacity-10">
        <div className="bg-blur-circle-green bottom-0 left-0"></div>
      </div>
      <div className="fixed top-1/2 left-1/4 pointer-events-none opacity-20 dark:opacity-10">
        <div className="bg-blur-circle-blue top-0 left-0"></div>
      </div>
      
      {/* Pattern overlay */}
      <div className="fixed inset-0 pattern-bg opacity-30 pointer-events-none"></div>
      
      <Navbar />
      <motion.main 
        className="flex-1 pt-16 relative z-10" // pt-16 ensures content starts below the navbar
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default MainLayout;
