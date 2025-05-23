import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { documentApi } from '../../lib/api';
import { useToast } from '../ui/use-toast';

interface DocumentEditFormProps {
  document: any; // Use your document type here
  onSave: (updatedDoc: any) => void;
  onCancel?: () => void;
}

export function DocumentEditForm({ document, onSave, onCancel }: DocumentEditFormProps) {
  const [docData, setDocData] = useState(document);
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  // Update the form when the document changes
  useEffect(() => {
    setDocData(document);
  }, [document]);
  
  const handleChange = (field: string, value: any) => {
    setDocData({
      ...docData,
      [field]: value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Call API to update the document
      // This would typically be a PATCH request to the API
      const updatedDoc = await documentApi.updateDocument(docData.id, docData);
      
      toast({
        title: "Success",
        description: "Document updated successfully",
      });
      
      onSave(updatedDoc);
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating the document. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="approval">Approval Process</TabsTrigger>
          <TabsTrigger value="publish">Publishing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card className="p-4 space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={docData.title || ''} 
                onChange={(e) => handleChange('title', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="author">Author</Label>
              <Input 
                id="author" 
                value={docData.author || ''} 
                onChange={(e) => handleChange('author', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="source">Source</Label>
              <Input 
                id="source" 
                value={docData.source || ''} 
                onChange={(e) => handleChange('source', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="isBahtsulMasail"
                checked={docData.is_bahtsul_masail || false}
                onCheckedChange={(checked) => handleChange('is_bahtsul_masail', checked)}
              />
              <Label htmlFor="isBahtsulMasail">
                This is a Bahtsul Masail document
              </Label>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4 mt-4">
          {docData.is_bahtsul_masail ? (
            <BahtsulMasailForm docData={docData} onChange={handleChange} />
          ) : (
            <StandardDocForm docData={docData} onChange={handleChange} />
          )}
        </TabsContent>
        
        <TabsContent value="approval" className="space-y-4 mt-4">
          <Card className="p-4 space-y-4">
            <div>
              <Label htmlFor="approval_status">Approval Status</Label>
              <div className="mt-1 p-2 border rounded bg-muted">
                {docData.approval_status || 'draft'}
              </div>
            </div>
            
            {docData.approved_by && (
              <div>
                <Label>Approved By</Label>
                <div className="mt-1 p-2 border rounded bg-muted">
                  {docData.approved_by.username} on {new Date(docData.approval_date).toLocaleString()}
                </div>
              </div>
            )}
            
            {docData.rejection_reason && (
              <div>
                <Label>Rejection Reason</Label>
                <div className="mt-1 p-2 border rounded bg-muted">
                  {docData.rejection_reason}
                </div>
              </div>
            )}
            
            {docData.revision_notes && (
              <div>
                <Label>Revision Notes</Label>
                <div className="mt-1 p-2 border rounded bg-muted">
                  {docData.revision_notes}
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="publish" className="space-y-4 mt-4">
          <Card className="p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="isPublic"
                checked={docData.is_public || false}
                onCheckedChange={(checked) => handleChange('is_public', checked)}
              />
              <Label htmlFor="isPublic">
                Document is publicly accessible
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="isFeatured"
                checked={docData.is_featured || false}
                onCheckedChange={(checked) => handleChange('is_featured', checked)}
              />
              <Label htmlFor="isFeatured">
                Featured document
              </Label>
            </div>
            
            {docData.is_featured && (
              <div>
                <Label htmlFor="featured_order">Featured Order</Label>
                <Input 
                  id="featured_order"
                  type="number" 
                  value={docData.featured_order || 0} 
                  onChange={(e) => handleChange('featured_order', parseInt(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Lower numbers appear first
                </p>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}

function StandardDocForm({ docData, onChange }: { docData: any, onChange: (field: string, value: any) => void }) {
  return (
    <Card className="p-4 space-y-4">
      <div>
        <Label htmlFor="question">Question</Label>
        <Textarea
          id="question"
          value={docData.question || ''}
          onChange={(e) => onChange('question', e.target.value)}
          className="mt-1 min-h-[100px]"
        />
      </div>
      
      <div>
        <Label htmlFor="answer">Answer</Label>
        <Textarea
          id="answer"
          value={docData.answer || ''}
          onChange={(e) => onChange('answer', e.target.value)}
          className="mt-1 min-h-[200px]"
        />
      </div>
      
      <div>
        <Label htmlFor="dalil">Dalil (Evidence)</Label>
        <Textarea
          id="dalil"
          value={docData.dalil || ''}
          onChange={(e) => onChange('dalil', e.target.value)}
          className="mt-1 min-h-[100px]"
        />
      </div>
      
      <div>
        <Label htmlFor="dalil_arabic">Dalil in Arabic</Label>
        <Textarea
          id="dalil_arabic"
          value={docData.dalil_arabic || ''}
          onChange={(e) => onChange('dalil_arabic', e.target.value)}
          className="mt-1 min-h-[100px]"
          dir="rtl"
        />
      </div>
      
      <div>
        <Label htmlFor="mushoheh_verification">Mushoheh Verification</Label>
        <Textarea
          id="mushoheh_verification"
          value={docData.mushoheh_verification || ''}
          onChange={(e) => onChange('mushoheh_verification', e.target.value)}
          className="mt-1 min-h-[100px]"
        />
      </div>
    </Card>
  );
}

function BahtsulMasailForm({ docData, onChange }: { docData: any, onChange: (field: string, value: any) => void }) {
  return (
    <div className="space-y-4">
      <Card className="p-4 space-y-4">
        <div>
          <Label htmlFor="judul_bahtsul_masail">Judul Bahtsul Masail</Label>
          <Textarea
            id="judul_bahtsul_masail"
            value={docData.judul_bahtsul_masail || ''}
            onChange={(e) => onChange('judul_bahtsul_masail', e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="muqaddimah">Muqaddimah (Pendahuluan)</Label>
          <Textarea
            id="muqaddimah"
            value={docData.muqaddimah || ''}
            onChange={(e) => onChange('muqaddimah', e.target.value)}
            className="mt-1 min-h-[100px]"
          />
        </div>
      </Card>
      
      <Card className="p-4 space-y-4">
        <div>
          <Label htmlFor="nash_masalah">Nash al-Mas'alah (Redaksi Masalah)</Label>
          <Textarea
            id="nash_masalah"
            value={docData.nash_masalah || ''}
            onChange={(e) => onChange('nash_masalah', e.target.value)}
            className="mt-1 min-h-[100px]"
          />
        </div>
        
        <div>
          <Label htmlFor="jawaban">Jawaban (Al-Jawab)</Label>
          <Textarea
            id="jawaban"
            value={docData.jawaban || ''}
            onChange={(e) => onChange('jawaban', e.target.value)}
            className="mt-1 min-h-[150px]"
          />
        </div>
        
        <div>
          <Label htmlFor="talil_jawab">Ta'lil al-Jawab (Argumentasi)</Label>
          <Textarea
            id="talil_jawab"
            value={docData.talil_jawab || ''}
            onChange={(e) => onChange('talil_jawab', e.target.value)}
            className="mt-1 min-h-[150px]"
          />
        </div>
      </Card>
      
      <Card className="p-4 space-y-4">
        <div>
          <Label htmlFor="referensi">Referensi (Al-Maraji')</Label>
          <Textarea
            id="referensi"
            value={docData.referensi || ''}
            onChange={(e) => onChange('referensi', e.target.value)}
            className="mt-1 min-h-[100px]"
          />
        </div>
        
        <div>
          <Label htmlFor="hadirin">Hadirin (Al-Hadhirin)</Label>
          <Textarea
            id="hadirin"
            value={docData.hadirin || ''}
            onChange={(e) => onChange('hadirin', e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="panitia">Panitia (Al-Lajnah)</Label>
          <Textarea
            id="panitia"
            value={docData.panitia || ''}
            onChange={(e) => onChange('panitia', e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="tanggal_tempat">Tanggal dan Tempat</Label>
          <Textarea
            id="tanggal_tempat"
            value={docData.tanggal_tempat || ''}
            onChange={(e) => onChange('tanggal_tempat', e.target.value)}
            className="mt-1"
          />
        </div>
      </Card>
    </div>
  );
} 