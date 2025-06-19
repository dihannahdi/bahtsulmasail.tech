'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mail, HelpCircle, ChevronRight, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

// Animation variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      damping: 25, 
      stiffness: 100 
    }
  }
};

const shimmer = {
  hidden: { 
    backgroundPosition: "200% 0",
  },
  visible: { 
    backgroundPosition: "0% 0",
    transition: { 
      repeat: Infinity,
      repeatType: "mirror" as const,
      duration: 3
    }
  }
};

const lightReveal = {
  hidden: { 
    opacity: 0,
    clipPath: "inset(0 100% 0 0)" 
  },
  visible: { 
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { 
      duration: 0.7,
      ease: "easeOut" 
    }
  }
};

// FAQ data
const faqItems = [
  {
    id: "q1",
    question: "Apa itu Bahtsul Masail?",
    answer: "Bahtsul Masail, secara harfiah 'diskusi masalah,' adalah tradisi keilmuan otentik yang lahir dan berkembang di pesantren Indonesia. Forum ini berfungsi sebagai platform bagi ulama dan santri untuk mendiskusikan dan merumuskan hukum Islam pada isu-isu kontemporer menggunakan metodologi fiqh yang komprehensif."
  },
  {
    id: "q2",
    question: "Mengapa BahtsulMasail.tech dibuat?",
    answer: "BahtsulMasail.tech didirikan untuk mendigitalisasi hasil Bahtsul Masail, menjadikannya mudah diakses oleh semua orang. Visi kami adalah melestarikan karya-karya asli pesantren, memastikan platform ini berfungsi sebagai pusat Bahtsul Masail yang bermanfaat bagi seluruh umat, menjembatani warisan intelektual pesantren dengan kebutuhan kontemporer."
  },
  {
    id: "q3",
    question: "Teknologi apa yang mendukung BahtsulMasail.tech, khususnya 'Pencarian Cerdas'?",
    answer: "Platform kami menggunakan teknologi canggih, termasuk Kecerdasan Buatan (AI) dan Pembelajaran Mesin. Ini secara khusus meningkatkan 'Pencarian Cerdas' kami, yang dirancang untuk memahami konteks dan makna dalam teks Bahtsul Masail, memungkinkan pengguna menemukan jawaban yang tepat untuk pertanyaan spesifik dengan cepat dan akurat tanpa mengurangi nilai substantif atau otoritas."
  },
  {
    id: "q4",
    question: "Bagaimana saya dapat berkontribusi ke BahtsulMasail.tech?",
    answer: "BahtsulMasail.tech berkembang berkat kolaborasi. Kami mengundang ulama, santri, peneliti, pengembang, dan siapa pun yang berbagi semangat kami untuk berkontribusi. Ini dapat berkisar dari mengirimkan data Bahtsul Masail, mengembangkan fitur, hingga menyebarkan informasi. Setiap kontribusi Anda sangat berharga."
  },
  {
    id: "q5",
    question: "Apakah konten di BahtsulMasail.tech hanya tersedia dalam Bahasa Indonesia?",
    answer: "Saat ini, fokus utama kami adalah menyajikan konten dalam Bahasa Indonesia untuk melayani audiens utama kami. Namun, kami memiliki visi untuk menyediakan akses dalam beberapa bahasa di masa depan, termasuk Bahasa Inggris dan Arab, seiring berkembangnya platform. Anda dapat melihat opsi bahasa yang tersedia di footer situs."
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItem, setOpenItem] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Filter FAQ items based on search term
  const filteredFaqItems = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Track mouse position for background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle item toggle
  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <motion.main
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-black to-emerald-950/30 text-foreground pt-12 pb-16 sm:pt-16 sm:pb-24 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Dynamic background with emerald light effect */}
      <div 
        className="fixed inset-0 bg-network-pattern opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.15) 0%, transparent 50%)`,
          backgroundBlendMode: 'screen'
        }}
      ></div>
      
      {/* Animated network lines in background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-[url('/images/network-lines.svg')] bg-repeat opacity-[0.07]"></div>
      </div>

      <motion.div variants={fadeUp} className="max-w-4xl mx-auto relative z-10">
        {/* Header section */}
        <header className="text-center mb-12 md:mb-16">
          <motion.div 
            variants={fadeUp}
            className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full mb-4 border border-emerald-500/20"
          >
            <HelpCircle className="w-10 h-10 text-emerald-400" />
          </motion.div>
          
          <motion.h1 
            variants={shimmer}
            className="text-4xl md:text-5xl font-bold heading-islamic bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent bg-[size:200%_100%]"
          >
            Pathways of Clarity Unveiled
          </motion.h1>
          
          <motion.p 
            variants={fadeUp} 
            className="mt-4 text-lg text-emerald-100/80"
          >
            Temukan jawaban atas pertanyaan umum tentang BahtsulMasail.tech
          </motion.p>
        </header>

        {/* Search bar */}
        <motion.div 
          variants={fadeUp} 
          className="relative mb-10 max-w-2xl mx-auto group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          <div className="relative flex items-center border-b-2 border-emerald-500/50 group-focus-within:border-emerald-400 transition-colors duration-300">
            <Search className="h-5 w-5 text-emerald-400/70 group-focus-within:text-emerald-400 transition-colors duration-300" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-transparent text-emerald-50 placeholder-emerald-400/50 focus:outline-none focus:placeholder-emerald-400/70"
            />
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          variants={fadeUp}
          className="w-full bg-black/40 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-emerald-500/10 overflow-hidden"
        >
          <AnimatePresence>
            {filteredFaqItems.length > 0 ? (
              filteredFaqItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, height: 0 }}
                  className={cn(
                    "mb-4 border-b border-emerald-500/10 last:border-0 last:mb-0 overflow-hidden",
                    openItem === item.id && "bg-emerald-900/10 rounded-lg"
                  )}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex justify-between items-center py-4 px-4 text-left text-lg font-medium text-emerald-100 hover:text-emerald-300 transition-colors duration-200 group"
                  >
                    <span 
                      className={cn(
                        "group-hover:text-emerald-300 transition-all duration-300",
                        openItem === item.id && "text-emerald-300"
                      )}
                    >
                      {searchTerm && item.question.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                        highlightText(item.question, searchTerm)
                      ) : (
                        item.question
                      )}
                    </span>
                    {openItem === item.id ? (
                      <Minus className="h-5 w-5 text-emerald-400 transition-transform duration-300" />
                    ) : (
                      <Plus className="h-5 w-5 text-emerald-400 transition-transform duration-300" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {openItem === item.id && (
                      <motion.div
                        key={`answer-${item.id}`}
                        variants={lightReveal}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-emerald-600"></div>
                        <div className="pl-5 pr-4 pb-5 text-emerald-100/90">
                          {searchTerm && item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                            highlightText(item.answer, searchTerm)
                          ) : (
                            item.answer
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <motion.div variants={fadeUp} className="text-center py-10">
                <HelpCircle className="w-12 h-12 text-emerald-500/40 mx-auto mb-3" />
                <p className="text-emerald-100/80">Tidak ada hasil yang ditemukan untuk "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-3 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Reset pencarian
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Still Have Questions Section */}
        <motion.div 
          variants={fadeUp}
          className="mt-12 text-center p-8 bg-gradient-to-br from-black to-emerald-950/30 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-500/20 relative overflow-hidden"
        >
          {/* Light effect in background */}
          <div className="absolute inset-0 bg-[url('/images/light-rays.svg')] bg-no-repeat bg-center opacity-[0.15] animate-pulse"></div>
          
          <Mail className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-2xl font-semibold text-emerald-100 mb-2">Belum Menemukan Jawaban Anda?</h3>
          <p className="text-emerald-100/80 mb-6 max-w-2xl mx-auto">
            Tim kami selalu siap menjawab pertanyaan lebih lanjut atau menerima masukan Anda. Jangan ragu untuk menghubungi kami.
          </p>
          <a 
            href="mailto:dihannahdii@gmail.com" 
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-emerald-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-lg hover:from-emerald-300 hover:to-teal-200 focus:ring-4 focus:outline-none focus:ring-emerald-500/50 transition-all duration-300 group shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          >
            Hubungi Kami <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform"/>
          </a>
        </motion.div>
        
        {/* Footer quote */}
        <motion.div 
          variants={fadeUp}
          className="mt-16 text-center"
        >
          <p className="text-emerald-400/60 italic">
            "Ilmu yang bermanfaat menerangi jalan menuju kebenaran dan kebijaksanaan."
          </p>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}

// Helper function to highlight search terms
function highlightText(text: string, searchTerm: string) {
  if (!searchTerm) return text;
  
  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  
  return (
    <>
      {parts.map((part, i) => 
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={i} className="bg-emerald-500/30 text-emerald-50 px-1 rounded">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
} 