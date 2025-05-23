import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  badgeText?: string;
  variant?: "green-gold" | "blue-purple" | "gold-green" | "teal-blue";
}

const PageHeader = ({
  title,
  description,
  children,
  className,
  badgeText = "Bahtsul Masail",
  variant = "green-gold"
}: PageHeaderProps) => {
  const getGradientClass = (): string => {
    switch (variant) {
      case "blue-purple":
        return "bg-gradient-islamic-blue-purple";
      case "gold-green":
        return "bg-gradient-islamic-gold-green";
      case "teal-blue":
        return "bg-gradient-islamic-teal-blue";
      case "green-gold":
      default:
        return "bg-gradient-islamic-green-gold";
    }
  };

  return (
    <motion.div 
      className={cn(
        getGradientClass(),
        "rounded-2xl p-8 md:p-12 mb-10 relative overflow-hidden",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 right-0 bg-blur-circle-gold"></div>
      <div className="relative z-10">
        {badgeText && (
          <span className="inline-block py-1 px-3 bg-islamic-green/20 text-islamic-green rounded-full text-sm font-medium mb-4">
            {badgeText}
          </span>
        )}
        <h1 className="heading-islamic-gradient mb-6">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PageHeader; 