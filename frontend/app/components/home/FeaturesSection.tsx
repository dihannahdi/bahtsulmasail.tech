'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, FilePlus, BookText, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { applyGlow, revokeGlow } from '@/lib/glowEffect';

// Moved features and variants to a higher scope
const features = [
  {
    icon: <Search className="h-8 w-8 text-islamic-blue" />,
    title: "Pencarian Semantik",
    description: "Cari tidak hanya berdasarkan kata kunci tetapi juga makna dan konteks, menemukan hukum yang relevan meskipun istilahnya berbeda.",
    themeColor: "islamic-blue",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-islamic-green" />,
    title: "Koleksi Komprehensif",
    description: "Akses ribuan teks hukum Islam autentik dari berbagai mazhab, mencakup karya klasik hingga fatwa kontemporer.",
    themeColor: "islamic-green",
  },
  {
    icon: <FilePlus className="h-8 w-8 text-islamic-purple" />,
    title: "Analisis Modern",
    description: "Manfaatkan alat AI untuk menganalisis teks, membandingkan pendapat, dan memahami alasan di balik berbagai posisi fikih.",
    themeColor: "islamic-purple",
  },
  {
    icon: <BookText className="h-8 w-8 text-islamic-gold" />,
    title: "Topik Terorganisir",
    description: "Jelajahi kategori terstruktur meliputi semua aspek hukum Islam, dari ibadah, muamalah, hingga masalah pribadi.",
    themeColor: "islamic-gold",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// Create a functional component for individual feature cards to manage refs and effects
const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentCardRef = cardRef.current;
    if (currentCardRef) {
      applyGlow(currentCardRef);
    }
    return () => {
      if (currentCardRef) {
        revokeGlow(currentCardRef);
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef} // Assign ref here
      key={index} // key should be on the outermost element in a map
      variants={itemVariants}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="h-full card-glowable" // Added card-glowable class
    >
      <Card className="bg-card/80 dark:bg-card/60 backdrop-blur-sm border shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full rounded-xl glass-morphism">
        <div className="glow-overlay"></div> {/* Added glow overlay div */}
        <CardContent className="p-6 relative h-full flex flex-col">
          <div className={`absolute top-0 right-0 w-20 h-20 bg-${feature.themeColor}/10 dark:bg-${feature.themeColor}/20 rounded-bl-full opacity-70 pointer-events-none`}></div>
          <div className={`mb-5 h-14 w-14 flex items-center justify-center rounded-xl bg-${feature.themeColor}/10 text-${feature.themeColor} border border-${feature.themeColor}/20 shadow-sm`}>
            {React.cloneElement(feature.icon, { className: `h-7 w-7 text-${feature.themeColor}` })}
          </div>
          <h3 className={`text-xl font-semibold mb-2 text-${feature.themeColor}`}>{feature.title}</h3>
          <p className="text-foreground/70 text-sm leading-relaxed flex-grow">{feature.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/10 dark:from-background dark:to-black/20 relative overflow-hidden">
      {/* Background decoration - using theme colors */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-islamic-blue/30 blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-60 h-60 rounded-full bg-islamic-green/30 blur-3xl"></div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-52 h-52 rounded-full bg-islamic-gold/30 blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 inline-block border border-primary/20">
            Fitur Unggulan
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground">
            Temukan Kekuatan Platform Kami
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-foreground/70 leading-relaxed">
            Dirancang untuk memberdayakan pemahaman Anda tentang hukum Islam dengan kemudahan dan kedalaman.
          </p>
          <div className="h-1 w-24 bg-primary mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants} // Now accessible
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => ( // features is now accessible
            <FeatureCard feature={feature} index={index} key={index} />
          ))}
        </motion.div>
        
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Link href="/about" legacyBehavior>
            <a className="inline-flex items-center text-primary hover:text-primary/80 font-medium group smooth-transitions">
              Pelajari lebih lanjut tentang platform kami
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection; 