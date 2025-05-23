import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ContentCard } from './ContentCard';
import { QuoteBox } from './QuoteBox';

interface HalaqahSectionProps {
  textSize: 'normal' | 'large';
  theme: 'light' | 'dark';
  expandedPoints: Record<string, boolean>;
  toggleExpand: (id: string) => void;
  openModal: (title: string, content: string) => void;
}

export const HalaqahSection = forwardRef<HTMLDivElement, HalaqahSectionProps>(
  ({ textSize, theme, expandedPoints, toggleExpand, openModal }, ref) => {
    return (
      <motion.section
        ref={ref}
        id="halaqah"
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
              ? "bg-gradient-to-br from-emerald-50 to-teal-100" 
              : "bg-gradient-to-br from-emerald-900/30 to-teal-800/20"
          )}
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-teal-500/10 dark:bg-teal-500/5 -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
          
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
              Akar Intelektual Bahtsul Masail dalam Tradisi Islam Global
            </h2>
            
            <p 
              className={cn(
                "max-w-3xl mx-auto text-center",
                textSize === 'normal' ? "text-base" : "text-lg",
                theme === 'light' ? "text-slate-600" : "text-slate-300"
              )}
            >
              Bahtsul Masail sebagai mekanisme pengambilan keputusan hukum Islam dalam Nahdlatul Ulama (NU) 
              memiliki akar sejarah yang kompleks, menjembatani tradisi keilmuan Islam global dengan 
              konteks sosio-kultural Indonesia.
            </p>
          </div>
        </motion.div>
        
        {/* Content Cards */}
        <div className="space-y-4">
          <ContentCard
            id="halaqah1"
            title="Warisan Metodologi Halaqah dari Timur Tengah"
            content="Praksis Bahtsul Masail tidak dapat dipisahkan dari tradisi halaqah (lingkaran diskusi) yang berkembang di Haramain (Mekah dan Madinah) sejak abad ke-19. Para ulama Nusantara yang menimba ilmu di Timur Tengah terlibat aktif dalam halaqah-halaqah yang dipimpin ulama terkemuka."
            expandedContent="Ulama Nusantara yang belajar di Mekah–Madinah pada paruh kedua abad ke-19 sering bergabung dalam halaqah yang dipimpin tokoh seperti Syaikh Ahmad Zayni Dahlan dan Syaikh 'Abd al-Raḥmān al-Jīlānī. Misalnya, Syekh Nawawi al-Bantani (w. 1897) mencatat diskusi tentang hukum wakaf dan pembagian waris, kemudian membawanya pulang ke pesantren Semarang."
            icon="📚"
            isExpanded={expandedPoints["halaqah1"] || false}
            onToggle={() => toggleExpand("halaqah1")}
            onLearnMore={() => openModal("Halaqah di Haramain", "Tradisi halaqah di Haramain merupakan cikal bakal forum-forum diskusi ilmiah yang kemudian diterapkan di pesantren-pesantren Indonesia. Pola diskusi ini menjadi fondasi metodologis bagi Bahtsul Masail NU di kemudian hari. Ulama Nusantara seperti KH. Hasyim Asy'ari, KH. Ahmad Dahlan, dan KH. Wahab Chasbullah secara aktif terlibat dalam halaqah-halaqah di Makkah dan Madinah, mendalami berbagai kitab klasik seperti Al-Umm karya Imam Syafi'i dan Al-Muhadzdzab karya Imam al-Syairazi.")}
            theme={theme}
            textSize={textSize}
          />
          
          <ContentCard
            id="halaqah2"
            title="Kitab al-Muhadzdzab & Majelis Ijtihad Jama'i"
            content="Metode diskusi kolektif ini memiliki paralel dengan majelis ijtihad jama'i (ijtihad kolektif) dalam sejarah Islam klasik, meskipun NU mengembangkan kerangka metodologis yang spesifik."
            expandedContent="Dalam tradisi Syairazi (Imam al-Shirazi, w. 1083 M/476 H), al-Muhadzdzab mencatat prosedur fiqh kolektif: perumusan soal, penelusuran dalil, dan penegasan konsensus. NU mengadopsi kerangka umum ini—tetapi mengganti fokus qauly (mengutip) ke manhajiy (menelaah metodologi) setelah 1990."
            icon="🕌"
            isExpanded={expandedPoints["halaqah2"] || false}
            onToggle={() => toggleExpand("halaqah2")}
            onLearnMore={() => openModal("Kitab al-Muhadzdzab", "Kitab al-Muhadzdzab karya Imam al-Syairazi (w. 476 H) menjadi salah satu rujukan awal tentang prosedur pengambilan keputusan hukum secara kolektif dalam tradisi Islam. Kitab ini membahas pentingnya prinsip syūra (musyawarah) dalam menetapkan hukum Islam. Metode ini menekankan penelusuran pendapat-pendapat ulama terdahulu (aqwal) sebelum merumuskan pendapat baru, yang kemudian menjadi karakteristik utama dalam Bahtsul Masail.")}
            theme={theme}
            textSize={textSize}
          />
          
          <ContentCard
            id="halaqah3"
            title="Transformasi di Nusantara: Dari Halaqah ke Bahtsul Masail"
            content="Sebelum formalisasi NU tahun 1926, praktik serupa Bahtsul Masail telah hidup dalam bentuk musyawarah kiai di pesantren."
            expandedContent="Jauh sebelum NU resmi berdiri, kiai-kiai di pesantren Gontor, Lirboyo, dan Tebuireng rutin bertemu untuk membahas sengketa tanah wakaf, penetapan jadwal tahlilan vs. selamatan bumi, dan respons fatwa Belanda soal pajak masjid. Mekanisme ini sederhana: kiai mengutip kitab Turats — seperti Kitab al-Umm (Imam Syafi'i) dan al-Mughni (Ibn Qudāmah) — kemudian mengambil mufāwāḍah (kesepakatan) sesuai kebiasaan lokal."
            icon="🏛️"
            isExpanded={expandedPoints["halaqah3"] || false}
            onToggle={() => toggleExpand("halaqah3")}
            onLearnMore={() => openModal("Musyawarah Kiai Pra-1926", "Sebelum NU resmi berdiri, para kiai sudah menyelenggarakan forum-forum musyawarah untuk menyelesaikan permasalahan umat. Catatan sejarah menunjukkan musyawarah kiai di Pesantren Tebuireng tahun 1912 membahas respons terhadap kebijakan kolonial Belanda tentang wakaf. Musyawarah ini menjadi cikal bakal formalisasi Bahtsul Masail dalam struktur organisasi NU. Gaya bahasan dan metode pengambilan keputusan dalam forum-forum awal ini masih sangat kental dengan tradisi pesantren.")}
            theme={theme}
            textSize={textSize}
          />
        </div>
        
        {/* Quote Box */}
        <QuoteBox 
          quote="وَأَمْرُهُمْ شُورَى بَيْنَهُمْ"
          source="Surah Asy-Syura: 38"
          theme={theme}
          textSize={textSize}
        />
      </motion.section>
    );
  }
);

HalaqahSection.displayName = 'HalaqahSection'; 