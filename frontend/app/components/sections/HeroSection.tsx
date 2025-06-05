"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

// Particle system component
const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const particles = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = theme === "dark" 
          ? `rgba(16, 185, 129, ${particle.alpha})`
          : `rgba(16, 185, 129, ${particle.alpha * 0.5})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
};

// Enhanced search bar component
interface EnhancedSearchBarProps {
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  placeholderTexts: string[];
  currentPlaceholderIndex: number;
}

const EnhancedSearchBar = ({ 
  isFocused, 
  onFocus, 
  onBlur,
  placeholderTexts,
  currentPlaceholderIndex 
}: EnhancedSearchBarProps) => {
  const searchControls = useAnimation();
  const glowIntensity = useMotionValue(0);
  const glowOpacity = useTransform(glowIntensity, [0, 1], [0.2, 0.5]);

  useEffect(() => {
    if (isFocused) {
      searchControls.start({
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      });
      glowIntensity.set(1);
    } else {
      searchControls.start({
        scale: 1,
        transition: { duration: 0.3, ease: "easeOut" },
      });
      glowIntensity.set(0);
    }
  }, [isFocused]);

  return (
    <motion.div
      animate={searchControls}
      className="relative max-w-2xl mx-auto mb-12"
    >
      <motion.div
        style={{
          boxShadow: useTransform(
            glowOpacity,
            (opacity) => `0 0 ${opacity * 30}px rgba(16, 185, 129, ${opacity})`
          ),
        }}
        className={`flex items-center px-6 py-4 transition-all duration-300 rounded-full bg-background/50 backdrop-blur-sm border ${
          isFocused
            ? "border-primary"
            : "border-border hover:border-primary/50"
        }`}
      >
        <input
          type="text"
          placeholder={placeholderTexts[currentPlaceholderIndex]}
          className="w-full px-4 text-foreground bg-transparent border-none focus:outline-none text-lg"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-primary hover:text-primary/80 transition-colors"
        >
          <Search className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export function HeroSection() {
  const [searchPlaceholder, setSearchPlaceholder] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const { theme } = useTheme();

  const placeholderTexts = [
    "Seek wisdom...",
    "Explore Fiqh...",
    "Uncover truths...",
    "Discover knowledge...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Enhanced background with dynamic gradient */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90"
          animate={{
            background: [
              "linear-gradient(to bottom, var(--background) 0%, rgba(16, 185, 129, 0.1) 50%, var(--background) 100%)",
              "linear-gradient(to bottom, var(--background) 0%, rgba(16, 185, 129, 0.2) 50%, var(--background) 100%)",
              "linear-gradient(to bottom, var(--background) 0%, rgba(16, 185, 129, 0.1) 50%, var(--background) 100%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <ParticleSystem />
      </div>

      {/* Main content */}
      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Untuk Islam Digdaya
            </motion.span>
          </motion.div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-7xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="block text-emerald-gradient"
            >
              Bahtsul Masail
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-normal text-muted-foreground"
            >
              Untuk Islam Digdaya
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto"
          >
            A platform for scholarly discourse and Islamic legal consultation,
            bringing traditional wisdom into the digital age.
          </motion.p>

          <EnhancedSearchBar
            isFocused={isSearchFocused}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholderTexts={placeholderTexts}
            currentPlaceholderIndex={currentPlaceholderIndex}
          />

          {/* Enhanced CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-3 text-base font-medium text-white transition-all duration-300 rounded-full btn-emerald hover:shadow-lg hover:shadow-primary/20"
            >
              Get Started
              <ArrowRight className="inline-block w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 text-base font-medium transition-all duration-300 rounded-full btn-emerald-outline hover:bg-primary/5"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
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
          className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
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
    </section>
  );
} 