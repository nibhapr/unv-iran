import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://unv-iran.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/dashboard/',
        '/api/',
        '/private/',
        '/*?*', // Disallow pages with query parameters
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
} 