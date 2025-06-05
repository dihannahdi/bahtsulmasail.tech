"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useAnimation } from "framer-motion";
import { Scale, RefreshCw, Pencil, Leaf, Info, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";

// Interactive 3D Calligraphy Component
interface InteractiveCalligraphyProps {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

const InteractiveCalligraphy = ({ isHovered, onHoverChange }: InteractiveCalligraphyProps) => {
  const calligraphyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const particles = useRef<Array<{
    x: number;
    y: number;
    size: number;
    life: number;
    vx: number;
    vy: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.01;
        particle.size *= 0.99;

        if (particle.life > 0) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        }
      });

      particles.current = particles.current.filter(p => p.life > 0);

      if (isHovered) {
        for (let i = 0; i < 2; i++) {
          particles.current.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 100,
            y: canvas.height / 2 + (Math.random() - 0.5) * 100,
            size: 2 + Math.random() * 3,
            life: 1,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            color: theme === "dark" 
              ? `rgba(16, 185, 129, ${0.3 + Math.random() * 0.7})`
              : `rgba(16, 185, 129, ${0.2 + Math.random() * 0.5})`
          });
        }
      }

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isHovered, theme]);

  return (
    <div 
      ref={calligraphyRef}
      className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm border border-border"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-arabic text-primary"
          style={{
            textShadow: isHovered 
              ? "0 0 20px rgba(16, 185, 129, 0.5)"
              : "none"
          }}
        >
          الإجتهاد
        </motion.div>
      </div>
    </div>
  );
};

// Enhanced Icon Card Component
interface IconCardProps {
  item: {
    icon: React.ElementType;
    title: string;
    description: string;
    tooltip: string;
    color: string;
  };
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
  onTooltipToggle: (index: number | null) => void;
}

const IconCard = ({ item, index, isActive, onHover, onTooltipToggle }: IconCardProps) => {
  const cardControls = useAnimation();
  const glowIntensity = useMotionValue(0);
  const glowOpacity = useTransform(glowIntensity, [0, 1], [0.2, 0.5]);

  useEffect(() => {
    if (isActive) {
      cardControls.start({
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" }
      });
      glowIntensity.set(1);
    } else {
      cardControls.start({
        scale: 1,
        transition: { duration: 0.3, ease: "easeOut" }
      });
      glowIntensity.set(0);
    }
  }, [isActive]);

  return (
    <motion.div
      animate={cardControls}
      className="relative group"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        style={{
          boxShadow: useTransform(
            glowOpacity,
            (opacity) => `0 0 ${opacity * 30}px rgba(16, 185, 129, ${opacity})`
          )
        }}
        className="relative p-8 transition-all duration-300 rounded-2xl bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border border-border hover:border-primary/50"
      >
        <motion.div
          className="flex flex-col items-center text-center"
          initial="initial"
          animate={isActive ? "active" : "initial"}
          whileHover="hover"
          variants={{
            initial: { scale: 1, y: 0 },
            hover: { scale: 1.1, y: -5 },
            active: { scale: 1.2, y: -10 }
          }}
        >
          <motion.div 
            className={`p-4 mb-6 rounded-2xl bg-gradient-to-br ${item.color}`}
            whileHover={{
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <item.icon className="w-8 h-8 text-primary" />
          </motion.div>
          <h3 className="mb-3 text-2xl font-semibold text-foreground">
            {item.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {item.description}
          </p>
          
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
            onClick={() => onTooltipToggle(index)}
          >
            <Info className="w-4 h-4 mr-1" />
            <span>Learn more</span>
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.1) 0%, transparent 60%)",
          }}
        />

        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        />
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute z-10 p-4 mt-2 text-sm text-foreground bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border border-border"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              width: "200px"
            }}
          >
            {item.tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function TraditionSection() {
  const [activeIcon, setActiveIcon] = useState<number | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [calligraphyHovered, setCalligraphyHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -50]);
  
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const springOpacity = useSpring(opacity, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

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

  const items = [
    {
      icon: Scale,
      title: "Rigorous Analysis",
      description: "Deep examination of Islamic texts and scholarly opinions",
      tooltip: "A core principle that guides our approach to Islamic jurisprudence, ensuring that every ruling is based on thorough analysis of primary sources and scholarly discourse.",
      color: "from-emerald-500/20 to-emerald-600/20",
    },
    {
      icon: RefreshCw,
      title: "Collaborative Dialogue",
      description: "Engagement between scholars and the community",
      tooltip: "We facilitate meaningful conversations between scholars, students, and the community, creating a dynamic space for shared understanding and mutual growth.",
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      icon: Pencil,
      title: "Evidence-Based Evolution",
      description: "Adapting traditional wisdom to modern contexts",
      tooltip: "Islamic law has always evolved to meet contemporary challenges while maintaining its core principles. We continue this tradition through rigorous scholarly methods.",
      color: "from-purple-500/20 to-purple-600/20",
    },
    {
      icon: Leaf,
      title: "Enduring Relevance",
      description: "Maintaining the timeless principles of Islamic law",
      tooltip: "Even as we adapt to new contexts, we ensure that the enduring principles and ethical foundations of Islamic law remain intact and relevant to contemporary life.",
      color: "from-amber-500/20 to-amber-600/20",
    },
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative py-32 overflow-hidden bg-background"
      style={{
        "--emerald-light": "rgba(16, 185, 129, 0.2)",
      } as React.CSSProperties}
    >
      <motion.div
        style={{ 
          opacity: springOpacity,
          scale: springScale,
          y: springY
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
              Our Approach
            </span>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Deconstructing Tradition
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Bahtsul Masail represents a time-honored tradition in Islamic scholarship,
              where complex legal questions are examined through rigorous analysis and
              scholarly discourse.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <IconCard
              key={index}
              item={item}
              index={index}
              isActive={activeIcon === index}
              onHover={setActiveIcon}
              onTooltipToggle={setActiveTooltip}
            />
          ))}
        </div>

        <div className="mt-20">
          <InteractiveCalligraphy
            isHovered={calligraphyHovered}
            onHoverChange={setCalligraphyHovered}
          />
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
    </section>
  );
} 