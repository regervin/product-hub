import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSupabase } from '../../contexts/SupabaseContext';
import { useDropzone } from 'react-dropzone';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Alert from '../../components/ui/Alert';
import { FiUpload, FiX, FiArrowLeft, FiPlus, FiTrash2 } from 'react-icons/fi';

const EditMembership = () => {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm();
  
  const { supabase } = useSupabase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [contentItems, setContentItems] = useState([]);
  
  const billingCycle = watch('billing_cycle');
  const trialEnabled = watch('trial_enabled');

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        setFetchLoading(true);
        
        // For demo purposes, we'll use mock data
        // In a real app, you would fetch this from your Supabase database
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock membership data
        const membership = {
          id: parseInt(id),
          name: 'Pro Membership',
          billing_cycle: 'monthly',
          price: 19.99,
          description: 'Full access to all courses and premium content',
          trial_enabled: true,
          trial_period: 7,
          published: true,
          thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        };
        
        // Mock content items
        const items = [
          { id: 1, type: 'course', productId: '1', name: 'Advanced Web Development Course' },
          { id: 2, type: 'download', productId: '2', name: 'UI/UX Design Templates Bundle' },
          { id: 3, type: 'product', productId: '4', name: 'JavaScript Mastery' },
        ];
        
        // Set form values
        reset(membership);
        setThumbnailPreview(membership.thumbnail);
        setContentItems(items);
        
      } catch (error) {
        console.error('Error fetching membership:', error);
        setError('Failed to load membership details. Please try again later.');
      } finally {
        setFetchLoading(false);
      }
    };
    
    fetchMembership();
  }, [id, supabase, reset]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      setThumbnailPreview(URL.createObjectURL(file));
      setValue('thumbnail', file);
    }
  });

  const removeThumbnail = () => {
    setThumbnailPreview(null);
    setValue('thumbnail', null);
  };

  const addContentItem = () => {
    setContentItems([
      ...contentItems,
      { id: Date.now(), type: 'product', productId: '', name: 'Select a product' }
    ]);
  };

  const removeContentItem = (id) => {
    setContentItems(contentItems.filter(item => item.id !== id));
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, we'll just simulate the API call
      // In a real app, you would upload the thumbnail and save the membership data
      
      console.log('Updated membership data:', data);
      console.log('Content items:', contentItems);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to memberships page on success
      navigate('/memberships');
      
    } catch (error) {
      console.error('Error updating membership:', error);
      setError('Failed to update membership. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/memberships')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Membership</h1>
          <p className="text-gray-600">Update your membership plan</p>
        </div>
      </div>
      
      {error && (
        <Alert type="error" className="mb-6">
          {error}
        </Alert>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <Card.Header>
                <h2 className="text-lg font-semibold">Basic Information</h2>
              </Card.Header>
              <Card.Body>
                <Input
                  id="name"
                  label="Membership Name"
                  placeholder="Enter membership name"
                  {...register('name', { required: 'Membership name is required' })}
                  error={errors.name?.message}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    id="billing_cycle"
                    label="Billing Cycle"
                    {...register('billing_cycle')}
                    options={[
                      { value: 'monthly', label: 'Monthly' },
                      { value: 'quarterly', label: 'Quarterly' },
                      { value: 'yearly', label: 'Yearly' },
                      { value: 'one-time', label: 'One-time Payment' },
                    ]}
                  />
                  
                  <Input
                    id="price"
                    type="number"
                    label="Price ($)"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    {...register('price', { 
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be positive' }
                    })}
                    error={errors.price?.message}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe what members will get with this membership..."
                    {...register('description', { required: 'Description is required' })}
                  ></textarea>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>
              </Card.Body>
            </Card>
            
            <Card className="mb-6">
              <Card.Header>
                <h2 className="text-lg font-semibold">Membership Content</h2>
              </Card.Header>
              <Card.Body>
                <p className="text-sm text-gray-600 mb-4">
                  Add products, courses, or other content that members will have access to.
                </p>
                
                {contentItems.map((item, index) => (
                  <div key={item.id} className="mb-4 p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-medium text-gray-700">Content Item #{index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeContentItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        id={`content-type-${item.id}`}
                        label="Content Type"
                        options={[
                          { value: 'product', label: 'Product' },
                          { value: 'course', label: 'Course' },
                          { value: 'download', label: 'Download' },
                        ]}
                        defaultValue={item.type}
                        onChange={(e) => {
                          const newItems = [...contentItems];
                          const itemIndex = newItems.findIndex(i => i.id === item.id);
                          newItems[itemIndex].type = e.target.value;
                          setContentItems(newItems);
                        }}
                      />
                      
                      <Select
                        id={`content-item-${item.id}`}
                        label="Select Item"
                        options={[
                          { value: '1', label: 'Advanced Web Development Course' },
                          { value: '2', label: 'UI/UX Design Templates Bundle' },
                          { value: '3', label: 'SEO Toolkit Pro' },
                          { value: '4', label: 'JavaScript Mastery' },
                          { value: '5', label: 'Digital Marketing Ebook' },
                        ]}
                        defaultValue={item.productId}
                        onChange={(e) => {
                          const newItems = [...contentItems];
                          const itemIndex = newItems.findIndex(i => i.id === item.id);
                          newItems[itemIndex].productId = e.target.value;
                          setContentItems(newItems);
                        }}
                      />
                    </div>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addContentItem}
                  className="w-full"
                >
                  <FiPlus className="mr-2" />
                  Add Content Item
                </Button>
              </Card.Body>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <Card.Header>
                <h2 className="text-lg font-semibold">Membership Thumbnail</h2>
              </Card.Header>
              <Card.Body>
                {!thumbnailPreview ? (
                  <div {...getRootProps({ className: 'dropzone border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50' })}>
                    <input {...getInputProps()} />
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Drag and drop an image here, or click to select</p>
                    <p className="text-xs text-gray-500">Recommended size: 800x600px</p>
                  </div>
                ) : (
                  <div className="relative">
                    <img 
                      src={thumbnailPreview} 
                      alt="Membership thumbnail preview" 
                      className="w-full h-auto rounded-md"
                    />
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                )}
              </Card.Body>
            </Card>
            
            <Card className="mb-6">
              <Card.Header>
                <h2 className="text-lg font-semibold">Billing Settings</h2>
              </Card.Header>
              <Card.Body>
                {billingCycle !== 'one-time' && (
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <input
                        id="trial_enabled"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        {...register('trial_enabled')}
                      />
                      <label htmlFor="trial_enabled" className="ml-2 block text-sm text-gray-700">
                        Enable free trial
                      </label>
                    </div>
                    
                    {trialEnabled && (
                      <div className="pl-6 mt-2">
                        <Input
                          id="trial_period"
                          type="number"
                          label="Trial Period (days)"
                          min="1"
                          {...register('trial_period', { 
                            min: { value: 1, message: 'Trial period must be at least 1 day' }
                          })}
                          error={errors.trial_period?.message}
                        />
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center mb-4">
                  <input
                    id="published"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    {...register('published')}
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                    Published
                  </label>
                </div>
              </Card.Body>
            </Card>
            
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/memberships')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMembership;
