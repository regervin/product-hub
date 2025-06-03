import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSupabase } from '../contexts/SupabaseContext';
import { 
  FiHome, 
  FiPackage, 
  FiUsers, 
  FiKey, 
  FiSettings, 
  FiLogOut, 
  FiMenu, 
  FiX,
  FiUser,
  FiCreditCard,
  FiLayers
} from 'react-icons/fi';

const Layout = () => {
  const { session, signOut } = useSupabase();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking on a link (mobile)
  const handleLinkClick = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  if (!session) {
    return <Outlet />;
  }

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'bg-primary-700' : '';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className={`bg-primary-800 text-white w-64 fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-30`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-primary-700">
          <Link to="/dashboard" className="text-xl font-bold" onClick={handleLinkClick}>
            ProductHub
          </Link>
          <button onClick={toggleSidebar} className="md:hidden">
            <FiX size={24} />
          </button>
        </div>
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            <Link 
              to="/dashboard" 
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-primary-700 ${isActive('/dashboard')}`}
              onClick={handleLinkClick}
            >
              <FiHome className="mr-3 text-lg" />
              Dashboard
            </Link>
            <Link 
              to="/products" 
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-primary-700 ${isActive('/products')}`}
              onClick={handleLinkClick}
            >
              <FiPackage className="mr-3 text-lg" />
              Products
            </Link>
            <Link 
              to="/memberships" 
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-primary-700 ${isActive('/memberships')}`}
              onClick={handleLinkClick}
            >
              <FiLayers className="mr-3 text-lg" />
              Memberships
            </Link>
            <Link 
              to="/customers" 
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-primary-700 ${isActive('/customers')}`}
              onClick={handleLinkClick}
            >
              <FiUsers className="mr-3 text-lg" />
              Customers
            </Link>
            <Link 
              to="/licenses" 
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-primary-700 ${isActive('/licenses')}`}
              onClick={handleLinkClick}
            >
              <FiKey className="mr-3 text-lg" />
              Licenses
            </Link>
            <Link 
              to="/settings" 
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-primary-700 ${isActive('/settings')}`}
              onClick={handleLinkClick}
            >
              <FiSettings className="mr-3 text-lg" />
              Settings
            </Link>
          </div>
          <div className="mt-10 pt-6 border-t border-primary-700">
            <Link 
              to="/member" 
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-primary-700 ${isActive('/member')}`}
              onClick={handleLinkClick}
            >
              <FiUser className="mr-3 text-lg" />
              Member Area
            </Link>
            <button 
              onClick={handleSignOut} 
              className="flex w-full items-center px-4 py-2 mt-1 text-sm font-medium rounded-md hover:bg-primary-700"
            >
              <FiLogOut className="mr-3 text-lg" />
              Sign Out
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:pl-64">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button 
              onClick={toggleSidebar} 
              className="md:hidden text-gray-500 focus:outline-none"
            >
              <FiMenu size={24} />
            </button>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-4">
                {session?.user?.email}
              </span>
              <div className="relative">
                <button className="flex items-center focus:outline-none">
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                    {session?.user?.email?.charAt(0).toUpperCase()}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
