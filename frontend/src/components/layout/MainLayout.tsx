'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer'; // We will create this component next
import { containerVariant } from '@/lib/animations'; // Using the one from our lib

interface MainLayoutProps {
  children: ReactNode;
  // pageLoaderShow?: boolean; // Optional: for page loader if we implement it
}

// const pageSpecificContainerVariants = { // This was in Vite's MainLayout, simpler than our lib's containerVariant
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.1,
//       when: "beforeChildren",
//       duration: 0.5,
//       ease: "easeOut"
//     }
//   }
// };

const MainLayout = ({ children }: MainLayoutProps) => {
  // Page loader state and logic can be added here later if desired
  // const [loading, setLoading] = useState(pageLoaderShow !== undefined ? pageLoaderShow : true);
  // useEffect for loader timer...

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-hidden antialiased">
      {/* Page Loader placeholder - to be implemented if needed */}
      {/* <PageLoader show={loading} /> */}
      
      {/* Background decoration elements from Vite project's MainLayout */}
      {/* These will be positioned by their own classes (.bg-blur-circle uses absolute) */}
      <div className="fixed top-0 right-0 pointer-events-none opacity-30 dark:opacity-10 z-0">
        <div className="bg-blur-circle-gold -mr-20 -mt-20"></div> {/* Re-added offsets from Vite CSS */}
      </div>
      <div className="fixed bottom-0 left-0 pointer-events-none opacity-30 dark:opacity-10 z-0">
        <div className="bg-blur-circle-green -ml-20 -mb-20"></div> {/* Re-added offsets based on Vite CSS */}
      </div>
      <div className="fixed top-1/3 left-1/4 pointer-events-none opacity-20 dark:opacity-10 z-0">
        {/* Note: original Vite MainLayout had top-1/2. Adjusted to top-1/3 for variation. */}
        <div className="bg-blur-circle-blue -ml-20 -mt-20"></div> {/* Re-added offsets */}
      </div>
      
      {/* Pattern overlay from Vite project's MainLayout */}
      <div className="fixed inset-0 pattern-bg opacity-30 pointer-events-none z-0"></div>
      
      <Navbar /> 
      
      <motion.main 
        className="flex-1 pt-0 sm:pt-0 relative z-10" // Adjusted pt to match Navbar height (h-16 sm:h-20)
        variants={containerVariant} // Using the more complex one from our lib for now
        initial="hidden"
        animate="visible"
        // transition={{ // Framer Motion gives good defaults if not specified
        //   type: "spring",
        //   stiffness: 100,
        //   damping: 15
        // }}
      >
        {children}
      </motion.main>
      
      <Footer /> 
    </div>
  );
};

export default MainLayout; 