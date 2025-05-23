import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { QuoteBox } from './QuoteBox';

interface QuizSectionProps {
  textSize: 'normal' | 'large';
  theme: 'light' | 'dark';
  quizAnswers: { q1: string; q2: string };
  setQuizAnswers: React.Dispatch<React.SetStateAction<{ q1: string; q2: string }>>;
  quizErrors: Record<string, string>;
  quizSubmitted: boolean;
  showFeedback: boolean;
  handleQuizSubmit: (e: React.FormEvent) => void;
}

export const QuizSection = forwardRef<HTMLDivElement, QuizSectionProps>(
  ({ 
    textSize, 
    theme, 
    quizAnswers, 
    setQuizAnswers, 
    quizErrors, 
    quizSubmitted, 
    showFeedback, 
    handleQuizSubmit 
  }, ref) => {
    return (
      <motion.section
        ref={ref}
        id="quiz"
        className="mb-24 scroll-mt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        {/* Glass Morphism Container */}
        <motion.div
          className={cn(
            "px-6 py-8 rounded-2xl relative overflow-hidden backdrop-blur-sm border",
            theme === 'light' 
              ? "bg-white/70 border-slate-200" 
              : "bg-slate-900/70 border-slate-700"
          )}
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <motion.h2
              className={cn(
                "font-serif text-center mb-6",
                textSize === 'normal' ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl",
                theme === 'light' ? "text-slate-900" : "text-white"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Refleksi & Pengetahuan
            </motion.h2>
            
            <motion.form
              onSubmit={handleQuizSubmit}
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Question 1 */}
              <div className="mb-8">
                <label 
                  htmlFor="quiz-q1"
                  className={cn(
                    "block mb-3 font-medium",
                    textSize === 'normal' ? "text-lg" : "text-xl",
                    theme === 'light' ? "text-slate-900" : "text-white"
                  )}
                >
                  1. Apa metode ijtihad kolektif yang dikembangkan NU?
                </label>
                <div className="relative">
                  <input
                    id="quiz-q1"
                    type="text"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg outline-none transition-all duration-300",
                      textSize === 'normal' ? "text-base" : "text-lg",
                      theme === 'light' 
                        ? "bg-white border focus:ring-2 focus:ring-emerald-500/50" 
                        : "bg-slate-800/50 border-slate-700 focus:ring-2 focus:ring-emerald-500/30",
                      quizErrors.q1 
                        ? "border-red-500 focus:border-red-500" 
                        : theme === 'light' ? "border-slate-200" : "border-slate-700"
                    )}
                    value={quizAnswers.q1}
                    onChange={(e) => setQuizAnswers({...quizAnswers, q1: e.target.value})}
                    disabled={quizSubmitted}
                    required
                    aria-describedby={quizErrors.q1 ? "error-q1" : undefined}
                  />
                  
                  <AnimatePresence>
                    {quizErrors.q1 && (
                      <motion.p 
                        id="error-q1" 
                        className="text-red-500 text-sm mt-2 flex items-center"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {quizErrors.q1}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Question 2 */}
              <div className="mb-8">
                <label 
                  htmlFor="quiz-q2"
                  className={cn(
                    "block mb-3 font-medium",
                    textSize === 'normal' ? "text-lg" : "text-xl",
                    theme === 'light' ? "text-slate-900" : "text-white"
                  )}
                >
                  2. Sebutkan satu contoh fatwa kontemporer Bahtsul Masail!
                </label>
                <div className="relative">
                  <input
                    id="quiz-q2"
                    type="text"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg outline-none transition-all duration-300",
                      textSize === 'normal' ? "text-base" : "text-lg",
                      theme === 'light' 
                        ? "bg-white border focus:ring-2 focus:ring-emerald-500/50" 
                        : "bg-slate-800/50 border-slate-700 focus:ring-2 focus:ring-emerald-500/30",
                      quizErrors.q2 
                        ? "border-red-500 focus:border-red-500" 
                        : theme === 'light' ? "border-slate-200" : "border-slate-700"
                    )}
                    value={quizAnswers.q2}
                    onChange={(e) => setQuizAnswers({...quizAnswers, q2: e.target.value})}
                    disabled={quizSubmitted}
                    required
                    aria-describedby={quizErrors.q2 ? "error-q2" : undefined}
                  />
                  
                  <AnimatePresence>
                    {quizErrors.q2 && (
                      <motion.p 
                        id="error-q2" 
                        className="text-red-500 text-sm mt-2 flex items-center"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {quizErrors.q2}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="text-center">
                <motion.button
                  type="submit"
                  className={cn(
                    "px-6 py-3 rounded-xl font-medium text-white relative overflow-hidden",
                    "bg-gradient-to-r from-emerald-500 to-teal-600",
                    "shadow-lg shadow-emerald-500/20 dark:shadow-emerald-900/30",
                    "disabled:opacity-70 disabled:cursor-not-allowed",
                    "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  )}
                  whileHover={{ 
                    scale: quizSubmitted ? 1 : 1.05,
                    boxShadow: quizSubmitted ? "none" : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -6px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: quizSubmitted ? 1 : 0.98 }}
                  disabled={quizSubmitted}
                >
                  {/* Button Content */}
                  <span className="relative z-10 flex items-center justify-center">
                    {quizSubmitted ? (
                      <>
                        <svg className="mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17z" />
                        </svg>
                        Terkirim
                      </>
                    ) : "Kirim Jawaban"}
                  </span>
                  
                  {/* Background Animation */}
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500"
                    initial={{ x: '-100%' }}
                    animate={{ x: quizSubmitted ? '0%' : '-100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              </div>
            </motion.form>
            
            {/* Quiz Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div 
                  id="quiz-feedback"
                  className={cn(
                    "mt-12 rounded-2xl overflow-hidden",
                    theme === 'light' ? "bg-emerald-50" : "bg-emerald-900/20"
                  )}
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 20, height: 0 }}
                  transition={{ duration: 0.5, type: "spring", damping: 20 }}
                  role="alert"
                  aria-live="polite"
                >
                  {/* Feedback Header */}
                  <div className="h-2 w-full bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                  
                  {/* Quote */}
                  <div className="p-6">
                    <QuoteBox 
                      quote="وَشَاوِرْهُمْ فِي الْأَمْرِ ۖ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ" 
                      source="Surah Ali Imran: 159" 
                      theme={theme}
                      textSize={textSize}
                    />
                    
                    <p className={cn(
                      "mt-4 text-center italic",
                      textSize === 'normal' ? "text-base" : "text-lg",
                      theme === 'light' ? "text-slate-600" : "text-slate-400"
                    )}>
                      "Dan bermusyawarahlah dengan mereka dalam urusan itu. Kemudian apabila kamu telah membulatkan tekad, maka bertawakallah kepada Allah."
                    </p>
                    
                    {/* Feedback Content */}
                    <motion.div 
                      className={cn(
                        "mt-8 p-6 rounded-xl text-center",
                        theme === 'light' ? "bg-white" : "bg-slate-800/50"
                      )}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <p className={cn(
                          "font-medium mb-4",
                          theme === 'light' ? "text-emerald-600" : "text-emerald-400"
                        )}>
                          Terima kasih atas partisipasi Anda!
                        </p>
                        
                        <div className="space-y-2 text-sm">
                          <p className={theme === 'light' ? "text-slate-700" : "text-slate-300"}>
                            Jawaban terbaik untuk pertanyaan 1: <span className="font-semibold">Ijtihad al-jama'i</span> (Ijitihad kolektif)
                          </p>
                          <p className={theme === 'light' ? "text-slate-700" : "text-slate-300"}>
                            Contoh fatwa kontemporer: <span className="font-semibold">Fatwa Fintech Syariah (2017), Fatwa Kripto (2021), Fatwa Vaksin COVID-19 (2020)</span>
                          </p>
                        </div>
                        
                        {/* Completion Badge */}
                        <motion.div 
                          className="mt-6 flex justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: [0, 10, 0] }}
                          transition={{ delay: 1, type: "spring", stiffness: 200 }}
                        >
                          <div className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center",
                            "bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-2xl",
                            "shadow-lg shadow-emerald-500/20 dark:shadow-emerald-900/30"
                          )}>
                            ✓
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.section>
    );
  }
);

QuizSection.displayName = 'QuizSection'; 