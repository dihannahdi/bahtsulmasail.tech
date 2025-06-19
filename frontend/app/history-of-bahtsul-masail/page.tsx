'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  BookOpen, Users, Globe, ArrowRight, Building2, ScrollText,
  History, GraduationCap, Scale, Heart, Library, Landmark, Scroll,
  BookMarked, FileText, Lightbulb, MapPin, BookText, ChevronRight,
  MenuIcon, X, PanelRightOpen, ArrowUpCircle, Sun, Moon
} from 'lucide-react';

// Add styles to hide scrollbars but allow scrolling
const inlineStyles = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  /* Shiny hover effect styles */
  .shine-effect {
    position: relative;
    overflow: hidden;
  }
  
  .shine-effect::after {
    content: '';
    position: absolute;
    top: calc(var(--y, 0) * 1px - 100px);
    left: calc(var(--x, 0) * 1px - 100px);
    width: 400px;
    height: 400px;
    opacity: 0;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
    transition: opacity 0.2s;
    pointer-events: none;
    z-index: 0;
  }
  
  .shine-effect:hover::after {
    opacity: 0.3;
  }
  
  /* Variations */
  .shine-effect-gold::after {
    background: radial-gradient(circle, rgba(255, 215, 0, 0.5) 0%, rgba(255, 215, 0, 0) 70%);
  }
  
  .shine-effect-green::after {
    background: radial-gradient(circle, rgba(25, 146, 95, 0.5) 0%, rgba(25, 146, 95, 0) 70%);
  }
`;

// Custom components
const FloatingIcon = ({ 
  icon, 
  delay = 0, 
  className 
}: { 
  icon: React.ReactNode; 
  delay?: number; 
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { delay, duration: 0.5 }
      }}
      className={cn("absolute opacity-10", className)}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
};

const SectionTitle = ({ 
  children, 
  className 
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  return (
    <motion.h2 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={cn("text-3xl font-bold mb-6 heading-islamic-gradient", className)}
    >
      {children}
    </motion.h2>
  );
};

const ScrollToTopButton = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  return (
    <motion.div 
      style={{ opacity }} 
      className="fixed bottom-8 right-8 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button 
        size="icon"
        className="rounded-full bg-islamic-green text-white shadow-lg w-12 h-12"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUpCircle size={24} />
      </Button>
    </motion.div>
  );
};

// Add these new components after the FloatingIcon component and before SectionTitle
const AnimatedTimeline = ({ 
  events,
  className
}: { 
  events: {year: string; title: string; description: string}[];
  className?: string;
}) => {
  return (
    <div className={cn("relative py-10", className)}>
      {/* Vertical line */}
      <div className="absolute left-[25px] md:left-1/2 top-0 bottom-0 w-0.5 bg-islamic-green/30" />
      
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: index * 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
          className={`relative flex flex-col md:flex-row items-start mb-10 ${
            index % 2 === 0 ? 'md:flex-row-reverse' : ''
          }`}
        >
          {/* Timeline dot */}
          <div className="absolute left-[25px] md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-islamic-green/80 border-4 border-background z-10" />
          
          {/* Content card */}
          <motion.div 
            className={`ml-16 md:ml-0 md:w-[45%] ${
              index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
            }`}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="bg-card/40 backdrop-blur-sm border border-islamic-green/20 rounded-xl p-5 shadow-sm">
              <Badge variant="outline" className="mb-2 bg-islamic-green/10 text-islamic-green">
                {event.year}
              </Badge>
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              <p className="text-muted-foreground text-sm">{event.description}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const InteractiveQuote = ({
  quote,
  author,
  className
}: {
  quote: string;
  author: string;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.3 }}
      className={cn("relative my-10 px-8 py-10", className)}
    >
      <div className="absolute inset-0 bg-islamic-green/5 rounded-2xl" />
      <div className="relative z-10">
        <div className="absolute -top-6 -left-2 text-islamic-green opacity-20 transform scale-[4]">"</div>
        <div className="absolute -bottom-16 -right-2 text-islamic-green opacity-20 transform scale-[4]">"</div>
        <p className="text-xl md:text-2xl italic text-center mb-4">{quote}</p>
        <p className="text-right text-islamic-green font-medium">— {author}</p>
      </div>
    </motion.div>
  );
};

const InfoGraphic = ({
  title,
  items,
  className
}: {
  title: string;
  items: {icon: React.ReactNode; title: string; description: string}[];
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.3 }}
      className={cn("my-10", className)}
    >
      <h3 className="text-2xl font-semibold mb-6 text-center">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-2xl p-6 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-islamic-green/10 flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll();
  const progressBarHeight = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-islamic-green z-50 origin-left"
      style={{ scaleX: progressBarHeight }}
    />
  );
};

const ExpandableCard = ({
  title,
  summary,
  content,
  icon,
  className
}: {
  title: string;
  summary: string;
  content: string;
  icon: React.ReactNode;
  className?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      layout
      className={cn("bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-2xl overflow-hidden", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div 
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mr-4">
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{summary}</p>
        <div className="flex justify-end mt-4">
          <Badge variant="outline" className="bg-islamic-green/5 flex items-center gap-1">
            {isExpanded ? "Sembunyikan" : "Pelajari Lebih"} 
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          </Badge>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            <div className="pt-4 border-t border-islamic-green/10">
              <p>{content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const QuizCard = ({
  question,
  options,
  correctAnswer,
  explanation,
  className
}: {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  className?: string;
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowExplanation(true);
  };
  
  const resetQuiz = () => {
    setSelectedOption(null);
    setShowExplanation(false);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, amount: 0.3 }}
      className={cn("bg-card/40 backdrop-blur-sm border border-islamic-green/20 rounded-2xl p-6", className)}
    >
      <h3 className="text-xl font-semibold mb-4">Uji Pengetahuan Anda</h3>
      <p className="mb-6">{question}</p>
      
      <div className="space-y-3 mb-6">
        {options.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedOption === null
                ? "border-islamic-green/20 hover:border-islamic-green/50"
                : selectedOption === index
                  ? index === correctAnswer
                    ? "border-green-500 bg-green-500/10"
                    : "border-red-500 bg-red-500/10"
                  : index === correctAnswer && showExplanation
                    ? "border-green-500 bg-green-500/10"
                    : "border-islamic-green/20 opacity-50"
            }`}
            onClick={() => handleOptionSelect(index)}
          >
            {option}
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-card/30 p-4 rounded-lg mb-4">
              <p className="font-medium text-islamic-green mb-2">Penjelasan:</p>
              <p>{explanation}</p>
            </div>
            <Button variant="outline" onClick={resetQuiz}>Coba Lagi</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function SejarahBahtsulMasailPage() {
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const [activeSection, setActiveSection] = useState('introduction');
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const progressBarRef = useRef(null);
  const progressBarHeight = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [theme, setTheme] = useState('dark');
  
  // Add mouse tracking handler for shine effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    const { left, top } = element.getBoundingClientRect();
    element.style.setProperty('--x', `${e.clientX - left}`);
    element.style.setProperty('--y', `${e.clientY - top}`);
  };

  useEffect(() => {
    setMounted(true);
    
    // Inject the CSS for hiding scrollbars
    const styleElement = document.createElement('style');
    styleElement.innerHTML = inlineStyles;
    document.head.appendChild(styleElement);
    
    // Add smooth scroll behavior when navigation links are clicked
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' && target.dataset.section) {
        e.preventDefault();
        setActiveSection(target.dataset.section);
        const mainElement = document.querySelector('main');
        if (mainElement) {
          window.scrollTo({ 
            top: mainElement.offsetTop - 100, 
            behavior: 'smooth' 
          });
        }
      }
    };
    
    document.addEventListener('click', handleNavClick as unknown as EventListener);
    
    return () => {
      document.removeEventListener('click', handleNavClick as unknown as EventListener);
      // Clean up the style element on unmount
      document.head.removeChild(styleElement);
    };
  }, []);

  // Animation variants
  const pageTransition = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const navItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Navigation items
  const navigationItems = [
    { id: 'introduction', label: 'Pendahuluan' },
    { id: 'nu-origins', label: 'Asal Usul NU' },
    { id: 'bahtsul-origins', label: 'Asal Usul Bahtsul Masail' },
    { id: 'methodology', label: 'Metodologi' },
    { id: 'impact', label: 'Dampak & Kontribusi' },
    { id: 'contemporary', label: 'Relevansi Kontemporer' },
  ];

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
              className="bg-background text-foreground relative overflow-hidden"
    >
      {/* Interactive Progress Bar */}
      <motion.div 
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-1 bg-islamic-green z-50 origin-left"
        style={{ scaleX: progressBarHeight }}
      />

      {/* Scroll To Top Button */}
      <ScrollToTopButton />

      {/* Islamic Pattern Background with enhanced animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 pattern-bg opacity-[0.02] dark:opacity-[0.03]" />
        
        <motion.div 
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-islamic-green/10 rounded-full blur-3xl"
        />
        
        <motion.div 
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          className="absolute bottom-[30%] right-[15%] w-[400px] h-[400px] bg-islamic-green/5 rounded-full blur-3xl"
        />
        
        <motion.div 
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          className="absolute top-[60%] left-[60%] w-[300px] h-[300px] bg-islamic-green/15 rounded-full blur-3xl"
        />
        
        {/* Floating background icons */}
        <FloatingIcon 
          icon={<BookOpen className="w-24 h-24 text-islamic-green" />} 
          delay={0.2}
          className="top-[15%] left-[10%]"
        />
        
        <FloatingIcon 
          icon={<Landmark className="w-32 h-32 text-islamic-gold" />} 
          delay={0.5}
          className="bottom-[20%] right-[15%]"
        />
        
        <FloatingIcon 
          icon={<Scroll className="w-20 h-20 text-islamic-blue" />} 
          delay={0.8}
          className="top-[60%] left-[75%]"
        />
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div 
        className="fixed top-4 right-4 z-50 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button 
          variant="outline" 
          size="icon"
          className="bg-card/80 backdrop-blur-sm border border-islamic-green/20 rounded-full shadow-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              className="absolute right-0 top-0 h-full w-3/4 max-w-xs bg-card shadow-xl p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-semibold text-islamic-green">Navigasi</h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <motion.div
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                {navigationItems.map((item) => (
                  <motion.div key={item.id} variants={navItemVariant}>
                    <Button 
                      variant={activeSection === item.id ? "default" : "ghost"}
                      className={`w-full justify-start text-left ${
                        activeSection === item.id 
                          ? 'bg-islamic-green text-white hover:bg-islamic-green/90 shadow-sm' 
                          : 'hover:bg-islamic-green/10'
                      }`}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      data-section={item.id}
                    >
                      <span>{item.label}</span>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with enhanced animations */}
      <motion.header 
        style={{ opacity: headerOpacity }}
        className="relative pt-20 pb-8 px-4 text-center z-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 opacity-20"
          >
            <ScrollText className="w-full h-full text-islamic-green" />
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 heading-islamic-gradient"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
              }}
              className="inline-block"
            >
              Sejarah Bahtsul Masail
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, ease: "easeOut", delay: 0.4 }
            }}
          >
            Tradisi Intelektual dan Yurisprudensi Islam dalam Nahdlatul Ulama: Menelusuri Akar Sejarah, Metodologi, dan Dampaknya di Indonesia
          </motion.p>

          {/* Navigation Bar - styled to match the screenshot */}
          <motion.div 
            className="relative mb-10 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex justify-center">
              <motion.div 
                className="bg-islamic-green rounded-full px-2 shadow-md inline-flex max-w-full overflow-x-auto hide-scrollbar"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="flex space-x-1 py-1">
                  {navigationItems.map((item, idx) => (
                    <motion.button
                      key={item.id}
                      className={`px-5 py-2.5 rounded-full text-sm font-medium relative shine-effect ${
                        activeSection === item.id
                          ? 'text-islamic-green font-semibold' 
                          : 'text-white hover:text-white/90'
                      }`}
                      onClick={() => setActiveSection(item.id)}
                      onMouseMove={handleMouseMove}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        delay: 0.7 + idx * 0.05,
                        duration: 0.3 
                      }}
                      data-section={item.id}
                    >
                      <span className="relative z-10">{item.label}</span>
                      
                      {activeSection === item.id ? (
                        <motion.div
                          layoutId="navActiveBg"
                          className="absolute inset-0 bg-white rounded-full -z-0 shadow-sm"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 500, 
                            damping: 25,
                            mass: 1
                          }}
                        />
                      ) : (
                        <motion.div
                          className="absolute inset-0 rounded-full -z-0 bg-white/0 hover:bg-white/5 transition-colors duration-200"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="w-32 h-1 mx-auto bg-gradient-to-r from-islamic-green to-islamic-green/60 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 128, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        {/* Introduction Section */}
        <AnimatePresence mode="wait">
          {activeSection === 'introduction' && (
            <motion.section
              key="introduction"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <motion.div 
                className="bg-card/40 backdrop-blur-sm border border-islamic-green/20 rounded-3xl p-8 overflow-hidden relative"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div className="absolute -top-20 -right-20 w-64 h-64 bg-islamic-green/5 rounded-full blur-3xl" />
                <motion.div className="absolute -bottom-20 -left-20 w-64 h-64 bg-islamic-gold/5 rounded-full blur-3xl" />
                
                <SectionTitle>Pendahuluan: Pilar-Pilar Islam Indonesia</SectionTitle>
                
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <motion.p 
                    className="lead text-xl text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    Nahdlatul Ulama (NU), secara harfiah berarti "Kebangkitan Ulama," adalah organisasi Islam independen terbesar tidak hanya di Indonesia tetapi secara global, dengan keanggotaan melebihi 40 juta pada tahun 2023.
                  </motion.p>
                  
                  <InteractiveQuote 
                    quote="Tradisi Bahtsul Masail telah menjadi roh intelektual dan penghubung spiritual bagi Nahdlatul Ulama, menyeimbangkan antara tradisi klasik dan tuntutan modernitas."
                    author="K.H. Mustofa Bisri"
                  />
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.2
                        }
                      }
                    }}
                  >
                    <motion.div 
                      className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-2xl p-6 hover:shadow-md transition-all duration-300 hover:border-islamic-green/30 shine-effect"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                      }}
                      whileHover={{ y: -5 }}
                      onMouseMove={handleMouseMove}
                    >
                      <div className="flex items-center mb-4">
                        <motion.div 
                          className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mr-4"
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(25, 146, 95, 0.2)" }}
                        >
                          <Building2 className="w-5 h-5 text-islamic-green" />
                        </motion.div>
                        <h3 className="text-xl font-semibold">Didirikan 1926</h3>
                      </div>
                      <p>NU telah berkembang melampaui entitas keagamaan murni menjadi kekuatan sosial-budaya yang kuat, dengan jaringan luas lembaga pendidikan, layanan sosial, dan inisiatif komunitas.</p>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-2xl p-6 hover:shadow-md transition-all duration-300 hover:border-islamic-green/30 shine-effect"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
                      }}
                      whileHover={{ y: -5 }}
                      onMouseMove={handleMouseMove}
                    >
                      <div className="flex items-center mb-4">
                        <motion.div 
                          className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mr-4"
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(25, 146, 95, 0.2)" }}
                        >
                          <BookOpen className="w-5 h-5 text-islamic-green" />
                        </motion.div>
                        <h3 className="text-xl font-semibold">Bahtsul Masail</h3>
                      </div>
                      <p>Sentral pada dinamika intelektual dan religius NU adalah tradisi Bahtsul Masail, forum khas untuk musyawarah keagamaan kolektif dan perumusan fatwa hukum yang mendalam.</p>
                    </motion.div>
                  </motion.div>
                  
                  <InfoGraphic
                    title="Pilar Utama Nahdlatul Ulama"
                    items={[
                      {
                        icon: <GraduationCap className="w-8 h-8 text-islamic-green" />,
                        title: "Pendidikan",
                        description: "Jaringan luas pesantren dan lembaga pendidikan yang melestarikan tradisi keilmuan Islam klasik"
                      },
                      {
                        icon: <Scale className="w-8 h-8 text-islamic-green" />,
                        title: "Yurisprudensi",
                        description: "Tradisi Bahtsul Masail yang menghasilkan fatwa dan pendapat hukum berdasarkan sumber-sumber otoritatif"
                      },
                      {
                        icon: <Heart className="w-8 h-8 text-islamic-green" />,
                        title: "Layanan Sosial",
                        description: "Program bantuan kesehatan, bencana, dan pemberdayaan ekonomi untuk masyarakat luas"
                      }
                    ]}
                  />
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    Praktik Bahtsul Masail berakar dalam kesarjanaan Islam klasik dan berfungsi sebagai mekanisme utama NU untuk menangani masalah kontemporer melalui kacamata yurisprudensi Islam tradisional. Hubungan antara Nahdlatul Ulama dan Bahtsul Masail sangatlah simbiosis.
                  </motion.p>
                  
                  <QuizCard
                    question="Apa arti harfiah dari Nahdlatul Ulama?"
                    options={[
                      "Gerakan Ulama",
                      "Kebangkitan Ulama",
                      "Persatuan Ulama",
                      "Jaringan Ulama"
                    ]}
                    correctAnswer={1}
                    explanation="Nahdlatul Ulama secara harfiah berarti 'Kebangkitan Ulama', mencerminkan tujuan awal organisasi untuk membangkitkan dan memperkuat peran ulama dalam konteks sosial-religius Indonesia."
                    className="my-8"
                  />
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    NU menyediakan kerangka institusional yang luas, basis keanggotaan massal, dan otoritas sosial yang memberikan bobot dan jangkauan yang cukup besar bagi keputusan dan musyawarah yang berasal dari Bahtsul Masail. Sebaliknya, proses kesarjanaan yang ketat dan output intelektual dari Bahtsul Masail memberikan NU legitimasi yurisprudensi dan kredibilitas intelektual yang mendasari pernyataan keagamaan dan sikap sosialnya.
                  </motion.p>
                  
                  <motion.div 
                    className="bg-islamic-gold/5 border border-islamic-gold/20 rounded-xl p-6 my-8 hover:bg-islamic-gold/10 transition-all duration-300 shine-effect shine-effect-gold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ scale: 1.01 }}
                    onMouseMove={handleMouseMove}
                  >
                    <h4 className="text-xl font-semibold mb-4 text-islamic-gold">Kontribusi Penting</h4>
                    <p>
                      Kontribusi terpenting NU saat ini adalah mempromosikan <strong>Islam Nusantara</strong> – visi Islam yang moderat, toleran, adaptif secara budaya, dan berakar kuat dalam tradisi Indonesia. Visi ini berfungsi sebagai benteng penting melawan penyebaran ekstremisme dan radikalisme agama.
                    </p>
                  </motion.div>

                  <ExpandableCard
                    title="Hubungan Simbiosis dan Signifikansi Abadi"
                    summary="Warisan NU dan Bahtsul Masail dalam pembentukan identitas Islam Indonesia yang moderat dan inklusif."
                    content="Secara kolektif, NU dan Bahtsul Masail telah berperan penting dalam membentuk dan mempromosikan bentuk Islam di Indonesia yang sering dicirikan oleh moderasi, adaptabilitas budaya, dan inklusivitas – kualitas yang sering dikaitkan dengan konsep Islam Nusantara (Islam Kepulauan). Warisan abadi NU dan Bahtsul Masail dapat dipahami melalui sintesis mereka yang berhasil antara kesetiaan tekstual pada sumber-sumber Islam klasik dan adaptabilitas kontekstual yang luar biasa terhadap realitas sosio-historis Indonesia yang beragam dan terus berkembang."
                    icon={<Scroll className="w-5 h-5 text-islamic-green" />}
                    className="my-10"
                  />
                </div>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
        
        {/* NU Origins Section */}
        <AnimatePresence mode="wait">
          {activeSection === 'nu-origins' && (
            <motion.section
              key="nu-origins"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <motion.div 
                className="bg-card/40 backdrop-blur-sm border border-islamic-green/20 rounded-3xl p-8 overflow-hidden relative"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div className="absolute -top-20 -right-20 w-64 h-64 bg-islamic-green/5 rounded-full blur-3xl" />
                <motion.div className="absolute -bottom-20 -left-20 w-64 h-64 bg-islamic-gold/5 rounded-full blur-3xl" />
                
                {/* Content remains the same but can be enhanced similarly */}
                <SectionTitle>Asal Usul dan Kebangkitan Nahdlatul Ulama</SectionTitle>
                
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <h3 className="text-2xl font-semibold mb-4">Latar Belakang Sosio-Religius Indonesia</h3>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    Awal abad ke-20 di kepulauan Indonesia, yang saat itu merupakan Hindia Belanda, adalah periode pergolakan sosial, politik, dan agama yang signifikan. Era ini menyaksikan kebangkitan gerakan-gerakan modernis Islam seperti Muhammadiyah (didirikan 1912), Persatuan Islam (PERSIS), dan Al-Irshad Al-Islamiya.
                  </motion.p>
                  
                  <InteractiveQuote 
                    quote="Nahdlatul Ulama lahir dari semangat mempertahankan tradisi keilmuan Islam yang telah berakar berabad-abad di nusantara, sambil tetap responsif terhadap tantangan zaman."
                    author="K.H. Sahal Mahfudh"
                    className="my-8"
                  />
                  
                  <div className="my-8 bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-xl p-6 shine-effect" onMouseMove={handleMouseMove}>
                    <h4 className="text-xl font-semibold mb-4">Faktor-Faktor Kritis</h4>
                    <ul className="space-y-4">
                      <motion.li 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true, amount: 0.3 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-islamic-green/10 flex items-center justify-center mr-3 mt-1">
                          <Users className="w-3 h-3 text-islamic-green" />
                        </div>
                        <span>Organisasi-organisasi modernis, sering terinspirasi oleh ide-ide reformis dari Timur Tengah, mengadvokasi "purifikasi" Islam dan kembali langsung ke Al-Qur'an dan Hadits.</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-islamic-green/10 flex items-center justify-center mr-3 mt-1">
                          <Globe className="w-3 h-3 text-islamic-green" />
                        </div>
                        <span>Pergeseran politik dan agama di Hijaz (sekarang Arab Saudi) dengan kebangkitan Ibn Saud dan penerapan ideologi Wahhabisme mengancam keragaman mazhab di kota-kota suci Mekah dan Madinah.</span>
                      </motion.li>
                      <motion.li 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-islamic-green/10 flex items-center justify-center mr-3 mt-1">
                          <BookMarked className="w-3 h-3 text-islamic-green" />
                        </div>
                        <span>Perkembangan ini dianggap sebagai ancaman langsung terhadap budaya pesantren, ekosistem di mana "Islam tradisional" telah berakar dan dipertahankan selama berabad-abad.</span>
                      </motion.li>
                    </ul>
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4">Pendirian Formal NU</h3>
                  
                  <AnimatedTimeline
                    events={[
                      {
                        year: "1926",
                        title: "Pendirian Resmi",
                        description: "Nahdlatul Ulama secara resmi didirikan pada 31 Januari 1926 (16 Rajab 1344 H) di Surabaya, Jawa Timur."
                      },
                      {
                        year: "1926-1942",
                        title: "Era Kolonial Belanda",
                        description: "Fokus pada penguatan identitas sosio-religius dan non-kerjasama dengan pemerintah kolonial Belanda."
                      },
                      {
                        year: "1942-1945",
                        title: "Pendudukan Jepang",
                        description: "Awalnya dibubarkan, kemudian kerjasama taktis. Pembentukan unit militer Hizbullah & Sabilillah."
                      },
                      {
                        year: "1945-1949",
                        title: "Perang Kemerdekaan",
                        description: "Resolusi Jihad (Oktober 1945) dan partisipasi aktif dalam perjuangan bersenjata untuk kemerdekaan Indonesia."
                      },
                      {
                        year: "1952-1984",
                        title: "Era Politik Praktis",
                        description: "NU menjadi partai politik mandiri hingga kembali ke khittah 1926 sebagai organisasi sosial-keagamaan."
                      },
                      {
                        year: "1998-Sekarang",
                        title: "Era Reformasi",
                        description: "Pembentukan PKB, kepresidenan Gus Dur, dan promosi Islam Nusantara sebagai model Islam moderat."
                      }
                    ]}
                    className="my-12"
                  />
                  
                  <p>
                    Nahdlatul Ulama secara resmi didirikan pada 31 Januari 1926, bertepatan dengan 16 Rajab 1344 H, di kota Surabaya, Jawa Timur. Organisasi ini muncul dari kehendak kolektif para kyai terkemuka, dengan K.H. Hasyim Asy'ari sebagai Rais Akbar (Pemimpin Tertinggi) pertama, dan K.H. Abdul Wahab Hasbullah sebagai organisator yang dinamis dan visioner.
                  </p>
                  
                  <InfoGraphic
                    title="Ideologi Inti Nahdlatul Ulama"
                    items={[
                      {
                        icon: <Landmark className="w-8 h-8 text-islamic-green" />,
                        title: "Ahl al-Sunnah wa al-Jama'ah",
                        description: "Mengikuti sekolah Imam Abu al-Hasan al-Ash'ari dan Imam Abu Mansur al-Maturidi dalam teologi"
                      },
                      {
                        icon: <ScrollText className="w-8 h-8 text-islamic-green" />,
                        title: "Mazhab Fiqh",
                        description: "Mengakui legitimasi keempat mazhab Sunni dengan penekanan pada mazhab Syafi'i di Indonesia"
                      },
                      {
                        icon: <Heart className="w-8 h-8 text-islamic-green" />,
                        title: "Tasawuf",
                        description: "Mengikuti jalan moderat Imam al-Ghazali dan Imam Junayd al-Baghdadi untuk pemurnian spiritual"
                      }
                    ]}
                    className="my-10"
                  />
                  
                  <h3 className="text-2xl font-semibold mb-4">Navigasi Arus Sejarah</h3>
                  
                  <p>
                    Tahun-tahun formatif NU dan perkembangan selanjutnya sangat dibentuk oleh arus sejarah yang bergolak yang melanda Indonesia, dari periode kolonial akhir melalui pendudukan Jepang dan perjuangan kemerdekaan.
                  </p>
                  
                  <div className="overflow-x-auto my-8">
                    <motion.table 
                      className="min-w-full bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-xl"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <thead>
                        <tr className="border-b border-islamic-green/10">
                          <th className="py-3 px-4 text-left">Periode</th>
                          <th className="py-3 px-4 text-left">Peran/Transformasi NU</th>
                        </tr>
                      </thead>
                      <tbody>
                        <motion.tr 
                          className="border-b border-islamic-green/10"
                          whileHover={{ backgroundColor: "rgba(25, 146, 95, 0.05)" }}
                        >
                          <td className="py-3 px-4 font-medium">Kolonial Belanda (1926-1942)</td>
                          <td className="py-3 px-4">Fokus sosio-religius, non-kerjasama dengan militer Belanda, pendirian bersama MIAI.</td>
                        </motion.tr>
                        <motion.tr 
                          className="border-b border-islamic-green/10"
                          whileHover={{ backgroundColor: "rgba(25, 146, 95, 0.05)" }}
                        >
                          <td className="py-3 px-4 font-medium">Pendudukan Jepang (1942-1945)</td>
                          <td className="py-3 px-4">Pembubaran awal, kemudian kerjasama taktis, pemimpin di Shumubu & Masyumi, pembentukan unit militer Hizbullah & Sabilillah.</td>
                        </motion.tr>
                        <motion.tr 
                          className="border-b border-islamic-green/10"
                          whileHover={{ backgroundColor: "rgba(25, 146, 95, 0.05)" }}
                        >
                          <td className="py-3 px-4 font-medium">Perang Kemerdekaan (1945-1949)</td>
                          <td className="py-3 px-4">Resolusi Jihad (Oktober 1945), partisipasi aktif dalam perjuangan bersenjata, fatwa mendukung perjuangan kemerdekaan.</td>
                        </motion.tr>
                        <motion.tr
                          whileHover={{ backgroundColor: "rgba(25, 146, 95, 0.05)" }}
                        >
                          <td className="py-3 px-4 font-medium">Era Reformasi (1998-Sekarang)</td>
                          <td className="py-3 px-4">Pembentukan PKB (1998), kepresidenan Gus Dur (1999-2001), promosi Islam Nusantara, upaya kontra-ekstremisme.</td>
                        </motion.tr>
                      </tbody>
                    </motion.table>
                  </div>
                  
                  <QuizCard
                    question="Siapakah yang menjadi Rais Akbar (Pemimpin Tertinggi) pertama Nahdlatul Ulama?"
                    options={[
                      "K.H. Abdul Wahab Hasbullah",
                      "K.H. Hasyim Asy'ari",
                      "K.H. Wahid Hasyim",
                      "Gus Dur (Abdurrahman Wahid)"
                    ]}
                    correctAnswer={1}
                    explanation="K.H. Hasyim Asy'ari adalah Rais Akbar (Pemimpin Tertinggi) pertama Nahdlatul Ulama, sementara K.H. Abdul Wahab Hasbullah berperan sebagai organisator utama. K.H. Wahid Hasyim adalah putra K.H. Hasyim Asy'ari, dan Gus Dur adalah cucu K.H. Hasyim Asy'ari yang kemudian menjadi Presiden Indonesia."
                    className="my-8"
                  />
                  
                  <ExpandableCard
                    title="Resolusi Jihad: Momen Penentu"
                    summary="Peran krusial NU dalam mendukung kemerdekaan Indonesia melalui fatwa yang bersejarah"
                    content="Setelah penyerahan Jepang pada Agustus 1945 dan proklamasi kemerdekaan Indonesia, NU sepenuh hati mendukung republik baru. Kembalinya Belanda, yang berusaha untuk membangun kembali kekuasaan kolonial, menyulut perang kemerdekaan yang sengit. Pada momen kritis ini, NU memainkan peran penentu. Pada 22 Oktober 1945, di Surabaya, NU mengeluarkan Resolusi Jihad yang bersejarah. Resolusi ini menyatakan bahwa membela kemerdekaan Indonesia melawan pasukan kolonial Belanda dan sekutunya adalah perang suci (jihad) dan fard 'ain (kewajiban agama individu)."
                    icon={<Scroll className="w-5 h-5 text-islamic-green" />}
                    className="bg-islamic-gold/5 border border-islamic-gold/20 rounded-xl my-8"
                  />
                </div>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
        
        {/* Bahtsul Masail Origins Section */}
        <AnimatePresence mode="wait">
          {activeSection === 'bahtsul-origins' && (
            <motion.section
              key="bahtsul-origins"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-card/40 backdrop-blur-sm border border-islamic-green/20 rounded-3xl p-8">
                <h2 className="text-3xl font-bold mb-6 heading-islamic-gradient">Akar Keilmuan Bahtsul Masail</h2>
                
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="lead text-xl text-muted-foreground">
                    Tradisi Bahtsul Masail, meskipun paling menonjol dikaitkan dengan Nahdlatul Ulama, memiliki akar yang tertanam dalam dalam budaya keilmuan pesantren Indonesia.
                  </p>
                  
                  <div className="my-8 bg-islamic-green/5 border border-islamic-green/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Tradisi Pesantren</h3>
                    <p>
                      Selama berabad-abad, pesantren telah berfungsi sebagai pusat vital untuk studi intensif teks-teks Islam klasik, yang umumnya disebut sebagai kitab kuning (buku kuning, karena warna kertas tradisional). Dalam lingkungan ini, berkembang tradisi intelektual diskusi dan debat yang dinamis.
                    </p>
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4">Prakursor Bahtsul Masail</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                    <div className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mr-4">
                          <Users className="w-5 h-5 text-islamic-green" />
                        </div>
                        <h3 className="text-xl font-semibold">Halaqah</h3>
                      </div>
                      <p>Prakursor kunci format Bahtsul Masail adalah praktik halaqah (lingkaran studi). Model ini, yang umum di pusat-pusat pembelajaran Islam di Tanah Suci, khususnya Mekah, melibatkan ulama dan santri yang berkumpul untuk studi interaktif, diskusi, dan debat tentang isu-isu keagamaan dan kemasyarakatan.</p>
                    </div>
                    
                    <div className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mr-4">
                          <BookMarked className="w-5 h-5 text-islamic-green" />
                        </div>
                        <h3 className="text-xl font-semibold">Musyawarah & Takrar</h3>
                      </div>
                      <p>Dalam konteks pesantren, Bahtsul Masail seperti yang dipraktikkan oleh NU pada dasarnya adalah perpanjangan dan formalisasi dari kegiatan-kegiatan keilmuan yang telah lama ada yang sering dikenal sebagai musyawarah (musyawarah) atau takrar (pengulangan dan peninjauan kembali).</p>
                    </div>
                  </div>
                  
                  <p>
                    Sesi-sesi ini melibatkan kyai dan santri senior yang secara teliti memeriksa teks-teks klasik untuk menemukan solusi bagi masalah-masalah kontemporer atau untuk mengklarifikasi poin-poin hukum dan teologi yang kompleks.
                  </p>
                  
                  <div className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-xl p-6 my-8">
                    <h3 className="text-xl font-semibold mb-4">Taswirul Afkar: Bentuk Embrio</h3>
                    <p>
                      Pelopor institusional penting yang mewujudkan semangat penyelidikan kolektif ini adalah Taswirul Afkar (Pencerahan Pemikiran). Didirikan sekitar tahun 1917-1919 di Surabaya oleh K.H. Abdul Wahab Chasbullah, yang sendiri telah belajar di Mekah, Taswirul Afkar pada awalnya berfungsi sebagai forum untuk mendiskusikan isu-isu sosio-politik yang mendesak pada masa itu.
                    </p>
                    <p className="mt-4">
                      Seiring waktu, cakupannya meluas untuk mencakup topik-topik keagamaan, menjadikannya bentuk embrio yang signifikan dari tradisi Bahtsul Masail yang kemudian akan diadopsi dan disistematisasi oleh Nahdlatul Ulama.
                    </p>
                  </div>
                  
                  <div className="my-10">
                    <h3 className="text-2xl font-semibold mb-4">Formalisasi dalam NU: Pembentukan Lajnah Bahtsul Masail (LBM-NU)</h3>
                    <p>
                      Meskipun kegiatan musyawarah ala Bahtsul Masail telah menjadi fitur Nahdlatul Ulama sejak kongres perdananya pada tahun 1926, tradisi ini awalnya beroperasi tanpa struktur institusional yang sangat formal atau permanen dalam organisasi. Ini sebagian besar merupakan praktik ad hoc, diselenggarakan sesuai kebutuhan.
                    </p>
                    <p className="mt-4">
                      Institusionalisasi resmi Bahtsul Masail mendapatkan momentum pada akhir 1980-an. Langkah signifikan diambil pada Muktamar NU ke-28 di Yogyakarta pada tahun 1989, di mana Komisi I, yang mengawasi masalah-masalah Bahtsul Masail, merekomendasikan kepada Pengurus Besar Nahdlatul Ulama (PBNU) pembentukan lembaga permanen, "Lajnah Bahtsul Masail Diniyah" (Komite untuk Diskusi Masalah Keagamaan).
                    </p>
                    <p className="mt-4">
                      Alasannya adalah untuk menciptakan badan khusus untuk menangani masalah-masalah keagamaan secara sistematis, terutama yang "mauquf" (tertunda atau belum terpecahkan) dan "waqi'iyyah" (aktual, kontemporer, dan mendesak), dan untuk memberikan kepastian hukum yang otoritatif dengan cara yang lebih terstruktur.
                    </p>
                  </div>
                  
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-xl">
                      <thead>
                        <tr className="border-b border-islamic-green/10">
                          <th className="py-3 px-4 text-left">Struktur LBM</th>
                          <th className="py-3 px-4 text-left">Deskripsi & Fungsi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-islamic-green/10">
                          <td className="py-3 px-4 font-medium">Komisi Waqi'iyyah</td>
                          <td className="py-3 px-4">Menangani masalah-masalah konkrit, praktis dan peristiwa kontemporer yang memerlukan respons hukum segera.</td>
                        </tr>
                        <tr className="border-b border-islamic-green/10">
                          <td className="py-3 px-4 font-medium">Komisi Maudhu'iyyah</td>
                          <td className="py-3 px-4">Berfokus pada topik-topik agama, sosial, atau konseptual yang lebih luas, tematis, dan sering teoritis yang memerlukan studi dan musyawarah mendalam.</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">Komisi Qanuniyyah</td>
                          <td className="py-3 px-4">Menangani masalah-masalah yang berkaitan dengan hukum dan legislasi negara, memeriksa kompatibilitasnya dengan prinsip-prinsip Islam atau mengusulkan perspektif Islam pada rancangan undang-undang.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        
        {/* Methodology Section */}
        <AnimatePresence mode="wait">
          {activeSection === 'methodology' && (
            <motion.section
              key="methodology"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-card/40 backdrop-blur-sm border border-islamic-green/20 rounded-3xl p-8">
                <ScrollProgressIndicator />
                
                <h2 className="text-3xl font-bold mb-6 heading-islamic-gradient">Arsitektur Musyawarah: Metodologi Bahtsul Masail</h2>
                
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <motion.p 
                    className="lead text-xl text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    Bahtsul Masail, yang secara harfiah berarti "diskusi" atau "pengkajian masalah", berfungsi sebagai forum ilmiah yang sangat terstruktur. Forum ini mengumpulkan kyai, ulama, dan sarjana NU dengan tujuan utama memberikan kepastian hukum melalui penerbitan fatwa (pendapat hukum agama) sebagai respons terhadap masalah-masalah sosial yang dinamis dan sering kompleks.
                  </motion.p>
                  
                  <InteractiveQuote 
                    quote="Bahtsul Masail bukan sekadar forum diskusi hukum Islam, melainkan tradisi keilmuan yang menjembatani khazanah klasik dengan realitas kontemporer melalui metodologi yang terstruktur."
                    author="K.H. Afifuddin Muhajir"
                  />
                  
                  <div className="my-8">
                    <motion.h3 
                      className="text-2xl font-semibold mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      Sumber-Sumber Utama (Maraji')
                    </motion.h3>
                    <motion.div 
                      className="bg-islamic-green/5 border border-islamic-green/20 rounded-xl p-6 shine-effect"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true, amount: 0.3 }}
                      onMouseMove={handleMouseMove}
                    >
                      <p>
                        Sumber-sumber utama hukum Islam adalah Al-Qur'an dan Sunnah (tradisi Nabi). Namun, dalam proses Bahtsul Masail, interpretasi langsung dari sumber-sumber primer ini dimediasi melalui warisan kaya yurisprudensi Islam klasik. Oleh karena itu, forum ini terutama mengandalkan al-kutub al-mu'tabarah (kitab-kitab otoritatif klasik), yang di Indonesia sering disebut sebagai kitab kuning.
                      </p>
                      
                      <motion.div 
                        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        viewport={{ once: true, amount: 0.3 }}
                      >
                        <div className="flex items-start p-3 bg-card/30 backdrop-blur-sm rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-islamic-green/10 flex items-center justify-center mr-3">
                            <BookOpen className="w-4 h-4 text-islamic-green" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold">I'anah al-Talibin</h4>
                            <p className="text-xs text-muted-foreground">Karya Sayyid Bakri al-Dimyati, teks utama dalam mazhab Syafi'i</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-card/30 backdrop-blur-sm rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-islamic-green/10 flex items-center justify-center mr-3">
                            <BookOpen className="w-4 h-4 text-islamic-green" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold">Fath al-Mu'in</h4>
                            <p className="text-xs text-muted-foreground">Karya Zayn al-Din al-Malibari, referensi utama fiqh Syafi'i</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-card/30 backdrop-blur-sm rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-islamic-green/10 flex items-center justify-center mr-3">
                            <BookOpen className="w-4 h-4 text-islamic-green" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold">Fath al-Wahhab</h4>
                            <p className="text-xs text-muted-foreground">Karya Zakariya al-Ansari, komentar detail atas Manhaj al-Tullab</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-card/30 backdrop-blur-sm rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-islamic-green/10 flex items-center justify-center mr-3">
                            <BookOpen className="w-4 h-4 text-islamic-green" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold">Al-Majmu' Sharh al-Muhadhdhab</h4>
                            <p className="text-xs text-muted-foreground">Karya Imam al-Nawawi, kompendium komprehensif fiqh Syafi'i</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  <motion.h3 
                    className="text-2xl font-semibold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    Pendekatan Metodologis (Istinbath al-Hukm - Derivasi Hukum)
                  </motion.h3>
                  
                  <Tabs defaultValue="qauly" className="w-full my-8">
                    <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-islamic-green/10 rounded-xl">
                      <TabsTrigger value="qauly" className="rounded-lg data-[state=active]:bg-islamic-green data-[state=active]:text-white py-3">
                        Metode Qauly
                      </TabsTrigger>
                      <TabsTrigger value="ilhaqy" className="rounded-lg data-[state=active]:bg-islamic-green data-[state=active]:text-white py-3">
                        Metode Ilhaqy
                      </TabsTrigger>
                      <TabsTrigger value="manhajy" className="rounded-lg data-[state=active]:bg-islamic-green data-[state=active]:text-white py-3">
                        Metode Manhajy
                      </TabsTrigger>
                    </TabsList>
                    <div className="mt-6">
                      <TabsContent value="qauly" className="border border-islamic-green/10 rounded-xl p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mr-4">
                            <BookText className="w-5 h-5 text-islamic-green" />
                          </div>
                          <h3 className="text-xl font-semibold">Metode Qauly (Tekstual)</h3>
                        </div>
                        <p className="mb-4">Ini adalah metode yang paling mendasar dan paling sering digunakan. Melibatkan referensi langsung ke pernyataan eksplisit (ibarat), pendapat (qaul), atau interpretasi (wajh) yang ditemukan dalam kitab kuning. Jika jawaban tekstual yang jelas dan relevan dari ahli hukum klasik yang otoritatif tersedia, umumnya diadopsi.</p>
                            
                        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 my-4">
                          <h4 className="font-semibold mb-2">Kapan Digunakan:</h4>
                          <p>Ketika jawaban tekstual yang jelas dan langsung untuk pertanyaan yang diajukan tersedia dalam sumber-sumber klasik yang diakui.</p>
                        </div>
                            
                        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Contoh Kasus:</h4>
                          <p>Fatwa tentang keabsahan akad nikah melalui telekonferensi menggunakan teks-teks klasik tentang syarat ijab-qabul dalam pernikahan.</p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="ilhaqy" className="border border-islamic-green/10 rounded-xl p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mr-4">
                            <Scale className="w-5 h-5 text-islamic-green" />
                          </div>
                          <h3 className="text-xl font-semibold">Metode Ilhaqy (Analogis)</h3>
                        </div>
                        <p className="mb-4">Metode ini digunakan ketika tidak ada jawaban tekstual langsung (qaul atau wajh) yang dapat ditemukan dalam sumber-sumber klasik untuk masalah kontemporer tertentu. Ini melibatkan ilhaq al-masail bi nazhairiha - menganalogikan kasus baru dengan kasus yang ada yang memiliki keputusan yang telah ditetapkan dalam teks-teks klasik, berdasarkan sebab hukum ('illah) atau prinsip yang sama.</p>
                            
                        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 my-4">
                          <h4 className="font-semibold mb-2">Kapan Digunakan:</h4>
                          <p>Ketika tidak ada teks langsung ditemukan untuk masalah baru, tetapi terdapat preseden yang sebanding dalam literatur klasik.</p>
                        </div>
                            
                        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Contoh Kasus:</h4>
                          <p>Fatwa tentang status zakat profesi modern dengan menganalogikan pada zakat pertanian dan perdagangan dalam teks klasik.</p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="manhajy" className="border border-islamic-green/10 rounded-xl p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mr-4">
                            <FileText className="w-5 h-5 text-islamic-green" />
                          </div>
                          <h3 className="text-xl font-semibold">Metode Manhajy (Metodologis)</h3>
                        </div>
                        <p className="mb-4">Pendekatan ini diterapkan ketika metode qauly maupun ilhaqy dianggap tidak cukup untuk mengatasi masalah kontemporer yang baru atau sangat kompleks yang tidak ada preseden langsung atau analogi yang jelas dalam teks-teks klasik. Metode manhajy melibatkan penerapan prinsip-prinsip hukum yang lebih luas dan metodologi dari imam-imam mazhab yang diakui.</p>
                            
                        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 my-4">
                          <h4 className="font-semibold mb-2">Kapan Digunakan:</h4>
                          <p>Ketika tidak ada teks langsung atau analogi yang jelas dapat diterapkan, biasanya untuk masalah-masalah kontemporer yang sepenuhnya baru atau sangat kompleks.</p>
                        </div>
                            
                        <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Contoh Kasus:</h4>
                          <p>Fatwa tentang kloning, rekayasa genetika, atau praktik perbankan Islam modern yang memerlukan pertimbangan maqasid al-shari'ah dan qawa'id fiqhiyyah.</p>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                  
                  <div className="my-10">
                    <motion.h3 
                      className="text-2xl font-semibold mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      Proses Musyawarah
                    </motion.h3>
                    
                    <motion.div
                      className="relative pb-10 pl-8 border-l-2 border-islamic-green/30"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.7 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <motion.div 
                        className="mb-8 relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true, amount: 0.3 }}
                      >
                        <div className="absolute -left-[25px] w-6 h-6 rounded-full bg-islamic-green flex items-center justify-center">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <div className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-xl p-5">
                          <h4 className="text-lg font-semibold mb-2">Pengajuan Masalah</h4>
                          <p>Forum Bahtsul Masail mengikuti proses musyawarah yang terstruktur. Masalah-masalah untuk diskusi biasanya diusulkan terlebih dahulu, sering disertai dengan "deskripsi masalah" (taswir al-mas'alah) yang merinci masalah dan pertanyaan-pertanyaan hukum spesifik yang muncul darinya.</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="mb-8 relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
                      >
                        <div className="absolute -left-[25px] w-6 h-6 rounded-full bg-islamic-green flex items-center justify-center">
                          <span className="text-white text-xs font-bold">2</span>
                        </div>
                        <div className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-xl p-5">
                          <h4 className="text-lg font-semibold mb-2">Konsultasi Pakar</h4>
                          <p>Untuk masalah-masalah kontemporer yang kompleks yang memerlukan pengetahuan khusus (misalnya, etika medis, transaksi keuangan yang rumit, ilmu lingkungan), komite Bahtsul Masail dapat mengundang pakar subjek eksternal untuk memberikan klarifikasi faktual dan konteks sebelum musyawarah berbasis fiqh dimulai.</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="mb-8 relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                      >
                        <div className="absolute -left-[25px] w-6 h-6 rounded-full bg-islamic-green flex items-center justify-center">
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <div className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-xl p-5">
                          <h4 className="text-lg font-semibold mb-2">Diskusi dan Debat</h4>
                          <p>Selama sesi, peserta, yang datang dengan persiapan setelah meneliti masalah-masalah, terlibat dalam debat yang ketat. Mereka menyajikan argumen (hujjah) dan kontra-argumen, mengutip bukti tekstual (ta'bir) dari kitab kuning, ayat-ayat Al-Qur'an, dan Hadits untuk mendukung posisi masing-masing.</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true, amount: 0.3 }}
                      >
                        <div className="absolute -left-[25px] w-6 h-6 rounded-full bg-islamic-green flex items-center justify-center">
                          <span className="text-white text-xs font-bold">4</span>
                        </div>
                        <div className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-xl p-5">
                          <h4 className="text-lg font-semibold mb-2">Perumusan Keputusan</h4>
                          <p>Diskusi dipandu oleh musahhih (pelurusan, verifikator, atau direktur), yang biasanya adalah kyai senior dan sangat dihormati yang dikenal karena penguasaan mereka dalam yurisprudensi Islam. Musahhih memainkan peran penting dalam mengklarifikasi interpretasi, memastikan debat tetap terfokus, menilai validitas argumen, dan pada akhirnya membimbing forum menuju konsensus atau mengkonfirmasi keputusan akhir.</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  <QuizCard
                    question="Apa yang dimaksud dengan 'kitab kuning' dalam konteks Bahtsul Masail?"
                    options={[
                      "Buku dengan sampul berwarna kuning",
                      "Kitab-kitab otoritatif klasik yang menjadi rujukan dalam mazhab Syafi'i",
                      "Catatan pribadi para kyai",
                      "Kumpulan fatwa modern"
                    ]}
                    correctAnswer={1}
                    explanation="Kitab kuning merujuk pada kitab-kitab otoritatif klasik yang menjadi rujukan dalam tradisi keilmuan pesantren, terutama dari mazhab Syafi'i. Disebut 'kuning' karena kertas yang digunakan dalam cetakan tradisional berwarna kuning."
                    className="my-8"
                  />
                  
                  <motion.div 
                    className="bg-islamic-gold/5 border border-islamic-gold/20 rounded-xl p-6 my-8 hover:bg-islamic-gold/10 transition-all duration-300 shine-effect shine-effect-gold"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ scale: 1.01 }}
                    onMouseMove={handleMouseMove}
                  >
                    <h4 className="text-xl font-semibold mb-4 text-islamic-gold">Signifikansi Metodologi</h4>
                    <p>
                      Metodologi hierarkis dan berkembang dari Bahtsul Masail—yang berkembang dari qauly ke ilhaqy dan, bila perlu, ke manhajy—menunjukkan sistem hukum yang canggih dan koheren secara internal. Sistem ini dirancang untuk menyeimbangkan kesetiaan yang teguh pada tradisi kaya kesarjanaan Islam klasik dengan kebutuhan mendesak untuk relevansi kontemporer.
                    </p>
                    <p className="mt-4">
                      Ini jauh dari penerapan monolitik atau kaku dari teks-teks kuno; sebaliknya, ini adalah proses yang terstruktur dan dinamis dari interpretasi dan, ketika keadaan menuntut, pengembangan hukum yang berprinsip.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        
        {/* Impact Section */}
        <AnimatePresence mode="wait">
          {activeSection === 'impact' && (
            <motion.section
              key="impact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-card/40 backdrop-blur-sm border border-islamic-green/20 rounded-3xl p-8">
                <h2 className="text-3xl font-bold mb-6 heading-islamic-gradient">Pengaruh dan Dampak Bahtsul Masail</h2>
                
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="lead text-xl text-muted-foreground">
                    Keputusan dan musyawarah yang berasal dari Lajnah Bahtsul Masail-NU (LBM-NU) memiliki pengaruh mendalam dan beragam, membentuk tidak hanya posisi resmi Nahdlatul Ulama sendiri tetapi juga berdampak pada wacana publik yang lebih luas, kebijakan pemerintah, dan dinamika sosial di Indonesia.
                  </p>
                  
                  <div className="my-8">
                    <h3 className="text-2xl font-semibold mb-4">Musyawarah Bersejarah</h3>
                    <p>
                      Lajnah Bahtsul Masail dari Nahdlatul Ulama telah bergulat dengan beragam masalah sepanjang sejarahnya, mencerminkan kekhawatiran yang berkembang dalam masyarakat Indonesia dan umat Muslim. Musyawarahnya mencakup masalah-masalah ibadah (ibadah), transaksi keuangan (mu'amalat), hukum pidana (jinayat), hukum waris (mawarits), kesehatan, praktik sosial-budaya, dan pertanyaan-pertanyaan tematis (maudhu'iyyah), kasuistik (waqi'iyyah), dan legislatif (qanuniyyah) yang lebih luas.
                    </p>
                  </div>
                  
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-xl">
                      <thead>
                        <tr className="border-b border-islamic-green/10">
                          <th className="py-3 px-4 text-left">Keputusan/Isu</th>
                          <th className="py-3 px-4 text-left">Poin Kunci Keputusan</th>
                          <th className="py-3 px-4 text-left">Dampak Sosial/Politik</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-islamic-green/10">
                          <td className="py-3 px-4 font-medium">Resolusi Jihad</td>
                          <td className="py-3 px-4">Menyatakan perjuangan melawan pasukan kolonial Belanda sebagai perang suci (jihad) dan kewajiban agama individu (fard 'ain) bagi Muslim di sekitarnya.</td>
                          <td className="py-3 px-4">Memobilisasi perlawanan populer massal yang penting bagi perjuangan kemerdekaan Indonesia; Memperkuat kredensial nasionalis NU dan perannya sebagai pembela bangsa.</td>
                        </tr>
                        <tr className="border-b border-islamic-green/10">
                          <td className="py-3 px-4 font-medium">Keluarga Berencana (KB)</td>
                          <td className="py-3 px-4">Pergeseran dari larangan/penolakan awal hingga izin kontrasepsi berdasarkan maqasid al-shari'ah (tujuan hukum Islam) dan kesejahteraan masyarakat.</td>
                          <td className="py-3 px-4">Memberikan legitimasi agama untuk program keluarga berencana pemerintah; Mengatasi kekhawatiran demografis dan berkontribusi pada peningkatan kesehatan ibu dan anak; Menunjukkan yurisprudensi adaptif NU.</td>
                        </tr>
                        <tr className="border-b border-islamic-green/10">
                          <td className="py-3 px-4 font-medium">Penghapusan "Kafir" untuk Warga Non-Muslim</td>
                          <td className="py-3 px-4">Menyatakan istilah kafir (kafir) tidak berlaku untuk sesama warga non-Muslim dalam negara-bangsa modern; Menegaskan legitimasi teologis negara-bangsa dan kewajiban untuk mematuhi hukumnya.</td>
                          <td className="py-3 px-4">Memperkuat persatuan nasional dan harmoni antaragama; Memberikan narasi tandingan teologis yang kuat terhadap ideologi ekstremis; Meningkatkan posisi internasional NU sebagai pendukung Islam yang moderat dan kontekstual.</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">Pengutukan Kelompok Radikal</td>
                          <td className="py-3 px-4">Menyatakan ideologi kelompok seperti Hizbut Tahrir Indonesia (HTI) dan Front Pembela Islam (FPI) tidak sesuai dengan Ahl al-Sunnah wa al-Jama'ah, Pancasila, dan mengancam persatuan nasional; Mendukung upaya pembubaran negara.</td>
                          <td className="py-3 px-4">Memberikan justifikasi agama untuk tindakan negara terhadap organisasi radikal; Membentuk wacana publik tentang ekstremisme dan sifat Islam Indonesia; Memperkuat peran NU sebagai penjaga moderasi dan NKRI.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
                    <div className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mr-4">
                          <Heart className="w-5 h-5 text-islamic-green" />
                        </div>
                        <h3 className="text-xl font-semibold">Dampak pada Wacana Publik</h3>
                      </div>
                      <p>
                        Mengingat ukuran NU yang besar, penetrasi masyarakat yang dalam, dan pengaruh historisnya, fatwa dan posisinya secara signifikan membentuk wacana publik tentang Islam di Indonesia. Media sering melaporkan keputusan Bahtsul Masail utama, dan keputusan ini berkontribusi pada percakapan nasional tentang isu-isu kritis.
                      </p>
                      <p className="mt-4">
                        Selain itu, sikap NU dapat mengerahkan pengaruh yang cukup besar pada kebijakan pemerintah atau memberikan legitimasi agama yang penting untuk tindakan negara.
                      </p>
                    </div>
                    
                    <div className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mr-4">
                          <Globe className="w-5 h-5 text-islamic-green" />
                        </div>
                        <h3 className="text-xl font-semibold">Dampak Sosial dan Global</h3>
                      </div>
                      <p>
                        Pengaruh Bahtsul Masail pada dinamika sosial juga signifikan. Keputusan yang mempromosikan inklusivitas dan mengevaluasi kembali interpretasi klasik yang potensial memecah belah, seperti keputusan 2019 tentang istilah "kafir" untuk warga non-Muslim, dapat secara langsung berkontribusi pada pemupukan toleransi, saling menghormati, dan harmoni sosial dalam masyarakat plural Indonesia.
                      </p>
                      <p className="mt-4">
                        Sikap konsisten NU terhadap radikalisme dan ekstremisme, yang diartikulasikan melalui Bahtsul Masail dan platform lain, memainkan peran vital dalam upaya menjaga keamanan nasional dan mempertahankan integritas tatanan sosial yang beragam di Indonesia.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-islamic-gold/5 border border-islamic-gold/20 rounded-xl p-6 my-8">
                    <h4 className="text-xl font-semibold mb-4 text-islamic-gold">Upaya "Kontekstualisasi Ulang"</h4>
                    <p>
                      Upaya "kontekstualisasi ulang" yang menonjol dalam keputusan Bahtsul Masail terbaru, paling menonjol keputusan 2019 mengenai istilah "kafir" dan validasi teologis negara-bangsa modern, menandakan ambisi NU yang berkembang untuk menawarkan apa yang mungkin disebut "solusi Indonesia" untuk tantangan global yang mendesak dalam dunia Muslim.
                    </p>
                    <p className="mt-4">
                      Ini memposisikan Islam Nusantara, tidak hanya sebagai varian Islam yang terlokalisasi, tetapi sebagai model potensial untuk pemahaman iman yang relevan secara global, moderat, berorientasi pada perdamaian, dan sensitif secara kontekstual.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        
        {/* Contemporary Relevance Section */}
        <AnimatePresence mode="wait">
          {activeSection === 'contemporary' && (
            <motion.section
              key="contemporary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-card/40 backdrop-blur-sm border border-islamic-green/20 rounded-3xl p-8">
                <h2 className="text-3xl font-bold mb-6 heading-islamic-gradient">Relevansi Kontemporer dan Masa Depan</h2>
                
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="lead text-xl text-muted-foreground">
                    Di era kontemporer, relevansi Nahdlatul Ulama tetap tidak berkurang. Kontribusi paling menonjolnya adalah mungkin promosi Islam Nusantara - visi Islam yang moderat, toleran, adaptif secara budaya, dan berakar kuat dalam tradisi Indonesia.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
                    <div className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mr-4">
                          <BookOpen className="w-5 h-5 text-islamic-green" />
                        </div>
                        <h3 className="text-xl font-semibold">Kontribusi Kontemporer</h3>
                      </div>
                      <p>
                        NU memberikan kontribusi mendalam pada persatuan nasional dan dialog antaragama, memanfaatkan otoritas moralnya dan jaringan akar rumput yang luas. Jaringan luas lembaga pendidikannya, dari ribuan pesantren hingga jumlah universitas yang terus bertambah, dan beragam program layanan sosialnya, memainkan peran vital dalam pengembangan sumber daya manusia dan kesejahteraan masyarakat.
                      </p>
                      <p className="mt-4">
                        Tradisi Bahtsul Masail terus menjadi sangat penting, memberikan panduan agama yang sangat diperlukan tentang isu-isu etis, sosial, dan teknologi baru dan kompleks yang dihadapi umat Islam Indonesia di abad ke-21.
                      </p>
                    </div>
                    
                    <div className="bg-card/30 backdrop-blur-sm border border-islamic-green/10 rounded-2xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-islamic-green/10 flex items-center justify-center mr-4">
                          <Lightbulb className="w-5 h-5 text-islamic-green" />
                        </div>
                        <h3 className="text-xl font-semibold">Tantangan dan Prospek Masa Depan</h3>
                      </div>
                      <p>
                        Meskipun kekuatan dan kontribusinya, Nahdlatul Ulama menghadapi beberapa tantangan yang akan membentuk lintasan masa depannya.
                      </p>
                      <ul className="space-y-2 mt-4">
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-islamic-green/10 flex items-center justify-center mr-3 mt-1">
                            <MapPin className="w-3 h-3 text-islamic-green" />
                          </div>
                          <span>Penyebaran efektif keputusan Bahtsul Masail ke basis akar rumputnya yang luas dan beragam.</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-islamic-green/10 flex items-center justify-center mr-3 mt-1">
                            <Users className="w-3 h-3 text-islamic-green" />
                          </div>
                          <span>Mengelola keragaman internal dalam organisasi "tenda besar" ini.</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-islamic-green/10 flex items-center justify-center mr-3 mt-1">
                            <Globe className="w-3 h-3 text-islamic-green" />
                          </div>
                          <span>Beradaptasi dengan kemajuan teknologi yang cepat dan pengaruh global yang kompleks.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="my-10">
                    <h3 className="text-2xl font-semibold mb-4">Warisan dan Refleksi Penutup</h3>
                    <p>
                      Nahdlatul Ulama dan tradisi Bahtsul Masail yang khas mewakili model tradisionalisme Islam yang unik dan luar biasa tangguh. Selama hampir satu abad, mereka telah menunjukkan kapasitas luar biasa untuk adaptasi dan keterlibatan konstruktif dengan kekuatan modernitas.
                    </p>
                    <p className="mt-4">
                      Warisan mereka bukanlah pelestarian statis masa lalu, tetapi interpretasi dinamis, kontekstualisasi ulang, dan penerapan prinsip-prinsip Islam dalam konteks nasional dan global yang spesifik dan berkembang. Masa depan NU dan Bahtsul Masail akan bergantung pada kemampuan mereka yang berlanjut untuk mengatasi tantangan-tantangan ini secara efektif.
                    </p>
                    <p className="mt-4">
                      Mengatasi tantangan internal yang terkait dengan penyebaran dan keragaman, sambil merespons secara cepat terhadap tekanan dan peluang eksternal, akan menjadi krusial bagi mereka untuk tetap menjadi kekuatan pemandu bagi umat Islam Indonesia dan suara yang meyakinkan untuk Islam yang moderat, penuh kasih, dan relevan secara kontekstual di dunia yang lebih luas.
                    </p>
                  </div>
                  
                  <div className="bg-islamic-gold/5 border border-islamic-gold/20 rounded-xl p-6 my-8">
                    <h4 className="text-xl font-semibold mb-4 text-islamic-gold">Model "Tradisionalisme Dinamis"</h4>
                    <p>
                      Keberhasilan model "tradisionalisme dinamis" NU, seperti yang dicontohkan oleh Bahtsul Masail, sangat terkait dengan lingkungan sosial-budaya dan politik Indonesia yang spesifik, termasuk budaya pesantren berabad-abad, sejarah nasional yang ditandai dengan pluralisme agama (terlepas dari tantangan), dan adanya ruang demokratis yang memungkinkan untuk musyawarah tersebut.
                    </p>
                    <p className="mt-4">
                      Meskipun prinsip-prinsip dasar interpretasi kontekstual, penekanan pada maqasid al-shari'ah, dan penalaran skolastik kolektif menawarkan pelajaran berharga, "eksportabilitas" langsung dari model NU ke masyarakat Muslim lain dengan lintasan historis dan kondisi sosio-politik yang berbeda tetap menjadi pertanyaan kompleks, yang memerlukan pertimbangan cermat dari konteks lokal.
                    </p>
                    <p className="mt-4">
                      Namun demikian, perjalanan NU menawarkan contoh kuat tentang bagaimana pemikiran Islam tradisional tidak hanya dapat bertahan tetapi berkembang dan berkontribusi secara bermakna di zaman modern.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        
        {activeSection !== 'introduction' && activeSection !== 'bahtsul-origins' && activeSection !== 'methodology' && activeSection !== 'nu-origins' && activeSection !== 'impact' && activeSection !== 'contemporary' && (
          <div className="text-center py-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
            >
              <p className="text-muted-foreground">Memuat konten...</p>
            </motion.div>
          </div>
        )}
        
        {/* Call to Action - Add shine effect */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20 text-center"
        >
          <motion.div 
            className="relative p-12 rounded-3xl bg-card/40 backdrop-blur-sm border border-islamic-green/20 overflow-hidden shine-effect shine-effect-green"
            onMouseMove={handleMouseMove}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div className="absolute -top-20 -right-20 w-64 h-64 bg-islamic-green/5 rounded-full blur-3xl" />
            <motion.div className="absolute -bottom-20 -left-20 w-64 h-64 bg-islamic-green/5 rounded-full blur-3xl" />
            
            <h2 className="text-3xl font-bold mb-4 heading-islamic-gradient">
              Pelajari Lebih Lanjut
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Temukan lebih banyak tentang kontribusi Bahtsul Masail dalam membentuk pemahaman Islam yang moderat dan kontekstual di Indonesia.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button 
                variant="secondary"
                size="lg"
                className="group bg-gradient-to-r from-islamic-green to-islamic-green/70 hover:opacity-90 text-white shadow-md shine-effect"
                onMouseMove={handleMouseMove}
              >
                Jelajahi Arsip
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>

      {/* Theme Toggle - Add shine effect */}
      <motion.div
        className="fixed bottom-8 left-8 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            size="icon"
            variant="outline"
            className="rounded-full w-12 h-12 bg-card/80 backdrop-blur-sm border border-islamic-green/20 shadow-lg shine-effect shine-effect-gold"
            onMouseMove={handleMouseMove}
            aria-label="Toggle theme"
          >
            {mounted && (
              theme === 'dark' ? 
                <Sun className="h-5 w-5 text-islamic-gold" /> : 
                <Moon className="h-5 w-5 text-islamic-blue" />
            )}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll To Top Button - Add shine effect */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]) }} 
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button 
          size="icon"
          className="rounded-full bg-islamic-green text-white shadow-lg w-12 h-12 shine-effect"
          onMouseMove={handleMouseMove}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUpCircle size={24} />
        </Button>
      </motion.div>
    </motion.div>
  );
} 