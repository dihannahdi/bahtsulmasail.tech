import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from './ui/card';
import { Skeleton, Alert, Badge } from './ui';
import DocumentProcessor from './DocumentProcessor';

interface DocumentDetailProps {
  documentId: string;
}

// GraphQL query to fetch document details
const GET_DOCUMENT = gql`
  query GetDocument($id: ID!) {
    documentById(id: $id) {
      id
      title
      originalFilename
      fileType
      uploadedAt
      processedAt
      processingStatus
      contentType
      fileSize
      source
      tags
    }
  }
`;

const DocumentDetail: React.FC<DocumentDetailProps> = ({ documentId }) => {
  const { loading, error, data, refetch } = useQuery(GET_DOCUMENT, {
    variables: { id: documentId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading && !data) {
    return <DocumentSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        Error loading document: {error.message}
      </Alert>
    );
  }

  const document = data?.documentById;
  
  if (!document) {
    return (
      <Alert>
        Document not found
      </Alert>
    );
  }

  // Format the file size in a readable way
  const formatFileSize = (bytes: number) => {
    if (!bytes) return 'Unknown';
    
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  // Format the date in a readable way
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleString();
  };

  // Get status badge for the document
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string, label: string }> = {
      'pending': { color: 'bg-yellow-500', label: 'Pending' },
      'processing': { color: 'bg-blue-500', label: 'Processing' },
      'completed': { color: 'bg-green-500', label: 'Completed' },
      'error': { color: 'bg-red-500', label: 'Error' },
    };
    
    const { color, label } = statusMap[status] || { color: 'bg-gray-500', label: status };
    
    return (
      <Badge className={`${color} text-white`}>
        {label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{document.title}</CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Status:</span>
            {getStatusBadge(document.processingStatus)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Original Filename</h3>
              <p>{document.originalFilename}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">File Type</h3>
              <p>{document.fileType || document.contentType || 'Unknown'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">File Size</h3>
              <p>{formatFileSize(document.fileSize)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Uploaded At</h3>
              <p>{formatDate(document.uploadedAt)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Processed At</h3>
              <p>{document.processedAt ? formatDate(document.processedAt) : 'Not processed yet'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Source</h3>
              <p>{document.source || 'Unknown'}</p>
            </div>
          </div>
          
          {document.tags && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {document.tags.split(',').map((tag: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <DocumentProcessor 
        documentId={documentId} 
        onComplete={() => refetch()}
      />
    </div>
  );
};

// Skeleton loader for the document details
const DocumentSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-6 w-1/4 mt-2" />
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default DocumentDetail; 