import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { FiEdit2, FiTrash2, FiDownload, FiKey, FiArrowLeft, FiEye, FiUsers, FiDollarSign, FiCalendar } from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const { supabase } = useSupabase();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use mock data
        // In a real app, you would fetch this from your Supabase database
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock product data
        setProduct({
          id: parseInt(id),
          name: 'Advanced Web Development Course',
          type: 'course',
          price: 99,
          description: 'Master modern web development with this comprehensive course. Learn HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and gain practical experience that will help you land your dream job or create your own web applications.',
          sales: 124,
          revenue: 12276,
          created_at: '2023-06-15T10:30:00Z',
          updated_at: '2023-07-10T14:20:00Z',
          thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          published: true,
          featured: true,
          files: [
            { id: 1, name: 'module1-introduction.mp4', size: 256000000, type: 'video/mp4' },
            { id: 2, name: 'module2-html-css.mp4', size: 312000000, type: 'video/mp4' },
            { id: 3, name: 'module3-javascript.mp4', size: 287000000, type: 'video/mp4' },
            { id: 4, name: 'module4-react.mp4', size: 342000000, type: 'video/mp4' },
            { id: 5, name: 'module5-nodejs.mp4', size: 298000000, type: 'video/mp4' },
            { id: 6, name: 'course-materials.zip', size: 45000000, type: 'application/zip' },
          ],
          customers: [
            { id: 1, name: 'John Doe', email: 'john@example.com', purchase_date: '2023-06-20T15:30:00Z' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', purchase_date: '2023-06-22T09:45:00Z' },
            { id: 3, name: 'Robert Johnson', email: 'robert@example.com', purchase_date: '2023-06-25T11:20:00Z' },
            { id: 4, name: 'Emily Davis', email: 'emily@example.com', purchase_date: '2023-07-01T14:10:00Z' },
            { id: 5, name: 'Michael Wilson', email: 'michael@example.com', purchase_date: '2023-07-05T16:30:00Z' },
          ]
        });
        
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, supabase]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, we'll just simulate the API call
      // In a real app, you would delete the product from your database
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to products page on success
      navigate('/products');
      
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product. Please try again.');
    } finally {
      setLoading(false);
      setDeleteModalOpen(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
    else return (bytes / 1073741824).toFixed(2) + ' GB';
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

  if (!product) {
    return (
      <Alert type="error" className="mb-6">
        Product not found
      </Alert>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/products')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
        </button>
        <div className="flex-grow">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center">
            {getProductTypeIcon(product.type)}
            <span className="ml-2 text-gray-600">
              {product.published ? 'Published' : 'Draft'}
              {product.featured && ' • Featured'}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link to={`/products/${id}/edit`}>
            <Button variant="outline">
              <FiEdit2 className="mr-2" />
              Edit
            </Button>
          </Link>
          <Button 
            variant="danger"
            onClick={() => setDeleteModalOpen(true)}
          >
            <FiTrash2 className="mr-2" />
            Delete
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6 overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img 
                src={product.thumbnail} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <Card.Body>
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
            </Card.Body>
          </Card>
          
          <Card className="mb-6">
            <Card.Header>
              <h2 className="text-lg font-semibold">Product Files</h2>
            </Card.Header>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {product.files.map((file) => (
                    <tr key={file.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{file.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatFileSize(file.size)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{file.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-3">
                          <FiEye size={18} />
                        </button>
                        <button className="text-primary-600 hover:text-primary-900">
                          <FiDownload size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          <Card className="mb-6">
            <Card.Header>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Recent Customers</h2>
                <Link to="/customers" className="text-sm text-primary-600 hover:text-primary-700">
                  View all
                </Link>
              </div>
            </Card.Header>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purchase Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {product.customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(customer.purchase_date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <Card.Header>
              <h2 className="text-lg font-semibold">Product Stats</h2>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 mr-4">
                    <FiDollarSign className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Price</p>
                    <p className="text-lg font-semibold">{formatCurrency(product.price)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 mr-4">
                    <FiUsers className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Sales</p>
                    <p className="text-lg font-semibold">{product.sales}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 mr-4">
                    <FiDollarSign className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <p className="text-lg font-semibold">{formatCurrency(product.revenue)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 mr-4">
                    <FiCalendar className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created On</p>
                    <p className="text-lg font-semibold">{formatDate(product.created_at)}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 mr-4">
                    <FiCalendar className="text-red-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Updated</p>
                    <p className="text-lg font-semibold">{formatDate(product.updated_at)}</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="mb-6">
            <Card.Header>
              <h2 className="text-lg font-semibold">Quick Actions</h2>
            </Card.Header>
            <Card.Body>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FiDownload className="mr-2" />
                  Download All Files
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <FiKey className="mr-2" />
                  Manage Licenses
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <FiUsers className="mr-2" />
                  View Customers
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
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

export default ProductDetail;
