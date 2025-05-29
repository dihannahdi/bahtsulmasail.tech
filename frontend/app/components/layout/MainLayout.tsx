'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from '@/components/Footer';
import { containerVariant } from '@/lib/animations';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      <Navbar />
      
      <motion.main 
        className="flex-1 relative z-10"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default MainLayout; 