import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

// Add a semaphore to limit concurrent uploads
const MAX_CONCURRENT_UPLOADS = 3;
let currentUploads = 0;

export async function POST(request: NextRequest) {
  // Generate a unique ID for this upload request for logging
  const uploadId = Math.random().toString(36).substring(2, 8);
  console.log(`Upload API route called [${uploadId}]`);
  
  // Check if we're already handling too many concurrent uploads
  if (currentUploads >= MAX_CONCURRENT_UPLOADS) {
    console.log(`Too many concurrent uploads (${currentUploads}/${MAX_CONCURRENT_UPLOADS}), request ${uploadId} rejected`);
    return NextResponse.json({ 
      error: 'Too many concurrent uploads, please try again shortly'
    }, { status: 429 });
  }
  
  currentUploads++;
  console.log(`Starting upload ${uploadId}, concurrent uploads: ${currentUploads}/${MAX_CONCURRENT_UPLOADS}`);
  
  try {
    // Check content length (increased to 50MB)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 50 * 1024 * 1024) {
      console.error(`Request too large, content-length: ${contentLength} [${uploadId}]`);
      return NextResponse.json({ error: 'Request body too large (max 50MB)' }, { status: 413 });
    }
    
    // Parse the request body
    let body;
    try {
      body = await request.json();
      console.log(`Request body parsed successfully [${uploadId}]`);
    } catch (e) {
      console.error(`Error parsing request body: ${e} [${uploadId}]`);
      throw new Error('Invalid request format');
    }
    
    const { image, folder } = body;
    
    if (!image) {
      console.error(`Missing image in request [${uploadId}]`);
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }
    
    if (typeof image !== 'string') {
      console.error(`Image is not a string [${uploadId}]`);
      return NextResponse.json({ error: 'Image must be a base64 string' }, { status: 400 });
    }
    
    // Debug info about the folder
    if (folder) {
      console.log(`Requested folder: "${folder}" [${uploadId}]`);
    } else {
      console.log(`No folder specified, will use default [${uploadId}]`);
    }
    
    // Special check for subcategories - ensure it's handled correctly
    const isSubcategory = folder === 'subcategories';
    if (isSubcategory) {
      console.log(`⚠️ SUBCATEGORY UPLOAD DETECTED [${uploadId}]`);
    }
    
    // Validate folder - ensure it's one of the allowed values
    const validFolders = ['categories', 'subcategories', 'products', 'navbar', 'banners'];
    const targetFolder = folder && validFolders.includes(folder) ? folder : 'categories'; // Default to categories
    
    // Check base64 string size (increased to 50MB)
    const base64Size = image.length * 0.75; // Approximate size in bytes
    if (base64Size > 50 * 1024 * 1024) {
      console.error(`Image too large: ${Math.round(base64Size / (1024 * 1024))}MB [${uploadId}]`);
      return NextResponse.json({ error: 'Image too large (max 50MB)' }, { status: 413 });
    }
    
    // Verify image format and fix if needed
    let processedImage = image;
    if (!image.startsWith('data:image/')) {
      if (image.startsWith('data:')) {
        console.error(`Invalid image format: not an image [${uploadId}]`);
        return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
      } else {
        // Add prefix if missing, assuming it's a PNG if we can't detect
        console.log(`Adding image prefix to data [${uploadId}]`);
        processedImage = `data:image/png;base64,${image}`;
      }
    }
    
    // Add logging for the image data format
    const formatMatch = processedImage.match(/^data:([^;]+);base64,/);
    if (formatMatch) {
      console.log(`Image format detected: ${formatMatch[1]} [${uploadId}]`);
    } else {
      console.warn(`Could not detect image format, using default [${uploadId}]`);
    }
    
    console.log(`Image received, length: ${processedImage.length}, folder: ${targetFolder} [${uploadId}]`);
    
    // For subcategories, add extra checks and explicit folder parameter
    if (isSubcategory) {
      console.log(`⚠️ Adding explicit subcategories folder parameter [${uploadId}]`);
    }
    
    // Upload to Cloudinary - use unv-iran as parent folder
    try {
      console.log(`Starting Cloudinary upload to ${targetFolder}... [${uploadId}]`);
      const imageUrl = await uploadImage(processedImage, targetFolder);
      console.log(`Cloudinary upload successful: ${imageUrl} [${uploadId}]`);
      
      return NextResponse.json({ url: imageUrl, uploadId }, { status: 200 });
    } catch (cloudinaryError) {
      console.error(`Cloudinary upload error: ${cloudinaryError} [${uploadId}]`);
      
      // Return the specific error message if available
      const errorMessage = cloudinaryError instanceof Error 
        ? cloudinaryError.message 
        : 'Failed to upload image to cloud storage';
      
      return NextResponse.json({ error: errorMessage, uploadId }, { status: 500 });
    }
  } catch (error) {
    console.error(`Unexpected error in upload route: ${error} [${uploadId}]`);
    
    // Return the specific error message if available
    const errorMessage = error instanceof Error ? error.message : 'Failed to process upload request';
    
    return NextResponse.json({ error: errorMessage, uploadId }, { status: 500 });
  } finally {
    // Always decrement the counter to prevent deadlocks
    currentUploads--;
    console.log(`Finished upload ${uploadId}, remaining uploads: ${currentUploads}/${MAX_CONCURRENT_UPLOADS}`);
  }
}