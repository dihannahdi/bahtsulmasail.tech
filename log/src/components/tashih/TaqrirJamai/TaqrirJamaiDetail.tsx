import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tashihApi, TaqrirJamai, TaqrirKhass } from '../../../lib/api';
import { useToast } from '../../ui/use-toast';
import { Button } from '../../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Edit, FileText, CheckCircle, Send, Eye } from 'lucide-react';

const TaqrirJamaiDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [taqrirJamai, setTaqrirJamai] = useState<TaqrirJamai | null>(null);
  const [taqrirKhassList, setTaqrirKhassList] = useState<TaqrirKhass[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionsLoading, setActionsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        const [taqrirJamaiData, taqrirKhassData] = await Promise.all([
          tashihApi.getTaqrirJamai(id),
          tashihApi.getTaqrirKhassList(id)
        ]);
        
        setTaqrirJamai(taqrirJamaiData);
        setTaqrirKhassList(taqrirKhassData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load Taqrir Jama\'i. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = () => {
    navigate(`/tashih/taqrir-jamai/${id}/edit`);
  };

  const handleAddTaqrirKhass = () => {
    navigate(`/tashih/taqrir-jamai/${id}/taqrir-khass/create`);
  };

  const handleViewTaqrirKhass = (taqrirKhassId: number) => {
    navigate(`/tashih/taqrir-khass/${taqrirKhassId}`);
  };

  const handleSubmitForReview = async () => {
    if (!id) return;
    
    try {
      setActionsLoading(true);
      await tashihApi.submitTaqrirJamaiForReview(id);
      
      toast({
        title: 'Success',
        description: 'Taqrir Jama\'i submitted for review.',
      });
      
      // Refresh data
      const updatedTaqrirJamai = await tashihApi.getTaqrirJamai(id);
      setTaqrirJamai(updatedTaqrirJamai);
    } catch (err) {
      console.error('Error submitting for review:', err);
      toast({
        title: 'Error',
        description: 'Failed to submit for review. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setActionsLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!id) return;
    
    try {
      setActionsLoading(true);
      await tashihApi.approveTaqrirJamai(id);
      
      toast({
        title: 'Success',
        description: 'Taqrir Jama\'i approved successfully.',
      });
      
      // Refresh data
      const updatedTaqrirJamai = await tashihApi.getTaqrirJamai(id);
      setTaqrirJamai(updatedTaqrirJamai);
    } catch (err) {
      console.error('Error approving:', err);
      toast({
        title: 'Error',
        description: 'Failed to approve. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setActionsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!id) return;
    
    try {
      setActionsLoading(true);
      await tashihApi.publishTaqrirJamai(id);
      
      toast({
        title: 'Success',
        description: 'Taqrir Jama\'i published successfully.',
      });
      
      // Refresh data
      const updatedTaqrirJamai = await tashihApi.getTaqrirJamai(id);
      setTaqrirJamai(updatedTaqrirJamai);
    } catch (err) {
      console.error('Error publishing:', err);
      toast({
        title: 'Error',
        description: 'Failed to publish. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setActionsLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-500';
      case 'under_review':
        return 'bg-yellow-500';
      case 'approved':
        return 'bg-green-500';
      case 'published':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error || !taqrirJamai) {
    return <div className="text-center py-8 text-red-500">{error || 'Document not found'}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{taqrirJamai.title}</h1>
          <div className="mt-2">
            <Badge className={getStatusBadgeColor(taqrirJamai.status)}>
              {taqrirJamai.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {taqrirJamai.status === 'draft' && (
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          )}
          
          {taqrirJamai.status === 'draft' && (
            <Button onClick={handleSubmitForReview} disabled={actionsLoading}>
              <Send className="mr-2 h-4 w-4" /> Submit for Review
            </Button>
          )}
          
          {taqrirJamai.status === 'under_review' && (
            <Button onClick={handleApprove} disabled={actionsLoading}>
              <CheckCircle className="mr-2 h-4 w-4" /> Approve
            </Button>
          )}
          
          {taqrirJamai.status === 'approved' && (
            <Button onClick={handlePublish} disabled={actionsLoading}>
              <FileText className="mr-2 h-4 w-4" /> Publish
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="taqrirKhass">Taqrir Khass Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1">{formatDate(taqrirJamai.date)}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1">{taqrirJamai.location || 'N/A'}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Organizer</dt>
                  <dd className="mt-1">{taqrirJamai.organizer || 'N/A'}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created On</dt>
                  <dd className="mt-1">{formatDate(taqrirJamai.created_at)}</dd>
                </div>
                
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 whitespace-pre-line">{taqrirJamai.description || 'No description provided.'}</dd>
                </div>
                
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Participants</dt>
                  <dd className="mt-1 whitespace-pre-line">{taqrirJamai.participants || 'No participants information provided.'}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="taqrirKhass" className="space-y-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Taqrir Khass Documents</h2>
            {taqrirJamai.status === 'draft' && (
              <Button onClick={handleAddTaqrirKhass}>
                Add Taqrir Khass
              </Button>
            )}
          </div>
          
          {taqrirKhassList.length === 0 ? (
            <Card>
              <CardContent className="py-6">
                <p className="text-center text-gray-500">
                  No Taqrir Khass documents found. {taqrirJamai.status === 'draft' && 'Click "Add Taqrir Khass" to create one.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {taqrirKhassList.map((taqrirKhass) => (
                <Card key={taqrirKhass.id}>
                  <CardHeader className="py-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{taqrirKhass.title}</CardTitle>
                      <Badge>{taqrirKhass.status.replace('_', ' ')}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="line-clamp-2">{taqrirKhass.nash_masalah || 'No question provided.'}</p>
                  </CardContent>
                  <CardFooter className="py-3 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => handleViewTaqrirKhass(taqrirKhass.id)}>
                      <Eye className="mr-2 h-4 w-4" /> View
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaqrirJamaiDetail; 