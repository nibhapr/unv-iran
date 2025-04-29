"use client";

import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { FiMenu } from 'react-icons/fi';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>
      
      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="relative">
          <AdminSidebar />
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Nav for Mobile */}
        <header className="bg-white shadow md:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Admin Panel</h1>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-md bg-gray-200 text-gray-700"
            >
              <FiMenu />
            </button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
} 