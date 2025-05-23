import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fetchCategories, Category } from "@/lib/api";
import Link from "next/link";
import { ArrowRight, Book, BookOpen } from "lucide-react";

// Create a motion-compatible version of Card using motion.create()
const MotionCard = motion.create(Card);

interface CategoryCardProps {
  title: string;
  description: string;
  count: number;
  color: string;
  slug: string;
  index: number;
}

// Helper function to create URL with query parameters
const createCategoryUrl = (slug: string) => {
  return `/browse?category=${encodeURIComponent(slug)}`;
};

const CategoryCard = ({ title, description, count, color, slug, index }: CategoryCardProps) => {
  // Create a staggered animation effect based on the index
  const animationDelay = 0.1 * index;
  
  // Define the colorClass for the gradient based on the color
  const getGradientClass = (colorBase: string) => {
    const colorMap: Record<string, string> = {
      'bg-islamic-blue': 'from-islamic-blue/10 to-islamic-blue/5',
      'bg-islamic-green': 'from-islamic-green/10 to-islamic-green/5',
      'bg-islamic-gold': 'from-islamic-gold/10 to-islamic-gold/5',
      'bg-islamic-purple': 'from-islamic-purple/10 to-islamic-purple/5',
      'bg-islamic-teal': 'from-islamic-teal/10 to-islamic-teal/5',
      'bg-islamic-earth': 'from-islamic-earth/10 to-islamic-earth/5',
    };
    return colorMap[colorBase] || 'from-blue-100/10 to-blue-50/5';
  };
  
  const getBorderColor = (colorBase: string) => {
    const colorMap: Record<string, string> = {
      'bg-islamic-blue': 'border-islamic-blue/20 hover:border-islamic-blue/40',
      'bg-islamic-green': 'border-islamic-green/20 hover:border-islamic-green/40',
      'bg-islamic-gold': 'border-islamic-gold/20 hover:border-islamic-gold/40',
      'bg-islamic-purple': 'border-islamic-purple/20 hover:border-islamic-purple/40',
      'bg-islamic-teal': 'border-islamic-teal/20 hover:border-islamic-teal/40',
      'bg-islamic-earth': 'border-islamic-earth/20 hover:border-islamic-earth/40',
    };
    return colorMap[colorBase] || 'border-blue-200/20 hover:border-blue-300/40';
  };
  
  const getTextColor = (colorBase: string) => {
    const colorMap: Record<string, string> = {
      'bg-islamic-blue': 'text-islamic-blue',
      'bg-islamic-green': 'text-islamic-green',
      'bg-islamic-gold': 'text-islamic-gold',
      'bg-islamic-purple': 'text-islamic-purple',
      'bg-islamic-teal': 'text-islamic-teal',
      'bg-islamic-earth': 'text-islamic-earth',
    };
    return colorMap[colorBase] || 'text-blue-600';
  };
  
  const getButtonClass = (colorBase: string) => {
    const colorMap: Record<string, string> = {
      'bg-islamic-blue': 'bg-islamic-blue/10 hover:bg-islamic-blue/20 text-islamic-blue border-islamic-blue/20',
      'bg-islamic-green': 'bg-islamic-green/10 hover:bg-islamic-green/20 text-islamic-green border-islamic-green/20',
      'bg-islamic-gold': 'bg-islamic-gold/10 hover:bg-islamic-gold/20 text-islamic-gold border-islamic-gold/20',
      'bg-islamic-purple': 'bg-islamic-purple/10 hover:bg-islamic-purple/20 text-islamic-purple border-islamic-purple/20',
      'bg-islamic-teal': 'bg-islamic-teal/10 hover:bg-islamic-teal/20 text-islamic-teal border-islamic-teal/20',
      'bg-islamic-earth': 'bg-islamic-earth/10 hover:bg-islamic-earth/20 text-islamic-earth border-islamic-earth/20',
    };
    return colorMap[colorBase] || 'bg-blue-100 hover:bg-blue-200 text-blue-700';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <MotionCard 
        className={`overflow-hidden border ${getBorderColor(color)} bg-gradient-to-br ${getGradientClass(color)} backdrop-blur-sm shadow-sm`}
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
      >
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-3">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 mb-4`}>
              <BookOpen className={`h-6 w-6 ${getTextColor(color)}`} />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${color} bg-opacity-10 ${getTextColor(color)}`}>
              {count} dokumen
            </span>
          </div>
          
          <h3 className={`text-xl font-medium mb-2 ${getTextColor(color)}`}>{title}</h3>
          <p className="text-sm text-foreground/70 mb-6 flex-grow">{description}</p>
          
          <Button variant="outline" size="sm" className={`mt-auto ${getButtonClass(color)} border-0`} asChild>
            <Link href={createCategoryUrl(slug)} className="flex justify-between items-center w-full">
              <span>Jelajahi</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </MotionCard>
    </motion.div>
  );
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Failed to load categories');
        // Fallback to mock data if API fails
        setCategories([
          {
            title: "Worship (Ibadah)",
            description: "Rulings related to prayer, fasting, zakat, hajj, and other acts of worship.",
            count: 42,
            color: "bg-islamic-blue",
            slug: "worship"
          },
          {
            title: "Family Law",
            description: "Matters of marriage, divorce, custody, and family relations in Islamic law.",
            count: 37,
            color: "bg-islamic-green",
            slug: "family-law"
          },
          {
            title: "Financial Transactions",
            description: "Islamic guidelines on business, trade, investment, and economic activities.",
            count: 28,
            color: "bg-islamic-gold",
            slug: "financial-transactions"
          },
          {
            title: "Inheritance & Wills",
            description: "Rules governing the distribution of wealth after death in Islamic law.",
            count: 19,
            color: "bg-islamic-purple",
            slug: "inheritance-wills"
          },
          {
            title: "Contemporary Issues",
            description: "Modern applications of Islamic law in today's changing world.",
            count: 33,
            color: "bg-islamic-teal",
            slug: "contemporary-issues"
          },
          {
            title: "Criminal Law",
            description: "Islamic perspectives on crime, punishment, and justice system.",
            count: 21,
            color: "bg-islamic-earth",
            slug: "criminal-law"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Fancy loading skeleton
  if (isLoading) {
    return (
      <section className="py-20 md:py-28 bg-gradient-to-br from-secondary/40 to-secondary/10 pattern-bg">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-foreground/20 w-60 mx-auto mb-4 rounded"></div>
            <div className="h-1 w-24 bg-foreground/20 mx-auto mt-4 mb-4 rounded-full"></div>
            <div className="h-4 bg-foreground/20 w-96 mx-auto mb-16 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-foreground/10 h-52 rounded-lg shadow-sm"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/30 to-background/80 pattern-bg relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-islamic-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-islamic-blue/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="px-4 py-1.5 rounded-full bg-islamic-green/10 text-islamic-green text-sm font-medium mb-4 inline-block">
            Koleksi Terorganisir
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold">Jelajahi Berdasarkan Kategori</h2>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Koleksi kami diorganisir ke dalam kategori utama untuk membantu Anda menemukan hukum-hukum yang relevan dengan mudah.
          </p>
          <div className="h-1 w-24 bg-islamic-green mx-auto mt-6 rounded-full"></div>
          
          {error && (
            <div className="mt-4 text-amber-600 text-sm">
              Catatan: Data kategori saat ini menggunakan data contoh.
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(categories) ? categories.map((category, index) => (
            <CategoryCard
              key={index}
              index={index}
              title={category.title}
              description={category.description}
              count={category.count}
              color={category.color}
              slug={category.slug}
            />
          )) : (
            <p>No categories available</p>
          )}
        </div>

        <motion.div 
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg" 
            className="bg-islamic-green hover:bg-islamic-green/90 text-white rounded-full px-8 shadow-md hover:shadow-lg transition-all duration-300" 
            asChild
          >
            <Link href="/browse" className="flex items-center">
              <span>Lihat Semua Kategori</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
