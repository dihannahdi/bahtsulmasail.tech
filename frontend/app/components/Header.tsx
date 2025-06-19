import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  HomeIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'الرئيسية', nameEn: 'Home', href: '/', icon: HomeIcon },
  { name: 'الوثائق', nameEn: 'Documents', href: '/documents', icon: BookOpenIcon },
  { name: 'البحث', nameEn: 'Search', href: '/search', icon: MagnifyingGlassIcon },
  { name: 'عن المشروع', nameEn: 'About', href: '/about', icon: InformationCircleIcon },
];

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    }
  }
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 15,
    }
  }
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-lg border-b border-border/20' 
          : 'bg-transparent'
      }`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <motion.div 
          className="flex lg:flex-1"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/" className="group flex items-center space-x-2 -m-1.5 p-1.5">
            <motion.div 
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-islamic-green to-islamic-teal"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BookOpenIcon className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-semibold bg-gradient-to-r from-islamic-green to-islamic-teal bg-clip-text text-transparent group-hover:from-islamic-teal group-hover:to-islamic-green transition-all duration-300">
                بحث المسائل
              </span>
              <span className="text-xs text-muted-foreground font-medium">Bahtsul Masail</span>
            </div>
          </Link>
        </motion.div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <motion.button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-foreground hover:bg-accent/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Open main menu</span>
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.name}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group flex items-center space-x-2 text-sm font-medium text-foreground/70 hover:text-islamic-green transition-all duration-300 py-2 px-3 rounded-lg hover:bg-islamic-green/5"
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="hidden xl:inline">{item.nameEn}</span>
                  <span className="xl:hidden font-arabic text-right">{item.name}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop right section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
          <motion.button 
            className="group flex items-center justify-center w-10 h-10 rounded-lg text-foreground/60 hover:text-islamic-green hover:bg-islamic-green/5 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MagnifyingGlassIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
          </motion.button>
          <motion.button 
            className="group flex items-center justify-center w-10 h-10 rounded-lg text-foreground/60 hover:text-islamic-green hover:bg-islamic-green/5 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserCircleIcon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="bg-background/95 backdrop-blur-lg border-t border-border/20 shadow-lg">
              <div className="space-y-1 px-6 py-6">
                {navigation.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-center space-x-3 rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-islamic-green/5 hover:text-islamic-green transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                        <span>{item.nameEn}</span>
                        <span className="mr-auto font-arabic text-right text-islamic-green/70">{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="border-t border-border/20 px-6 py-4">
                <div className="flex items-center justify-center space-x-4">
                  <motion.button 
                    className="group flex items-center justify-center w-12 h-12 rounded-lg text-foreground/60 hover:text-islamic-green hover:bg-islamic-green/5 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MagnifyingGlassIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  </motion.button>
                  <motion.button 
                    className="group flex items-center justify-center w-12 h-12 rounded-lg text-foreground/60 hover:text-islamic-green hover:bg-islamic-green/5 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <UserCircleIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 