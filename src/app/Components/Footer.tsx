"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin, 
  FiYoutube,
  FiChevronRight
} from 'react-icons/fi';
import logo from '../../../public/logo.svg';
import { toast, Toaster } from 'react-hot-toast';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, dir } = useLanguage();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Email validation
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error(t('home.footer.invalidEmail') || 'Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.message || t('home.footer.subscribeSuccess') || 'Thanks for subscribing to our newsletter!');
        setEmail('');
      } else {
        toast.error(data.error || t('home.footer.subscribeFailed') || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast.error(t('home.footer.subscribeFailed') || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const companyLinks = [
    { href: '/about', label: t('home.footer.aboutUs') || 'About Us' },
    { href: '/products', label: t('home.footer.products') || 'Products' },
    { href: '/solutions', label: t('home.footer.solutions') || 'Solutions' },
    { href: '/contact', label: t('home.footer.contactUs') || 'Contact Us' },
  ];

  const supportLinks = [
    { href: '/support', label: t('home.footer.technicalSupport') || 'Technical Support' },
    { href: '/faq', label: t('home.footer.faq') || 'FAQ' },
    { href: '/downloads', label: t('home.footer.downloads') || 'Downloads & Resources' },
    { href: '/warranty', label: t('home.footer.warranty') || 'Warranty Information' },
  ];

  const legalLinks = [
    { href: '/privacy', label: t('home.footer.privacyPolicy') || 'Privacy Policy' },
    { href: '/terms', label: t('home.footer.termsOfService') || 'Terms of Service' },
    { href: '/cookies', label: t('home.footer.cookiePolicy') || 'Cookie Policy' },
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 pt-16 pb-8" dir={dir}>
      <Toaster position="bottom-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform -skew-y-2 rounded-3xl shadow-xl"></div>
          <div className="relative bg-white rounded-2xl shadow-lg py-8 px-6 md:py-12 md:px-12">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {t('home.footer.newsletterTitle') || 'Subscribe to Our Newsletter'}
                </h3>
                <p className="text-gray-600">
                  {t('home.footer.newsletterDescription') || 'Stay updated with our latest products, solutions, and security tips. No spam, we promise!'}
                </p>
              </div>
              <div className="md:w-1/2">
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row">
                  <div className="relative flex-grow mb-3 sm:mb-0 sm:mr-2">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder={t('home.footer.emailPlaceholder') || "Your email address"}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg 
                      hover:from-blue-700 hover:to-purple-700 transition-all duration-300 
                      flex items-center justify-center shadow-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        {t('home.footer.subscribeButton') || 'Subscribe'}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the footer remains unchanged */}
        {/* Main Footer Content - Updated with darker text for readability */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <Image 
                src={logo.src}
                alt="Uniview Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              {/* <span className="ml-3 text-xl font-bold">Uniview</span> */}
            </div>
            <p className="text-gray-700 mb-6">
              {t('home.footer.companyDescription') || 'Leading provider of professional video surveillance solutions with cutting-edge technology and exceptional customer service.'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-800">
              {t('home.footer.companyTitle') || 'Company'}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                  >
                    <FiChevronRight className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-800">
              {t('home.footer.supportTitle') || 'Support'}
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group"
                  >
                    <FiChevronRight className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-gray-800">
              {t('home.footer.contactTitle') || 'Contact Us'}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <FiMapPin className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-600">
                  {t('home.footer.address') || '123 Security Avenue, Suite 101'}<br />
                  {t('home.footer.city') || 'San Francisco, CA 94103'}
                </span>
              </div>
              <div className="flex items-center">
                <FiPhone className="text-blue-600 mr-3 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-gray-600 hover:text-blue-600 transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center">
                <FiMail className="text-blue-600 mr-3 flex-shrink-0" />
                <a href="mailto:info@unv-iran.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                  info@unv-iran.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {t('home.footer.copyright') || 'Uniview Technologies. All rights reserved.'}
          </div>
          <div className="flex space-x-6">
            {legalLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;