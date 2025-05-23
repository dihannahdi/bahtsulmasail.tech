import React from 'react';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

interface DocumentListProps {
  documents: any[]; // Use your document type here
}

export function DocumentList({ documents }: DocumentListProps) {
  if (!documents || documents.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Tidak ada dokumen ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map(doc => (
        <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-lg">
                <Link href={`/documents/${doc.id}`} className="hover:underline">
                  {doc.title}
                </Link>
              </h3>
              
              {doc.is_bahtsul_masail ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Bahtsul Masail
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  Standard
                </Badge>
              )}
            </div>
            
            <div className="mt-2 text-sm text-muted-foreground">
              {doc.is_bahtsul_masail ? 
                formatText(doc.nash_masalah, 150) : 
                formatText(doc.question, 150)}
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              {doc.author && <span>Oleh: {doc.author}</span>}
              {doc.uploaded_at && (
                <>
                  <span>•</span>
                  <span>{formatDate(doc.uploaded_at)}</span>
                </>
              )}
              {doc.topics && (
                <>
                  <span>•</span>
                  <span>Topik: {formatTopics(doc.topics)}</span>
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Helper functions
function formatText(text: string | null | undefined, maxLength: number = 100): string {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (e) {
    return dateString;
  }
}

function formatTopics(topics: string): string {
  if (!topics) return '';
  // If topics is already a comma-separated string, just return the first 2
  if (typeof topics === 'string') {
    const topicArray = topics.split(',').map(t => t.trim());
    return topicArray.slice(0, 2).join(', ') + (topicArray.length > 2 ? ', ...' : '');
  }
  return '';
} 