import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Discussions', href: '/discussions' },
  { name: 'Resources', href: '/resources' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="font-display text-xl text-primary-900">Bahtsul Masail</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop right section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors">
            <UserCircleIcon className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="fixed inset-x-0 top-[73px] z-50 bg-white/90 backdrop-blur-lg py-6 shadow-lg">
          <div className="space-y-1 px-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-6 px-6 py-3 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors">
                <UserCircleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
} 