"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  FiSearch, FiMenu, FiX, FiMail, FiPhone, 
  FiHome, FiBox, FiTool, FiInfo, FiSend,
  FiChevronDown, FiChevronRight, FiCamera, FiGlobe, FiHardDrive, FiLock
} from 'react-icons/fi';
import logo from '../../../public/UNV-IRAN.png'
import { IconType } from 'react-icons';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import TopBar from './TopBar';

interface NavbarCategory {
  _id: string;
  title: string;
  description: string;
  slug: string;
  status: 'Active' | 'Inactive';
  submenu?: Array<{
    name: string;
    link: string;
  }>;
}

// Add this new interface
interface NavLink {
  href: string;
  label: string;
  icon: IconType;
  hasMegaMenu?: boolean;
  submenu?: Array<{
    name: string;
    link: string;
  }>;
  mobileHidden?: boolean;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [productsMegaMenuOpen, setProductsMegaMenuOpen] = useState(false);
  const [solutionsMegaMenuOpen, setSolutionsMegaMenuOpen] = useState(false);
  const [navbarCategories, setNavbarCategories] = useState<NavbarCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Mobile menu state for expandable solutions section
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(false);

  // Add state for mobile products submenu
  const [mobileProductsSubMenuOpen, setMobileProductsSubMenuOpen] = useState(false);

  const { t, dir } = useLanguage();

  // Fetch navbar categories from the API
  useEffect(() => {
    const fetchNavbarCategories = async () => {
      try {
        const response = await fetch('/api/navbar-categories');
        if (!response.ok) {
          throw new Error('Failed to fetch navbar categories');
        }
        const data = await response.json();
        // Filter out inactive categories
        const activeCategories = data.filter(
          (category: NavbarCategory) => category.status === 'Active'
        );
        setNavbarCategories(activeCategories);
      } catch (error) {
        console.error('Error fetching navbar categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNavbarCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Default nav links that will always be present
  const defaultNavLinks = [
    { href: '/', label: t('common.home'), icon: FiHome },
    // Add Products link with mega menu for desktop only
    { 
      href: '/products', 
      label: t('common.products'),
      icon: FiBox,
      hasMegaMenu: true,
      mobileHidden: true
    }
  ];

  // Type your navLinks with the new interface - don't include categories here
  const navLinks: NavLink[] = [
    ...defaultNavLinks,
    // Remove the categories mapping here
  ];

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const nav = document.getElementById('mobile-menu');
    if (isOpen && nav && !nav.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  // Update industryLinks definition to use a simpler format
  // (translations will be handled separately)
  const industryLinks = [
    { href: '/building', label: 'Building', icon: '🏢' },
    { href: '/retail', label: 'Retail', icon: '🛒' },
    { href: '/bank', label: 'Bank', icon: '🏦' },
    { href: '/school', label: 'School', icon: '🎓' },
    { href: '/shopping-mall', label: 'Shopping Mall', icon: '🛍️' },
    { href: '/hospital', label: 'Hospital', icon: '🏥' },
    { href: '/warehouse', label: 'Warehouse and Logistics', icon: '🏭' },
    { href: '/stadium', label: 'Stadium', icon: '🏟️' },
    { href: '/hotel', label: 'Hotel', icon: '🏨' },
  ];

  const functionLinks = [
    { href: '/smart-Intrusion-Prevention', label: 'Smart intrusion prevention', icon: '📊' },
  ];

  const toggleSolutionsMegaMenu = (e: React.MouseEvent) => {
    if (window.innerWidth >= 768) { // Only for desktop
      e.preventDefault();
      setSolutionsMegaMenuOpen(!solutionsMegaMenuOpen);
    }
  };

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const megaMenu = document.getElementById('solutions-mega-menu');
      const solutionsLink = document.getElementById('solutions-link');
      
      if (solutionsMegaMenuOpen && megaMenu && !megaMenu.contains(event.target as Node) && 
          solutionsLink && !solutionsLink.contains(event.target as Node)) {
        setSolutionsMegaMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [solutionsMegaMenuOpen]);

  // Clean up body classes when component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden', 'md:overflow-auto');
    };
  }, []);

  const toggleMobileSubMenu = () => {
    setMobileSubMenuOpen(!mobileSubMenuOpen);
  };

  // Add a toggle function for products menu
  const toggleProductsMegaMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setProductsMegaMenuOpen(!productsMegaMenuOpen);
    // Close solutions menu if it's open
    if (solutionsMegaMenuOpen) {
      setSolutionsMegaMenuOpen(false);
    }
  };
  
  // Add click outside handler for products menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const productsMegaMenu = document.getElementById('products-mega-menu');
      const productsLink = document.getElementById('products-link');
      
      if (productsMegaMenuOpen && productsMegaMenu && !productsMegaMenu.contains(event.target as Node) && 
          productsLink && !productsLink.contains(event.target as Node)) {
        setProductsMegaMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [productsMegaMenuOpen]);

  // Add toggle function for mobile products submenu
  const toggleMobileProductsSubMenu = () => {
    setMobileProductsSubMenuOpen(!mobileProductsSubMenuOpen);
  };

  return (
    <header className="fixed w-full z-40 top-0">
      <TopBar />
      <nav dir={dir} className={`w-full transition-all duration-300 
        ${isScrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-white'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Further increased leftward positioning, especially for mobile */}
            <div className="flex-shrink-0 -ml-8 md:-ml-8 lg:-ml-12">
              <Link 
                href="/" 
                className="flex items-center transform transition-all duration-300 
                  hover:scale-105 hover:rotate-1 active:scale-95 group"
                aria-label="Home"
              >
                <Image 
                  src={logo.src}
                  alt="Uniview Logo"
                  width={200}
                  height={200}
                  className="w-auto h-16 group-hover:drop-shadow-md object-contain drop-shadow-sm"
                  priority
                  loading="eager"
                  quality={100}
                  style={{
                    maxWidth: "none",
                    objectFit: "contain",
                  }}
                  unoptimized={true}
                />
              </Link>
            </div>

            {/* Desktop Navigation with Enhanced Interactivity */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                
                return link.hasMegaMenu ? (
                  <div 
                    key={link.href}
                    className="relative"
                  >
                    <button
                      id="products-link"
                      className={`flex items-center py-2 px-3 rounded-lg text-sm transition-colors
                        ${pathname === link.href 
                          ? 'text-blue-800 bg-blue-50 font-medium' 
                          : 'text-gray-900 hover:text-blue-800 hover:bg-gray-50'
                        }`}
                      onClick={toggleProductsMegaMenu}
                      aria-expanded={productsMegaMenuOpen}
                      aria-haspopup="true"
                    >
                      <div className="flex items-center">
                        {link.icon && React.createElement(link.icon, { className: "mr-3 opacity-60" })}
                        {link.label}
                      </div>
                      <FiChevronDown className={`ml-1 w-4 h-4 transition-transform ${productsMegaMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Products Mega Menu - Blue Icons */}
                    <div 
                      id="products-mega-menu"
                      className={`absolute right-0 mt-8 w-[420px] transform transition-all duration-300 origin-top-right z-50
                        ${productsMegaMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                    >
                      <div className="relative bg-gradient-to-b from-white to-gray-50/95 backdrop-blur-xl 
                        rounded-2xl shadow-2xl shadow-blue-200/50 border border-gray-100 overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute inset-0 bg-grid-gray-100/40 bg-[size:20px_20px]" />
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                        
                        <div className="relative p-5">
                          <div className="flex items-center space-x-2 mb-4">
                            <div className="p-1.5 bg-blue-100 rounded-lg">
                              <FiBox className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                              {t('common.productCategories')}
                            </h3>
                          </div>

                          <div className="max-h-[65vh] overflow-y-auto pr-2 space-y-0.5">
                            {navbarCategories.map((category) => (
                              <div key={category._id} className="group">
                                <Link
                                  href={`/${category.slug}`}
                                  className="flex items-center py-2.5 px-3 rounded-lg group-hover:bg-gradient-to-r 
                                    from-blue-50/80 to-indigo-50/80 transition-all duration-300"
                                  onClick={() => setProductsMegaMenuOpen(false)}
                                >
                                  <span className="flex items-center justify-center w-8 h-8 rounded-lg 
                                    bg-blue-50 shadow-sm group-hover:shadow-md transition-all duration-300
                                    group-hover:scale-105 group-hover:rotate-3 border border-blue-100/50">
                                    {category.title.startsWith('Camera') ? (
                                      <FiCamera className="w-4 h-4 text-blue-600" />
                                    ) : category.title.startsWith('Network') ? (
                                      <FiGlobe className="w-4 h-4 text-blue-600" />
                                    ) : category.title.startsWith('Storage') ? (
                                      <FiHardDrive className="w-4 h-4 text-blue-600" />
                                    ) : category.title.startsWith('Access') ? (
                                      <FiLock className="w-4 h-4 text-blue-600" />
                                    ) : (
                                      <FiBox className="w-4 h-4 text-blue-600" />
                                    )}
                                  </span>
                                  <span className="ml-3 font-medium text-sm text-gray-900 group-hover:text-blue-700
                                    transition-colors">
                                    {category.title}
                                  </span>
                                  {category.submenu && category.submenu.length > 0 && (
                                    <FiChevronRight className="ml-auto w-4 h-4 text-gray-400 
                                      group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                                  )}
                                </Link>

                                {category.submenu && category.submenu.length > 0 && (
                                  <div className="ml-11 mt-0.5 space-y-0.5 mb-1">
                                    {category.submenu.map((item, index) => (
                                      <Link
                                        key={index}
                                        href={item.link}
                                        className="flex items-center py-1.5 px-3 rounded-md text-sm 
                                          text-gray-600 hover:text-blue-700 hover:bg-blue-50/50
                                          transition-all duration-200"
                                        onClick={() => setProductsMegaMenuOpen(false)}
                                      >
                                        <div className="w-1 h-1 rounded-full bg-gray-300 mr-2
                                          group-hover:bg-blue-400 transition-colors" />
                                        <span className="text-xs font-medium">{item.name}</span>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative py-2.5 px-4 rounded-lg text-sm transition-all duration-300
                      ${isActive 
                        ? 'text-blue-800 bg-blue-50/80 font-medium shadow-sm shadow-blue-100/50' 
                        : 'text-gray-900 hover:text-blue-800 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center">
                      {link.icon && React.createElement(link.icon, { 
                        className: "mr-3 opacity-60 group-hover:opacity-100 transition-opacity" 
                      })}
                      {link.label}
                    </div>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" 
                    />
                  </Link>
                );
              })}
              
              {/* Solutions with Mega Menu */}
              <div className="relative group" id="solutions-nav-item">
                <button
                  id="solutions-link"
                  className={`relative group flex items-center text-gray-900 
                    hover:text-blue-800 transition-all duration-300 
                    font-medium text-sm uppercase tracking-wider
                    ${pathname.startsWith('/solutions') ? 'text-blue-800 font-semibold' : ''}`}
                  onClick={toggleSolutionsMegaMenu}
                  aria-expanded={solutionsMegaMenuOpen}
                  aria-haspopup="true"
                >
                  <FiTool className="mr-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                  {t('common.solutions')}
                  <FiChevronDown className={`ml-1 transition-transform duration-300 ${solutionsMegaMenuOpen ? 'rotate-180' : ''}`} />
                  <span 
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 
                      transform transition-transform duration-300 origin-left
                      ${pathname.startsWith('/solutions') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} 
                  />
                </button>
                
                {/* Solutions Mega Menu - Enhanced Design */}
                <div 
                  id="solutions-mega-menu"
                  className={`absolute left-1/2 -translate-x-1/2 mt-8 w-screen max-w-6xl px-4
                    transform transition-all duration-300 origin-top z-50
                    ${solutionsMegaMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                >
                  <div className="relative bg-gradient-to-b from-white to-gray-50/95 backdrop-blur-xl 
                    rounded-2xl shadow-2xl shadow-blue-200/50 border border-gray-100 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 bg-grid-gray-100/40 bg-[size:20px_20px]" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                    
                    <div className="relative max-h-[75vh] overflow-y-auto">
                      <div className="grid md:grid-cols-2 gap-6 p-6">
                        {/* Industry Solutions */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 mb-4">
                            <div className="p-1.5 bg-blue-100 rounded-lg">
                              <FiTool className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                              {t('common.solutionsByIndustry')}
                            </h3>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            {industryLinks.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="group flex items-center p-3 rounded-xl hover:bg-blue-50/80 
                                  border border-transparent hover:border-blue-100 transition-all duration-300"
                                onClick={() => setSolutionsMegaMenuOpen(false)}
                              >
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg 
                                  bg-white shadow-sm group-hover:shadow-md transition-shadow 
                                  text-xl group-hover:scale-110 transform duration-300">
                                  {link.icon}
                                </span>
                                <span className="ml-3">
                                  <span className="block text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                    {t(`common.industries.${link.href.replace('/', '')}`)}
                                  </span>
                                  <span className="block text-xs text-gray-500 group-hover:text-blue-500">
                                    {t('common.viewSolutions')} →
                                  </span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Function Solutions */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 mb-4">
                            <div className="p-1.5 bg-purple-100 rounded-lg">
                              <FiBox className="w-5 h-5 text-purple-600" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                              {t('common.solutionsByFunction')}
                            </h3>
                          </div>

                          <div className="space-y-2">
                            {functionLinks.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                className="group flex items-center p-3 rounded-xl hover:bg-purple-50/80 
                                  border border-transparent hover:border-purple-100 transition-all duration-300"
                                onClick={() => setSolutionsMegaMenuOpen(false)}
                              >
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg 
                                  bg-white shadow-sm group-hover:shadow-md transition-shadow 
                                  text-xl group-hover:scale-110 transform duration-300">
                                  {link.icon}
                                </span>
                                <span className="ml-3">
                                  <span className="block text-sm font-medium text-gray-900 group-hover:text-purple-600">
                                    {t(`common.functions.${link.href.replace('/', '')}`)}
                                  </span>
                                  <span className="block text-xs text-gray-500 group-hover:text-purple-500">
                                    {t('common.exploreFeatures')} →
                                  </span>
                                </span>
                              </Link>
                            ))}
                          </div>

                          {/* View All Solutions Button */}
                          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                            <Link 
                              href="/solutions"
                              className="group flex items-center justify-between p-3 bg-white rounded-lg 
                                shadow-sm hover:shadow-md transition-all duration-300"
                              onClick={() => setSolutionsMegaMenuOpen(false)}
                            >
                              <div>
                                <span className="block text-sm font-semibold text-gray-900">
                                  {t('common.viewAllSolutions')}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {t('common.exploreSolutionsCatalog')}
                                </span>
                              </div>
                              <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 
                                group-hover:translate-x-1 transition-all duration-300" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Link
                href="/about"
                className={`relative group flex items-center text-gray-900 
                  hover:text-blue-800 transition-all duration-300 
                  font-medium text-sm uppercase tracking-wider
                  ${pathname === '/about' ? 'text-blue-800 font-semibold' : ''}`}
                aria-current={pathname === '/about' ? 'page' : undefined}
              >
                <FiInfo className="mr-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                {t('common.about')}
                <span 
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 
                    transform transition-transform duration-300 origin-left
                    ${pathname === '/about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} 
                />
              </Link>
              
              <Link
                href="/contact"
                className={`relative group flex items-center text-gray-900 
                  hover:text-blue-800 transition-all duration-300 
                  font-medium text-sm uppercase tracking-wider
                  ${pathname === '/contact' ? 'text-blue-800 font-semibold' : ''}`}
                aria-current={pathname === '/contact' ? 'page' : undefined}
              >
                <FiSend className="mr-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                {t('common.contact')}
                <span 
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 
                    transform transition-transform duration-300 origin-left
                    ${pathname === '/contact' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} 
                />
              </Link>
              
              {/* Enhanced Search Bar */}
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-2.5 rounded-full border border-gray-200 
                    focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent
                    bg-gray-50 hover:bg-white transition-all duration-300 
                    text-sm w-56 lg:w-64 shadow-sm hover:shadow-md"
                  aria-label="Search"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 
                  text-gray-400 group-hover:text-blue-500 transition-colors">
                  <FiSearch className="w-5 h-5" />
                </div>
              </form>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-900 hover:text-blue-800 
                transition-all duration-300 focus:outline-none 
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                rounded-md p-2 hover:bg-blue-50"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
              aria-controls="mobile-menu"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>

          {/* Mobile Menu with Improved Design */}
          <div 
            id="mobile-menu"
            className={`md:hidden transition-all duration-500 ease-in-out 
              ${isOpen 
                ? 'max-h-[80vh] opacity-100 visible overflow-y-auto' 
                : 'max-h-0 opacity-0 invisible overflow-hidden'
              } bg-white/95 backdrop-blur-md rounded-xl shadow-xl shadow-blue-100/50 mt-4`}
            aria-hidden={!isOpen}
          >
            <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3">
              {navLinks
                .filter(link => !link.mobileHidden)
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 text-sm 
                      ${pathname === link.href 
                        ? 'text-blue-800 bg-blue-50 font-semibold' 
                        : 'text-gray-900 hover:text-blue-800 hover:bg-gray-50'
                      }`}
                    onClick={() => setIsOpen(false)}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    <div className="flex items-center">
                      {link.icon && React.createElement(link.icon, { className: "mr-3 opacity-60" })}
                      {link.label}
                    </div>
                  </Link>
                ))}
              
              {/* Solutions Menu Item with Expandable Sub-Items */}
              <div className="border-t border-b border-gray-100 py-2">
                <button
                  onClick={toggleMobileSubMenu}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-300 text-sm 
                    ${pathname.startsWith('/solutions') 
                      ? 'text-blue-800 bg-blue-50 font-semibold' 
                      : 'text-gray-900 hover:text-blue-800 hover:bg-gray-50'
                    }`}
                  aria-expanded={mobileSubMenuOpen}
                >
                  <div className="flex items-center">
                    <FiTool className="mr-3 opacity-60" />
                    {t('common.solutions')}
                  </div>
                  <FiChevronDown className={`transition-transform duration-300 ${mobileSubMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`pl-2 space-y-2 transition-all duration-300 
                  ${mobileSubMenuOpen ? 'mt-2 max-h-[2000px] opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'}`}
                >
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-3 mx-2">
                    <h3 className="px-3 py-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
                      {t('common.byIndustry')}
                    </h3>
                    <div className="grid grid-cols-2 gap-1">
                      {industryLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-blue-600 hover:bg-white/80 backdrop-blur-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="mr-2">{link.icon}</span>
                          <span className="text-xs font-medium">{t(`common.industries.${link.href.replace('/', '')}`)}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-3 mx-2">
                    <h3 className="px-3 py-2 text-xs font-bold text-purple-800 uppercase tracking-wider">
                      {t('common.byFunction')}
                    </h3>
                    <div className="space-y-1">
                      {functionLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-purple-600 hover:bg-white/80 backdrop-blur-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="mr-2">{link.icon}</span>
                          <span className="text-xs font-medium">{t(`common.functions.${link.href.replace('/', '')}`)}</span>
                        </Link>
                      ))}
                    </div>
                    
                    <Link
                      href="/solutions"
                      className="flex items-center justify-between px-3 py-2 mt-2 text-sm text-purple-600 bg-white/80 backdrop-blur-sm rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-medium">{t('common.viewAllSolutions')}</span>
                      <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 
                        group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
              
              <Link
                href="/about"
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 text-sm 
                  ${pathname === '/about' 
                    ? 'text-blue-800 bg-blue-50 font-semibold' 
                    : 'text-gray-900 hover:text-blue-800 hover:bg-gray-50'
                  }`}
                onClick={() => setIsOpen(false)}
                aria-current={pathname === '/about' ? 'page' : undefined}
              >
                <FiInfo className="mr-3 opacity-60" />
                {t('common.about')}
              </Link>
              
              <Link
                href="/contact"
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 text-sm 
                  ${pathname === '/contact' 
                    ? 'text-blue-800 bg-blue-50 font-semibold' 
                    : 'text-gray-900 hover:text-blue-800 hover:bg-gray-50'
                  }`}
                onClick={() => setIsOpen(false)}
                aria-current={pathname === '/contact' ? 'page' : undefined}
              >
                <FiSend className="mr-3 opacity-60" />
                {t('common.contact')}
              </Link>
              
              {/* Products Menu Item with Expandable Categories */}
              <div className="border-t border-gray-100 py-2">
                <button
                  onClick={toggleMobileProductsSubMenu}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-300 text-sm 
                    ${pathname.startsWith('/products') 
                      ? 'text-blue-800 bg-blue-50 font-semibold' 
                      : 'text-gray-900 hover:text-blue-800 hover:bg-gray-50'
                    }`}
                  aria-expanded={mobileProductsSubMenuOpen}
                >
                  <div className="flex items-center">
                    <FiBox className="mr-3 opacity-60" />
                    {t('common.products')}
                  </div>
                  <FiChevronDown className={`transition-transform duration-300 ${mobileProductsSubMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`pl-2 space-y-2 transition-all duration-300 
                  ${mobileProductsSubMenuOpen ? 'mt-2 max-h-[2000px] opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'}`}
                >
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 mx-2">
                    <h3 className="px-3 py-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
                      {t('common.categories')}
                    </h3>
                    <div className="space-y-1">
                      {navbarCategories.map((category) => (
                        <div key={category._id} className="mb-2">
                          <Link
                            href={`/${category.slug}`}
                            className="flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:text-blue-600 hover:bg-white/80"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="mr-2">📁</span>
                            <span className="font-medium">{category.title}</span>
                          </Link>
                          
                          {category.submenu && category.submenu.length > 0 && (
                            <div className="ml-8 space-y-1 mt-1">
                              {category.submenu.map((item, index) => (
                                <Link
                                  key={index}
                                  href={item.link}
                                  className="flex items-center px-2 py-1.5 rounded-md text-xs text-gray-600 hover:text-blue-600 hover:bg-white/80"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <FiChevronRight className="mr-1 h-3 w-3 text-gray-400" />
                                  <span>{item.name}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;