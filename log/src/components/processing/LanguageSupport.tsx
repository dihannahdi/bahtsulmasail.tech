import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Globe, Languages } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { fadeUp, fadeScale, stagger, itemVariant } from "@/lib/animations";

const LanguageSupport = () => {
  const [activeLanguage, setActiveLanguage] = useState<number>(0);
  
  // Add refs for scroll animations
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  const languageTabsRef = useRef(null);
  const isLanguageTabsInView = useInView(languageTabsRef, { once: true, amount: 0.2 });
  
  const languageCardRef = useRef(null);
  const isLanguageCardInView = useInView(languageCardRef, { once: true, amount: 0.2 });
  
  const languageGridRef = useRef(null);
  const isLanguageGridInView = useInView(languageGridRef, { once: true, amount: 0.1 });
  
  const mixedDocRef = useRef(null);
  const isMixedDocInView = useInView(mixedDocRef, { once: true, amount: 0.2 });
  
  const languages = [
    {
      name: "Bahasa Arab",
      description: "Dukungan penuh untuk teks bahasa Arab dengan pengenalan karakter akurat dan pemrosesan RTL",
      example: "مثل على نص عربي مدعوم",
      color: "bg-islamic-gold/20",
      textColor: "text-islamic-gold"
    },
    {
      name: "Bahasa Indonesia",
      description: "Dioptimalkan untuk memproses dokumen berbahasa Indonesia dengan pengenalan istilah keislaman",
      example: "Contoh teks bahasa Indonesia yang didukung",
      color: "bg-islamic-green/20",
      textColor: "text-islamic-green"
    },
    {
      name: "Bahasa Inggris",
      description: "Mendukung literatur keislaman dalam bahasa Inggris untuk referensi internasional",
      example: "Example of supported English text",
      color: "bg-islamic-blue/20",
      textColor: "text-islamic-blue"
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        className="max-w-3xl mx-auto mb-8"
        ref={headerRef}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
        variants={fadeUp}
      >
        <h2 className="text-2xl font-serif font-medium mb-4 flex items-center mt-4 md:mt-6">
          <span className="inline-block bg-islamic-green/20 text-islamic-green rounded-full w-8 h-8 flex items-center justify-center mr-3">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          Dukungan Bahasa
        </h2>
        <p className="text-foreground/80">
          Platform kami dioptimalkan untuk mendukung berbagai bahasa yang umum digunakan dalam literatur Islam
        </p>
      </motion.div>

      {/* Language selector tabs */}
      <motion.div 
        className="flex justify-center mb-6"
        ref={languageTabsRef}
        initial="hidden"
        animate={isLanguageTabsInView ? "visible" : "hidden"}
        variants={fadeScale}
      >
        <div className="inline-flex bg-secondary/20 p-1 rounded-full">
          {languages.map((lang, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium relative ${
                activeLanguage === index ? 'text-white' : 'text-foreground/70 hover:text-foreground'
              }`}
              onClick={() => setActiveLanguage(index)}
              whileHover={{ scale: activeLanguage !== index ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeLanguage === index && (
                <motion.div
                  className={`absolute inset-0 rounded-full ${lang.color.replace('/20', '')}`}
                  layoutId="activeLang"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{lang.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Active language card */}
      <motion.div
        ref={languageCardRef}
        initial="hidden"
        animate={isLanguageCardInView ? "visible" : "hidden"}
        variants={fadeUp}
      >
        <motion.div
          key={activeLanguage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className={`border-2 ${languages[activeLanguage].color.replace('/20', '/30')} shadow-md`}>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className={`${languages[activeLanguage].color} p-6 flex flex-col justify-center items-center md:items-start`}>
                  <div className={`p-3 ${languages[activeLanguage].color.replace('/20', '/40')} rounded-full mb-4`}>
                    <Languages className={`h-8 w-8 ${languages[activeLanguage].textColor}`} />
                  </div>
                  <h3 className={`text-xl font-medium ${languages[activeLanguage].textColor}`}>
                    {languages[activeLanguage].name}
                  </h3>
                </div>
                
                <div className="p-6 md:col-span-2">
                  <p className="text-foreground/80 mb-4">
                    {languages[activeLanguage].description}
                  </p>
                  <div className={`p-4 ${languages[activeLanguage].color.replace('/20', '/10')} rounded-lg border ${languages[activeLanguage].color.replace('/20', '/30')}`}>
                    <h4 className="text-sm font-medium mb-2">Contoh:</h4>
                    <p className={activeLanguage === 0 ? "text-right font-arabic text-lg" : "text-lg"}>
                      {languages[activeLanguage].example}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* All language cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        ref={languageGridRef}
        initial="hidden"
        animate={isLanguageGridInView ? "visible" : "hidden"}
        variants={stagger}
      >
        {languages.map((language, index) => (
          <motion.div
            key={index}
            variants={itemVariant}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className={`border h-full cursor-pointer ${activeLanguage === index ? 'border-2 ' + language.color.replace('/20', '/30') : ''}`}
                onClick={() => setActiveLanguage(index)}>
              <CardContent className="p-6">
                <h4 className={`text-lg font-medium mb-3 ${activeLanguage === index ? language.textColor : ''}`}>
                  {language.name}
                </h4>
                <p className="text-foreground/80 text-sm mb-4">{language.description}</p>
                <div className={`p-3 ${language.color} rounded-md`}>
                  <p className={index === 0 ? "text-right font-arabic" : ""}>{language.example}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        ref={mixedDocRef}
        initial="hidden"
        animate={isMixedDocInView ? "visible" : "hidden"}
        variants={fadeScale}
        whileHover={{ scale: 1.01 }}
      >
        <Card className="border-2 border-islamic-blue/20 bg-gradient-to-r from-islamic-blue/5 to-islamic-purple/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-islamic-blue/10 rounded-full shrink-0">
                <Globe className="h-6 w-6 text-islamic-blue" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">Dokumen Campuran</h4>
                <p className="text-foreground/80">
                  Platform kami juga mendukung dokumen dengan campuran bahasa, yang umum dalam literatur Islam. 
                  Sistem akan mengidentifikasi bahasa dominan dan mempertahankan integritas konten multibahasa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LanguageSupport;
