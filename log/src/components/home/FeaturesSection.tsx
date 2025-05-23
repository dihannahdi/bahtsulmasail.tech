import { Card, CardContent } from "@/components/ui/card";
import { Search, BookOpen, FilePlus, BookText } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-islamic-blue" />,
      title: "Pencarian Semantik",
      description: "Cari tidak hanya berdasarkan kata kunci tetapi juga makna dan konteks, menemukan hukum yang menjawab pertanyaan Anda meskipun tidak mengandung istilah yang persis sama.",
      color: "bg-islamic-blue",
      textColor: "text-islamic-blue"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-islamic-green" />,
      title: "Koleksi Komprehensif",
      description: "Akses ribuan teks hukum Islam autentik dari berbagai mazhab, mencakup karya klasik hingga fatwa kontemporer.",
      color: "bg-islamic-green",
      textColor: "text-islamic-green"
    },
    {
      icon: <FilePlus className="h-8 w-8 text-islamic-purple" />,
      title: "Analisis Modern",
      description: "Manfaatkan alat bertenaga AI untuk menganalisis teks, membandingkan pendapat, dan memahami alasan di balik berbagai posisi fikih.",
      color: "bg-islamic-purple",
      textColor: "text-islamic-purple"
    },
    {
      icon: <BookText className="h-8 w-8 text-islamic-gold" />,
      title: "Topik Terorganisir",
      description: "Jelajahi kategori yang terstruktur dengan baik meliputi semua aspek hukum Islam, dari ibadah hingga muamalah hingga masalah pribadi.",
      color: "bg-islamic-gold",
      textColor: "text-islamic-gold"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-secondary/20 dark:from-card dark:to-card/90 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-islamic-blue/20 blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-60 h-60 rounded-full bg-islamic-green/20 blur-3xl"></div>
          <div className="absolute top-40 left-1/2 w-40 h-40 rounded-full bg-islamic-gold/20 blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-islamic-blue/10 text-islamic-blue text-sm font-medium mb-4 inline-block">Fitur Unggulan</span>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-foreground">Temukan Fitur Kami</h2>
          <p className="mt-4 max-w-xl mx-auto text-foreground/70">Platform yang dirancang untuk memenuhi kebutuhan umat dalam memahami hukum Islam dengan mudah dan mendalam</p>
          <div className="h-1 w-24 bg-islamic-blue mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                <CardContent className="p-6 relative h-full">
                  {/* Top corner decoration */}
                  <div className={`absolute top-0 right-0 w-24 h-24 ${feature.color} opacity-10 rounded-bl-full`}></div>
                  
                  <div className={`mb-6 h-16 w-16 flex items-center justify-center rounded-2xl ${feature.color} bg-opacity-10`}>
                    {feature.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${feature.textColor}`}>{feature.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a href="/about" className="inline-flex items-center text-islamic-blue hover:text-islamic-blue/80 font-medium">
            Pelajari lebih lanjut tentang platform kami
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
