import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface SearchResult {
  id: number;
  title: string;
  author?: string;
  similarity: number;
  matching_text?: string;
  topics?: string;
  upload_date?: string;
  approval_status?: string;
  is_public?: boolean;
  is_bahtsul_masail?: boolean;
}

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
  if (!results || results.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No results found for "{query}"</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">Found {results.length} results for "{query}"</p>
      
      {results.map(result => (
        <Card key={result.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-lg">
                <Link to={`/documents/${result.id}`} className="hover:underline">
                  {result.title}
                </Link>
              </h3>
              
              <div className="flex items-center gap-2">
                {result.is_bahtsul_masail ? (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    Bahtsul Masail
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                    Standard
                  </Badge>
                )}
                
                {result.approval_status === 'published' && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Published
                  </Badge>
                )}
              </div>
            </div>
            
            {result.matching_text && (
              <div className="mt-2 text-sm">
                <p className="font-medium mb-1">Matching content:</p>
                <p className="text-muted-foreground">{result.matching_text}</p>
              </div>
            )}
            
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              {result.author && <span>By: {result.author}</span>}
              
              {result.similarity && (
                <>
                  <span>•</span>
                  <span>Match: {Math.round(result.similarity * 100)}%</span>
                </>
              )}
              
              {result.upload_date && (
                <>
                  <span>•</span>
                  <span>Uploaded: {new Date(result.upload_date).toLocaleDateString()}</span>
                </>
              )}
              
              {result.topics && (
                <>
                  <span>•</span>
                  <span>Topics: {formatTopics(result.topics)}</span>
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Helper function
function formatTopics(topics: string): string {
  if (!topics) return '';
  
  // If topics is already a comma-separated string, just return the first 2
  if (typeof topics === 'string') {
    const topicArray = topics.split(',').map(t => t.trim());
    return topicArray.slice(0, 2).join(', ') + (topicArray.length > 2 ? ', ...' : '');
  }
  
  return '';
} 