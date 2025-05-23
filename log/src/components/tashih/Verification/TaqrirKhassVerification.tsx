import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../ui/use-toast';
import { tashihApi, TaqrirKhass, MushohehVerification } from '../../../lib/api';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Checkbox } from '../../ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';
import { AlertCircle, CheckCircle2, ThumbsDown, ThumbsUp, ArrowLeft, Save, SendIcon, FileCheck } from 'lucide-react';

// Define the component properties
interface VerificationComponentProps {
  title: string;
  content: string;
  isVerified: boolean;
  notes: string;
  originalContent?: string;
  onVerificationChange: (checked: boolean) => void;
  onNotesChange: (notes: string) => void;
}

// Component for each verification section
const VerificationComponent: React.FC<VerificationComponentProps> = ({
  title,
  content,
  isVerified,
  notes,
  originalContent,
  onVerificationChange,
  onNotesChange
}) => {
  return (
    <div className="space-y-4 my-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id={`verify-${title.toLowerCase().replace(/\s/g, '-')}`}
          checked={isVerified}
          onCheckedChange={onVerificationChange}
        />
        <Label 
          htmlFor={`verify-${title.toLowerCase().replace(/\s/g, '-')}`}
          className="font-medium text-lg"
        >
          {isVerified ? <span className="text-green-600">Verified</span> : "Mark as verified"}
        </Label>
      </div>

      <div className="border rounded-md p-4 bg-muted/30">
        <h3 className="font-semibold mb-2">Content to verify:</h3>
        <div className="whitespace-pre-wrap mb-4 font-arabic">{content}</div>
        
        {originalContent && (
          <>
            <h3 className="font-semibold mb-2 mt-4">Original Document:</h3>
            <div className="whitespace-pre-wrap border p-2 rounded mb-4 bg-background font-arabic">
              {originalContent}
            </div>
          </>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor={`notes-${title.toLowerCase().replace(/\s/g, '-')}`}>
          Verification Notes:
        </Label>
        <Textarea
          id={`notes-${title.toLowerCase().replace(/\s/g, '-')}`}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder={`Add notes about the ${title} verification`}
          rows={3}
        />
      </div>
    </div>
  );
};

const TaqrirKhassVerification: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [taqrirKhass, setTaqrirKhass] = useState<TaqrirKhass | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('masalah');
  
  // Verification state
  const [verification, setVerification] = useState<Partial<MushohehVerification>>({
    nash_masalah_verified: false,
    nash_masalah_notes: '',
    khalfiyyah_verified: false,
    khalfiyyah_notes: '',
    munaqashah_verified: false,
    munaqashah_notes: '',
    jawaban_verified: false,
    jawaban_notes: '',
    talil_jawab_verified: false,
    talil_jawab_notes: '',
    referensi_verified: false,
    referensi_notes: '',
    is_approved: false,
    overall_notes: ''
  });
  
  // Load the Taqrir Khass data
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const taqrirKhassData = await tashihApi.getTaqrirKhass(id);
        setTaqrirKhass(taqrirKhassData);
        
        // Check if there's an existing verification for this Taqrir Khass
        const verifications = await tashihApi.getMushohehVerifications(id);
        if (verifications && verifications.length > 0) {
          // Use the most recent verification
          setVerification(verifications[0]);
        }
      } catch (error) {
        console.error('Error loading Taqrir Khass:', error);
        toast({
          title: 'Error',
          description: 'Failed to load document for verification.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, toast]);
  
  // Handle verification form submission
  const handleSubmit = async (approve: boolean = false) => {
    if (!taqrirKhass || !id) return;
    
    setIsSubmitting(true);
    
    try {
      const verificationData = {
        ...verification,
        taqrir_khass: parseInt(id),
        is_approved: approve
      };
      
      let response;
      
      if (verification.id) {
        // Update existing verification
        response = await tashihApi.updateMushohehVerification(verification.id, verificationData);
      } else {
        // Create new verification
        response = await tashihApi.createMushohehVerification(verificationData);
      }
      
      // If approved, complete the verification
      if (approve) {
        await tashihApi.completeMushohehVerification(response.id);
      }
      
      toast({
        title: 'Success',
        description: approve ? 'Document verified and approved.' : 'Verification progress saved.',
      });
      
      if (approve) {
        navigate(`/tashih/taqrir-jamai/${taqrirKhass.taqrir_jamai}`);
      }
    } catch (error) {
      console.error('Error saving verification:', error);
      toast({
        title: 'Error',
        description: 'Failed to save verification.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle going back
  const handleBack = () => {
    if (taqrirKhass) {
      const jamaiId = typeof taqrirKhass.taqrir_jamai === 'object' 
        ? taqrirKhass.taqrir_jamai.id 
        : taqrirKhass.taqrir_jamai;
      navigate(`/tashih/taqrir-jamai/${jamaiId}`);
    } else {
      navigate('/tashih');
    }
  };
  
  // Calculate verification progress
  const calculateProgress = () => {
    if (!taqrirKhass) return 0;
    
    let totalFields = 0;
    let verifiedFields = 0;
    
    // Count required fields that have content
    if (taqrirKhass.nash_masalah) {
      totalFields++;
      if (verification.nash_masalah_verified) verifiedFields++;
    }
    
    if (taqrirKhass.khalfiyyah) {
      totalFields++;
      if (verification.khalfiyyah_verified) verifiedFields++;
    }
    
    if (taqrirKhass.munaqashah) {
      totalFields++;
      if (verification.munaqashah_verified) verifiedFields++;
    }
    
    if (taqrirKhass.jawaban) {
      totalFields++;
      if (verification.jawaban_verified) verifiedFields++;
    }
    
    if (taqrirKhass.talil_jawab) {
      totalFields++;
      if (verification.talil_jawab_verified) verifiedFields++;
    }
    
    if (taqrirKhass.referensi) {
      totalFields++;
      if (verification.referensi_verified) verifiedFields++;
    }
    
    return totalFields === 0 ? 0 : Math.round((verifiedFields / totalFields) * 100);
  };
  
  // Check if all required fields are verified
  const canApprove = () => {
    if (!taqrirKhass) return false;
    
    // Check that all existing fields are verified
    const requiredVerified = [
      { content: taqrirKhass.nash_masalah, verified: verification.nash_masalah_verified },
      { content: taqrirKhass.jawaban, verified: verification.jawaban_verified },
      // Optional fields only need verification if they have content
      { content: taqrirKhass.khalfiyyah, verified: !taqrirKhass.khalfiyyah || verification.khalfiyyah_verified },
      { content: taqrirKhass.munaqashah, verified: !taqrirKhass.munaqashah || verification.munaqashah_verified },
      { content: taqrirKhass.talil_jawab, verified: !taqrirKhass.talil_jawab || verification.talil_jawab_verified },
      { content: taqrirKhass.referensi, verified: !taqrirKhass.referensi || verification.referensi_verified }
    ];
    
    return requiredVerified.every(field => !field.content || field.verified);
  };
  
  // If loading or no data
  if (isLoading) {
    return (
      <div className="h-48 flex items-center justify-center">
        <p>Loading verification interface...</p>
      </div>
    );
  }
  
  if (!taqrirKhass) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Document not found or you do not have permission to verify it.
        </AlertDescription>
      </Alert>
    );
  }
  
  const progress = calculateProgress();
  
  return (
    <div className="container py-6 mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Verify Taqrir Khass</h1>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{taqrirKhass.title}</CardTitle>
          <CardDescription>
            Verification Progress: {progress}%
            
            <div className="w-full bg-muted rounded-full h-2.5 mt-2">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
              <TabsTrigger value="masalah" className="relative">
                Nash Masalah
                {verification.nash_masalah_verified && (
                  <CheckCircle2 className="h-3 w-3 absolute top-0.5 right-0.5 text-green-600" />
                )}
              </TabsTrigger>
              <TabsTrigger value="khalfiyyah" className="relative">
                Khalfiyyah
                {verification.khalfiyyah_verified && (
                  <CheckCircle2 className="h-3 w-3 absolute top-0.5 right-0.5 text-green-600" />
                )}
              </TabsTrigger>
              <TabsTrigger value="munaqashah" className="relative">
                Munaqashah
                {verification.munaqashah_verified && (
                  <CheckCircle2 className="h-3 w-3 absolute top-0.5 right-0.5 text-green-600" />
                )}
              </TabsTrigger>
              <TabsTrigger value="jawaban" className="relative">
                Jawaban
                {verification.jawaban_verified && (
                  <CheckCircle2 className="h-3 w-3 absolute top-0.5 right-0.5 text-green-600" />
                )}
              </TabsTrigger>
              <TabsTrigger value="talil" className="relative">
                Ta'lil Jawab
                {verification.talil_jawab_verified && (
                  <CheckCircle2 className="h-3 w-3 absolute top-0.5 right-0.5 text-green-600" />
                )}
              </TabsTrigger>
              <TabsTrigger value="referensi" className="relative">
                Referensi
                {verification.referensi_verified && (
                  <CheckCircle2 className="h-3 w-3 absolute top-0.5 right-0.5 text-green-600" />
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="masalah">
              <VerificationComponent
                title="Nash Masalah (Question)"
                content={taqrirKhass.nash_masalah || "No content provided"}
                isVerified={verification.nash_masalah_verified || false}
                notes={verification.nash_masalah_notes || ""}
                onVerificationChange={(checked) => setVerification(prev => ({ ...prev, nash_masalah_verified: checked }))}
                onNotesChange={(notes) => setVerification(prev => ({ ...prev, nash_masalah_notes: notes }))}
              />
            </TabsContent>
            
            <TabsContent value="khalfiyyah">
              <VerificationComponent
                title="Khalfiyyah (Context)"
                content={taqrirKhass.khalfiyyah || "No context provided"}
                isVerified={verification.khalfiyyah_verified || false}
                notes={verification.khalfiyyah_notes || ""}
                onVerificationChange={(checked) => setVerification(prev => ({ ...prev, khalfiyyah_verified: checked }))}
                onNotesChange={(notes) => setVerification(prev => ({ ...prev, khalfiyyah_notes: notes }))}
              />
            </TabsContent>
            
            <TabsContent value="munaqashah">
              <VerificationComponent
                title="Munaqashah (Discussion)"
                content={taqrirKhass.munaqashah || "No discussion provided"}
                isVerified={verification.munaqashah_verified || false}
                notes={verification.munaqashah_notes || ""}
                onVerificationChange={(checked) => setVerification(prev => ({ ...prev, munaqashah_verified: checked }))}
                onNotesChange={(notes) => setVerification(prev => ({ ...prev, munaqashah_notes: notes }))}
              />
            </TabsContent>
            
            <TabsContent value="jawaban">
              <VerificationComponent
                title="Jawaban (Conclusion)"
                content={taqrirKhass.jawaban || "No answer provided"}
                isVerified={verification.jawaban_verified || false}
                notes={verification.jawaban_notes || ""}
                onVerificationChange={(checked) => setVerification(prev => ({ ...prev, jawaban_verified: checked }))}
                onNotesChange={(notes) => setVerification(prev => ({ ...prev, jawaban_notes: notes }))}
              />
            </TabsContent>
            
            <TabsContent value="talil">
              <VerificationComponent
                title="Ta'lil Jawab (Legal Reasoning)"
                content={taqrirKhass.talil_jawab || "No reasoning provided"}
                isVerified={verification.talil_jawab_verified || false}
                notes={verification.talil_jawab_notes || ""}
                onVerificationChange={(checked) => setVerification(prev => ({ ...prev, talil_jawab_verified: checked }))}
                onNotesChange={(notes) => setVerification(prev => ({ ...prev, talil_jawab_notes: notes }))}
              />
            </TabsContent>
            
            <TabsContent value="referensi">
              <VerificationComponent
                title="Referensi (References)"
                content={taqrirKhass.referensi || "No references provided"}
                isVerified={verification.referensi_verified || false}
                notes={verification.referensi_notes || ""}
                onVerificationChange={(checked) => setVerification(prev => ({ ...prev, referensi_verified: checked }))}
                onNotesChange={(notes) => setVerification(prev => ({ ...prev, referensi_notes: notes }))}
              />
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="overall_notes">
                Overall Verification Notes:
              </Label>
              <Textarea
                id="overall_notes"
                value={verification.overall_notes || ""}
                onChange={(e) => setVerification(prev => ({ ...prev, overall_notes: e.target.value }))}
                placeholder="Add any overall notes about this verification"
                rows={4}
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            disabled={isSubmitting}
            onClick={() => handleSubmit(false)}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Progress
          </Button>
          
          <div className="space-x-2">
            <Button
              variant="destructive"
              disabled={isSubmitting}
              onClick={() => {
                navigate(`/tashih/taqrir-khass/${id}/request-revision`);
              }}
            >
              <ThumbsDown className="mr-2 h-4 w-4" />
              Request Revision
            </Button>
            
            <Button
              disabled={!canApprove() || isSubmitting}
              onClick={() => handleSubmit(true)}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Approve Document
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TaqrirKhassVerification; 