'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Search, 
  Upload, 
  Filter, 
  Grid3X3, 
  List, 
  Eye, 
  Download, 
  Shield, 
  Sparkles, 
  BookOpen, 
  Users, 
  BarChart3, 
  Calendar, 
  Star, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ChevronDown,
  X,
  Plus,
  TrendingUp,
  Zap,
  FileText,
  Globe2,
  Verified
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Modal from '@/components/common/Modal';
import { 
  useDocuments, 
  useUploadDocument, 
  useOcrStatus,
  Document,
  useAnimatedCounter
} from './hooks';
import { DocumentUploadData } from '../services/documents';

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 36, 48];

// Document Card Component for Grid View
const DocumentCard = ({ document, onViewOcr }: { document: Document; onViewOcr: (doc: Document) => void }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-emerald-200/50 hover:border-emerald-400 overflow-hidden">
      <CardContent className="p-0">
        {/* Document Preview Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-emerald-500/5 to-blue-500/5"></div>
          <FileText className="w-16 h-16 text-emerald-600/60" />
          <div className="absolute top-4 right-4">
            {document.ocr_status === 'processing' && (
              <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            )}
            {document.ocr_status === 'completed' && (
              <CheckCircle className="w-6 h-6 text-green-500" />
            )}
            {document.ocr_status === 'failed' && (
              <AlertCircle className="w-6 h-6 text-red-500" />
            )}
          </div>
          
          {/* Verification Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        </div>

        <div className="p-6">
          {/* Title and Type */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">
              {document.title}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                <BookOpen className="w-3 h-3 mr-1" />
                Manuscript
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Globe2 className="w-3 h-3 mr-1" />
                Arabic
              </Badge>
            </div>
          </div>

          {/* OCR Status */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground/60">OCR Status</span>
              <Badge className={`text-xs ${getStatusColor(document.ocr_status)}`}>
                {document.ocr_status === 'processing' ? 'Processing...' : 
                 document.ocr_status === 'pending' ? 'Pending' :
                 document.ocr_status === 'completed' ? 'Completed' :
                 document.ocr_status === 'failed' ? 'Failed' :
                 document.ocr_status}
              </Badge>
            </div>
            {document.ocr_status === 'processing' && (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full animate-pulse" style={{width: '65%'}}></div>
              </div>
            )}
          </div>

          {/* Scholar and Date */}
          <div className="text-sm text-foreground/60 mb-4">
            <div className="flex items-center gap-1 mb-1">
              <Users className="w-4 h-4" />
              <span>{document.created_by || 'Unknown Scholar'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(document.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewOcr(document)}
              className="flex-1 hover:bg-emerald-50 hover:border-emerald-300"
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="hover:bg-emerald-50 hover:border-emerald-300"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Document List Item Component for List View
const DocumentListItem = ({ document, onViewOcr }: { document: Document; onViewOcr: (doc: Document) => void }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:border-emerald-300 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          {/* Thumbnail */}
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-8 h-8 text-emerald-600/60" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold truncate mb-1 hover:text-emerald-600 transition-colors">
                  {document.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-foreground/60 mb-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {document.created_by || 'Unknown Scholar'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(document.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Manuscript
                  </Badge>
                  <Badge className={`text-xs ${getStatusColor(document.ocr_status)}`}>
                    {document.ocr_status === 'processing' ? 'Processing...' : 
                     document.ocr_status === 'pending' ? 'Pending' :
                     document.ocr_status === 'completed' ? 'Completed' :
                     document.ocr_status === 'failed' ? 'Failed' :
                     document.ocr_status}
                  </Badge>
                  <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewOcr(document)}
                  className="hover:bg-emerald-50 hover:border-emerald-300"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:bg-emerald-50 hover:border-emerald-300"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function DocumentManagementPage() {
  const { data: session } = useSession();

  // State management for the enhanced interface
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState<'semantic' | 'keyword'>('semantic');
  
  // Enhanced filters
  const [filters, setFilters] = useState({
    documentType: '',
    scholar: '',
    dateRange: '',
    ocrStatus: '',
    verificationStatus: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Upload states
  const [documentTitle, setDocumentTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // View states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [documentToView, setDocumentToView] = useState<Document | null>(null);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  
  // Client-side only state to prevent hydration issues
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([]);

  // Animated counters for hero metrics (only on client)
  const authenticatedTexts = useAnimatedCounter(1247, 2000);
  const verifiedScholars = useAnimatedCounter(67, 2000);
  const aiAnalyses = useAnimatedCounter(3892, 2000);

  // Effects for client-side only rendering
  useEffect(() => {
    setIsClient(true);
    const generatedParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 2}s`
    }));
    setParticles(generatedParticles);
  }, []);

  // Enhanced document fetching with filters
  const { 
    data: documentsResponse, 
    isLoading, 
    isError,
    error 
  } = useDocuments({
    page: currentPage,
    page_size: itemsPerPage,
    ordering: '-created_at',
    search: searchQuery,
    ocr_status: filters.ocrStatus,
    ...filters
  });

  // Upload mutation
  const uploadMutation = useUploadDocument({
    onMutate: () => {
      setUploadError(null);
      setUploadProgress(0);
    },
    onSuccess: () => {
      setIsUploadModalOpen(false);
      setSelectedFile(null);
      setDocumentTitle('');
      setUploadProgress(0);
      setIsConfirmationModalOpen(true);
    },
    onError: (error: any) => {
      setUploadError(error?.message || 'Upload failed');
      setUploadProgress(0);
    },
  });

  // OCR status for viewed document
  const { data: ocrResult, isLoading: ocrLoading } = useOcrStatus(
    documentToView?.id || '',
    { enabled: !!documentToView && isViewModalOpen }
  );

  // Enhanced upload handlers
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !documentTitle) {
      setUploadError('Title and file are required.');
      return;
    }
    
    const uploadData: DocumentUploadData = {
      file: selectedFile,
      title: documentTitle,
      is_public: false
    };
    
    uploadMutation.mutate({
      data: uploadData,
      onProgress: (progress) => setUploadProgress(progress)
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  // Enhanced interaction handlers
  const handleViewOcr = (doc: Document) => {
    setDocumentToView(doc);
    setIsViewModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1000);
  };

  const clearFilters = () => {
    setFilters({
      documentType: '',
      scholar: '',
      dateRange: '',
      ocrStatus: '',
      verificationStatus: ''
    });
    setSearchQuery('');
  };

  // Get documents from response
  const documents = documentsResponse?.results || [];
  const totalCount = documentsResponse?.count || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-emerald-50/20 to-background dark:from-background dark:via-emerald-950/20 dark:to-background">
      {/* Hero Section with Islamic Elegance */}
      <section className="relative overflow-hidden py-16 md:py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Geometric Islamic Patterns */}
          <div className="absolute top-10 left-10 w-48 h-48 opacity-5 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <pattern id="islamic-pattern-docs" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="currentColor" className="text-emerald-500" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#islamic-pattern-docs)" />
            </svg>
          </div>
          
          {/* Glowing Orbs */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-gradient-radial from-blue-500/8 to-transparent rounded-full blur-3xl animate-pulse animation-delay-1000" />
          
          {/* Floating Particles */}
          {isClient && (
            <div className="absolute inset-0">
              {particles.map((particle, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-emerald-400/20 rounded-full animate-float"
                  style={{
                    left: particle.left,
                    top: particle.top,
                    animationDelay: particle.delay,
                    animationDuration: particle.duration
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Header with Badge */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 mb-6 animate-fade-in">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Islamic Legal Document Repository</span>
              <Verified className="w-5 h-5 text-emerald-600" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent">
                Authenticated Texts
              </span>
              <div className="block text-2xl md:text-3xl lg:text-4xl font-medium text-foreground/80 mt-2">
                Where Sacred Knowledge Meets AI
              </div>
            </h1>

            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
              Explore the world's most comprehensive Islamic legal document repository, 
              enhanced with AI-powered semantic search and blockchain verification.
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12 animate-fade-in-up animation-delay-400">
              <div className="text-center">
                <div ref={isClient ? authenticatedTexts.ref : undefined} className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">
                  {isClient ? authenticatedTexts.count : 1247}+
                </div>
                <div className="text-sm text-foreground/60">Authenticated Texts</div>
              </div>
              <div className="text-center">
                <div ref={isClient ? verifiedScholars.ref : undefined} className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">
                  {isClient ? verifiedScholars.count : 67}+
                </div>
                <div className="text-sm text-foreground/60">Verified Scholars</div>
              </div>
              <div className="text-center">
                <div ref={isClient ? aiAnalyses.ref : undefined} className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">
                  {isClient ? aiAnalyses.count : 3892}+
                </div>
                <div className="text-sm text-foreground/60">AI Analyses</div>
              </div>
            </div>
          </div>

          {/* Enhanced Search Interface */}
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-white/20 dark:border-gray-700/20 shadow-2xl">
              <CardContent className="p-6">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-emerald-200 dark:border-emerald-700 p-4 focus-within:border-emerald-500 transition-colors">
                    <Search className={`w-6 h-6 mr-4 transition-colors ${isSearching ? 'text-emerald-600 animate-pulse' : 'text-emerald-600'}`} />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search across Islamic texts using natural language..."
                      className="flex-1 border-0 bg-transparent text-lg placeholder:text-gray-500 focus-visible:ring-0"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                    />
                    <div className="flex items-center gap-2 ml-4">
                      <Badge variant={searchType === 'semantic' ? 'default' : 'outline'} 
                             className="cursor-pointer"
                             onClick={() => setSearchType(searchType === 'semantic' ? 'keyword' : 'semantic')}>
                        {searchType === 'semantic' ? <Zap className="w-3 h-3 mr-1" /> : <Search className="w-3 h-3 mr-1" />}
                        {searchType}
                      </Badge>
                      <Button 
                        onClick={() => handleSearch(searchQuery)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6"
                        disabled={isSearching}
                      >
                        {isSearching ? 'Searching...' : 'Search'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Search Examples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-300 cursor-pointer transition-colors"
                       onClick={() => handleSearch("حكم البيع بالتقسيط")}>
                    <div className="text-right mb-1">
                      <span className="font-arabic text-base text-foreground">حكم البيع بالتقسيط</span>
                    </div>
                    <div className="text-left text-sm text-foreground/70">Ruling on installment sales</div>
                    <div className="text-xs text-emerald-600 mt-1">Financial Jurisprudence</div>
                  </div>
                  <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-300 cursor-pointer transition-colors"
                       onClick={() => handleSearch("أحكام الصلاة في السفر")}>
                    <div className="text-right mb-1">
                      <span className="font-arabic text-base text-foreground">أحكام الصلاة في السفر</span>
                    </div>
                    <div className="text-left text-sm text-foreground/70">Prayer rulings while traveling</div>
                    <div className="text-xs text-emerald-600 mt-1">Worship</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {(searchQuery || Object.values(filters).some(f => f)) && (
                <Button variant="ghost" onClick={clearFilters} className="text-red-600">
                  <X className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>

            <Button 
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all group"
            >
              <Upload className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Upload Document
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Filters Panel */}
      {showFilters && (
        <section className="container mx-auto px-4 mb-8">
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-white/20 dark:border-gray-700/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Document Type</label>
                  <select 
                    value={filters.documentType}
                    onChange={(e) => setFilters({...filters, documentType: e.target.value})}
                    className="w-full p-2 border rounded-lg bg-background"
                  >
                    <option value="">All Types</option>
                    <option value="fatwa">Fatwa</option>
                    <option value="kitab">Kitab</option>
                    <option value="research">Research</option>
                    <option value="manuscript">Manuscript</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Scholar</label>
                  <select 
                    value={filters.scholar}
                    onChange={(e) => setFilters({...filters, scholar: e.target.value})}
                    className="w-full p-2 border rounded-lg bg-background"
                  >
                    <option value="">All Scholars</option>
                    <option value="ibn-taymiyyah">Ibn Taymiyyah</option>
                    <option value="ibn-qayyim">Ibn Qayyim</option>
                    <option value="imam-shafi">Imam Ash-Shafi'i</option>
                    <option value="imam-hanbal">Imam Ahmad</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date Range</label>
                  <select 
                    value={filters.dateRange}
                    onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                    className="w-full p-2 border rounded-lg bg-background"
                  >
                    <option value="">All Periods</option>
                    <option value="classical">Classical (7th-13th c)</option>
                    <option value="medieval">Medieval (13th-18th c)</option>
                    <option value="modern">Modern (19th-21st c)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">OCR Status</label>
                  <select 
                    value={filters.ocrStatus}
                    onChange={(e) => setFilters({...filters, ocrStatus: e.target.value})}
                    className="w-full p-2 border rounded-lg bg-background"
                  >
                    <option value="">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="processing">Processing</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Verification</label>
                  <select 
                    value={filters.verificationStatus}
                    onChange={(e) => setFilters({...filters, verificationStatus: e.target.value})}
                    className="w-full p-2 border rounded-lg bg-background"
                  >
                    <option value="">All Status</option>
                    <option value="verified">Blockchain Verified</option>
                    <option value="scholar-approved">Scholar Approved</option>
                    <option value="pending">Awaiting Review</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Document Display Section */}
      <section className="container mx-auto px-4 pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Error Loading Documents</h3>
            <p className="text-foreground/60 mb-4">Failed to load the document repository. Please try again.</p>
            <Button onClick={() => window.location.reload()} className="bg-emerald-600 hover:bg-emerald-700">
              Retry
            </Button>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Documents Found</h3>
            <p className="text-foreground/60 mb-4">
              {searchQuery || Object.values(filters).some(f => f) 
                ? "No documents match your search criteria. Try adjusting your filters." 
                : "Start building your Islamic legal library by uploading your first document."}
            </p>
            <div className="flex justify-center gap-4">
              {(searchQuery || Object.values(filters).some(f => f)) && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
              <Button onClick={() => setIsUploadModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Document Repository</h2>
                <p className="text-foreground/60">
                  Showing {documents.length} of {totalCount} documents
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground/60">Show:</span>
                <select 
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="p-1 border rounded bg-background text-sm"
                >
                  {ITEMS_PER_PAGE_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Document Grid/List View */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {documents.map((doc: Document) => (
                  <DocumentCard key={doc.id} document={doc} onViewOcr={handleViewOcr} />
                ))}
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {documents.map((doc: Document) => (
                  <DocumentListItem key={doc.id} document={doc} onViewOcr={handleViewOcr} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    if (pageNum <= totalPages) {
                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-10 h-10"
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                    return null;
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Enhanced Upload Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Upload Islamic Document</h2>
            <p className="text-foreground/60">Add to the world's most comprehensive Islamic legal repository</p>
          </div>

          <form onSubmit={handleUpload} className="space-y-6">
            {/* Enhanced Drag & Drop Zone */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                isDragOver 
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity"></div>
              
              {selectedFile ? (
                <div className="relative z-10">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{selectedFile.name}</h3>
                  <p className="text-sm text-foreground/60 mb-4">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {selectedFile.type}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedFile(null)}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Drop your document here</h3>
                  <p className="text-foreground/60 mb-4">or click to browse your files</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  <p className="text-xs text-foreground/50 mt-4">
                    Supported formats: PDF, DOC, DOCX, TXT • Max size: 50MB
                  </p>
                </div>
              )}
            </div>

            {/* Document Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Document Title *</label>
              <Input
                type="text"
                value={documentTitle}
                onChange={e => setDocumentTitle(e.target.value)}
                placeholder="Enter the document title in Arabic or English"
                className="w-full"
                required
              />
            </div>

            {/* AI-Powered Metadata Preview */}
            {selectedFile && (
              <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">AI Analysis Preview</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-foreground/60">Detected Language:</span>
                      <span className="ml-2 font-medium">Arabic (RTL)</span>
                    </div>
                    <div>
                      <span className="text-foreground/60">Document Type:</span>
                      <span className="ml-2 font-medium">Manuscript</span>
                    </div>
                    <div>
                      <span className="text-foreground/60">Estimated Pages:</span>
                      <span className="ml-2 font-medium">~24 pages</span>
                    </div>
                    <div>
                      <span className="text-foreground/60">OCR Feasibility:</span>
                      <span className="ml-2 font-medium text-green-600">Excellent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upload Progress */}
            {uploadMutation.isPending && (
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Uploading Document</h4>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-3 mb-2">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-300 ease-out"
                      style={{width: `${uploadProgress}%`}}
                    ></div>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{uploadProgress}% complete</p>
                </CardContent>
              </Card>
            )}

            {uploadError && (
              <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Upload Error</h4>
                  </div>
                  <p className="text-sm text-red-600 dark:text-red-400">{uploadError}</p>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUploadModalOpen(false)}
                disabled={uploadMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={uploadMutation.isPending || !selectedFile || !documentTitle}
                className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]"
              >
                {uploadMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Document
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Enhanced Document View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        <div className="max-w-4xl mx-auto">
          {documentToView && (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{documentToView.title}</h2>
                <div className="flex items-center justify-center gap-4 text-sm text-foreground/60">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {documentToView.created_by || 'Unknown Scholar'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(documentToView.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Document Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <FileText className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Document Type</h4>
                    <p className="text-sm text-foreground/60">Islamic Manuscript</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Globe2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Language</h4>
                    <p className="text-sm text-foreground/60">Arabic (RTL)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Shield className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Verification</h4>
                    <p className="text-sm text-foreground/60">Blockchain Verified</p>
                  </CardContent>
                </Card>
              </div>

              {/* OCR Status and Results */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    AI OCR Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {ocrLoading ? (
                    <div className="flex items-center gap-3 p-4">
                      <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading OCR results...</span>
                    </div>
                  ) : ocrResult ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">OCR Status:</span>
                        <Badge className={`${
                          ocrResult.status === 'completed' ? 'bg-green-100 text-green-800' :
                          ocrResult.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          ocrResult.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {ocrResult.status}
                        </Badge>
                      </div>
                      
                      {ocrResult.result && (
                        <>
                          {ocrResult.result.confidence && (
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Confidence Score:</span>
                              <div className="flex items-center gap-2">
                                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="bg-emerald-500 h-2 rounded-full"
                                    style={{width: `${ocrResult.result.confidence * 100}%`}}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{(ocrResult.result.confidence * 100).toFixed(1)}%</span>
                              </div>
                            </div>
                          )}
                          
                          {ocrResult.result.pages && (
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Pages Processed:</span>
                              <span>{ocrResult.result.pages}</span>
                            </div>
                          )}
                          
                          {ocrResult.result.text && (
                            <div>
                              <h4 className="font-medium mb-2">Extracted Text Preview:</h4>
                              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-60 overflow-y-auto">
                                <pre className="whitespace-pre-wrap text-sm font-arabic text-right">
                                  {ocrResult.result.text.substring(0, 1000)}
                                  {ocrResult.result.text.length > 1000 && '...'}
                                </pre>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="text-foreground/60">No OCR results available</p>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  Full Screen View
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Enhanced Confirmation Modal */}
      <Modal isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)}>
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center animate-scale-in">
            <CheckCircle className="w-10 h-10 text-emerald-600 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-300">
            Upload Successful! 🎉
          </h2>
          <p className="text-foreground/70 mb-6 leading-relaxed">
            Your document has been successfully uploaded to the Islamic repository. 
            AI-powered OCR processing has started and you'll receive notifications once analysis is complete.
          </p>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-emerald-700 dark:text-emerald-300">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">AI Analysis in Progress</span>
            </div>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
              Extracting text, identifying language patterns, and preparing for semantic search
            </p>
          </div>
          <Button 
            onClick={() => setIsConfirmationModalOpen(false)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Continue Exploring
          </Button>
        </div>
      </Modal>
    </div>
  );
}