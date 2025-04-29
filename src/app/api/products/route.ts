import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import SubCategory from '@/models/SubCategory';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    console.log('Database connected successfully'); // Log database connection
    
    const products = await Product.find()
      .populate('navbarCategory', 'title slug')
      .populate('category', 'name slug')
      .populate('subcategory', 'title slug')
      .sort({ createdAt: -1 });
    
    console.log('Fetched products:', products); // Log fetched products
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    // Create the product
    const product = await Product.create({
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      features: data.features.filter((f: string) => f.trim() !== ''),
      mainImage: data.mainImage,
      additionalImages: data.additionalImages.filter((img: string) => img),
      navbarCategory: data.navbarCategory,
      category: data.category,
      subcategory: data.subcategory,
      status: data.status
    });
    
    // Increment product counts in related documents
    await Category.findByIdAndUpdate(
      data.category,
      { $inc: { products: 1 } }
    );
    
    await SubCategory.findByIdAndUpdate(
      data.subcategory,
      { $inc: { products: 1 } }
    );
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 