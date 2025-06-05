"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useAnimation } from "framer-motion";
import { Code, Database, Globe, Shield, ArrowRight, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";

// Interactive Flow Lines Component
const InteractiveFlowLines = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const [flowLines, setFlowLines] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    delay: number;
    duration: number;
    color: string;
  }[]>([]);

  useEffect(() => {
    const generateLines = () => {
      const newLines = [];
      const numLines = 15;
      const colors = [
        "rgba(16, 185, 129, 0.6)",
        "rgba(16, 185, 129, 0.4)",
        "rgba(16, 185, 129, 0.2)",
      ];
      
      for (let i = 0; i < numLines; i++) {
        newLines.push({
          x1: Math.random() * 100,
          y1: Math.random() * 100,
          x2: Math.random() * 100,
          y2: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 3 + Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      setFlowLines(newLines);
    };
    
    generateLines();
    const interval = setInterval(generateLines, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
      {flowLines.map((line, index) => (
        <motion.path
          key={index}
          d={`M${line.x1}% ${line.y1}% Q${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${line.x2}% ${line.y2}%`}
          stroke={line.color}
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: [0, 0.7, 0],
            d: `M${line.x1}% ${line.y1}% Q${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${line.x2}% ${line.y2}%`
          }}
          transition={{ 
            duration: line.duration, 
            delay: line.delay,
            repeat: Infinity,
            ease: "easeInOut",
            d: { duration: 0.1, ease: "linear" }
          }}
        />
      ))}
    </svg>
  );
};

// Enhanced Feature Card Component
interface FeatureCardProps {
  feature: {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
    tech: string[];
  };
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
}

const FeatureCard = ({ feature, index, isActive, onHover }: FeatureCardProps) => {
  const cardControls = useAnimation();
  const glowIntensity = useMotionValue(0);
  const glowOpacity = useTransform(glowIntensity, [0, 1], [0.2, 0.5]);

  useEffect(() => {
    if (isActive) {
      cardControls.start({
        scale: 1.05,
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      });
      glowIntensity.set(1);
    } else {
      cardControls.start({
        scale: 1,
        y: 0,
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
        className="relative h-full p-8 transition-all duration-300 rounded-2xl bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border border-border hover:border-primary/50"
      >
        <div className="flex flex-col h-full">
          <motion.div 
            className={`p-4 mb-6 rounded-2xl bg-gradient-to-br ${feature.color}`}
            whileHover={{
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <feature.icon className="w-8 h-8 text-primary" />
          </motion.div>
          <h3 className="mb-3 text-2xl font-semibold text-foreground">
            {feature.title}
          </h3>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            {feature.description}
          </p>
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {feature.tech.map((tech, techIndex) => (
                <motion.span
                  key={techIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + techIndex * 0.05, duration: 0.3 }}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-primary/5 text-primary"
                  whileHover={{ 
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    y: -2
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

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
    </motion.div>
  );
};

// Interactive Timeline Component
interface TimelineEvent {
  year: number;
  icon: string;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  position: number;
  onSelect: (index: number) => void;
  selectedEvent: number | null;
}

const Timeline = ({ events, position, onSelect, selectedEvent }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  return (
    <div className="relative mt-20 overflow-hidden">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <motion.div
        ref={timelineRef}
        className="relative flex gap-8 py-8"
        style={{
          x: useTransform(
            useMotionValue(position),
            [0, events.length - 1],
            ["0%", `-${(events.length - 1) * 100}%`]
          )
        }}
      >
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="relative flex-shrink-0 w-64"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.button
              className="relative w-full p-6 text-center transition-all duration-300 rounded-2xl bg-gradient-to-br from-background to-background/80 backdrop-blur-sm border border-border hover:border-primary/50"
              whileHover={{ y: -5 }}
              onClick={() => onSelect(index)}
              animate={{
                scale: selectedEvent === index ? 1.05 : 1,
                y: selectedEvent === index ? -5 : 0
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="flex items-center justify-center w-12 h-12 text-2xl rounded-full bg-primary/10"
                  whileHover={{
                    boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)"
                  }}
                >
                  {event.icon}
                </motion.div>
              </div>
              
              <div className="mt-6">
                <div className="text-2xl font-bold text-primary">
                  {event.year}
                </div>
                <h4 className="mt-2 text-lg font-semibold text-foreground">
                  {event.title}
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export function TechnologySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [timelinePosition, setTimelinePosition] = useState(0);
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0.9, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [50, 0, 0, -50]);
  
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

  // Auto advance timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setTimelinePosition((prev) => (prev + 1) % timelineEvents.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Code,
      title: "Modern Architecture",
      description: "Built with cutting-edge web technologies for optimal performance",
      color: "from-blue-500/20 to-blue-600/20",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
      icon: Database,
      title: "Secure Storage",
      description: "Advanced data management with robust security measures",
      color: "from-emerald-500/20 to-emerald-600/20",
      tech: ["PostgreSQL", "Prisma", "Redis", "JWT"],
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Accessible worldwide with responsive design and localization",
      color: "from-purple-500/20 to-purple-600/20",
      tech: ["i18n", "CDN", "Edge Functions", "PWA"],
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "End-to-end encryption and strict privacy controls",
      color: "from-amber-500/20 to-amber-600/20",
      tech: ["SSL/TLS", "2FA", "OAuth", "GDPR"],
    },
  ];
  
  const timelineEvents = [
    { year: 1914, icon: "🏛️", title: "Nahdlatul Wathan", description: "Founding of traditional Islamic boarding schools in East Java." },
    { year: 1926, icon: "💭", title: "Nahdlatul Ulama", description: "Establishment of the largest Islamic organization in Indonesia." },
    { year: 1945, icon: "🕌", title: "Masjumi", description: "Formation of the first post-independence Islamic political party." },
    { year: 1952, icon: "🤝", title: "PBNU Congress", description: "Formalization of the Bahtsul Masail methodology." },
    { year: 1965, icon: "⚔️", title: "Political Shift", description: "Islamic organizations navigate challenging political climate." },
    { year: 1984, icon: "📜", title: "Jakarta Charter", description: "Debates on the role of Islamic law in the constitution." },
    { year: 1992, icon: "🔄", title: "Reformation Era", description: "Adaptation of Bahtsul Masail to democratic transitions." },
    { year: 2007, icon: "📚", title: "Digital Archives", description: "First efforts to digitize Bahtsul Masail documents." },
    { year: 2015, icon: "🌍", title: "Global Network", description: "International collaboration on Islamic legal discourse." },
    { year: 2023, icon: "💻", title: "AI Integration", description: "Launch of AI-assisted Bahtsul Masail platform." }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative py-32 overflow-hidden bg-background"
      style={{
        "--emerald-light": "rgba(16, 185, 129, 0.2)",
      } as React.CSSProperties}
    >
      {/* Interactive background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/90" />
        <InteractiveFlowLines mousePosition={mousePosition} />
      </div>

      <motion.div
        style={{ 
          opacity: springOpacity,
          scale: springScale,
          y: springY
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
              Our Tech Stack
            </span>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The Alchemic Fusion
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We combine traditional Islamic scholarship with modern technology to
              create a platform that is both accessible and authentic.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              isActive={activeFeature === index}
              onHover={setActiveFeature}
            />
          ))}
        </div>

        <Timeline
          events={timelineEvents}
          position={timelinePosition}
          onSelect={setSelectedTimelineEvent}
          selectedEvent={selectedTimelineEvent}
        />
      </motion.div>
    </section>
  );
} 