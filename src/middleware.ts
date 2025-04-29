import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// This function can be marked async if using await inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Add this at the top of your middleware function
  console.log('Request path:', path);
  console.log('Cookies:', JSON.stringify(Object.fromEntries(request.cookies)));

  // Only handle exact admin path
  if (path === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // Only protect admin routes
  if (path.startsWith('/admin') && !path.includes('admin-login')) {
    // Get token from cookie
    const token = request.cookies.get('admin_token')?.value;

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }

    try {
      // Simplified token verification - just check if it's a valid JWT
      // This is not as secure but can help debug if it's a secret issue
      const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET=a73238645aff5c25899442e4eef2ecc8bee74cc1b534de56f4cef8d0d0006d33a63169ff4503ae9fac36e4a305a6af5eef42c65b0e76e34271c3e1ebdd84803607f867e683bb5d33e332e281eb1bc2cb2a2c1db2578e6295a6b6eb945d08cc52ce1f80c93b8627b65dce414009ef4322eb8dab91d585a776998d4c833778c3480932e5ef5b39f4604c06507feaf5ece1ff18f3015502d3bbacd214d3fc06606baa5c67076e3cd6ac2f3bd83805074acaed93c2203f82a740ecbc4a250180eb25f09a651c408bbccc9f7dc31f53dd409125895e1a4c93aec0a7f29a9bcbfd5d87ad73b8864dec997705a13e7dde2635f2e7a7ed963a2b13b693cf17d19e50329f';
      const secret = new TextEncoder().encode(JWT_SECRET);

      // Verify with more detailed error handling
      await jwtVerify(token, secret);

      // Continue to protected route
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);

      // Clear the cookie and redirect
      const response = NextResponse.redirect(new URL('/admin-login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // Allow other routes
  return NextResponse.next();
}

// Be specific about which routes to process
export const config = {
  matcher: ['/admin', '/admin/:path*'],
};