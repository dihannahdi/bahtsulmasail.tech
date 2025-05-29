'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { containerVariant, fadeUp } from '@/lib/animations';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, HelpCircle, ChevronRight } from 'lucide-react';

const faqData = [
  {
    id: "item-1",
    question: "Apa itu BahtsulMasail.tech?",
    answer: "BahtsulMasail.tech adalah platform digital yang berisi kumpulan dokumen hukum Islam, fatwa, dan pendapat ulama khususnya dari hasil Bahtsul Masail Pondok Pesantren yang telah diproses secara digital untuk memudahkan pencarian, pembelajaran, dan pemanfaatan bagi masyarakat umum maupun akademisi."
  },
  {
    id: "item-2",
    question: "Bagaimana cara menggunakan fitur pencarian?",
    answer: "Anda dapat menggunakan fitur pencarian dengan mengetikkan kata kunci, frasa, atau pertanyaan terkait topik yang ingin Anda cari di kolom pencarian. Sistem kami akan menampilkan dokumen-dokumen yang relevan dengan pencarian Anda. Anda juga dapat memfilter hasil berdasarkan kategori, tahun, atau sumber untuk mempersempit pencarian."
  },
  {
    id: "item-3",
    question: "Dari mana sumber dokumen yang ada di platform ini?",
    answer: "Dokumen yang tersedia di platform kami berasal dari berbagai sumber terpercaya, termasuk Hasil Bahtsul Masail Pondok Pesantren yang telah diverifikasi dan divalidasi, kitab-kitab klasik, publikasi lembaga fatwa resmi, karya ilmiah dari para ulama terkemuka, serta jurnal dan publikasi akademik di bidang hukum Islam. Setiap dokumen dilengkapi dengan informasi sumber untuk memastikan validitas dan otentisitasnya. Selain itu, khusus untuk Hasil Bahtsul Masail, kami lakukan proses verifikasi dan validasi secara manual untuk memastikan kebenaran dan kesahihannya."
  },
  {
    id: "item-4",
    question: "Apakah saya perlu mendaftar untuk menggunakan platform ini?",
    answer: "Tidak, Anda dapat menjelajahi dan mencari dokumen tanpa perlu mendaftar. Namun, pendaftaran akun akan memberikan Anda akses ke fitur tambahan seperti menyimpan dokumen favorit, mendapatkan rekomendasi personalisasi, serta mengunggah dan berbagi dokumen (untuk pengguna tertentu)."
  },
  {
    id: "item-5",
    question: "Bisakah saya mengunggah dokumen saya sendiri?",
    answer: "Ya, pengguna terdaftar dengan izin khusus (seperti mushoheh atau admin) dapat mengunggah dokumen. Setiap dokumen yang diunggah akan melalui proses verifikasi untuk memastikan kualitas dan reliabilitasnya sebelum dipublikasikan di platform."
  },
  {
    id: "item-6",
    question: "Bagaimana cara menghubungi tim dukungan?",
    answer: "Anda dapat menghubungi tim dukungan kami melalui halaman Kontak kami, mengirim email ke dihannahdii@gmail.com, atau menghubungi nomor 085643349455. Kami akan merespons pertanyaan Anda secepat mungkin."
  },
  {
    id: "item-7",
    question: "Apakah platform ini tersedia dalam bahasa lain?",
    answer: "Saat ini platform kami tersedia dalam Bahasa Indonesia dan sebagian dokumen tersedia dalam Bahasa Arab. Kami berencana untuk menambahkan dukungan bahasa lain di masa mendatang untuk menjangkau lebih banyak pengguna."
  }
];

export default function FAQPage() {
  return (
    <motion.main
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-background to-secondary/20 text-foreground pt-12 pb-16 sm:pt-16 sm:pb-24 px-4 md:px-8"
    >
      <div className="fixed inset-0 pattern-bg opacity-[0.02] pointer-events-none -z-10"></div>
      <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
        <header className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <HelpCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold heading-islamic bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Temukan jawaban atas pertanyaan umum tentang BahtsulMasail.tech.
          </p>
        </header>

        <Accordion type="single" collapsible className="w-full bg-card/70 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-border/30">
          {faqData.map((faqItem) => (
            <AccordionItem key={faqItem.id} value={faqItem.id} className="border-b border-border/50 last:border-b-0">
              <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary transition-colors text-left">
                {faqItem.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 prose prose-sm dark:prose-invert max-w-none">
                {faqItem.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <motion.div 
          variants={fadeUp}
          className="mt-12 text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl shadow-lg border border-border/20"
        >
          <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Masih punya pertanyaan?</h3>
          <p className="text-muted-foreground mb-4">
            Jangan ragu untuk menghubungi kami jika Anda tidak menemukan jawaban yang Anda cari.
          </p>
          <a 
            href="mailto:dihannahdii@gmail.com" 
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-primary/50 transition-colors group"
          >
            Hubungi Kami <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform"/>
          </a>
        </motion.div>
      </motion.div>
    </motion.main>
  );
} 