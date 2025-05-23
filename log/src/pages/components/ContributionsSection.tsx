import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ContributionsSectionProps {
  textSize: 'normal' | 'large';
  theme: 'light' | 'dark';
}

export const ContributionsSection = forwardRef<HTMLDivElement, ContributionsSectionProps>(
  ({ textSize, theme }, ref) => {
    return (
      <motion.section
        ref={ref}
        id="contributions"
        className="mb-24 scroll-mt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        {/* Section Header with Gradient Background */}
        <motion.div
          className={cn(
            "px-6 py-8 rounded-2xl mb-12 relative overflow-hidden",
            theme === 'light' 
              ? "bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50" 
              : "bg-gradient-to-br from-emerald-900/30 via-teal-900/20 to-blue-900/20"
          )}
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-500/10 to-blue-500/10 dark:from-emerald-500/5 dark:to-blue-500/5 translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gradient-to-br from-teal-500/10 to-yellow-500/10 dark:from-teal-500/5 dark:to-yellow-500/5 -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/pattern-islamic.svg')] bg-repeat opacity-5"></div>
          
          <div className="relative z-10">
            <h2 
              className={cn(
                "font-serif text-center mb-4",
                textSize === 'normal' ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl",
                theme === 'light' ? "text-slate-900" : "text-white"
              )}
            >
              Kontribusi Bahtsul Masail bagi Indonesia
            </h2>
            
            <p 
              className={cn(
                "max-w-3xl mx-auto text-center",
                textSize === 'normal' ? "text-base" : "text-lg",
                theme === 'light' ? "text-slate-600" : "text-slate-300"
              )}
            >
              Dampak dan kontribusi forum Bahtsul Masail terhadap kehidupan berbangsa dan bernegara di Indonesia
            </p>
          </div>
        </motion.div>
        
        {/* Contribution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ContributionCard
            title="Penjaga Moderasi Beragama"
            content="Melalui 412 fatwa sejak 1926, LBM NU melegitimasi tradisi selamatan dan ziarah kubur yang berhasil meredam gerakan puritan, serta menolak takfir (pengkafiran) terhadap pemerintah Indonesia."
            icon="⚖️"
            theme={theme}
            textSize={textSize}
            index={0}
          />
          
          <ContributionCard
            title="Jembatan Hukum & Negara"
            content="Memberikan dasar fikih untuk UU Perkawinan (1974) dengan konsep 'urf (tradisi sah) dan merumuskan prinsip darurat syar'iyyah sebagai dasar legalitas bank syariah di Indonesia."
            icon="🏛️"
            theme={theme}
            textSize={textSize}
            index={1}
          />
          
          <ContributionCard
            title="Preservasi Khazanah"
            content="Dengan menjaga referensi ke 1.200 kitab kuning dari berbagai mazhab, Bahtsul Masail mencegah reduksionisme dalam memahami teks agama, mempertahankan tradisi isnad keilmuan."
            icon="📚"
            theme={theme}
            textSize={textSize}
            index={2}
          />
        </div>
      </motion.section>
    );
  }
);

interface ContributionCardProps {
  title: string;
  content: string;
  icon: string;
  theme: 'light' | 'dark';
  textSize: 'normal' | 'large';
  index: number;
}

const ContributionCard: React.FC<ContributionCardProps> = ({
  title,
  content,
  icon,
  theme,
  textSize,
  index
}) => {
  // Different colors for different cards
  const gradients = [
    "from-emerald-500 to-green-600", // First card
    "from-blue-500 to-indigo-600",   // Second card
    "from-amber-500 to-yellow-600"   // Third card
  ];
  
  return (
    <motion.div
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300",
        theme === 'light' 
          ? "bg-white shadow-lg" 
          : "bg-slate-800/50 shadow-emerald-900/5 shadow-lg"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -6px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Card Top Accent */}
      <div className={`h-2 w-full bg-gradient-to-r ${gradients[index]}`}></div>
      
      {/* Card Content */}
      <div className="p-6">
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <motion.div 
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4",
              "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900",
              "shadow-md"
            )}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          
          {/* Title */}
          <h3 
            className={cn(
              "font-serif mb-3",
              textSize === 'normal' ? "text-xl" : "text-2xl",
              theme === 'light' ? "text-slate-900" : "text-white"
            )}
          >
            {title}
          </h3>
          
          {/* Content */}
          <p
            className={cn(
              "text-center",
              textSize === 'normal' ? "text-sm" : "text-base",
              theme === 'light' ? "text-slate-600" : "text-slate-300"
            )}
          >
            {content}
          </p>
        </div>
      </div>
      
      {/* Card Bottom Decoration */}
      <div className="px-6 pb-6 pt-2">
        <div 
          className={cn(
            "h-1 w-16 mx-auto rounded-full",
            `bg-gradient-to-r ${gradients[index]}/50`
          )}
        ></div>
      </div>
    </motion.div>
  );
};

ContributionsSection.displayName = 'ContributionsSection'; 