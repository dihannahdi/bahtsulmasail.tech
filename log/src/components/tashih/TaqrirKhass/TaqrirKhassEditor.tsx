import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { Alert, AlertDescription } from '../../ui/alert';
import { Separator } from '../../ui/separator';

interface TaqrirKhassFormData {
  title: string;
  nash_masalah: string;
  jawaban: string;
  talil_jawab: string;
  referensi: string;
}

interface TaqrirKhassEditorProps {
  taqrirKhassId?: number;
  taqrirJamaiId: number;
  onSave?: (data: any) => void;
  isReadOnly?: boolean;
}

const TaqrirKhassEditor: React.FC<TaqrirKhassEditorProps> = ({
  taqrirKhassId,
  taqrirJamaiId,
  onSave,
  isReadOnly = false,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('nash_masalah');

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<TaqrirKhassFormData>();

  // Fetch data if editing an existing TaqrirKhass
  useEffect(() => {
    const fetchTaqrirKhass = async () => {
      if (!taqrirKhassId) return;

      setLoading(true);
      try {
        const response = await axios.get(`/api/taqrir-khass/${taqrirKhassId}/`);
        const data = response.data;
        
        // Set form values
        setValue('title', data.title);
        setValue('nash_masalah', data.nash_masalah);
        setValue('jawaban', data.jawaban);
        setValue('talil_jawab', data.talil_jawab);
        setValue('referensi', data.referensi);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load Taqrir Khass data');
        setLoading(false);
      }
    };

    fetchTaqrirKhass();
  }, [taqrirKhassId, setValue]);

  const onSubmit = async (data: TaqrirKhassFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let response;
      
      if (taqrirKhassId) {
        // Update existing
        response = await axios.put(`/api/taqrir-khass/${taqrirKhassId}/`, {
          ...data,
          taqrir_jamai: taqrirJamaiId
        });
      } else {
        // Create new
        response = await axios.post('/api/taqrir-khass/', {
          ...data,
          taqrir_jamai: taqrirJamaiId
        });
      }

      setSuccess('Taqrir Khass saved successfully');
      if (onSave) onSave(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to save Taqrir Khass');
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{taqrirKhassId ? 'Edit Taqrir Khass' : 'Create New Taqrir Khass'}</CardTitle>
        <CardDescription>
          {isReadOnly 
            ? 'View the details of this Taqrir Khass document' 
            : 'Enter the details for this Taqrir Khass document'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
              disabled={loading || isReadOnly}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          
          <Separator />
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="nash_masalah">Nash Masalah</TabsTrigger>
              <TabsTrigger value="jawaban">Jawaban</TabsTrigger>
              <TabsTrigger value="talil_jawab">Talil Jawab</TabsTrigger>
              <TabsTrigger value="referensi">Referensi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="nash_masalah" className="space-y-2">
              <Label htmlFor="nash_masalah">Nash Masalah (Question/Issue)</Label>
              <Textarea
                id="nash_masalah"
                {...register('nash_masalah', { required: 'Nash Masalah is required' })}
                rows={8}
                disabled={loading || isReadOnly}
                className={errors.nash_masalah ? 'border-red-500' : ''}
              />
              {errors.nash_masalah && <p className="text-red-500 text-sm">{errors.nash_masalah.message}</p>}
            </TabsContent>
            
            <TabsContent value="jawaban" className="space-y-2">
              <Label htmlFor="jawaban">Jawaban (Answer)</Label>
              <Textarea
                id="jawaban"
                {...register('jawaban', { required: 'Jawaban is required' })}
                rows={8}
                disabled={loading || isReadOnly}
                className={errors.jawaban ? 'border-red-500' : ''}
              />
              {errors.jawaban && <p className="text-red-500 text-sm">{errors.jawaban.message}</p>}
            </TabsContent>
            
            <TabsContent value="talil_jawab" className="space-y-2">
              <Label htmlFor="talil_jawab">Talil Jawab (Reasoning)</Label>
              <Textarea
                id="talil_jawab"
                {...register('talil_jawab')}
                rows={8}
                disabled={loading || isReadOnly}
                className={errors.talil_jawab ? 'border-red-500' : ''}
              />
              {errors.talil_jawab && <p className="text-red-500 text-sm">{errors.talil_jawab.message}</p>}
            </TabsContent>
            
            <TabsContent value="referensi" className="space-y-2">
              <Label htmlFor="referensi">Referensi (References)</Label>
              <Textarea
                id="referensi"
                {...register('referensi')}
                rows={8}
                disabled={loading || isReadOnly}
                className={errors.referensi ? 'border-red-500' : ''}
              />
              {errors.referensi && <p className="text-red-500 text-sm">{errors.referensi.message}</p>}
            </TabsContent>
          </Tabs>
        </CardContent>
        
        {!isReadOnly && (
          <CardFooter className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => reset()} 
              disabled={loading}
            >
              Reset
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Taqrir Khass'}
            </Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
};

export default TaqrirKhassEditor; 