'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, Users, Globe, ArrowRight, Building2, ScrollText,
  History, GraduationCap, Scale, Heart
} from 'lucide-react';

// Animation variants
const pageTransition = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Content sections
const sections = [
  {
    id: "introduction",
    title: "Pendahuluan",
    icon: <History className="w-6 h-6" />,
    content: `Nahdlatul Ulama (NU), yang berarti "Kebangkitan Ulama," adalah organisasi Islam independen terbesar tidak hanya di Indonesia tetapi secara global, dengan keanggotaan melebihi 40 juta pada tahun 2023. Didirikan pada tahun 1926, NU telah berkembang melampaui entitas keagamaan murni menjadi kekuatan sosial-budaya yang kuat.`
  },
  {
    id: "bahtsul-masail",
    title: "Bahtsul Masail",
    icon: <GraduationCap className="w-6 h-6" />,
    content: `Bahtsul Masail adalah forum khas untuk musyawarah keagamaan kolektif dan perumusan fatwa hukum. Praktik ini berakar dalam pada kesarjanaan Islam klasik dan berfungsi sebagai mekanisme utama NU untuk menangani masalah kontemporer melalui kacamata yurisprudensi Islam tradisional.`
  },
  {
    id: "methodology",
    title: "Metodologi",
    icon: <Scale className="w-6 h-6" />,
    content: `Bahtsul Masail mengikuti metodologi yang ketat dalam merumuskan keputusan hukum, termasuk pendekatan Qauly (tekstual), Ilhaqy (analogis), dan Manhajy (metodologis). Forum ini menggabungkan sumber-sumber klasik dengan pemahaman kontemporer untuk memberikan panduan yang relevan bagi masyarakat Muslim Indonesia.`
  },
  {
    id: "impact",
    title: "Dampak & Kontribusi",
    icon: <Heart className="w-6 h-6" />,
    content: `Kontribusi terpenting NU saat ini adalah mempromosikan Islam Nusantara – visi Islam yang moderat, toleran, adaptif secara budaya, dan berakar kuat dalam tradisi Indonesia. Visi ini berfungsi sebagai benteng penting melawan penyebaran ekstremisme dan radikalisme agama.`
  }
];

export default function SejarahBahtsulMasailPage() {
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background text-foreground relative overflow-hidden"
    >
      {/* Islamic Pattern Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 pattern-bg opacity-[0.02] dark:opacity-[0.03]" />
        <motion.div 
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-islamic-green/10 rounded-full blur-3xl"
        />
        <motion.div 
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-islamic-gold/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <motion.header 
        style={{ opacity: headerOpacity }}
        className="relative pt-20 pb-16 px-4 text-center z-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 opacity-20"
          >
            <ScrollText className="w-full h-full text-islamic-green" />
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 heading-islamic-gradient"
            variants={contentVariants}
          >
            Sejarah Bahtsul Masail
          </motion.h1>

          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            variants={contentVariants}
          >
            Akar 
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4 justify-center items-center mb-12"
            variants={contentVariants}
          >
            {[
              { icon: <BookOpen className="w-4 h-4 mr-2" />, text: "Tradisi Keilmuan" },
              { icon: <Users className="w-4 h-4 mr-2" />, text: "Nahdlatul Ulama" },
              { icon: <Globe className="w-4 h-4 mr-2" />, text: "Islam Nusantara" },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  variant="secondary" 
                  className="px-6 py-3 text-base backdrop-blur-sm bg-card/40 border border-islamic-green/20 hover:border-islamic-green/40 transition-all duration-300"
                >
                  {badge.icon}
                  <span className="ml-2">{badge.text}</span>
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="w-32 h-1 mx-auto bg-gradient-to-r from-islamic-green via-islamic-gold to-islamic-blue rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 128, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {sections.map((section, idx) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative p-8 rounded-3xl bg-card/40 backdrop-blur-sm border border-islamic-green/20 hover:border-islamic-green/40 transition-all duration-300"
            >
              <div className="absolute -top-4 left-8 w-12 h-12 rounded-xl bg-islamic-green/10 backdrop-blur-sm flex items-center justify-center">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold mb-4 pt-6 heading-islamic-gradient">
                {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </motion.section>
          ))}
        </div>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="relative p-12 rounded-3xl bg-card/40 backdrop-blur-sm border border-islamic-green/20">
            <h2 className="text-3xl font-bold mb-4 heading-islamic-gradient">
              Pelajari Lebih Lanjut
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Temukan lebih banyak tentang kontribusi Bahtsul Masail dalam membentuk pemahaman Islam yang moderat dan kontekstual di Indonesia.
            </p>
            <Button 
              variant="secondary"
              size="lg"
              className="group bg-gradient-to-r from-islamic-green to-islamic-gold hover:opacity-90 text-white"
            >
              Jelajahi Arsip
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
} 