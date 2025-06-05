"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Users, Globe, MessageSquare, Award, ExternalLink, User } from "lucide-react";
import { useInView } from "react-intersection-observer";

export function CommunitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoverState, setHoverState] = useState<number | null>(null);
  const [mapNodes, setMapNodes] = useState<{ x: number; y: number; size: number; pulseSpeed: number }[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const springOpacity = useSpring(opacity, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springY = useSpring(y, springConfig);

  // Generate random nodes for the global map
  useEffect(() => {
    const generateNodes = () => {
      const nodes = [];
      for (let i = 0; i < 20; i++) {
        nodes.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 2 + Math.random() * 6,
          pulseSpeed: 1 + Math.random() * 2,
        });
      }
      setMapNodes(nodes);
    };

    generateNodes();
  }, []);

  const testimonials = [
    {
      name: "Dr. Ahmad Ibrahim",
      role: "Islamic Scholar, Al-Azhar University",
      image: "/scholars/ahmad.jpg",
      quote: "BahtsulMasail has revolutionized how we approach Islamic legal discourse in the digital age. The platform's blend of traditional methodology with modern technology is truly groundbreaking.",
    },
    {
      name: "Ustadha Aminah Rahman",
      role: "Researcher, International Islamic University",
      image: "/scholars/aminah.jpg",
      quote: "The collaborative features have allowed me to engage with scholars across continents, bringing diverse perspectives to complex fiqh issues that previously would have taken months of correspondence.",
    },
    {
      name: "Shaykh Muhammad Noor",
      role: "Director, Center for Islamic Legal Studies",
      image: "/scholars/muhammad.jpg",
      quote: "The semantic search capability has transformed my research process. I can now find relevant opinions and historical precedents in seconds rather than hours of manual searching.",
    },
  ];

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Auto-rotate testimonials
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [inView, testimonials.length]);

  // Mouse follower effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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

  // Activities for the global activity visualizer
  const activities = [
    { type: "discussion", location: "Cairo, Egypt", time: "2 minutes ago" },
    { type: "research", location: "Jakarta, Indonesia", time: "5 minutes ago" },
    { type: "member", location: "Kuala Lumpur, Malaysia", time: "12 minutes ago" },
    { type: "discussion", location: "Doha, Qatar", time: "15 minutes ago" },
    { type: "research", location: "Istanbul, Turkey", time: "20 minutes ago" },
  ];

  return (
    <section 
      ref={inViewRef}
      className="relative py-32 overflow-hidden bg-background"
      style={{
        "--emerald-light": "rgba(16, 185, 129, 0.2)",
      } as React.CSSProperties}
    >
      <motion.div
        style={{
          opacity: springOpacity,
          scale: springScale,
          y: springY,
        }}
        className="container px-4 mx-auto"
      >
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Our Community
            </span>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The Tapestry of Minds
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join a global network of scholars, students, and enthusiasts dedicated to
              the preservation and evolution of Islamic legal thought.
            </p>
          </motion.div>
        </div>

        {/* Testimonials - "Echoes of Enlightenment" */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <motion.div
                className="text-9xl font-arabic text-primary/10"
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ 
                  scale: [0.9, 1.1, 0.9],
                  opacity: [0.5, 0.8, 0.5],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                الإجتهاد
              </motion.div>
            </div>

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-3xl mx-auto"
                >
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border border-border shadow-lg">
                    <div className="flex flex-col items-center text-center">
                      <motion.div 
                        className="w-24 h-24 mb-6 overflow-hidden rounded-full bg-primary/10 border-2 border-primary/20"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                          <User className="w-12 h-12 text-primary/50" />
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <p className="mb-6 text-xl italic text-foreground">
                          "{testimonials[activeTestimonial].quote}"
                        </p>
                        <div className="flex flex-col items-center">
                          <h4 className="text-lg font-semibold text-foreground">
                            {testimonials[activeTestimonial].name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonials[activeTestimonial].role}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      activeTestimonial === index ? "bg-primary" : "bg-primary/20"
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Global Scholar Network - "Our Constellation of Scholars" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-32"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border border-border">
              <h3 className="mb-6 text-2xl font-semibold text-foreground">
                Our Constellation of Scholars
              </h3>
              <p className="mb-6 text-muted-foreground">
                Connect with leading scholars, researchers, and students from around the globe,
                each bringing unique insights and expertise to our shared pursuit of knowledge.
              </p>
              
              <div className="relative h-[300px] rounded-lg bg-background/50 border border-border overflow-hidden">
                {/* Interactive 3D Global Map */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70">
                  <div className="absolute inset-0 opacity-40">
                    <motion.div
                      className="w-full h-full"
                      style={{
                        background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.15) 0%, transparent 60%)",
                      }}
                    />
                  </div>
                  
                  {/* Map nodes */}
                  {mapNodes.map((node, index) => (
                    <motion.div
                      key={index}
                      className="absolute rounded-full bg-primary"
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        width: `${node.size}px`,
                        height: `${node.size}px`,
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: node.pulseSpeed,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <g>
                      {mapNodes.slice(0, 10).map((node, i) => {
                        const connections = mapNodes.slice(10).filter((_, index) => index % 3 === i % 3);
                        return connections.map((connection, j) => (
                          <motion.line
                            key={`${i}-${j}`}
                            x1={`${node.x}%`}
                            y1={`${node.y}%`}
                            x2={`${connection.x}%`}
                            y2={`${connection.y}%`}
                            stroke="rgba(16, 185, 129, 0.2)"
                            strokeWidth="0.5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ 
                              pathLength: 1, 
                              opacity: [0, 0.5, 0],
                              strokeDasharray: "5,5",
                            }}
                            transition={{
                              duration: 3 + Math.random() * 2,
                              repeat: Infinity,
                              ease: "linear",
                              delay: Math.random() * 2,
                            }}
                          />
                        ));
                      })}
                    </g>
                  </svg>
                </div>
                
                <div className="absolute bottom-4 right-4">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>Active scholars: 127</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                  Explore the Network
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border border-border">
              <h3 className="mb-6 text-2xl font-semibold text-foreground">
                Global Activity Visualizer
              </h3>
              <p className="mb-6 text-muted-foreground">
                Watch in real-time as scholars and students around the world contribute to
                discussions, research, and the growing body of knowledge.
              </p>
              
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start p-4 rounded-lg bg-background/50 border border-border"
                  >
                    <div className="p-2 mr-4 rounded-full bg-primary/10">
                      {activity.type === "discussion" && <MessageSquare className="w-5 h-5 text-primary" />}
                      {activity.type === "research" && <Award className="w-5 h-5 text-primary" />}
                      {activity.type === "member" && <Users className="w-5 h-5 text-primary" />}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        New {activity.type === "discussion" ? "Discussion" : 
                              activity.type === "research" ? "Research" : "Member"}
                      </p>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Globe className="w-4 h-4 mr-1" />
                        <span>{activity.location}</span>
                        <span className="mx-2">•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                    <motion.div
                      className="absolute w-full h-full left-0 top-0 rounded-lg"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(16, 185, 129, 0)",
                          "0 0 0 4px rgba(16, 185, 129, 0.1)",
                          "0 0 0 0 rgba(16, 185, 129, 0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        delay: index * 0.5,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                  View All Activity
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA - "Become a Weaver of Wisdom" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative text-center"
        >
          <div className="p-12 rounded-2xl bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border border-border">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h3 className="mb-6 text-3xl font-bold text-foreground">
                Become a Weaver of Wisdom
              </h3>
              <p className="max-w-2xl mx-auto mb-8 text-lg text-muted-foreground">
                Join our scholarly community and contribute to the living tradition of Islamic legal discourse.
                Your perspective adds a unique thread to our collective tapestry of knowledge.
              </p>
              
              <motion.button
                className="relative px-8 py-4 text-base font-medium text-white transition-all duration-300 rounded-full overflow-hidden group"
                initial={{ background: "linear-gradient(90deg, #059669 0%, #10B981 100%)" }}
                whileHover={{ 
                  background: "linear-gradient(90deg, #10B981 0%, #059669 100%)",
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center">
                  Join the Scholarly Vanguard
                  <Users className="w-5 h-5 ml-2" />
                </span>
                <motion.span
                  className="absolute inset-0 w-0 bg-gradient-to-r from-emerald-600 to-emerald-500"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute inset-0 opacity-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
                  }}
                />
              </motion.button>
            </motion.div>
          </div>
          
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
      </motion.div>
    </section>
  );
} 