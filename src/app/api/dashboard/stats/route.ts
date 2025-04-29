import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Contact from '@/models/Contact';
import Newsletter from '@/models/Newsletter';

export async function GET() {
  try {
    await connectDB();
    
    // Get current date and date from 30 days ago
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(now.getDate() - 60);
    
    // Get users registered in the last 30 days
    const usersThisMonth = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    // Get users registered in the 30 days before that (for growth calculation)
    const usersPreviousMonth = await User.countDocuments({
      createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    });
    
    // Calculate growth percentage
    let growthPercentage = 0;
    if (usersPreviousMonth > 0) {
      growthPercentage = ((usersThisMonth - usersPreviousMonth) / usersPreviousMonth) * 100;
    }
    
    // Get total counts
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalContacts = await Contact.countDocuments();
    
    // Get newsletter subscribers (if model exists)
    let totalSubscribers = 0;
    try {
      totalSubscribers = await Newsletter.countDocuments();
    } catch (error) {
      console.warn('Newsletter model may not exist:', error);
    }
    
    // Get subscriber growth
    const subscribersThisMonth = await Newsletter.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    }).catch(() => 0);
    
    const subscribersPreviousMonth = await Newsletter.countDocuments({
      createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    }).catch(() => 0);
    
    let subscriberGrowthPercentage = 0;
    if (subscribersPreviousMonth > 0) {
      subscriberGrowthPercentage = ((subscribersThisMonth - subscribersPreviousMonth) / subscribersPreviousMonth) * 100;
    }
    
    return NextResponse.json({
      newUsers: {
        count: usersThisMonth,
        growthPercentage: growthPercentage.toFixed(1)
      },
      totalProducts,
      totalCategories,
      totalContacts,
      subscribers: {
        total: totalSubscribers,
        growthPercentage: subscriberGrowthPercentage.toFixed(1)
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}