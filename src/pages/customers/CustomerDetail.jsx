import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { FiArrowLeft, FiMail, FiPackage, FiKey, FiDownload, FiCreditCard, FiCalendar, FiUser } from 'react-icons/fi';

const CustomerDetail = () => {
  const { id } = useParams();
  const { supabase } = useSupabase();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('purchases');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use mock data
        // In a real app, you would fetch this from your Supabase database
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock customer data
        setCustomer({
          id: parseInt(id),
          name: 'Emily Davis',
          email: 'emily@example.com',
          created_at: '2023-07-01T11:10:00Z',
          purchases: 4,
          total_spent: 346,
          last_purchase: '2023-07-12T16:30:00Z',
          purchase_history: [
            { 
              id: 1, 
              product: 'Advanced Web Development Course', 
              type: 'course',
              price: 99, 
              date: '2023-07-01T11:10:00Z',
              status: 'completed'
            },
            { 
              id: 2, 
              product: 'UI/UX Design Templates Bundle', 
              type: 'download',
              price: 79, 
              date: '2023-07-05T14:20:00Z',
              status: 'completed'
            },
            { 
              id: 3, 
              product: 'Pro Membership', 
              type: 'membership',
              price: 19.99, 
              date: '2023-07-10T09:15:00Z',
              status: 'active'
            },
            { 
              id: 4, 
              product: 'SEO Toolkit Pro', 
              type: 'software',
              price: 149, 
              date: '2023-07-12T16:30:00Z',
              status: 'completed'
            },
          ],
          licenses: [
            {
              id: 1,
              key: 'DIGI-PRO-3456-MNOP-7890',
              product: 'SEO Toolkit Pro',
              status: 'active',
              created_at: '2023-07-12T16:30:00Z',
              expires_at: '2024-07-12T16:30:00Z',
              activations: 1,
              max_activations: 2
            }
          ],
          downloads: [
            {
              id: 1,
              file: 'ui-ux-templates-bundle.zip',
              product: 'UI/UX Design Templates Bundle',
              size: '156 MB',
              downloaded_at: '2023-07-05T14:25:00Z'
            },
            {
              id: 2,
              file: 'seo-toolkit-pro-installer.exe',
              product: 'SEO Toolkit Pro',
              size: '87 MB',
              downloaded_at: '2023-07-12T16:35:00Z'
            }
          ],
          memberships: [
            {
              id: 1,
              name: 'Pro Membership',
              status: 'active',
              start_date: '2023-07-10T09:15:00Z',
              next_billing: '2023-08-10T09:15:00Z',
              price: 19.99,
              billing_cycle: 'monthly'
            }
          ]
        });
        
      } catch (error) {
        console.error('Error fetching customer:', error);
        setError('Failed to load customer details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomer();
  }, [id, supabase]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Active</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'expired':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Expired</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getProductTypeIcon = (type) => {
    switch (type) {
      case 'course':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Course</span>;
      case 'download':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Download</span>;
      case 'software':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">Software</span>;
      case 'membership':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Membership</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{type}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert type="error" className="mb-6">
        {error}
      </Alert>
    );
  }

  if (!customer) {
    return (
      <Alert type="error" className="mb-6">
        Customer not found
      </Alert>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/customers')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
        </button>
        <div className="flex-grow">
          <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
          <p className="text-gray-600">{customer.email}</p>
        </div>
        <Button variant="outline">
          <FiMail className="mr-2" />
          Send Email
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <Card.Body className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <FiPackage className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Purchases</p>
              <p className="text-xl font-semibold">{customer.purchases}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <FiCreditCard className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Spent</p>
              <p className="text-xl font-semibold">{formatCurrency(customer.total_spent)}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Body className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <FiCalendar className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Customer Since</p>
              <p className="text-xl font-semibold">{formatDate(customer.created_at)}</p>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'purchases'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('purchases')}
            >
              <FiPackage className="inline-block mr-2" />
              Purchases
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'licenses'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('licenses')}
            >
              <FiKey className="inline-block mr-2" />
              Licenses
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'downloads'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('downloads')}
            >
              <FiDownload className="inline-block mr-2" />
              Downloads
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'memberships'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('memberships')}
            >
              <FiUser className="inline-block mr-2" />
              Memberships
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'purchases' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customer.purchase_history.map((purchase) => (
                  <tr key={purchase.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{purchase.product}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getProductTypeIcon(purchase.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(purchase.price)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(purchase.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(purchase.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      
      {activeTab === 'licenses' && (
        <Card>
          {customer.licenses.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">No licenses found for this customer.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      License Key
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expires
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activations
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customer.licenses.map((license) => (
                    <tr key={license.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono font-medium text-gray-900">{license.key}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{license.product}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(license.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(license.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(license.expires_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {license.activations} / {license.max_activations}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
      
      {activeTab === 'downloads' && (
        <Card>
          {customer.downloads.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">No downloads found for this customer.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Downloaded
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customer.downloads.map((download) => (
                    <tr key={download.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{download.file}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{download.product}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {download.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(download.downloaded_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
      
      {activeTab === 'memberships' && (
        <Card>
          {customer.memberships.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">No memberships found for this customer.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Membership
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Billing
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Billing Cycle
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customer.memberships.map((membership) => (
                    <tr key={membership.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{membership.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(membership.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(membership.start_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(membership.next_billing)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(membership.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {membership.billing_cycle}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default CustomerDetail;
