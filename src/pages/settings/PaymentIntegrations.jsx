import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';
import { FiArrowLeft, FiCheck, FiX, FiPlus } from 'react-icons/fi';

const PaymentIntegrations = () => {
  const { supabase } = useSupabase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('stripe');
  const [showAddModal, setShowAddModal] = useState(false);

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
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/settings')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Integrations</h1>
          <p className="text-gray-600">Configure your payment gateways and processors</p>
        </div>
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
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === 'stripe' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('stripe')}
          >
            Stripe
          </Button>
          <Button 
            variant={activeTab === 'paypal' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('paypal')}
          >
            PayPal
          </Button>
          <Button 
            variant={activeTab === 'other' ? 'primary' : 'outline'} 
            onClick={() => setActiveTab('other')}
          >
            Other Gateways
          </Button>
        </div>
        <Button 
          variant="outline"
          onClick={() => setShowAddModal(true)}
        >
          <FiPlus className="mr-2" />
          Add Gateway
        </Button>
      </div>
      
      {activeTab === 'stripe' && (
        <form onSubmit={handleSaveSettings}>
          <Card className="mb-6">
            <Card.Header>
              <div className="flex items-center">
                <img src="https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg" alt="Stripe" className="h-8" />
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Connected</span>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="stripe_public_key"
                  label="Publishable Key"
                  defaultValue="pk_test_51JKlZqLkjHGfDgFdSgFdSgFdSgFdSgFdSgFdSgFdS"
                />
                
                <Input
                  id="stripe_secret_key"
                  label="Secret Key"
                  type="password"
                  defaultValue="sk_test_51JKlZqLkjHGfDgFdSgFdSgFdSgFdSgFdSgFdSgFdS"
                />
              </div>
              
              <div className="mt-4">
                <div className="flex items-center mb-4">
                  <input
                    id="stripe_test_mode"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="stripe_test_mode" className="ml-2 block text-sm text-gray-700">
                    Enable test mode
                  </label>
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    id="stripe_webhooks"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="stripe_webhooks" className="ml-2 block text-sm text-gray-700">
                    Enable webhooks
                  </label>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Accepted Payment Methods</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <input
                      id="stripe_card"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="stripe_card" className="ml-2 block text-sm text-gray-700">
                      Credit Card
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="stripe_apple_pay"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="stripe_apple_pay" className="ml-2 block text-sm text-gray-700">
                      Apple Pay
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="stripe_google_pay"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label htmlFor="stripe_google_pay" className="ml-2 block text-sm text-gray-700">
                      Google Pay
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="stripe_sepa"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="stripe_sepa" className="ml-2 block text-sm text-gray-700">
                      SEPA Debit
                    </label>
                  </div>
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={loading}
                >
                  Save Stripe Settings
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </form>
      )}
      
      {activeTab === 'paypal' && (
        <form onSubmit={handleSaveSettings}>
          <Card className="mb-6">
            <Card.Header>
              <div className="flex items-center">
                <img src="https://www.vectorlogo.zone/logos/paypal/paypal-ar21.svg" alt="PayPal" className="h-8" />
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Connected</span>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="paypal_client_id"
                  label="Client ID"
                  defaultValue="AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUu"
                />
                
                <Input
                  id="paypal_secret"
                  label="Secret"
                  type="password"
                  defaultValue="EeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"
                />
              </div>
              
              <div className="mt-4">
                <div className="flex items-center mb-4">
                  <input
                    id="paypal_sandbox"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="paypal_sandbox" className="ml-2 block text-sm text-gray-700">
                    Enable sandbox mode
                  </label>
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    id="paypal_ipn"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="paypal_ipn" className="ml-2 block text-sm text-gray-700">
                    Enable IPN (Instant Payment Notification)
                  </label>
                </div>
              </div>
              
              <Input
                id="paypal_webhook_url"
                label="IPN/Webhook URL"
                defaultValue="https://digitalvault.example.com/webhooks/paypal"
                readOnly
              />
            </Card.Body>
            <Card.Footer>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={loading}
                >
                  Save PayPal Settings
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </form>
      )}
      
      {activeTab === 'other' && (
        <div>
          <Card className="mb-6">
            <Card.Header>
              <h2 className="text-lg font-semibold">Other Payment Gateways</h2>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <span className="font-bold text-lg">Gumroad</span>
                    <span className="ml-2 text-sm text-gray-500 font-medium">Not connected</span>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <span className="font-bold text-lg">ThriveCart</span>
                    <span className="ml-2 text-sm text-gray-500 font-medium">Not connected</span>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <span className="font-bold text-lg">JVZoo</span>
                    <span className="ml-2 text-sm text-gray-500 font-medium">Not connected</span>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <span className="font-bold text-lg">WarriorPlus</span>
                    <span className="ml-2 text-sm text-gray-500 font-medium">Not connected</span>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
      
      {/* Add Gateway Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Payment Gateway</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Gateway
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Select a gateway...</option>
                <option value="gumroad">Gumroad</option>
                <option value="thrivecart">ThriveCart</option>
                <option value="jvzoo">JVZoo</option>
                <option value="warriorplus">WarriorPlus</option>
                <option value="paddle">Paddle</option>
                <option value="2checkout">2Checkout</option>
                <option value="custom">Custom Gateway</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary"
              >
                Add Gateway
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentIntegrations;
