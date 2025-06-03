import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSupabase } from '../../contexts/SupabaseContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { signUp } = useSupabase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const password = watch('password', '');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await signUp(data.email, data.password);
      
      if (error) throw error;
      
      setSuccess(true);
      // For demo purposes, we'll navigate to login directly
      // In a real app, you might want to show a verification message
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      console.error('Error signing up:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            DigitalVault
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        {error && (
          <Alert type="error" title="Registration Error">
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert type="success" title="Registration Successful">
            Your account has been created successfully. You can now sign in.
          </Alert>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              id="email"
              type="email"
              label="Email address"
              placeholder="Email address"
              autoComplete="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
            />
            
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              autoComplete="new-password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              error={errors.password?.message}
            />
            
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              error={errors.confirmPassword?.message}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={loading}
              disabled={success}
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
