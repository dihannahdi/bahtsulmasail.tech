import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  GlobeAltIcon,
  BookOpenIcon,
  AcademicCapIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';

const footerNavigation = {
  main: [
    { name: 'الرئيسية', nameEn: 'Home', href: '/' },
    { name: 'عن المشروع', nameEn: 'About Us', href: '/about' },
    { name: 'الأسئلة الشائعة', nameEn: 'FAQ', href: '/faq' },
    { name: 'التاريخ', nameEn: 'History', href: '/history-of-bahtsul-masail' },
  ],
  resources: [
    { name: 'الوثائق', nameEn: 'Documents', href: '/documents' },
    { name: 'البحث الدلالي', nameEn: 'Semantic Search', href: '/search' },
    { name: 'لوحة التحكم', nameEn: 'Dashboard', href: '/dashboard' },
    { name: 'التصحيح', nameEn: 'Tashih', href: '/dashboard/tashih' },
  ],
  community: [
    { name: 'المنتديات', nameEn: 'Forums', href: '/forums' },
    { name: 'الفعاليات', nameEn: 'Events', href: '/events' },
    { name: 'المساهمة', nameEn: 'Contribute', href: '/contribute' },
    { name: 'شبكة العلماء', nameEn: 'Scholars Network', href: '/scholars' },
  ],
  legal: [
    { name: 'سياسة الخصوصية', nameEn: 'Privacy Policy', href: '/privacy' },
    { name: 'الشروط والأحكام', nameEn: 'Terms of Service', href: '/terms' },
  ],
  social: [
    {
      name: 'Twitter',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 border-t border-border/40">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.03),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(13,148,136,0.03),transparent_40%)]" />
      
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:px-8">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Brand section */}
            <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
              <div className="space-y-6">
                <Link 
                  href="/" 
                  className="group inline-flex items-center space-x-3"
                >
                  <motion.div 
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-islamic-green to-islamic-teal"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <BookOpenIcon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="font-serif text-2xl font-semibold bg-gradient-to-r from-islamic-green to-islamic-teal bg-clip-text text-transparent group-hover:from-islamic-teal group-hover:to-islamic-green transition-all duration-300">
                      بحث المسائل
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">Bahtsul Masail Technology</span>
                  </div>
                </Link>
                
                <motion.p 
                  className="text-muted-foreground leading-relaxed max-w-md"
                  variants={itemVariants}
                >
                  منصة متقدمة لاستكشاف أعماق الفقه الإسلامي والاستدلال الشرعي بوضوح وثقة، تجمع بين التراث العريق والتقنية الحديثة.
                </motion.p>
                
                <motion.p 
                  className="text-sm text-muted-foreground leading-relaxed max-w-md"
                  variants={itemVariants}
                >
                  Advanced platform for exploring Islamic jurisprudence with clarity and confidence, bridging classical scholarship with modern technology.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex items-center space-x-6" 
                variants={itemVariants}
              >
                {footerNavigation.social.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-islamic-green hover:bg-islamic-green/5 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Navigation sections */}
            <motion.div
              className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {/* Resources */}
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center space-x-2">
                  <AcademicCapIcon className="w-4 h-4 text-islamic-green" />
                  <span>الموارد</span>
                </h3>
                <ul className="space-y-4">
                  {footerNavigation.resources.map((item) => (
                    <motion.li 
                      key={item.name}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Link
                        href={item.href}
                        className="group text-sm text-muted-foreground hover:text-islamic-green transition-all duration-300 flex items-center justify-between"
                      >
                        <span>{item.nameEn}</span>
                        <span className="font-arabic text-xs text-islamic-green/60 group-hover:text-islamic-green">{item.name}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Community */}
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center space-x-2">
                  <GlobeAltIcon className="w-4 h-4 text-islamic-green" />
                  <span>المجتمع</span>
                </h3>
                <ul className="space-y-4">
                  {footerNavigation.community.map((item) => (
                    <motion.li 
                      key={item.name}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Link
                        href={item.href}
                        className="group text-sm text-muted-foreground hover:text-islamic-green transition-all duration-300 flex items-center justify-between"
                      >
                        <span>{item.nameEn}</span>
                        <span className="font-arabic text-xs text-islamic-green/60 group-hover:text-islamic-green">{item.name}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Legal & Contact */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center space-x-2">
                    <EnvelopeIcon className="w-4 h-4 text-islamic-green" />
                    <span>قانوني</span>
                  </h3>
                  <ul className="space-y-4">
                    {footerNavigation.legal.map((item) => (
                      <motion.li 
                        key={item.name}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Link
                          href={item.href}
                          className="group text-sm text-muted-foreground hover:text-islamic-green transition-all duration-300 flex items-center justify-between"
                        >
                          <span>{item.nameEn}</span>
                          <span className="font-arabic text-xs text-islamic-green/60 group-hover:text-islamic-green">{item.name}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">الروابط السريعة</h3>
                  <ul className="space-y-3">
                    {footerNavigation.main.map((item) => (
                      <motion.li 
                        key={item.name}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Link
                          href={item.href}
                          className="group text-sm text-muted-foreground hover:text-islamic-green transition-all duration-300 flex items-center justify-between"
                        >
                          <span>{item.nameEn}</span>
                          <span className="font-arabic text-xs text-islamic-green/60 group-hover:text-islamic-green">{item.name}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-border/40 bg-muted/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              <motion.p 
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                © {new Date().getFullYear()} Bahtsul Masail Technology. جميع الحقوق محفوظة.
              </motion.p>
              <motion.div 
                className="flex items-center space-x-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <span>صُنع بـ</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <HeartIcon className="w-4 h-4 text-islamic-green" />
                </motion.div>
                <span>لخدمة العلم والمعرفة الإسلامية</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 