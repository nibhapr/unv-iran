import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NavbarCategory from '@/models/NavbarCategory';

// GET a single navbar category
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const category = await NavbarCategory.findById(params.id);
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error('Error fetching navbar category:', error);
    return NextResponse.json({ error: 'Failed to fetch navbar category' }, { status: 500 });
  }
}

// UPDATE a navbar category
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await connectDB();
    
    const updatedCategory = await NavbarCategory.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error('Error updating navbar category:', error);
    return NextResponse.json({ error: 'Failed to update navbar category' }, { status: 500 });
  }
}

// DELETE a navbar category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deletedCategory = await NavbarCategory.findByIdAndDelete(params.id);
    
    if (!deletedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting navbar category:', error);
    return NextResponse.json({ error: 'Failed to delete navbar category' }, { status: 500 });
  }
} 