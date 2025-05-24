'use client';

import React from 'react';
import {
  MagnifyingGlassIcon,
  BookOpenIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';
import Image from 'next/image';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const stats = [
    { id: 1, name: 'Artikel Terpublikasi', value: '500+' },
    { id: 2, name: 'Ulama & Cendekiawan', value: '100+' },
    { id: 3, name: 'Pembahasan Fiqih', value: '1,000+' },
    { id: 4, name: 'Pengguna Aktif', value: '10,000+' },
  ];

  const features = [
    {
      name: 'Kajian Mendalam',
      description: 'Analisis komprehensif tentang hukum Islam kontemporer dengan pendekatan yang sistematis dan terstruktur.',
      icon: BookOpenIcon,
    },
    {
      name: 'Diskusi Interaktif',
      description: 'Forum diskusi yang memungkinkan pertukaran pemikiran antara ulama, akademisi, dan masyarakat umum.',
      icon: UserGroupIcon,
    },
    {
      name: 'Riset Akademis',
      description: 'Hasil penelitian terkini dalam bidang fiqih dan hukum Islam dari berbagai perspektif keilmuan.',
      icon: AcademicCapIcon,
    },
  ];

  const recentTopics = [
    {
      title: 'Fiqih Ekonomi Digital',
      category: 'Muamalah',
      excerpt: 'Pembahasan mendalam tentang aspek syariah dalam transaksi digital dan cryptocurrency.',
    },
    {
      title: 'Bioetika dalam Islam',
      category: 'Kontemporer',
      excerpt: 'Kajian tentang perspektif Islam dalam isu-isu bioetika modern.',
    },
    {
      title: 'Fiqih Lingkungan',
      category: 'Sosial',
      excerpt: 'Analisis hukum Islam terkait konservasi lingkungan dan pembangunan berkelanjutan.',
    },
  ];

  return (
    <>
      <Head>
        <title>Bahtsul Masail - Platform Diskusi Fiqih Islam Kontemporer</title>
        <meta name="description" content="Platform diskusi dan kajian fiqih Islam kontemporer yang menghubungkan ulama, akademisi, dan masyarakat dalam pembahasan hukum Islam yang mendalam dan relevan." />
        <meta name="keywords" content="bahtsul masail, fiqih islam, hukum islam, kajian islam, ulama indonesia, diskusi syariah" />
        <meta property="og:title" content="Bahtsul Masail - Platform Diskusi Fiqih Islam Kontemporer" />
        <meta property="og:description" content="Platform diskusi dan kajian fiqih Islam kontemporer yang menghubungkan ulama, akademisi, dan masyarakat." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative pt-[73px] overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.h1 
                className="text-4xl font-display font-bold tracking-tight text-gray-900 sm:text-6xl"
                variants={fadeIn}
              >
                Bahtsul Masail untuk{' '}
                <span className="text-primary-600">Islam Digdaya</span>
              </motion.h1>
              <motion.p 
                className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto"
                variants={fadeIn}
              >
                Platform diskusi dan kajian fiqih Islam kontemporer yang menghubungkan ulama, akademisi, dan masyarakat dalam pembahasan hukum Islam yang mendalam dan relevan.
              </motion.p>
              <motion.div 
                className="mt-10 flex items-center justify-center gap-x-6"
                variants={fadeIn}
              >
                <a
                  href="#mulai-diskusi"
                  className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Mulai Diskusi
                </a>
                <a href="#pelajari" className="text-sm font-semibold leading-6 text-gray-900">
                  Pelajari Lebih Lanjut <span aria-hidden="true">→</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  className="mx-auto flex max-w-xs flex-col gap-y-4"
                  variants={fadeIn}
                >
                  <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    {stat.value}
                  </dd>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-600">Fitur Unggulan</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Eksplorasi Mendalam Hukum Islam
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Temukan berbagai fitur yang memudahkan Anda dalam memahami dan mendiskusikan permasalahan fiqih kontemporer.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <motion.div
                    key={feature.name}
                    className="flex flex-col"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                  >
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <feature.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Recent Topics Section */}
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Pembahasan Terkini
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Ikuti diskusi dan kajian terbaru seputar permasalahan fiqih kontemporer.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {recentTopics.map((topic, index) => (
                <motion.article
                  key={index}
                  className="flex flex-col items-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <div className="rounded-2xl bg-gray-50 p-8 w-full">
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime="2024-03" className="text-gray-500">
                        Maret 2024
                      </time>
                      <span className="relative z-10 rounded-full bg-primary-50 px-3 py-1.5 font-medium text-primary-600">
                        {topic.category}
                      </span>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href="#">
                          <span className="absolute inset-0" />
                          {topic.title}
                        </a>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {topic.excerpt}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-600">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Bergabung dalam Diskusi
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
                Jadilah bagian dari komunitas yang aktif mendiskusikan dan mencari solusi atas berbagai permasalahan fiqih kontemporer.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#daftar"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Daftar Sekarang
                </a>
                <a href="#konsultasi" className="text-sm font-semibold leading-6 text-white">
                  Konsultasi Langsung <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
