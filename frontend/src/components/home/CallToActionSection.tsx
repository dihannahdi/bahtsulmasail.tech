'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpenText, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { containerVariant, fadeUp } from '@/lib/animations';

const CallToActionSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariant} // Use a simple container variant or just fadeUp for the whole section
      className="py-20 md:py-32 bg-gradient-to-br from-primary to-islamic-green relative overflow-hidden text-primary-foreground"
      aria-labelledby="cta-heading"
    >
      {/* Overlay Islamic Pattern */}
      <div 
        className="absolute inset-0 bg-islamic-pattern opacity-5 dark:opacity-[0.03]"
        style={{ backgroundSize: '100px 100px' }} // Make pattern smaller
      ></div>

      {/* Subtle decorative blurs */}
      <div className="absolute bg-blur-circle-gold -bottom-20 -right-20 opacity-30 dark:opacity-20"></div>
      <div className="absolute bg-blur-circle-blue -top-20 -left-20 opacity-30 dark:opacity-20"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div variants={fadeUp}>
          <BookOpenText className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-4 text-islamic-gold" />
          <h2 
            id="cta-heading" 
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-balance tracking-tight text-white"
          >
            Siap Menjelajahi Khazanah Ilmu Islam?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
            Bergabunglah dengan komunitas kami, akses ribuan dokumen, dan temukan jawaban atas pertanyaan keagamaan Anda dengan dukungan teknologi modern.
          </p>
        </motion.div>

        <motion.div 
          variants={fadeUp} // Apply fadeUp to the button group as well
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
        >
          <Button 
            size="lg" 
            className="bg-islamic-gold hover:bg-islamic-gold/90 text-islamic-dark-hsl font-semibold text-base md:text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 smooth-transitions group w-full sm:w-auto"
            asChild
          >
            <Link href="/auth/register">
              <UserPlus className="w-5 h-5 mr-2.5 group-hover:animate-pulse" />
              Daftar Sekarang
            </Link>
          </Button>
          <Button 
            variant="outline"
            size="lg" 
            className="border-white/80 hover:border-white text-white hover:bg-white/10 font-medium text-base md:text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 smooth-transitions group w-full sm:w-auto"
            asChild
          >
            <Link href="/documents">
              Jelajahi Dokumen
              <ArrowRight className="w-5 h-5 ml-2.5 group-hover:translate-x-1 smooth-transitions" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CallToActionSection; 