import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';
import { FiSearch, FiEye, FiMail, FiDownload } from 'react-icons/fi';

const Customers = () => {
  const { supabase } = useSupabase();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use mock data
        // In a real app, you would fetch this from your Supabase database
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock customers
        const mockCustomers = [
          { 
            id: 1, 
            name: 'John Doe', 
            email: 'john@example.com', 
            created_at: '2023-06-15T10:30:00Z',
            purchases: 3,
            total_spent: 267,
            last_purchase: '2023-07-10T14:20:00Z'
          },
          { 
            id: 2, 
            name: 'Jane Smith', 
            email: 'jane@example.com', 
            created_at: '2023-06-20T15:45:00Z',
            purchases: 2,
            total_spent: 128,
            last_purchase: '2023-07-05T09:15:00Z'
          },
          { 
            id: 3, 
            name: 'Robert Johnson', 
            email: 'robert@example.com', 
            created_at: '2023-06-25T09:15:00Z',
            purchases: 1,
            total_spent: 99,
            last_purchase: '2023-06-25T09:15:00Z'
          },
          { 
            id: 4, 
            name: 'Emily Davis', 
            email: 'emily@example.com', 
            created_at: '2023-07-01T11:10:00Z',
            purchases: 4,
            total_spent: 346,
            last_purchase: '2023-07-12T16:30:00Z'
          },
          { 
            id: 5, 
            name: 'Michael Wilson', 
            email: 'michael@example.com', 
            created_at: '2023-07-05T14:20:00Z',
            purchases: 2,
            total_spent: 178,
            last_purchase: '2023-07-08T11:45:00Z'
          },
          { 
            id: 6, 
            name: 'Sarah Brown', 
            email: 'sarah@example.com', 
            created_at: '2023-07-08T13:25:00Z',
            purchases: 1,
            total_spent: 79,
            last_purchase: '2023-07-08T13:25:00Z'
          },
          { 
            id: 7, 
            name: 'David Miller', 
            email: 'david@example.com', 
            created_at: '2023-07-10T09:40:00Z',
            purchases: 3,
            total_spent: 247,
            last_purchase: '2023-07-15T10:20:00Z'
          },
          { 
            id: 8, 
            name: 'Jennifer Taylor', 
            email: 'jennifer@example.com', 
            created_at: '2023-07-12T16:15:00Z',
            purchases: 2,
            total_spent: 158,
            last_purchase: '2023-07-14T14:30:00Z'
          },
        ];
        
        setCustomers(mockCustomers);
        setFilteredCustomers(mockCustomers);
        
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError('Failed to load customers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCustomers();
  }, [supabase]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  }, [searchTerm, customers]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer base</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <FiDownload className="mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <FiMail className="mr-2" />
            Email All
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert type="error" className="mb-6">
          {error}
        </Alert>
      )}
      
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
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
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purchases
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Purchase
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-primary-800 font-medium">
                            {customer.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(customer.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {customer.purchases}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {formatCurrency(customer.total_spent)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(customer.last_purchase)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/customers/${customer.id}`}>
                        <Button variant="outline" size="sm">
                          <FiEye className="mr-1" />
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Customers;
