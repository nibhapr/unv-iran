"use client";

import React, { useState, useEffect } from 'react';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiEye,
  FiBarChart2,
  FiUpload,
  FiX
} from 'react-icons/fi';
import { motion } from 'framer-motion';

// Define interfaces based on your data models
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
  slug: string;
  category: Category | string;
  navbarCategory: NavbarCategory | string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  features: string[];
  mainImage: string;
  additionalImages: string[];
  navbarCategory: NavbarCategory | string;
  category: Category | string;
  subcategory: SubCategory | string;
  status: string;
  slug: string;
}

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Data fetching states
  const [navbarCategories, setNavbarCategories] = useState<NavbarCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Image preview states
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<(string | null)[]>([null, null, null]);

  // Form state for product
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    navbarCategory: '',
    category: '',
    subcategory: '',
    price: '',
    stock: 0,
    features: [''],
    mainImage: '',
    additionalImages: ['', '', ''],
    status: 'Active'
  });

  // Replace the sample products array with a state
  const [products, setProducts] = useState<Product[]>([]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch data on component mount
  useEffect(() => {
    Promise.all([
      fetchNavbarCategories(),
      fetchCategories(),
      fetchSubcategories(),
      fetchProducts()
    ]);
  }, []);

  const fetchNavbarCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/navbar-categories');

      if (!response.ok) {
        throw new Error('Failed to fetch navbar categories');
      }

      const data = await response.json();
      setNavbarCategories(data);
    } catch (err) {
      setError('Error fetching navbar categories');
      console.error(err);
    } finally {
      setLoading(false);
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

  const fetchSubcategories = async () => {
    try {
      const response = await fetch('/api/subcategories');

      if (!response.ok) {
        throw new Error('Failed to fetch subcategories');
      }

      const data = await response.json();
      setSubcategories(data);
    } catch (err) {
      setError('Error fetching subcategories');
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Error fetching products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      // Reset category and subcategory selection
      setFormData(prev => ({
        ...prev,
        category: '',
        subcategory: ''
      }));
      setFilteredSubcategories([]);
    }

    // If category changes, filter the subcategories
    if (name === 'category') {
      const filtered = subcategories.filter(subcategory => {
        if (!subcategory.category) return false;
        return typeof subcategory.category === 'string'
          ? subcategory.category === value
          : subcategory.category._id === value
      });
      setFilteredSubcategories(filtered);
      // Reset subcategory selection
      setFormData(prev => ({ ...prev, subcategory: '' }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length <= 1) return; // Keep at least one feature

    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Here you would typically upload to a service like AWS S3 or Cloudinary
      // For this example, we'll just use a local URL
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setMainImagePreview(e.target.result as string);
          setFormData(prev => ({ ...prev, mainImage: e.target?.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const newPreviews = [...additionalImagePreviews];
          newPreviews[index] = e.target.result as string;
          setAdditionalImagePreviews(newPreviews);

          const newImages = [...formData.additionalImages];
          newImages[index] = e.target.result as string;
          setFormData(prev => ({ ...prev, additionalImages: newImages }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    // Populate form with product data
    setFormData({
      title: product.title,
      description: product.description,
      navbarCategory: typeof product.navbarCategory === 'string'
        ? product.navbarCategory
        : product.navbarCategory._id,
      category: typeof product.category === 'string'
        ? product.category
        : product.category._id,
      subcategory: typeof product.subcategory === 'string'
        ? product.subcategory
        : product.subcategory._id,
      price: product.price.toString(),
      stock: product.stock,
      features: product.features.length > 0 ? product.features : [''],
      mainImage: product.mainImage,
      additionalImages: product.additionalImages.length > 0
        ? product.additionalImages
        : ['', '', ''],
      status: product.status
    });

    // Set image previews
    setMainImagePreview(product.mainImage);
    setAdditionalImagePreviews(
      product.additionalImages.length > 0
        ? [...product.additionalImages]
        : [null, null, null]
    );

    // Filter categories and subcategories based on the product's navbar category
    if (product.navbarCategory) {
      const navbarCategoryId = typeof product.navbarCategory === 'string'
        ? product.navbarCategory
        : product.navbarCategory._id;

      const filtered = categories.filter(category => {
        if (!category.navbarCategory) return false;
        return typeof category.navbarCategory === 'string'
          ? category.navbarCategory === navbarCategoryId
          : category.navbarCategory._id === navbarCategoryId
      });
      setFilteredCategories(filtered);
    }

    if (product.category) {
      const categoryId = typeof product.category === 'string'
        ? product.category
        : product.category._id;

      const filtered = subcategories.filter(subcategory => {
        if (!subcategory.category) return false;
        return typeof subcategory.category === 'string'
          ? subcategory.category === categoryId
          : subcategory.category._id === categoryId
      });
      setFilteredSubcategories(filtered);
    }

    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      description: '',
      navbarCategory: '',
      category: '',
      subcategory: '',
      price: '',
      stock: 0,
      features: [''],
      mainImage: '',
      additionalImages: ['', '', ''],
      status: 'Active'
    });
    setMainImagePreview(null);
    setAdditionalImagePreviews([null, null, null]);
    setFilteredCategories([]);
    setFilteredSubcategories([]);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate main image is required
    if (!formData.mainImage) {
      setError('Main product image is required');
      return;
    }

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : '/api/products';

      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingProduct ? 'update' : 'create'} product`);
      }

      // Clear form and refresh data
      setFormData({
        title: '',
        description: '',
        navbarCategory: '',
        category: '',
        subcategory: '',
        price: '',
        stock: 0,
        features: [''],
        mainImage: '',
        additionalImages: ['', '', ''],
        status: 'Active'
      });
      setShowModal(false);
      setMainImagePreview(null);
      setAdditionalImagePreviews([null, null, null]);

      // Refresh the products list
      fetchProducts();
    } catch (err) {
      setError(`Error ${editingProduct ? 'updating' : 'creating'} product`);
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
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500 mt-1">Manage your product inventory</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-200 transition-all">
            <FiBarChart2 className="mr-2" /> Analytics
          </button>
          <button
            onClick={handleAddNew}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg flex items-center shadow-md hover:shadow-lg transition-all"
          >
            <FiPlus className="mr-2" /> Add Product
          </button>
        </div>
      </motion.div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

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
                placeholder="Search products..."
                className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>

            <div className="flex space-x-3 w-full md:w-auto">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="px-4 py-2 border rounded-lg flex items-center hover:bg-gray-50 transition-all w-full md:w-auto justify-center"
              >
                <FiFilter className="mr-2 text-gray-600" />
                Filters
                <FiChevronDown className={`ml-2 text-gray-600 transform transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
              </button>

              <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white w-full md:w-auto">
                <option value="">All Categories</option>
                <option value="Cameras">Cameras</option>
                <option value="Smart Home">Smart Home</option>
                <option value="Sensors">Sensors</option>
                <option value="Security">Security</option>
                <option value="Kits">Kits</option>
              </select>
            </div>
          </div>

          {filterOpen && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex space-x-3">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All</option>
                  <option value="instock">In Stock</option>
                  <option value="low">Low Stock</option>
                  <option value="outofstock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="newest">Newest First</option>
                  <option value="pricelow">Price: Low to High</option>
                  <option value="pricehigh">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-200 overflow-hidden">
                        <img src={product.mainImage} alt={product.title} className="h-10 w-10 object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">#{product._id.substring(0, 8)}</div>
                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {typeof product.category === 'string'
                        ? product.category
                        : product.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${product.stock > 10 ? 'bg-green-100 text-green-800' :
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                        <FiEye />
                      </button>
                      <button
                        onClick={() => handleEditClick(product)}
                        className="p-1 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to delete this product?')) {
                            try {
                              const response = await fetch(`/api/products/${product._id}`, {
                                method: 'DELETE'
                              });
                              
                              if (!response.ok) {
                                throw new Error('Failed to delete product');
                              }
                              
                              // Refresh products after deletion
                              fetchProducts();
                            } catch (err) {
                              setError('Error deleting product');
                              console.error(err);
                            }
                          }
                        }}
                        className="p-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
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

        <div className="px-6 py-4 border-t flex items-center justify-between bg-gray-50">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{filteredProducts.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors">Previous</button>
            <button className="px-3 py-1 border rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors">1</button>
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </motion.div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - basic info */}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                    <select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={!formData.category}
                    >
                      <option value="">Select a Subcategory</option>
                      {filteredSubcategories.map(subcategory => (
                        <option key={subcategory._id} value={subcategory._id}>
                          {subcategory.title}
                        </option>
                      ))}
                    </select>
                    {!formData.category && (
                      <p className="text-xs text-gray-500 mt-1">
                        Please select a category first
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
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
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Coming Soon">Coming Soon</option>
                    </select>
                  </div>
                </div>

                {/* Right column - description, images, features */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
                      <span>Key Features</span>
                      <button
                        type="button"
                        onClick={addFeature}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        + Add Feature
                      </button>
                    </label>
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex space-x-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            placeholder={`Feature ${index + 1}`}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="p-2 text-red-500 hover:text-red-700"
                            disabled={formData.features.length <= 1}
                          >
                            <FiX />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Main Product Image <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center space-x-4">
                      {mainImagePreview && (
                        <div className="w-24 h-24 rounded border overflow-hidden flex items-center justify-center bg-gray-100">
                          <img
                            src={mainImagePreview}
                            alt="Product main image preview"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <label className="flex items-center justify-center w-full h-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <FiUpload className="mr-2 text-gray-500" />
                          <span className="text-sm text-gray-500">Upload main image</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleMainImageChange}
                            required={!mainImagePreview}
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Required: High quality image for product display
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Images (Optional)
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[0, 1, 2].map((index) => (
                        <div key={index}>
                          {additionalImagePreviews[index] ? (
                            <div className="relative group">
                              <div className="w-full h-20 rounded border overflow-hidden flex items-center justify-center bg-gray-100">
                                <img
                                  src={additionalImagePreviews[index]}
                                  alt={`Product image ${index + 1}`}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                                <label className="p-1 bg-white rounded-full cursor-pointer">
                                  <FiEdit2 className="text-gray-700" />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleAdditionalImageChange(index, e)}
                                  />
                                </label>
                              </div>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                              <FiUpload className="text-gray-400" />
                              <span className="text-xs text-gray-500 mt-1">Image {index + 1}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleAdditionalImageChange(index, e)}
                              />
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t">
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
                  {editingProduct ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}