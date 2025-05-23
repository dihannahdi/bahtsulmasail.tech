import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tashihApi, TaqrirKhass } from '../../../lib/api';
import { useToast } from '../../ui/use-toast';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { SaveIcon, XIcon, FileText, Edit3, BookOpen } from 'lucide-react';
import { Switch } from '../../ui/switch';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

interface TaqrirKhassFormProps {
  taqrirJamaiId: number;
  taqrirKhass?: TaqrirKhass;
  isEdit?: boolean;
  onSaved?: (taqrirKhass: TaqrirKhass) => void;
}

const TaqrirKhassForm: React.FC<TaqrirKhassFormProps> = ({
  taqrirJamaiId,
  taqrirKhass,
  isEdit = false,
  onSaved
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('masalah');
  
  const initialState = {
    taqrir_jamai: taqrirJamaiId,
    title: '',
    order: 0,
    nash_masalah: '',
    khalfiyyah: '',
    munaqashah: '',
    jawaban: '',
    talil_jawab: '',
    referensi: '',
    requires_rtl: false,
    ...taqrirKhass
  };
  
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showArabicKeyboardInfo, setShowArabicKeyboardInfo] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.nash_masalah.trim()) {
      newErrors.nash_masalah = 'Question/Issue description is required';
    }
    
    if (!formData.jawaban.trim()) {
      newErrors.jawaban = 'Answer/resolution is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please correct the errors in the form.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let response;
      
      if (isEdit && taqrirKhass?.id) {
        response = await tashihApi.updateTaqrirKhass(taqrirKhass.id, formData);
        toast({
          title: 'Success',
          description: 'Taqrir Khass updated successfully.',
        });
      } else {
        response = await tashihApi.createTaqrirKhass(formData);
        toast({
          title: 'Success',
          description: 'Taqrir Khass created successfully.',
        });
      }
      
      if (onSaved) {
        onSaved(response);
      } else {
        navigate(`/tashih/taqrir-jamai/${taqrirJamaiId}`);
      }
    } catch (error) {
      console.error('Error saving Taqrir Khass:', error);
      toast({
        title: 'Error',
        description: 'Failed to save Taqrir Khass. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/tashih/taqrir-jamai/${taqrirJamaiId}`);
  };
  
  const toggleArabicKeyboardInfo = () => {
    setShowArabicKeyboardInfo(prev => !prev);
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Taqrir Khass' : 'Create New Taqrir Khass'}</CardTitle>
        <CardDescription>
          Document the details of this specific legal discussion
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className={errors.title ? 'text-destructive' : ''}>
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the title of this discussion"
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="order">Order</Label>
            <Input
              id="order"
              name="order"
              type="number"
              min="0"
              value={formData.order.toString()}
              onChange={handleChange}
              placeholder="Enter the display order (0, 1, 2, etc.)"
            />
            <p className="text-xs text-muted-foreground">
              The order this document appears in the collection
            </p>
          </div>
          
          <div className="flex items-center space-x-2 pt-4">
            <Switch
              id="requires_rtl"
              checked={formData.requires_rtl}
              onCheckedChange={(checked) => handleSwitchChange('requires_rtl', checked)}
            />
            <Label htmlFor="requires_rtl" className="cursor-pointer">
              Contains Arabic text (enable RTL support)
            </Label>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={toggleArabicKeyboardInfo}
            >
              <AlertCircle className="h-4 w-4" />
            </Button>
          </div>
          
          {showArabicKeyboardInfo && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Arabic Text Input</AlertTitle>
              <AlertDescription>
                For Arabic text input, you can use your operating system's built-in virtual keyboard 
                or install an Arabic keyboard layout. Alternatively, you can copy and paste 
                Arabic text from other sources.
              </AlertDescription>
            </Alert>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full pt-4">
            <TabsList className="grid grid-cols-3 mb-4 md:grid-cols-6">
              <TabsTrigger value="masalah" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Nash Masalah</span>
                <span className="inline md:hidden">Question</span>
              </TabsTrigger>
              <TabsTrigger value="khalfiyyah" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Khalfiyyah</span>
                <span className="inline md:hidden">Context</span>
              </TabsTrigger>
              <TabsTrigger value="munaqashah" className="flex items-center">
                <Edit3 className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Munaqashah</span>
                <span className="inline md:hidden">Discussion</span>
              </TabsTrigger>
              <TabsTrigger value="jawaban" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Jawaban</span>
                <span className="inline md:hidden">Answer</span>
              </TabsTrigger>
              <TabsTrigger value="talil" className="flex items-center">
                <Edit3 className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Ta'lil Jawab</span>
                <span className="inline md:hidden">Reasoning</span>
              </TabsTrigger>
              <TabsTrigger value="referensi" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Referensi</span>
                <span className="inline md:hidden">References</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="masalah">
              <div className="space-y-2">
                <Label htmlFor="nash_masalah" className={errors.nash_masalah ? 'text-destructive' : ''}>
                  Nash Masalah (Question/Issue) <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="nash_masalah"
                  name="nash_masalah"
                  value={formData.nash_masalah}
                  onChange={handleChange}
                  placeholder="Describe the question or issue being addressed"
                  rows={10}
                  className={`${errors.nash_masalah ? 'border-destructive' : ''} ${formData.requires_rtl ? 'font-arabic text-right' : ''}`}
                  dir={formData.requires_rtl ? 'rtl' : 'ltr'}
                />
                {errors.nash_masalah && <p className="text-sm text-destructive">{errors.nash_masalah}</p>}
                <p className="text-xs text-muted-foreground">
                  The specific inquiry or legal question being discussed
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="khalfiyyah">
              <div className="space-y-2">
                <Label htmlFor="khalfiyyah">
                  Khalfiyyah (Context/Background)
                </Label>
                <Textarea
                  id="khalfiyyah"
                  name="khalfiyyah"
                  value={formData.khalfiyyah}
                  onChange={handleChange}
                  placeholder="Provide background or context for the issue"
                  rows={10}
                  className={formData.requires_rtl ? 'font-arabic text-right' : ''}
                  dir={formData.requires_rtl ? 'rtl' : 'ltr'}
                />
                <p className="text-xs text-muted-foreground">
                  Background information that helps understand the question
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="munaqashah">
              <div className="space-y-2">
                <Label htmlFor="munaqashah">
                  Munaqashah (Discussion)
                </Label>
                <Textarea
                  id="munaqashah"
                  name="munaqashah"
                  value={formData.munaqashah}
                  onChange={handleChange}
                  placeholder="Enter the scholarly discussion around this issue"
                  rows={10}
                  className={formData.requires_rtl ? 'font-arabic text-right' : ''}
                  dir={formData.requires_rtl ? 'rtl' : 'ltr'}
                />
                <p className="text-xs text-muted-foreground">
                  The analysis and debate among scholars about this issue
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="jawaban">
              <div className="space-y-2">
                <Label htmlFor="jawaban" className={errors.jawaban ? 'text-destructive' : ''}>
                  Jawaban (Answer/Conclusion) <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="jawaban"
                  name="jawaban"
                  value={formData.jawaban}
                  onChange={handleChange}
                  placeholder="Enter the answer or conclusion reached"
                  rows={10}
                  className={`${errors.jawaban ? 'border-destructive' : ''} ${formData.requires_rtl ? 'font-arabic text-right' : ''}`}
                  dir={formData.requires_rtl ? 'rtl' : 'ltr'}
                />
                {errors.jawaban && <p className="text-sm text-destructive">{errors.jawaban}</p>}
                <p className="text-xs text-muted-foreground">
                  The final ruling or answer to the question
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="talil">
              <div className="space-y-2">
                <Label htmlFor="talil_jawab">
                  Ta'lil Jawab (Legal Reasoning)
                </Label>
                <Textarea
                  id="talil_jawab"
                  name="talil_jawab"
                  value={formData.talil_jawab}
                  onChange={handleChange}
                  placeholder="Explain the reasoning behind the answer"
                  rows={10}
                  className={formData.requires_rtl ? 'font-arabic text-right' : ''}
                  dir={formData.requires_rtl ? 'rtl' : 'ltr'}
                />
                <p className="text-xs text-muted-foreground">
                  The justification and reasoning process that led to the conclusion
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="referensi">
              <div className="space-y-2">
                <Label htmlFor="referensi">
                  Referensi (References)
                </Label>
                <Textarea
                  id="referensi"
                  name="referensi"
                  value={formData.referensi}
                  onChange={handleChange}
                  placeholder="List the references and sources cited"
                  rows={10}
                  className={formData.requires_rtl ? 'font-arabic text-right' : ''}
                  dir={formData.requires_rtl ? 'rtl' : 'ltr'}
                />
                <p className="text-xs text-muted-foreground">
                  Citations from Qur'an, Hadith, scholarly works, etc.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            <XIcon className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <SaveIcon className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TaqrirKhassForm; 