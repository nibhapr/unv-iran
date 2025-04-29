import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

// POST a new contact message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }
    
    // Connect to the database
    await connectDB();
    
    // Create a new contact message
    const contactMessage = await Contact.create({
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      message: body.message,
      status: 'Unread',
      createdAt: new Date()
    });
    
    return NextResponse.json(
      { message: 'Contact message sent successfully', id: contactMessage._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to send contact message' },
      { status: 500 }
    );
  }
}

// GET all contact messages (for admin use)
export async function GET() {
  try {
    await connectDB();
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
  }
}