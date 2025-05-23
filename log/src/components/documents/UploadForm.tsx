import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { documentApi } from '../../lib/api';
import { useToast } from '../ui/use-toast';

export function DocumentUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [source, setSource] = useState('');
  const [docType, setDocType] = useState('standard'); // 'standard' or 'bahtsul_masail'
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }
    
    if (!title) {
      toast({
        title: "Error",
        description: "Document title is required",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('author', author);
      formData.append('source', source);
      formData.append('is_bahtsul_masail', docType === 'bahtsul_masail' ? 'true' : 'false');
      
      const response = await documentApi.uploadDocument(formData);
      
      toast({
        title: "Success",
        description: "Document uploaded successfully. It will be processed in the background.",
      });
      
      // Reset form
      setFile(null);
      setTitle('');
      setAuthor('');
      setSource('');
      setDocType('standard');
      
      // Redirect to document detail if needed
      // navigate(`/documents/${response.id}`);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your document. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>
          Upload a document for processing. Supported formats: PDF, DOCX, TXT.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Document Title *</Label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input 
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Document author"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input 
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Where this document is from"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="docType">Document Type</Label>
            <Select 
              value={docType}
              onValueChange={(value) => setDocType(value)}
            >
              <SelectTrigger id="docType">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Document</SelectItem>
                <SelectItem value="bahtsul_masail">Bahtsul Masail</SelectItem>
              </SelectContent>
            </Select>
            {docType === 'bahtsul_masail' && (
              <p className="text-xs text-muted-foreground mt-1">
                Bahtsul Masail documents will be processed to extract specific sections like Nash al-Mas'alah, Jawaban, Ta'lil, etc.
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Document File *</Label>
            <Input 
              id="file"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt"
              required
            />
            <p className="text-xs text-muted-foreground">
              Maximum file size: 10MB
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 