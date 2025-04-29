import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import NavbarCategory from '@/models/NavbarCategory';

// GET all navbar categories
export async function GET() {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("Connected to MongoDB successfully");
    const categories = await NavbarCategory.find({}).sort({ order: 1 });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching navbar categories:', error);
    return NextResponse.json({ error: 'Failed to fetch navbar categories' }, { status: 500 });
  }
}

// POST new navbar category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectDB();
    
    // Find the highest order number and add 1
    const highestOrder = await NavbarCategory.findOne({}).sort({ order: -1 }).select('order');
    const newOrder = highestOrder ? highestOrder.order + 1 : 1;
    
    const newCategory = await NavbarCategory.create({
      ...body,
      order: body.order || newOrder,
    });
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating navbar category:', error);
    return NextResponse.json({ error: 'Failed to create navbar category' }, { status: 500 });
  }
} 