import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../../contexts/SupabaseContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { FiArrowLeft, FiDownload, FiClock, FiSearch, FiFilter } from 'react-icons/fi';

const Downloads = () => {
  const { supabase } = useSupabase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloads, setDownloads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDownloads, setFilteredDownloads] = useState([]);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, we'll use mock data
        // In a real app, you would fetch this from your Supabase database
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock downloads
        const mockDownloads = [
          { 
            id: 1, 
            name: 'UI/UX Design Templates Bundle', 
            file_name: 'ui-ux-templates-bundle.zip',
            size: '156 MB',
            type: 'design',
            thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            download_date: '2023-07-05T14:25:00Z',
            description: 'A comprehensive collection of UI/UX design templates for web and mobile applications. Includes wireframes, mockups, and design systems.'
          },
          { 
            id: 2, 
            name: 'SEO Toolkit Pro', 
            file_name: 'seo-toolkit-pro-installer.exe',
            size: '87 MB',
            type: 'software',
            thumbnail: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            download_date: '2023-07-12T16:35:00Z',
            description: 'Advanced SEO software for optimizing your website and improving search engine rankings. Includes keyword research, backlink analysis, and more.'
          },
          { 
            id: 3, 
            name: 'Digital Marketing Ebook', 
            file_name: 'digital-marketing-guide-2023.pdf',
            size: '12 MB',
            type: 'ebook',
            thumbnail: 'https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            download_date: '2023-07-08T10:15:00Z',
            description: 'Comprehensive guide to digital marketing strategies for 2023. Learn about SEO, social media marketing, email campaigns, and more.'
          },
          { 
            id: 4, 
            name: 'JavaScript Code Snippets Library', 
            file_name: 'js-snippets-library.zip',
            size: '45 MB',
            type: 'code',
            thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            download_date: '2023-07-10T09:30:00Z',
            description: 'Collection of reusable JavaScript code snippets for common web development tasks. Includes utilities, animations, and UI components.'
          },
          { 
            id: 5, 
            name: 'Stock Photo Collection', 
            file_name: 'premium-stock-photos-bundle.zip',
            size: '350 MB',
            type: 'media',
            thumbnail: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            download_date: '2023-07-15T11:45:00Z',
            description: 'High-quality stock photos for commercial use. Includes landscapes, business, technology, and lifestyle categories.'
          },
          { 
            id: 6, 
            name: 'WordPress Theme Development Guide', 
            file_name: 'wp-theme-dev-guide.pdf',
            size: '18 MB',
            type: 'ebook',
            thumbnail: 'https://images.pexels.com/photos/265667/pexels-photo-265667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            download_date: '2023-07-03T13:20:00Z',
            description: 'Step-by-step guide to creating custom WordPress themes. Learn about theme structure, template hierarchy, and best practices.'
          },
        ];
        
        setDownloads(mockDownloads);
        setFilteredDownloads(mockDownloads);
        
      } catch (error) {
        console.error('Error fetching downloads:', error);
        setError('Failed to load downloads. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDownloads();
  }, [supabase]);

  useEffect(() => {
    // Filter downloads based on search term and filter type
    let filtered = downloads;
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(download => 
        download.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        download.file_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(download => download.type === filterType);
    }
    
    setFilteredDownloads(filtered);
  }, [searchTerm, filterType, downloads]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDownload = (download) => {
    // In a real app, you would initiate the download here
    console.log(`Downloading: ${download.file_name}`);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/member')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Downloads</h1>
          <p className="text-gray-600">Access all your purchased digital products</p>
        </div>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search downloads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <FiFilter className="mr-2 text-gray-500" />
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="ebook">Ebooks</option>
            <option value="software">Software</option>
            <option value="design">Design Resources</option>
            <option value="code">Code</option>
            <option value="media">Media</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
          {error}
        </div>
      ) : filteredDownloads.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-8">
            <FiDownload className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No downloads found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'You don\'t have any downloads in your account yet.'}
            </p>
          </Card.Body>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDownloads.map((download) => (
            <Card key={download.id} className="overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src={download.thumbnail} 
                  alt={download.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <Card.Body className="flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{download.name}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{download.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  <div className="flex items-center mb-1">
                    <span className="font-medium">File:</span>
                    <span className="ml-1">{download.file_name}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <span className="font-medium">Size:</span>
                    <span className="ml-1">{download.size}</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="mr-1" />
                    <span>Downloaded: {formatDateTime(download.download_date)}</span>
                  </div>
                </div>
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => handleDownload(download)}
                >
                  <FiDownload className="mr-2" />
                  Download Again
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Downloads;
