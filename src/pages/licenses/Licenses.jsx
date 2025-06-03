import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { FiPlus, FiEdit2, FiTrash2, FiCopy, FiCheck, FiX } from 'react-icons/fi';

const Licenses = () => {
  const { supabase } = useSupabase();
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [licenseToDelete, setLicenseToDelete] = useState(null);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use mock data
        // In a real app, you would fetch this from your Supabase database
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock licenses
        setLicenses([
          { 
            id: 1, 
            key: 'DIGI-PRO-1234-ABCD-5678',
            product: 'SEO Toolkit Pro',
            customer: 'John Doe',
            email: 'john@example.com',
            status: 'active',
            created_at: '2023-06-15T10:30:00Z',
            expires_at: '2024-06-15T10:30:00Z',
            activations: 2,
            max_activations: 3
          },
          { 
            id: 2, 
            key: 'DIGI-PRO-5678-EFGH-9012',
            product: 'JavaScript Mastery',
            customer: 'Jane Smith',
            email: 'jane@example.com',
            status: 'active',
            created_at: '2023-06-20T15:45:00Z',
            expires_at: '2024-06-20T15:45:00Z',
            activations: 1,
            max_activations: 2
          },
          { 
            id: 3, 
            key: 'DIGI-PRO-9012-IJKL-3456',
            product: 'SEO Toolkit Pro',
            customer: 'Robert Johnson',
            email: 'robert@example.com',
            status: 'expired',
            created_at: '2023-05-10T09:15:00Z',
            expires_at: '2023-06-10T09:15:00Z',
            activations: 3,
            max_activations: 3
          },
          { 
            id: 4, 
            key: 'DIGI-PRO-3456-MNOP-7890',
            product: 'JavaScript Mastery',
            customer: 'Emily Davis',
            email: 'emily@example.com',
            status: 'active',
            created_at: '2023-07-01T11:10:00Z',
            expires_at: '2024-07-01T11:10:00Z',
            activations: 0,
            max_activations: 1
          },
          { 
            id: 5, 
            key: 'DIGI-PRO-7890-QRST-1234',
            product: 'SEO Toolkit Pro',
            customer: 'Michael Wilson',
            email: 'michael@example.com',
            status: 'revoked',
            created_at: '2023-06-05T14:20:00Z',
            expires_at: '2024-06-05T14:20:00Z',
            activations: 1,
            max_activations: 2
          },
        ]);
        
      } catch (error) {
        console.error('Error fetching licenses:', error);
        setError('Failed to load licenses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLicenses();
  }, [supabase]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>;
      case 'expired':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Expired</span>;
      case 'revoked':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Revoked</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const copyToClipboard = (key, id) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteClick = (license) => {
    setLicenseToDelete(license);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, we'll just simulate the API call
      // In a real app, you would delete the license from your database
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the UI by removing the deleted license
      setLicenses(licenses.filter(license => license.id !== licenseToDelete.id));
      
    } catch (error) {
      console.error('Error deleting license:', error);
      setError('Failed to delete license. Please try again.');
    } finally {
      setLoading(false);
      setDeleteModalOpen(false);
      setLicenseToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">License Keys</h1>
          <p className="text-gray-600">Manage software license keys</p>
        </div>
        <Link to="/licenses/create">
          <Button variant="primary">
            <FiPlus className="mr-2" />
            Generate License
          </Button>
        </Link>
      </div>
      
      {error && (
        <Alert type="error" className="mb-6">
          {error}
        </Alert>
      )}
      
      <Card>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
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
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expires
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activations
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {licenses.map((license) => (
                  <tr key={license.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-mono font-medium text-gray-900">{license.key}</span>
                        <button
                          onClick={() => copyToClipboard(license.key, license.id)}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          {copiedId === license.id ? (
                            <FiCheck className="text-green-500" size={16} />
                          ) : (
                            <FiCopy size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{license.product}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{license.customer}</div>
                      <div className="text-sm text-gray-500">{license.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(license.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(license.expires_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {license.activations} / {license.max_activations}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        <FiEdit2 size={18} />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteClick(license)}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
      
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the license key for {licenseToDelete?.customer}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="danger"
                onClick={handleDelete}
                isLoading={loading}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Licenses;
