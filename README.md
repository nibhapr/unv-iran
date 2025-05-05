# Uniview Iran - Security Solutions

This is the official website for Uniview Iran, providing advanced security solutions and surveillance systems across Iran. The platform showcases Uniview's comprehensive range of security products and industry-specific solutions.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:8084](http://localhost:8084) with your browser to see the result when running in docker. <br>
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result when running in local.

## Environment Setup

Create a `.env.local` file in the root directory with the following environment variables:

```bash
# Base URL
NEXT_PUBLIC_BASE_URL=https://unv-iran.com

# MongoDB
MONGODB_URI=your_mongodb_uri_here

# Auth
JWT_SECRET=your_jwt_secret_here

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

To get Cloudinary credentials:
1. Sign up for a free account at [Cloudinary.com](https://cloudinary.com)
2. Go to your Dashboard to find your Cloud Name, API Key, and API Secret
3. Copy these values to your `.env.local` file

## Key Features

- **Multi-language Support**: Fully bilingual interface in Farsi and English with context-based language switching
- **Product Catalog**: 
  - Hierarchical organization of products by categories and subcategories
  - Detailed product specifications and technical data
  - High-quality image galleries for each product
  - Downloadable product documentation
- **Industry Solutions**:
  - Specialized security packages for retail, banking, education, healthcare, and more
  - Custom use-case scenarios and implementation guides
  - Industry-specific benefits and security considerations
- **Admin Dashboard**:
  - Secure authentication system
  - Content management for all website sections
  - Product, category, and subcategory management
  - Image upload and optimization via Cloudinary
  - Customer inquiry tracking and management
  - Newsletter subscriber management
  - Website analytics and statistics
- **SEO Optimization**:
  - Dynamic sitemap generation
  - Metadata optimization for all pages
  - Image alt tags and OpenGraph support
  - Structured data for rich search results

## Technical Architecture

### Frontend
- Next.js App Router for server-side rendering and API routes
- React components with Hooks for state management
- Tailwind CSS for responsive styling
- Custom animations with Framer Motion
- Client-side language switching with Context API

### Backend
- MongoDB database with Mongoose ODM
- RESTful API endpoints for data operations
- JWT-based authentication for admin access
- Cloudinary integration for image hosting and optimization
- Serverless functions for backend operations

## Docker Deployment

This project includes Docker configuration for easy deployment:

```bash
# Build the Docker image
docker build -t unv-iran .

# Run the container
docker run -p 8084:8084 unv-iran

# Using docker-compose
docker-compose up -d
```

## Project Structure

- `src/app/`: Main application code
  - `Components/`: Reusable UI components (Navbar, Footer, etc.)
  - `[slug]/`: Dynamic routes for categories and products
    - `[categorySlug]/`: Category-specific pages
    - `[categorySlug]/[subcategorySlug]/`: Subcategory-specific pages
    - `[categorySlug]/[subcategorySlug]/[productSlug]/`: Individual product pages
  - `admin/`: Administrative dashboard and management
    - `dashboard/`: Admin overview and statistics
    - `products/`: Product management interface
    - `categories/`: Category management interface
    - `subcategories/`: Subcategory management interface
    - `contact/`: Customer inquiry management
    - `newsletter/`: Newsletter subscriber management
  - `api/`: Backend API endpoints
    - `products/`: Product CRUD operations
    - `categories/`: Category CRUD operations
    - `subcategories/`: Subcategory CRUD operations
    - `contact/`: Contact form submissions
    - `newsletter/`: Newsletter management
    - `admin/`: Authentication endpoints
    - `upload/`: File upload endpoints
- `public/`: Static assets and images
- `models/`: MongoDB schema definitions
- `lib/`: Utility functions and database connection
- `context/`: React context providers (Language, Auth, etc.)

## Technologies

- **Frontend**:
  - Next.js 15
  - React 19
  - Tailwind CSS
  - Framer Motion
  - React Icons
- **Backend**:
  - MongoDB & Mongoose
  - JSON Web Tokens (JWT)
  - Next.js API Routes
- **Storage & Media**:
  - Cloudinary for image hosting
  - Next-Cloudinary for optimized image delivery
- **Deployment**:
  - Docker for containerization
  - Node.js Alpine for lightweight containers

## Development Practices

- TypeScript for type safety
- ESLint and Prettier for code quality
- Responsive design for all screen sizes
- SEO optimization throughout the application
- Performance optimization with Next.js Image and Font optimization

## Learn More

- [Uniview Official Website](https://en.uniview.com/) - Learn more about Uniview products
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS
- [MongoDB Documentation](https://docs.mongodb.com/) - Learn about MongoDB
