'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Database, ShieldCheck, BookOpenCheck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Sejarah Bahtsul Masail', href: '/history-of-bahtsul-masail' },
    { name: 'FAQ', href: '/faq' },
    // { name: 'Kebijakan Privasi', href: '/privacy-policy' }, // Removed for now
    // { name: 'Hubungi Kami', href: '/contact' }, // Removed for now
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-card/50 dark:bg-card/30 border-t border-border/70 text-foreground py-12 md:py-16 z-10 relative backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 md:mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-3 group">
              <BookOpenCheck className="h-8 w-8 text-primary group-hover:text-primary/80 smooth-transitions" />
              <span className="ml-2 text-xl font-serif font-semibold text-primary group-hover:text-primary/80 smooth-transitions">
                BahtsulMasail.tech
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Melestarikan dan mendigitalisasi khazanah Bahtsul Masail untuk kemudahan akses umat Islam global.
            </p>
          </div>

          <div>
            <h5 className="text-base font-semibold text-foreground mb-4">Navigasi Cepat</h5>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-2 smooth-transitions">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-base font-semibold text-foreground mb-4">Terhubung Dengan Kami</h5>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" 
                      className="text-muted-foreground hover:text-primary smooth-transitions p-2 rounded-full hover:bg-primary/10">
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Email: <a href="mailto:info@bahtsulmasail.tech" className="hover:text-primary hover:underline">info@bahtsulmasail.tech</a>
            </p>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} BahtsulMasail.tech. Dirancang dan dikembangkan oleh Tim BahtsulMasail.tech.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Seluruh hak cipta dilindungi undang-undang.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 