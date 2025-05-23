import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ContentCard } from './ContentCard';
import { QuoteBox } from './QuoteBox';

interface EarlySectionProps {
  textSize: 'normal' | 'large';
  theme: 'light' | 'dark';
  expandedPoints: Record<string, boolean>;
  toggleExpand: (id: string) => void;
  openModal: (title: string, content: string) => void;
}

export const EarlySection = forwardRef<HTMLDivElement, EarlySectionProps>(
  ({ textSize, theme, expandedPoints, toggleExpand, openModal }, ref) => {
    return (
      <motion.section
        ref={ref}
        id="early"
        className="mb-24 scroll-mt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        {/* Section Header */}
        <motion.div
          className={cn(
            "px-6 py-8 rounded-2xl mb-8 relative overflow-hidden",
            theme === 'light' 
              ? "bg-gradient-to-br from-blue-50 to-indigo-100" 
              : "bg-gradient-to-br from-blue-900/30 to-indigo-800/20"
          )}
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-500/10 dark:bg-blue-500/5 translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('/pattern-islamic.svg')] bg-repeat opacity-5"></div>
          
          <div className="relative z-10">
            <h2 
              className={cn(
                "font-serif text-center mb-4",
                textSize === 'normal' ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl",
                theme === 'light' ? "text-slate-900" : "text-white"
              )}
            >
              Institusionalisasi Bahtsul Masail dalam Nahdlatul Ulama
            </h2>
            
            <p 
              className={cn(
                "max-w-3xl mx-auto text-center",
                textSize === 'normal' ? "text-base" : "text-lg",
                theme === 'light' ? "text-slate-600" : "text-slate-300"
              )}
            >
              Fase pembentukan dan pengembangan awal Bahtsul Masail sebagai institusi resmi 
              dalam struktur organisasi Nahdlatul Ulama.
            </p>
          </div>
        </motion.div>
        
        {/* Content Cards */}
        <div className="space-y-4">
          <ContentCard
            id="early1"
            title="Fase Awal (1926-1989)"
            content="NU pertama kali menginstitusionalkan Bahtsul Masail dalam Kongres I NU di Surabaya, 21-23 September 1926 – hanya delapan bulan setelah organisasi ini berdiri."
            expandedContent="Pada fase ini, Bahtsul Masail berfungsi sebagai komisi khusus dalam muktamar yang membahas persoalan ubudiyah (ritual) dan muamalah (sosial). Materi yang dibahas sering kali merupakan respons terhadap kebijakan kolonial, seperti status tanah waqf yang diambil alih pemerintah Belanda. Metodologi awal masih mengikuti pendekatan qauly (mengutip pendapat ulama mazhab) tanpa analisis mendalam terhadap proses istinbath hukum."
            icon="📜"
            isExpanded={expandedPoints["early1"] || false}
            onToggle={() => toggleExpand("early1")}
            onLearnMore={() => openModal("Kongres I NU, Surabaya (1926)", "Kongres pertama NU membentuk 'Komisi Ubudiyah & Muamalah' yang membahas status tanah wakaf yang diambil alih Pemerintah Kolonial Belanda, keputusan Qunut Subuh, dan praktik tahlilan yang dihalalkan sebagai zikir kolektif.")}
            theme={theme}
            textSize={textSize}
          />
          
          <ContentCard
            id="early2"
            title="Perkembangan Muktamar ke-5 (1934)"
            content="Diskusi diperluas ke masalah pendidikan Islam (kurikulum pesantren) dan hubungan umat-negara (posisi NU terhadap politik Hindia Belanda)."
            expandedContent="Keputusan tentang qunut subuh dan tahlilan yang masih berlaku hingga kini berasal dari era ini. Forum Bahtsul Masail mulai membahas respons terhadap tantangan modernitas, termasuk isu pendidikan dan politik."
            icon="📝"
            isExpanded={expandedPoints["early2"] || false}
            onToggle={() => toggleExpand("early2")}
            onLearnMore={() => openModal("Keputusan Tahlilan", "Keputusan tentang kebolehan tahlilan yang dihasilkan pada masa awal Bahtsul Masail menjadi salah satu ciri khas tradisi NU yang bertahan hingga saat ini. Keputusan ini didasarkan pada analisis terhadap hadits dan praktik para sahabat tentang doa bersama untuk orang yang meninggal.")}
            theme={theme}
            textSize={textSize}
          />
        </div>
        
        {/* Quote Box */}
        <QuoteBox 
          quote="إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ"
          source="Hadits Riwayat Bukhari & Muslim"
          theme={theme}
          textSize={textSize}
        />
      </motion.section>
    );
  }
);

EarlySection.displayName = 'EarlySection'; 