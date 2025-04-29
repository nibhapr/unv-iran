"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { 
  FiShield, 
  FiVideo, 
  FiUsers, 
  FiCheckCircle, 
  FiArrowRight, 
  FiSend,
  FiEye,
  FiMap,
  FiAlertTriangle,
  FiLayers
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import img1 from '../../../public/shopping mall/Shopping mall.webp'
import img2 from '../../../public/shopping mall/Traditional Enclosed Malls.webp'
import img3 from '../../../public/shopping mall/Open-Air Shopping Centers.webp'
import img4 from '../../../public/shopping mall/Mixed-Use Developments.webp'

const ShoppingMall = () => {
  const { t, dir } = useLanguage();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Uniview Shopping Mall Security Solutions Iran",
    "description": "Advanced security camera systems and surveillance solutions for Iranian shopping malls. Complete security systems including crowd management, emergency response, and parking security.",
    "brand": {
      "@type": "Brand",
      "name": "Uniview Iran",
      "url": "https://www.uniview-iran.ir"
    },
    "category": "Security Systems",
    "keywords": "shopping mall security Iran, mall surveillance, mall CCTV, دوربین مداربسته مرکز خرید, سیستم امنیتی پاساژ, نظارت تصویری مجتمع تجاری",
    "applicationCategory": "Security & Surveillance",
    "audience": {
      "@type": "Audience",
      "audienceType": "Shopping Mall Management"
    },
    "image": [
      "https://www.uniview-iran.ir/shopping%20mall/Shopping%20mall.webp",
      "https://www.uniview-iran.ir/shopping%20mall/Traditional%20Enclosed%20Malls.webp",
      "https://www.uniview-iran.ir/shopping%20mall/Open-Air%20Shopping%20Centers.webp"
    ]
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <div className="min-h-screen bg-white pt-24" dir={dir}>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 lg:py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('home.shoppingMall.heroTitle') || 'Uniview Iran Shopping Mall'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">{t('home.shoppingMall.heroTitleHighlight') || 'Security Solutions'}</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
              {t('home.shoppingMall.heroDescription') || 'Advanced Uniview security camera systems designed specifically for Iranian shopping malls, providing comprehensive protection and monitoring solutions.'}
            </p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative h-80 md:h-96">
                  <Image 
                    src={img1}
                    alt={t('home.shoppingMall.overviewImageAlt') || "Shopping Mall Security"}
                    fill
                    className="object-cover rounded-xl shadow-xl"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.shoppingMall.overviewTitle') || 'Expert Security Solutions for Iranian Retail Spaces'}</h2>
                  <p className="text-gray-700 mb-6">
                    {t('home.shoppingMall.overviewParagraph1') || "As Iran's leading provider of Uniview security systems, we understand the unique security challenges faced by shopping malls across the country. Our solutions are tailored to meet local requirements while maintaining international standards."}
                  </p>
                  <p className="text-gray-700 mb-6">
                    {t('home.shoppingMall.overviewParagraph2') || "We offer state-of-the-art Uniview surveillance systems with advanced analytics capabilities, providing comprehensive coverage for all areas of your mall. Our solutions are backed by local technical support and expertise."}
                  </p>
                  <p className="text-gray-700">
                    {t('home.shoppingMall.overviewParagraph3') || "Uniview Iran's mall security solutions create a perfect balance between robust security and customer comfort, helping you maintain a safe and welcoming environment for visitors and staff alike."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.shoppingMall.featuresTitle') || 'Key Security Features'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.shoppingMall.featuresSubtitle') || 'Our shopping mall security solutions include these essential components to ensure comprehensive protection.'}
              </p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-pink-500 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                  <FiMap className="text-pink-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.shoppingMall.feature1Title') || 'Multi-zone Monitoring'}</h3>
                <p className="text-gray-700">
                  {t('home.shoppingMall.feature1Description') || 'Advanced surveillance systems that provide comprehensive coverage of all mall areas, with customized monitoring solutions for different zones based on specific security needs.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <FiUsers className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.shoppingMall.feature2Title') || 'Crowd Management'}</h3>
                <p className="text-gray-700">
                  {t('home.shoppingMall.feature2Description') || 'AI-powered analytics that monitor crowd density, flow patterns, and gather occupancy data to prevent overcrowding and optimize staffing during peak shopping periods.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <FiAlertTriangle className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.shoppingMall.feature3Title') || 'Emergency Exit Tracking'}</h3>
                <p className="text-gray-700">
                  {t('home.shoppingMall.feature3Description') || 'Dedicated monitoring of emergency exits and evacuation routes with automatic alerts for blocked pathways and integration with emergency response systems.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <FiEye className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.shoppingMall.feature4Title') || 'Parking Area Security'}</h3>
                <p className="text-gray-700">
                  {t('home.shoppingMall.feature4Description') || 'Comprehensive coverage of parking structures with license plate recognition, suspicious behavior detection, and 24/7 monitoring to protect vehicles and prevent crime.'}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.shoppingMall.benefitsTitle') || 'Benefits of Uniview Mall Security'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.shoppingMall.benefitsSubtitle') || 'Our integrated approach to shopping mall security delivers multiple advantages.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-pink-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.shoppingMall.benefit1Title') || 'Enhanced Safety'}</h3>
                  <p className="text-gray-600">
                    {t('home.shoppingMall.benefit1Description') || 'Comprehensive monitoring that significantly reduces security incidents, creating a safer environment for shoppers, employees, and tenants.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-pink-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.shoppingMall.benefit2Title') || 'Improved Customer Experience'}</h3>
                  <p className="text-gray-600">
                    {t('home.shoppingMall.benefit2Description') || 'Enhanced security that remains unobtrusive, allowing shoppers to enjoy a pleasant, worry-free environment throughout your mall.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-pink-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.shoppingMall.benefit3Title') || 'Operational Insights'}</h3>
                  <p className="text-gray-600">
                    {t('home.shoppingMall.benefit3Description') || 'Valuable data on foot traffic patterns, dwell times, and visitor behavior that helps optimize mall layout and tenant placement.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-pink-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.shoppingMall.benefit4Title') || 'Rapid Incident Response'}</h3>
                  <p className="text-gray-600">
                    {t('home.shoppingMall.benefit4Description') || 'Immediate alerts and comprehensive video evidence that enable swift and effective response to security incidents, minimizing impacts.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-pink-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.shoppingMall.benefit5Title') || 'Reduced Liability'}</h3>
                  <p className="text-gray-600">
                    {t('home.shoppingMall.benefit5Description') || 'Comprehensive monitoring and documentation that can significantly reduce liability risks and potentially lower insurance premiums.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-pink-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.shoppingMall.benefit6Title') || 'Centralized Management'}</h3>
                  <p className="text-gray-600">
                    {t('home.shoppingMall.benefit6Description') || 'Unified system that allows security personnel to monitor and manage all security aspects from a single, intuitive platform.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.shoppingMall.applicationsTitle') || 'Applications'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.shoppingMall.applicationsSubtitle') || 'Our shopping mall security solutions are perfect for a variety of retail environments.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img2}
                    alt={t('home.shoppingMall.application1ImageAlt') || "Traditional Enclosed Malls"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.shoppingMall.application1Title') || 'Traditional Enclosed Malls'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.shoppingMall.application1Description') || 'Comprehensive solutions for large indoor shopping centers with multiple entrances, food courts, and extensive common areas requiring coordinated security.'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img3}
                    alt={t('home.shoppingMall.application2ImageAlt') || "Open-Air Shopping Centers"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.shoppingMall.application2Title') || 'Open-Air Shopping Centers'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.shoppingMall.application2Description') || 'Specialized security for outdoor retail environments with unique perimeter protection needs and weather-resistant surveillance equipment.'}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img4}
                    alt={t('home.shoppingMall.application3ImageAlt') || "Mixed-Use Developments"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.shoppingMall.application3Title') || 'Mixed-Use Developments'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.shoppingMall.application3Description') || 'Integrated solutions for complex spaces combining retail, dining, entertainment, and residential areas with varied security requirements.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12 text-white text-center">
                <h2 className="text-3xl font-bold mb-6">{t('home.shoppingMall.ctaTitle') || 'Secure Your Shopping Mall Today'}</h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  {t('home.shoppingMall.ctaDescription') || 'Let our security experts design a customized shopping mall security solution that addresses your specific challenges and requirements.'}
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link 
                    href="/contact" 
                    className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center"
                  >
                    <FiSend className="mr-2" />
                    {t('home.shoppingMall.ctaButton1') || 'Request a Consultation'}
                  </Link>
                  <Link 
                    href="/products" 
                    className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center"
                  >
                    {t('home.shoppingMall.ctaButton2') || 'Explore Our Products'}
                    <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
    </>
  );
};

export default ShoppingMall;
