import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../ui/use-toast';
import { tashihApi, TaqrirJamai } from '../../../lib/api';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import { SaveIcon, X } from 'lucide-react';

interface TaqrirJamaiFormProps {
  taqrirJamai?: TaqrirJamai;
  isEdit?: boolean;
  onSaved?: (taqrirJamai: TaqrirJamai) => void;
}

const TaqrirJamaiForm: React.FC<TaqrirJamaiFormProps> = ({ 
  taqrirJamai,
  isEdit = false, 
  onSaved 
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const initialState = {
    title: '',
    description: '',
    date: '',
    location: '',
    organizer: '',
    participants: '',
    ...taqrirJamai
  };
  
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

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

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (formData.date && isNaN(Date.parse(formData.date))) {
      newErrors.date = 'Invalid date format';
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
      
      if (isEdit && taqrirJamai?.id) {
        response = await tashihApi.updateTaqrirJamai(taqrirJamai.id, formData);
        toast({
          title: 'Success',
          description: 'Taqrir Jama\'i updated successfully.',
        });
      } else {
        response = await tashihApi.createTaqrirJamai(formData);
        toast({
          title: 'Success',
          description: 'Taqrir Jama\'i created successfully.',
        });
      }
      
      if (onSaved) {
        onSaved(response);
      } else {
        navigate(`/tashih/taqrir-jamai/${response.id}`);
      }
    } catch (error) {
      console.error('Error saving Taqrir Jama\'i:', error);
      toast({
        title: 'Error',
        description: 'Failed to save Taqrir Jama\'i. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/tashih/taqrir-jamai');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{isEdit ? 'Edit Taqrir Jama\'i' : 'Create New Taqrir Jama\'i'}</CardTitle>
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
              placeholder="Enter the title of the Taqrir Jama'i"
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Enter a description of this Taqrir Jama'i"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className={errors.date ? 'text-destructive' : ''}>Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date || ''}
                onChange={handleChange}
                className={errors.date ? 'border-destructive' : ''}
              />
              {errors.date && <p className="text-sm text-destructive">{errors.date}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                placeholder="Where was this held?"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="organizer">Organizer</Label>
            <Input
              id="organizer"
              name="organizer"
              value={formData.organizer || ''}
              onChange={handleChange}
              placeholder="Who organized this session?"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="participants">Participants</Label>
            <Textarea
              id="participants"
              name="participants"
              value={formData.participants || ''}
              onChange={handleChange}
              placeholder="Enter information about the participants"
              rows={3}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            <X className="mr-2 h-4 w-4" /> Cancel
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

export default TaqrirJamaiForm; 