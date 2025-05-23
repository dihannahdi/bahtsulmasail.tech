import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Scroll, 
  BookOpen, 
  History, 
  Building, 
  BookText, 
  Award, 
  ChevronsDown,
  ChevronsUp,
  ExternalLink,
  Users,
  GraduationCap,
  Scale,
  Landmark,
  Globe,
  ChevronRight,
  Search,
  Menu,
  Clock,
  Lightbulb,
  ArrowRight
} from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItems = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Add new animation variants
const pageTransition = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const HistoryBahtsulMasail = () => {
  const [activeTab, setActiveTab] = useState("akar-intelektual");
  const [expandedParagraphs, setExpandedParagraphs] = useState<Record<string, boolean>>({});
  const [tableOfContentsOpen, setTableOfContentsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const contributionRef = useRef<HTMLDivElement>(null);
  const akarRef = useRef<HTMLDivElement>(null);
  const institusionalisasiRef = useRef<HTMLDivElement>(null);
  const kontribusiRef = useRef<HTMLDivElement>(null);
  
  const isHeroVisible = useInView(heroRef, { once: true, amount: 0.3 });
  const isTimelineVisible = useInView(timelineRef, { once: true, amount: 0.2 });
  const isContributionVisible = useInView(contributionRef, { once: true, amount: 0.2 });

  // Handle URL hash for navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setCurrentSection(hash);
          
          // Set active tab based on section
          if (hash.includes('akar')) {
            setActiveTab('akar-intelektual');
          } else if (hash.includes('institusionalisasi')) {
            setActiveTab('institusionalisasi');
          } else if (hash.includes('kontribusi')) {
            setActiveTab('kontribusi');
          }
        }
      }
    };

    // Handle initial load with hash
    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Monitor scroll position to update current section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Determine which section is currently in view
      const sections = [
        { id: 'akar-intelektual', ref: akarRef },
        { id: 'institusionalisasi', ref: institusionalisasiRef },
        { id: 'kontribusi', ref: kontribusiRef }
      ];
      
      for (const section of sections) {
        if (section.ref.current) {
          const element = section.ref.current;
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setCurrentSection(section.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle expanded paragraphs
  const toggleParagraph = (id: string) => {
    setExpandedParagraphs((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle table of contents on mobile
  const toggleTableOfContents = () => {
    setTableOfContentsOpen(!tableOfContentsOpen);
  };

  // Handle search functionality
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
    } else {
      // Focus search input after opening
      setTimeout(() => {
        const searchInput = document.getElementById("search-input");
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  // Navigation items for table of contents
  const navItems = [
    { id: "akar-intelektual", label: "Akar Intelektual", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "warisan-metodologi", label: "Warisan Metodologi", parent: "akar-intelektual" },
    { id: "transformasi-nusantara", label: "Transformasi di Nusantara", parent: "akar-intelektual" },
    { id: "institusionalisasi", label: "Institusionalisasi", icon: <Building className="h-4 w-4" /> },
    { id: "timeline", label: "Timeline Historis", parent: "institusionalisasi" },
    { id: "kontribusi", label: "Kontribusi", icon: <Award className="h-4 w-4" /> },
    { id: "penjaga-moderasi", label: "Penjaga Moderasi", parent: "kontribusi" },
    { id: "jembatan-hukum", label: "Jembatan Hukum", parent: "kontribusi" },
    { id: "preservasi-khazanah", label: "Preservasi Khazanah", parent: "kontribusi" },
    { id: "sintesis", label: "Sintesis & Orisinalitas" }
  ];

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <MainLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageTransition}
      >
        {/* Document metadata */}
        <div className="sr-only" aria-hidden="true">
          <h1>Sejarah Bahtsul Masail - Akar Intelektual & Perkembangan | Islamic Insight Nexus</h1>
          <p>Menelusuri perjalanan lembaga pengambilan keputusan hukum Islam dalam Nahdlatul Ulama, dari tradisi halaqah global hingga menjadi mekanisme fatwa yang otoritatif di Indonesia.</p>
        </div>

        {/* Skip to content */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-islamic-green focus:text-white focus:top-4 focus:left-4 focus:rounded-md"
        >
          Langsung ke konten utama
        </a>

        {/* Main Content */}
        <main id="main-content" tabIndex={-1}>
          {/* Hero Section */}
          <section className="relative py-20 px-4 md:px-6 lg:px-8">
            <div className="absolute inset-0 bg-[url('/islamic-pattern.png')] opacity-5"></div>
            <div className="container mx-auto relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Sejarah Bahtsul Masail
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Akar Intelektual dan Perkembangannya dalam Nahdlatul Ulama
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Badge variant="secondary" className="px-4 py-2">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Tradisi Keilmuan
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    <Users className="w-4 h-4 mr-2" />
                    Nahdlatul Ulama
                  </Badge>
                  <Badge variant="secondary" className="px-4 py-2">
                    <Globe className="w-4 h-4 mr-2" />
                    Islam Nusantara
                  </Badge>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 px-4 md:px-6 lg:px-8">
            <div className="container mx-auto">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
                  <TabsTrigger value="overview">Gambaran Umum</TabsTrigger>
                  <TabsTrigger value="history">Sejarah & Perkembangan</TabsTrigger>
                  <TabsTrigger value="contributions">Kontribusi</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <Card className="border-none shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-2xl">Akar Intelektual</CardTitle>
                        <CardDescription>
                          Warisan Metodologi Halaqah dari Timur Tengah
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          Praksis Bahtsul Masail tidak dapat dipisahkan dari tradisi halaqah (lingkaran diskusi) 
                          yang berkembang di Haramain (Mekah dan Madinah) sejak abad ke-19. Para ulama Nusantara 
                          yang menimba ilmu di Timur Tengah – seperti Syekh Mahfudz at-Tirmasi dan Syekh Nawawi 
                          al-Bantani – terlibat aktif dalam halaqah-halaqah yang dipimpin ulama terkemuka.
                        </p>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <Clock className="w-8 h-8 text-primary mb-2" />
                          <CardTitle>Sejarah Panjang</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Bermula dari tradisi halaqah di Haramain hingga berkembang menjadi lembaga formal di NU
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <Award className="w-8 h-8 text-primary mb-2" />
                          <CardTitle>Metodologi Unik</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Menggabungkan tradisi klasik dengan konteks lokal Indonesia
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <Lightbulb className="w-8 h-8 text-primary mb-2" />
                          <CardTitle>Kontribusi Signifikan</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Memberikan solusi hukum Islam yang relevan dengan kebutuhan masyarakat
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="history">
                  <ScrollArea className="h-[600px] rounded-md border p-4">
                    <div className="space-y-8">
                      <div className="relative pl-8 border-l-2 border-primary">
                        <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary"></div>
                        <h3 className="text-xl font-semibold mb-2">Fase Awal (1926-1989)</h3>
                        <p className="text-muted-foreground">
                          NU pertama kali menginstitusionalkan Bahtsul Masail dalam Kongres I NU di Surabaya, 
                          21-23 September 1926 – hanya delapan bulan setelah organisasi ini berdiri.
                        </p>
                      </div>

                      <div className="relative pl-8 border-l-2 border-primary">
                        <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary"></div>
                        <h3 className="text-xl font-semibold mb-2">Reformasi Metodologis (1990-2004)</h3>
                        <p className="text-muted-foreground">
                          Titik balik terjadi melalui Muktamar NU ke-28 di Yogyakarta (1989) yang merekomendasikan 
                          pembentukan Lajnah Bahtsul Masail Diniyah sebagai lembaga permanen.
                        </p>
                      </div>

                      <div className="relative pl-8 border-l-2 border-primary">
                        <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary"></div>
                        <h3 className="text-xl font-semibold mb-2">Modernisasi (2004-sekarang)</h3>
                        <p className="text-muted-foreground">
                          Lajnah ditingkatkan statusnya menjadi Lembaga Bahtsul Masail dengan kewenangan lebih luas, 
                          mengadopsi teknologi digital untuk mengumpulkan masa'il waqi'iyah.
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="contributions">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Penjaga Moderasi Beragama</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <ChevronRight className="w-4 h-4 mr-2 text-primary" />
                            Melokalkan praktik keislaman
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="w-4 h-4 mr-2 text-primary" />
                            Mencegah radikalisme
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="w-4 h-4 mr-2 text-primary" />
                            Merespons isu gender
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Jembatan Hukum Islam dan Negara</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <ChevronRight className="w-4 h-4 mr-2 text-primary" />
                            Dasar fikih untuk UU Perkawinan
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="w-4 h-4 mr-2 text-primary" />
                            Prinsip darurah syar'iyyah
                          </li>
                          <li className="flex items-center">
                            <ChevronRight className="w-4 h-4 mr-2 text-primary" />
                            Kerangka etis pembangunan
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-12 px-4 md:px-6 lg:px-8 bg-primary/5">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Pelajari Lebih Lanjut</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Temukan lebih banyak tentang kontribusi Bahtsul Masail dalam membentuk 
                pemahaman Islam yang moderat dan kontekstual di Indonesia.
              </p>
              <Button size="lg" className="group">
                Jelajahi Arsip
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </section>
        </main>
      </motion.div>
    </MainLayout>
  );
};

export default HistoryBahtsulMasail; 