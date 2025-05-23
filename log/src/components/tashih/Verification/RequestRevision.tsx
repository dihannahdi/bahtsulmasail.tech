import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../ui/use-toast';
import { tashihApi, TaqrirKhass } from '../../../lib/api';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import { AlertCircle, ArrowLeft, Send, X } from 'lucide-react';

const RequestRevision: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [taqrirKhass, setTaqrirKhass] = useState<TaqrirKhass | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notes, setNotes] = useState('');
  
  // Load the Taqrir Khass data
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const taqrirKhassData = await tashihApi.getTaqrirKhass(id);
        setTaqrirKhass(taqrirKhassData);
      } catch (error) {
        console.error('Error loading Taqrir Khass:', error);
        toast({
          title: 'Error',
          description: 'Failed to load document for revision request.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, toast]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!notes.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide revision notes.',
        variant: 'destructive'
      });
      return;
    }
    
    if (!taqrirKhass || !id) return;
    
    setIsSubmitting(true);
    
    try {
      await tashihApi.requestTaqrirKhassRevision(id, notes);
      
      toast({
        title: 'Success',
        description: 'Revision request has been sent.',
      });
      
      // Navigate back to the verification dashboard
      navigate('/tashih/verification');
    } catch (error) {
      console.error('Error requesting revision:', error);
      toast({
        title: 'Error',
        description: 'Failed to send revision request.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle cancellation
  const handleCancel = () => {
    navigate(`/tashih/taqrir-khass/${id}/verify`);
  };
  
  // If loading or no data
  if (isLoading) {
    return (
      <div className="h-48 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!taqrirKhass) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Document not found or you do not have permission to request revisions.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container py-6 mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleCancel} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Verification
        </Button>
        <h1 className="text-2xl font-bold">Request Revision</h1>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{taqrirKhass.title}</CardTitle>
          <CardDescription>
            Provide detailed feedback on what needs to be improved or corrected.
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="revision-notes" className="text-base font-medium">
                Revision Notes <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="revision-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Explain what needs to be revised and why. Be specific about which parts need improvement."
                rows={10}
                className="resize-y"
                required
              />
            </div>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                This will mark the document as "Needs Revision" and notify the author. They will need to make changes and resubmit for verification.
              </AlertDescription>
            </Alert>
          </CardContent>
          
          <CardFooter className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            
            <Button 
              type="submit"
              disabled={isSubmitting || !notes.trim()}
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Sending...' : 'Request Revision'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RequestRevision; 