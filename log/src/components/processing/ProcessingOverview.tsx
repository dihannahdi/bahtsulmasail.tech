import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Languages, Search, Repeat, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fadeUp, fadeScale, stagger, itemVariant } from "@/lib/animations";

const ProcessingOverview = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  // Add refs for scroll animations
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  const processFlowRef = useRef(null);
  const isProcessFlowInView = useInView(processFlowRef, { once: true, amount: 0.2 });
  
  const stepDetailRef = useRef(null);
  const isStepDetailInView = useInView(stepDetailRef, { once: true, amount: 0.2 });
  
  const processSteps = [
    {
      icon: <FileText className="h-6 w-6 text-islamic-blue" />,
      title: "Ekstraksi Konten",
      description: "Mengekstrak teks dan struktur dari berbagai format dokumen termasuk PDF, Word, gambar, dan bahkan audio.",
      details: "Teknologi OCR canggih kami mampu mengenali teks bahkan dari gambar atau dokumen scan dengan akurasi tinggi. Kami juga dapat mengekstrak struktur dokumen seperti paragraf, judul, tabel, dan footnote untuk menjaga integritas asli dari dokumen tersebut."
    },
    {
      icon: <Languages className="h-6 w-6 text-islamic-purple" />,
      title: "Deteksi Bahasa",
      description: "Secara otomatis mengenali bahasa dalam dokumen, termasuk Arab, Indonesia, dan Inggris, serta mendukung konten multibahasa.",
      details: "Sistem kami mampu mendeteksi dan memproses teks dalam berbagai bahasa secara simultan, termasuk dokumen yang mengandung campuran bahasa Arab dan Indonesia yang umum dalam literatur Islam. Model NLP kami dilatih khusus untuk mengenali nuansa bahasa dalam konteks keislaman."
    },
    {
      icon: <Search className="h-6 w-6 text-islamic-green" />,
      title: "Analisis Konten",
      description: "Mengidentifikasi istilah kunci, topik pembahasan, dan referensi/kutipan yang digunakan dalam dokumen.",
      details: "Algoritma pemahaman kontekstual kami dapat mengidentifikasi isu-isu utama dalam teks, mengenali istilah-istilah khusus dalam keilmuan Islam, serta melacak referensi dan kutipan. Kemampuan ini memungkinkan pencarian yang lebih mendalam dan kontekstual."
    },
    {
      icon: <Repeat className="h-6 w-6 text-islamic-gold" />,
      title: "Konversi Format",
      description: "Mengkonversi dokumen ke format standar untuk memudahkan pencarian, aksesibilitas, dan pencocokan lintas format.",
      details: "Dokumen dikonversi ke format terstandarisasi yang memudahkan pencarian semantik. Format ini juga memastikan dokumen dapat diakses melalui berbagai perangkat dan platform, sambil tetap mempertahankan integritas konten aslinya."
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        className="max-w-3xl mx-auto"
        ref={headerRef}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
        variants={fadeUp}
      >
        <h2 className="text-2xl font-serif font-medium mb-4 flex items-center mt-4 md:mt-6">
          <span className="inline-block bg-islamic-green/20 text-islamic-green rounded-full w-8 h-8 flex items-center justify-center mr-3">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          Tentang Pemrosesan Dokumen
        </h2>
        <p className="text-foreground/80 mb-6">
          Platform kami menggunakan teknologi terdepan untuk memproses dokumen Islam dari berbagai format, 
          memungkinkan pencarian semantik dan analisis mendalam yang tidak mungkin dilakukan secara manual.
        </p>
        
        <motion.div 
          className="bg-gradient-to-r from-islamic-blue/5 to-islamic-purple/5 rounded-xl p-6 mb-8 border border-islamic-blue/10"
          variants={fadeScale}
        >
          <h3 className="text-xl font-medium mb-4 text-islamic-blue">Bagaimana Cara Kerjanya?</h3>
          <p className="text-foreground/80 mb-4">
            Proses pengolahan dokumen melibatkan beberapa tahap, mulai dari ekstraksi teks hingga analisis konteks dan 
            pengenalan bahasa otomatis. Berikut adalah proses yang dilakukan platform kami:
          </p>
        </motion.div>
      </motion.div>

      {/* Process Flow */}
      <motion.div 
        className="relative py-2 overflow-hidden"
        ref={processFlowRef}
        initial="hidden"
        animate={isProcessFlowInView ? "visible" : "hidden"}
        variants={fadeScale}
      >
        <div className="absolute left-0 right-0 h-1 top-1/2 transform -translate-y-1/2 bg-muted">
          <motion.div 
            className="h-full bg-islamic-green"
            initial={{ width: '0%' }}
            animate={{ width: `${(activeStep + 1) * 25}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <motion.div 
          className="grid grid-cols-4 relative z-10"
          variants={stagger}
        >
          {processSteps.map((_, index) => (
            <motion.button
              key={index}
              className="flex flex-col items-center"
              onClick={() => setActiveStep(index)}
              variants={itemVariant}
            >
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                  index <= activeStep ? 'bg-islamic-green text-white' : 'bg-muted text-foreground/50'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {index + 1}
              </motion.div>
              <span className={`text-xs mt-2 hidden md:block ${
                index <= activeStep ? 'text-islamic-green font-medium' : 'text-foreground/50'
              }`}>
                {processSteps[index].title}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Step Detail */}
      <motion.div
        ref={stepDetailRef}
        initial="hidden"
        animate={isStepDetailInView ? "visible" : "hidden"}
        variants={fadeUp}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-islamic-green/20 shadow-md overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className={`p-6 flex flex-col justify-center items-center text-white bg-gradient-to-br ${
                    activeStep === 0 ? 'from-islamic-blue to-islamic-blue/80' :
                    activeStep === 1 ? 'from-islamic-purple to-islamic-purple/80' :
                    activeStep === 2 ? 'from-islamic-green to-islamic-green/80' :
                    'from-islamic-gold to-islamic-gold/80'
                  }`}>
                    <div className="p-3 bg-white/10 rounded-full mb-4">
                      {processSteps[activeStep].icon}
                    </div>
                    <h3 className="text-xl font-medium text-center">{processSteps[activeStep].title}</h3>
                    <Badge className="mt-3 bg-white/20 hover:bg-white/30 text-white">Langkah {activeStep + 1}</Badge>
                  </div>
                  
                  <div className="p-6 md:col-span-4">
                    <p className="text-lg mb-4">{processSteps[activeStep].description}</p>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Detail Proses:</h4>
                      <p className="text-foreground/80">{processSteps[activeStep].details}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProcessingOverview;
