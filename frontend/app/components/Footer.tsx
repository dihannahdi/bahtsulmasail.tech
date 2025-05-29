import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const footerNavigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Articles', href: '/articles' },
    { name: 'Discussions', href: '/discussions' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Research Papers', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'FAQs', href: '#' },
  ],
  community: [
    { name: 'Forums', href: '#' },
    { name: 'Events', href: '#' },
    { name: 'Contribute', href: '#' },
    { name: 'Scholars Network', href: '#' },
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-background/95 border-t border-border" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <motion.div
          className="xl:grid xl:grid-cols-3 xl:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand section */}
          <motion.div className="space-y-8" variants={itemVariants}>
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-display text-primary hover:text-primary/90 transition-colors">
                Bahtsul Masail
              </Link>
            </div>
            <motion.p 
              className="text-sm leading-6 text-muted-foreground max-w-md"
              variants={itemVariants}
            >
              Explore the depths of Islamic legal reasoning with clarity and confidence. Join us in fostering an enlightened understanding for a vibrant future.
            </motion.p>
            <motion.div className="flex space-x-6" variants={itemVariants}>
              {footerNavigation.social.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Navigation sections */}
          <motion.div 
            className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0"
            variants={containerVariants}
          >
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.resources.map((item) => (
                    <motion.li key={item.name} variants={itemVariants}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div className="mt-10 md:mt-0" variants={itemVariants}>
                <h3 className="text-sm font-semibold leading-6 text-foreground">Community</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerNavigation.community.map((item) => (
                    <motion.li key={item.name} variants={itemVariants}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          className="mt-16 border-t border-border/60 pt-8 sm:mt-20 lg:mt-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <motion.div className="flex-1 max-w-md" variants={itemVariants}>
              <h3 className="text-sm font-semibold leading-6 text-foreground">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Stay updated with the latest insights and discussions in Islamic jurisprudence.
              </p>
              <div className="mt-4 flex gap-x-4">
                <motion.input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border border-border bg-background/5 px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                  placeholder="Enter your email"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  type="submit"
                  className="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>

            <motion.div className="flex items-center gap-4" variants={itemVariants}>
              <GlobeAltIcon className="h-6 w-6 text-muted-foreground" />
              <select
                className="block rounded-md border-border bg-background py-1.5 pl-3 pr-10 text-foreground focus:ring-2 focus:ring-primary sm:text-sm"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
                <option value="id">Indonesia</option>
              </select>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div 
          className="mt-8 border-t border-border/60 pt-8 md:flex md:items-center md:justify-between"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="flex space-x-6 md:order-2" variants={itemVariants}>
            {footerNavigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm leading-6 text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
          <motion.p 
            className="mt-8 text-sm leading-6 text-muted-foreground md:order-1 md:mt-0"
            variants={itemVariants}
          >
            &copy; {new Date().getFullYear()} Bahtsul Masail. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
} 