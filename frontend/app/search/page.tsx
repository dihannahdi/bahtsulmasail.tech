'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSearch } from './hooks';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State management
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'keyword' | 'semantic'>('keyword');
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize from URL params
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    const urlType = searchParams.get('type') as 'keyword' | 'semantic' || 'keyword';
    const urlPage = parseInt(searchParams.get('page') || '1');
    
    setQuery(urlQuery);
    setSearchType(urlType);
    setCurrentPage(urlPage);
  }, [searchParams]);

  // Search query
  const { 
    data: searchResults, 
    isLoading, 
    isError, 
    error 
  } = useSearch({
    q: query,
    type: searchType,
    page: currentPage,
    page_size: 10
  });

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setCurrentPage(1);
    updateURL(query, searchType, 1);
  };

  // Handle search type change
  const handleTypeChange = (newType: 'keyword' | 'semantic') => {
    setSearchType(newType);
    setCurrentPage(1);
    if (query.trim()) {
      updateURL(query, newType, 1);
    }
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateURL(query, searchType, newPage);
  };

  // Update URL with search parameters
  const updateURL = (q: string, type: 'keyword' | 'semantic', page: number) => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (type !== 'keyword') params.set('type', type);
    if (page > 1) params.set('page', page.toString());
    
    router.push(`/search?${params.toString()}`);
  };

  // Highlight search terms in text
  const highlightText = (text: string, searchQuery: string) => {
    if (!searchQuery || searchType === 'semantic') return text;
    
    const regex = new RegExp(`(${searchQuery.split(' ').join('|')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const totalPages = searchResults ? Math.ceil(searchResults.count / 10) : 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 sm:p-16 bg-gray-50 text-gray-800">
      <header className="w-full max-w-4xl mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Explore Discussions</h1>
        <p className="text-xl text-gray-600">
          Search and discover insights from Bahtsul Masail.
        </p>
      </header>

      {/* Search Form */}
      <section className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg mb-8">
        <form onSubmit={handleSearch}>
          <div className="mb-6">
            <input 
              type="search" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter keywords, topics, or questions..." 
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out"
            />
          </div>
          
          {/* Search Type Selector */}
          <div className="mb-6 flex justify-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="keyword"
                checked={searchType === 'keyword'}
                onChange={(e) => handleTypeChange(e.target.value as 'keyword')}
                className="mr-2"
              />
              <span className="text-sm font-medium">Keyword Search</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="semantic"
                checked={searchType === 'semantic'}
                onChange={(e) => handleTypeChange(e.target.value as 'semantic')}
                className="mr-2"
              />
              <span className="text-sm font-medium">Semantic Search</span>
            </label>
          </div>
          
          <div className="text-center">
            <button 
              type="submit" 
              disabled={!query.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </section>

      {/* Search Results */}
      <section className="w-full max-w-4xl mt-8">
        {query && (
          <>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Results for "{query}" 
                {searchType === 'semantic' && (
                  <span className="ml-2 text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    Semantic Search
                  </span>
                )}
              </h2>
              {searchResults && (
                <span className="text-gray-600">
                  {searchResults.count} documents found
                </span>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow">
              {isLoading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500">Searching documents...</p>
                </div>
              ) : isError ? (
                <div className="p-6 text-center text-red-600">
                  <p>Search failed. Please try again.</p>
                  {error && <p className="text-sm mt-1">{error.message}</p>}
                </div>
              ) : searchResults && searchResults.results.length > 0 ? (
                <>
                  {searchResults.results.map((document, index) => (
                    <div key={document.id} className={`p-6 ${index > 0 ? 'border-t border-gray-200' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-blue-700 hover:text-blue-800">
                          <Link href={`/documents/${document.id}`}>
                            {highlightText(document.title, query)}
                          </Link>
                        </h3>
                        <div className="text-sm text-gray-500 ml-4">
                          {searchType === 'semantic' && document.similarity_score && (
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs mr-2">
                              {Math.round(document.similarity_score * 100)}% match
                            </span>
                          )}
                          <span>{new Date(document.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-2 leading-relaxed">
                        {document.snippet ? (
                          <span>{highlightText(document.snippet, query)}</span>
                        ) : (
                          <span>{document.description || 'No description available.'}</span>
                        )}
                      </p>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>By {document.created_by}</span>
                        <Link 
                          href={`/documents/${document.id}`}
                          className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  ))}
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="p-6 border-t border-gray-200 flex justify-center items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                      >
                        Previous
                      </button>
                      
                      <span className="px-4 py-1">
                        Page {currentPage} of {totalPages}
                      </span>
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <p>No documents found for "{query}".</p>
                  <p className="text-sm mt-1">Try different keywords or switch search types.</p>
                </div>
              )}
            </div>
          </>
        )}
        
        {!query && (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500 text-center">Enter a search query to find documents.</p>
          </div>
        )}
      </section>

      <div className="mt-12 text-center">
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition duration-300">
          ← Back to Home
        </Link>
      </div>
      
      <footer className="mt-16 pt-8 border-t border-gray-300 w-full max-w-4xl text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} BahtsulMasail.tech - Seek and You Shall Find.
      </footer>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
} 