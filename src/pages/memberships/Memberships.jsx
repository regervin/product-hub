import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { FiPlus, FiEdit2, FiEye, FiUsers, FiCalendar } from 'react-icons/fi';

const Memberships = () => {
  const { supabase } = useSupabase();
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use mock data
        // In a real app, you would fetch this from your Supabase database
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock memberships
        setMemberships([
          { 
            id: 1, 
            name: 'Basic Membership', 
            price: 9.99, 
            billing_cycle: 'monthly',
            members: 87, 
            created_at: '2023-05-10T10:30:00Z',
            description: 'Access to basic content and resources',
            thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          { 
            id: 2, 
            name: 'Pro Membership', 
            price: 19.99, 
            billing_cycle: 'monthly',
            members: 156, 
            created_at: '2023-05-15T15:45:00Z',
            description: 'Full access to all courses and premium content',
            thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          { 
            id: 3, 
            name: 'Enterprise Membership', 
            price: 49.99, 
            billing_cycle: 'monthly',
            members: 32, 
            created_at: '2023-05-20T09:15:00Z',
            description: 'Team access with advanced features and priority support',
            thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          { 
            id: 4, 
            name: 'Lifetime Access', 
            price: 299, 
            billing_cycle: 'one-time',
            members: 64, 
            created_at: '2023-06-01T11:10:00Z',
            description: 'One-time payment for lifetime access to all content',
            thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          { 
            id: 5, 
            name: 'Student Membership', 
            price: 4.99, 
            billing_cycle: 'monthly',
            members: 215, 
            created_at: '2023-06-15T14:20:00Z',
            description: 'Discounted access for verified students',
            thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
        ]);
        
      } catch (error) {
        console.error('Error fetching memberships:', error);
        setError('Failed to load memberships. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMemberships();
  }, [supabase]);

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

  const formatBillingCycle = (cycle) => {
    switch (cycle) {
      case 'monthly':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Monthly</span>;
      case 'yearly':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Yearly</span>;
      case 'quarterly':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">Quarterly</span>;
      case 'one-time':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">One-time</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{cycle}</span>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Memberships</h1>
          <p className="text-gray-600">Manage your membership plans</p>
        </div>
        <Link to="/memberships/create">
          <Button variant="primary">
            <FiPlus className="mr-2" />
            Create Membership
          </Button>
        </Link>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberships.map((membership) => (
            <Card key={membership.id} className="overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src={membership.thumbnail} 
                  alt={membership.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <Card.Body className="flex-grow">
                <div className="mb-2">{formatBillingCycle(membership.billing_cycle)}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{membership.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{membership.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-primary-600">
                    {formatCurrency(membership.price)}
                    {membership.billing_cycle !== 'one-time' && <span className="text-sm font-normal text-gray-500">/{membership.billing_cycle.replace('ly', '')}</span>}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <FiUsers className="text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">{membership.members} members</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">{formatDate(membership.created_at)}</span>
                  </div>
                </div>
                <div className="flex justify-between mt-auto">
                  <Link to={`/memberships/${membership.id}`}>
                    <Button variant="outline" size="sm">
                      <FiEye className="mr-1" />
                      View
                    </Button>
                  </Link>
                  <Link to={`/memberships/${membership.id}/edit`}>
                    <Button variant="primary" size="sm">
                      <FiEdit2 className="mr-1" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Memberships;
