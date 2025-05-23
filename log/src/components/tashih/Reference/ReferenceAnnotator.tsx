import React, { useState, useEffect } from 'react';
import { tashihApi, ReferenceAnnotation, TaqrirKhass } from '../../../lib/api';
import { useToast } from '../../ui/use-toast';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { AlertCircle, CheckCircle2, BookOpen, AlertTriangle, Link, Edit, Save, Plus } from 'lucide-react';
import { ScrollArea } from '../../ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../ui/dialog";

interface ReferenceAnnotatorProps {
  taqrirKhassId: number;
  readOnly?: boolean;
}

const ReferenceAnnotator: React.FC<ReferenceAnnotatorProps> = ({
  taqrirKhassId,
  readOnly = false
}) => {
  const { toast } = useToast();
  const [taqrirKhass, setTaqrirKhass] = useState<TaqrirKhass | null>(null);
  const [annotations, setAnnotations] = useState<ReferenceAnnotation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('referensi');
  
  // Reference annotation form state
  const [isAddingReference, setIsAddingReference] = useState(false);
  const [currentAnnotation, setCurrentAnnotation] = useState<Partial<ReferenceAnnotation>>({
    text: '',
    reference_type: 'book',
    source: '',
    verification_status: 'unverified',
    verification_notes: '',
    section: 'referensi',
  });
  
  // Get TaqrirKhass and annotations
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch TaqrirKhass
        const taqrirKhassData = await tashihApi.getTaqrirKhass(taqrirKhassId);
        setTaqrirKhass(taqrirKhassData);
        
        // Fetch annotations
        const annotationsData = await tashihApi.getReferenceAnnotations(taqrirKhassId);
        setAnnotations(annotationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load document references.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [taqrirKhassId, toast]);
  
  // Handle form change for annotation
  const handleAnnotationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentAnnotation(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle select change for annotation
  const handleSelectChange = (name: string, value: string) => {
    setCurrentAnnotation(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle section change
  const handleSectionChange = (section: string) => {
    setActiveTab(section);
    setCurrentAnnotation(prev => ({
      ...prev,
      section
    }));
  };
  
  // Save annotation
  const handleSaveAnnotation = async () => {
    if (!currentAnnotation.text || !currentAnnotation.source) {
      toast({
        title: 'Validation Error',
        description: 'Please provide the reference text and source.',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      const payload = {
        ...currentAnnotation,
        taqrir_khass: taqrirKhassId
      };
      
      let response;
      if (currentAnnotation.id) {
        // Update existing annotation
        response = await tashihApi.updateReferenceAnnotation(currentAnnotation.id, payload);
        setAnnotations(prev => prev.map(a => a.id === currentAnnotation.id ? response : a));
      } else {
        // Create new annotation
        response = await tashihApi.createReferenceAnnotation(payload);
        setAnnotations(prev => [...prev, response]);
      }
      
      // Reset form and close dialog
      setCurrentAnnotation({
        text: '',
        reference_type: 'book',
        source: '',
        verification_status: 'unverified',
        verification_notes: '',
        section: activeTab,
      });
      setIsAddingReference(false);
      
      toast({
        title: 'Success',
        description: 'Reference annotation saved successfully.',
      });
    } catch (error) {
      console.error('Error saving annotation:', error);
      toast({
        title: 'Error',
        description: 'Failed to save reference annotation.',
        variant: 'destructive'
      });
    }
  };
  
  // Verify annotation
  const handleVerifyAnnotation = async (id: number, status: 'verified' | 'incorrect') => {
    try {
      const notes = annotations.find(a => a.id === id)?.verification_notes || '';
      const response = await tashihApi.verifyReferenceAnnotation(id, status, notes);
      
      // Update annotations list
      setAnnotations(prev => prev.map(a => a.id === id ? response : a));
      
      toast({
        title: 'Success',
        description: `Reference ${status === 'verified' ? 'verified' : 'marked as incorrect'}.`,
      });
    } catch (error) {
      console.error('Error verifying annotation:', error);
      toast({
        title: 'Error',
        description: 'Failed to update reference verification status.',
        variant: 'destructive'
      });
    }
  };
  
  // Edit annotation
  const handleEditAnnotation = (annotation: ReferenceAnnotation) => {
    setCurrentAnnotation(annotation);
    setIsAddingReference(true);
  };
  
  // Filter annotations by section
  const filteredAnnotations = annotations.filter(a => a.section === activeTab);
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <Badge variant="success" className="flex items-center">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case 'incorrect':
        return (
          <Badge variant="destructive" className="flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Incorrect
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            Unverified
          </Badge>
        );
    }
  };
  
  if (isLoading) {
    return <div className="p-4 text-center">Loading references...</div>;
  }
  
  if (!taqrirKhass) {
    return (
      <div className="p-4 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
        <p className="mt-2">Error loading document. Please try again.</p>
      </div>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Reference Verification</CardTitle>
        <CardDescription>
          Verify and annotate references in the document
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleSectionChange}>
          <TabsList className="mb-4 grid w-full grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="referensi" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>References</span>
            </TabsTrigger>
            <TabsTrigger value="nash_masalah" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Nash Masalah</span>
            </TabsTrigger>
            <TabsTrigger value="khalfiyyah" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Khalfiyyah</span>
            </TabsTrigger>
            <TabsTrigger value="munaqashah" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Munaqashah</span>
            </TabsTrigger>
            <TabsTrigger value="jawaban" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Jawaban</span>
            </TabsTrigger>
            <TabsTrigger value="talil_jawab" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Ta'lil</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="referensi" className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg border text-sm mb-6">
              <h3 className="font-semibold mb-2">Reference Section Content:</h3>
              <div className={taqrirKhass.referensi ? "whitespace-pre-wrap" : "text-muted-foreground italic"}>
                {taqrirKhass.referensi || 'No reference content available.'}
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Reference Annotations</h3>
              {!readOnly && (
                <Button 
                  onClick={() => {
                    setCurrentAnnotation({
                      text: '',
                      reference_type: 'book',
                      source: '',
                      verification_status: 'unverified',
                      verification_notes: '',
                      section: activeTab,
                    });
                    setIsAddingReference(true);
                  }}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reference
                </Button>
              )}
            </div>
            
            {filteredAnnotations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto opacity-50" />
                <p className="mt-2">No reference annotations found in this section.</p>
                {!readOnly && (
                  <p className="mt-1">Click "Add Reference" to create one.</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAnnotations.map(annotation => (
                  <Card key={annotation.id} className="overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-muted/50">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{annotation.reference_type}</span>
                        {getStatusBadge(annotation.verification_status)}
                      </div>
                      
                      {!readOnly && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleEditAnnotation(annotation)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs text-muted-foreground">Reference Text</Label>
                          <p className="text-sm font-arabic whitespace-pre-wrap border-l-2 pl-2 py-1">
                            {annotation.text}
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-xs text-muted-foreground">Source</Label>
                          <p className="text-sm font-medium">{annotation.source}</p>
                        </div>
                        
                        {annotation.verification_notes && (
                          <div>
                            <Label className="text-xs text-muted-foreground">Verification Notes</Label>
                            <p className="text-sm">{annotation.verification_notes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    
                    {!readOnly && annotation.verification_status === 'unverified' && (
                      <CardFooter className="border-t px-4 py-2 flex justify-end gap-2 bg-muted/10">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-destructive" 
                          onClick={() => handleVerifyAnnotation(annotation.id, 'incorrect')}
                        >
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Incorrect
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-green-600" 
                          onClick={() => handleVerifyAnnotation(annotation.id, 'verified')}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Verify
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="nash_masalah" className="space-y-4">
            <div className="bg-muted/30 p-4 rounded-lg border text-sm mb-6">
              <h3 className="font-semibold mb-2">Nash Masalah Content:</h3>
              <div className={taqrirKhass.nash_masalah ? "whitespace-pre-wrap" : "text-muted-foreground italic"}>
                {taqrirKhass.nash_masalah || 'No content available.'}
              </div>
            </div>
            
            {/* Same annotation list logic as above, but filtered for nash_masalah */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Reference Annotations</h3>
              {!readOnly && (
                <Button 
                  onClick={() => {
                    setCurrentAnnotation({
                      text: '',
                      reference_type: 'book',
                      source: '',
                      verification_status: 'unverified',
                      verification_notes: '',
                      section: activeTab,
                    });
                    setIsAddingReference(true);
                  }}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reference
                </Button>
              )}
            </div>
            
            {filteredAnnotations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto opacity-50" />
                <p className="mt-2">No reference annotations found in this section.</p>
                {!readOnly && (
                  <p className="mt-1">Click "Add Reference" to create one.</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Same annotation cards as above */}
                {filteredAnnotations.map(annotation => (
                  <Card key={annotation.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <div className="flex items-center justify-between px-4 py-2 bg-muted/50">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{annotation.reference_type}</span>
                        {getStatusBadge(annotation.verification_status)}
                      </div>
                      
                      {!readOnly && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleEditAnnotation(annotation)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs text-muted-foreground">Reference Text</Label>
                          <p className="text-sm font-arabic whitespace-pre-wrap border-l-2 pl-2 py-1">
                            {annotation.text}
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-xs text-muted-foreground">Source</Label>
                          <p className="text-sm font-medium">{annotation.source}</p>
                        </div>
                        
                        {annotation.verification_notes && (
                          <div>
                            <Label className="text-xs text-muted-foreground">Verification Notes</Label>
                            <p className="text-sm">{annotation.verification_notes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    
                    {!readOnly && annotation.verification_status === 'unverified' && (
                      <CardFooter className="border-t px-4 py-2 flex justify-end gap-2 bg-muted/10">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-destructive" 
                          onClick={() => handleVerifyAnnotation(annotation.id, 'incorrect')}
                        >
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Incorrect
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-green-600" 
                          onClick={() => handleVerifyAnnotation(annotation.id, 'verified')}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Verify
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Similar TabsContent for remaining tabs: khalfiyyah, munaqashah, jawaban, talil_jawab */}
        </Tabs>
      </CardContent>
      
      {/* Reference Annotation Dialog */}
      <Dialog open={isAddingReference} onOpenChange={setIsAddingReference}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentAnnotation.id ? 'Edit Reference' : 'Add Reference'}</DialogTitle>
            <DialogDescription>
              Annotate and verify references found in this document.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reference_type" className="text-right">
                Type
              </Label>
              <div className="col-span-3">
                <Select
                  value={currentAnnotation.reference_type}
                  onValueChange={(value) => handleSelectChange('reference_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quran">Qur'an</SelectItem>
                    <SelectItem value="hadith">Hadith</SelectItem>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Text
              </Label>
              <Textarea
                id="text"
                name="text"
                value={currentAnnotation.text}
                onChange={handleAnnotationChange}
                placeholder="Enter the exact reference text"
                className="col-span-3"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="source" className="text-right">
                Source
              </Label>
              <Input
                id="source"
                name="source"
                value={currentAnnotation.source}
                onChange={handleAnnotationChange}
                placeholder="Enter the source e.g., Surah Al-Baqarah 2:255"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="verification_notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="verification_notes"
                name="verification_notes"
                value={currentAnnotation.verification_notes}
                onChange={handleAnnotationChange}
                placeholder="Add any verification notes or comments"
                className="col-span-3"
                rows={2}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveAnnotation}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ReferenceAnnotator; 