import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

// GET a single contact message
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const message = await Contact.findById(params.id);
    
    if (!message) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.error('Error fetching contact message:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact message' },
      { status: 500 }
    );
  }
}

// UPDATE a contact message (e.g., mark as read or replied)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await connectDB();
    
    const updatedMessage = await Contact.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedMessage) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedMessage, { status: 200 });
  } catch (error) {
    console.error('Error updating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to update contact message' },
      { status: 500 }
    );
  }
}

// DELETE a contact message
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deletedMessage = await Contact.findByIdAndDelete(params.id);
    
    if (!deletedMessage) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Contact message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact message' },
      { status: 500 }
    );
  }
}