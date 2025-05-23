import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search, BookText, Building, Scale, BookOpen, Clipboard, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fadeUp, fadeScale, stagger, itemVariant } from "@/lib/animations";

const AnalysisCapabilities = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  
  // Add refs for scroll animations
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  const analysisGridRef = useRef(null);
  const isAnalysisGridInView = useInView(analysisGridRef, { once: true, amount: 0.2 });
  
  const verificationRef = useRef(null);
  const isVerificationInView = useInView(verificationRef, { once: true, amount: 0.2 });
  
  const footerRef = useRef(null);
  const isFooterInView = useInView(footerRef, { once: true, amount: 0.1 });
  
  const topicBadges = [
    { label: "Fiqih", color: "bg-blue-100 text-blue-800" },
    { label: "Tauhid", color: "bg-green-100 text-green-800" },
    { label: "Muamalah", color: "bg-amber-100 text-amber-800" }
  ];

  const analysisBenefits = [
    {
      icon: <Search className="h-6 w-6 text-islamic-blue" />,
      title: "Identifikasi Topik",
      description: "Secara otomatis mengenali topik utama dalam dokumen, seperti Aqidah, Fiqih, Akhlak, dll.",
      color: "bg-islamic-blue/20",
      textColor: "text-islamic-blue"
    },
    {
      icon: <BookText className="h-6 w-6 text-islamic-purple" />,
      title: "Ekstraksi Referensi",
      description: "Mengidentifikasi dan mengekstrak kutipan Al-Quran, Hadis, dan referensi kitab lainnya.",
      color: "bg-islamic-purple/20",
      textColor: "text-islamic-purple"
    }
  ];

  const verificationFeatures = [
    {
      icon: <Building className="h-6 w-6 text-islamic-green" />,
      title: "Identifikasi Sumber",
      description: "Mengidentifikasi lembaga atau ulama yang menerbitkan dokumen",
      color: "bg-islamic-green/20", 
      textColor: "text-islamic-green"
    },
    {
      icon: <Scale className="h-6 w-6 text-islamic-blue" />,
      title: "Pengecekan Silang",
      description: "Memverifikasi konten dengan membandingkan referensi yang dikutip",
      color: "bg-islamic-blue/20",
      textColor: "text-islamic-blue"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-islamic-purple" />,
      title: "Metodologi Ijtihad",
      description: "Mengenali metodologi pengambilan hukum yang digunakan",
      color: "bg-islamic-purple/20",
      textColor: "text-islamic-purple"
    },
    {
      icon: <Clipboard className="h-6 w-6 text-islamic-gold" />,
      title: "Rangkuman Hukum",
      description: "Mengekstrak kesimpulan atau keputusan hukum dari dokumen",
      color: "bg-islamic-gold/20",
      textColor: "text-islamic-gold"
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        className="max-w-3xl mx-auto mb-6"
        ref={headerRef}
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
        variants={fadeUp}
      >
        <h2 className="text-2xl font-serif font-medium mb-4 flex items-center mt-4 md:mt-6">
          <span className="inline-block bg-islamic-green/20 text-islamic-green rounded-full w-8 h-8 flex items-center justify-center mr-3">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          Kemampuan Analisis
        </h2>
        <p className="text-foreground/80 mb-6">
          Platform kami menggunakan teknologi kecerdasan buatan untuk menganalisis konten dokumen secara mendalam
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
        ref={analysisGridRef}
        initial="hidden"
        animate={isAnalysisGridInView ? "visible" : "hidden"}
        variants={stagger}
      >
        {analysisBenefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={itemVariant}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <Card className={`border h-full ${activeFeature === index ? 'border-2 ' + benefit.color.replace('/20', '/30') : ''}`}
                onClick={() => setActiveFeature(index === activeFeature ? null : index)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${benefit.color} rounded-lg`}>
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className={`text-lg font-medium mb-2 ${activeFeature === index ? benefit.textColor : ''}`}>
                      {benefit.title}
                    </h4>
                    <p className="text-foreground/80 text-sm mb-3">{benefit.description}</p>
                    
                    {index === 0 && (
                      <motion.div 
                        className="flex flex-wrap gap-2 mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {topicBadges.map((badge, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                          >
                            <Badge className={badge.color}>{badge.label}</Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                    
                    {index === 1 && (
                      <motion.div
                        className="bg-secondary/20 p-3 rounded-md mt-3 italic text-sm border-l-4 border-islamic-gold"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        "...sebagaimana hadis Nabi Muhammad SAW yang diriwayatkan oleh Bukhari..."
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="bg-gradient-to-r from-islamic-green/5 to-islamic-gold/5 rounded-xl p-6 border border-islamic-gold/20 mb-6"
        ref={verificationRef}
        initial="hidden"
        animate={isVerificationInView ? "visible" : "hidden"}
        variants={fadeScale}
      >
        <h3 className="text-xl font-medium mb-4 flex items-center text-islamic-gold">
          <span className="inline-block bg-islamic-gold/20 text-islamic-gold rounded-full w-8 h-8 flex items-center justify-center mr-3">
            <Scale className="h-5 w-5" />
          </span>
          Verifikasi Mushoheh
        </h3>
        <p className="text-foreground/80 mb-6">
          Sistem kami berupaya mengenali dan memverifikasi otoritas dan validitas dokumen Islam melalui beberapa mekanisme:
        </p>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={stagger}
        >
          {verificationFeatures.map((feature, index) => (
            <motion.div 
              key={index} 
              className="flex items-start gap-3"
              variants={itemVariant}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`p-3 ${feature.color} rounded-lg shrink-0`}>
                {feature.icon}
              </div>
              <div>
                <h4 className={`font-medium mb-1 group flex items-center ${feature.textColor}`}>
                  {feature.title}
                  <ArrowRight className="h-3 w-0 ml-1 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all" />
                </h4>
                <p className="text-foreground/80 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        ref={footerRef}
        initial="hidden"
        animate={isFooterInView ? "visible" : "hidden"}
        variants={fadeUp}
        className="text-center"
      >
        <p className="text-sm text-foreground/60 italic">
          Semua kemampuan analisis kami terus dikembangkan dengan data dan algoritma terbaru
        </p>
      </motion.div>
    </div>
  );
};

export default AnalysisCapabilities;
