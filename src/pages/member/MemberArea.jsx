import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { FiBook, FiDownload, FiClock, FiCalendar, FiLayers, FiPackage } from 'react-icons/fi';

const MemberArea = () => {
  const { supabase, user } = useSupabase();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [memberData, setMemberData] = useState(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use mock data
        // In a real app, you would fetch this from your Supabase database
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock member data
        setMemberData({
          name: 'John Doe',
          email: user?.email || 'john@example.com',
          membership: {
            name: 'Pro Membership',
            status: 'active',
            start_date: '2023-07-10T09:15:00Z',
            next_billing: '2023-08-10T09:15:00Z',
            price: 19.99,
            billing_cycle: 'monthly'
          },
          courses: [
            { 
              id: 1, 
              name: 'Advanced Web Development Course', 
              progress: 65,
              thumbnail: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              last_accessed: '2023-07-15T14:30:00Z'
            },
            { 
              id: 2, 
              name: 'JavaScript Mastery', 
              progress: 30,
              thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              last_accessed: '2023-07-14T10:15:00Z'
            }
          ],
          downloads: [
            { 
              id: 1, 
              name: 'UI/UX Design Templates Bundle', 
              file_name: 'ui-ux-templates-bundle.zip',
              size: '156 MB',
              thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              download_date: '2023-07-05T14:25:00Z'
            },
            { 
              id: 2, 
              name: 'SEO Toolkit Pro', 
              file_name: 'seo-toolkit-pro-installer.exe',
              size: '87 MB',
              thumbnail: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              download_date: '2023-07-12T16:35:00Z'
            }
          ],
          upcoming_content: [
            {
              id: 1,
              name: 'React Native Fundamentals',
              type: 'course',
              release_date: '2023-07-25T00:00:00Z'
            },
            {
              id: 2,
              name: 'Advanced SEO Strategies Ebook',
              type: 'ebook',
              release_date: '2023-08-05T00:00:00Z'
            }
          ]
        });
        
      } catch (error) {
        console.error('Error fetching member data:', error);
        setError('Failed to load member data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMemberData();
  }, [supabase, user]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Member Dashboard</h1>
        <p className="text-gray-600">Welcome back, {memberData.name}</p>
      </div>
      
      {memberData.membership && (
        <Card className="mb-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
          <Card.Body>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <div className="flex items-center mb-2">
                  <FiLayers className="mr-2" size={20} />
                  <h2 className="text-xl font-semibold">{memberData.membership.name}</h2>
                  <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-500 bg-opacity-25 text-white">
                    Active
                  </span>
                </div>
                <p className="text-primary-100 mb-4">
                  Next billing: {formatDate(memberData.membership.next_billing)} ({formatCurrency(memberData.membership.price)}/{memberData.membership.billing_cycle})
                </p>
              </div>
              <Button variant="outline" className="text-white border-white hover:bg-primary-600">
                Manage Subscription
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
            <Link to="/member/courses" className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          
          {memberData.courses.length === 0 ? (
            <Card>
              <Card.Body className="text-center py-8">
                <FiBook className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No courses yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don't have any courses in your account yet.
                </p>
              </Card.Body>
            </Card>
          ) : (
            <div className="space-y-4">
              {memberData.courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3 h-32 sm:h-auto">
                      <img 
                        src={course.thumbnail} 
                        alt={course.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:w-2/3 p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{course.name}</h3>
                      <div className="mb-3">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-primary-600 h-2.5 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-500">{course.progress}%</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <FiClock className="mr-1" />
                        Last accessed: {formatDateTime(course.last_accessed)}
                      </div>
                      <Link to={`/member/course/${course.id}`}>
                        <Button variant="primary" size="sm">
                          Continue Learning
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Downloads</h2>
            <Link to="/member/downloads" className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          
          {memberData.downloads.length === 0 ? (
            <Card>
              <Card.Body className="text-center py-8">
                <FiDownload className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No downloads yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don't have any downloads in your account yet.
                </p>
              </Card.Body>
            </Card>
          ) : (
            <div className="space-y-4">
              {memberData.downloads.map((download) => (
                <Card key={download.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3 h-32 sm:h-auto">
                      <img 
                        src={download.thumbnail} 
                        alt={download.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:w-2/3 p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{download.name}</h3>
                      <div className="text-sm text-gray-500 mb-2">
                        <div>{download.file_name}</div>
                        <div>Size: {download.size}</div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <FiClock className="mr-1" />
                        Downloaded: {formatDateTime(download.download_date)}
                      </div>
                      <Button variant="outline" size="sm">
                        <FiDownload className="mr-1" />
                        Download Again
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {memberData.upcoming_content.length > 0 && (
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Content</h2>
            <p className="text-gray-600">New content that will be available soon</p>
          </div>
          
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Content
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Release Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {memberData.upcoming_content.map((content) => (
                    <tr key={content.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {content.type === 'course' ? (
                            <FiBook className="mr-2 text-primary-600" />
                          ) : (
                            <FiPackage className="mr-2 text-primary-600" />
                          )}
                          <div className="text-sm font-medium text-gray-900">{content.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 capitalize">
                          {content.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <FiCalendar className="mr-1" />
                          {formatDate(content.release_date)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MemberArea;
