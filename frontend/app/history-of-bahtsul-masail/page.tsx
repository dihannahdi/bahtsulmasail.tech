'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { containerVariant, fadeUp } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, Users, Globe, ChevronRight, Clock, Award, Lightbulb, ArrowRight
} from 'lucide-react'; 

// Types for structured content
interface HeroBadge {
  icon: React.ReactNode;
  text: string;
}

interface OverviewContentCard {
  type: "card";
  title: string;
  description?: string;
  text: string;
}

interface OverviewContentGridItem {
  icon: React.ReactNode;
  title: string;
  text: string;
}
interface OverviewContentGrid {
  type: "grid";
  items: OverviewContentGridItem[];
}

type OverviewContentItem = OverviewContentCard | OverviewContentGrid;

interface TimelineIntro {
  type: "timeline-intro";
  text: string;
}

interface TimelineItem {
  type: "timeline-item";
  title: string;
  description: string;
  details: string;
}

type HistoryContentItem = TimelineIntro | TimelineItem;

interface ContributionCard {
  type: "contribution-card";
  title: string;
  points: string[];
}

type ContributionContentItem = ContributionCard;

interface TabContent {
  id: string;
  title: string;
  content: OverviewContentItem[] | HistoryContentItem[] | ContributionContentItem[];
}

interface HistoryPageData {
  title: string;
  subtitle: string;
  heroBadges: HeroBadge[];
  tabs: TabContent[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}

const historyPageContent: HistoryPageData = {
  title: "Sejarah Bahtsul Masail",
  subtitle: "Akar Intelektual dan Perkembangannya dalam Nahdlatul Ulama",
  heroBadges: [
    { icon: <BookOpen className="w-4 h-4 mr-2" />, text: "Tradisi Keilmuan" },
    { icon: <Users className="w-4 h-4 mr-2" />, text: "Nahdlatul Ulama" },
    { icon: <Globe className="w-4 h-4 mr-2" />, text: "Islam Nusantara" },
  ],
  tabs: [
    {
      id: "overview", 
      title: "Gambaran Umum", 
      content: [
        {
          type: "card",
          title: "Akar Intelektual",
          description: "Warisan Metodologi Halaqah dari Timur Tengah",
          text: "Praksis Bahtsul Masail tidak dapat dipisahkan dari tradisi halaqah (lingkaran diskusi) yang berkembang di Haramain (Mekah dan Madinah) sejak abad ke-19. Para ulama Nusantara yang menimba ilmu di Timur Tengah – seperti Syekh Mahfudz at-Tirmasi dan Syekh Nawawi al-Bantani – terlibat aktif dalam halaqah-halaqah yang dipimpin ulama terkemuka."
        } as OverviewContentCard,
        {
          type: "grid",
          items: [
            {
              icon: <Clock className="w-8 h-8 text-primary mb-2" />,
              title: "Sejarah Panjang",
              text: "Bermula dari tradisi halaqah di Haramain hingga berkembang menjadi lembaga formal di NU"
            },
            {
              icon: <Award className="w-8 h-8 text-primary mb-2" />,
              title: "Metodologi Unik",
              text: "Menggabungkan tradisi klasik dengan konteks lokal Indonesia"
            },
            {
              icon: <Lightbulb className="w-8 h-8 text-primary mb-2" />,
              title: "Kontribusi Signifikan",
              text: "Memberikan solusi hukum Islam yang relevan dengan kebutuhan masyarakat"
            }
          ]
        } as OverviewContentGrid
      ]
    },
    {
      id: "history", 
      title: "Sejarah & Perkembangan", 
      content: [
        {
          type: "timeline-intro",
          text: "Menelusuri evolusi Bahtsul Masail melalui berbagai fase penting."
        } as TimelineIntro,
        {
          type: "timeline-item",
          title: "Fase Awal (1926-1989)",
          description: "NU pertama kali menginstitusionalkan Bahtsul Masail dalam Kongres I NU di Surabaya, 21-23 September 1926 – hanya delapan bulan setelah organisasi ini berdiri.",
          details: "More details about the early phase..."
        } as TimelineItem,
        {
          type: "timeline-item",
          title: "Reformasi Metodologis (1990-2004)",
          description: "Titik balik terjadi melalui Muktamar NU ke-28 di Yogyakarta (1989) yang merekomendasikan pembentukan Lajnah Bahtsul Masail Diniyah sebagai lembaga permanen.",
          details: "More details about methodological reforms..."
        } as TimelineItem,
        {
          type: "timeline-item",
          title: "Modernisasi (2004-sekarang)",
          description: "Lajnah ditingkatkan statusnya menjadi Lembaga Bahtsul Masail dengan kewenangan lebih luas, mengadopsi teknologi digital untuk mengumpulkan masa'il waqi'iyah.",
          details: "More details about modernization and contemporary responses..."
        } as TimelineItem
      ]
    },
    {
      id: "contributions", 
      title: "Kontribusi", 
      content: [
        {
          type: "contribution-card",
          title: "Penjaga Moderasi Beragama",
          points: [
            "Melokalkan praktik keislaman",
            "Mencegah radikalisme",
            "Merespons isu gender"
          ]
        } as ContributionCard,
        {
          type: "contribution-card",
          title: "Jembatan Hukum Islam dan Negara",
          points: [
            "Dasar fikih untuk UU Perkawinan",
            "Prinsip darurah syar'iyyah",
            "Kerangka etis pembangunan"
          ]
        } as ContributionCard
      ]
    },
  ],
  cta: {
    title: "Pelajari Lebih Lanjut",
    description: "Temukan lebih banyak tentang kontribusi Bahtsul Masail dalam membentuk pemahaman Islam yang moderat dan kontekstual di Indonesia.",
    buttonText: "Jelajahi Arsip",
    buttonLink: "/documents"
  }
};

export default function HistoryBahtsulMasailPage() {
  const [activeTab, setActiveTab] = useState(historyPageContent.tabs[0].id);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = {
    overview: useRef<HTMLDivElement>(null),
    history: useRef<HTMLDivElement>(null),
    contributions: useRef<HTMLDivElement>(null),
  };

  return (
    <motion.main
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background text-foreground pt-12 pb-16 sm:pt-6 sm:pb-24 px-4 md:px-8 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-secondary/5 to-transparent -z-10"></div>
      <div className="fixed inset-0 pattern-bg opacity-[0.02] pointer-events-none -z-10"></div>

      <motion.header 
        variants={fadeUp} 
        className="w-full max-w-4xl mx-auto mb-0 text-center relative z-10"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-0 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent heading-islamic">
          {historyPageContent.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-0 max-w-2xl mx-auto">
          {historyPageContent.subtitle}
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-0">
          {historyPageContent.heroBadges.map((badge, idx) => (
            <Badge key={idx} variant="secondary" className="px-4 py-2 text-sm backdrop-blur-sm bg-background/70 border-primary/20">
              {badge.icon}{badge.text}
            </Badge>
          ))}
        </div>
        <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
      </motion.header>

      <div className="max-w-5xl mx-auto relative z-10">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-0 bg-card/70 backdrop-blur-sm rounded-lg p-1 sticky top-16 z-20 shadow-md">
            {historyPageContent.tabs.map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-md transition-all duration-200 ease-out"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {historyPageContent.tabs.map(tab => (
            <TabsContent 
              key={tab.id} 
              value={tab.id}
              className="bg-card/60 dark:bg-card/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-border/30 min-h-[400px]"
            >
              <div ref={sectionRefs[tab.id]}>
                <motion.div 
                  key={activeTab} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {tab.id === 'overview' && (tab.content as OverviewContentItem[]).map((item, index) => {
                    if (item.type === 'card') {
                      return (
                        <Card key={index} className="bg-background/70 shadow-lg border-primary/20">
                          <CardHeader>
                            <CardTitle className="text-2xl text-primary">{item.title}</CardTitle>
                            {item.description && <CardDescription>{item.description}</CardDescription>}
                          </CardHeader>
                          <CardContent className="prose dark:prose-invert prose-sm sm:prose-base max-w-none text-muted-foreground">
                            <p>{item.text}</p>
                          </CardContent>
                        </Card>
                      );
                    }
                    if (item.type === 'grid') {
                      return (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                          {item.items.map((gridItem, gi) => (
                            <Card key={gi} className="bg-background/50 hover:shadow-md transition-shadow border-border/30">
                              <CardHeader>
                                {gridItem.icon}
                                <CardTitle className="text-lg">{gridItem.title}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">{gridItem.text}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })}

                  {tab.id === 'history' && 
                    <ScrollArea className="h-[500px] rounded-md p-1 sm:p-4">
                      <div className="space-y-8 pr-4">
                        {(tab.content as HistoryContentItem[]).map((item, index) => {
                            if (item.type === 'timeline-intro') {
                                return (
                                    <p key={index} className="text-lg text-muted-foreground mb-0">
                                        {item.text}
                                    </p>
                                );
                            }
                            if (item.type === 'timeline-item') {
                                return (
                                    <motion.div 
                                        key={index} 
                                        className="relative pl-8 border-l-2 border-primary/50 dark:border-primary/30 py-2 group"
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.3 }}
                                    >
                                        <div className="absolute -left-[9px] top-3 w-4 h-4 rounded-full bg-primary group-hover:scale-110 transition-transform"></div>
                                        <h3 className="text-xl font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                                        <p className="text-xs text-muted-foreground/70 italic">{item.details}</p>
                                    </motion.div>
                                );
                            }
                            return null;
                        })}
                      </div>
                    </ScrollArea>
                  }

                  {tab.id === 'contributions' && 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(tab.content as ContributionContentItem[]).map((item, index) => {
                        if (item.type === 'contribution-card') {
                          return (
                            <Card key={index} className="bg-background/50 shadow-lg border-primary/20 hover:border-primary/40 transition-colors">
                              <CardHeader>
                                <CardTitle className="text-xl text-primary flex items-center">
                                  <Award className="w-5 h-5 mr-2 flex-shrink-0" /> 
                                  {item.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="space-y-2 list-inside">
                                  {item.points.map((point, pi) => (
                                    <li key={pi} className="flex items-start text-muted-foreground">
                                      <ChevronRight className="w-4 h-4 mr-2 mt-1 text-primary flex-shrink-0" />
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          );
                        }
                        return null;
                      })}
                    </div>
                  }

                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <motion.section 
        variants={fadeUp} 
        className="mt-16 md:mt-24 max-w-4xl mx-auto text-center bg-gradient-to-r from-islamic-green/10 to-primary/10 dark:from-islamic-green/15 dark:to-primary/15 p-8 sm:p-12 rounded-2xl shadow-xl border border-border/20"
      >
        <h2 className="text-3xl font-bold mb-4 text-foreground">{historyPageContent.cta.title}</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          {historyPageContent.cta.description}
        </p>
        <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground group">
          <a href={historyPageContent.cta.buttonLink}>
            {historyPageContent.cta.buttonText}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </motion.section>

    </motion.main>
  );
} 