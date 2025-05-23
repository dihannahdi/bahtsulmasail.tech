import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FooterProps {
  textSize: 'normal' | 'large';
  theme: 'light' | 'dark';
}

export const Footer: React.FC<FooterProps> = ({ textSize, theme }) => {
  return (
    <motion.footer
      className="pt-12 pb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Latest Photo */}
      <div className="mb-12">
        <motion.div 
          className="relative overflow-hidden rounded-xl shadow-lg mx-auto max-w-4xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Image container with overlay */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <img 
              src="/bahtsul-masail-banner.jpg" 
              alt="Sesi Bahtsul Masail terkini" 
              className="w-full h-full object-cover transition-transform duration-2000 hover:scale-110"
              loading="lazy"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-medium text-lg">Sesi Bahtsul Masail yang diselenggarakan di Pesantren Al-Anwar, Rembang, 2023.</p>
                <p className="text-sm text-white/80 mt-1">Klik untuk memperbesar</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.p 
          className={cn(
            "text-center mt-3 mx-auto max-w-2xl",
            textSize === 'normal' ? "text-sm" : "text-base",
            theme === 'light' ? "text-slate-500" : "text-slate-400"
          )}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Forum Bahtsul Masail modern yang memadukan tradisi keilmuan klasik dengan metode pembahasan kontemporer untuk merespons isu-isu aktual masyarakat.
        </motion.p>
      </div>
      
      {/* Footer Content */}
      <div className={cn(
        "border-t pt-8 mt-8",
        theme === 'light' ? "border-slate-200" : "border-slate-700"
      )}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* References Column */}
          <div>
            <h3 className={cn(
              "font-medium mb-4",
              textSize === 'normal' ? "text-lg" : "text-xl",
              theme === 'light' ? "text-slate-900" : "text-white"
            )}>
              Referensi
            </h3>
            <ul className={cn(
              "space-y-2 list-disc pl-5",
              textSize === 'normal' ? "text-sm" : "text-base",
              theme === 'light' ? "text-slate-600" : "text-slate-400"
            )}>
              <li>
                <a 
                  href="https://www.nu.or.id/nasional/halaqah-EGGFq" 
                  className="hover:text-emerald-600 hover:underline transition-colors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  NU Online - Sejarah Halaqah
                </a>
              </li>
              <li>
                <a 
                  href="http://etheses.uin-malang.ac.id/171/7/10210112%20Bab%203.pdf" 
                  className="hover:text-emerald-600 hover:underline transition-colors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Tesis UIN Malang - Metodologi Bahtsul Masail
                </a>
              </li>
              <li>
                <a 
                  href="https://jateng.nu.or.id/fragmen/kontribusi-besar-lembaga-bahtsul-masail-nu-dalam-berbangsa-dan-bernegara-1-JnIgm" 
                  className="hover:text-emerald-600 hover:underline transition-colors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Kontribusi LBM NU dalam Berbangsa dan Bernegara
                </a>
              </li>
              <li>
                <a 
                  href="https://digilib.uin-suka.ac.id/14428/" 
                  className="hover:text-emerald-600 hover:underline transition-colors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Digilib UIN Sunan Kalijaga - Keputusan Bahtsul Masail
                </a>
              </li>
              <li>
                <a 
                  href="https://media.neliti.com/media/publications/363011-none-87d01152.pdf" 
                  className="hover:text-emerald-600 hover:underline transition-colors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Media Neliti - Transformasi Bahtsul Masail
                </a>
              </li>
            </ul>
          </div>
          
          {/* Quick Navigation Column */}
          <div>
            <h3 className={cn(
              "font-medium mb-4",
              textSize === 'normal' ? "text-lg" : "text-xl",
              theme === 'light' ? "text-slate-900" : "text-white"
            )}>
              Navigasi Cepat
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <NavLink href="#halaqah" label="Akar Intelektual" theme={theme} />
              <NavLink href="#early" label="Fase Awal NU" theme={theme} />
              <NavLink href="#modern" label="Era Modern" theme={theme} />
              <NavLink href="#contributions" label="Kontribusi" theme={theme} />
              <NavLink href="#quiz" label="Refleksi & Quiz" theme={theme} />
              <NavLink 
                href="#" 
                label="Kembali ke Atas" 
                theme={theme} 
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Logo and Copyright */}
        <div className="text-center">
          <motion.div
            className="mb-4 inline-block"
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="/placeholder.svg" 
              alt="Logo NU" 
              className={cn(
                "h-12 opacity-40 transition-opacity duration-300",
                "hover:opacity-80"
              )}
            />
          </motion.div>
          
          <p className={cn(
            "text-center",
            textSize === 'normal' ? "text-xs" : "text-sm",
            theme === 'light' ? "text-slate-400" : "text-slate-500"
          )}>
            © {new Date().getFullYear()} Islamic Insight Nexus | Sejarah Bahtsul Masail
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
  theme: 'light' | 'dark';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, theme, onClick }) => {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={cn(
        "py-1 px-2 rounded transition-colors block",
        theme === 'light' 
          ? "text-slate-600 hover:bg-emerald-50 hover:text-emerald-600" 
          : "text-slate-400 hover:bg-emerald-900/20 hover:text-emerald-400"
      )}
      whileHover={{ x: 3 }}
      transition={{ duration: 0.2 }}
    >
      <span className="flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
          className="w-4 h-4 mr-1 opacity-70"
        >
          <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
        </svg>
        {label}
      </span>
    </motion.a>
  );
}; 