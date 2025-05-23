import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SettingsPanelProps {
  textSize: 'normal' | 'large';
  setTextSize: (size: 'normal' | 'large') => void;
  theme: 'light' | 'dark';
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  textSize,
  setTextSize,
  theme
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {/* Settings Toggle Button */}
      <motion.button
        className={cn(
          "fixed top-20 right-6 z-40 p-2 rounded-full",
          theme === 'light' 
            ? "bg-white shadow-md text-slate-600" 
            : "bg-slate-800 shadow-md shadow-slate-900/20 text-slate-300",
          "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        )}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        aria-label="Pengaturan Tampilan"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </motion.button>
    
      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel */}
            <motion.div
              className={cn(
                "fixed top-20 right-6 z-50 w-80 rounded-xl overflow-hidden shadow-xl",
                theme === 'light' 
                  ? "bg-white border border-slate-200" 
                  : "bg-slate-900 border border-slate-700"
              )}
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              role="dialog"
              aria-label="Panel Pengaturan"
            >
              {/* Panel Header */}
              <div className={cn(
                "px-5 py-4 border-b",
                theme === 'light' ? "border-slate-200" : "border-slate-700"
              )}>
                <div className="flex items-center justify-between">
                  <h3 className={cn(
                    "font-medium",
                    theme === 'light' ? "text-slate-900" : "text-white"
                  )}>
                    Pengaturan Tampilan
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "p-1 rounded-full",
                      theme === 'light' 
                        ? "text-slate-500 hover:bg-slate-100" 
                        : "text-slate-400 hover:bg-slate-800",
                      "focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    )}
                    aria-label="Tutup panel pengaturan"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Panel Content */}
              <div className="p-5">
                {/* Text Size */}
                <div className="mb-6">
                  <label className={cn(
                    "block mb-3 font-medium",
                    theme === 'light' ? "text-slate-900" : "text-white"
                  )}>
                    Ukuran Teks
                  </label>
                  <div className="flex gap-2">
                    <TextSizeButton 
                      label="Normal" 
                      active={textSize === 'normal'} 
                      onClick={() => setTextSize('normal')}
                      theme={theme}
                    />
                    <TextSizeButton 
                      label="Besar" 
                      active={textSize === 'large'} 
                      onClick={() => setTextSize('large')}
                      theme={theme}
                    />
                  </div>
                </div>
                
                {/* Keyboard Navigation */}
                <div className="mb-6">
                  <h4 className={cn(
                    "mb-3 font-medium",
                    theme === 'light' ? "text-slate-900" : "text-white"
                  )}>
                    Navigasi Keyboard
                  </h4>
                  <div className={cn(
                    "text-sm space-y-2",
                    theme === 'light' ? "text-slate-600" : "text-slate-400"
                  )}>
                    <KeyboardShortcut shortcut="←/→" description="Navigasi antar era" theme={theme} />
                    <KeyboardShortcut shortcut="Space" description="Fokus konten berikutnya" theme={theme} />
                    <KeyboardShortcut shortcut="Esc" description="Tutup panel/modal" theme={theme} />
                  </div>
                </div>
                
                {/* Accessibility Notes */}
                <div className="mb-6">
                  <h4 className={cn(
                    "mb-2 font-medium",
                    theme === 'light' ? "text-slate-900" : "text-white"
                  )}>
                    Tentang Aksesibilitas
                  </h4>
                  <p className={cn(
                    "text-xs",
                    theme === 'light' ? "text-slate-600" : "text-slate-400"
                  )}>
                    Halaman ini dioptimalkan untuk pembaca layar dan navigasi keyboard. 
                    Semua konten memiliki atribut ARIA yang sesuai dan struktur yang 
                    memudahkan navigasi.
                  </p>
                </div>
                
                {/* Close Button */}
                <motion.button
                  className={cn(
                    "w-full py-2 rounded-lg mt-2 font-medium",
                    "bg-emerald-600 hover:bg-emerald-700 text-white",
                    "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  )}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Tutup
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

interface TextSizeButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  theme: 'light' | 'dark';
}

const TextSizeButton: React.FC<TextSizeButtonProps> = ({
  label,
  active,
  onClick,
  theme
}) => {
  return (
    <motion.button
      className={cn(
        "flex-1 py-2 rounded-lg transition-colors",
        active
          ? "bg-emerald-600 text-white"
          : theme === 'light'
            ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  );
};

interface KeyboardShortcutProps {
  shortcut: string;
  description: string;
  theme: 'light' | 'dark';
}

const KeyboardShortcut: React.FC<KeyboardShortcutProps> = ({
  shortcut,
  description,
  theme
}) => {
  return (
    <div className="flex items-center">
      <span 
        className={cn(
          "inline-flex items-center justify-center min-w-[36px] px-1.5 py-1 mr-2 rounded text-xs font-mono",
          theme === 'light' 
            ? "bg-slate-100 text-slate-600" 
            : "bg-slate-800 text-slate-300"
        )}
      >
        {shortcut}
      </span>
      <span>{description}</span>
    </div>
  );
}; 