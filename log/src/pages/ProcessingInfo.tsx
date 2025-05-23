import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProcessingOverview from "@/components/processing/ProcessingOverview";
import SupportedFormats from "@/components/processing/SupportedFormats";
import LanguageSupport from "@/components/processing/LanguageSupport";
import AnalysisCapabilities from "@/components/processing/AnalysisCapabilities";
import { Button } from "@/components/ui/button";
import { Upload, FileSearch, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { containerVariant, fadeUp, fadeScale } from "@/lib/animations";

const ProcessingInfo = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Create refs for scroll animations
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  
  const tabsRef = useRef(null);
  const isTabsInView = useInView(tabsRef, { once: true, amount: 0.2 });
  
  const ctaRef = useRef(null);
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  return (
    <MainLayout>
      <motion.div 
        className="container mx-auto px-4 py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariant}
      >
        {/* Hero Section */}
        <motion.div 
          className="bg-gradient-to-r from-islamic-green/10 to-islamic-gold/10 rounded-2xl p-8 md:p-12 mb-10 relative overflow-hidden"
          ref={heroRef}
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-islamic-gold/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10">
            <span className="inline-block py-1 px-3 bg-islamic-green/20 text-islamic-green rounded-full text-sm font-medium mb-4">
              Teknologi AI Terdepan
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-islamic-green to-islamic-gold">
              Pemrosesan Dokumen
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl">
              Sistem canggih untuk menganalisis dan menstandardisasi berbagai jenis dokumen Islam dengan teknologi kecerdasan buatan
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-islamic-green hover:bg-islamic-green/90 rounded-full gap-2 group"
                asChild
              >
                <Link href="/upload" className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Coba Sekarang
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full"
                asChild
              >
                <Link href="/browse" className="flex items-center gap-2">
                  <FileSearch className="mr-2 h-5 w-5" />
                  Lihat Contoh Dokumen
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div 
          ref={tabsRef}
          initial="hidden"
          animate={isTabsInView ? "visible" : "hidden"}
          variants={fadeScale} 
          className="bg-background rounded-xl shadow-sm border mt-8"
        >
          <Tabs defaultValue="overview" className="p-1">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 p-1 bg-muted/30 rounded-lg text-xs sm:text-sm">
              <TabsTrigger value="overview" className="rounded-lg py-2 md:py-3">Overview</TabsTrigger>
              <TabsTrigger value="formats" className="rounded-lg py-2 md:py-3">Format Dokumen</TabsTrigger>
              <TabsTrigger value="languages" className="rounded-lg py-2 md:py-3">Dukungan Bahasa</TabsTrigger>
              <TabsTrigger value="analysis" className="rounded-lg py-2 md:py-3">Analisis AI</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6 p-4">
              <ProcessingOverview />
            </TabsContent>
            <TabsContent value="formats" className="mt-6 p-4">
              <SupportedFormats />
            </TabsContent>
            <TabsContent value="languages" className="mt-6 p-4">
              <LanguageSupport />
            </TabsContent>
            <TabsContent value="analysis" className="mt-6 p-4">
              <AnalysisCapabilities />
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 p-8 md:p-10 bg-islamic-green/5 rounded-xl text-center border border-islamic-green/20"
          ref={ctaRef}
          initial="hidden"
          animate={isCtaInView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <div className="max-w-3xl mx-auto">
            <span className="inline-block p-2 bg-islamic-green/20 rounded-full mb-4">
              <Sparkles className="h-6 w-6 text-islamic-green" />
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-medium mb-4">Siap untuk mencoba pemrosesan dokumen?</h3>
            <p className="text-foreground/80 mb-8">
              Bergabunglah dengan ribuan peneliti dan akademisi yang telah memanfaatkan teknologi AI kami untuk mengoptimalkan dokumen Islam mereka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAdmin && (
                <Button 
                  size="lg" 
                  className="bg-islamic-green hover:bg-islamic-green/90 rounded-full"
                  asChild
                >
                  <Link href="/upload" className="flex items-center gap-2">
                    <Upload className="mr-2 h-5 w-5" />
                    Unggah Dokumen Sekarang
                  </Link>
                </Button>
              )}
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full border-islamic-green/50 text-islamic-green hover:bg-islamic-green/10"
                asChild
              >
                <Link href="/browse" className="flex items-center gap-2">
                  <FileSearch className="mr-2 h-5 w-5" />
                  Jelajahi Dokumen
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default ProcessingInfo;
