"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  FiHome, 
  FiMenu, 
  FiGrid, 
  FiBox, 
  FiLayers, 
  FiMessageSquare, 
  FiMail,
  FiLogOut,
  FiChevronRight,
  FiMap
} from 'react-icons/fi';

const AdminSidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems = [
    { 
      href: '/admin/dashboard', 
      label: 'Dashboard', 
      icon: FiHome 
    },
    { 
      href: '/admin/navbar-category', 
      label: 'Navbar Category', 
      icon: FiMenu 
    },
    { 
      href: '/admin/categories', 
      label: 'Categories', 
      icon: FiGrid 
    },
    { 
      href: '/admin/subcategories', 
      label: 'SubCategories', 
      icon: FiLayers 
    },
    { 
      href: '/admin/products', 
      label: 'Products', 
      icon: FiBox 
    },
    { 
      href: '/admin/sitemap', 
      label: 'Sitemap', 
      icon: FiMap 
    },
    { 
      href: '/admin/contact', 
      label: 'Contact', 
      icon: FiMessageSquare 
    },
    { 
      href: '/admin/newsletter', 
      label: 'Newsletter', 
      icon: FiMail 
    },
  ];

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      });

      if (response.ok) {
        // Clear client-side state and redirect
        router.push('/admin-login');
        router.refresh(); // Ensure cache is cleared
      } else {
        console.error('Logout failed:', await response.json());
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <aside className={`fixed h-full transition-all duration-300 bg-gray-900 text-white flex flex-col
                      ${collapsed ? 'w-20' : 'w-64'} z-30`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        {!collapsed && (
          <div className="text-xl font-semibold">Uniview Admin</div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <FiMenu className="text-white" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center py-3 px-4 rounded-lg transition-all duration-200
                            ${isActive 
                              ? 'bg-blue-600 text-white' 
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
              >
                <div className="flex items-center flex-grow">
                  <Icon className={`${collapsed ? 'text-xl' : 'text-lg mr-3'}`} />
                  {!collapsed && (
                    <span>{item.label}</span>
                  )}
                </div>
                {!collapsed && isActive && (
                  <FiChevronRight className="ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center w-full py-3 px-4 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
        >
          <FiLogOut className={`${collapsed ? 'text-xl' : 'text-lg mr-3'}`} />
          {!collapsed && (
            <span>Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;