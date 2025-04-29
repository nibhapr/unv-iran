import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import SubCategory from '@/models/SubCategory';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const product = await Product.findById(params.id)
      .populate('navbarCategory', 'title slug')
      .populate('category', 'name slug')
      .populate('subcategory', 'title slug');
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const data = await request.json();
    const product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Check if category or subcategory changed to update counts
    const oldCategory = product.category.toString();
    const oldSubcategory = product.subcategory.toString();
    const newCategory = data.category;
    const newSubcategory = data.subcategory;
    
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      {
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
      },
      { new: true }
    );
    
    // Update product counts if category changed
    if (oldCategory !== newCategory) {
      await Category.findByIdAndUpdate(
        oldCategory,
        { $inc: { products: -1 } }
      );
      
      await Category.findByIdAndUpdate(
        newCategory,
        { $inc: { products: 1 } }
      );
    }
    
    // Update product counts if subcategory changed
    if (oldSubcategory !== newSubcategory) {
      await SubCategory.findByIdAndUpdate(
        oldSubcategory,
        { $inc: { products: -1 } }
      );
      
      await SubCategory.findByIdAndUpdate(
        newSubcategory,
        { $inc: { products: 1 } }
      );
    }
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Get category and subcategory IDs before deletion
    const categoryId = product.category;
    const subcategoryId = product.subcategory;
    
    // Delete the product
    await Product.findByIdAndDelete(params.id);
    
    // Decrement product counts
    await Category.findByIdAndUpdate(
      categoryId,
      { $inc: { products: -1 } }
    );
    
    await SubCategory.findByIdAndUpdate(
      subcategoryId,
      { $inc: { products: -1 } }
    );
    
    return NextResponse.json(
      { message: 'Product deleted successfully' }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
} 