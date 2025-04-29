import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// This function can be marked `async` if using `await` inside
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
      const JWT_SECRET = process.env.JWT_SECRET;
      if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
      }
      
      const secret = new TextEncoder().encode(JWT_SECRET);
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