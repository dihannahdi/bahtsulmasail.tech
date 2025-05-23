import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModalProps {
  title: string;
  content: string;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export const Modal: React.FC<ModalProps> = ({ title, content, onClose, theme }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close on escape key and outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // A11y: Announce modal for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = `Dialog opened: ${title}`;
    document.body.appendChild(announcement);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = '';
      
      // Clean up announcement
      document.body.removeChild(announcement);
    };
  }, [onClose, title]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        ref={modalRef}
        className={cn(
          "relative w-full max-w-2xl rounded-2xl overflow-hidden",
          theme === 'light' ? "bg-white" : "bg-slate-900"
        )}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ 
          type: "spring", 
          damping: 20, 
          stiffness: 300 
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Rainbow gradient accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-500"></div>
        
        {/* Header */}
        <div className={cn(
          "px-6 py-4 border-b",
          theme === 'light' ? "border-slate-200" : "border-slate-700"
        )}>
          <h3 
            id="modal-title"
            className={cn(
              "text-2xl font-serif",
              theme === 'light' ? "text-slate-900" : "text-white"
            )}
          >
            {title}
          </h3>
        </div>
        
        {/* Content */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          <p className={cn(
            "text-base leading-relaxed",
            theme === 'light' ? "text-slate-600" : "text-slate-300"
          )}>
            {content}
          </p>
          
          {/* Visual flourish */}
          <div className="my-4 border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50/50 dark:bg-emerald-900/20 rounded">
            <p className={cn(
              "text-sm italic",
              theme === 'light' ? "text-slate-600" : "text-slate-400"
            )}>
              <span className="font-arabic">بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ</span>
              <br />
              <span className="text-xs mt-1 block">Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang</span>
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className={cn(
          "px-6 py-4 flex justify-end border-t",
          theme === 'light' ? "border-slate-200" : "border-slate-700"
        )}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "px-4 py-2 rounded-lg font-medium",
              "bg-emerald-600 hover:bg-emerald-700 text-white",
              "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            )}
            onClick={onClose}
          >
            Kembali
          </motion.button>
        </div>
        
        {/* Close button */}
        <motion.button
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full",
            "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-emerald-500"
          )}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}; 