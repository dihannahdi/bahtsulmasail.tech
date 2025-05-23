import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Define the collection of quotes
const scholarlyQuotes = [
  {
    originalQuote: "إِنَّ مِنْ خِيَارِكُمْ أَحْسَنَكُمْ أَخْلَاقًا",
    translation: "The best among you are those who have the best manners and character.",
    transliteration: "Inna min khiyārikum aḥsanakum akhlāqā.",
    author: "Prophet Muhammad ﷺ",
    source: "Sahih al-Bukhari",
    isArabic: true
  },
  {
    originalQuote: "لَا تَمَلَّ مِنَ الْوُقُوفِ بِبَابِهِ وَلَوْ طُرِدْتَ",
    translation: "Do not tire of standing at His door. Even if you are refused, persist. Continual knocking opens the door.",
    transliteration: "Lā tamalla min al-wuqūfi bi-bābihi wa law ṭuridta.",
    author: "Shaykh Abdul Qadir al-Jilani رحمه الله",
    source: "Widely attributed Sufi saying",
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
    translation: "",
    author: "Shaykh Mustofa Bisri (Gus Mus) حفظه الله",
    source: "Widely attributed",
    isArabic: false
  },
  {
    originalQuote: "We need to foster a global movement that champions a vision of 'Humanitarian Islam' – one that reflects Islam's universal message of compassion (rahmah).",
    translation: "",
    author: "KH Yahya Cholil Staquf (Gus Yahya) حفظه الله",
    source: "From his speeches and writings",
    isArabic: false
  },
  {
    originalQuote: "Tuhan tidak perlu dibela",
    translation: "God doesn't need defending.",
    author: "KH Abdurrahman Wahid (Gus Dur) رحمه الله",
    source: "Widely attributed, iconic quote",
    isArabic: false
  }
];

const ScholarlyQuoteSection = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-rotate quotes every 8 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => 
        prevIndex === scholarlyQuotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Pause autoplay when user interacts with carousel
  const handleManualNavigation = (index: number) => {
    setIsAutoPlay(false);
    setCurrentQuoteIndex(index);
    
    // Resume autoplay after 15 seconds of inactivity
    const timeout = setTimeout(() => setIsAutoPlay(true), 15000);
    return () => clearTimeout(timeout);
  };

  const handlePrevious = () => {
    const newIndex = currentQuoteIndex === 0 
      ? scholarlyQuotes.length - 1 
      : currentQuoteIndex - 1;
    handleManualNavigation(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentQuoteIndex === scholarlyQuotes.length - 1 
      ? 0 
      : currentQuoteIndex + 1;
    handleManualNavigation(newIndex);
  };

  const currentQuote = scholarlyQuotes[currentQuoteIndex];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-islamic-dark to-islamic-dark/90 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(78, 161, 113, 0.4) 0%, rgba(17, 24, 39, 0) 70%)"
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full"
          />
        </div>
        
        {/* Islamic pattern overlay */}
        <div className="absolute inset-0 pattern-bg opacity-15"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-[15%] w-32 h-32 opacity-30">
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full border border-islamic-gold/40 rounded-full"
          />
        </div>
        <div className="absolute bottom-40 right-[10%] w-64 h-64 opacity-20">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, -8, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full border border-islamic-gold/40 rounded-full"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="px-4 py-1.5 rounded-full bg-islamic-gold/30 text-islamic-gold font-medium mb-4 inline-block text-sm">
            Hikmah & Kearifan
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-white">
            Kutipan Inspiratif
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="relative backdrop-blur-lg bg-gradient-to-br from-white/15 to-white/10 border-white/20 max-w-4xl mx-auto p-8 md:p-12 min-h-[320px] md:min-h-[300px] flex flex-col justify-center overflow-hidden shadow-2xl">
            {/* Large quote icon */}
            <div className="absolute -top-6 -left-6 text-islamic-gold/20">
              <Quote size={120} strokeWidth={1} />
            </div>
            
            {/* Small floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-islamic-gold/30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0, 0.9, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 5,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuoteIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.7,
                  type: "spring",
                  stiffness: 100
                }}
                className="flex flex-col items-center relative z-10"
              >
                {/* Main Quote */}
                <blockquote className={`font-serif text-xl md:text-2xl lg:text-3xl text-center mb-6 leading-relaxed ${currentQuote.isArabic ? 'font-arabic' : 'italic'}`}>
                  <span className={currentQuote.isArabic ? 'text-2xl md:text-3xl lg:text-4xl' : ''}>
                    "{currentQuote.originalQuote}"
                  </span>
                </blockquote>

                {/* Translation (if available) */}
                {currentQuote.translation && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/90 text-base md:text-lg italic text-center mb-6 max-w-2xl mx-auto"
                  >
                    "{currentQuote.translation}"
                  </motion.p>
                )}

                {/* Decorative divider */}
                <div className="w-16 h-0.5 bg-islamic-gold/70 my-4"></div>

                {/* Author and Source */}
                <motion.div 
                  className="text-center mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-islamic-gold text-lg font-medium">{currentQuote.author}</p>
                  {currentQuote.transliteration && (
                    <p className="text-xs mt-1 text-white/80">{currentQuote.transliteration}</p>
                  )}
                  <p className="text-sm text-white/80 mt-2">{currentQuote.source}</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </Card>
          
          {/* Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-8">
            <motion.button 
              onClick={handlePrevious}
              className="bg-white/20 hover:bg-islamic-gold/30 rounded-full p-2 md:p-3 transition-all backdrop-blur-sm border border-white/20 shadow-lg"
              aria-label="Previous quote"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>
            <motion.button 
              onClick={handleNext}
              className="bg-white/20 hover:bg-islamic-gold/30 rounded-full p-2 md:p-3 transition-all backdrop-blur-sm border border-white/20 shadow-lg"
              aria-label="Next quote"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {scholarlyQuotes.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleManualNavigation(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentQuoteIndex ? "w-8 bg-islamic-gold" : "w-2.5 bg-white/40 hover:bg-white/60"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to quote ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScholarlyQuoteSection;
