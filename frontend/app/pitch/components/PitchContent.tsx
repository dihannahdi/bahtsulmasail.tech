'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import NetworkBackground from './NetworkBackground';
import PitchHeader from './PitchHeader';
import Section1Title from './sections/Section1Title';
import Section2TractionTeaser from './sections/Section2TractionTeaser';
import Section3Problem from './sections/Section3Problem';
import Section4Solution from './sections/Section4Solution';
import Section5TractionInDepth from './sections/Section5TractionInDepth';
import Section6MarketSize from './sections/Section6MarketSize';
import Section7Competition from './sections/Section7Competition';
import Section8UniqueInsights from './sections/Section8UniqueInsights';
import Section9Vision from './sections/Section9Vision';
import Section10Team from './sections/Section10Team';
import Section11Funding from './sections/Section11Funding';
import Section12Contact from './sections/Section12Contact';

export default function PitchContent() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollToSection, setScrollToSection] = useState<number | null>(null);
  
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll navigation
  useEffect(() => {
    if (scrollToSection !== null && sectionRefs[scrollToSection]?.current) {
      sectionRefs[scrollToSection].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setScrollToSection(null);
    }
  }, [scrollToSection]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (let i = sectionRefs.length - 1; i >= 0; i--) {
        const ref = sectionRefs[i];
        if (ref.current && scrollPosition >= ref.current.offsetTop) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && activeSection < sectionRefs.length - 1) {
        setScrollToSection(activeSection + 1);
      } else if (e.key === 'ArrowUp' && activeSection > 0) {
        setScrollToSection(activeSection - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSection]);

  const goToSection = (index: number) => {
    setScrollToSection(index);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-black text-white overflow-x-hidden"
    >
      <NetworkBackground activeSection={activeSection} />
      
      <PitchHeader 
        activeSection={activeSection} 
        goToSection={goToSection} 
        sectionCount={sectionRefs.length} 
      />
      
      <main className="pt-20">
        {/* Section 1: Title & Core Proposition */}
        <section ref={sectionRefs[0]} className="min-h-screen relative flex items-center justify-center py-20 px-4">
          <Section1Title />
        </section>
        
        {/* Section 2: Traction Teaser */}
        <section ref={sectionRefs[1]} className="min-h-screen relative flex items-center justify-center py-20 px-4">
          <Section2TractionTeaser />
        </section>
        
        {/* Section 3: The Problem */}
        <section ref={sectionRefs[2]} className="min-h-screen relative flex items-center justify-center py-20 px-4">
          <Section3Problem />
        </section>
        
        {/* Section 4: Our Solution */}
        <section ref={sectionRefs[3]} className="min-h-screen relative flex items-center justify-center py-20 px-4">
          <Section4Solution />
        </section>
        
        {/* Section 5: Traction In-Depth */}
        <section ref={sectionRefs[4]} className="min-h-screen relative flex items-center justify-center py-20 px-4">
          <Section5TractionInDepth />
        </section>
        
        {/* Section 6: Market Size */}
        <section ref={sectionRefs[5]} className="min-h-screen relative flex items-center justify-center py-20 px-4">
          <Section6MarketSize />
        </section>
        
        {/* Section 7: Competition */}
        <section ref={sectionRefs[6]} className="min-h-screen relative flex items-center justify-center py-20 px-4">
          <Section7Competition />
        </section>
        
        {/* Section 8: Unique Insights */}
        <section ref={sectionRefs[7]} className="min-h-screen relative flex items-center justify-center py-20 px-4">
          <Section8UniqueInsights />
        </section>
        
        {/* Section 9: Vision */}
        <section ref={sectionRefs[8]} className="min-h-screen relative flex items-center justify-center py-20 px-4">
          <Section9Vision />
        </section>
        
        {/* Section 10: Team */}
        <section ref={sectionRefs[9]} className="min-h-screen relative flex items-center justify-center py-20 px-4">
          <Section10Team />
        </section>
        
        {/* Section 11: Use of Funds & The Ask */}
        <section ref={sectionRefs[10]} className="min-h-screen relative flex items-center justify-center py-20 px-4">
          <Section11Funding />
        </section>
        
        {/* Section 12: Contact / Next Steps */}
        <section ref={sectionRefs[11]} className="min-h-screen relative flex items-center justify-center py-20 px-4">
          <Section12Contact />
        </section>
      </main>
    </div>
  );
} 