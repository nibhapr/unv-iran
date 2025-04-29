import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SubCategory from '@/models/SubCategory';

// GET all subcategories
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const subcategories = await SubCategory.find({})
      .populate('navbarCategory', 'title slug')
      .populate('category', 'name slug');
    return NextResponse.json(subcategories, { status: 200 });
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 });
  }
}

// POST new subcategory
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectDB();
    
    const newSubCategory = await SubCategory.create(body);
    
    return NextResponse.json(newSubCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating subcategory:', error);
    return NextResponse.json({ error: 'Failed to create subcategory' }, { status: 500 });
  }
} 