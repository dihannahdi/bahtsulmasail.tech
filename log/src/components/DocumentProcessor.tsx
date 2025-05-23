import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from './ui/card';
import { Alert } from './ui';
import { Play, X, Loader2 } from 'lucide-react';
import TaskManager from './TaskManager';

interface DocumentProcessorProps {
  documentId: string;
  onComplete?: () => void;
}

const DocumentProcessor: React.FC<DocumentProcessorProps> = ({ 
  documentId,
  onComplete
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showTasks, setShowTasks] = useState(false);
  
  const handleProcessDocument = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const response = await axios.post(`/api/documents/${documentId}/process/`);
      setSuccess(response.data.message || 'Document processing started successfully');
      setShowTasks(true);
      
      if (onComplete) {
        onComplete();
      }
    } catch (err: any) {
      console.error('Error processing document:', err);
      const errorMessage = err.response?.data?.error || 'Failed to process document';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancelProcessing = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`/api/documents/${documentId}/cancel-tasks/`);
      setSuccess(response.data.message || 'Document processing canceled');
      
      if (onComplete) {
        onComplete();
      }
    } catch (err: any) {
      console.error('Error canceling processing:', err);
      const errorMessage = err.response?.data?.error || 'Failed to cancel processing';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Document Processing</CardTitle>
          <CardDescription>
            Process this document to extract text, analyze content, and generate embeddings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert variant="default" className="mb-4 bg-green-50 text-green-700 border-green-200">
              {success}
            </Alert>
          )}
          
          <div className="flex space-x-4">
            <Button 
              onClick={handleProcessDocument}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Process Document
                </>
              )}
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleCancelProcessing}
              disabled={loading}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel Processing
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showTasks && (
        <TaskManager documentId={documentId} autoRefresh={true} />
      )}
    </div>
  );
};

export default DocumentProcessor; 