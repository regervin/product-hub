import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSupabase } from './contexts/SupabaseContext';

// Placeholder components - you'll need to create these
const Home = () => <div className="p-8">Home Page</div>;
const Login = () => <div className="p-8">Login Page</div>;
const Dashboard = () => <div className="p-8">Dashboard Page</div>;
const NotFound = () => <div className="p-8">404 - Page Not Found</div>;

function App() {
  const { loading, error, supabase } = useSupabase();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !supabase) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
          <p className="mb-4">{error || "Supabase client could not be initialized."}</p>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="font-medium mb-2">Please check your .env file and ensure it contains:</p>
            <pre className="bg-gray-800 text-white p-3 rounded text-sm overflow-x-auto">
              VITE_SUPABASE_URL=https://your-project-id.supabase.co
              VITE_SUPABASE_ANON_KEY=your-anon-key
            </pre>
            <p className="mt-4 text-sm text-gray-600">
              You can find these values in your Supabase project dashboard under Project Settings → API.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
