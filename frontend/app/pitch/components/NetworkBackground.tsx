'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface NetworkBackgroundProps {
  activeSection: number;
}

export default function NetworkBackground({ activeSection }: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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

    // Create particles
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      glow: number;
    }
    
    const particleCount = 150;
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2,
        glow: Math.random() * 10 + 5
      });
    }
    
    // Connection distance
    let connectionDistance = 150;
    
    // Animation parameters that change with section
    let particleSpeed = 0.5;
    let connectionOpacity = 0.15;
    let particleGlow = 1;
    
    const animate = () => {
      // Update animation parameters based on active section
      switch(activeSection) {
        case 0: // Title section
          particleSpeed = 0.3;
          connectionDistance = 150;
          connectionOpacity = 0.2;
          particleGlow = 1.2;
          break;
        case 1: // Traction Teaser
        case 4: // Traction In-Depth
          particleSpeed = 0.6;
          connectionDistance = 180;
          connectionOpacity = 0.25;
          particleGlow = 1.5;
          break;
        case 2: // Problem
          particleSpeed = 0.2;
          connectionDistance = 100;
          connectionOpacity = 0.1;
          particleGlow = 0.8;
          break;
        case 3: // Solution
          particleSpeed = 0.4;
          connectionDistance = 170;
          connectionOpacity = 0.3;
          particleGlow = 1.4;
          break;
        case 8: // Vision
          particleSpeed = 0.7;
          connectionDistance = 200;
          connectionOpacity = 0.35;
          particleGlow = 1.8;
          break;
        default:
          particleSpeed = 0.4;
          connectionDistance = 150;
          connectionOpacity = 0.2;
          particleGlow = 1;
      }
      
      // Clear canvas with slight fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position with dynamic speed
        particle.x += particle.speedX * particleSpeed;
        particle.y += particle.speedY * particleSpeed;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle with emerald glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * particleGlow
        );
        gradient.addColorStop(0, `rgba(16, 185, 129, ${particle.opacity})`);
        gradient.addColorStop(0.6, `rgba(5, 150, 105, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(5, 150, 105, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * particleGlow, 0, Math.PI * 2);
        ctx.fill();
        
        // Connect particles
        particles.forEach((particle2, j) => {
          if (i !== j) {
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              const opacity = (1 - (distance / connectionDistance)) * connectionOpacity;
              
              // Create gradient line
              const gradient = ctx.createLinearGradient(
                particle.x, particle.y,
                particle2.x, particle2.y
              );
              gradient.addColorStop(0, `rgba(16, 185, 129, ${opacity})`);
              gradient.addColorStop(1, `rgba(5, 150, 105, ${opacity * 0.7})`);
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.stroke();
            }
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [activeSection]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 opacity-80"
    />
  );
} 