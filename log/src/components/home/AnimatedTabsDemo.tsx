import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedTabs, AnimatedTabsList, AnimatedTabsTrigger, AnimatedTabsContent } from "@/components/ui/animated-tabs";

const AnimatedTabsDemo = () => {
  return (
    <div className="p-8 bg-background rounded-lg shadow-lg max-w-3xl mx-auto my-12">
      <h3 className="text-2xl font-semibold mb-6 text-center">Navigasi Tab dengan Animasi</h3>
      
      <AnimatedTabs defaultValue="tab1">
        <AnimatedTabsList className="grid w-full grid-cols-3 shadow-md">
          <AnimatedTabsTrigger value="tab1" index={0} total={3}>Tab Pertama</AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="tab2" index={1} total={3}>Tab Kedua</AnimatedTabsTrigger>
          <AnimatedTabsTrigger value="tab3" index={2} total={3}>Tab Ketiga</AnimatedTabsTrigger>
        </AnimatedTabsList>
        
        <AnimatedTabsContent value="tab1" className="mt-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="p-6 bg-islamic-light rounded-lg"
          >
            <h4 className="text-xl font-medium text-islamic-blue mb-3">Konten Tab Pertama</h4>
            <p>Animasi tab menggunakan Framer Motion untuk transisi yang halus dan responsif.</p>
          </motion.div>
        </AnimatedTabsContent>
        
        <AnimatedTabsContent value="tab2" className="mt-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="p-6 bg-islamic-light rounded-lg"
          >
            <h4 className="text-xl font-medium text-islamic-green mb-3">Konten Tab Kedua</h4>
            <p>Tab ini menunjukkan efek animasi gradient yang bergerak saat berpindah tab.</p>
          </motion.div>
        </AnimatedTabsContent>
        
        <AnimatedTabsContent value="tab3" className="mt-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="p-6 bg-islamic-light rounded-lg"
          >
            <h4 className="text-xl font-medium text-islamic-gold mb-3">Konten Tab Ketiga</h4>
            <p>Animasi membuat pengalaman pengguna lebih menarik dan interaktif.</p>
          </motion.div>
        </AnimatedTabsContent>
      </AnimatedTabs>
      
      <div className="mt-8 p-4 bg-cream-50 border border-cream-200 rounded-md">
        <p className="text-sm text-center text-foreground/70">
          Klik pada tab untuk melihat efek animasi perpindahan.
        </p>
      </div>
    </div>
  );
};

export default AnimatedTabsDemo; 