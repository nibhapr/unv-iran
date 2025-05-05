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

      const data = await response.json() as Product[];
      
      // Ensure all products have valid additionalImages arrays
      const normalizedProducts = data.map((product: Product) => ({
        ...product,
        // Ensure additionalImages is always an array
        additionalImages: Array.isArray(product.additionalImages) ? product.additionalImages : []
      }));
      
      console.log('Fetched products with images:', 
        normalizedProducts.map((p: Product) => ({ 
          id: p._id, 
          mainImage: p.mainImage ? 'Set' : 'Not set',
          additionalImages: p.additionalImages.length
        }))
      );
      
      setProducts(normalizedProducts);
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

  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            setMainImagePreview(e.target.result as string);

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
                folder: 'products'
              }),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Failed to upload image');
            }

            const data = await response.json();

            // Update the form data with the Cloudinary URL
            setFormData(prev => ({ ...prev, mainImage: data.url }));
          } catch (error) {
            console.error('Error uploading image:', error);
            setError(error instanceof Error ? error.message : 'Failed to upload main image. Please try again.');
          }
        }
      };
      reader.onerror = () => {
        setError('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`handleAdditionalImageChange called for index ${index}`);
    
    if (!e.target.files || !e.target.files[0]) {
      console.error('No file selected');
      return;
    }
    
    const file = e.target.files[0];
    console.log(`File selected for index ${index}: ${file.name}, size: ${file.size}, type: ${file.type}`);
    
    // Check file size - limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError(`Image ${index + 1} is too large. Maximum size is 5MB.`);
      return;
    }

    setError(''); // Clear any previous errors
    
    // Create a copy of the current previews and images
    // Use direct variable references first to avoid race conditions with state
    const currentPreviews = [...additionalImagePreviews];
    const currentAdditionalImages = [...formData.additionalImages];
    
    // First set the local preview without waiting for upload
    try {
      const reader = new FileReader();
      
      reader.onload = async (readerEvent) => {
        if (readerEvent.target?.result) {
          const base64Image = readerEvent.target.result as string;
          console.log(`File ${index} read successfully, base64 length: ${base64Image.length}`);
          
          // Update preview immediately and store reference
          currentPreviews[index] = base64Image;
          setAdditionalImagePreviews([...currentPreviews]);
          console.log(`Preview updated for index ${index}`);
          
          // Now attempt to upload to Cloudinary
          try {
            console.log(`Starting Cloudinary upload for index ${index}`);
            
            const uploadResponse = await fetch('/api/upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                image: base64Image,
                folder: 'products'
              }),
            });
            
            console.log(`Upload response status for index ${index}: ${uploadResponse.status}`);
            
            if (!uploadResponse.ok) {
              let errorMessage = `Failed to upload image ${index + 1}`;
              try {
                const errorData = await uploadResponse.json();
                console.error(`Server error response for index ${index}:`, errorData);
                errorMessage = errorData.error || errorMessage;
              } catch (jsonError) {
                console.error(`Failed to parse error response for index ${index}:`, jsonError);
              }
              throw new Error(errorMessage);
            }
            
            const uploadData = await uploadResponse.json();
            console.log(`Upload successful for index ${index}, received URL: ${uploadData.url}`);
            
            // Update the form data with the Cloudinary URL using the latest state
            // Get current state to avoid overwriting other uploads
            setFormData(prevFormData => {
              const updatedImages = [...prevFormData.additionalImages];
              updatedImages[index] = uploadData.url;
              console.log(`Updated formData.additionalImages[${index}] with URL: ${uploadData.url}`);
              console.log('Updated additional images array:', updatedImages);
              return {
                ...prevFormData,
                additionalImages: updatedImages
              };
            });
            
            // Also update the local preview with the Cloudinary URL
            // This ensures the UI displays the actual stored URL
            setAdditionalImagePreviews(prev => {
              const updated = [...prev];
              updated[index] = uploadData.url;
              return updated;
            });
            
            // After updating formData, immediately check if it was updated correctly
            setTimeout(() => {
              console.log(`Verification check - Current additionalImages[${index}]:`, formData.additionalImages[index]);
              debugImages();
            }, 100);
          } catch (uploadError) {
            console.error(`Upload error for index ${index}:`, uploadError);
            setError(uploadError instanceof Error ? uploadError.message : `Failed to upload image ${index + 1} to server`);
            
            // Even if upload fails, keep the local preview
            console.log(`Keeping local preview for index ${index} despite upload failure`);
          }
        }
      };
      
      reader.onerror = (readerError) => {
        console.error(`FileReader error for index ${index}:`, readerError);
        setError(`Error reading file ${index + 1}. Please try a different image or browser.`);
      };
      
      console.log(`Starting to read file as Data URL for index ${index}`);
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error(`Unexpected error in image processing for index ${index}:`, error);
      setError(`Failed to process image ${index + 1}. Please try a different image.`);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    
    // Log the product's images for debugging
    console.log('Editing product with images:', {
      mainImage: product.mainImage,
      additionalImages: product.additionalImages
    });
    
    // Ensure additionalImages is properly formatted - handle both array and empty cases
    const formattedAdditionalImages = Array.isArray(product.additionalImages) && product.additionalImages.length > 0
      ? [...product.additionalImages, '', '', ''].slice(0, 3)  // Ensure it has exactly 3 items
      : ['', '', ''];
      
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
      additionalImages: formattedAdditionalImages,
      status: product.status
    });

    // Set image previews
    setMainImagePreview(product.mainImage);
    
    // Set additional image previews, ensuring they are proper URLs
    const additionalPreviews = formattedAdditionalImages.map(url => 
      url && url.trim() !== '' ? url : null
    );
    console.log('Setting additional image previews:', additionalPreviews);
    setAdditionalImagePreviews(additionalPreviews);

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
    
    // Debug images after setup is complete
    setTimeout(() => {
      debugImages();
    }, 100);
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

  const debugImages = () => {
    console.log('====== DEBUG IMAGE UPLOAD ======');
    console.log('Main image:', formData.mainImage);
    console.log('Additional images:', formData.additionalImages);
    console.log('Main image preview:', mainImagePreview ? 'Set' : 'Not set');
    console.log('Additional image previews:', additionalImagePreviews.map(p => p ? 'Set' : 'Not set'));
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate main image is required
    if (!formData.mainImage) {
      setError('Main product image is required');
      return;
    }

    // Debug images before submission
    debugImages();

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct._id}`
        : '/api/products';

      const method = editingProduct ? 'PUT' : 'POST';

      // Ensure additionalImages doesn't contain empty strings when submitting
      const cleanedFormData = {
        ...formData,
        // Filter out empty strings and make sure we preserve any valid URLs
        additionalImages: formData.additionalImages
          .filter(img => img && img.trim() !== '')
          .map(img => img.trim())
      };

      // Log the final data being sent
      console.log('Submitting form data with images:', {
        mainImage: cleanedFormData.mainImage,
        additionalImages: cleanedFormData.additionalImages
      });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedFormData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Error saving product:', errorData);
        throw new Error(errorData.error || `Failed to ${editingProduct ? 'update' : 'create'} product`);
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
      setError(`Error ${editingProduct ? 'updating' : 'creating'} product: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      // Get the product to delete (to get image URLs)
      const productToDelete = products.find(prod => prod._id === id);

      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // If there were images, try to delete them from Cloudinary
      if (productToDelete) {
        const imagesToDelete = [
          productToDelete.mainImage,
          ...productToDelete.additionalImages
        ].filter(url => url && url.includes('cloudinary'));

        for (const imageUrl of imagesToDelete) {
          try {
            await fetch('/api/upload/delete', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url: imageUrl }),
            });
          } catch (error) {
            console.error('Error deleting image:', error);
            // Continue anyway, as the product was already deleted
          }
        }
      }

      // Refresh products list
      fetchProducts();
    } catch (err) {
      setError('Error deleting product');
      console.error(err);
    }
  };

  // Create a component to display additional images more reliably
  const AdditionalImagesComponent = ({ 
    images, 
    onChange, 
    onRemove 
  }: { 
    images: (string | null)[], 
    onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void,
    onRemove: (index: number) => void
  }) => {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((index) => (
          <div key={index} className="h-full">
            {images[index] ? (
              <div className="relative group border-2 border-blue-200 rounded h-full">
                <div className="w-full h-20 rounded overflow-hidden flex items-center justify-center bg-gray-100">
                  <img
                    src={typeof images[index] === 'string' ? images[index] as string : ''}
                    alt={`Product image ${index + 1}`}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      console.error(`Error loading image at index ${index}`, e);
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Image+Error';
                    }}
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-20 flex items-center justify-center py-1">
                  <div className="flex space-x-2">
                    <label className="p-1 bg-white rounded-full cursor-pointer hover:bg-gray-100" title="Change image">
                      <FiEdit2 className="text-gray-700" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onChange(index, e)}
                      />
                    </label>
                    <button 
                      type="button"
                      onClick={() => onRemove(index)}
                      className="p-1 bg-white rounded-full cursor-pointer hover:bg-gray-100"
                      title="Remove image"
                    >
                      <FiTrash2 className="text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-1 rounded-bl">
                  Image {index + 1}
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 relative">
                <div className="absolute top-0 right-0 bg-gray-500 text-white text-xs px-1 rounded-bl">
                  Image {index + 1}
                </div>
                <FiUpload className="text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Click to upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onChange(index, e)}
                />
              </label>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Utility function to render product images safely
  const SafeImage = ({ src, alt, className, fallback = "https://via.placeholder.com/100?text=No+Image" }: { 
    src: string, 
    alt: string, 
    className?: string,
    fallback?: string
  }) => {
    const [hasError, setHasError] = useState(false);
    
    if (!src || hasError) {
      return <img src={fallback} alt={alt} className={className} />;
    }
    
    return (
      <img 
        src={src} 
        alt={alt} 
        className={className}
        onError={() => {
          console.error(`Failed to load image: ${src}`);
          setHasError(true);
        }} 
      />
    );
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
                        <SafeImage 
                          src={product.mainImage} 
                          alt={product.title} 
                          className="h-10 w-10 object-cover" 
                        />
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
                        onClick={() => handleDeleteProduct(product._id)}
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
                          <SafeImage 
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
                    <AdditionalImagesComponent 
                      images={additionalImagePreviews}
                      onChange={handleAdditionalImageChange}
                      onRemove={(index) => {
                        console.log(`Removing image at index ${index}`);
                        // Update preview
                        const newPreviews = [...additionalImagePreviews];
                        newPreviews[index] = null;
                        setAdditionalImagePreviews(newPreviews);
                                      
                        // Update form data
                        setFormData(prev => {
                          const newImages = [...prev.additionalImages];
                          newImages[index] = '';
                          console.log(`Cleared additionalImages[${index}]`);
                          return { ...prev, additionalImages: newImages };
                        });
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      You can upload up to 3 additional product images
                    </p>
                    {/* Debug info */}
                    {process.env.NODE_ENV === 'development' && (
                      <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                        <p>Debug Info (only visible in development):</p>
                        <ul>
                          {formData.additionalImages.map((url, idx) => (
                            <li key={idx}>
                              Image {idx + 1}: {url ? 'Set ✅' : 'Not set ❌'}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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