"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SemanticSearch from "@/components/processing/SemanticSearch";
import { fetchCategories, documentApi, Category, Document } from "@/lib/api";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { containerVariant, fadeUp, fadeScale, itemVariant, stagger, easeCurve } from "@/lib/animations";
import { LoadingSection } from "@/components/ui/loading-section";

interface CategoryProps {
  id?: string;
  title: string;
  name?: string;
  description?: string;
  count: number;
  color: string;
  slug: string;
}

const Browse = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Create refs for scroll animations
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  const tabsRef = useRef(null);
  const isTabsInView = useInView(tabsRef, { once: true, amount: 0.2 });
  
  const sidebarRef = useRef(null);
  const isSidebarInView = useInView(sidebarRef, { once: true, amount: 0.2 });
  
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, amount: 0.1 });
  
  // Fetch categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        // Ensure data is an array
        const categoriesArray = Array.isArray(data) ? data : (data as any)?.results || [];
        
        // Map API response to component props format
        const mappedCategories = categoriesArray.map(cat => ({
          id: cat.slug,
          name: cat.title,
          title: cat.title,
          description: cat.description,
          count: cat.count,
          color: cat.color,
          slug: cat.slug
        }));
        setCategories(mappedCategories);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Failed to load categories');
      }
    };
    
    loadCategories();
  }, []);
  
  // Fetch documents based on selected category
  useEffect(() => {
    const loadDocuments = async () => {
      setIsLoading(true);
      try {
        let params: { topic?: string } = {};
        
        // Add topic filter if a category is selected
        if (activeCategory) {
          const category = categories.find(c => c.id === activeCategory);
          if (category) {
            params.topic = category.title;
          }
        }
        
        const data = await documentApi.getDocuments(params);
        // Ensure data is an array
        const documentsArray = Array.isArray(data) ? data : data?.results || [];
        
        setDocuments(documentsArray);
        setError(null);
      } catch (err) {
        console.error('Error loading documents:', err);
        setError('Failed to load documents');
      } finally {
        setIsLoading(false);
      }
    };
    
    // Only load documents if categories are loaded
    if (categories.length > 0) {
      loadDocuments();
    }
  }, [activeCategory, categories]);
  
  // Ensure we're working with arrays
  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeDocuments = Array.isArray(documents) ? documents : [];
  
  const filteredDocuments = activeCategory 
    ? safeDocuments.filter(doc => {
        const category = safeCategories.find(c => c.id === activeCategory);
        return category && doc.topics && doc.topics.includes(category.title);
      })
    : safeDocuments;

  // Create a motion-compatible version of Card for documents
  const MotionDocumentCard = motion.create(Card);

  return (
    <MainLayout>
      <section className="bg-secondary/30 pattern-bg py-16">
        <motion.div 
          ref={headerRef}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="container mx-auto px-4"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center">
            Browse Islamic Legal Documents
          </h1>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto text-center mb-12">
            Explore our collection of Islamic legal texts, rulings, and scholarly opinions across various categories and schools of thought.
          </p>

          <motion.div 
            ref={tabsRef}
            initial="hidden"
            animate={isTabsInView ? "visible" : "hidden"}
            variants={fadeScale}
          >
            <Tabs defaultValue="categories">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="categories">Category Browse</TabsTrigger>
                <TabsTrigger value="semantic">Semantic Search</TabsTrigger>
              </TabsList>
              
              <TabsContent value="categories">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Sidebar filters */}
                  <motion.div 
                    className="lg:col-span-1"
                    ref={sidebarRef}
                    initial="hidden"
                    animate={isSidebarInView ? "visible" : "hidden"}
                    variants={fadeUp}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Categories</h3>
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            <Filter className="h-4 w-4 mr-1" />
                            Filter
                          </Button>
                        </div>

                        <div className="space-y-1">
                          <Button
                            variant={activeCategory === null ? "default" : "ghost"}
                            className={`w-full justify-start text-left h-9 ${
                              activeCategory === null ? "bg-islamic-green hover:bg-islamic-green/90 text-white" : ""
                            }`}
                            onClick={() => setActiveCategory(null)}
                          >
                            All Categories
                          </Button>
                          
                          {safeCategories.map((category) => (
                            <Button
                              key={category.id}
                              variant={activeCategory === category.id ? "default" : "ghost"}
                              className="w-full justify-start text-left h-9"
                              onClick={() => setActiveCategory(category.id || null)}
                            >
                              <div className={`h-2 w-2 rounded-full ${category.color} mr-2`}></div>
                              {category.name || category.title}
                              <span className="ml-auto text-xs text-foreground/60">{category.count}</span>
                            </Button>
                          ))}
                        </div>

                        <div className="mt-8">
                          <h3 className="font-medium mb-4">Time Period</h3>
                          <div className="space-y-1">
                            <Button variant="ghost" className="w-full justify-start text-left h-9">
                              Classical Texts
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-left h-9">
                              Contemporary Rulings
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-left h-9">
                              Recent Discussions
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Main content */}
                  <motion.div 
                    className="lg:col-span-3"
                    ref={contentRef}
                    initial="hidden"
                    animate={isContentInView ? "visible" : "hidden"}
                    variants={fadeUp}
                  >
                    {isLoading ? (
                      <LoadingSection />
                    ) : error ? (
                      <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>
                    ) : filteredDocuments.length === 0 ? (
                      <div className="text-center py-12 text-foreground/70">No documents found</div>
                    ) : (
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={stagger}
                      >
                        <AnimatePresence mode="wait">
                          {filteredDocuments.map((doc) => (
                            <motion.div
                              key={doc.id}
                              variants={itemVariant}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              layout
                              transition={easeCurve}
                            >
                              <MotionDocumentCard className="h-full">
                                <CardContent className="p-6">
                                  <h3 className="text-xl font-medium mb-2">
                                    <Link href={`/documents/${doc.id}`} className="hover:text-islamic-green">
                                      {doc.title}
                                    </Link>
                                  </h3>
                                  <p className="text-sm text-foreground/70 mb-4">
                                    {doc.extracted_text?.substring(0, 150)}...
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                      <span className="text-xs text-foreground/50">
                                        {doc.uploaded_at && new Date(doc.uploaded_at).toLocaleDateString()}
                                      </span>
                                      {doc.topics && (
                                        <span className="text-xs px-2 py-1 bg-islamic-green/10 text-islamic-green rounded-full">
                                          {doc.topics.split(',')[0]}
                                        </span>
                                      )}
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-islamic-green hover:text-islamic-green/90" asChild>
                                      <Link href={`/documents/${doc.id}`}>Read More</Link>
                                    </Button>
                                  </div>
                                </CardContent>
                              </MotionDocumentCard>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </TabsContent>
              
              <TabsContent value="semantic">
                <SemanticSearch />
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </section>
    </MainLayout>
  );
};

export default Browse;
