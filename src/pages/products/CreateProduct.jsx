import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSupabase } from '../../contexts/SupabaseContext';
import { useDropzone } from 'react-dropzone';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Alert from '../../components/ui/Alert';
import { FiUpload, FiX, FiArrowLeft } from 'react-icons/fi';

const CreateProduct = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      name: '',
      type: 'download',
      price: '',
      description: '',
      requireLicense: false,
      dripContent: false,
    }
  });
  
  const { supabase } = useSupabase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  
  const productType = watch('type');
  const requireLicense = watch('requireLicense');
  const dripContent = watch('dripContent');

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

  const { getRootProps: getFileRootProps, getInputProps: getFileInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(prev => [...prev, ...acceptedFiles]);
    }
  });

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const removeThumbnail = () => {
    setThumbnailPreview(null);
    setValue('thumbnail', null);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, we'll just simulate the API call
      // In a real app, you would upload the files to storage and save the product data
      
      console.log('Product data:', data);
      console.log('Files to upload:', files);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to products page on success
      navigate('/products');
      
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/products')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
          <p className="text-gray-600">Add a new digital product to your store</p>
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
                  label="Product Name"
                  placeholder="Enter product name"
                  {...register('name', { required: 'Product name is required' })}
                  error={errors.name?.message}
                />
                
                <Select
                  id="type"
                  label="Product Type"
                  {...register('type')}
                  options={[
                    { value: 'download', label: 'Digital Download' },
                    { value: 'course', label: 'Online Course' },
                    { value: 'software', label: 'Software' },
                    { value: 'ebook', label: 'E-Book' },
                  ]}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  
                  <Input
                    id="sku"
                    label="SKU (Optional)"
                    placeholder="Enter SKU"
                    {...register('sku')}
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
                    placeholder="Describe your product..."
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
                <h2 className="text-lg font-semibold">Product Files</h2>
              </Card.Header>
              <Card.Body>
                <div {...getFileRootProps({ className: 'dropzone mb-4 border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50' })}>
                  <input {...getFileInputProps()} />
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Drag and drop files here, or click to select files</p>
                  <p className="text-xs text-gray-500">Upload the files that customers will receive after purchase</p>
                </div>
                
                {files.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files</h3>
                    <ul className="divide-y divide-gray-200">
                      {files.map((file, index) => (
                        <li key={index} className="py-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">{file.name}</span>
                            <span className="ml-2 text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiX size={18} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {productType === 'course' && (
                  <div className="mt-4">
                    <div className="flex items-center mb-4">
                      <input
                        id="dripContent"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        {...register('dripContent')}
                      />
                      <label htmlFor="dripContent" className="ml-2 block text-sm text-gray-700">
                        Enable drip content (release lessons over time)
                      </label>
                    </div>
                    
                    {dripContent && (
                      <div className="pl-6 border-l-2 border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">
                          Configure the release schedule for your course content. You can set specific dates or intervals for each lesson.
                        </p>
                        <Button variant="outline" size="sm" type="button">
                          Configure Drip Schedule
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                
                {productType === 'software' && (
                  <div className="mt-4">
                    <div className="flex items-center mb-4">
                      <input
                        id="requireLicense"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        {...register('requireLicense')}
                      />
                      <label htmlFor="requireLicense" className="ml-2 block text-sm text-gray-700">
                        Require license key for activation
                      </label>
                    </div>
                    
                    {requireLicense && (
                      <div className="pl-6 border-l-2 border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">
                          Configure license settings for your software product. You can set expiration, usage limits, and more.
                        </p>
                        <Button variant="outline" size="sm" type="button">
                          Configure License Settings
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <Card.Header>
                <h2 className="text-lg font-semibold">Product Thumbnail</h2>
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
                      alt="Product thumbnail preview" 
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
                <h2 className="text-lg font-semibold">Publish Settings</h2>
              </Card.Header>
              <Card.Body>
                <div className="flex items-center mb-4">
                  <input
                    id="published"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    {...register('published')}
                    defaultChecked={true}
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                    Publish immediately
                  </label>
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    id="featured"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    {...register('featured')}
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                    Feature this product
                  </label>
                </div>
              </Card.Body>
            </Card>
            
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/products')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
              >
                Create Product
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
