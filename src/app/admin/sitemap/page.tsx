"use client";

import React from 'react';
import SitemapVisualizer from '../components/SitemapVisualizer';

const SitemapPage = () => {
  return (
    <div className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sitemap</h1>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600">
          View your site's complete structure including all navbar categories, categories, subcategories, and products.
          This visualization helps you understand how your content is organized across the website.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <SitemapVisualizer />
      </div>
    </div>
  );
};

export default SitemapPage; 