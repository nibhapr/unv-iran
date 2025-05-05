"use client";

import React, { useState, useEffect } from 'react';
import { FiFolder, FiFile, FiChevronDown, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';

interface CategoryNode {
  _id: string;
  title: string;
  slug: string;
  status: string;
  type: 'navbar' | 'category' | 'subcategory' | 'product';
  children?: CategoryNode[];
  url: string;
}

const SitemapVisualizer: React.FC = () => {
  const [sitemapData, setSitemapData] = useState<CategoryNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchSitemapData = async () => {
      try {
        // Fetch navbar categories
        const navResponse = await fetch('/api/navbar-categories');
        const navCategories = await navResponse.json();
        
        // Fetch categories
        const catResponse = await fetch('/api/categories');
        const categories = await catResponse.json();
        
        // Fetch subcategories
        const subcatResponse = await fetch('/api/subcategories');
        const subcategories = await subcatResponse.json();
        
        // Fetch products
        const productsResponse = await fetch('/api/products');
        const products = await productsResponse.json();
        
        // Build tree structure
        const tree = buildSitemapTree(
          navCategories, 
          categories, 
          subcategories, 
          products
        );
        
        setSitemapData(tree);
      } catch (error) {
        console.error('Error fetching sitemap data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSitemapData();
  }, []);

  const buildSitemapTree = (
    navbarCategories: any[], 
    categories: any[], 
    subcategories: any[], 
    products: any[]
  ) => {
    // Start with static top-level nodes
    const tree: CategoryNode[] = [
      {
        _id: 'home',
        title: 'Home',
        slug: '',
        status: 'Active',
        type: 'navbar',
        url: '/',
        children: []
      },
      {
        _id: 'about',
        title: 'About',
        slug: 'about',
        status: 'Active',
        type: 'navbar',
        url: '/about',
        children: []
      },
      {
        _id: 'contact',
        title: 'Contact',
        slug: 'contact',
        status: 'Active',
        type: 'navbar',
        url: '/contact',
        children: []
      },
      {
        _id: 'solutions',
        title: 'Solutions',
        slug: 'solutions',
        status: 'Active',
        type: 'navbar',
        url: '/solutions',
        children: [
          // Add industry solutions
          {
            _id: 'building',
            title: 'Building',
            slug: 'building',
            status: 'Active',
            type: 'category',
            url: '/building',
            children: []
          },
          {
            _id: 'retail',
            title: 'Retail',
            slug: 'retail',
            status: 'Active',
            type: 'category',
            url: '/retail',
            children: []
          },
          {
            _id: 'bank',
            title: 'Bank',
            slug: 'bank',
            status: 'Active',
            type: 'category',
            url: '/bank',
            children: []
          },
          {
            _id: 'school',
            title: 'School',
            slug: 'school',
            status: 'Active',
            type: 'category',
            url: '/school',
            children: []
          },
          {
            _id: 'shopping-mall',
            title: 'Shopping Mall',
            slug: 'shopping-mall',
            status: 'Active',
            type: 'category',
            url: '/shopping-mall',
            children: []
          },
          {
            _id: 'hospital',
            title: 'Hospital',
            slug: 'hospital',
            status: 'Active',
            type: 'category',
            url: '/hospital',
            children: []
          },
          {
            _id: 'warehouse',
            title: 'Warehouse',
            slug: 'warehouse',
            status: 'Active',
            type: 'category',
            url: '/warehouse',
            children: []
          },
          {
            _id: 'stadium',
            title: 'Stadium',
            slug: 'stadium',
            status: 'Active',
            type: 'category',
            url: '/stadium',
            children: []
          },
          {
            _id: 'hotel',
            title: 'Hotel',
            slug: 'hotel',
            status: 'Active',
            type: 'category',
            url: '/hotel',
            children: []
          },
          {
            _id: 'smart-intrusion',
            title: 'Smart Intrusion Prevention',
            slug: 'smart-Intrusion-Prevention',
            status: 'Active',
            type: 'category',
            url: '/smart-Intrusion-Prevention',
            children: []
          }
        ]
      }
    ];

    // Process navbar categories
    const filteredNavCategories = navbarCategories
      .filter((nav: any) => nav.status === 'Active')
      .map((nav: any) => {
        // Filter categories belonging to this navbar category
        const categoryChildren = categories
          .filter((cat: any) => {
            const navCatId = typeof cat.navbarCategory === 'string' 
              ? cat.navbarCategory 
              : cat.navbarCategory?._id;
            return navCatId === nav._id && cat.status === 'Active';
          })
          .map((cat: any) => {
            // Filter subcategories belonging to this category
            const subcategoryChildren = subcategories
              .filter((subcat: any) => {
                const catId = typeof subcat.category === 'string' 
                  ? subcat.category 
                  : subcat.category?._id;
                return catId === cat._id && subcat.status === 'Active';
              })
              .map((subcat: any) => {
                // Filter products belonging to this subcategory
                const productChildren = products
                  .filter((product: any) => {
                    const subcatId = typeof product.subcategory === 'string' 
                      ? product.subcategory 
                      : product.subcategory?._id;
                    return subcatId === subcat._id && product.status === 'Active';
                  })
                  .map((product: any) => ({
                    _id: product._id,
                    title: product.title,
                    slug: product.slug,
                    status: product.status,
                    type: 'product' as const,
                    url: `/${nav.slug}/${cat.slug}/${subcat.slug}/${product.slug}`,
                    children: []
                  }));

                return {
                  _id: subcat._id,
                  title: subcat.title,
                  slug: subcat.slug,
                  status: subcat.status,
                  type: 'subcategory' as const,
                  url: `/${nav.slug}/${cat.slug}/${subcat.slug}`,
                  children: productChildren
                };
              });

            return {
              _id: cat._id,
              title: cat.name,
              slug: cat.slug,
              status: cat.status,
              type: 'category' as const,
              url: `/${nav.slug}/${cat.slug}`,
              children: subcategoryChildren
            };
          });

        return {
          _id: nav._id,
          title: nav.title,
          slug: nav.slug,
          status: nav.status,
          type: 'navbar' as const,
          url: `/${nav.slug}`,
          children: categoryChildren
        };
      });

    // Add the dynamic navbar categories to the tree
    return [...tree, ...filteredNavCategories];
  };

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const renderNode = (node: CategoryNode, level: number = 0) => {
    const isExpanded = expandedNodes[node._id];
    const hasChildren = node.children && node.children.length > 0;
    
    const getIcon = (type: string) => {
      switch (type) {
        case 'navbar':
          return <FiFolder className="text-blue-500" />;
        case 'category':
          return <FiFolder className="text-green-500" />;
        case 'subcategory':
          return <FiFolder className="text-yellow-500" />;
        case 'product':
          return <FiFile className="text-gray-500" />;
        default:
          return <FiFile />;
      }
    };
    
    return (
      <div key={node._id} className="mb-1">
        <div 
          className="flex items-center hover:bg-gray-100 p-1 rounded cursor-pointer"
          onClick={() => hasChildren && toggleNode(node._id)}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
        >
          {hasChildren ? (
            isExpanded ? (
              <FiChevronDown className="mr-2 text-gray-600" />
            ) : (
              <FiChevronRight className="mr-2 text-gray-600" />
            )
          ) : (
            <span className="w-6" />
          )}
          
          {getIcon(node.type)}
          
          <span className="ml-2 text-sm">
            {node.title} 
            <span className="text-xs text-gray-500 ml-2">
              ({node.type})
            </span>
          </span>
          
          <Link 
            href={node.url} 
            className="ml-auto text-blue-500 hover:text-blue-700" 
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            <FiExternalLink size={14} />
          </Link>
        </div>
        
        {isExpanded && hasChildren && (
          <div className="ml-4">
            {node.children?.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Site Structure</h2>
      <div className="border rounded p-4 overflow-auto max-h-[70vh]">
        {sitemapData.map(node => renderNode(node))}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center mb-1">
          <FiFolder className="text-blue-500 mr-2" /> <span>Navbar Category</span>
        </div>
        <div className="flex items-center mb-1">
          <FiFolder className="text-green-500 mr-2" /> <span>Category</span>
        </div>
        <div className="flex items-center mb-1">
          <FiFolder className="text-yellow-500 mr-2" /> <span>Subcategory</span>
        </div>
        <div className="flex items-center">
          <FiFile className="text-gray-500 mr-2" /> <span>Product</span>
        </div>
      </div>
    </div>
  );
};

export default SitemapVisualizer; 