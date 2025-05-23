import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface LoadingTypographicProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showLine?: boolean;
  animate?: boolean;
}

export function LoadingTypographic({ 
  className, 
  size = "md", 
  showLine = true,
  animate = true
}: LoadingTypographicProps) {
  const text = "BahtsulMasail.tech";
  const [key, setKey] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Reset animation periodically to loop the entire text animation
  useEffect(() => {
    if (!animate) return;
    
    const animationDuration = 2500; // Total animation time
    const totalCycleDuration = 6000; // Complete cycle duration
    
    const interval = setInterval(() => {
      // Start exit animation
      setIsAnimating(false);
      
      // Schedule next entrance after exit completes
      const timeout = setTimeout(() => {
        setKey(prevKey => prevKey + 1);
        setIsAnimating(true);
      }, animationDuration);
      
      return () => clearTimeout(timeout);
    }, totalCycleDuration);
    
    return () => clearInterval(interval);
  }, [animate]);
  
  const sizeClasses = {
    sm: "text-xl md:text-2xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-6xl"
  };
  
  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <AnimatePresence mode="wait">
        {isAnimating && (
          <motion.div
            key={key}
            className="flex overflow-hidden font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={cn("flex", sizeClasses[size])}>
              {text.split("").map((char, index) => {
                // Determine if this character is part of ".tech"
                const isDotTech = index >= text.indexOf(".");
                
                return (
                  <motion.span
                    key={`${char}-${index}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.4,
                        delay: index * 0.03,
                        ease: "easeOut"
                      }
                    }}
                    exit={{
                      opacity: 0,
                      y: -15,
                      transition: {
                        duration: 0.3,
                        delay: (text.length - index) * 0.02,
                        ease: "easeIn"
                      }
                    }}
                    className={cn(
                      isDotTech ? "text-islamic-gold" : "text-islamic-green"
                    )}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {showLine && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: [0, 1, 1, 0],
            transition: { 
              times: [0, 0.3, 0.7, 1],
              duration: 3,
              repeat: Infinity,
              repeatDelay: 0.2
            }
          }}
          className="h-0.5 w-full bg-islamic-green mt-2 origin-left"
        />
      )}
      
      <motion.div 
        animate={{
          opacity: [0.5, 1, 0.5],
          y: [0, -3, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="mt-2 text-islamic-green/80 text-xs"
      >
        Loading...
      </motion.div>
    </div>
  );
} 