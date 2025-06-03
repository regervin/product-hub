import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSupabase } from '../../contexts/SupabaseContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Alert from '../../components/ui/Alert';
import { FiArrowLeft, FiCopy, FiCheck } from 'react-icons/fi';

const CreateLicense = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      product_id: '',
      customer_id: '',
      expiration_type: 'lifetime',
      expiration_days: 365,
      max_activations: 1,
      features: []
    }
  });
  
  const { supabase } = useSupabase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [generatedLicense, setGeneratedLicense] = useState(null);
  const [copied, setCopied] = useState(false);
  
  const expirationType = watch('expiration_type');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // For demo purposes, we'll use mock data
        // In a real app, you would fetch this from your Supabase database
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock products
        setProducts([
          { id: 1, name: 'SEO Toolkit Pro' },
          { id: 2, name: 'JavaScript Mastery' },
          { id: 3, name: 'Advanced Web Development Course' },
          { id: 4, name: 'UI/UX Design Templates Bundle' },
          { id: 5, name: 'Digital Marketing Ebook' },
        ]);
        
        // Mock customers
        setCustomers([
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
          { id: 3, name: 'Robert Johnson', email: 'robert@example.com' },
          { id: 4, name: 'Emily Davis', email: 'emily@example.com' },
          { id: 5, name: 'Michael Wilson', email: 'michael@example.com' },
        ]);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      }
    };
    
    fetchData();
  }, [supabase]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, we'll just simulate the API call
      // In a real app, you would generate and save the license key
      
      console.log('License data:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock license key
      const licenseKey = 'DIGI-PRO-' + 
        Math.random().toString(36).substring(2, 6).toUpperCase() + '-' +
        Math.random().toString(36).substring(2, 6).toUpperCase() + '-' +
        Math.random().toString(36).substring(2, 6).toUpperCase();
      
      // Set the generated license
      setGeneratedLicense({
        key: licenseKey,
        product: products.find(p => p.id === parseInt(data.product_id))?.name,
        customer: customers.find(c => c.id === parseInt(data.customer_id))?.name,
        email: customers.find(c => c.id === parseInt(data.customer_id))?.email,
        expiration: data.expiration_type === 'lifetime' ? 'Never' : `${data.expiration_days} days`,
        max_activations: data.max_activations
      });
      
    } catch (error) {
      console.error('Error generating license:', error);
      setError('Failed to generate license. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLicense.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateAnother = () => {
    setGeneratedLicense(null);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/licenses')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Generate License Key</h1>
          <p className="text-gray-600">Create a new license key for your software products</p>
        </div>
      </div>
      
      {error && (
        <Alert type="error" className="mb-6">
          {error}
        </Alert>
      )}
      
      {generatedLicense ? (
        <Card>
          <Card.Header>
            <h2 className="text-lg font-semibold">License Key Generated</h2>
          </Card.Header>
          <Card.Body>
            <div className="mb-6">
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono font-medium text-gray-900">{generatedLicense.key}</span>
                  <button
                    onClick={copyToClipboard}
                    className="ml-2 text-gray-400 hover:text-gray-600 flex items-center"
                  >
                    {copied ? (
                      <>
                        <FiCheck className="text-green-500 mr-1" size={16} />
                        <span className="text-green-500 text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="mr-1" size={16} />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Product</p>
                  <p className="text-base font-medium text-gray-900">{generatedLicense.product}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Customer</p>
                  <p className="text-base font-medium text-gray-900">{generatedLicense.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base font-medium text-gray-900">{generatedLicense.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Expiration</p>
                  <p className="text-base font-medium text-gray-900">{generatedLicense.expiration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Max Activations</p>
                  <p className="text-base font-medium text-gray-900">{generatedLicense.max_activations}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/licenses')}
              >
                Back to Licenses
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handleCreateAnother}
              >
                Generate Another
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <Card.Header>
                  <h2 className="text-lg font-semibold">License Details</h2>
                </Card.Header>
                <Card.Body>
                  <Select
                    id="product_id"
                    label="Product"
                    {...register('product_id', { required: 'Product is required' })}
                    options={[
                      { value: '', label: 'Select a product' },
                      ...products.map(product => ({
                        value: product.id.toString(),
                        label: product.name
                      }))
                    ]}
                    error={errors.product_id?.message}
                  />
                  
                  <Select
                    id="customer_id"
                    label="Customer"
                    {...register('customer_id', { required: 'Customer is required' })}
                    options={[
                      { value: '', label: 'Select a customer' },
                      ...customers.map(customer => ({
                        value: customer.id.toString(),
                        label: `${customer.name} (${customer.email})`
                      }))
                    ]}
                    error={errors.customer_id?.message}
                  />
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        id="expiration_type"
                        {...register('expiration_type')}
                        options={[
                          { value: 'days', label: 'Expires after days' },
                          { value: 'lifetime', label: 'Lifetime (never expires)' }
                        ]}
                      />
                      
                      {expirationType === 'days' && (
                        <Input
                          id="expiration_days"
                          type="number"
                          placeholder="Number of days"
                          min="1"
                          {...register('expiration_days', { 
                            required: 'Days are required',
                            min: { value: 1, message: 'Must be at least 1 day' }
                          })}
                          error={errors.expiration_days?.message}
                        />
                      )}
                    </div>
                  </div>
                  
                  <Input
                    id="max_activations"
                    type="number"
                    label="Maximum Activations"
                    placeholder="1"
                    min="1"
                    {...register('max_activations', { 
                      required: 'Maximum activations is required',
                      min: { value: 1, message: 'Must be at least 1' }
                    })}
                    error={errors.max_activations?.message}
                  />
                </Card.Body>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <Card.Header>
                  <h2 className="text-lg font-semibold">Features & Restrictions</h2>
                </Card.Header>
                <Card.Body>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Included Features
                    </label>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="feature_basic"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          {...register('features')}
                          value="basic"
                        />
                        <label htmlFor="feature_basic" className="ml-2 block text-sm text-gray-700">
                          Basic Features
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="feature_advanced"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          {...register('features')}
                          value="advanced"
                        />
                        <label htmlFor="feature_advanced" className="ml-2 block text-sm text-gray-700">
                          Advanced Features
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="feature_premium"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          {...register('features')}
                          value="premium"
                        />
                        <label htmlFor="feature_premium" className="ml-2 block text-sm text-gray-700">
                          Premium Features
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="feature_api"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          {...register('features')}
                          value="api"
                        />
                        <label htmlFor="feature_api" className="ml-2 block text-sm text-gray-700">
                          API Access
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center">
                      <input
                        id="hardware_lock"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        {...register('hardware_lock')}
                      />
                      <label htmlFor="hardware_lock" className="ml-2 block text-sm text-gray-700">
                        Lock to hardware ID
                      </label>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center">
                      <input
                        id="offline_activation"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        {...register('offline_activation')}
                      />
                      <label htmlFor="offline_activation" className="ml-2 block text-sm text-gray-700">
                        Allow offline activation
                      </label>
                    </div>
                  </div>
                </Card.Body>
              </Card>
              
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/licenses')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={loading}
                >
                  Generate License
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateLicense;
