'use client'; // For future interactivity, like opening modals or handling state

import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import Modal from '@/components/common/Modal'; // Import Modal component

// Mock data structure for a document - replace with actual type from backend/API
interface Document {
  id: string;
  title: string;
  uploadDate: string;
  status: 'Processing' | 'Completed' | 'Failed' | 'Pending Review';
  fileName: string;
}

// Mock documents data
const mockDocumentsData: Document[] = Array.from({ length: 25 }, (_, i) => ({ // Increased mock data for pagination demo
  id: `${i + 1}`,
  title: `Scholarly Article Vol. ${i + 1}`,
  uploadDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  status: ['Processing', 'Completed', 'Failed', 'Pending Review'][Math.floor(Math.random() * 4)] as Document['status'],
  fileName: `article_${i + 1}_${Math.random().toString(36).substring(2, 8)}.pdf`,
}));

const MAX_FILE_SIZE_MB = 100;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  'application/pdf', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'text/plain' // .txt
];
const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.docx', '.txt'];
const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

export default function DocumentManagementPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocumentsData);
  const [documentTitle, setDocumentTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // State for modal visibility
  const [isUploading, setIsUploading] = useState(false); // New state for upload in progress
  const fileInputRef = React.useRef<HTMLInputElement>(null); // Ref for file input

  // State for Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);

  // Edit states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [documentToEdit, setDocumentToEdit] = useState<Document | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editError, setEditError] = useState<string | null>(null);

  // View Details states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [documentToView, setDocumentToView] = useState<Document | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[1]); // Default to 10

  // Effect to update editingTitle when documentToEdit changes
  useEffect(() => {
    if (documentToEdit) {
      setEditingTitle(documentToEdit.title);
      setEditError(null); // Clear previous edit errors
    } else {
      setEditingTitle('');
    }
  }, [documentToEdit]);

  // Pagination logic
  const totalPages = useMemo(() => Math.ceil(documents.length / itemsPerPage), [documents, itemsPerPage]);
  const currentDocuments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return documents.slice(startIndex, endIndex);
  }, [documents, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Function to generate page numbers for pagination control
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Max page buttons to show (e.g., 1 ... 5 6 7 ... 10)
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= halfPagesToShow + 1) {
        for (let i = 1; i <= maxPagesToShow -1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - halfPagesToShow) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - maxPagesToShow + 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - halfPagesToShow +1 ; i <= currentPage + halfPagesToShow -1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUploadError(null); // Clear previous errors
    const file = event.target.files && event.target.files[0];

    if (file) {
      // Validate file type by extension and MIME type
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!ALLOWED_FILE_TYPES.includes(file.type) || !ALLOWED_FILE_EXTENSIONS.includes(fileExtension)) {
        setUploadError(`Invalid file type. Allowed types: PDF, DOCX, TXT. (Received: ${file.type} or ${fileExtension})`);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
        return;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setUploadError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB. (Selected file: ${(file.size / 1024 / 1024).toFixed(2)}MB)`);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
        return;
      }

      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFileUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Error state is already checked by handleFileChange, but good to double check here or rely on selectedFile state
    if (uploadError || !selectedFile) { // if an error was set by handleFileChange, or if somehow no file is selected
        if (!uploadError && !selectedFile) setUploadError('Please select a valid file.');
        return;
    }
    if (!documentTitle.trim()) {
      setUploadError('Document title is required.');
      return;
    }
    
    // No need to re-validate file here if handleFileChange did its job and set selectedFile to null on error

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('title', documentTitle);
    formData.append('file', selectedFile); // The backend will receive the file under the key 'file'

    try {
      // Simulate API call delay and random success/failure for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      const mockApiSuccess = Math.random() > 0.2; // 80% chance of success for demo

      // const response = await fetch('/api/documents/upload', { // Real API call (commented out)
      //   method: 'POST',
      //   body: formData,
      //   // Headers like Authorization (for auth) or Accept might be needed for a real API
      // });

      // if (!response.ok && !mockApiSuccess) { // Modify condition when using real API
      if (!mockApiSuccess) { // Using mock success condition
        // const errorData = await response.json(); // If backend sends JSON error
        // throw new Error(errorData.message || 'Upload failed. Please try again.');
        throw new Error('Mock API Upload failed. Please try again.'); // Mock error
      }

      // const result = await response.json(); // If backend returns data for the new doc (commented out)
      console.log('Mock API call successful', { title: documentTitle, fileName: selectedFile.name });

      const newDocument: Document = {
        id: String(Date.now()), // In real app, use ID from backend response (result.id)
        title: documentTitle, // Or result.title
        fileName: selectedFile.name, // Or result.fileName
        uploadDate: new Date().toISOString().split('T')[0], // Or result.uploadDate
        status: 'Processing', // Or result.status
      };
      setDocuments(prevDocs => [newDocument, ...prevDocs]);

      setDocumentTitle('');
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; 
      }
      setIsUploadModalOpen(false);
      alert(`Mock upload successful for: ${newDocument.title}`);

    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'An unexpected error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const openUploadModal = () => {
    setDocumentTitle('');
    setSelectedFile(null);
    setUploadError(null);
    setIsUploading(false); // Ensure uploading state is reset if modal was closed during upload
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
    setIsUploadModalOpen(true);
  };

  // Functions for Delete Modal
  const openDeleteModal = (doc: Document) => {
    setDocumentToDelete(doc);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDocumentToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (documentToDelete) {
      // Simulate API call for deletion here if needed in the future
      // For now, just update client-side state
      setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== documentToDelete.id));
      console.log('Deleted document:', documentToDelete.title);
      closeDeleteModal();
    }
  };

  // Functions for Edit Modal
  const openEditModal = (doc: Document) => {
    setDocumentToEdit(doc);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setDocumentToEdit(null);
    setEditError(null);
    setIsEditModalOpen(false);
  };

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!documentToEdit || !editingTitle.trim()) {
      setEditError('Title cannot be empty.');
      return;
    }
    setEditError(null);

    // Simulate API call for editing here if needed in the future
    setDocuments(prevDocs => 
      prevDocs.map(doc => 
        doc.id === documentToEdit.id ? { ...doc, title: editingTitle } : doc
      )
    );
    console.log('Updated document:', documentToEdit.id, 'New Title:', editingTitle);
    closeEditModal();
  };

  // Functions for View Details Modal
  const openViewModal = (doc: Document) => {
    setDocumentToView(doc);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setDocumentToView(null);
    setIsViewModalOpen(false);
  };

  return (
    <main className="flex flex-col min-h-screen p-8 sm:p-12 bg-gray-100 text-gray-800">
      <header className="w-full mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Document Management</h1>
        <p className="text-lg text-gray-600 mt-1">
          Upload, view, and manage scholarly documents for analysis.
        </p>
      </header>

      {/* Button to open upload modal */}
      <section className="w-full mb-10">
        <button
          onClick={openUploadModal}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={isUploading} // Disable button if an upload is in progress from a previous modal interaction (edge case)
        >
          {isUploading ? 'Processing...' : 'Upload New Document'} 
        </button>
      </section>

      {/* Upload Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={() => !isUploading && setIsUploadModalOpen(false)} title="Upload New Document">
        <form onSubmit={handleFileUpload} className="space-y-6">
          <div>
            <label htmlFor="documentTitleModal" className="block text-sm font-medium text-gray-700 mb-1">
              Document Title
            </label>
            <input
              type="text"
              id="documentTitleModal" // Ensure ID is unique if original form remains for some reason
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              placeholder="e.g., Fatwa Collection Vol. 2"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={isUploading}
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">
              Select Document File (PDF, DOCX, TXT up to {MAX_FILE_SIZE_MB}MB)
            </span>
            <div className="mt-1 flex items-center">
              <label 
                htmlFor="fileUploadModal" 
                className={`cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Choose File
              </label>
              <input
                type="file"
                id="fileUploadModal"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="sr-only"
                accept={ALLOWED_FILE_EXTENSIONS.join(',')} // Add accept attribute for better UX
                disabled={isUploading}
              />
              {selectedFile && (
                <span className="ml-3 text-sm text-gray-600 truncate max-w-xs">{selectedFile.name}</span>
              )}
              {!selectedFile && !uploadError && (
                 <span className="ml-3 text-sm text-gray-500">No file chosen</span>
              )}
            </div>
          </div>
          {uploadError && (
            <p className="text-sm text-red-600 py-2 px-3 bg-red-50 border border-red-200 rounded-md">{uploadError}</p>
          )}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button" // Important: Set to type button to prevent form submission
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 flex items-center justify-center"
              disabled={!selectedFile || !documentTitle.trim() || !!uploadError || isUploading}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                'Upload Document'
              )}
            </button>
          </div>
        </form>
      </Modal>

      <section className="w-full bg-white p-6 sm:p-8 rounded-lg shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Uploaded Documents</h2>
          {totalPages > 0 && (
            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Items per page:</span>
                <select 
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="p-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    {ITEMS_PER_PAGE_OPTIONS.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
          )}
        </div>

        {documents.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentDocuments.map((doc) => (
                    <tr key={doc.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.fileName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${doc.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                            doc.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                            doc.status === 'Pending Review' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => openViewModal(doc)} className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                        <button onClick={() => openEditModal(doc)} className="text-yellow-600 hover:text-yellow-900 mr-3">Edit</button>
                        <button onClick={() => openDeleteModal(doc)} className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                <div className="mb-2 sm:mb-0">
                  Page {currentPage} of {totalPages}. Total {documents.length} items.
                </div>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => handlePageChange(1)} 
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    First
                  </button>
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  {getPageNumbers().map((page, index) => 
                    typeof page === 'number' ? (
                      <button 
                        key={index} 
                        onClick={() => handlePageChange(page)} 
                        className={`px-3 py-1 border rounded-md ${currentPage === page ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 hover:bg-gray-100'}`}
                      >
                        {page}
                      </button>
                    ) : (
                      <span key={index} className="px-3 py-1">{page}</span>
                    )
                  )}
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                  <button 
                    onClick={() => handlePageChange(totalPages)} 
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Last
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center py-8">No documents uploaded yet.</p>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      {documentToDelete && (
        <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} title="Confirm Deletion">
          <div className="space-y-4">
            <p className="text-gray-700">
              Are you sure you want to delete the document: <span className="font-semibold">{documentToDelete.title}</span>?
            </p>
            <p className="text-sm text-gray-500">This action cannot be undone.</p>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Document Modal */}
      {documentToEdit && (
        <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Document Metadata">
          <form onSubmit={handleEditSubmit} className="space-y-6">
            <div>
              <label htmlFor="editingDocumentTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Document Title
              </label>
              <input
                type="text"
                id="editingDocumentTitle"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            {editError && (
                <p className="text-sm text-red-600">{editError}</p>
            )}
            {/* Add other editable fields here later if needed, e.g., description, tags */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={closeEditModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                disabled={!editingTitle.trim() || editingTitle === documentToEdit.title} // Disable if title empty or unchanged
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Document Details Modal */}
      {documentToView && (
        <Modal isOpen={isViewModalOpen} onClose={closeViewModal} title={documentToView.title || "Document Details"}>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-500">File Name</h3>
              <p className="mt-1 text-sm text-gray-900 break-all">{documentToView.fileName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Upload Date</h3>
              <p className="mt-1 text-sm text-gray-900">{documentToView.uploadDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="mt-1 text-sm text-gray-900">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${documentToView.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    documentToView.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                    documentToView.status === 'Pending Review' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'}`}>
                  {documentToView.status}
                </span>
              </p>
            </div>
            {/* Add more details here if needed, e.g., description, tags when available */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={closeViewModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
} 