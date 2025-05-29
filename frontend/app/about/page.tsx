'use client';
import React from 'react';

import Link from 'next/link';
import Image from 'next/image'; // Import Next/Image
import { motion } from 'framer-motion';
import { fadeUp, containerVariant, itemVariant, stagger } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import {  } from '@/components/ui/card'; // Removed Card, CardContent, CardHeader, CardTitle
import { ChevronLeft, Users, BookOpen, Database, Archive, Github, Mail, Linkedin, ExternalLink, Handshake, Sparkles, ArrowRight } from 'lucide-react'; // Removed Info, Target, Eye

// Expanded section definitions to match Vite About page structure
const aboutContent = {
  header: {
    titlePart1: "Tentang",
    titlePart2: "BahtsulMasail.tech", // For gradient
    subtitle: "Bahtsul Masail adalah produk pesantren asli yang menjadi jawaban dari berbagai tantangan zaman. BahtsulMasail.tech hadir sebagai digitalisasi hasil bahtsul masail agar dapat diakses oleh semua orang, karya asli pesantren dapat lestari, serta dapat dimanfaatkan sebagai platform bahtsul masail yang bermanfaat bagi seluruh umat.",
    highlightStyle: "bg-islamic-gold/10 dark:bg-islamic-gold/20 p-6 rounded-lg border-l-4 border-islamic-gold dark:border-islamic-gold/70 text-lg md:text-xl font-medium leading-relaxed m-0 shadow-sm",
  },
  sections: [
    {
      type: 'prose',
      icon: <BookOpen className="mr-3 h-7 w-7 text-islamic-gold" />,
      title: "Bahtsul Masail: Warisan Asli Pesantren",
      content: [
        "Bahtsul Masail, yang secara harfiah berarti \"pembahasan masalah\", adalah tradisi keilmuan otentik yang lahir dan berkembang di lingkungan pesantren Indonesia. Forum ini menjadi wadah para ulama dan santri untuk mendiskusikan dan merumuskan hukum Islam terhadap berbagai persoalan kontemporer menggunakan metodologi fikih yang komprehensif.",
        "Selama berabad-abad, hasil Bahtsul Masail telah menjadi rujukan penting bagi umat Islam dalam menjalankan ajaran agama di tengah dinamika zaman yang terus berubah. Namun, banyak dari khazanah berharga ini tersimpan dalam bentuk fisik yang terbatas aksesnya, tersebar di berbagai pesantren dan kitab kuning yang sulit dijangkau masyarakat luas."
      ]
    },
    {
      type: 'prose',
      icon: <Database className="mr-3 h-7 w-7 text-islamic-green" />,
      title: "Visi Kami: Melestarikan & Mendigitalkan",
      highlightStyle: "bg-islamic-green/10 dark:bg-islamic-green/20 border-l-4 border-islamic-green dark:border-islamic-green/70 p-6 rounded-lg shadow-md",
      content: [
        "BahtsulMasail.tech lahir dari keprihatinan akan potensi hilangnya warisan intelektual pesantren yang tak ternilai. Kami membayangkan dunia di mana khazanah pesantren, khususnya hasil Bahtsul Masail, dapat diakses secara luas, terorganisir dengan baik, dan disajikan dengan cara yang menghormati tradisi keilmuan pesantren sekaligus memanfaatkan teknologi modern.",
        "Dengan menjembatani karya asli pesantren dengan kebutuhan kontemporer, kami bertujuan untuk melestarikan dan memperluas manfaat Bahtsul Masail bagi seluruh umat Islam, dari kalangan pesantren hingga masyarakat umum, dari ulama hingga generasi muda."
      ]
    },
    {
      type: 'featuresGrid',
      icon: <Archive className="mr-3 h-7 w-7 text-islamic-blue" />,
      title: "Yang Kami Tawarkan",
      features: [
        { number: 1, title: "Digitalisasi Bahtsul Masail", description: "Pengarsipan digital hasil Bahtsul Masail dari berbagai pesantren dan forum ulama, menjaga agar karya asli pesantren tetap lestari dan tersedia untuk generasi mendatang." },
        { number: 2, title: "Pencarian Cerdas", description: "Kemampuan pencarian semantik yang memahami konteks dan makna dalam Bahtsul Masail, memudahkan pengguna menemukan jawaban atas pertanyaan spesifik dengan cepat dan akurat." },
        { number: 3, title: "Pelestarian Karya Pesantren", description: "Dokumentasi dan pelestarian hasil pemikiran ulama dan santri dari berbagai periode, memastikan warisan intelektual pesantren tetap hidup dan relevan dalam diskursus keislaman modern." },
        { number: 4, title: "Platform Kolaboratif", description: "Wadah untuk diskusi dan pengembangan pemikiran fikih dalam menjawab tantangan zaman, menghubungkan ulama, santri, akademisi, dan masyarakat umum dalam dialog konstruktif." }
      ]
    },
    {
      type: 'prose',
      icon: <Users className="mr-3 h-7 w-7 text-islamic-purple" />,
      title: "Pendekatan Kami",
      content: [
        "Kami mempertahankan standar ketat keaslian dan keandalan dalam konten kami. Semua teks Bahtsul Masail diverifikasi dengan cermat dan dikaitkan dengan sumbernya, menghormati tradisi keilmuan pesantren dan menjaga otentisitas karya asli ulama. Keunikan dan orisinalitas pemikiran pesantren menjadi prioritas utama dalam seluruh konten platform.",
        "Platform kami menggunakan teknologi canggih, termasuk kecerdasan buatan dan pembelajaran mesin, untuk meningkatkan kemampuan pencarian dan memberikan analisis yang berwawasan. Teknologi ini membantu menjembatani khazanah keilmuan tradisional pesantren dengan kebutuhan akses modern, menjadikan karya pesantren lebih mudah dimanfaatkan oleh seluruh umat tanpa mengurangi nilai substantif dan otoritasnya."
      ]
    }
  ],
  team: {
    icon: <Users className="mr-3 h-7 w-7 text-islamic-green"/>,
    title: "Tim Kami",
    members: [
      {
        name: "Farid Dihan Nahdi",
        role: "Lead Developer & Founder",
        bio: "Mengembangkan platform BahtsulMasail.tech dengan visi melestarikan dan mendigitalkan karya asli pesantren agar dapat diakses dan dimanfaatkan oleh seluruh umat.",
        image: "/images/team/Dihan Nahdi.jpg", // Placeholder path
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
        image: "/images/team/Ibrar Rasyid.jpeg", // Placeholder path
        links: {
          linkedin: "https://id.linkedin.com/in/m-ibrar-rasyid-3b409a296"
        }
      },
      {
        name: "M. Fachry Alfareeza",
        role: "Lead of Quality Assurance",
        bio: "Menjamin kualitas dan akurasi platform BahtsulMasail.tech melalui pengujian dan validasi yang cermat.",
        image: "/images/team/M. Fachry Alfareeza.png", // Placeholder path
        links: {}
      }
    ]
  },
  contribution: {
    icon: <Handshake className="mr-3 h-7 w-7 text-islamic-teal" />,
    title: "Kontribusi & Kolaborasi",
    content: [
      "BahtsulMasail.tech adalah proyek yang hidup dari semangat kolaborasi. Kami mengundang para ulama, santri, peneliti, pengembang, dan siapa saja yang memiliki semangat yang sama untuk berkontribusi dalam pengembangan platform ini. Baik berupa sumbangan data hasil bahtsul masail, pengembangan fitur, hingga penyebaran informasi, setiap kontribusi Anda sangat berarti."
    ],
    actionButton: { text: "Pelajari Cara Berkontribusi", href: "/contribute" } // Example link
  },
  joinUs: {
    icon: <Sparkles className="mr-3 h-7 w-7 text-islamic-gold" />,
    title: "Bergabunglah Dengan Kami!",
    content: [
      "Jadilah bagian dari upaya melestarikan dan menyebarkan kearifan Islam melalui teknologi. Ikuti perkembangan kami, gunakan platform ini untuk penelitian dan pembelajaran, serta sebarkan manfaatnya kepada orang lain."
    ],
    actionButton: { text: "Hubungi Kami", href: "/contact" }
  }
};

export default function AboutPage() {
  return (
    <motion.main 
      variants={containerVariant} 
      initial="hidden" 
      animate="visible" 
      className="min-h-screen bg-background text-foreground pt-12 pb-16 sm:pt-16 sm:pb-24 px-4 md:px-8 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-islamic-gold/5 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-secondary/5 to-transparent -z-10"></div>
      <div className="fixed inset-0 pattern-bg opacity-[0.03] pointer-events-none -z-10"></div>

      <motion.header 
        variants={fadeUp} 
        className="w-full max-w-4xl mx-auto mb-12 md:mb-16 text-center relative z-10"
      >
        <h1 className="heading-islamic text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
          {aboutContent.header.titlePart1} <span className="text-gradient">{aboutContent.header.titlePart2}</span>
        </h1>
        <div className="h-1 w-24 bg-secondary mx-auto mt-6 mb-8 rounded-full"></div>
        <motion.div variants={fadeUp} className={aboutContent.header.highlightStyle}>
           <p className="m-0">{aboutContent.header.subtitle}</p>
        </motion.div>
      </motion.header>

      <div className="max-w-4xl mx-auto space-y-12 md:space-y-16 relative z-10">
        {aboutContent.sections.map((section, index) => (
          <motion.section 
            key={index} 
            variants={fadeUp} 
            className="bg-card/60 dark:bg-card/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-border/30 smooth-transitions hover:shadow-secondary/10"
          >
            <div className="flex items-center mb-5 md:mb-6">
              {section.icon}
              <h2 className="heading-islamic text-2xl md:text-3xl text-foreground">
                {section.title}
              </h2>
            </div>
            {section.type === 'prose' && section.content && (
              <>
                {section.title === "Visi Kami: Melestarikan & Mendigitalkan" && section.highlightStyle ? (
                  <div className={section.highlightStyle}>
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-base md:text-lg text-foreground/90 dark:text-foreground leading-relaxed mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className={`text-base md:text-lg text-muted-foreground leading-relaxed mb-4 last:mb-0`}>
                      {paragraph}
                    </p>
                  ))
                )}
              </>
            )}
            {section.type === 'featuresGrid' && section.features && (
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6" variants={stagger}>
                {section.features?.map((feature) => (
                  <motion.div key={feature.number} variants={itemVariant} className="bg-background/50 dark:bg-background/80 p-6 rounded-xl border border-border/50 flex flex-col h-full shadow-md hover:shadow-lg smooth-transitions">
                    <div className="bg-islamic-green/10 dark:bg-islamic-green/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 ring-2 ring-islamic-green/30">
                      <span className="text-islamic-green text-xl font-bold">{feature.number}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-secondary">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm flex-grow leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.section>
        ))}

        {/* Team Section */}
        <motion.section 
          variants={fadeUp} 
          className="bg-card/60 dark:bg-card/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-border/30 smooth-transitions hover:shadow-secondary/10"
        >
          <div className="flex items-center mb-6 md:mb-8">
            {aboutContent.team.icon}
            <h2 className="heading-islamic text-2xl md:text-3xl text-foreground">{aboutContent.team.title}</h2>
          </div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={stagger}>
            {aboutContent.team.members.map((member, idx) => (
              <motion.div key={idx} variants={itemVariant} className="bg-background/70 dark:bg-background p-6 rounded-xl shadow-lg border border-border/50 text-center flex flex-col items-center h-full hover:shadow-xl smooth-transitions">
                {member.image && (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 shadow-md ring-2 ring-islamic-green/50">
                    <Image src={member.image} alt={member.name} layout="fill" objectFit="cover" className="smooth-transitions group-hover:scale-105" />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-secondary mb-1">{member.name}</h3>
                <p className="text-sm text-islamic-green font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow text-center px-2">{member.bio}</p>
                <div className="flex space-x-3 mt-auto">
                  {member.links.linkedin && <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary p-2 rounded-full hover:bg-secondary/10"><Linkedin size={20} /></a>}
                  {member.links.github && <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary p-2 rounded-full hover:bg-secondary/10"><Github size={20} /></a>}
                  {member.links.email && <a href={`mailto:${member.links.email}`} className="text-muted-foreground hover:text-secondary p-2 rounded-full hover:bg-secondary/10"><Mail size={20} /></a>}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Contribution Section */}
        <motion.section 
          variants={fadeUp} 
          className="bg-card/60 dark:bg-card/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-border/30 smooth-transitions hover:shadow-secondary/10 text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start mb-5 md:mb-6">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 text-center md:text-left">
              {aboutContent.contribution.icon}
              <h2 className="heading-islamic text-2xl md:text-3xl text-foreground mt-2 md:mt-0">{aboutContent.contribution.title}</h2>
            </div>
            <div className="flex-grow">
              {aboutContent.contribution.content.map((p, i) => <p key={i} className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 last:mb-0">{p}</p>)}
              {aboutContent.contribution.actionButton && (
                <Button variant="outline" asChild className="mt-6 border-secondary text-secondary hover:bg-secondary/10 group">
                  <Link href={aboutContent.contribution.actionButton.href}>
                    {aboutContent.contribution.actionButton.text}
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 smooth-transitions" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </motion.section>

         {/* Join Us Section */}
        <motion.section 
          variants={fadeUp} 
          className="bg-gradient-to-r from-islamic-green to-islamic-teal p-8 sm:p-10 rounded-2xl shadow-2xl text-center border border-white/10"
        >
            {aboutContent.joinUs.icon && <div className="flex justify-center mb-4">{React.cloneElement(aboutContent.joinUs.icon, {className: "w-10 h-10 text-white/80"})}</div>}
            <h2 className="heading-islamic text-2xl md:text-3xl text-white mb-4">{aboutContent.joinUs.title}</h2>
            {aboutContent.joinUs.content.map((p, i) => <p key={i} className="text-lg text-white/90 leading-relaxed mb-6 max-w-xl mx-auto">{p}</p>)}
            {aboutContent.joinUs.actionButton && (
              <Button variant="secondary" size="lg" asChild className="bg-white hover:bg-gray-100 text-secondary font-semibold group shadow-lg hover:shadow-xl smooth-transitions">
                <Link href={aboutContent.joinUs.actionButton.href}>
                  {aboutContent.joinUs.actionButton.text}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 smooth-transitions" />
                </Link>
              </Button>
            )}
        </motion.section>

      </div>

      <motion.div variants={fadeUp} className="mt-12 md:mt-16 text-center relative z-10">
        <Button variant="outline" asChild className="border-secondary text-secondary hover:bg-secondary/10 group">
          <Link href="/">
            <ChevronLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 smooth-transitions" />
            Kembali ke Beranda
          </Link>
        </Button>
      </motion.div>
    </motion.main>
  );
}
