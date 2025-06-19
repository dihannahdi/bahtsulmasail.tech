'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface NetworkBackgroundProps {
  activeSection: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  glow: number;
  originalSpeedX: number;
  originalSpeedY: number;
  color: string;
  pulsePhase: number;
  magnetism: number;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function NetworkBackground({ activeSection }: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isMouseActive, setIsMouseActive] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseActive(true);
    };

    const handleMouseLeave = () => {
      setIsMouseActive(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Enhanced particle system
    const particleCount = 200;
    const particles: Particle[] = [];
    
    // Color schemes for different sections
    const colorSchemes = {
      0: ['#10B981', '#34D399', '#6EE7B7'], // Title - Emerald
      1: ['#3B82F6', '#60A5FA', '#93C5FD'], // Traction - Blue
      2: ['#EF4444', '#F87171', '#FCA5A5'], // Problem - Red
      3: ['#10B981', '#34D399', '#6EE7B7'], // Solution - Emerald
      4: ['#8B5CF6', '#A78BFA', '#C4B5FD'], // Traction Deep - Purple
      5: ['#F59E0B', '#FBBF24', '#FCD34D'], // Market - Amber
      6: ['#DC2626', '#EF4444', '#F87171'], // Competition - Red
      7: ['#059669', '#10B981', '#34D399'], // Insights - Green
      8: ['#7C3AED', '#8B5CF6', '#A78BFA'], // Vision - Purple
      9: ['#0891B2', '#06B6D4', '#22D3EE'], // Team - Cyan
      10: ['#DB2777', '#EC4899', '#F472B6'], // Funding - Pink
      11: ['#10B981', '#34D399', '#6EE7B7'], // Contact - Emerald
    };

    const currentColors = colorSchemes[activeSection as keyof typeof colorSchemes] || colorSchemes[0];
    
    for (let i = 0; i < particleCount; i++) {
      const colorIndex = Math.floor(Math.random() * currentColors.length);
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: Math.random() * 0.8 - 0.4,
        speedY: Math.random() * 0.8 - 0.4,
        originalSpeedX: Math.random() * 0.8 - 0.4,
        originalSpeedY: Math.random() * 0.8 - 0.4,
        opacity: Math.random() * 0.7 + 0.3,
        glow: Math.random() * 15 + 8,
        color: currentColors[colorIndex],
        pulsePhase: Math.random() * Math.PI * 2,
        magnetism: Math.random() * 0.5 + 0.2
      });
    }
    
    // Dynamic animation parameters
    let connectionDistance = 180;
    let particleSpeed = 0.6;
    let connectionOpacity = 0.2;
    let particleGlow = 1.2;
    let mouseInfluence = 0;
    let waveAmplitude = 0;
    let rotationSpeed = 0;
    
    // Performance tracking
    let frameCount = 0;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      frameCount++;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Update animation parameters based on active section
      switch(activeSection) {
        case 0: // Title section - Majestic entrance
          particleSpeed = 0.4;
          connectionDistance = 200;
          connectionOpacity = 0.25;
          particleGlow = 1.5;
          mouseInfluence = 120;
          waveAmplitude = 0.5;
          rotationSpeed = 0.001;
          break;
        case 1: // Traction Teaser - Energy surge
        case 4: // Traction In-Depth
          particleSpeed = 0.8;
          connectionDistance = 220;
          connectionOpacity = 0.35;
          particleGlow = 1.8;
          mouseInfluence = 150;
          waveAmplitude = 1.2;
          rotationSpeed = 0.002;
          break;
        case 2: // Problem - Chaotic energy
          particleSpeed = 0.3;
          connectionDistance = 120;
          connectionOpacity = 0.15;
          particleGlow = 0.9;
          mouseInfluence = 80;
          waveAmplitude = 2.0;
          rotationSpeed = -0.001;
          break;
        case 3: // Solution - Harmonious flow
          particleSpeed = 0.6;
          connectionDistance = 200;
          connectionOpacity = 0.4;
          particleGlow = 2.0;
          mouseInfluence = 140;
          waveAmplitude = 0.8;
          rotationSpeed = 0.0015;
          break;
        case 8: // Vision - Ethereal beauty
          particleSpeed = 0.9;
          connectionDistance = 250;
          connectionOpacity = 0.45;
          particleGlow = 2.2;
          mouseInfluence = 180;
          waveAmplitude = 1.5;
          rotationSpeed = 0.003;
          break;
        case 10: // Funding - Magnetic attraction
          particleSpeed = 0.7;
          connectionDistance = 190;
          connectionOpacity = 0.3;
          particleGlow = 1.6;
          mouseInfluence = 160;
          waveAmplitude = 1.0;
          rotationSpeed = 0.0025;
          break;
        default:
          particleSpeed = 0.5;
          connectionDistance = 180;
          connectionOpacity = 0.25;
          particleGlow = 1.3;
          mouseInfluence = 100;
          waveAmplitude = 0.7;
          rotationSpeed = 0.0012;
      }
      
      // Clear canvas with enhanced fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        // Mouse interaction effects
        if (isMouseActive && mouseInfluence > 0) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseInfluence) {
            const force = (mouseInfluence - distance) / mouseInfluence;
            const angle = Math.atan2(dy, dx);
            particle.speedX += Math.cos(angle) * force * particle.magnetism * 0.01;
            particle.speedY += Math.sin(angle) * force * particle.magnetism * 0.01;
          }
        }

        // Wave motion effect
        particle.pulsePhase += 0.02;
        const waveOffset = Math.sin(particle.pulsePhase) * waveAmplitude;
        
        // Update position with enhanced dynamics
        particle.x += (particle.speedX + waveOffset * 0.1) * particleSpeed;
        particle.y += (particle.speedY + Math.cos(particle.pulsePhase) * waveAmplitude * 0.1) * particleSpeed;
        
        // Gentle speed decay back to original
        particle.speedX = particle.speedX * 0.99 + particle.originalSpeedX * 0.01;
        particle.speedY = particle.speedY * 0.99 + particle.originalSpeedY * 0.01;
        
        // Rotation effect
        if (rotationSpeed !== 0) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const relativeX = particle.x - centerX;
          const relativeY = particle.y - centerY;
          const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);
          
          if (distance > 50) { // Only rotate particles away from center
            const rotationForce = rotationSpeed * (distance / Math.max(canvas.width, canvas.height));
            particle.speedX += -relativeY * rotationForce;
            particle.speedY += relativeX * rotationForce;
          }
        }
        
        // Wrap around edges with buffer
        const buffer = 50;
        if (particle.x < -buffer) particle.x = canvas.width + buffer;
        if (particle.x > canvas.width + buffer) particle.x = -buffer;
        if (particle.y < -buffer) particle.y = canvas.height + buffer;
        if (particle.y > canvas.height + buffer) particle.y = -buffer;
        
        // Dynamic size and opacity pulsing
        const pulseScale = 1 + Math.sin(particle.pulsePhase) * 0.3;
        const currentSize = particle.size * pulseScale * particleGlow;
        const currentOpacity = particle.opacity * (0.7 + Math.sin(particle.pulsePhase * 1.5) * 0.3);
        
        // Extract RGB from hex color
        const hex = particle.color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Draw particle with enhanced multi-layer glow
        ctx.beginPath();
        
        // Outer glow
        const outerGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentSize * 3
        );
        outerGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.8})`);
        outerGradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.4})`);
        outerGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.fillStyle = outerGradient;
        ctx.arc(particle.x, particle.y, currentSize * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core particle
        ctx.beginPath();
        const coreGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentSize
        );
        coreGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity})`);
        coreGradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.6})`);
        coreGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.fillStyle = coreGradient;
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Enhanced connection system
        particles.forEach((particle2, j) => {
          if (i !== j) {
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              const opacity = Math.pow(1 - (distance / connectionDistance), 2) * connectionOpacity;
              
              // Color mixing for connections
              const hex2 = particle2.color.replace('#', '');
              const r2 = parseInt(hex2.substr(0, 2), 16);
              const g2 = parseInt(hex2.substr(2, 2), 16);
              const b2 = parseInt(hex2.substr(4, 2), 16);
              
              const avgR = Math.floor((r + r2) / 2);
              const avgG = Math.floor((g + g2) / 2);
              const avgB = Math.floor((b + b2) / 2);
              
              // Enhanced gradient line with dynamic width
              const lineWidth = Math.max(0.5, opacity * 3);
              const gradient = ctx.createLinearGradient(
                particle.x, particle.y,
                particle2.x, particle2.y
              );
              gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`);
              gradient.addColorStop(0.5, `rgba(${avgR}, ${avgG}, ${avgB}, ${opacity * 1.2})`);
              gradient.addColorStop(1, `rgba(${r2}, ${g2}, ${b2}, ${opacity})`);
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = lineWidth;
              ctx.lineCap = 'round';
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.stroke();
              
              // Add flowing energy dots on strong connections
              if (opacity > connectionOpacity * 0.7) {
                const flowProgress = (frameCount * 0.02) % 1;
                const flowX = particle.x + (particle2.x - particle.x) * flowProgress;
                const flowY = particle.y + (particle2.y - particle.y) * flowProgress;
                
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
                ctx.arc(flowX, flowY, 1, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate(performance.now());
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeSection, mousePosition, isMouseActive]);
  
  return (
    <>
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 opacity-90"
      />
      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50 text-xs text-gray-400 bg-black/50 p-2 rounded">
          Section: {activeSection} | Mouse: {isMouseActive ? 'Active' : 'Inactive'}
        </div>
      )}
    </>
  );
} 