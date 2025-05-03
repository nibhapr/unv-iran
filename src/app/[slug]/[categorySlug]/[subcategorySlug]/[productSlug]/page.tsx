import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import NavbarCategory from '@/models/NavbarCategory';
import Category from '@/models/Category';
import SubCategory from '@/models/SubCategory';
import Product from '@/models/Product';
import Navbar from '../../../../Components/Navbar';
import Footer from '../../../../Components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { Metadata } from 'next';
import { cache } from 'react';

// Cache database connections for better performance
const getNavbarCategoryBySlug = cache(async (slug: string) => {
  await connectDB();
  return NavbarCategory.findOne({ slug, status: 'Active' });
});

const getCategoryBySlug = cache(async (slug: string, navbarCategoryId: string) => {
  await connectDB();
  return Category.findOne({ 
    slug, 
    navbarCategory: navbarCategoryId, 
    status: 'Active' 
  });
});

const getSubcategoryBySlug = cache(async (slug: string, categoryId: string) => {
  await connectDB();
  return SubCategory.findOne({ 
    slug, 
    category: categoryId,
    status: 'Active' 
  });
});

const getProductBySlug = cache(async (slug: string, subcategoryId: string) => {
  await connectDB();
  return Product.findOne({ 
    slug, 
    subcategory: subcategoryId,
    status: 'Active' 
  });
});

// Define the params type
type PageParams = {
  slug: string;
  categorySlug: string;
  subcategorySlug: string;
  productSlug: string;
}

// Use Next.js's expected type structure
export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: PageParams;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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
  
  const product = await getProductBySlug(params.productSlug, subcategory._id);
  if (!product) {
    notFound();
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 text-white pt-44 pb-32 relative overflow-hidden">
        {/* Animated decorative elements - optimized with will-change */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse will-change-transform"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl animate-pulse delay-700 will-change-transform"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400/15 rounded-full blur-2xl animate-pulse delay-500 will-change-transform"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col items-center text-center">
            <nav className="flex items-center space-x-2 text-sm font-medium mb-8">
              <Link href="/" className="text-blue-100 hover:text-white transition-colors">Home</Link>
              <span className="text-blue-200/40">→</span>
              <Link href={`/${navbarCategory.slug}`} className="text-blue-100 hover:text-white transition-colors" prefetch={false}>
                {navbarCategory.title}
              </Link>
              <span className="text-blue-200/40">→</span>
              <Link href={`/${navbarCategory.slug}/${category.slug}`} className="text-blue-100 hover:text-white transition-colors" prefetch={false}>
                {category.name}
              </Link>
              <span className="text-blue-200/40">→</span>
              <Link href={`/${navbarCategory.slug}/${category.slug}/${subcategory.slug}`} className="text-blue-100 hover:text-white transition-colors" prefetch={false}>
                {subcategory.title}
              </Link>
            </nav>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                {product.title}
              </span>
            </h1>
            
            <div className="w-40 h-1 bg-gradient-to-r from-white/90 to-white/30 rounded-full mb-8"></div>
            
            <p className="max-w-2xl text-blue-50 text-lg mb-8">
              {product.description.substring(0, 150)}...
            </p>
          </div>
        </div>
      </div>
      
      {/* Enhanced Main Content */}
      <main className="flex-grow container mx-auto px-4 -mt-20 relative z-20 pb-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Product gallery & details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Product Gallery */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl overflow-hidden h-[500px] flex items-center justify-center p-8 border border-gray-100 relative">
                {product.mainImage ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={product.mainImage} 
                      alt={product.title} 
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">
                    🖼️
                  </div>
                )}
              </div>
              
              {product.additionalImages && product.additionalImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.additionalImages.map((image: string, index: number) => (
                    image && (
                      <div key={index} className="bg-gray-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center p-2 border border-gray-100 hover:border-blue-300 transition-colors cursor-pointer relative">
                        <div className="relative w-full h-full">
                          <Image 
                            src={image} 
                            alt={`${product.title} - Image ${index + 1}`} 
                            fill
                            sizes="(max-width: 768px) 25vw, 15vw"
                            className="object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
            
            {/* Enhanced Product Details */}
            <div className="lg:pl-8">
              <div className="prose prose-lg max-w-none mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
              
              {product.features && product.features.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Key Features</h3>
                  <ul className="space-y-4">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                          <FiCheck className="text-white w-4 h-4" />
                        </span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href={`/${navbarCategory.slug}/${category.slug}/${subcategory.slug}`} 
                  className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
                  prefetch={false}
                >
                  <FiArrowLeft className="mr-2" />
                  Back to {subcategory.title}
                </Link>
                
                <Link 
                  href="/contact" 
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center will-change-transform"
                >
                  Request Quote
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const navbarCategory = await getNavbarCategoryBySlug(params.slug);
  
  if (!navbarCategory) {
    return { title: 'Product Not Found' };
  }
  
  const category = await getCategoryBySlug(params.categorySlug, navbarCategory._id);
  
  if (!category) {
    return { title: 'Product Not Found' };
  }
  
  const subcategory = await getSubcategoryBySlug(params.subcategorySlug, category._id);
  
  if (!subcategory) {
    return { title: 'Product Not Found' };
  }
  
  const product = await getProductBySlug(params.productSlug, subcategory._id);
  
  if (!product) {
    return { title: 'Product Not Found' };
  }
  
  return {
    title: `${product.title} | ${subcategory.title} | ${category.name} | ${navbarCategory.title}`,
    description: product.description.substring(0, 160),
  };
}