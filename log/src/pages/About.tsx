"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { Github, Mail, ExternalLink, BookOpen, Database, Archive, Users, User, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

const About = () => {
  // Using a consistent easing curve for all animations
  const easeCurve = [0.25, 0.1, 0.25, 1]; // Smooth, elegant easing
  
  // Base animation - used for all main sections
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: easeCurve }
    }
  };

  // Used for highlight blocks and cards
  const fadeScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, ease: easeCurve }
    }
  };

  // For staggered elements
  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        ease: easeCurve
      }
    }
  };

  // Child items in staggered sections
  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: easeCurve }
    }
  };

  // Create refs for each section
  const introRef = useRef(null);
  const isIntroInView = useInView(introRef, { once: true, amount: 0.2 });
  
  const quoteRef = useRef(null);
  const isQuoteInView = useInView(quoteRef, { once: true, amount: 0.2 });
  
  const blockquoteRef = useRef(null);
  const isBlockquoteInView = useInView(blockquoteRef, { once: true, amount: 0.5 });
  
  const visionRef = useRef(null);
  const isVisionInView = useInView(visionRef, { once: true, amount: 0.2 });
  
  const offerRef = useRef(null);
  const isOfferInView = useInView(offerRef, { once: true, amount: 0.2 });
  
  const approachRef = useRef(null);
  const isApproachInView = useInView(approachRef, { once: true, amount: 0.2 });
  
  const teamRef = useRef(null);
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.1 });

  const teamMembers = [
    {
      name: "Farid Dihan Nahdi",
      role: "Lead Developer & Founder",
      bio: "Mengembangkan platform BahtsulMasail.tech dengan visi melestarikan dan mendigitalkan karya asli pesantren agar dapat diakses dan dimanfaatkan oleh seluruh umat.",
      image: "/images/team/Dihan Nahdi.jpg",
      links: {
        github: "https://github.com/dihannahdi",
        email: "dihannahdii@gmail.com",
        linkedin: "https://id.linkedin.com/in/dihannahdi"
      }
    },
    {
      name: "M. Ibrar Rasyid",
      role: "Lead of Content & Research",
      bio: "Memimpin upaya konten dan penelitian untuk BahtsulMasail.tech, memastikan kedalaman dan akurasi materi.",
      image: "/images/team/Ibrar Rasyid.jpeg", 
      links: {
        linkedin: "https://id.linkedin.com/in/m-ibrar-rasyid-3b409a296"
        // Add other links when available
      }
    },
    {
      name: "M. Fachry Alfareeza",
      role: "Lead of Quality Assurance",
      bio: "Menjamin kualitas dan akurasi platform BahtsulMasail.tech melalui pengujian dan validasi yang cermat.",
      image: "/images/team/M. Fachry Alfareeza.png",
      links: {
        // linkedin: "PASTE_FACHRY_LINKEDIN_HERE_IF_AVAILABLE"
        // Add other links when available
      }
    }
  ];

  return (
    <MainLayout>
      <section className="bg-gradient-to-b from-background to-secondary/30 pattern-bg py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className="text-center mb-12">
              <motion.h1 
                className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance"
                variants={fadeUp}
              >
                <span>Tentang</span> <span className="text-gradient">BahtsulMasail.tech</span>
              </motion.h1>
              <motion.div 
                className="h-1 w-24 bg-islamic-green mx-auto rounded-full"
                variants={fadeUp}
              ></motion.div>
            </div>

            <Card className="glass-morphism p-8 md:p-12 mb-16">
              <div className="prose prose-lg max-w-none">
                <motion.div 
                  ref={introRef}
                  className="bg-islamic-gold/10 p-6 rounded-lg border-l-4 border-islamic-gold mb-10"
                  initial="hidden"
                  animate={isIntroInView ? "visible" : "hidden"}
                  variants={fadeScale}
                >
                  <p className="text-lg md:text-xl font-medium leading-relaxed m-0">
                    Bahtsul Masail adalah <span className="font-semibold">produk pesantren asli</span> yang menjadi jawaban dari berbagai tantangan zaman. <span className="text-islamic-gold font-semibold">BahtsulMasail.tech</span> hadir sebagai digitalisasi hasil bahtsul masail agar dapat diakses oleh semua orang, karya asli pesantren dapat lestari, serta dapat dimanfaatkan sebagai platform bahtsul masail yang bermanfaat bagi seluruh umat.
                  </p>
                </motion.div>
                
                <motion.div 
                  ref={quoteRef}
                  initial="hidden"
                  animate={isQuoteInView ? "visible" : "hidden"}
                  variants={fadeUp}
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold mt-12 mb-6 text-islamic-gold flex items-center">
                    <BookOpen className="mr-2 h-7 w-7" /> Bahtsul Masail: Warisan Asli Pesantren
                  </h2>
                  <p className="text-lg leading-relaxed">
                    Bahtsul Masail, yang secara harfiah berarti "pembahasan masalah", adalah tradisi keilmuan otentik yang lahir dan berkembang di lingkungan pesantren Indonesia. Forum ini menjadi wadah para ulama dan santri untuk mendiskusikan dan merumuskan hukum Islam terhadap berbagai persoalan kontemporer menggunakan metodologi fikih yang komprehensif.
                  </p>
                  <p className="text-lg leading-relaxed mt-4">
                    Selama berabad-abad, hasil Bahtsul Masail telah menjadi rujukan penting bagi umat Islam dalam menjalankan ajaran agama di tengah dinamika zaman yang terus berubah. Namun, banyak dari khazanah berharga ini tersimpan dalam bentuk fisik yang terbatas aksesnya, tersebar di berbagai pesantren dan kitab kuning yang sulit dijangkau masyarakat luas.
                  </p>
                </motion.div>
                
                <motion.div 
                  ref={visionRef}
                  initial="hidden"
                  animate={isVisionInView ? "visible" : "hidden"}
                  variants={fadeUp}
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold mt-12 mb-6 text-islamic-green flex items-center">
                    <Database className="mr-2 h-7 w-7" /> Visi Kami: Melestarikan & Mendigitalkan
                  </h2>
                  <div className="bg-islamic-green/5 border-l-4 border-islamic-green p-6 rounded-r-lg">
                    <p className="text-lg">
                      BahtsulMasail.tech lahir dari keprihatinan akan potensi hilangnya warisan intelektual pesantren yang tak ternilai. Kami membayangkan dunia di mana khazanah pesantren, khususnya hasil Bahtsul Masail, dapat diakses secara luas, terorganisir dengan baik, dan disajikan dengan cara yang menghormati tradisi keilmuan pesantren sekaligus memanfaatkan teknologi modern.
                    </p>
                    <p className="text-lg mt-4">
                      Dengan menjembatani karya asli pesantren dengan kebutuhan kontemporer, kami bertujuan untuk <span className="font-semibold">melestarikan dan memperluas manfaat Bahtsul Masail</span> bagi seluruh umat Islam, dari kalangan pesantren hingga masyarakat umum, dari ulama hingga generasi muda.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  ref={offerRef}
                  initial="hidden"
                  animate={isOfferInView ? "visible" : "hidden"}
                  variants={stagger}
                  className="mt-16"
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-islamic-blue flex items-center">
                    <Archive className="mr-2 h-7 w-7" /> Yang Kami Tawarkan
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariant} className="bg-background/50 p-6 rounded-lg border border-border flex flex-col h-full">
                      <div className="bg-islamic-green/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <span className="text-islamic-green text-xl font-bold">1</span>
                      </div>
                      <h3 className="text-lg font-medium mb-3 text-islamic-blue">Digitalisasi Bahtsul Masail</h3>
                      <p className="text-foreground/80 flex-grow">
                        Pengarsipan digital hasil Bahtsul Masail dari berbagai pesantren dan forum ulama, menjaga agar karya asli pesantren tetap lestari dan tersedia untuk generasi mendatang.
                      </p>
                    </motion.div>
                    <motion.div variants={itemVariant} className="bg-background/50 p-6 rounded-lg border border-border flex flex-col h-full">
                      <div className="bg-islamic-green/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <span className="text-islamic-green text-xl font-bold">2</span>
                      </div>
                      <h3 className="text-lg font-medium mb-3 text-islamic-blue">Pencarian Cerdas</h3>
                      <p className="text-foreground/80 flex-grow">
                        Kemampuan pencarian semantik yang memahami konteks dan makna dalam Bahtsul Masail, memudahkan pengguna menemukan jawaban atas pertanyaan spesifik dengan cepat dan akurat.
                      </p>
                    </motion.div>
                    <motion.div variants={itemVariant} className="bg-background/50 p-6 rounded-lg border border-border flex flex-col h-full">
                      <div className="bg-islamic-green/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <span className="text-islamic-green text-xl font-bold">3</span>
                      </div>
                      <h3 className="text-lg font-medium mb-3 text-islamic-blue">Pelestarian Karya Pesantren</h3>
                      <p className="text-foreground/80 flex-grow">
                        Dokumentasi dan pelestarian hasil pemikiran ulama dan santri dari berbagai periode, memastikan warisan intelektual pesantren tetap hidup dan relevan dalam diskursus keislaman modern.
                      </p>
                    </motion.div>
                    <motion.div variants={itemVariant} className="bg-background/50 p-6 rounded-lg border border-border flex flex-col h-full">
                      <div className="bg-islamic-green/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <span className="text-islamic-green text-xl font-bold">4</span>
                      </div>
                      <h3 className="text-lg font-medium mb-3 text-islamic-blue">Platform Kolaboratif</h3>
                      <p className="text-foreground/80 flex-grow">
                        Wadah untuk diskusi dan pengembangan pemikiran fikih dalam menjawab tantangan zaman, menghubungkan ulama, santri, akademisi, dan masyarakat umum dalam dialog konstruktif.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.div 
                  ref={approachRef}
                  initial="hidden"
                  animate={isApproachInView ? "visible" : "hidden"}
                  variants={fadeUp}
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold mt-16 mb-6 text-islamic-purple flex items-center">
                    <Users className="mr-2 h-7 w-7" /> Pendekatan Kami
                  </h2>
                  <p className="text-lg leading-relaxed">
                    Kami mempertahankan standar ketat keaslian dan keandalan dalam konten kami. Semua teks Bahtsul Masail diverifikasi dengan cermat dan dikaitkan dengan sumbernya, menghormati tradisi keilmuan pesantren dan menjaga otentisitas karya asli ulama. Keunikan dan orisinalitas pemikiran pesantren menjadi prioritas utama dalam seluruh konten platform.
                  </p>
                  <p className="text-lg leading-relaxed mt-4">
                    Platform kami menggunakan teknologi canggih, termasuk kecerdasan buatan dan pembelajaran mesin, untuk meningkatkan kemampuan pencarian dan memberikan analisis yang berwawasan. Teknologi ini membantu menjembatani khazanah keilmuan tradisional pesantren dengan kebutuhan akses modern, menjadikan karya pesantren lebih mudah dimanfaatkan oleh seluruh umat tanpa mengurangi nilai substantif dan otoritasnya.
                  </p>
                </motion.div>

                <div className="text-center my-12 bg-islamic-blue/5 p-8 rounded-lg">
                  <motion.blockquote 
                    className="text-xl italic text-islamic-blue/90 font-serif"
                    variants={fadeScale}
                    ref={blockquoteRef}
                    initial="hidden"
                    animate={isBlockquoteInView ? "visible" : "hidden"}
                  >
                    "Para ulama adalah pewaris para nabi." 
                    <footer className="text-sm mt-2 font-normal">— Nabi Muhammad ﷺ</footer>
                  </motion.blockquote>
                </div>
              </div>
            </Card>

            <motion.div 
              className="mt-20"
              variants={fadeScale}
              ref={teamRef}
              initial="hidden"
              animate={isTeamInView ? "visible" : "hidden"}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8 text-center">Tim Kami</h2>
              <div className="h-1 w-16 bg-islamic-gold mx-auto mb-12 rounded-full"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-3xl mx-auto">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="overflow-hidden shadow-lg bg-background/80 backdrop-blur-sm">
                    <div className="md:flex">
                      <div className="md:w-1/3 relative bg-islamic-gold/10">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:p-8 md:w-2/3">
                        <h3 className="text-2xl font-serif font-semibold mb-1">{member.name}</h3>
                        <p className="text-islamic-gold font-medium mb-4">{member.role}</p>
                        <p className="text-foreground/70 mb-6">{member.bio}</p>
                        <div className="flex gap-3">
                          {member.links.github && (
                            <Button variant="outline" size="icon" asChild>
                              <a href={member.links.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                              </a>
                            </Button>
                          )}
                          {member.links.email && (
                            <Button variant="outline" size="icon" asChild>
                              <a href={`mailto:${member.links.email}`}>
                                <Mail className="h-4 w-4" />
                                <span className="sr-only">Email</span>
                              </a>
                            </Button>
                          )}
                          {member.links.linkedin && (
                            <Button variant="outline" size="icon" asChild>
                              <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4" />
                                <span className="sr-only">LinkedIn</span>
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-16">
                <p className="text-lg text-foreground/70 mb-6">
                  Tertarik untuk berkontribusi dalam pelestarian dan digitalisasi karya pesantren?
                </p>
                <Button 
                  className="bg-islamic-green hover:bg-islamic-green/90"
                  asChild
                >
                  <a href="mailto:dihannahdii@gmail.com">
                    Hubungi Kami
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
