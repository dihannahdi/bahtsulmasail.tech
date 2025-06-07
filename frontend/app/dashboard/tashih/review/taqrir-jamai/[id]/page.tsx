'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { authService } from '@/services/auth';
import { tashihService, TaqrirJamai } from '@/services/tashih';

export default function TaqrirJamaiReviewPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [taqrirJamai, setTaqrirJamai] = useState<TaqrirJamai | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isApproved, setIsApproved] = useState<boolean | null>(null);

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

      const taqrirData = await tashihService.getTaqrirJamai(params.id as string);
      setTaqrirJamai(taqrirData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isApproved === null || !reviewNotes.trim()) {
      setError('Please provide review notes and select approve/reject.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      await tashihService.reviewTaqrirJamai(params.id as string, {
        review_notes: reviewNotes,
        is_approved: isApproved,
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
          <span>Loading TaqrirJamai...</span>
        </div>
      </div>
    );
  }

  if (!user || !taqrirJamai) {
    return null;
  }

  // Check if user has already reviewed this TaqrirJamai
  const userReview = taqrirJamai.reviews?.find(review => review.reviewer === user.username);
  if (userReview) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Review Already Completed</h1>
              <p className="text-gray-600 mb-4">
                You have already reviewed this TaqrirJamai.
              </p>
              <div className="mb-4 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-700">
                  <strong>Your Review:</strong> {userReview.is_approved ? 'Approved' : 'Rejected'}
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>Notes:</strong> {userReview.review_notes}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Reviewed on: {new Date(userReview.review_date).toLocaleString()}
                </p>
              </div>
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
      <div className="max-w-6xl mx-auto">
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
          <h1 className="text-3xl font-bold text-gray-900">Review TaqrirJamai</h1>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TaqrirJamai Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">TaqrirJamai Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="mt-1 text-sm text-gray-900">{taqrirJamai.title}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Document</label>
                  <p className="mt-1 text-sm text-gray-900">{taqrirJamai.document_title}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Created By</label>
                  <p className="mt-1 text-sm text-gray-900">{taqrirJamai.created_by}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Created At</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(taqrirJamai.created_at).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Status</label>
                  <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {taqrirJamai.status_name}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Based on Individual Reviews</label>
                  <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {taqrirJamai.taqrir_khass_count} TaqrirKhass
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <div className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-50 max-h-96 overflow-y-auto">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{taqrirJamai.content}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Existing Reviews */}
            {taqrirJamai.reviews && taqrirJamai.reviews.length > 0 && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Reviews</h3>
                <div className="space-y-4">
                  {taqrirJamai.reviews.map((review, index) => (
                    <div key={index} className="border-l-4 border-gray-200 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{review.reviewer}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          review.is_approved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {review.is_approved ? 'Approved' : 'Rejected'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{review.review_notes}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.review_date).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Review Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Review</h2>
            
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Review Decision *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="decision"
                      value="approve"
                      checked={isApproved === true}
                      onChange={() => setIsApproved(true)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Approve</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="decision"
                      value="reject"
                      checked={isApproved === false}
                      onChange={() => setIsApproved(false)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Reject</span>
                  </label>
                </div>
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

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/dashboard/tashih')}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
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