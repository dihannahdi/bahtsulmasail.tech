"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Search, BookOpen, MessageSquare, History, ExternalLink, ArrowRight } from "lucide-react";

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<{text: string, relevance: number}[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.8, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.3, 0.4, 0.8, 0.9], [0.9, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0.3, 0.4, 0.8, 0.9], [50, 0, 0, -50]);
  
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const springOpacity = useSpring(opacity, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springY = useSpring(y, springConfig);

  // Handle mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      setMousePosition({ x, y });
      
      containerRef.current.style.setProperty("--mouse-x", `${x}`);
      containerRef.current.style.setProperty("--mouse-y", `${y}`);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  // Simulate semantic search results when user types
  useEffect(() => {
    if (searchQuery.length > 2) {
      const mockResults = [
        { text: "The role of Ijtihad in contemporary Islamic jurisprudence", relevance: 0.95 },
        { text: "Historical development of Bahtsul Masail in Indonesia", relevance: 0.89 },
        { text: "Comparative analysis of fatwa methodologies", relevance: 0.78 },
        { text: "Digital transformation of Islamic legal research", relevance: 0.72 },
      ];
      
      // Simulate typing delay
      const timer = setTimeout(() => {
        setSearchResults(mockResults);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Auto-rotate featured items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: "search",
      icon: Search,
      title: "Semantic Search",
      description: "Discover relevant scholarly opinions and discussions with our advanced AI-powered search engine.",
      details: [
        "Context-aware queries understand your intent",
        "Multi-language support for Arabic, Indonesian, and English",
        "Citation linking to primary sources",
        "Semantic understanding of Islamic terminology"
      ],
      color: "from-emerald-500/20 to-emerald-600/20"
    },
    {
      id: "annotations",
      icon: BookOpen,
      title: "Collaborative Annotation",
      description: "Engage with texts through shared notes, comments, and discussions.",
      details: [
        "Real-time collaborative margin notes",
        "Threaded discussions on specific passages",
        "Citation and reference linking",
        "Scholarly verification badges"
      ],
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      id: "knowledge",
      icon: MessageSquare,
      title: "Knowledge Constellations",
      description: "Visualize connections between concepts, scholars, and texts in an intuitive interface.",
      details: [
        "Personalized knowledge graphs",
        "Discover unexpected connections",
        "Save and organize your research paths",
        "Share your knowledge maps with others"
      ],
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      id: "lineage",
      icon: History,
      title: "Historical Lineage Visualizer",
      description: "Trace the development of ideas through time and scholarly transmission chains.",
      details: [
        "Interactive isnad (chain of narration) diagrams",
        "Timeline visualization of concept evolution",
        "Scholar biographies and connections",
        "Geographic mapping of knowledge spread"
      ],
      color: "from-amber-500/20 to-amber-600/20"
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative py-32 overflow-hidden bg-background"
      style={{
        "--emerald-light": "rgba(16, 185, 129, 0.2)",
      } as React.CSSProperties}
    >
      {/* Dynamic background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path 
                d="M 40 0 L 0 0 0 40" 
                fill="none" 
                stroke="rgba(16, 185, 129, 0.3)" 
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        style={{
          opacity: springOpacity,
          scale: springScale,
          y: springY,
        }}
        className="container relative z-10 px-4 mx-auto"
      >
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Our Features
            </span>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Your Compass in the Ocean of Knowledge
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover the tools we've crafted to help you navigate the vast sea of Islamic scholarship,
              making ancient wisdom accessible through modern technology.
            </p>
          </motion.div>
        </div>

        {/* Feature showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-32"
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative group cursor-pointer ${activeFeature === index ? 'ring-2 ring-primary/50 shadow-lg shadow-primary/10' : ''}`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="relative h-full p-8 transition-all duration-300 rounded-2xl bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border border-border hover:border-primary/50">
                  <div className="flex flex-col h-full">
                    <div className={`p-4 mb-6 rounded-2xl bg-gradient-to-br ${feature.color}`}>
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="mb-3 text-2xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mb-6 text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: activeFeature === index ? 'auto' : 0,
                        opacity: activeFeature === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-4 space-y-2">
                        {feature.details.map((detail, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <ArrowRight className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6"
                      >
                        <button className="inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                          Learn More
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </button>
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.15) 0%, transparent 60%)",
                    }}
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Feature Demo - Semantic Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-32"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border border-border">
            <h3 className="mb-6 text-2xl font-semibold text-foreground">
              The Seeker's Oracle - Interactive Demo
            </h3>
            <p className="mb-8 text-muted-foreground">
              Experience the power of our semantic search. Type a query to see how our system understands
              context and intent to deliver precise results from our vast knowledge base.
            </p>
            
            <div className="relative max-w-2xl mx-auto mb-8">
              <div
                className={`flex items-center px-6 py-4 transition-all duration-300 rounded-full bg-background/50 backdrop-blur-sm border ${
                  isSearchFocused
                    ? "border-primary shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <input
                  type="text"
                  placeholder="Search for Islamic legal opinions..."
                  className="w-full px-4 text-foreground bg-transparent border-none focus:outline-none text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <motion.button 
                  className="p-2 text-primary hover:text-primary/80 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-6 h-6" />
                </motion.button>
              </div>
              
              {/* Animated emerald light for the search bar */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
                animate={{
                  boxShadow: isSearchFocused 
                    ? ["0 0 0 0 rgba(16, 185, 129, 0)", "0 0 0 8px rgba(16, 185, 129, 0.1)", "0 0 0 4px rgba(16, 185, 129, 0.2)"] 
                    : "0 0 0 0 rgba(16, 185, 129, 0)"
                }}
                transition={{ duration: 1.5, repeat: isSearchFocused ? Infinity : 0 }}
              />
            </div>
            
            {/* Search results visualization */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border">
                    <h4 className="mb-4 text-lg font-medium text-foreground">Search Results</h4>
                    
                    <div className="space-y-4">
                      {searchResults.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                                <motion.div 
                                  className="bg-primary h-1.5 rounded-full" 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result.relevance * 100}%` }}
                                  transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
                                />
                              </div>
                              <span className="ml-2 text-xs text-muted-foreground">
                                {Math.round(result.relevance * 100)}%
                              </span>
                            </div>
                            <p className="font-medium text-foreground">{result.text}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Knowledge visualization */}
                    <div className="mt-8 pt-8 border-t border-border">
                      <h5 className="mb-4 text-sm font-medium text-foreground">Knowledge Connections</h5>
                      
                      <div className="relative h-[120px]">
                        <svg className="w-full h-full" viewBox="0 0 600 120">
                          {searchResults.map((result, i) => {
                            const centerX = 300;
                            const centerY = 60;
                            const angle = (i / searchResults.length) * Math.PI * 2;
                            const radius = 50;
                            const x = centerX + radius * Math.cos(angle);
                            const y = centerY + radius * Math.sin(angle);
                            
                            return (
                              <g key={i}>
                                <motion.line
                                  x1={centerX}
                                  y1={centerY}
                                  x2={x}
                                  y2={y}
                                  stroke="rgba(16, 185, 129, 0.3)"
                                  strokeWidth="1"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                                />
                                <motion.circle
                                  cx={x}
                                  cy={y}
                                  r={5 + result.relevance * 5}
                                  fill="rgba(16, 185, 129, 0.2)"
                                  stroke="rgba(16, 185, 129, 0.5)"
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                                />
                              </g>
                            );
                          })}
                          <motion.circle
                            cx={300}
                            cy={60}
                            r={8}
                            fill="rgba(16, 185, 129, 0.8)"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Search features list */}
            {searchQuery.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto mt-8"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    "Multi-language search in Arabic, English, and Indonesian",
                    "Semantic understanding of Islamic terminology",
                    "Context-aware queries that understand intent",
                    "Historical document analysis and translation"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="p-2 mt-1 rounded-lg bg-primary/10">
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-muted-foreground">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Enhanced animated elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/10 to-transparent blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              top: "20%",
              left: "10%",
            }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              bottom: "20%",
              right: "10%",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
} 