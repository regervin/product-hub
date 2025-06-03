import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-primary-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
        <p className="mt-2 text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Link to="/">
            <Button variant="primary">
              <FiHome className="mr-2" />
              Go Home
            </Button>
          </Link>
          <button onClick={() => window.history.back()}>
            <Button variant="outline">
              <FiArrowLeft className="mr-2" />
              Go Back
            </Button>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
