import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import NavbarCategory from '@/models/NavbarCategory';
import Category from '@/models/Category';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { cache } from 'react';

// Change the interface to match Next.js 15 expectations
interface Params {
  slug: string;
}

// Cache database connections for better performance
const getNavbarCategories = cache(async () => {
  await connectDB();
  return NavbarCategory.find({ status: 'Active' });
});

// Cached version of getCategoryBySlug
const getCategoryBySlug = cache(async (slug: string) => {
  await connectDB();
  return NavbarCategory.findOne({ slug, status: 'Active' });
});

// Cached version of getCategoriesByNavbarCategory
const getCategoriesByNavbarCategory = cache(async (navbarCategoryId: string) => {
  await connectDB();
  return Category.find({ navbarCategory: navbarCategoryId, status: 'Active' });
});

export async function generateStaticParams() {
  const categories = await getNavbarCategories();
  
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Params 
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }
  
  return {
    title: category.title,
    description: category.description.substring(0, 160),
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const navbarCategory = await getCategoryBySlug(params.slug);
  if (!navbarCategory) {
    notFound();
  }
  const categories = await getCategoriesByNavbarCategory(navbarCategory._id);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 text-white pt-48 pb-32 relative overflow-hidden">
        {/* Animated decorative elements - optimized with will-change for better performance */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse will-change-transform"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl animate-pulse delay-700 will-change-transform"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400/15 rounded-full blur-2xl animate-pulse delay-500 will-change-transform"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center">
            <span className="text-blue-100 text-sm font-medium tracking-wider uppercase mb-6">
              Welcome to
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight drop-shadow-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                {navbarCategory.title}
              </span>
            </h1>
            <div className="w-40 h-1.5 bg-gradient-to-r from-white/90 to-white/30 rounded-full mb-8"></div>
            <p className="max-w-2xl text-blue-50 text-lg mb-12">
              Discover our comprehensive range of {navbarCategory.title.toLowerCase()} solutions designed for your specific needs
            </p>
          </div>
        </div>
      </div>
      
      {/* Enhanced Main Content */}
      <main className="flex-grow container mx-auto px-4 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 mb-16">
          {/* Description Section */}
          <div className="prose max-w-none lg:prose-xl mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              <span className="px-4 text-gray-400 text-sm font-medium">ABOUT</span>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </div>
            <p className="text-gray-600 leading-relaxed text-center max-w-4xl mx-auto">
              {navbarCategory.description}
            </p>
          </div>
          
          {/* Categories Grid */}
          {categories.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-center mb-10">
                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                <h2 className="px-6 text-2xl font-bold text-gray-800">Our Categories</h2>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Link 
                    key={category._id}
                    href={`/${navbarCategory.slug}/${category.slug}`}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                    prefetch={false}
                  >
                    <div className="aspect-[3/2] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      {category.icon ? (
                        <div className="relative w-full h-full">
                          <Image 
                            src={category.icon} 
                            alt={category.name} 
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">
                          🖼️
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-4 text-sm">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                          {category.products} products
                        </span>
                        <span className="flex items-center text-blue-600 font-medium text-xs group-hover:translate-x-1 transition-transform">
                          View Details
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}