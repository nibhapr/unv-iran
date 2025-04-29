import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import NavbarCategory from '@/models/NavbarCategory';
import Category from '@/models/Category';
import SubCategory from '@/models/SubCategory';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';
import Link from 'next/link';
import { FiArrowLeft, FiBox, FiTag, FiInfo, FiCheck } from 'react-icons/fi';
import Product from '@/models/Product';
import { Metadata } from 'next';

async function getNavbarCategoryBySlug(slug: string) {
  await connectDB();
  return NavbarCategory.findOne({ slug, status: 'Active' });
}

async function getCategoryBySlug(slug: string, navbarCategoryId: string) {
  await connectDB();
  return Category.findOne({ 
    slug, 
    navbarCategory: navbarCategoryId, 
    status: 'Active' 
  });
}

async function getSubcategoryBySlug(slug: string, categoryId: string) {
  await connectDB();
  return SubCategory.findOne({ 
    slug, 
    category: categoryId,
    status: 'Active' 
  });
}

async function getProductsForSubcategory(subcategoryId: string) {
  await connectDB();
  return Product.find({ 
    subcategory: subcategoryId,
    status: 'Active' 
  });
}

// Change the interface to match Next.js 15 expectations
interface Params {
  slug: string;
  categorySlug: string;
  subcategorySlug: string;
}

export async function generateMetadata({ 
  params 
}: { 
  params: Params 
}): Promise<Metadata> {
  const navbarCategory = await getNavbarCategoryBySlug(params.slug);
  
  if (!navbarCategory) {
    return { title: 'Subcategory Not Found' };
  }
  
  const category = await getCategoryBySlug(params.categorySlug, navbarCategory._id);
  
  if (!category) {
    return { title: 'Subcategory Not Found' };
  }
  
  const subcategory = await getSubcategoryBySlug(params.subcategorySlug, category._id);
  
  if (!subcategory) {
    return { title: 'Subcategory Not Found' };
  }
  
  return {
    title: `${subcategory.title} | ${category.name} | ${navbarCategory.title} | Uniview`,
    description: subcategory.description.substring(0, 160),
  };
}

export default async function SubcategoryDetailPage({ params }: { params: Params }) {
  const navbarCategory = await getNavbarCategoryBySlug(params.slug);
  
  if (!navbarCategory) {
    notFound();
  }
  
  const category = await getCategoryBySlug(params.categorySlug, navbarCategory._id);
  
  if (!category) {
    notFound();
  }
  
  const subcategory = await getSubcategoryBySlug(params.subcategorySlug, category._id);
  
  if (!subcategory) {
    notFound();
  }
  
  const products = await getProductsForSubcategory(subcategory._id);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Enhanced Hero Section with updated colors */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white pt-44 pb-32 relative overflow-hidden">
        {/* Animated decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-400/15 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center">
            <nav className="flex items-center space-x-2 text-sm font-medium mb-8">
              <Link href="/" className="text-blue-100 hover:text-white transition-colors">Home</Link>
              <span className="text-blue-200/40">→</span>
              <Link href={`/${navbarCategory.slug}`} className="text-blue-100 hover:text-white transition-colors">
                {navbarCategory.title}
              </Link>
              <span className="text-blue-200/40">→</span>
              <Link href={`/${navbarCategory.slug}/${category.slug}`} className="text-blue-100 hover:text-white transition-colors">
                {category.name}
              </Link>
              <span className="text-blue-200/40">→</span>
              <span className="text-white">{subcategory.title}</span>
            </nav>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                {subcategory.title}
              </span>
            </h1>
            
            <div className="w-32 h-1 bg-gradient-to-r from-white/90 to-white/30 rounded-full mb-8"></div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <FiBox className="mr-2" />
                <span>{subcategory.products} Products</span>
              </div>
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <FiTag className="mr-2" />
                <span>{subcategory.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Main Content */}
      <main className="flex-grow container mx-auto px-4 -mt-20 relative z-20 pb-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Description Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              <span className="px-4 text-gray-400 text-sm font-medium">ABOUT THIS SUBCATEGORY</span>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </div>
            <p className="text-gray-600 leading-relaxed text-center text-lg">
              {subcategory.description}
            </p>
          </div>
          
          {/* Products Grid */}
          <div className="mt-16">
            <div className="flex items-center justify-center mb-12">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              <h2 className="px-6 text-3xl font-bold text-gray-800">Available Products</h2>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </div>
            
            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Link 
                    key={product._id}
                    href={`/${navbarCategory.slug}/${category.slug}/${subcategory.slug}/${product.slug}`}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      {product.mainImage ? (
                        <img 
                          src={product.mainImage} 
                          alt={product.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl text-gray-300">
                          🖼️
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-4 text-xs">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          <span className="text-xs text-gray-600">Available</span>
                        </div>
                        <span className="flex items-center text-blue-600 font-medium text-xs group-hover:translate-x-1 transition-transform">
                          View
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">We haven't added any products to this subcategory yet.</p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                >
                  Contact Us
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}