'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LoginPortalProps {
  onLogin: (username: string, password: string) => boolean;
}

export default function LoginPortal({ onLogin }: LoginPortalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generative art animation for the background
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; }[] = [];
    
    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const connectionDistance = 150;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `rgba(16, 185, 129, ${particle.opacity})`);
        gradient.addColorStop(1, `rgba(5, 150, 105, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles
        particles.forEach((particle2, j) => {
          if (i !== j) {
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              const opacity = 1 - (distance / connectionDistance);
              ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.25})`;
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

    // Clean up
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (onLogin(username, password)) {
      // Success is handled by parent component
    } else {
      setError('Invalid credentials');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      {/* Background canvas for generative art */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full z-0"
      ></canvas>

      {/* Logo */}
      <motion.div 
        className="absolute top-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex flex-col items-center">
          <div className="text-emerald-500 text-4xl font-bold">BahtsulMasail.tech</div>
          <div className="text-emerald-300 mt-1 text-sm">Enter the Vision</div>
        </div>
      </motion.div>
      
      {/* Login Form */}
      <motion.div 
        className="z-10 bg-black/40 backdrop-blur-md rounded-xl p-10 w-full max-w-md border border-emerald-500/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="username" className="text-emerald-300 text-sm">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full bg-black/60 border border-emerald-500/40 p-3 rounded-md text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-emerald-300 text-sm">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full bg-black/60 border border-emerald-500/40 p-3 rounded-md text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 focus:outline-none transition-all"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-600 hover:to-emerald-400 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center transition-all duration-300"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : null}
            Unveil the Vision
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
} 