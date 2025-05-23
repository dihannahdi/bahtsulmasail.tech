import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle2 } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";
import { stagger, itemVariant, fadeUp } from "@/lib/animations";

const SupportedFormats = () => {
  const [hoveredFormat, setHoveredFormat] = useState<number | null>(null);
  
  // Animation refs and controls
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  const formatsRef = useRef(null);
  const isFormatsInView = useInView(formatsRef, { once: true, amount: 0.1 });
  
  const controls = useAnimation();
  
  useEffect(() => {
    if (isFormatsInView) {
      controls.start("visible");
    }
  }, [isFormatsInView, controls]);
  
  const formats = [
    {
      icon: <FileText className="h-8 w-8 text-red-500" />,
      name: "PDF",
      description: "Dokumen PDF termasuk kitab, makalah akademis, fatwa, dan dokumen Bahtsul Masail lainnya",
      compatibility: "Tinggi",
      features: ["Ekstraksi teks lengkap", "Struktur dokumen", "Gambar & tabel", "Metadata"]
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      name: "Word (.doc, .docx)",
      description: "Dokumen Microsoft Word dan format dokumen serupa",
      compatibility: "Tinggi",
      features: ["Ekstraksi teks lengkap", "Format & styling", "Metadata", "Struktur dokumen"]
    },
    {
      icon: <FileText className="h-8 w-8 text-gray-600" />,
      name: "Text (.txt, .md)",
      description: "File teks sederhana dan dokumen markdown",
      compatibility: "Sangat Tinggi",
      features: ["Ekstraksi teks sempurna", "Dukungan Markdown", "Konversi format"]
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
          Format Dokumen yang Didukung
        </h2>
        <p className="text-foreground/80">
          Platform kami mendukung berbagai format dokumen untuk memaksimalkan aksesibilitas dan
          memastikan semua jenis literatur Islam dapat diproses dengan baik.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        ref={formatsRef}
        initial="hidden"
        animate={controls}
        variants={stagger}
      >
        {formats.map((format, index) => (
          <motion.div
            key={index}
            variants={itemVariant}
            whileHover={{ 
              y: -5, 
              transition: { duration: 0.2 }
            }}
            onMouseEnter={() => setHoveredFormat(index)}
            onMouseLeave={() => setHoveredFormat(null)}
          >
            <Card className={`border h-full ${hoveredFormat === index ? 'border-islamic-green shadow-md' : ''}`}>
              <CardContent className="p-0">
                <div className="p-4 bg-gradient-to-r from-secondary/30 to-secondary/10 border-b">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded-md">
                      {format.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">{format.name}</h4>
                      <div className="flex items-center mt-1">
                        <span className={`inline-block h-2 w-2 rounded-full mr-1 ${
                          format.compatibility === 'Sangat Tinggi' ? 'bg-green-500' :
                          format.compatibility === 'Tinggi' ? 'bg-islamic-green' :
                          'bg-amber-500'
                        }`}></span>
                        <span className="text-xs text-foreground/70">Kompatibilitas: {format.compatibility}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-foreground/80 text-sm mb-3">{format.description}</p>
                  <div className="space-y-1">
                    {format.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-xs">
                        <CheckCircle2 className="h-3 w-3 text-islamic-green mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SupportedFormats;
