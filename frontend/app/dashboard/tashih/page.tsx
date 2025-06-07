'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';
import { tashihService, DocumentTashihSummary, TashihStatistics, ReviewQueue } from '@/services/tashih';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, FileText, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function TashihDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [documentsAwaitingVerification, setDocumentsAwaitingVerification] = useState<DocumentTashihSummary[]>([]);
  const [reviewQueue, setReviewQueue] = useState<ReviewQueue | null>(null);
  const [statistics, setStatistics] = useState<TashihStatistics | null>(null);

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
    loadDashboardData();
  }, [router]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [documentsData, queueData, statsData] = await Promise.all([
        tashihService.getDocumentsAwaitingVerification(),
        tashihService.getMyReviewQueue(),
        tashihService.getTashihStatistics(),
      ]);

      setDocumentsAwaitingVerification(documentsData);
      setReviewQueue(queueData);
      setStatistics(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getVerificationStatusBadge = (status: string) => {
    switch (status) {
      case 'awaiting_verification':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Awaiting Verification</Badge>;
      case 'verified':
        return <Badge variant="default" className="bg-green-100 text-green-800">Verified</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDocumentClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const handleReviewClick = (type: 'taqrir-khass' | 'taqrir-jamai', id: string) => {
    router.push(`/dashboard/tashih/review/${type}/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading Tashih Dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tashih Dashboard</h1>
          <p className="text-gray-600">
            Welcome, {user.name || user.email}. Manage document verification and reviews.
          </p>
        </div>

        {error && (
          <Alert className="mb-6" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Awaiting Verification</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics.documents_awaiting_verification}</div>
                <p className="text-xs text-muted-foreground">Documents pending review</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Verified Documents</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics.documents_verified}</div>
                <p className="text-xs text-muted-foreground">Successfully verified</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics.pending_taqrir_khass_reviews}</div>
                <p className="text-xs text-muted-foreground">TaqrirKhass awaiting review</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Collective Reviews</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statistics.taqrir_jamai_needing_reviews}</div>
                <p className="text-xs text-muted-foreground">TaqrirJamai needing reviews</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="documents">Documents Awaiting Verification</TabsTrigger>
            <TabsTrigger value="individual-reviews">Individual Reviews</TabsTrigger>
            <TabsTrigger value="collective-reviews">Collective Reviews</TabsTrigger>
          </TabsList>

          {/* Documents Awaiting Verification */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents Awaiting Verification</CardTitle>
                <CardDescription>
                  Documents that need review and verification through the Tashih workflow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {documentsAwaitingVerification.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No documents awaiting verification.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {documentsAwaitingVerification.map((doc) => (
                      <div
                        key={doc.document_id}
                        className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleDocumentClick(doc.document_id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{doc.document_title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>TaqrirKhass: {doc.taqrir_khass_count}</span>
                              <span>Pending Reviews: {doc.pending_reviews_count}</span>
                              <span>Completed Reviews: {doc.completed_reviews_count}</span>
                              {doc.has_taqrir_jamai && (
                                <span>TaqrirJamai: {doc.taqrir_jamai_count}</span>
                              )}
                            </div>
                            <div className="mt-2">
                              {getVerificationStatusBadge(doc.verification_status)}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(doc.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Individual Reviews Queue */}
          <TabsContent value="individual-reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Individual Reviews Queue</CardTitle>
                <CardDescription>
                  TaqrirKhass (individual reviews) that need your review.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!reviewQueue || reviewQueue.pending_taqrir_khass.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No individual reviews pending.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviewQueue.pending_taqrir_khass.map((review) => (
                      <div
                        key={review.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
                            <p className="text-gray-600 mb-2">Document: {review.document_title}</p>
                            <p className="text-sm text-gray-500 mb-3">
                              Created by: {review.created_by} on {new Date(review.created_at).toLocaleDateString()}
                            </p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{review.status_name}</Badge>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleReviewClick('taqrir-khass', review.id)}
                            className="ml-4"
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collective Reviews Queue */}
          <TabsContent value="collective-reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Collective Reviews Queue</CardTitle>
                <CardDescription>
                  TaqrirJamai (collective reviews) that need your review.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!reviewQueue || reviewQueue.pending_taqrir_jamai.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No collective reviews pending.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviewQueue.pending_taqrir_jamai.map((review) => (
                      <div
                        key={review.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
                            <p className="text-gray-600 mb-2">Document: {review.document_title}</p>
                            <p className="text-sm text-gray-500 mb-3">
                              Created by: {review.created_by} on {new Date(review.created_at).toLocaleDateString()}
                            </p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{review.status_name}</Badge>
                              <Badge variant="secondary">
                                Based on {review.taqrir_khass_count} individual reviews
                              </Badge>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleReviewClick('taqrir-jamai', review.id)}
                            className="ml-4"
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Refresh Button */}
        <div className="mt-8 flex justify-center">
          <Button onClick={loadDashboardData} variant="outline">
            Refresh Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
} 