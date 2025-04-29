import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    const subscriber = await Newsletter.findOne({ email });
    
    if (!subscriber) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }
    
    subscriber.status = 'Unsubscribed';
    await subscriber.save();
    
    return NextResponse.json(
      { message: 'You have been unsubscribed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}