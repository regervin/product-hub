import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { FiPlus, FiEdit2, FiEye, FiTrash2, FiDownload, FiKey } from 'react-icons/fi';

const Products = () => {
  const { supabase } = useSupabase();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use mock data
        // In a real app, you would fetch this from your Supabase database
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock products
        setProducts([
          { 
            id: 1, 
            name: 'Advanced Web Development Course', 
            type: 'course', 
            price: 99, 
            sales: 124, 
            created_at: '2023-06-15T10:30:00Z',
            thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          { 
            id: 2, 
            name: 'UI/UX Design Templates Bundle', 
            type: 'download', 
            price: 79, 
            sales: 87, 
            created_at: '2023-06-20T15:45:00Z',
            thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          { 
            id: 3, 
            name: 'SEO Toolkit Pro', 
            type: 'software', 
            price: 129, 
            sales: 56, 
            created_at: '2023-06-25T09:15:00Z',
            thumbnail: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          { 
            id: 4, 
            name: 'JavaScript Mastery', 
            type: 'course', 
            price: 89, 
            sales: 103, 
            created_at: '2023-07-01T11:10:00Z',
            thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          { 
            id: 5, 
            name: 'Digital Marketing Ebook', 
            type: 'download', 
            price: 29, 
            sales: 215, 
            created_at: '2023-07-05T14:20:00Z',
            thumbnail: 'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
        ]);
        
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
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

  const getProductTypeIcon = (type) => {
    switch (type) {
      case 'course':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Course</span>;
      case 'download':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Download</span>;
      case 'software':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">Software</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{type}</span>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your digital products</p>
        </div>
        <Link to="/products/create">
          <Button variant="primary">
            <FiPlus className="mr-2" />
            Add New Product
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
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.thumbnail} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <Card.Body className="flex-grow">
                <div className="mb-2">{getProductTypeIcon(product.type)}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-primary-600">{formatCurrency(product.price)}</span>
                  <span className="text-sm text-gray-500">{product.sales} sales</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Created on {formatDate(product.created_at)}</p>
                <div className="flex justify-between mt-auto">
                  <Link to={`/products/${product.id}`}>
                    <Button variant="outline" size="sm">
                      <FiEye className="mr-1" />
                      View
                    </Button>
                  </Link>
                  <Link to={`/products/${product.id}/edit`}>
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

export default Products;
