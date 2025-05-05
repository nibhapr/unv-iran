"use client";

import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSearch, 
  FiUpload
} from 'react-icons/fi';
import { motion } from 'framer-motion';

interface NavbarCategory {
  _id: string;
  title: string;
  slug: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  navbarCategory: NavbarCategory | string;
}

interface SubCategory {
  _id: string;
  title: string;
  description: string;
  status: 'Active' | 'Inactive';
  image: string;
  category: Category | string;
  navbarCategory: NavbarCategory | string;
  products: number;
  slug: string;
}

export default function SubCategories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [navbarCategories, setNavbarCategories] = useState<NavbarCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingSubcategory, setEditingSubcategory] = useState<SubCategory | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    navbarCategory: '',
    category: '',
    status: 'Active',
    image: '',
    products: 0
  });

  // Fetch data on component mount
  useEffect(() => {
    Promise.all([
      fetchSubcategories(),
      fetchNavbarCategories(),
      fetchCategories()
    ]);
  }, []);

  const fetchSubcategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/subcategories');
      
      if (!response.ok) {
        throw new Error('Failed to fetch subcategories');
      }
      
      const data = await response.json();
      setSubcategories(data);
    } catch (err) {
      setError('Error fetching subcategories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNavbarCategories = async () => {
    try {
      const response = await fetch('/api/navbar-categories');
      
      if (!response.ok) {
        throw new Error('Failed to fetch navbar categories');
      }
      
      const data = await response.json();
      setNavbarCategories(data);
    } catch (err) {
      setError('Error fetching navbar categories');
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError('Error fetching categories');
      console.error(err);
    }
  };

  const filteredSubcategories = subcategories.filter(subcategory =>
    (typeof subcategory.title === 'string' && 
    subcategory.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // If navbarCategory changes, filter the categories
    if (name === 'navbarCategory') {
      const filtered = categories.filter(category => {
        if (!category.navbarCategory) return false;
        return typeof category.navbarCategory === 'string' 
          ? category.navbarCategory === value
          : category.navbarCategory._id === value
      });
      setFilteredCategories(filtered);
      // Reset category selection
      setFormData(prev => ({ ...prev, category: '' }));
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size - limit to 5MB
      if (file.size > 5 * 1024 * 1024) {
        setError('Image is too large. Maximum size is 5MB.');
        return;
      }
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.');
        return;
      }
      
      // Clear any previous errors
      setError('');
      
      // Show the local preview first
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          try {
            // Set the local preview
            setImagePreview(e.target.result as string);
            
            // Get the base64 string
            const base64Image = e.target.result as string;
            
            console.log('Image loaded, size:', Math.round((base64Image.length * 0.75) / 1024), 'KB');
            
            // First attempt: Try with the test-upload endpoint
            try {
              console.log('Attempting upload via test endpoint...');
              const testResponse = await fetch('/api/test-upload', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  image: base64Image,
                }),
              });
              
              if (testResponse.ok) {
                const data = await testResponse.json();
                console.log('✅ Test upload successful:', data.url);
                setFormData(prev => ({ ...prev, image: data.url }));
                return;
              } else {
                console.log('❌ Test upload failed, trying standard upload...');
              }
            } catch (error) {
              console.error('Error with test upload:', error);
              // Continue to next attempt
            }
            
            // Second attempt: Try with the regular upload endpoint with explicit folder
            try {
              console.log('Attempting standard upload...');
              const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  image: base64Image,
                  folder: 'subcategories'
                }),
              });
              
              if (!response.ok) {
                const errorData = await response.json();
                console.error('Upload failed with status:', response.status);
                throw new Error(errorData.error || 'Failed to upload image');
              }
              
              const data = await response.json();
              console.log('✅ Image uploaded successfully:', data.url);
              
              // Update the form data with the Cloudinary URL
              setFormData(prev => ({ ...prev, image: data.url }));
            } catch (finalError) {
              console.error('❌ All upload attempts failed:', finalError);
              setError(finalError instanceof Error ? finalError.message : 'Failed to upload image. Please try again.');
              // Reset image preview on error
              setImagePreview(null);
            }
          } catch (error) {
            console.error('❌ Error uploading image:', error);
            setError(error instanceof Error ? error.message : 'Failed to upload image. Please try again.');
            // Reset image preview on error
            setImagePreview(null);
          }
        }
      };
      reader.onerror = () => {
        setError('Error reading file. Please try again.');
        setImagePreview(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (subcategory: SubCategory) => {
    setEditingSubcategory(subcategory);
    
    // If editing, we need to populate the filtered categories based on the navbar category
    const navCatId = subcategory.navbarCategory 
      ? (typeof subcategory.navbarCategory === 'string' 
          ? subcategory.navbarCategory 
          : subcategory.navbarCategory._id)
      : '';
      
    const filtered = categories.filter(category => {
      if (!category.navbarCategory) return false;
      return typeof category.navbarCategory === 'string' 
        ? category.navbarCategory === navCatId
        : category.navbarCategory._id === navCatId
    });
    
    setFilteredCategories(filtered);
    
    setFormData({
      title: subcategory.title,
      description: subcategory.description,
      navbarCategory: subcategory.navbarCategory
        ? (typeof subcategory.navbarCategory === 'string' 
            ? subcategory.navbarCategory 
            : subcategory.navbarCategory._id)
        : '',
      category: subcategory.category
        ? (typeof subcategory.category === 'string' 
            ? subcategory.category 
            : subcategory.category._id)
        : '',
      status: subcategory.status,
      image: subcategory.image,
      products: subcategory.products
    });
    
    setImagePreview(subcategory.image);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingSubcategory(null);
    setFormData({
      title: '',
      description: '',
      navbarCategory: '',
      category: '',
      status: 'Active',
      image: '',
      products: 0
    });
    setFilteredCategories([]);
    setImagePreview(null);
    setShowModal(true);
  };

  const handleDeleteSubcategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subcategory?')) return;

    try {
      // Get the subcategory to delete (to get the image URL)
      const subcategoryToDelete = subcategories.find(sub => sub._id === id);
      
      const response = await fetch(`/api/subcategories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete subcategory');
      }

      // If there was an image, try to delete it from Cloudinary
      if (subcategoryToDelete?.image && subcategoryToDelete.image.includes('cloudinary')) {
        try {
          await fetch('/api/upload/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: subcategoryToDelete.image }),
          });
        } catch (error) {
          console.error('Error deleting image:', error);
          // Continue anyway, as the subcategory was already deleted
        }
      }

      // Refresh the subcategories list
      fetchSubcategories();
    } catch (err) {
      setError('Error deleting subcategory');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingSubcategory 
        ? `/api/subcategories/${editingSubcategory._id}` 
        : '/api/subcategories';
      
      const method = editingSubcategory ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${editingSubcategory ? 'update' : 'create'} subcategory`);
      }
      
      // Clear form and refresh data
      setFormData({ 
        title: '', 
        description: '', 
        navbarCategory: '', 
        category: '',
        status: 'Active', 
        image: '',
        products: 0
      });
      setShowModal(false);
      setImagePreview(null);
      
      // Refresh the subcategories list
      fetchSubcategories();
    } catch (err) {
      setError(`Error ${editingSubcategory ? 'updating' : 'creating'} subcategory`);
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Subcategories</h1>
          <p className="text-gray-500 mt-1">Manage product subcategories</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:shadow-lg transition-all"
        >
          <FiPlus className="mr-2" /> Add Subcategory
        </button>
      </motion.div>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-5 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search subcategories..."
              className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading subcategories...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Navbar Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubcategories.length > 0 ? (
                  filteredSubcategories.map((subcategory) => (
                    <tr key={subcategory._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img src={subcategory.image || 'https://via.placeholder.com/40'} alt={subcategory.title} className="h-10 w-10 object-cover" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">#{subcategory._id.substring(0, 4)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subcategory.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {typeof subcategory.navbarCategory === 'string' 
                          ? subcategory.navbarCategory 
                          : subcategory.navbarCategory.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {typeof subcategory.category === 'string' 
                          ? subcategory.category 
                          : subcategory.category.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {subcategory.products} products
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${subcategory.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {subcategory.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button 
                            className="p-1 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                            onClick={() => handleEditClick(subcategory)}
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            className="p-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            onClick={() => handleDeleteSubcategory(subcategory._id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      No subcategories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
      
      {/* Add/Edit Subcategory Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingSubcategory ? 'Edit Subcategory' : 'Add New Subcategory'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input 
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Navbar Category</label>
                  <select 
                    name="navbarCategory"
                    value={formData.navbarCategory}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a Navbar Category</option>
                    {navbarCategories.map(category => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={!formData.navbarCategory}
                  >
                    <option value="">Select a Category</option>
                    {filteredCategories.map(category => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {!formData.navbarCategory && (
                    <p className="text-xs text-gray-500 mt-1">
                      Please select a navbar category first
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <div className="flex items-center space-x-4">
                    {imagePreview && (
                      <div className="w-16 h-16 rounded border overflow-hidden flex items-center justify-center bg-gray-100">
                        <img 
                          src={imagePreview} 
                          alt="Subcategory image preview" 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <label className="flex items-center justify-center w-full h-10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <FiUpload className="mr-2 text-gray-500" />
                        <span className="text-sm text-gray-500">Upload image</span>
                        <input 
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Recommended: Square image (40x40px or larger)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  {editingSubcategory ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}