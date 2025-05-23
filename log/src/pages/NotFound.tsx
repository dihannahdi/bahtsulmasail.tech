import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    // Update document title
    document.title = '404 - Page Not Found | Islamic Insight Nexus';
  }, []);
  
  // Animation variants for geometric patterns
  const patternVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };
  
  // Animation for text elements
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        delay: custom * 0.2,
        duration: 0.8, 
        ease: "easeOut" 
      }
    })
  };
  
  // Animation for the calligraphy element
  const calligraphyVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 0.5,
        duration: 1.2, 
        ease: [0.175, 0.885, 0.32, 1.275] // Custom easing for an elegant effect
      }
    }
  };
  
  // Navigation buttons animation
  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        delay: 1.2,
        duration: 0.6 
      }
    },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative geometric patterns - common in Islamic art */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={patternVariants}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Islamic-style border and decoration */}
      <motion.div 
        className="absolute inset-0 z-0" 
        initial="hidden"
        animate="visible"
        variants={patternVariants}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="z-10 relative text-center px-6 max-w-2xl">
        {/* Stylized Arabic number 404 */}
        <motion.div 
          className="mb-8 flex justify-center"
          initial="hidden"
          animate="visible"
          variants={calligraphyVariants}
        >
          <svg 
            viewBox="0 0 200 100" 
            width="200" 
            height="100"
            className="fill-primary h-32 w-auto"
          >
            <path d="M40,20 C40,10 50,10 50,20 L50,80 C50,90 40,90 40,80 L40,20 Z M70,20 C70,10 60,10 60,20 L60,80 C60,90 70,90 70,80 L70,20 Z M90,50 C90,30 120,30 120,50 C120,70 90,70 90,50 Z M140,20 C140,10 150,10 150,20 L150,80 C150,90 140,90 140,80 L140,20 Z" />
          </svg>
        </motion.div>
        
        {/* Arabic calligraphy for "Page Not Found" */}
        <motion.div 
          className="mb-6"
          initial="hidden"
          animate="visible"
          variants={calligraphyVariants}
        >
          <svg 
            viewBox="0 0 300 60" 
            width="300" 
            height="60"
            className="fill-primary/80 h-16 w-auto mx-auto"
          >
            <path d="M30,40 C40,20 60,20 70,40 C80,60 100,60 110,40 M140,20 C140,40 160,40 160,20 M190,40 C200,20 220,20 230,40 C240,60 260,60 270,40" />
          </svg>
        </motion.div>
        
        {/* Text content */}
        <motion.h1 
          className="text-4xl font-bold tracking-tighter mb-4"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Page Not Found
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground mb-8 leading-relaxed"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          The page you are looking for may have been moved, deleted, or perhaps never existed. 
          Let us guide you back to the right path.
        </motion.p>
        
        {/* Navigation buttons */}
        <motion.div 
          className="flex flex-wrap gap-4 justify-center"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button 
              variant="default" 
              size="lg" 
              asChild
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
