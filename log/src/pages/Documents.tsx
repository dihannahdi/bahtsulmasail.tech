import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { documentApi, Document } from "@/lib/api";
import { motion, useInView } from "framer-motion";
import { containerVariant, fadeUp, fadeScale, stagger, itemVariant } from "@/lib/animations";

const Documents = () => {
  const router = useRouter();
  const [featuredDocuments, setFeaturedDocuments] = useState<Document[]>([]);
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create refs for scroll animations
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  const searchRef = useRef(null);
  const isSearchInView = useInView(searchRef, { once: true, amount: 0.3 });
  
  const categoriesRef = useRef(null);
  const isCategoriesInView = useInView(categoriesRef, { once: true, amount: 0.2 });
  
  const featuredRef = useRef(null);
  const isFeaturedInView = useInView(featuredRef, { once: true, amount: 0.2 });
  
  const recentRef = useRef(null);
  const isRecentInView = useInView(recentRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true);
      try {
        // Load featured and latest documents in parallel
        const [featured, latest] = await Promise.all([
          documentApi.getFeatured(),
          documentApi.getLatest()
        ]);
        
        // Ensure we're storing arrays
        setFeaturedDocuments(Array.isArray(featured) ? featured : featured?.results || []);
        setRecentDocuments(Array.isArray(latest) ? latest : latest?.results || []);
        setError(null);
      } catch (err) {
        console.error('Error loading documents:', err);
        setError('Failed to load documents');
      } finally {
        setLoading(false);
      }
    };
    
    loadDocuments();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Get the search input value
    const form = e.target as HTMLFormElement;
    const searchInput = form.querySelector('input') as HTMLInputElement;
    const query = searchInput.value.trim();
    
    if (query) {
      router.push(`/semantic-search?q=${encodeURIComponent(query)}`);
    }
  };
  
  // Helper function to get document excerpt
  const getExcerpt = (doc: Document): string => {
    if (doc.question) return doc.question;
    if (doc.nash_masalah) return doc.nash_masalah;
    if (doc.extracted_text) return doc.extracted_text.substring(0, 150) + '...';
    return 'No description available';
  };

  // Ensure we're always working with arrays
  const safeFeatureDocuments = Array.isArray(featuredDocuments) ? featuredDocuments : [];
  const safeRecentDocuments = Array.isArray(recentDocuments) ? recentDocuments : [];

  return (
    <MainLayout>
      <section className="bg-secondary/30 pattern-bg py-16 md:py-24">
        <motion.div 
          className="container mx-auto px-4"
          initial="hidden"
          animate="visible"
          variants={containerVariant}
        >
          <motion.div
            ref={headerRef}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
            variants={fadeUp}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center">
              Koleksi Dokumen Hukum Islam
            </h1>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto text-center mb-12">
              Jelajahi koleksi komprehensif dokumen hukum Islam kami, termasuk keputusan fikih, fatwa, dan diskusi Bahtsul Masail dari berbagai ulama dan periode.
            </p>
          </motion.div>

          <motion.div 
            className="max-w-2xl mx-auto mb-16"
            ref={searchRef}
            initial="hidden"
            animate={isSearchInView ? "visible" : "hidden"}
            variants={fadeScale}
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Cari topik, pertanyaan, atau kata kunci..."
                className="w-full p-4 pl-12 rounded-full bg-white dark:bg-background border border-border"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50" />
              <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-islamic-green hover:bg-islamic-green/90 dark:bg-white dark:text-islamic-dark dark:hover:bg-white/90">
                Cari
              </Button>
            </form>
          </motion.div>

          <motion.div 
            className="mb-16"
            ref={categoriesRef}
            initial="hidden"
            animate={isCategoriesInView ? "visible" : "hidden"}
            variants={fadeUp}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-center">
              Kategori Dokumen
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 text-red-700 rounded-md text-center">{error}</div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                variants={stagger}
              >
                <motion.div variants={itemVariant}>
                  <Card className="overflow-hidden relative">
                    <div className="absolute top-0 right-0 m-4 bg-islamic-blue text-white text-xs font-medium px-2 py-1 rounded-full">Baru</div>
                    <div className="p-6">
                      <h3 className="text-xl font-medium mb-4">Dokumen Terbaru</h3>
                      <p className="text-sm text-foreground/70 mb-6">
                        Penambahan terbaru ke koleksi kami, termasuk fatwa yang baru diterbitkan dan teks klasik yang baru diterjemahkan.
                      </p>
                      <Button className="w-full bg-islamic-green hover:bg-islamic-green/90" asChild>
                        <Link href="/documents/browse">Lihat Dokumen</Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
                
                <motion.div variants={itemVariant}>
                  <Card className="overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-medium mb-4">Kompilasi Klasik</h3>
                      <p className="text-sm text-foreground/70 mb-6">
                        Karya fikih historis dari pendiri dan ulama awal mazhab-mazhab utama hukum Islam.
                      </p>
                      <Button className="w-full bg-islamic-green hover:bg-islamic-green/90" asChild>
                        <Link href="/documents/browse">Lihat Dokumen</Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
                
                <motion.div variants={itemVariant}>
                  <Card className="overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-medium mb-4">Bahtsul Masail</h3>
                      <p className="text-sm text-foreground/70 mb-6">
                        Pertanyaan, jawaban, dan diskusi dari forum Bahtsul Masail terkenal dari ulama Nahdlatul Ulama.
                      </p>
                      <Button className="w-full bg-islamic-green hover:bg-islamic-green/90" asChild>
                        <Link href="/documents/browse?type=bahtsul_masail">Lihat Dokumen</Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div 
              className="lg:col-span-2"
              ref={featuredRef}
              initial="hidden"
              animate={isFeaturedInView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8">
                Dokumen Unggulan
              </h2>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>
              ) : safeFeatureDocuments.length === 0 ? (
                <div className="text-center py-12 text-foreground/70">No featured documents available</div>
              ) : (
                <div className="space-y-6">
                  {safeFeatureDocuments.map((doc, index) => (
                    <Card key={doc.id || index} className="overflow-hidden">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-medium mb-2">
                          <Link href={`/documents/${doc.id}`} className="hover:text-islamic-green">
                            {doc.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-foreground/70 mb-4">
                          {getExcerpt(doc)}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-xs text-foreground/50">
                              {new Date(doc.created_at).toLocaleDateString()}
                            </span>
                            {doc.category && (
                              <span className="text-xs px-2 py-1 bg-islamic-green/10 text-islamic-green rounded-full">
                                {doc.category}
                              </span>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" className="text-islamic-green hover:text-islamic-green/90" asChild>
                            <Link href={`/documents/${doc.id}`}>Baca Selengkapnya</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div 
              className="lg:col-span-1"
              ref={recentRef}
              initial="hidden"
              animate={isRecentInView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8">
                Terbaru
              </h2>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>
              ) : safeRecentDocuments.length === 0 ? (
                <div className="text-center py-12 text-foreground/70">No recent documents available</div>
              ) : (
                <div className="space-y-4">
                  {safeRecentDocuments.map((doc, index) => (
                    <Card key={doc.id || index} className="overflow-hidden">
                      <CardContent className="p-4">
                        <h3 className="text-base font-medium mb-2">
                          <Link href={`/documents/${doc.id}`} className="hover:text-islamic-green">
                            {doc.title}
                          </Link>
                        </h3>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground/50">
                            {new Date(doc.created_at).toLocaleDateString()}
                          </span>
                          {doc.category && (
                            <span className="px-2 py-1 bg-islamic-green/10 text-islamic-green rounded-full">
                              {doc.category}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </MainLayout>
  );
};

export default Documents;
