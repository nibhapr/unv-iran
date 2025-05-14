"use client";

import React, { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiChevronDown, 
  FiGrid, 
  FiList,
  FiTag,
  FiShoppingCart
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Fetch data on component mount
  useEffect(() => {
    Promise.all([
      fetchProducts(),
      fetchCategories()
    ]);
  }, []);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError('Error fetching products');
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
      console.error('Error fetching categories:', err);
    }
  };

  const applyFilters = () => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => {
        if (typeof product.category === 'string') {
          return product.category === selectedCategory;
        } else {
          return product.category._id === selectedCategory;
        }
      });
    }
    
    setFilteredProducts(result);
  };

  // Function to get product URL based on its hierarchy
  const getProductUrl = (product: Product) => {
    const navbarCat = typeof product.navbarCategory === 'string' 
      ? { slug: 'products' } // fallback
      : product.navbarCategory;
      
    const cat = typeof product.category === 'string'
      ? { slug: 'category' } // fallback
      : product.category;
      
    const subcat = typeof product.subcategory === 'string'
      ? { slug: 'subcategory' } // fallback
      : product.subcategory;
      
    return `/${navbarCat.slug}/${cat.slug}/${subcat.slug}/${product.slug}`;
  };

  // Format price with currency
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white pt-40 pb-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-indigo-200 opacity-15 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight drop-shadow-md">
              Discover Our Products
            </h1>
            <div className="w-32 h-1.5 bg-white/80 mb-8 rounded-full shadow-lg"></div>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Explore our wide range of high-quality products designed to meet your needs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-6xl py-8 -mt-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-5 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            
            <div className="flex w-full md:w-auto gap-3">
              <select 
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white w-full md:w-auto"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              <div className="flex gap-2">
                <button 
                  className={`p-3 rounded-lg border ${viewMode === 'grid' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'text-gray-500'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid />
                </button>
                <button 
                  className={`p-3 rounded-lg border ${viewMode === 'list' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'text-gray-500'}`}
                  onClick={() => setViewMode('list')}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products display section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredProducts.length} Products
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-10 text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={getProductUrl(product)}>
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                      <div className="h-52 bg-gray-100 overflow-hidden">
                        <img 
                          src={product.mainImage} 
                          alt={product.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5 flex-grow flex flex-col">
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg mb-2 text-gray-800">{product.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
                        </div>
                        
                        <div className="mt-auto">
                          <div className="flex justify-end items-center">
                            <button className="text-sm flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                              <FiTag className="mr-1" /> View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={getProductUrl(product)}>
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4 bg-gray-100 rounded-lg overflow-hidden h-40">
                          <img 
                            src={product.mainImage} 
                            alt={product.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="md:w-3/4 flex flex-col">
                          <h3 className="font-bold text-xl text-gray-800 mb-2">{product.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                          
                          {product.features && product.features.length > 0 && (
                            <div className="mb-4">
                              <ul className="flex flex-wrap gap-2">
                                {product.features.slice(0, 3).map((feature, i) => (
                                  <li key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-md">
                                    {feature}
                                  </li>
                                ))}
                                {product.features.length > 3 && (
                                  <li className="text-xs bg-gray-100 px-2 py-1 rounded-md">
                                    +{product.features.length - 3} more
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                          
                          <div className="mt-auto flex justify-end items-center">
                            <button className="text-sm flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                              View Details <FiChevronDown className="ml-1 transform rotate-270" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white text-center shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contact our team for personalized assistance and product recommendations tailored to your specific needs.
          </p>
          <Link href="/contact">
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
              Contact Us
            </button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
