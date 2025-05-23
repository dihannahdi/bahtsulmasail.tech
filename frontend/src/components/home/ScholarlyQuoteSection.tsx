'use client';

import React, { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote as QuoteIcon } from "lucide-react"; // Renamed Quote to QuoteIcon

interface ScholarlyQuote {
  originalQuote: string;
  translation?: string;
  transliteration?: string;
  author: string;
  source?: string;
  isArabic: boolean;
}

const scholarlyQuotes: ScholarlyQuote[] = [
  {
    originalQuote: "إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلَاقًا",
    translation: "The best among you are those who have the best manners and character.",
    transliteration: "Inna min khiyārikum aḥsanakum akhlāqā.",
    author: "Prophet Muhammad ﷺ",
    source: "Sahih al-Bukhari",
    isArabic: true
  },
  {
    originalQuote: "الْمُحَافَظَةُ عَلَى الْقَدِيمِ الصَّالِحِ وَالْأَخْذُ بِالْجَدِيدِ الْأَصْلَحِ",
    translation: "Maintain the old ways that are good, and adopt the new ways that are better.",
    transliteration: "Al-muḥāfaẓatu ʿalā al-qadīm aṣ-ṣāliḥ wa-l-akhdhu bi-l-jadīd al-aṣlaḥ.",
    author: "Shaykh Hasyim Asy'ari رحمه الله",
    source: "Core principle of Nahdlatul Ulama",
    isArabic: true
  },
  {
    originalQuote: "If your prayers have not yet been able to prevent you from heinous and evil deeds, then question the seriousness of your prayers.",
    author: "Shaykh Mustofa Bisri (Gus Mus) حفظه الله",
    source: "Widely attributed",
    isArabic: false
  },
  {
    originalQuote: "Tuhan tidak perlu dibela",
    translation: "God doesn't need defending.",
    author: "KH Abdurrahman Wahid (Gus Dur) رحمه الله",
    source: "Widely attributed, iconic quote",
    isArabic: false
  },
  {
    originalQuote: "لَا تَمَلَّ مِنَ الْوُقُوفِ بِبَابِهِ وَلَوْ طُرِدْتَ",
    translation: "Do not tire of standing at His door. Even if you are refused, persist. Continual knocking opens the door.",
    transliteration: "Lā tamalla min al-wuqūfi bi-bābihi wa law ṭuridta.",
    author: "Shaykh Abdul Qadir al-Jilani رحمه الله",
    source: "Widely attributed Sufi saying",
    isArabic: true
  },
];

const ScholarlyQuoteSection = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  const handleManualNavigation = useCallback((newIndex: number) => {
    setIsAutoPlay(false);
    setUserInteracted(true);
    setCurrentQuoteIndex(newIndex);
  }, []);

  useEffect(() => {
    if (!isAutoPlay || userInteracted) return;
    const autoPlayInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) =>
        prevIndex === scholarlyQuotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    return () => clearInterval(autoPlayInterval);
  }, [isAutoPlay, userInteracted]);

  useEffect(() => {
    let interactionTimeout: NodeJS.Timeout;
    if (userInteracted) {
      interactionTimeout = setTimeout(() => {
        setIsAutoPlay(true);
        setUserInteracted(false);
      }, 15000); // Resume autoplay after 15s of inactivity
    }
    return () => clearTimeout(interactionTimeout);
  }, [userInteracted]);


  const handlePrevious = () => {
    const newIndex =
      currentQuoteIndex === 0
        ? scholarlyQuotes.length - 1
        : currentQuoteIndex - 1;
    handleManualNavigation(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentQuoteIndex === scholarlyQuotes.length - 1
        ? 0
        : currentQuoteIndex + 1;
    handleManualNavigation(newIndex);
  };

  const currentQuote = scholarlyQuotes[currentQuoteIndex];

  const quoteVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-background via-islamic-green/15 to-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 -z-0 opacity-20 dark:opacity-50">
        <motion.div 
          className="absolute inset-0 bg-islamic-green/10 blur-3xl"
          animate={{ 
            clipPath: [
              "circle(30% at 20% 30%)",
              "circle(40% at 80% 70%)",
              "circle(30% at 20% 30%)",
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-islamic-blue/5 blur-3xl"
          animate={{ 
            clipPath: [
              "circle(25% at 70% 20%)",
              "circle(35% at 30% 80%)",
              "circle(25% at 70% 20%)",
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>
      <div className="absolute inset-0 pattern-bg opacity-[0.03] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-islamic-gold/20 text-islamic-gold text-sm font-medium mb-4 inline-block border border-islamic-gold/30">
            Hikmah & Kearifan
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-islamic-dark">
            Kutipan Inspiratif Ulama Nusantara
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative max-w-3xl mx-auto"
        >
          <Card className="relative bg-background/90 dark:bg-islamic-dark/80 backdrop-blur-lg border border-islamic-gold/30 dark:border-islamic-gold/40 min-h-[380px] md:min-h-[350px] flex flex-col justify-center items-center p-6 pt-10 md:p-10 md:pt-12 overflow-hidden shadow-2xl">
            <QuoteIcon size={80} className="absolute -top-5 -left-5 text-islamic-gold/10 dark:text-islamic-gold/20 opacity-50 pointer-events-none" strokeWidth={1.5} />

            <AnimatePresence initial={false} custom={currentQuoteIndex} mode="wait">
              <motion.div
                key={currentQuoteIndex}
                custom={currentQuoteIndex} // Pass direction for variants if needed
                variants={quoteVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 }, duration: 0.5 }}
                className="w-full text-center"
              >
                <blockquote 
                  className={`font-serif text-xl md:text-2xl mb-5 leading-relaxed text-balance ${currentQuote.isArabic ? 'font-arabic text-2xl md:text-3xl lg:text-4xl leading-loose md:leading-loose' : 'italic'}`}
                  dir={currentQuote.isArabic ? 'rtl' : 'ltr'}
                >
                  &ldquo;{currentQuote.originalQuote}&rdquo;
                </blockquote>
                {currentQuote.translation && (
                  <p className="text-muted-foreground text-sm md:text-base italic text-center mb-5 max-w-xl mx-auto text-balance">
                    &ldquo;{currentQuote.translation}&rdquo;
                  </p>
                )}
                <div className="w-20 h-[1px] bg-islamic-gold/50 my-5 mx-auto"></div>
                <p className="text-sm font-medium text-islamic-gold/90">{currentQuote.author}</p>
                {currentQuote.source && <p className="text-xs text-muted-foreground/80 mt-1">{currentQuote.source}</p>}
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2.5 z-20">
              {scholarlyQuotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleManualNavigation(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-islamic-gold/50 ${currentQuoteIndex === index ? 'bg-islamic-gold scale-125' : 'bg-islamic-gold/30 hover:bg-islamic-gold/50'}`}
                  aria-label={`Go to quote ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={handlePrevious} 
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-islamic-gold/10 hover:bg-islamic-gold/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-islamic-gold/50 transition-colors text-islamic-gold/70 hover:text-islamic-gold"
              aria-label="Previous quote"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext} 
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-islamic-gold/10 hover:bg-islamic-gold/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-islamic-gold/50 transition-colors text-islamic-gold/70 hover:text-islamic-gold"
              aria-label="Next quote"
            >
              <ChevronRight size={20} />
            </button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ScholarlyQuoteSection; 