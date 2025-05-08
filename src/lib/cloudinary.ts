import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Track uploads to prevent too many concurrent connections
const UPLOAD_TIMEOUT_MS = 30000; // 30 seconds
const uploads = new Map();

/**
 * Upload an image to Cloudinary
 * @param file Base64 encoded image file
 * @param folder Folder to upload to
 * @returns Cloudinary upload response
 */
export async function uploadImage(file: string, folder: string = 'categories'): Promise<string> {
  // Generate a unique ID for this upload for logging
  const uploadId = Math.random().toString(36).substring(2, 8);
  console.log(`uploadImage called for folder: ${folder} [${uploadId}]`);
  
  // Special handling for subcategories
  const isSubcategory = folder === 'subcategories';
  if (isSubcategory) {
    console.log(`⚠️ SUBCATEGORY UPLOAD INITIATED [${uploadId}]`);
  }
  
  // Track this upload
  const uploadInfo = {
    startTime: Date.now(),
    folder,
    status: 'started',
    isSubcategory
  };
  uploads.set(uploadId, uploadInfo);
  
  // Clean up old uploads that might have failed or gotten stuck
  const now = Date.now();
  for (const [id, info] of uploads.entries()) {
    if (now - info.startTime > UPLOAD_TIMEOUT_MS) {
      console.log(`Removing stale upload: ${id}, status: ${info.status}`);
      uploads.delete(id);
    }
  }
  
  try {
    // Verify environment variables
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error(`Missing Cloudinary credentials in environment variables [${uploadId}]`);
      uploads.set(uploadId, { ...uploadInfo, status: 'error:credentials' });
      throw new Error('Cloudinary credentials are not configured');
    }
    
    if (!file || typeof file !== 'string') {
      console.error(`Invalid file format: ${typeof file} [${uploadId}]`);
      uploads.set(uploadId, { ...uploadInfo, status: 'error:invalid_format' });
      throw new Error('Invalid image format');
    }
    
    // Remove the base64 prefix if it exists (e.g., "data:image/png;base64,")
    let fileType = 'image/png';
    let base64Data = file;
    
    if (file.includes('data:')) {
      const matches = file.match(/^data:([A-Za-z-+\/]+);base64,/);
      if (matches && matches.length > 1) {
        fileType = matches[1];
        base64Data = file.substring(file.indexOf('base64,') + 'base64,'.length);
      }
    }
    
    console.log(`Image type: ${fileType}, base64 length: ${base64Data.length} [${uploadId}]`);
    uploads.set(uploadId, { ...uploadInfo, status: 'validated' });
    
    // Check if the base64 string is too large (approximately 10MB)
    if (base64Data.length > 10 * 1024 * 1024) {
      console.error(`Image too large: ${base64Data.length} [${uploadId}]`);
      uploads.set(uploadId, { ...uploadInfo, status: 'error:too_large' });
      throw new Error('Image is too large, maximum size is 10MB');
    }
    
    // Ensure base64 data is valid
    if (base64Data.trim() === '') {
      console.error(`Empty base64 data [${uploadId}]`);
      uploads.set(uploadId, { ...uploadInfo, status: 'error:empty_data' });
      throw new Error('Invalid image: empty data');
    }
    
    // Validate the folder name
    const validFolders = ['categories', 'subcategories', 'products', 'navbar', 'banners'];
    if (!validFolders.includes(folder)) {
      console.warn(`Invalid folder: ${folder}, using 'categories' as default [${uploadId}]`);
      folder = 'categories'; // Default to categories if invalid
    }
    
    // For subcategories, double check the folder is set correctly
    if (isSubcategory && folder !== 'subcategories') {
      console.warn(`❌ Folder mismatch for subcategory upload, fixing folder name [${uploadId}]`);
      folder = 'subcategories';
    }
    
    console.log(`Uploading to Cloudinary folder: unv-iran/${folder} [${uploadId}]`);
    uploads.set(uploadId, { ...uploadInfo, status: 'uploading' });

    // Prepare upload options with special handling for subcategories
    // Remove size check to allow larger files
    const uploadOptions: any = {
      folder: `unv-iran/${folder}`,
      resource_type: 'auto',  // Changed to 'auto' to accept any file type
      timeout: 120000, // Increased timeout for larger files
      overwrite: true,
      unique_filename: true,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'pdf', 'ico', 'bmp', 'tiff'],  // Add more formats as needed
    };
    
    // For subcategories, add some additional options that might help
    if (isSubcategory) {
      uploadOptions.tags = ['subcategory'];
    }
    
    // Upload to Cloudinary - use unv-iran as parent folder
    try {
      console.log(`Starting Cloudinary upload with options: ${JSON.stringify(uploadOptions)} [${uploadId}]`);
      
      // Construct full data URL before upload
      const fullDataUrl = `data:${fileType};base64,${base64Data}`;
      
      const result = await cloudinary.uploader.upload(
        fullDataUrl,
        uploadOptions
      );
      
      console.log(`Cloudinary upload successful, URL: ${result.secure_url} [${uploadId}]`);
      uploads.set(uploadId, { ...uploadInfo, status: 'completed', url: result.secure_url });
      return result.secure_url;
    } catch (cloudinaryError) {
      console.error(`Cloudinary uploader error: ${cloudinaryError} [${uploadId}]`);
      
      // For subcategories, try a fallback method if the standard one fails
      if (isSubcategory) {
        console.log(`⚠️ Trying fallback method for subcategory upload [${uploadId}]`);
        try {
          // Try uploading with a simplified approach
          const fallbackResult = await cloudinary.uploader.upload(
            `data:${fileType};base64,${base64Data}`,
            {
              folder: `unv-iran/${folder}`,
              resource_type: 'image',
              timeout: 90000, // Extended timeout
            }
          );
          
          console.log(`✅ Fallback Cloudinary upload successful for subcategory: ${fallbackResult.secure_url} [${uploadId}]`);
          uploads.set(uploadId, { ...uploadInfo, status: 'completed_fallback', url: fallbackResult.secure_url });
          return fallbackResult.secure_url;
        } catch (fallbackError) {
          console.error(`❌ Fallback method also failed: ${fallbackError} [${uploadId}]`);
          // Continue to the error handling below
        }
      }
      
      uploads.set(uploadId, { ...uploadInfo, status: 'error:cloudinary' });
      throw new Error(
        cloudinaryError instanceof Error 
          ? `Cloudinary upload failed: ${cloudinaryError.message}` 
          : 'Cloudinary upload failed'
      );
    }
  } catch (error) {
    console.error(`Error in uploadImage function: ${error} [${uploadId}]`);
    if (!uploads.get(uploadId)?.status.startsWith('error:')) {
      uploads.set(uploadId, { ...uploadInfo, status: 'error:unknown' });
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to upload image');
  } finally {
    // Update status if not already set
    if (uploads.get(uploadId)?.status === 'uploading') {
      uploads.set(uploadId, { ...uploadInfo, status: 'completed_with_unknown_result' });
    }
    
    // Log final status
    console.log(`Upload ${uploadId} finished with status: ${uploads.get(uploadId)?.status}`);
    
    // Remove tracking after a delay (keep for debugging)
    setTimeout(() => {
      uploads.delete(uploadId);
    }, 60000); // Keep record for 1 minute
  }
}

/**
 * Delete an image from Cloudinary
 * @param url URL of the image to delete
 */
export async function deleteImage(url: string): Promise<void> {
  const deleteId = Math.random().toString(36).substring(2, 8);
  console.log(`deleteImage called for URL: ${url} [${deleteId}]`);
  
  try {
    if (!url || typeof url !== 'string') {
      console.error(`Invalid image URL: ${typeof url} [${deleteId}]`);
      throw new Error('Invalid image URL');
    }
    
    // Extract public_id from the URL
    const urlParts = url.split('/');
    console.log(`URL parts: ${urlParts.join(', ')} [${deleteId}]`);
    
    // Find the index of 'unv-iran' in the URL parts
    const unvIranIndex = urlParts.findIndex(part => part === 'unv-iran');
    console.log(`unv-iran index: ${unvIranIndex} [${deleteId}]`);
    
    let publicId: string;
    
    if (unvIranIndex !== -1) {
      // Extract all parts after 'unv-iran' to form the full public_id
      const publicIdParts = urlParts.slice(unvIranIndex);
      // Remove any file extension from the last part
      const lastPartIndex = publicIdParts.length - 1;
      publicIdParts[lastPartIndex] = publicIdParts[lastPartIndex].split('.')[0];
      
      publicId = publicIdParts.join('/');
      console.log(`Deleting with public ID (new format): ${publicId} [${deleteId}]`);
    } else {
      // Fallback to the old method if 'unv-iran' is not found
      const publicIdWithExtension = urlParts[urlParts.length - 1];
      const publicId1 = publicIdWithExtension.split('.')[0];
      const folder = urlParts[urlParts.length - 2];
      
      publicId = `${folder}/${publicId1}`;
      console.log(`Deleting with public ID (old format): ${publicId} [${deleteId}]`);
    }
    
    try {
      await cloudinary.uploader.destroy(publicId);
      console.log(`Image deleted successfully from Cloudinary [${deleteId}]`);
    } catch (cloudinaryError) {
      console.error(`Cloudinary deletion error: ${cloudinaryError} [${deleteId}]`);
      throw new Error(
        cloudinaryError instanceof Error 
          ? `Cloudinary deletion failed: ${cloudinaryError.message}` 
          : 'Cloudinary deletion failed'
      );
    }
  } catch (error) {
    console.error(`Error in deleteImage function: ${error} [${deleteId}]`);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to delete image');
  }
}