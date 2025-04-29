import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

// POST a new newsletter subscription
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate and sanitize email
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Verify Newsletter model exists
    if (!Newsletter) {
      console.error('Newsletter model is not defined');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email });

    if (existingSubscription) {
      // If already subscribed but unsubscribed before, reactivate
      if (existingSubscription.status === 'unsubscribed') {  // Changed from 'Unsubscribed' to 'unsubscribed'
        try {
          existingSubscription.status = 'active';  // Changed from 'Active' to 'active'
          await existingSubscription.save();
          return NextResponse.json(
            { message: 'Your subscription has been reactivated' },
            { status: 200 }
          );
        } catch (updateError) {
          console.error('Error reactivating subscription:', updateError);
          throw new Error('Failed to reactivate subscription');
        }
      }

      return NextResponse.json(
        { message: 'You are already subscribed to our newsletter' },
        { status: 200 }
      );
    }

    // Create a new subscription
    try {
      await Newsletter.create({
        email,
        status: 'active',  // Changed from 'Active' to 'active'
        subscriptionDate: new Date()
      });

      return NextResponse.json(
        { message: 'Thanks for subscribing to our newsletter!' },
        { status: 201 }
      );
    } catch (createError) {
      console.error('Error creating subscription:', createError);
      if ((createError as { code?: number }).code === 11000) { // Duplicate key error
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        );
      }
      throw createError;
    }
  } catch (error) {
    console.error('Error in newsletter subscription:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to subscribe to newsletter',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
      },
      { status: 500 }
    );
  }
}

// GET all newsletter subscribers (for admin use)
export async function GET() {
  try {
    await connectDB();
    const subscribers = await Newsletter.find({}).sort({ subscriptionDate: -1 });

    return NextResponse.json(subscribers, { status: 200 });
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter subscribers' },
      { status: 500 }
    );
  }
}