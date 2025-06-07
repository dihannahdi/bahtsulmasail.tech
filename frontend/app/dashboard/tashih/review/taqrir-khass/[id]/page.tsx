'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { authService } from '@/services/auth';
import { tashihService, TaqrirKhass } from '@/services/tashih';

export default function TaqrirKhassReviewPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [taqrirKhass, setTaqrirKhass] = useState<TaqrirKhass | null>(null);
  const [verificationStatuses, setVerificationStatuses] = useState<any[]>([]);
  const [reviewNotes, setReviewNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const currentUser = authService.getUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }

    // Check if user has Mushoheh role
    if (currentUser.role !== 'mushoheh' && currentUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    setUser(currentUser);
    loadData();
  }, [router, params.id]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [taqrirData, statusesData] = await Promise.all([
        tashihService.getTaqrirKhass(params.id as string),
        tashihService.getVerificationStatuses(),
      ]);

      setTaqrirKhass(taqrirData);
      setVerificationStatuses(statusesData.filter(status => status.is_final));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStatus || !reviewNotes.trim()) {
      setError('Please provide review notes and select a status.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      await tashihService.reviewTaqrirKhass(params.id as string, {
        review_notes: reviewNotes,
        status: selectedStatus,
      });

      // Redirect back to dashboard
      router.push('/dashboard/tashih');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span>Loading TaqrirKhass...</span>
        </div>
      </div>
    );
  }

  if (!user || !taqrirKhass) {
    return null;
  }

  // Check if already reviewed
  if (taqrirKhass.reviewer) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Review Already Completed</h1>
              <p className="text-gray-600 mb-4">
                This TaqrirKhass has already been reviewed by {taqrirKhass.reviewer}.
              </p>
              <button
                onClick={() => router.push('/dashboard/tashih')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/dashboard/tashih')}
            className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Review TaqrirKhass</h1>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TaqrirKhass Content */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">TaqrirKhass Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <p className="mt-1 text-sm text-gray-900">{taqrirKhass.title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Document</label>
                <p className="mt-1 text-sm text-gray-900">{taqrirKhass.document_title}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Created By</label>
                <p className="mt-1 text-sm text-gray-900">{taqrirKhass.created_by}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Created At</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(taqrirKhass.created_at).toLocaleString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Current Status</label>
                <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {taqrirKhass.status_name}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <div className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-50 max-h-96 overflow-y-auto">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{taqrirKhass.content}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Review Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Review</h2>
            
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Review Decision *
                </label>
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a decision</option>
                  {verificationStatuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="reviewNotes" className="block text-sm font-medium text-gray-700">
                  Review Notes *
                </label>
                <textarea
                  id="reviewNotes"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={6}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide detailed review notes explaining your decision..."
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/dashboard/tashih')}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 