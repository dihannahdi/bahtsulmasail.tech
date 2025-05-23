import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ContentCard } from './ContentCard';
import { QuoteBox } from './QuoteBox';

interface ModernSectionProps {
  textSize: 'normal' | 'large';
  theme: 'light' | 'dark';
  expandedPoints: Record<string, boolean>;
  toggleExpand: (id: string) => void;
  openModal: (title: string, content: string) => void;
}

export const ModernSection = forwardRef<HTMLDivElement, ModernSectionProps>(
  ({ textSize, theme, expandedPoints, toggleExpand, openModal }, ref) => {
    return (
      <motion.section
        ref={ref}
        id="modern"
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
              ? "bg-gradient-to-br from-amber-50 to-yellow-100" 
              : "bg-gradient-to-br from-amber-900/30 to-yellow-800/20"
          )}
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-500/10 dark:bg-amber-500/5 translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-yellow-500/10 dark:bg-yellow-500/5 -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          
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
              Reformasi Metodologis & Respons Kontemporer
            </h2>
            
            <p 
              className={cn(
                "max-w-3xl mx-auto text-center",
                textSize === 'normal' ? "text-base" : "text-lg",
                theme === 'light' ? "text-slate-600" : "text-slate-300"
              )}
            >
              Transformasi Bahtsul Masail menjadi lembaga yang lebih responsif terhadap 
              tantangan kontemporer dengan metodologi yang dinamis.
            </p>
          </div>
        </motion.div>
        
        {/* Content Cards */}
        <div className="space-y-4">
          <ContentCard
            id="modern1"
            title="Reformasi Metodologis (1990-2004)"
            content="Titik balik terjadi melalui Muktamar NU ke-28 di Yogyakarta (1989) yang merekomendasikan pembentukan Lajnah Bahtsul Masail Diniyah sebagai lembaga permanen."
            expandedContent="Perubahan signifikan terjadi dalam Munas Alim Ulama Lampung 1992 yang menetapkan pergeseran dari metode qauly ke manhajiy – menelusuri metodologi ulama mazhab dalam beristinbath, bukan sekadar mengutip hasil akhir. Reformasi ini diikuti dengan standarisasi prosedur: Tahqiq al-masalah (Verifikasi fakta), Taqyid al-masalah (Formulasi pertanyaan), Takhrij al-masa'il (Penelusuran referensi), Tanqih al-adillah (Penyaringan dalil), dan al-Ijtihad al-jama'i (Kesepakatan kolektif)."
            icon="⚖️"
            isExpanded={expandedPoints["modern1"] || false}
            onToggle={() => toggleExpand("modern1")}
            onLearnMore={() => openModal("Munas Alim Ulama Lampung (1992)", "Munas Alim Ulama di Lampung tahun 1992 menjadi titik balik dalam metodologi Bahtsul Masail dengan menetapkan pergeseran dari metode qauly ke manhajiy. Perubahan ini memungkinkan NU untuk merespons isu-isu kontemporer dengan lebih fleksibel namun tetap berpegang pada prinsip-prinsip hukum Islam. Perubahan ini dibawah kepemimpinan KH. Ahmad Shiddiq dan KH. Abdurrahman Wahid (Gus Dur) yang mendorong NU untuk lebih progresif dalam merespons tantangan zaman.")}
            theme={theme}
            textSize={textSize}
          />
          
          <ContentCard
            id="modern2"
            title="Modernisasi dan Respons Kontemporer (2004-sekarang)"
            content="Pascareformasi 2004, Lajnah ditingkatkan statusnya menjadi Lembaga Bahtsul Masail dengan kewenangan lebih luas."
            expandedContent="Era ini ditandai dengan pembahasan isu-isu kompleks seperti fintech syariah (2017), kripto dalam perspektif fikih (2021), dan status vaksin COVID-19 (2020). Lembaga ini kini mengadopsi teknologi digital untuk mengumpulkan masa'il waqi'iyah (masalah aktual) dari masyarakat melalui platform online, memperluas partisipasi publik dalam proses bahtsul masail."
            icon="💻"
            isExpanded={expandedPoints["modern2"] || false}
            onToggle={() => toggleExpand("modern2")}
            onLearnMore={() => openModal("Fatwa Fintech (2017)", "Pada tahun 2017, LBM NU mengeluarkan fatwa tentang fintech syariah yang membahas aspek-aspek hukum Islam dalam peer-to-peer lending, merchant-cash-advance, dan perlindungan konsumen digital. Fatwa ini menjadi panduan bagi umat Islam dalam bertransaksi menggunakan teknologi finansial modern. Keputusan ini menunjukkan fleksibilitas metode manhajiy yang mampu mengakomodasi isu-isu kontemporer yang belum pernah dibahas dalam kitab-kitab klasik.")}
            theme={theme}
            textSize={textSize}
          />
          
          <ContentCard
            id="modern3"
            title="Pengaruh Global & Diplomasi Fatwa"
            content="Bahtsul Masail era modern menjalin kerja sama internasional dalam isu-isu global seperti kemanusiaan, lingkungan, dan moderasi beragama."
            expandedContent="Seminar internasional di Al-Azhar (2019) membahas Islam Nusantara dan metodologi Bahtsul Masail sebagai contoh ijtihad kontekstual. Hasil-hasil Bahtsul Masail terkini diterjemahkan ke dalam bahasa Arab, Inggris, dan Prancis untuk audiens internasional, memperkuat posisi Indonesia dalam diplomasi Islam moderat."
            icon="🌏"
            isExpanded={expandedPoints["modern3"] || false}
            onToggle={() => toggleExpand("modern3")}
            onLearnMore={() => openModal("Islam Nusantara & Diplomasi Fatwa", "Seminar internasional di Universitas Al-Azhar, Kairo tahun 2019 memperkenalkan konsep Islam Nusantara dan metodologi Bahtsul Masail sebagai model ijtihad kontekstual yang dapat diadopsi oleh negara-negara Muslim lainnya. Forum ini menjadi bagian dari diplomasi fatwa NU dalam mempromosikan Islam moderat (wasathiyyah) di level global, yang mendapat sambutan positif dari komunitas internasional termasuk Grand Syaikh Al-Azhar, Prof. Dr. Ahmad Thayyib.")}
            theme={theme}
            textSize={textSize}
          />
        </div>
        
        {/* Quote Box */}
        <QuoteBox 
          quote="دَرْءُ الْمَفَاسِدِ مُقَدَّمٌ عَلَى جَلْبِ الْمَصَالِحِ"
          source="Qaidah Fiqhiyyah"
          theme={theme}
          textSize={textSize}
        />
      </motion.section>
    );
  }
);

ModernSection.displayName = 'ModernSection'; 