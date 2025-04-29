"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FiShield, 
  FiVideo, 
  FiUsers, 
  FiCheckCircle, 
  FiArrowRight, 
  FiSend,
  FiBarChart,
  FiEye,
  FiDollarSign,
  FiLayers
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import img1 from '../../../public/retail/Protecting Your Retail Business.webp'
import img2 from '../../../public/retail/Fashion Retail.webp'
import img3 from '../../../public/retail/Electronics Stores.webp'
import img4 from '../../../public/retail/Supermarkets & Groceries.webp'
import { useLanguage } from '../../context/LanguageContext';

const Retail = () => {
  const { t, dir } = useLanguage();
  
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
    <div className="min-h-screen bg-white pt-24" dir={dir}>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('home.retail.heroTitle') || 'Uniview Iran'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">{t('home.retail.heroTitleHighlight') || 'Retail Security Solutions'}</span>
          </h1>
          <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
            {t('home.retail.heroDescription') || 'Advanced surveillance and security solutions from Uniview Iran, designed to protect your retail business, prevent losses, and optimize store operations across Iran.'}
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-purple-100 rounded-full opacity-50 filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full opacity-50 filter blur-3xl"></div>
                <div className="relative z-10 bg-white p-2 rounded-xl shadow-2xl">
                  <div className="rounded-lg overflow-hidden">
                    <Image 
                      src={img1} 
                      alt={t('home.retail.overviewImageAlt') || "Retail Security"} 
                      width={600} 
                      height={400} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.retail.overviewTitle') || 'Protecting Your Retail Business in Iran'}</h2>
                <p className="text-gray-700 mb-6">
                  {t('home.retail.overviewParagraph1') || "As Iran's leading provider of Uniview security solutions, we understand the unique challenges faced by retail businesses across the country. Our comprehensive security systems help protect your assets, reduce theft, and improve operational efficiency."}
                </p>
                <p className="text-gray-700 mb-6">
                  {t('home.retail.overviewParagraph2') || "Uniview Iran offers state-of-the-art surveillance technology combined with intelligent analytics, providing valuable insights into store operations while ensuring maximum security. Our solutions are perfect for businesses of all sizes, from local shops to major retail chains throughout Iran."}
                </p>
                <p className="text-gray-700">
                  {t('home.retail.overviewParagraph3') || "As the official distributor of Uniview products in Iran, we provide full technical support, warranty services, and professional installation to ensure your security system performs optimally."}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.retail.featuresTitle') || 'Key Security Features'}</h2>
            <p className="text-xl text-gray-700">
              {t('home.retail.featuresSubtitle') || 'Our retail security solutions include these essential components to ensure comprehensive protection.'}
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
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-600 transition-transform hover:scale-105"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <FiShield className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.retail.feature1Title') || 'Theft Prevention'}</h3>
              <p className="text-gray-700">
                {t('home.retail.feature1Description') || 'Advanced surveillance systems and anti-theft solutions that help detect and deter shoplifting, employee theft, and organized retail crime before they impact your bottom line.'}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600 transition-transform hover:scale-105"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <FiBarChart className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.retail.feature2Title') || 'Customer Flow Analysis'}</h3>
              <p className="text-gray-700">
                {t('home.retail.feature2Description') || 'Leverage AI-powered analytics to understand customer movement patterns, identify high-traffic areas, optimize store layouts, and improve the overall shopping experience.'}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600 transition-transform hover:scale-105"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <FiDollarSign className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.retail.feature3Title') || 'POS Integration'}</h3>
              <p className="text-gray-700">
                {t('home.retail.feature3Description') || 'Seamlessly integrate security cameras with your point-of-sale systems to correlate transaction data with video footage, helping identify suspicious transactions and prevent fraud.'}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-600 transition-transform hover:scale-105"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <FiLayers className="text-orange-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.retail.feature4Title') || 'Inventory Tracking'}</h3>
              <p className="text-gray-700">
                {t('home.retail.feature4Description') || 'Monitor merchandise movement, automate inventory checks, and receive alerts for potential stockouts or irregularities, reducing losses and improving inventory management.'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.retail.benefitsTitle') || 'Benefits of Uniview Retail Security'}</h2>
            <p className="text-xl text-gray-700">
              {t('home.retail.benefitsSubtitle') || 'Our integrated approach to retail security delivers multiple advantages.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex p-6 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-purple-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.retail.benefit1Title') || 'Reduced Shrinkage'}</h3>
                <p className="text-gray-600">
                  {t('home.retail.benefit1Description') || 'Minimize losses from theft, fraud, and administrative errors with comprehensive monitoring and prevention systems.'}
                </p>
              </div>
            </div>
            
            <div className="flex p-6 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-purple-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.retail.benefit2Title') || 'Business Intelligence'}</h3>
                <p className="text-gray-600">
                  {t('home.retail.benefit2Description') || 'Gain valuable insights into customer behavior, store performance, and operational efficiency to make data-driven decisions.'}
                </p>
              </div>
            </div>
            
            <div className="flex p-6 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-purple-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.retail.benefit3Title') || 'Staff Optimization'}</h3>
                <p className="text-gray-600">
                  {t('home.retail.benefit3Description') || 'Deploy your team more effectively based on customer traffic patterns and peak shopping times.'}
                </p>
              </div>
            </div>
            
            <div className="flex p-6 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-purple-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.retail.benefit4Title') || 'Enhanced Customer Experience'}</h3>
                <p className="text-gray-600">
                  {t('home.retail.benefit4Description') || 'Create a safer shopping environment while gathering insights to improve store layouts and customer service.'}
                </p>
              </div>
            </div>
            
            <div className="flex p-6 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-purple-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.retail.benefit5Title') || 'Remote Management'}</h3>
                <p className="text-gray-600">
                  {t('home.retail.benefit5Description') || 'Monitor multiple store locations from anywhere with cloud-based solutions offering mobile access and real-time alerts.'}
                </p>
              </div>
            </div>
            
            <div className="flex p-6 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-purple-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.retail.benefit6Title') || 'Liability Protection'}</h3>
                <p className="text-gray-600">
                  {t('home.retail.benefit6Description') || 'Maintain video evidence of incidents to protect against false claims and support insurance requirements.'}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.retail.applicationsTitle') || 'Applications'}</h2>
            <p className="text-xl text-gray-700">
              {t('home.retail.applicationsSubtitle') || 'Our retail security solutions are perfect for a wide range of retail environments.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 relative">
                <Image 
                  src={img2} 
                  alt={t('home.retail.application1ImageAlt') || "Fashion Retail Security"} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.retail.application1Title') || 'Fashion Retail'}</h3>
                <p className="text-gray-600 mb-4">
                  {t('home.retail.application1Description') || 'Specialized solutions for clothing stores to prevent theft, monitor fitting rooms, and analyze shopper behavior while maintaining a premium shopping experience.'}
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 relative">
                <Image 
                  src={img3} 
                  alt={t('home.retail.application2ImageAlt') || "Electronics Store Security"} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.retail.application2Title') || 'Electronics Stores'}</h3>
                <p className="text-gray-600 mb-4">
                  {t('home.retail.application2Description') || 'High-value merchandise protection with advanced surveillance, secure product displays, and customer service optimization for technology retailers.'}
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 relative">
                <Image 
                  src={img4} 
                  alt={t('home.retail.application3ImageAlt') || "Supermarket Security"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.retail.application3Title') || 'Supermarkets & Groceries'}</h3>
                <p className="text-gray-600 mb-4">
                  {t('home.retail.application3Description') || 'Comprehensive solutions for grocery chains with checkout monitoring, cold storage supervision, and crowd management during peak shopping periods.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">{t('home.retail.ctaTitle') || 'Secure Your Retail Business with Uniview Iran'}</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {t('home.retail.ctaDescription') || 'Contact our local experts today for a personalized security solution tailored to your retail business needs in Iran.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/contact" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center"
              >
                <FiSend className="mr-2" />
                {t('home.retail.ctaButton1') || 'Request a Consultation'}
              </Link>
              <Link 
                href="/products" 
                className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center"
              >
                {t('home.retail.ctaButton2') || 'Explore Our Products'}
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Retail;