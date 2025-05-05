"use client";

import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiSearch, 
  FiGrid, 
  FiEye,
  FiBox,
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
  description: string;
  status: 'Active' | 'Inactive';
  products: number;
  icon: string;
  navbarCategory: NavbarCategory | string;
  slug: string;
}

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [navbarCategories, setNavbarCategories] = useState<NavbarCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    navbarCategory: '',
    status: 'Active',
    icon: '',
    products: 0
  });

  // Fetch data on component mount
  useEffect(() => {
    Promise.all([
      fetchCategories(),
      fetchNavbarCategories()
    ]);
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categories');
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError('Error fetching categories');
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

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size - limit to 5MB
      if (file.size > 5 * 1024 * 1024) {
        setError('Image is too large. Maximum size is 5MB.');
        return;
      }
      
      // Show the local preview first
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          try {
            // Set the local preview
            setIconPreview(e.target.result as string);
            
            // Get the base64 string
            const base64Image = e.target.result as string;
            
            // Upload to Cloudinary
            const response = await fetch('/api/upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                image: base64Image,
                folder: 'categories'
              }),
            });
            
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Failed to upload image');
            }
            
            const data = await response.json();
            
            // Update the form data with the Cloudinary URL
            setFormData(prev => ({ ...prev, icon: data.url }));
          } catch (error) {
            console.error('Error uploading image:', error);
            setError(error instanceof Error ? error.message : 'Failed to upload image. Please try again.');
          }
        }
      };
      reader.onerror = () => {
        setError('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      navbarCategory: typeof category.navbarCategory === 'string' 
        ? category.navbarCategory 
        : category.navbarCategory._id,
      status: category.status,
      icon: category.icon,
      products: category.products
    });
    setIconPreview(category.icon);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      navbarCategory: '',
      status: 'Active',
      icon: '',
      products: 0
    });
    setIconPreview(null);
    setShowModal(true);
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      // Get the category to delete (to get the icon URL)
      const categoryToDelete = categories.find(cat => cat._id === id);
      
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      // If there was an icon, try to delete it from Cloudinary
      if (categoryToDelete?.icon && categoryToDelete.icon.includes('cloudinary')) {
        try {
          await fetch('/api/upload/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: categoryToDelete.icon }),
          });
        } catch (error) {
          console.error('Error deleting image:', error);
          // Continue anyway, as the category was already deleted
        }
      }

      // Refresh the categories list
      fetchCategories();
    } catch (err) {
      setError('Error deleting category');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingCategory 
        ? `/api/categories/${editingCategory._id}` 
        : '/api/categories';
      
      const method = editingCategory ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${editingCategory ? 'update' : 'create'} category`);
      }
      
      // Clear form and refresh data
      setFormData({ 
        name: '', 
        description: '', 
        navbarCategory: '', 
        status: 'Active', 
        icon: '',
        products: 0
      });
      setShowModal(false);
      setIconPreview(null);
      
      // Refresh the categories list
      fetchCategories();
    } catch (err) {
      setError(`Error ${editingCategory ? 'updating' : 'creating'} category`);
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
          <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-500 mt-1">Manage product categories</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:shadow-lg transition-all"
        >
          <FiPlus className="mr-2" /> Add Category
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6"
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white p-5 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <FiGrid className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Categories</h3>
              <p className="text-3xl font-bold">{categories.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white p-5 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <FiBox className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Products</h3>
              <p className="text-3xl font-bold">{categories.reduce((acc, cat) => acc + cat.products, 0)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl text-white p-5 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <FiEye className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Active Categories</h3>
              <p className="text-3xl font-bold">{categories.filter(c => c.status === 'Active').length}</p>
            </div>
          </div>
        </div>
      </motion.div>

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
              placeholder="Search categories..."
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
            <p className="mt-3 text-gray-600">Loading categories...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Navbar Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img src={category.icon || 'https://via.placeholder.com/40'} alt={category.name} className="h-10 w-10 object-cover" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">#{category._id.substring(0, 4)}</div>
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.description.substring(0, 50)}...</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {typeof category.navbarCategory === 'string' 
                          ? category.navbarCategory 
                          : category.navbarCategory?.title || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {category.products} products
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${category.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {category.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button 
                            className="p-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            onClick={() => window.open(`/${typeof category.navbarCategory === 'string' ? '' : category.navbarCategory.slug}/${category.slug}`, '_blank')}
                          >
                            <FiEye />
                          </button>
                          <button 
                            className="p-1 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                            onClick={() => handleEditClick(category)}
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            className="p-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            onClick={() => handleDeleteCategory(category._id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No categories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="px-6 py-4 border-t flex items-center justify-between bg-gray-50">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCategories.length}</span> of <span className="font-medium">{filteredCategories.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors">Previous</button>
            <button className="px-3 py-1 border rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors">1</button>
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </motion.div>
      
      {/* Add/Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon Image</label>
                  <div className="flex items-center space-x-4">
                    {iconPreview && (
                      <div className="w-16 h-16 rounded border overflow-hidden flex items-center justify-center bg-gray-100">
                        <img 
                          src={iconPreview} 
                          alt="Category icon preview" 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <label className="flex items-center justify-center w-full h-10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <FiUpload className="mr-2 text-gray-500" />
                        <span className="text-sm text-gray-500">Upload icon</span>
                        <input 
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleIconChange}
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
                  {editingCategory ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}