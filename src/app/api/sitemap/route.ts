import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    
    // Fetch all active products
    const products = await Product.find({ status: 'active' });
    
    // Base URLs for the sitemap
    const baseUrls = [
      { url: 'https://unv-iran.com/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '1.0' },
      { url: 'https://unv-iran.com/about', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
      { url: 'https://unv-iran.com/contact', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
      { url: 'https://unv-iran.com/solutions', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
      { url: 'https://unv-iran.com/products', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.9' },
      { url: 'https://unv-iran.com/building', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.7' },
      { url: 'https://unv-iran.com/hotel', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.7' },
      { url: 'https://unv-iran.com/retail', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.7' },
      { url: 'https://unv-iran.com/bank', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.7' },
      { url: 'https://unv-iran.com/hospital', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.7' },
      { url: 'https://unv-iran.com/school', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.7' },
      { url: 'https://unv-iran.com/shopping-mall', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.7' },
      { url: 'https://unv-iran.com/warehouse', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.7' },
      { url: 'https://unv-iran.com/stadium', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.7' },
      { url: 'https://unv-iran.com/smart-Intrusion-Prevention', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.7' },
      { url: 'https://unv-iran.com/privacy', lastmod: new Date().toISOString().split('T')[0], changefreq: 'yearly', priority: '0.5' },
      { url: 'https://unv-iran.com/terms', lastmod: new Date().toISOString().split('T')[0], changefreq: 'yearly', priority: '0.5' },
      { url: 'https://unv-iran.com/cookies', lastmod: new Date().toISOString().split('T')[0], changefreq: 'yearly', priority: '0.5' },
    ];
    
    // Add product URLs
    const productUrls = products.map(product => ({
      url: `https://unv-iran.com/products/${product._id}`,
      lastmod: product.updatedAt ? new Date(product.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    }));
    
    // Combine all URLs
    const allUrls = [...baseUrls, ...productUrls];
    
    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    allUrls.forEach(item => {
      xml += '  <url>\n';
      xml += `    <loc>${item.url}</loc>\n`;
      xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
      xml += `    <priority>${item.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    // Return XML with proper content type
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    );
  }
}