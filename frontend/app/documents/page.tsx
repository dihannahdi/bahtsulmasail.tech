'use client';
import React, { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Modal from '@/components/common/Modal';
import { 
  useDocuments, 
  useUploadDocument, 
  useOcrStatus,
  Document 
} from './hooks';
import { DocumentUploadData } from '../services/documents';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

export default function DocumentManagementPage() {
  const { data: session } = useSession();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[1]);

  // Upload
  const [documentTitle, setDocumentTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // View Details
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [documentToView, setDocumentToView] = useState<Document | null>(null);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

  // Fetch documents with pagination
  const { 
    data: documentsResponse, 
    isLoading, 
    isError,
    error 
  } = useDocuments({
    page: currentPage,
    page_size: itemsPerPage,
    ordering: '-created_at'
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

  // Upload handler
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

  // OCR status fetch
  const handleViewOcr = (doc: Document) => {
    setDocumentToView(doc);
    setIsViewModalOpen(true);
  };

  // Get documents from response
  const documents = documentsResponse?.results || [];
  const totalCount = documentsResponse?.count || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Document Management</h1>
        <button className="btn btn-primary" onClick={() => setIsUploadModalOpen(true)}>
          Upload Document
        </button>
      </div>
      {/* Upload Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)}>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block font-semibold">Title</label>
            <input
              type="text"
              className="input"
              value={documentTitle}
              onChange={e => setDocumentTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-semibold">File</label>
            <input
              type="file"
              ref={fileInputRef}
              className="input"
              onChange={e => setSelectedFile(e.target.files?.[0] || null)}
              required
            />
          </div>
          {uploadError && <div className="text-red-600">{uploadError}</div>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="btn"
              onClick={() => setIsUploadModalOpen(false)}
              disabled={uploadMutation.isPending}
            >
              Cancel
            </button>
            <button className="btn btn-primary" type="submit" disabled={uploadMutation.isPending}>
              {uploadMutation.isPending ? `Uploading... ${uploadProgress}%` : 'Upload'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Document List */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div>Loading documents...</div>
        ) : isError ? (
          <div className="text-red-600">Failed to load documents.</div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Uploader</th>
                <th>Uploaded At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc: Document) => (
                <tr key={doc.id}>
                  <td>{doc.title}</td>
                  <td>{doc.created_by}</td>
                  <td>{new Date(doc.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        {(doc.ocr_status === 'processing' || doc.ocr_status === 'pending') && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        )}
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          doc.ocr_status === 'completed' ? 'bg-green-100 text-green-800' :
                          doc.ocr_status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          doc.ocr_status === 'pending' ? 'bg-blue-100 text-blue-800' :
                          doc.ocr_status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          OCR: {doc.ocr_status === 'processing' ? 'Processing...' : 
                               doc.ocr_status === 'pending' ? 'Pending' :
                               doc.ocr_status === 'completed' ? 'Completed' :
                               doc.ocr_status === 'failed' ? 'Failed' :
                               doc.ocr_status}
                        </span>
                      </div>
                      {(doc as any).verification_status && (
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          (doc as any).verification_status === 'verified' ? 'bg-green-100 text-green-800' :
                          (doc as any).verification_status === 'awaiting_verification' ? 'bg-yellow-100 text-yellow-800' :
                          (doc as any).verification_status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          Verification: {(doc as any).verification_status === 'awaiting_verification' ? 'Awaiting' :
                                       (doc as any).verification_status === 'verified' ? 'Verified' :
                                       (doc as any).verification_status === 'rejected' ? 'Rejected' :
                                       (doc as any).verification_status}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <a href={doc.file_url || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline mr-2">
                      Download
                    </a>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleViewOcr(doc)}
                      disabled={ocrLoading && documentToView?.id === doc.id}
                    >
                      {ocrLoading && documentToView?.id === doc.id ? 'Loading...' : 'View OCR'}
                    </button>
                    <button className="btn btn-sm btn-secondary ml-2" onClick={() => { setDocumentToView(doc); setIsAnalysisModalOpen(true); }}>
                      View Analysis
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination Controls */}
      {documentsResponse && (
        <div className="flex justify-between items-center mt-4">
          <div>
            <label>Items per page: </label>
            <select
              value={itemsPerPage}
              onChange={e => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="input"
            >
              {ITEMS_PER_PAGE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <button
              className="btn btn-sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="mx-2">Page {currentPage} of {totalPages}</span>
            <button
              className="btn btn-sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* OCR & Analysis Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        {
        ocrLoading ? (
          <div>Loading OCR result...</div>
        ) : ocrResult ? (
          <div>
            <h3 className="font-bold mb-2">OCR Status: {ocrResult.status}</h3>
            {ocrResult.result?.text ? (
              <div className="whitespace-pre-wrap bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
                {ocrResult.result.text}
              </div>
            ) : (
              <div>No OCR text available.</div>
            )}
          </div>
        ) : (
          <div>No OCR data.</div>
        )}
      </Modal>
      <Modal isOpen={isAnalysisModalOpen} onClose={() => setIsAnalysisModalOpen(false)} title="Analysis Results">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Semantic Analysis</h3>
            {/* {semanticLoading ? (
              <div className="flex justify-center py-4">
                <Spinner />
              </div>
            ) : semanticData ? (
              <div className="bg-gray-50 p-4 rounded">
                <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(semanticData, null, 2)}</pre>
              </div>
            ) : ( */}
              <p className="text-gray-500">No semantic analysis available</p>
            {/* )} */}
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Argument Analysis</h3>
            {/* {argumentLoading ? (
              <div className="flex justify-center py-4">
                <Spinner />
              </div>
            ) : argumentData ? (
              <div className="bg-gray-50 p-4 rounded">
                <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(argumentData, null, 2)}</pre>
              </div>
            ) : ( */}
              <p className="text-gray-500">No argument analysis available</p>
            {/* )} */}
          </div>
        </div>
      </Modal>
      <Modal isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)} title="Success">
        <div>
          <p>Document uploaded successfully!</p>
          <button className="btn btn-primary mt-4" onClick={() => setIsConfirmationModalOpen(false)}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}