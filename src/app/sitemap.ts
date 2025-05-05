import { MetadataRoute } from 'next';
import connectDB from '@/lib/mongodb';
import NavbarCategory from '@/models/NavbarCategory';
import Category from '@/models/Category';
import SubCategory from '@/models/SubCategory';
import Product from '@/models/Product';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://unv-iran.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  // Initialize the sitemap array with static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Industry routes
    {
      url: `${BASE_URL}/building`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/retail`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/bank`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/school`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/shopping-mall`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/hospital`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/warehouse`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/stadium`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/hotel`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Function routes
    {
      url: `${BASE_URL}/smart-Intrusion-Prevention`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Legal pages
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  try {
    // Fetch all active navbar categories
    const navbarCategories = await NavbarCategory.find({ status: 'Active' });

    // Create routes for navbar categories
    const navbarCategoryRoutes = navbarCategories.map((navCat) => ({
      url: `${BASE_URL}/${navCat.slug}`,
      lastModified: navCat.updatedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    // Fetch all active categories
    const categories = await Category.find({ status: 'Active' }).populate('navbarCategory');

    // Create routes for categories
    const categoryRoutes = categories.map((cat) => {
      const navCatSlug = cat.navbarCategory && typeof cat.navbarCategory !== 'string'
        ? cat.navbarCategory.slug
        : 'products'; // Fallback

      return {
        url: `${BASE_URL}/${navCatSlug}/${cat.slug}`,
        lastModified: cat.updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      };
    });

    // Fetch all active subcategories
    const subcategories = await SubCategory.find({ status: 'Active' })
      .populate('navbarCategory')
      .populate('category');

    // Create routes for subcategories
    const subcategoryRoutes = subcategories.map((subcat) => {
      const navCatSlug = subcat.navbarCategory && typeof subcat.navbarCategory !== 'string'
        ? subcat.navbarCategory.slug
        : 'products'; // Fallback

      const catSlug = subcat.category && typeof subcat.category !== 'string'
        ? subcat.category.slug
        : 'category'; // Fallback

      return {
        url: `${BASE_URL}/${navCatSlug}/${catSlug}/${subcat.slug}`,
        lastModified: subcat.updatedAt || new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
    });

    // Fetch all active products
    const products = await Product.find({ status: 'Active' })
      .populate('navbarCategory')
      .populate('category')
      .populate('subcategory');

    // Create routes for products
    const productRoutes = products.map((product) => {
      const navCatSlug = product.navbarCategory && typeof product.navbarCategory !== 'string'
        ? product.navbarCategory.slug
        : 'products'; // Fallback

      const catSlug = product.category && typeof product.category !== 'string'
        ? product.category.slug
        : 'category'; // Fallback

      const subcatSlug = product.subcategory && typeof product.subcategory !== 'string'
        ? product.subcategory.slug
        : 'subcategory'; // Fallback

      return {
        url: `${BASE_URL}/${navCatSlug}/${catSlug}/${subcatSlug}/${product.slug}`,
        lastModified: product.updatedAt || new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
    });

    // Combine all routes
    return [
      ...staticRoutes,
      ...navbarCategoryRoutes,
      ...categoryRoutes,
      ...subcategoryRoutes,
      ...productRoutes,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return just the static routes if there's an error
    return staticRoutes;
  }
} 