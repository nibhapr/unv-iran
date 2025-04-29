import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SubCategory from '@/models/SubCategory';

// GET a single subcategory
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const subcategory = await SubCategory.findById(params.id)
      .populate('navbarCategory', 'title slug')
      .populate('category', 'name slug');
    
    if (!subcategory) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }
    
    return NextResponse.json(subcategory, { status: 200 });
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    return NextResponse.json({ error: 'Failed to fetch subcategory' }, { status: 500 });
  }
}

// UPDATE a subcategory
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await connectDB();
    
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )
    .populate('navbarCategory', 'title slug')
    .populate('category', 'name slug');
    
    if (!updatedSubCategory) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedSubCategory, { status: 200 });
  } catch (error) {
    console.error('Error updating subcategory:', error);
    return NextResponse.json({ error: 'Failed to update subcategory' }, { status: 500 });
  }
}

// DELETE a subcategory
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deletedSubCategory = await SubCategory.findByIdAndDelete(params.id);
    
    if (!deletedSubCategory) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Subcategory deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    return NextResponse.json({ error: 'Failed to delete subcategory' }, { status: 500 });
  }
} 