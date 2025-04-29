"use client";

import React, { useState, useEffect } from 'react';
import { 
  FiMail, 
  FiPhone, 
  FiSearch, 
  FiTrash2, 
  FiEye, 
  FiFilter,
  FiChevronDown,
  FiMessageSquare,
  FiUser,
  FiCalendar,
  FiChevronRight,
  FiX,
  FiArrowRight
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  createdAt: string;
}

export default function Contact() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Fetch contact messages
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contact');
        if (response.ok) {
          const data = await response.json();
          setContacts(data);
        } else {
          toast.error('Failed to fetch contact messages');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
        toast.error('An error occurred while fetching contacts');
      } finally {
        setLoading(false);
      }
    };
    
    fetchContacts();
  }, []);

  const filteredContacts = contacts
    .filter(contact => 
      (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === 'all' || contact.status.toLowerCase() === filterStatus.toLowerCase())
    );

  const statusColors = {
    'Unread': 'bg-blue-100 text-blue-800',
    'Read': 'bg-gray-100 text-gray-800',
    'Replied': 'bg-green-100 text-green-800'
  };

  const handleViewContact = (contact: ContactMessage) => {
    setSelectedContact(contact);
    setShowModal(true);
    
    // If the message is unread, mark it as read
    if (contact.status === 'Unread') {
      updateContactStatus(contact._id, 'Read');
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await fetch(`/api/contact/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setContacts(contacts.filter(contact => contact._id !== id));
          toast.success('Message deleted successfully');
        } else {
          toast.error('Failed to delete message');
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        toast.error('An error occurred while deleting the message');
      }
    }
  };

  const updateContactStatus = async (id: string, status: 'Unread' | 'Read' | 'Replied') => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        setContacts(contacts.map(contact => 
          contact._id === id ? { ...contact, status } : contact
        ));
        
        if (selectedContact && selectedContact._id === id) {
          setSelectedContact({ ...selectedContact, status });
        }
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
      toast.error('Failed to update message status');
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
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Contact Messages</h1>
          <p className="text-gray-500 mt-1">Manage customer inquiries</p>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6"
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white p-5 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <FiMessageSquare className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Messages</h3>
              <p className="text-3xl font-bold">{contacts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-white p-5 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <FiMail className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Unread Messages</h3>
              <p className="text-3xl font-bold">{contacts.filter(c => c.status === 'Unread').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl text-white p-5 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <FiArrowRight className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Replied Messages</h3>
              <p className="text-3xl font-bold">{contacts.filter(c => c.status === 'Replied').length}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-5 border-b">
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow w-full md:w-auto">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <div className="flex space-x-3 w-full md:w-auto">
              <button 
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 border rounded-lg flex items-center hover:bg-gray-50 transition-all w-full md:w-auto justify-center ${filterStatus === 'all' ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilterStatus('Unread')}
                className={`px-4 py-2 border rounded-lg flex items-center hover:bg-gray-50 transition-all w-full md:w-auto justify-center ${filterStatus === 'Unread' ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                Unread
              </button>
              <button 
                onClick={() => setFilterStatus('Read')}
                className={`px-4 py-2 border rounded-lg flex items-center hover:bg-gray-50 transition-all w-full md:w-auto justify-center ${filterStatus === 'Read' ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                Read
              </button>
              <button 
                onClick={() => setFilterStatus('Replied')}
                className={`px-4 py-2 border rounded-lg flex items-center hover:bg-gray-50 transition-all w-full md:w-auto justify-center ${filterStatus === 'Replied' ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                Replied
              </button>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading messages...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-8 text-center">
            <FiMessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-500">No messages found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contact._id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(contact.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${statusColors[contact.status as keyof typeof statusColors]}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => handleViewContact(contact)}
                        >
                          <FiEye />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteContact(contact._id)}
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
      </motion.div>

      {/* Message Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">Message Details</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-2">
                    <FiUser className="text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Name</span>
                  </div>
                  <p className="text-gray-800 font-medium">{selectedContact.name}</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <FiMail className="text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Email</span>
                  </div>
                  <p className="text-gray-800">{selectedContact.email}</p>
                </div>
                
                {selectedContact.phone && (
                  <div>
                    <div className="flex items-center mb-2">
                      <FiPhone className="text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-gray-500">Phone</span>
                    </div>
                    <p className="text-gray-800">{selectedContact.phone}</p>
                  </div>
                )}
                
                <div>
                  <div className="flex items-center mb-2">
                    <FiCalendar className="text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Date</span>
                  </div>
                  <p className="text-gray-800">{formatDate(selectedContact.createdAt)}</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <FiMessageSquare className="text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Message</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={() => updateContactStatus(selectedContact._id, 'Unread')}
                  className={`px-4 py-2 rounded-lg border ${selectedContact.status === 'Unread' ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-100'}`}
                >
                  Mark as Unread
                </button>
                <button
                  onClick={() => updateContactStatus(selectedContact._id, 'Read')}
                  className={`px-4 py-2 rounded-lg border ${selectedContact.status === 'Read' ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-100'}`}
                >
                  Mark as Read
                </button>
                <button
                  onClick={() => updateContactStatus(selectedContact._id, 'Replied')}
                  className={`px-4 py-2 rounded-lg border ${selectedContact.status === 'Replied' ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-100'}`}
                >
                  Mark as Replied
                </button>
              </div>
              <button
                onClick={() => handleDeleteContact(selectedContact._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}