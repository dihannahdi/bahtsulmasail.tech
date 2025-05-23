"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LoadingTypographic } from "./loading-typographic";
import { Spinner } from "./spinner";

export interface PageLoaderProps {
  show?: boolean;
  className?: string;
}

export function PageLoader({ show = true, className }: PageLoaderProps) {
  const [isVisible, setIsVisible] = useState(show);
  
  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
            className
          )}
        >
          <div className="flex flex-col items-center">
            <LoadingTypographic size="lg" showLine={true} animate={true} />
            
            <div className="mt-6">
              <Spinner size="sm" variant="dual" color="green" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 