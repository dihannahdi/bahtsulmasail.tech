'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { BookText, Tag, CalendarDays, TrendingUp, Users, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { containerVariant, fadeUp, itemVariant } from '@/lib/animations';
import { addGlowEffect, removeGlowEffect } from '@/lib/glowEffect';

// Mock data (replace with API data later)
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Fatwa Mengenai Zakat Produktif di Era Digital',
    category: 'Fiqh Kontemporer',
    tags: ['zakat', 'digital', 'ekonomi islam'],
    status: 'Baru',
    decisionDate: new Date('2023-10-26'),
    summary: 'Kajian mendalam tentang implementasi zakat pada aset produktif berbasis teknologi dan platform digital.',
    participants: 12,
    source: 'Muktamar NU ke-34',
    type: 'Fatwa',
  },
  {
    id: '2',
    title: 'Analisis Hilal Global vs Lokal: Studi Komparatif',
    category: 'Astronomi Islam',
    tags: ['hilal', 'rukyat', 'hisab', 'puasa'],
    status: 'Populer',
    decisionDate: new Date('2023-08-15'),
    summary: 'Perbandingan metodologi penentuan awal bulan Hijriah antara pendekatan global dan lokal beserta implikasinya.',
    participants: 25,
    source: 'Konferensi Ulama Internasional',
    type: 'Penelitian',
  },
  {
    id: '3',
    title: 'Kedudukan Wanita dalam Kepemimpinan Publik Menurut Islam',
    category: 'Studi Wanita',
    tags: ['wanita', 'kepemimpinan', 'gender'],
    status: 'Direvisi',
    decisionDate: new Date('2023-05-02'),
    summary: 'Tinjauan ulang terhadap dalil-dalil klasik dan kontemporer mengenai peran wanita dalam kepemimpinan.',
    participants: 18,
    source: 'Halaqah PWNU Jawa Timur',
    type: 'Keputusan',
  },
  {
    id: '4',
    title: 'Etika Bermedia Sosial Bagi Generasi Muda Muslim',
    category: 'Akhlak & Tasawuf',
    tags: ['media sosial', 'etika', 'pemuda'],
    status: 'Baru',
    decisionDate: new Date('2023-11-10'),
    summary: 'Panduan praktis berdasarkan Al-Quran dan Sunnah untuk berinteraksi di dunia maya secara bertanggung jawab.',
    participants: 9,
    source: 'LBM PCNU Kota Santri',
    type: 'Panduan',
  },
];

interface Document {
  id: string;
  title: string;
  category: string;
  tags: string[];
  status: 'Baru' | 'Populer' | 'Direvisi' | 'Lama';
  decisionDate: Date;
  summary: string;
  participants: number;
  source: string;
  type: 'Fatwa' | 'Penelitian' | 'Keputusan' | 'Panduan' | 'Lainnya';
}

const categoryColors: Record<string, string> = {
  'Fiqh Kontemporer': 'islamic-blue',
  'Astronomi Islam': 'islamic-purple',
  'Studi Wanita': 'islamic-gold',
  'Akhlak & Tasawuf': 'islamic-green',
  'Sejarah Islam': 'islamic-earth',
  'Ekonomi Syariah': 'islamic-teal',
  'Default': 'islamic-maroon',
};

const getCategoryColor = (category: string): string => {
  return categoryColors[category] || categoryColors['Default'];
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const DocumentCard: React.FC<{ document: Document; index: number }> = ({ document, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const colorName = getCategoryColor(document.category);
  const cardColorClass = `bg-${colorName}/10 dark:bg-${colorName}/20 border-${colorName}/30 dark:border-${colorName}/50`;
  const textColorClass = `text-${colorName} dark:text-${colorName}/90`;
  const badgeColorClass = `bg-${colorName}/80 text-white`;

  useEffect(() => {
    const currentCardRef = cardRef.current;
    if (currentCardRef) {
      addGlowEffect(currentCardRef);
    }
    return () => {
      if (currentCardRef) {
        removeGlowEffect(currentCardRef);
      }
    };
  }, []);

  return (
    <motion.div 
      ref={cardRef}
      variants={itemVariant} 
      className="h-full card-glowable"
    >
      <Card className={`h-full flex flex-col smooth-transitions hover:shadow-xl hover:border-${colorName} ${cardColorClass}`}>
        <div className="glow-overlay"></div>
        <CardHeader className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <div className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeColorClass} ${document.status === 'Populer' ? 'animate-pulse' : ''}`}>
              {document.status}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarDays className="w-3 h-3 mr-1" />
              {format(document.decisionDate, 'dd MMM yyyy', { locale: id })}
            </div>
          </div>
          <CardTitle className={`text-lg font-semibold ${textColorClass} leading-tight`}>
            {truncateText(document.title, 60)}
          </CardTitle>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <FileText className="w-3 h-3 mr-1" />
            <span>{document.type} - {document.source}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow relative z-10">
          <p className="text-sm text-foreground/80 mb-3">{truncateText(document.summary, 120)}</p>
          <div className="flex items-center text-xs text-muted-foreground mb-1">
            <Users className="w-3 h-3 mr-1.5" />
            {document.participants} Peserta Bahtsul Masail
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {document.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={`text-xs px-2 py-0.5 rounded-full border border-${colorName}/50 bg-${colorName}/5 text-${colorName}/80`}>
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="relative z-10">
          <Button variant="link" className={`p-0 h-auto text-sm ${textColorClass} hover:text-${colorName}/80`}>
            Baca Selengkapnya <TrendingUp className="w-4 h-4 ml-1.5" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const RecentDocumentsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariant}
      className="py-16 sm:py-24 bg-background relative overflow-hidden"
      aria-labelledby="recent-documents-heading"
    >
      <div className="absolute inset-0 pattern-bg opacity-50 dark:opacity-30"></div>
      {/* Decorative Blurs */}
      <div className="absolute bg-blur-circle-maroon -right-20 top-1/4 opacity-60 dark:opacity-40"></div>
      <div className="absolute bg-blur-circle-teal -left-20 bottom-1/4 opacity-60 dark:opacity-40"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={fadeUp} className="text-center mb-12">
          <Tag className="w-10 h-10 text-islamic-maroon mx-auto mb-3" />
          <h2 id="recent-documents-heading" className="heading-islamic text-islamic-maroon mb-2">
            Dokumen Bahtsul Masail Terkini
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Jelajahi hasil-hasil pembahasan masalah keagamaan terbaru dari berbagai forum dan lembaga.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariant}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          {mockDocuments.map((doc, index) => (
            <DocumentCard key={doc.id} document={doc} index={index} />
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-16 text-center">
          <Button size="lg" variant="outline" className="border-islamic-maroon text-islamic-maroon hover:bg-islamic-maroon/10 group">
            Lihat Semua Dokumen 
            <BookText className="w-5 h-5 ml-2.5 group-hover:translate-x-1 smooth-transitions" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RecentDocumentsSection; 