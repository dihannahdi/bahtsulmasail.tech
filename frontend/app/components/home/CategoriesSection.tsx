'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { applyGlow, revokeGlow } from '@/lib/glowEffect';

// Define the Category type based on observation
interface Category {
  title: string;
  description: string;
  count: number;
  color: string; // e.g., "islamic-blue", used to derive Tailwind classes
  slug: string;
}

// Mock data, similar to Vite project's fallback
const mockCategories: Category[] = [
  {
    title: "Worship (Ibadah)",
    description: "Rulings related to prayer, fasting, zakat, hajj, and other acts of worship.",
    count: 42,
    color: "islamic-blue",
    slug: "worship"
  },
  {
    title: "Family Law",
    description: "Matters of marriage, divorce, custody, and family relations in Islamic law.",
    count: 37,
    color: "islamic-green",
    slug: "family-law"
  },
  {
    title: "Financial Transactions",
    description: "Islamic guidelines on business, trade, investment, and economic activities.",
    count: 28,
    color: "islamic-gold",
    slug: "financial-transactions"
  },
  {
    title: "Inheritance & Wills",
    description: "Rules governing the distribution of wealth after death in Islamic law.",
    count: 19,
    color: "islamic-purple",
    slug: "inheritance-wills"
  },
  {
    title: "Contemporary Issues",
    description: "Modern applications of Islamic law in today's changing world.",
    count: 33,
    color: "islamic-teal",
    slug: "contemporary-issues"
  },
  {
    title: "Criminal Law",
    description: "Islamic perspectives on crime, punishment, and justice system.",
    count: 21,
    color: "islamic-earth", // Assuming we have or will add an islamic-earth color
    slug: "criminal-law"
  }
];

const MotionCard = motion(Card);

interface CategoryCardProps extends Category {
  index: number;
}

const createCategoryUrl = (slug: string) => {
  return `/browse?category=${encodeURIComponent(slug)}`;
};

const CategoryCard = ({ title, description, count, color, slug, index }: CategoryCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationDelay = 0.1 * index;

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

  const gradientClass = `from-${color}/10 to-${color}/5 via-${color}/5`;
  const borderColorClass = `border-${color}/20 hover:border-${color}/40`;
  const textColorClass = `text-${color}`;
  const iconBgClass = `bg-${color}/10`;
  const buttonClasses = `bg-${color}/10 hover:bg-${color}/20 text-${color} border-${color}/20`;
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full card-glowable"
    >
      <MotionCard 
        className={`overflow-hidden border ${borderColorClass} bg-gradient-to-br ${gradientClass} backdrop-blur-sm shadow-sm h-full flex flex-col group`}
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
      >
        <div className="glow-overlay"></div>
        <CardContent className="p-6 flex flex-col flex-grow relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${iconBgClass} ${textColorClass} shadow-sm`}>
              <BookOpen className={`h-6 w-6`} />
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${iconBgClass} ${textColorClass} border border-${color}/10 shadow-xs`}>
              {count} dokumen
            </span>
          </div>
          
          <h3 className={`text-xl font-semibold mb-2 ${textColorClass}`}>{title}</h3>
          <p className="text-sm text-foreground/70 mb-6 flex-grow leading-relaxed">{description}</p>
          
          <Button 
            variant="outline" 
            size="sm" 
            className={`mt-auto ${buttonClasses} border-0 group-hover:bg-opacity-25 dark:group-hover:bg-opacity-30 w-full transition-colors duration-200`} 
            asChild
          >
            <Link href={createCategoryUrl(slug)} className="flex justify-between items-center w-full">
              <span>Jelajahi Kategori</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </MotionCard>
    </motion.div>
  );
};

const CategoriesSection = () => {
  // Using mock data directly
  const categories = mockCategories;
  // const [isLoading, setIsLoading] = useState(false); // Not needed for mock data
  // const [error, setError] = useState<string | null>(null); // Not needed for mock data

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/20 pattern-bg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-islamic-green/5 rounded-full blur-3xl opacity-70 dark:opacity-50"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-islamic-blue/5 rounded-full blur-3xl opacity-70 dark:opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-islamic-green/10 text-islamic-green text-sm font-medium mb-4 inline-block border border-islamic-green/20">
            Koleksi Terorganisir
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground">
            Jelajahi Berdasarkan Kategori
          </h2>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Koleksi kami diorganisir ke dalam kategori utama untuk membantu Anda menemukan hukum-hukum yang relevan dengan mudah.
          </p>
          <div className="h-1 w-24 bg-islamic-green mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.slug}
              index={index}
              {...category}
            />
          ))}
        </div>
        
        <div className="mt-16 md:mt-20 text-center">
            <Button variant="outline" className="border-islamic-green/50 text-islamic-green hover:bg-islamic-green/10 rounded-full px-8 py-3 text-base group" asChild>
                <Link href="/browse" className="smooth-transitions">
                    Lihat Semua Kategori 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"/>
                </Link>
            </Button>
        </div>

      </div>
    </section>
  );
};

export default CategoriesSection; 