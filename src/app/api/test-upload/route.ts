import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  console.log('🔍 Test upload API called for subcategories');
  
  try {
    // Parse the request body
    let body;
    try {
      body = await request.json();
      console.log('✅ Request body parsed successfully');
    } catch (e) {
      console.error('❌ Error parsing request body:', e);
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }
    
    const { image } = body;
    
    if (!image) {
      console.error('❌ Missing image in request');
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }
    
    if (typeof image !== 'string') {
      console.error('❌ Image is not a string');
      return NextResponse.json({ error: 'Image must be a base64 string' }, { status: 400 });
    }
    
    console.log('📏 Image length:', image.length);
    
    // Use a hardcoded folder name to test
    const folder = 'subcategories';
    
    console.log('📂 Using folder:', folder);
    
    // Log the start of the base64 data to check format
    console.log('🔤 Image data preview:', image.substring(0, 50) + '...');
    
    // Make sure the image has the correct prefix
    let imageData = image;
    if (!image.startsWith('data:image/')) {
      console.log('⚠️ Image doesn\'t have proper prefix, adding one');
      imageData = `data:image/png;base64,${image}`;
    }
    
    // Upload to Cloudinary
    try {
      console.log('🚀 Starting Cloudinary upload...');
      const imageUrl = await uploadImage(imageData, folder);
      console.log('✅ Cloudinary upload successful, URL:', imageUrl);
      
      return NextResponse.json({ url: imageUrl }, { status: 200 });
    } catch (cloudinaryError) {
      console.error('❌ Cloudinary upload error:', cloudinaryError);
      
      // Return the specific error message
      const errorMessage = cloudinaryError instanceof Error 
        ? cloudinaryError.message 
        : 'Failed to upload image to cloud storage';
      
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  } catch (error) {
    console.error('❌ Unexpected error in test upload route:', error);
    
    // Return the specific error message
    const errorMessage = error instanceof Error ? error.message : 'Failed to process upload request';
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 