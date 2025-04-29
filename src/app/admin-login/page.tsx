"use client";

import React, { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiLock, FiAlertCircle } from 'react-icons/fi';
import Image from 'next/image';
import { toast, Toaster } from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if we were redirected from /admin/* due to auth failure
    const urlParams = new URLSearchParams(window.location.search);
    const authFailed = urlParams.get('auth') === 'failed';
    
    if (authFailed) {
      toast.error('Your session has expired. Please log in again.');
      // Clear any bad cookies
      document.cookie = 'admin_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful!');
        
        // Add a short delay
        setTimeout(() => {
          // Use direct navigation to bypass Next.js router
          window.location.href = '/admin/dashboard';
        }, 300);
      } else {
        setError(data.error || 'Invalid credentials');
        toast.error(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login');
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
          <div className="flex justify-center mb-4">
            {/* Replace with your actual logo */}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Image 
                src="/logo.svg" 
                alt="Uniview Logo" 
                width={40} 
                height={40} 
              />
            </div>
          </div>
          <h1 className="text-white text-2xl font-bold">Admin Portal</h1>
          <p className="text-blue-100 mt-2">Sign in to access the admin dashboard</p>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-lg flex items-center">
              <FiAlertCircle className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          {/* Update the form to explicitly set method="post" */}
          <form onSubmit={handleSubmit} method="post" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                  shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 
                  hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-blue-500 transition-all duration-200"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}