import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

// Admin credentials stored in environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Debugging - log the received credentials and environment variables
    console.log('Received login attempt:', { email });
    console.log('Expected credentials:', { 
      expectedEmail: ADMIN_EMAIL, 
      emailMatches: email === ADMIN_EMAIL,
      passwordMatches: password === ADMIN_PASSWORD 
    });

    // Check if credentials match
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create a JWT token using jose
      const secretKey = new TextEncoder().encode(JWT_SECRET);
      const token = await new SignJWT({ 
        email,
        role: 'admin',
        // Add any other necessary data
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secretKey);

      // Set the token in a cookie with proper settings for Vercel deployment
      const cookieStore = await cookies();
      cookieStore.set('admin_token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
        sameSite: 'lax',
        domain: 'unv-iran.com' // Add this line for your domain
      });

      // Add a short delay before responding to ensure the cookie is properly set
      await new Promise(resolve => setTimeout(resolve, 100));

      return NextResponse.json({ success: true, redirectTo: '/admin/dashboard' });
    } else {
      return NextResponse.json({ 
        error: 'Invalid credentials',
        debug: { 
          providedEmail: email,
          expectedEmail: ADMIN_EMAIL,
          emailMatch: email === ADMIN_EMAIL,
          passwordMatch: password === ADMIN_PASSWORD
        } 
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 });
  }
}