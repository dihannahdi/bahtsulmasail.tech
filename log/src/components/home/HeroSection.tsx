import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const searchVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 0.4,
        duration: 0.5,
        type: "spring",
        stiffness: 120
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 0.6,
        duration: 0.3 
      }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-b from-background to-secondary/30 pattern-bg">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-islamic-green/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-islamic-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute -top-10 right-20 w-40 h-40 bg-islamic-gold/10 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-islamic-green/10 text-islamic-green border border-islamic-green/20"
            variants={itemVariants}
          >
            <span className="text-sm font-medium">Digitalisasi Bahtsul Masail</span>
          </motion.div>
          
          <motion.h1 
            className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-balance tracking-tight"
            variants={itemVariants}
          >
            <span className="text-gradient-title">Bahtsul Masail</span>
            <br />
            <span className="text-foreground relative">
              Untuk Islam Digdaya
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-islamic-green rounded-full opacity-70"></span>
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto text-balance leading-relaxed"
            variants={itemVariants}
          >
            Upaya Pelestarian dan Digitalisasi Hasil Bahtsul Masail Pondok Pesantren untuk memudahkan pemanfaatannya bagi umat Islam dimanapun dan kapanpun.
          </motion.p>
          
          <motion.div 
            className="relative max-w-xl mx-auto glass-morphism rounded-full p-1.5 md:p-2 shadow-lg search-glow border border-white/40 dark:border-white/10"
            variants={searchVariants}
          >
            <div className="flex">
              <Input 
                placeholder="Cari fatwa, hukum, atau topik..." 
                className="border-0 shadow-none py-6 rounded-full bg-transparent placeholder:text-foreground/50 focus-visible:ring-0 text-lg"
              />
              <Button className="rounded-full h-14 px-8 bg-islamic-green hover:bg-islamic-green/90 dark:bg-islamic-green dark:text-white dark:hover:bg-islamic-green/90 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                <Search className="h-5 w-5 mr-2" />
                Cari
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="mt-10 flex flex-wrap gap-4 justify-center"
            variants={itemVariants}
          >
            <p className="w-full text-sm text-foreground/60 mb-2">Topik Populer:</p>
            {["Shalat", "Puasa", "Keuangan", "Pernikahan", "Waris", "Zakat"].map((topic, index) => (
              <motion.div
                key={topic}
                custom={index}
                variants={buttonVariants}
                whileHover="hover"
              >
                <Button variant="outline" className="rounded-full border-islamic-green/30 hover:border-islamic-green hover:bg-islamic-green/5 text-foreground/80 hover:text-foreground">
                  {topic}
                </Button>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-16 flex justify-center items-center space-x-2 text-foreground/50"
            variants={itemVariants}
          >
            <span>Scroll untuk menjelajahi</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-8 w-8 border border-foreground/20 rounded-full flex items-center justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12L2.5 6.5L3.5 5.5L8 10L12.5 5.5L13.5 6.5L8 12Z" fill="currentColor"/>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-islamic-dark/95 [background:radial-gradient(125%_125%_at_50%_65%,#fff_40%,#e6f0fd_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#1A1F2C_40%,#131722_100%)]"></div>
    </div>
  );
};

export default HeroSection;
