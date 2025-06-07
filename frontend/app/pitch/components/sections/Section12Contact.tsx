'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, Calendar } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

export default function Section12Contact() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="w-full max-w-4xl mx-auto px-6"
    >
      <div className="text-center">
        {/* Section Header */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Join Us in Building the Future</h2>
          <div className="w-24 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
          <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
            We are seeking partners who share our vision for a digitally empowered and intellectually vibrant Islamic civilization.
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-emerald-700/50"
        >
          <div className="max-w-lg mx-auto">
            <div className="flex flex-col gap-6">
              <a href="mailto:contact@bahtsulmasail.tech" className="flex items-center gap-4 p-4 bg-black/30 rounded-lg border border-emerald-900/50 hover:border-emerald-700 transition-colors">
                <Mail className="w-6 h-6 text-emerald-400" />
                <span className="text-white text-lg">contact@bahtsulmasail.tech</span>
              </a>
              <a href="tel:+6281234567890" className="flex items-center gap-4 p-4 bg-black/30 rounded-lg border border-emerald-900/50 hover:border-emerald-700 transition-colors">
                <Phone className="w-6 h-6 text-emerald-400" />
                <span className="text-white text-lg">+62 812 3456 7890</span>
              </a>
            </div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0px 0px 20px rgba(16, 185, 129, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 w-full bg-gradient-to-r from-emerald-600 to-green-500 text-white py-4 px-6 rounded-lg font-bold text-xl flex items-center justify-center gap-3 transition-all duration-300"
            >
              <Calendar className="w-6 h-6" />
              Schedule a Follow-up Meeting
            </motion.button>
          </div>
        </motion.div>

        {/* Thank you */}
        <motion.div variants={itemVariants} className="mt-16">
          <h3 className="text-2xl font-bold text-emerald-300">Terima Kasih.</h3>
        </motion.div>
      </div>
    </motion.div>
  );
} 