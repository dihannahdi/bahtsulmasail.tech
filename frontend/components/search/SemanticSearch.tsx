'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, BookOpen, User, Sparkles, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

interface SearchResult {
  kitab_name: string
  author: string
  ibaroh: string
  terjemahan: string
  similarity_score: number
  metadata: Record<string, any>
}

interface SearchResponse {
  query: string
  results: SearchResult[]
  total_found: number
}

const semanticSearch = async (query: string, limit: number = 10): Promise<SearchResponse> => {
  const response = await fetch(`/api/v1/documents/semantic-search/?q=${encodeURIComponent(query)}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
  
  if (!response.ok) {
    throw new Error('Search failed')
  }
  
  return response.json()
}

export default function SemanticSearch() {
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['semantic-search', searchQuery],
    queryFn: () => semanticSearch(searchQuery),
    enabled: !!searchQuery,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchQuery(query.trim())
    }
  }

  const handleExampleSearch = (exampleQuery: string) => {
    setQuery(exampleQuery)
    setSearchQuery(exampleQuery)
  }

  const exampleQueries = [
    'hukum jual beli online',
    'ruling on online sales',
    'zakat harta perdagangan',
    'nikah dalam Islam',
    'prayer times calculation'
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Pencarian Semantik</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Cari konsep hukum Islam dalam bahasa Indonesia atau Inggris dan temukan 
          referensi yang relevan dari kitab-kitab kuning dengan terjemahan otomatis.
        </p>
      </div>

      {/* Search Form */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Masukkan pertanyaan Anda (misalnya: 'hukum jual beli online')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 text-base"
              />
            </div>
            <Button type="submit" className="w-full" disabled={!query.trim() || isLoading}>
              {isLoading ? 'Mencari...' : 'Cari'}
            </Button>
          </form>

          {/* Example Queries */}
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-3">Contoh pencarian:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleExampleSearch(example)}
                  className="text-xs"
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Terjadi kesalahan saat mencari. Silakan coba lagi.
          </AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full mb-2" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Search Results */}
      {data && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Hasil Pencarian
            </h2>
            <Badge variant="secondary">
              {data.total_found} hasil ditemukan
            </Badge>
          </div>

          {data.results.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Tidak ada hasil yang ditemukan untuk pencarian "{data.query}"
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {data.results.map((result, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          {result.kitab_name}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-3 w-3" />
                          {result.author}
                        </div>
                      </div>
                      <Badge variant="outline">
                        {Math.round(result.similarity_score * 100)}% relevan
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Arabic Text */}
                    <div>
                      <h4 className="font-medium mb-2">النص العربي (Teks Arab):</h4>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-right leading-relaxed font-arabic text-lg">
                          {result.ibaroh}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Indonesian Translation */}
                    <div>
                      <h4 className="font-medium mb-2">Terjemahan:</h4>
                      <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                        <p className="leading-relaxed">
                          {result.terjemahan}
                        </p>
                      </div>
                    </div>

                    {/* Metadata */}
                    {result.metadata && Object.keys(result.metadata).length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        <details>
                          <summary className="cursor-pointer hover:text-foreground">
                            Informasi tambahan
                          </summary>
                          <pre className="mt-2 bg-muted p-2 rounded text-xs overflow-auto">
                            {JSON.stringify(result.metadata, null, 2)}
                          </pre>
                        </details>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
} 