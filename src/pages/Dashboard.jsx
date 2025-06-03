import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../contexts/SupabaseContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FiPackage, FiUsers, FiDollarSign, FiDownload, FiKey, FiLayers } from 'react-icons/fi';

const Dashboard = () => {
  const { supabase } = useSupabase();
  const [stats, setStats] = useState({
    products: 0,
    memberships: 0,
    customers: 0,
    revenue: 0,
    downloads: 0,
    licenses: 0
  });
  const [recentSales, setRecentSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use mock data
        // In a real app, you would fetch this from your Supabase database
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock stats
        setStats({
          products: 12,
          memberships: 3,
          customers: 156,
          revenue: 8750,
          downloads: 1243,
          licenses: 87
        });
        
        // Mock recent sales
        setRecentSales([
          { id: 1, customer: 'John Doe', product: 'Advanced Web Development Course', amount: 99, date: '2023-07-15T10:30:00Z' },
          { id: 2, customer: 'Jane Smith', product: 'Premium Membership', amount: 49, date: '2023-07-14T15:45:00Z' },
          { id: 3, customer: 'Robert Johnson', product: 'UI/UX Design Templates', amount: 79, date: '2023-07-14T09:15:00Z' },
          { id: 4, customer: 'Emily Davis', product: 'SEO Toolkit Pro', amount: 129, date: '2023-07-13T16:20:00Z' },
          { id: 5, customer: 'Michael Wilson', product: 'JavaScript Mastery', amount: 89, date: '2023-07-12T11:10:00Z' },
        ]);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [supabase]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
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

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your DigitalVault dashboard</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <Card.Body className="flex items-center">
            <div className="p-3 rounded-full bg-blue-400 bg-opacity-30 mr-4">
              <FiPackage size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-100">Products</p>
              <p className="text-2xl font-bold">{stats.products}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <Card.Body className="flex items-center">
            <div className="p-3 rounded-full bg-purple-400 bg-opacity-30 mr-4">
              <FiLayers size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-100">Memberships</p>
              <p className="text-2xl font-bold">{stats.memberships}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <Card.Body className="flex items-center">
            <div className="p-3 rounded-full bg-green-400 bg-opacity-30 mr-4">
              <FiUsers size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-green-100">Customers</p>
              <p className="text-2xl font-bold">{stats.customers}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <Card.Body className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-400 bg-opacity-30 mr-4">
              <FiDollarSign size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-100">Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.revenue)}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
          <Card.Body className="flex items-center">
            <div className="p-3 rounded-full bg-red-400 bg-opacity-30 mr-4">
              <FiDownload size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-red-100">Downloads</p>
              <p className="text-2xl font-bold">{stats.downloads}</p>
            </div>
          </Card.Body>
        </Card>
        
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <Card.Body className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-400 bg-opacity-30 mr-4">
              <FiKey size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-indigo-100">Licenses</p>
              <p className="text-2xl font-bold">{stats.licenses}</p>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/products/create">
            <Button variant="primary">Add New Product</Button>
          </Link>
          <Link to="/memberships/create">
            <Button variant="secondary">Create Membership</Button>
          </Link>
          <Link to="/licenses/create">
            <Button variant="outline">Generate License</Button>
          </Link>
        </div>
      </div>
      
      {/* Recent Sales */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Sales</h2>
          <Link to="/customers" className="text-sm text-primary-600 hover:text-primary-700">
            View all
          </Link>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sale.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{sale.product}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(sale.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(sale.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
