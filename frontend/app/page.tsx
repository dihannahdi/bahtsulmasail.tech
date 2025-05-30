'use client';

import React, { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  BookOpenIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon,
  LightBulbIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Image from 'next/image';

// Enhanced animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const slideIn = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats = [
    { 
      id: 1, 
      name: 'Artikel Terpublikasi', 
      value: '500+',
      icon: BookOpenIcon,
      color: 'bg-blue-500'
    },
    { 
      id: 2, 
      name: 'Ulama & Cendekiawan', 
      value: '100+',
      icon: UserGroupIcon,
      color: 'bg-green-500'
    },
    { 
      id: 3, 
      name: 'Pembahasan Fiqih', 
      value: '1,000+',
      icon: AcademicCapIcon,
      color: 'bg-purple-500'
    },
    { 
      id: 4, 
      name: 'Pengguna Aktif', 
      value: '10,000+',
      icon: ChartBarIcon,
      color: 'bg-orange-500'
    },
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
    <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main className="relative">
        {/* Enhanced Hero Section with Better Contrast */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <motion.div
            style={{ scale: scaleProgress, opacity: opacityProgress }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30 dark:opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 dark:from-primary-400/10 dark:to-secondary-400/10" />
          </motion.div>

          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
            <motion.div
              className="text-center"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div
                variants={fadeIn}
                className="relative inline-block"
              >
                <motion.div
                  className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 opacity-75 blur dark:opacity-90"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <h1 className="relative text-5xl md:text-7xl font-display font-bold tracking-tight text-slate-900 dark:text-white sm:text-8xl">
                  Bahtsul Masail untuk{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500 dark:from-primary-400 dark:to-secondary-400">
                    Islam Digdaya
                  </span>
                </h1>
              </motion.div>

              <motion.p 
                className="mt-8 text-xl leading-8 text-slate-700 dark:text-slate-200 max-w-2xl mx-auto"
                variants={fadeIn}
              >
                Platform diskusi dan kajian fiqih Islam kontemporer yang menghubungkan ulama, akademisi, dan masyarakat dalam pembahasan hukum Islam yang mendalam dan relevan.
              </motion.p>

              <motion.div 
                className="mt-12 flex items-center justify-center gap-x-6"
                variants={fadeIn}
              >
                <motion.a
                  href="#mulai-diskusi"
                  className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium transition-all duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-primary-600 to-primary-500 opacity-100 group-hover:opacity-90 transition-opacity dark:from-primary-500 dark:to-primary-400" />
                  <span className="relative flex items-center text-white">
                    Mulai Diskusi
                    <SparklesIcon className="ml-2 h-5 w-5" />
                  </span>
                </motion.a>

                <motion.a 
                  href="#pelajari" 
                  className="text-lg font-semibold leading-6 text-slate-900 hover:text-primary-600 transition-colors duration-300 dark:text-white dark:hover:text-primary-400"
                  whileHover={{ x: 5 }}
                >
                  Pelajari Lebih Lanjut <span aria-hidden="true">→</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent dark:from-slate-900"
            style={{ opacity: smoothProgress }}
          />
        </section>

        {/* Enhanced Stats Section with Better Contrast */}
        <section className="relative bg-white dark:bg-slate-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-1 gap-8 lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  className="relative group"
                  variants={scaleUp}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 dark:opacity-50" />
                  <div className="relative flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <stat.icon className={`h-12 w-12 ${stat.color} bg-opacity-10 dark:bg-opacity-20 rounded-xl p-2 text-primary-600 dark:text-primary-400 mb-4`} />
                    <dt className="text-sm font-medium text-slate-600 dark:text-slate-300">{stat.name}</dt>
                    <dd className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {stat.value}
                    </dd>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Features Section with Better Contrast */}
        <section className="relative bg-slate-50 dark:bg-slate-800/50 py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-30 dark:opacity-10" />
          
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div 
              className="mx-auto max-w-2xl lg:text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeIn}>
                <span className="inline-flex items-center rounded-full px-4 py-1 text-primary-700 dark:text-primary-400 ring-1 ring-inset ring-primary-700/20 dark:ring-primary-400/30 backdrop-blur-sm">
                  <SparklesIcon className="mr-1.5 h-4 w-4" />
                  Fitur Unggulan
                </span>
              </motion.div>
              
              <motion.h2 
                variants={fadeIn}
                className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              >
                Eksplorasi Mendalam{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500 dark:from-primary-400 dark:to-secondary-400">
                  Hukum Islam
                </span>
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300"
              >
                Temukan berbagai fitur yang memudahkan Anda dalam memahami dan mendiskusikan permasalahan fiqih kontemporer.
              </motion.p>
            </motion.div>

            <motion.div 
              className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    variants={slideIn}
                    className="relative group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 transition-all duration-300 hover:shadow-lg">
                      <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary-500 to-secondary-500 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100 duration-500" />
                      
                      <dt className="inline-flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900 dark:text-white">
                        <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                        {feature.name}
                      </dt>
                      
                      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600 dark:text-slate-300">
                        <p className="flex-auto">{feature.description}</p>
                        <p className="mt-6">
                          <a
                            href="#"
                            className="text-sm font-semibold leading-6 text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                          >
                            Pelajari lebih lanjut <span aria-hidden="true">→</span>
                          </a>
                        </p>
                      </dd>
                    </div>
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Recent Topics Section with Better Contrast */}
        <section className="relative bg-white dark:bg-slate-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div 
              className="mx-auto max-w-2xl text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.h2 
                variants={fadeIn}
                className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
              >
                Pembahasan Terkini
              </motion.h2>
              <motion.p 
                variants={fadeIn}
                className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300"
              >
                Ikuti diskusi dan kajian terbaru seputar permasalahan fiqih kontemporer.
              </motion.p>
            </motion.div>

            <motion.div 
              className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              {recentTopics.map((topic, index) => (
                <motion.article
                  key={index}
                  variants={scaleUp}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 group-hover:opacity-75 transition-opacity duration-300 dark:from-primary-400/30 dark:to-secondary-400/30" />
                    <Image
                      src={`/topic-${index + 1}.jpg`}
                      alt={topic.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime="2024-03" className="text-slate-500 dark:text-slate-400">
                        Maret 2024
                      </time>
                      <span className="relative z-10 rounded-full bg-primary-50 dark:bg-primary-900/50 px-3 py-1.5 font-medium text-primary-600 dark:text-primary-400">
                        {topic.category}
                      </span>
                    </div>
                    
                    <div className="group relative mt-4">
                      <h3 className="text-lg font-semibold leading-6 text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                        <a href="#">
                          <span className="absolute inset-0" />
                          {topic.title}
                        </a>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {topic.excerpt}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enhanced CTA Section with Better Contrast */}
        <section className="relative isolate">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 -z-10" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
          
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeIn}>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  Bergabung dalam Diskusi
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100 dark:text-primary-200">
                  Jadilah bagian dari komunitas yang aktif mendiskusikan dan mencari solusi atas berbagai permasalahan fiqih kontemporer.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="mt-10 flex items-center justify-center gap-x-6"
              >
                <motion.a
                  href="#daftar"
                  className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium transition-all duration-300 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 w-full h-full rounded-md bg-green-500 hover:bg-green-600 dark:bg-slate-200 opacity-100 group-hover:opacity-90 transition-opacity" />
                  <span className="relative flex items-center text-white dark:text-primary-700">
                    Daftar Sekarang
                    <SparklesIcon className="ml-2 h-5 w-5" />
                  </span>
                </motion.a>

                <motion.a 
                  href="#konsultasi" 
                  className="text-lg font-semibold leading-6 text-white hover:text-primary-200 dark:hover:text-primary-300 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  Konsultasi Langsung <span aria-hidden="true">→</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute left-0 bottom-0 w-full overflow-hidden">
            <svg
              className="relative block w-full h-12 text-white dark:text-slate-900"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="fill-current"
              />
            </svg>
          </div>
        </section>
      </main>
    </div>
  );
};
