import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { DocumentList } from '../components/documents/DocumentList';
import { documentApi } from '../lib/api';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';

export function DocumentBrowsePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [docType, setDocType] = useState(queryParams.get('type') || 'all'); // 'all', 'standard', or 'bahtsul_masail'
  const [searchQuery, setSearchQuery] = useState(queryParams.get('topic') || '');
  const [error, setError] = useState<string | null>(null);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (docType !== 'all') {
      params.set('type', docType);
    }
    
    if (searchQuery) {
      params.set('topic', searchQuery);
    }
    
    // Update URL without reloading the page
    const newSearch = params.toString();
    const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    navigate(newUrl, { replace: true });
    
  }, [docType, searchQuery, location.pathname, navigate]);
  
  useEffect(() => {
    const loadDocuments = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Prepare parameters for the API call
        const params: { type?: string; topic?: string } = {};
        
        if (docType === 'bahtsul_masail') {
          params.type = 'bahtsul_masail';
        }
        
        if (searchQuery) {
          params.topic = searchQuery;
        }
        
        // Fetch documents based on the selected type
        const data = await documentApi.getDocuments(params);
        
        // Ensure we have an array
        const documentsArray = Array.isArray(data) ? data : data?.results || [];
        
        // If we're viewing "all" but need to filter out standard documents
        // (when the API doesn't support filtering)
        const filteredDocs = docType === 'standard' 
          ? documentsArray.filter((doc: any) => !doc.is_bahtsul_masail)
          : documentsArray;
          
        setDocuments(filteredDocs);
      } catch (error) {
        console.error('Error loading documents:', error);
        setError('Gagal memuat dokumen. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };
    
    loadDocuments();
  }, [docType, searchQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is triggered by the searchQuery state change in the useEffect
  };
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setDocType(value);
  };
  
  // Ensure we're working with an array
  const safeDocuments = Array.isArray(documents) ? documents : [];
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Jelajahi Dokumen</h1>
          
          <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
            <Input
              placeholder="Cari berdasarkan topik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64"
            />
            <Button type="submit" className="dark:bg-white dark:text-islamic-dark dark:hover:bg-white/90">Cari</Button>
          </form>
        </div>
        
        <Tabs defaultValue="all" value={docType} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Semua Dokumen</TabsTrigger>
            <TabsTrigger value="standard">Standar</TabsTrigger>
            <TabsTrigger value="bahtsul_masail">Bahtsul Masail</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <p className="text-muted-foreground mb-4">
              Menampilkan semua dokumen
            </p>
          </TabsContent>
          
          <TabsContent value="standard" className="mt-4">
            <p className="text-muted-foreground mb-4">
              Menampilkan hanya dokumen standar dengan format Tanya & Jawab
            </p>
          </TabsContent>
          
          <TabsContent value="bahtsul_masail" className="mt-4">
            <p className="text-muted-foreground mb-4">
              Menampilkan hanya dokumen Bahtsul Masail dengan struktur komprehensif
            </p>
          </TabsContent>
        </Tabs>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>
        ) : safeDocuments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">Tidak ditemukan dokumen yang sesuai dengan kriteria Anda</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setDocType('all');
              }}
            >
              Hapus Filter
            </Button>
          </div>
        ) : (
          <DocumentList documents={safeDocuments} />
        )}
      </div>
    </MainLayout>
  );
} 