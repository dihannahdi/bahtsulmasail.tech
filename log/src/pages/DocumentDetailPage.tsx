import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { DocumentDetail } from '../components/documents/DocumentDetail';
import { documentApi } from '../lib/api';

export function DocumentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadDocument = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await documentApi.getDocument(id);
        setDocument(data);
      } catch (error) {
        console.error('Error loading document:', error);
        setError('Failed to load document. It may not exist or you may not have permission to view it.');
      } finally {
        setLoading(false);
      }
    };
    
    loadDocument();
  }, [id]);
  
  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (error || !document) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
          </CardHeader>
          <CardContent>
            <p>{error || 'Document not found'}</p>
            <Button asChild className="mt-4">
              <Link to="/documents">Back to Documents</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <Link to="/documents" className="text-muted-foreground hover:text-foreground mb-2 inline-block">
              ← Back to Documents
            </Link>
            
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{document.title}</h1>
              
              {document.is_bahtsul_masail ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Bahtsul Masail
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  Standard
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            {document.approval_status === 'pending_review' && (
              <Button variant="outline" className="text-amber-600 border-amber-300 hover:bg-amber-50">
                Pending Review
              </Button>
            )}
            
            {document.approval_status === 'approved' && (
              <Button variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
                Approved
              </Button>
            )}
            
            {document.approval_status === 'published' && (
              <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                Published
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          {document.author && <span>By: {document.author}</span>}
          {document.uploaded_at && (
            <>
              <span>•</span>
              <span>Uploaded: {new Date(document.uploaded_at).toLocaleDateString()}</span>
            </>
          )}
        </div>
      </div>
      
      <DocumentDetail document={document} />
    </div>
  );
} 