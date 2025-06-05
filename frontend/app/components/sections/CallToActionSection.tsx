"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowRight, Star, Sparkles, ExternalLink } from "lucide-react";

export function CallToActionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<{ x: number; y: number; size: number; opacity: number; speed: number; }[]>([]);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.5, 0.6, 0.9, 1], [0.8, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0.5, 0.6, 0.9, 1], [100, 0, 0, -50]);
  
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const springOpacity = useSpring(opacity, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springY = useSpring(y, springConfig);

  // Generate cosmic background stars
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 1 + Math.random() * 3,
          opacity: 0.1 + Math.random() * 0.9,
          speed: 0.5 + Math.random() * 2
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

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
    
    // Track scroll speed
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;
      setScrollSpeed(Math.min(Math.abs(scrollDifference) / 5, 10));
      setLastScrollY(currentScrollY);
      
      // Gradually decrease scroll speed
      setTimeout(() => {
        setScrollSpeed((prev) => Math.max(prev * 0.9, 0));
      }, 100);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("scroll", handleScroll);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [lastScrollY]);

  // Custom animation for the CTA beams
  const beamVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: [0.2, 0.6, 0.2], 
      scale: [1, 1.2, 1],
      rotate: [0, 5, 0, -5, 0]
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative py-32 overflow-hidden bg-background"
      style={{
        "--emerald-light": "rgba(16, 185, 129, 0.2)",
      } as React.CSSProperties}
    >
      {/* Cosmic background with stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
        
        {/* Stars that respond to scroll speed */}
        {stars.map((star, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-primary"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              filter: `blur(${star.size > 2 ? 1 : 0}px)`
            }}
            animate={{
              y: [`${star.y}%`, `${star.y + scrollSpeed * star.speed * 0.5}%`],
              opacity: [star.opacity, star.opacity * (1 + scrollSpeed * 0.1)],
              scale: [1, 1 + scrollSpeed * 0.05]
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Light beams */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[800px] rounded-full bg-gradient-to-r from-primary/10 to-transparent blur-3xl"
          variants={beamVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: "10%",
            left: "5%",
            opacity: 0.2,
            transformOrigin: "center center"
          }}
        />
        <motion.div
          className="absolute w-[700px] h-[900px] rounded-full bg-gradient-to-l from-primary/15 to-transparent blur-3xl"
          variants={beamVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{
            bottom: "5%",
            right: "5%",
            opacity: 0.3,
            transformOrigin: "center center"
          }}
        />
      </div>

      <motion.div
        style={{
          opacity: springOpacity,
          scale: springScale,
          y: springY,
        }}
        className="container relative z-10 px-4 mx-auto"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-12 rounded-2xl bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-lg border border-primary/20 shadow-[0_0_50px_rgba(16,185,129,0.1)]"
          >
            {/* Interactive glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-2xl opacity-40"
              style={{
                background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.3) 0%, transparent 60%)",
              }}
            />
            
            {/* Cosmic structure visualization - Grows on scroll */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <svg 
                className="absolute w-full h-full" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
                style={{ opacity: 0.1 }}
              >
                {/* Generate geometric patterns */}
                {[...Array(8)].map((_, i) => (
                  <motion.path
                    key={i}
                    d={`M${50 + (i * 5) * Math.cos(0)} ${50 + (i * 5) * Math.sin(0)} ${Array.from({ length: 12 }).map((_, j) => {
                      const angle = (j / 12) * Math.PI * 2;
                      return `L${50 + (i * 5) * Math.cos(angle)} ${50 + (i * 5) * Math.sin(angle)}`;
                    }).join(' ')} Z`}
                    stroke="rgba(16, 185, 129, 0.5)"
                    strokeWidth="0.2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: 1,
                      rotate: [0, i % 2 === 0 ? 360 : -360]
                    }}
                    transition={{ 
                      duration: 20 + i * 5, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
                
                {/* Connecting lines */}
                {[...Array(20)].map((_, i) => {
                  const startAngle = Math.random() * Math.PI * 2;
                  const endAngle = startAngle + (Math.random() * Math.PI);
                  const startRadius = 5 + Math.random() * 20;
                  const endRadius = 25 + Math.random() * 25;
                  
                  return (
                    <motion.line
                      key={`line-${i}`}
                      x1={50 + startRadius * Math.cos(startAngle)}
                      y1={50 + startRadius * Math.sin(startAngle)}
                      x2={50 + endRadius * Math.cos(endAngle)}
                      y2={50 + endRadius * Math.sin(endAngle)}
                      stroke="rgba(16, 185, 129, 0.3)"
                      strokeWidth="0.15"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: [0, 0.7, 0]
                      }}
                      transition={{ 
                        duration: 3 + Math.random() * 5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: Math.random() * 5
                      }}
                    />
                  );
                })}
              </svg>
            </div>
            
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Our Vision
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              >
                The Everlasting Light
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12 text-xl text-muted-foreground leading-relaxed"
              >
                Join us in illuminating the path of Islamic jurisprudence for generations to come.
                Together, we can preserve the rich tradition of scholarly discourse while embracing
                the possibilities of the digital age.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center"
              >
                <motion.div
                  className="group relative px-8 py-4 text-base font-medium text-white transition-all duration-300 rounded-full overflow-hidden"
                  initial={{ background: "linear-gradient(90deg, #059669 0%, #10B981 100%)" }}
                  whileHover={{ 
                    background: "linear-gradient(90deg, #10B981 0%, #059669 100%)",
                    boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = '/pitch'}
                >
                  <span className="relative z-10 flex items-center cursor-pointer">
                    Investor Pitch
                    <ArrowRight className="inline-block w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
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
                  
                  {/* Particle burst on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-primary"
                        initial={{ 
                          x: 0, 
                          y: 0,
                          scale: 0,
                          opacity: 0 
                        }}
                        whileHover={{ 
                          x: [0, (Math.random() - 0.5) * 50], 
                          y: [0, (Math.random() - 0.5) * 50],
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 1 + Math.random(), 
                          repeat: Infinity,
                          delay: Math.random() * 0.5
                        }}
                        style={{
                          left: `${50 + (Math.random() - 0.5) * 20}%`,
                          top: `${50 + (Math.random() - 0.5) * 20}%`
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>

                <motion.button
                  className="relative inline-flex items-center px-8 py-4 text-base font-medium transition-all duration-300 border-2 rounded-full btn-emerald-outline hover:bg-primary/5 border-primary/50"
                  whileHover={{ 
                    borderColor: "rgba(16, 185, 129, 0.8)",
                    boxShadow: "0 0 10px rgba(16, 185, 129, 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    Join the Scholarly Vanguard
                    <Star className="w-5 h-5 ml-2" />
                  </span>
                  <motion.span
                    className="absolute inset-0 opacity-0 rounded-full"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
                    }}
                  />
                </motion.button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8"
              >
                <a href="#" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Connect with Our Custodians of Knowledge
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Enhanced animated elements - Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 rounded-full bg-primary/30"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: 0.1 + Math.random() * 0.3,
                scale: 0.5 + Math.random() * 1.5
              }}
              animate={{ 
                y: [
                  Math.random() * 100 + "%", 
                  Math.random() * 100 + "%"
                ],
                x: [
                  Math.random() * 100 + "%", 
                  Math.random() * 100 + "%"
                ],
                opacity: [
                  0.1 + Math.random() * 0.3,
                  0.3 + Math.random() * 0.5,
                  0.1 + Math.random() * 0.3
                ]
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
} 