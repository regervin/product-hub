import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Alert from '../../components/ui/Alert';
import { FiCreditCard, FiGlobe, FiMail, FiLock, FiFileText, FiServer } from 'react-icons/fi';

const Settings = () => {
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, we'll just simulate the API call
      // In a real app, you would save the settings to your database
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your platform settings</p>
      </div>
      
      {error && (
        <Alert type="error" className="mb-6">
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert type="success" className="mb-6">
          Settings saved successfully.
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="sticky top-6">
            <nav className="space-y-1">
              <a href="#general" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary-50 text-primary-700">
                <FiGlobe className="mr-3 text-primary-500" />
                General
              </a>
              <a href="#payment" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <FiCreditCard className="mr-3 text-gray-400" />
                Payment Integrations
              </a>
              <a href="#email" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <FiMail className="mr-3 text-gray-400" />
                Email Settings
              </a>
              <a href="#security" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <FiLock className="mr-3 text-gray-400" />
                Security
              </a>
              <a href="#license" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <FiFileText className="mr-3 text-gray-400" />
                License Settings
              </a>
              <a href="#advanced" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <FiServer className="mr-3 text-gray-400" />
                Advanced
              </a>
            </nav>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <form onSubmit={handleSaveSettings}>
            <Card className="mb-6" id="general">
              <Card.Header>
                <h2 className="text-lg font-semibold">General Settings</h2>
              </Card.Header>
              <Card.Body>
                <Input
                  id="site_name"
                  label="Site Name"
                  defaultValue="DigitalVault"
                />
                
                <Input
                  id="site_url"
                  label="Site URL"
                  defaultValue="https://digitalvault.example.com"
                />
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Description
                  </label>
                  <textarea
                    id="site_description"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    defaultValue="Securely sell, license, and manage access to digital products, courses, and software with our all-in-one platform."
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    id="date_format"
                    label="Date Format"
                    defaultValue="MM/DD/YYYY"
                    options={[
                      { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                      { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                      { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                    ]}
                  />
                  
                  <Select
                    id="currency"
                    label="Default Currency"
                    defaultValue="USD"
                    options={[
                      { value: 'USD', label: 'USD - US Dollar' },
                      { value: 'EUR', label: 'EUR - Euro' },
                      { value: 'GBP', label: 'GBP - British Pound' },
                      { value: 'CAD', label: 'CAD - Canadian Dollar' },
                      { value: 'AUD', label: 'AUD - Australian Dollar' },
                    ]}
                  />
                </div>
              </Card.Body>
            </Card>
            
            <Card className="mb-6" id="payment">
              <Card.Header>
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Payment Integrations</h2>
                  <Link to="/settings/payment-integrations">
                    <Button variant="outline" size="sm">
                      Manage Integrations
                    </Button>
                  </Link>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <img src="https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg" alt="Stripe" className="h-8" />
                      <span className="ml-2 text-sm text-green-600 font-medium">Connected</span>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <img src="https://www.vectorlogo.zone/logos/paypal/paypal-ar21.svg" alt="PayPal" className="h-8" />
                      <span className="ml-2 text-sm text-green-600 font-medium">Connected</span>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <span className="font-bold text-lg">Gumroad</span>
                      <span className="ml-2 text-sm text-gray-500 font-medium">Not connected</span>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
            
            <Card className="mb-6" id="email">
              <Card.Header>
                <h2 className="text-lg font-semibold">Email Settings</h2>
              </Card.Header>
              <Card.Body>
                <Input
                  id="sender_email"
                  label="Sender Email"
                  defaultValue="noreply@digitalvault.example.com"
                />
                
                <Input
                  id="sender_name"
                  label="Sender Name"
                  defaultValue="DigitalVault"
                />
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Service
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center p-4 border border-primary-500 bg-primary-50 rounded-md">
                      <input
                        id="email_service_smtp"
                        name="email_service"
                        type="radio"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        defaultChecked
                      />
                      <label htmlFor="email_service_smtp" className="ml-2 block text-sm font-medium text-gray-700">
                        SMTP
                      </label>
                    </div>
                    <div className="flex items-center p-4 border border-gray-200 rounded-md">
                      <input
                        id="email_service_mailgun"
                        name="email_service"
                        type="radio"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="email_service_mailgun" className="ml-2 block text-sm font-medium text-gray-700">
                        Mailgun
                      </label>
                    </div>
                    <div className="flex items-center p-4 border border-gray-200 rounded-md">
                      <input
                        id="email_service_sendgrid"
                        name="email_service"
                        type="radio"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <label htmlFor="email_service_sendgrid" className="ml-2 block text-sm font-medium text-gray-700">
                        SendGrid
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border p-4 rounded-md mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">SMTP Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      id="smtp_host"
                      label="SMTP Host"
                      defaultValue="smtp.example.com"
                    />
                    
                    <Input
                      id="smtp_port"
                      label="SMTP Port"
                      defaultValue="587"
                    />
                    
                    <Input
                      id="smtp_username"
                      label="SMTP Username"
                      defaultValue="username@example.com"
                    />
                    
                    <Input
                      id="smtp_password"
                      type="password"
                      label="SMTP Password"
                      defaultValue="••••••••••••"
                    />
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    id="send_welcome_email"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="send_welcome_email" className="ml-2 block text-sm text-gray-700">
                    Send welcome email to new customers
                  </label>
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    id="send_purchase_receipt"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="send_purchase_receipt" className="ml-2 block text-sm text-gray-700">
                    Send purchase receipts
                  </label>
                </div>
              </Card.Body>
            </Card>
            
            <Card className="mb-6" id="security">
              <Card.Header>
                <h2 className="text-lg font-semibold">Security Settings</h2>
              </Card.Header>
              <Card.Body>
                <div className="flex items-center mb-4">
                  <input
                    id="enable_2fa"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="enable_2fa" className="ml-2 block text-sm text-gray-700">
                    Enable two-factor authentication for admin accounts
                  </label>
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    id="require_strong_passwords"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="require_strong_passwords" className="ml-2 block text-sm text-gray-700">
                    Require strong passwords
                  </label>
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    id="ip_restriction"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="ip_restriction" className="ml-2 block text-sm text-gray-700">
                    Enable IP restriction for admin access
                  </label>
                </div>
                
                <Input
                  id="session_timeout"
                  type="number"
                  label="Session Timeout (minutes)"
                  defaultValue="60"
                  min="5"
                />
              </Card.Body>
            </Card>
            
            <Card className="mb-6" id="license">
              <Card.Header>
                <h2 className="text-lg font-semibold">License Settings</h2>
              </Card.Header>
              <Card.Body>
                <Input
                  id="license_prefix"
                  label="License Key Prefix"
                  defaultValue="DIGI-PRO"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    id="default_expiration"
                    type="number"
                    label="Default Expiration (days)"
                    defaultValue="365"
                    min="1"
                  />
                  
                  <Input
                    id="default_activations"
                    type="number"
                    label="Default Max Activations"
                    defaultValue="1"
                    min="1"
                  />
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    id="allow_offline_activation"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="allow_offline_activation" className="ml-2 block text-sm text-gray-700">
                    Allow offline activation by default
                  </label>
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    id="hardware_lock"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="hardware_lock" className="ml-2 block text-sm text-gray-700">
                    Lock licenses to hardware ID by default
                  </label>
                </div>
              </Card.Body>
            </Card>
            
            <Card className="mb-6" id="advanced">
              <Card.Header>
                <h2 className="text-lg font-semibold">Advanced Settings</h2>
              </Card.Header>
              <Card.Body>
                <div className="flex items-center mb-4">
                  <input
                    id="debug_mode"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="debug_mode" className="ml-2 block text-sm text-gray-700">
                    Enable debug mode
                  </label>
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    id="maintenance_mode"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="maintenance_mode" className="ml-2 block text-sm text-gray-700">
                    Enable maintenance mode
                  </label>
                </div>
                
                <Input
                  id="api_key"
                  label="API Key"
                  defaultValue="sk_test_51JKlZqLkjHGfDgFdSgFdSgFdSgFdSgFdSgFdSgFdS"
                  readOnly
                />
                
                <div className="mt-2">
                  <Button variant="outline" size="sm">
                    Regenerate API Key
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
              >
                Save Settings
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
