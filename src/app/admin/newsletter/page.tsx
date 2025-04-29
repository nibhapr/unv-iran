"use client";

import React, { useState, useEffect } from 'react';
import { FiSearch, FiTrash2, FiMail, FiCheck, FiX } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';

interface Subscriber {
  _id: string;
  email: string;
  status: 'Active' | 'Unsubscribed';
  subscriptionDate: string;
}

export default function Newsletter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fetch subscribers on component mount
  useEffect(() => {
    fetchSubscribers();
  }, []);
  
  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/newsletter');
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscribers');
      }
      
      const data = await response.json();
      setSubscribers(data);
    } catch (err) {
      setError('Error fetching subscribers');
      console.error(err);
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeleteSubscriber = async (id: string) => {
    if (confirm('Are you sure you want to delete this subscriber?')) {
      try {
        const response = await fetch(`/api/newsletter/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setSubscribers(subscribers.filter(sub => sub._id !== id));
          toast.success('Subscriber deleted successfully');
        } else {
          toast.error('Failed to delete subscriber');
        }
      } catch (error) {
        console.error('Error deleting subscriber:', error);
        toast.error('An error occurred while deleting the subscriber');
      }
    }
  };
  
  const handleStatusChange = async (id: string, newStatus: 'Active' | 'Unsubscribed') => {
    try {
      const response = await fetch(`/api/newsletter/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        setSubscribers(subscribers.map(sub => 
          sub._id === id ? { ...sub, status: newStatus } : sub
        ));
        toast.success(`Subscriber ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully`);
      } else {
        toast.error('Failed to update subscriber status');
      }
    } catch (error) {
      console.error('Error updating subscriber status:', error);
      toast.error('An error occurred while updating the subscriber');
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Newsletter Subscribers</h1>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search subscribers..."
              className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading subscribers...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <FiX className="mx-auto h-12 w-12 text-red-500" />
            <p className="mt-4 text-gray-500">{error}</p>
          </div>
        ) : filteredSubscribers.length === 0 ? (
          <div className="p-8 text-center">
            <FiMail className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-500">No subscribers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscriber.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(subscriber.subscriptionDate)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        subscriber.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        {subscriber.status === 'Active' ? (
                          <button 
                            onClick={() => handleStatusChange(subscriber._id, 'Unsubscribed')}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Deactivate"
                          >
                            <FiX />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleStatusChange(subscriber._id, 'Active')}
                            className="text-green-600 hover:text-green-900"
                            title="Activate"
                          >
                            <FiCheck />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteSubscriber(subscriber._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}