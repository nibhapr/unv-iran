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
  FiTruck,
  FiBox,
  FiAlertTriangle,
  FiMap
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import img1 from '../../../public/warehouse/Warehouse banner.webp'
import img2 from '../../../public/warehouse/Distribution Centers.webp'
import img3 from '../../../public/warehouse/Logistics Facilities.webp'
import img4 from '../../../public/warehouse/Cold Storage Facilities.webp'

const Warehouse = () => {
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
            {t('home.warehouse.heroTitle') || 'Uniview Iran Warehouse & Logistics'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">{t('home.warehouse.heroTitleHighlight') || 'Security Solutions'}</span>
          </h1>
          <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
            {t('home.warehouse.heroDescription') || 'Advanced Uniview security camera systems and solutions for warehouses and logistics centers across Iran, designed to protect inventory and optimize operations.'}
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-cyan-100 rounded-full opacity-50 filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full opacity-50 filter blur-3xl"></div>
                <div className="relative z-10 bg-white p-2 rounded-xl shadow-2xl">
                  <div className="rounded-lg overflow-hidden">
                    <Image 
                      src={img1} 
                      alt={t('home.warehouse.overviewImageAlt') || "Warehouse Security"} 
                      width={600} 
                      height={400} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.warehouse.overviewTitle') || 'Securing Warehouse Operations'}</h2>
                <p className="text-gray-700 mb-6">
                  {t('home.warehouse.overviewParagraph1') || 'Iranian warehouses and logistics centers require robust security solutions to protect valuable inventory and ensure smooth operations. As the official distributor of Uniview in Iran, we provide specialized security camera systems tailored to meet these unique challenges.'}
                </p>
                <p className="text-gray-700 mb-6">
                  {t('home.warehouse.overviewParagraph2') || 'Our integrated warehouse security solutions combine Uniview\'s advanced surveillance technology with local expertise and support, providing comprehensive coverage across your entire facility. From loading docks to storage areas, we ensure complete security monitoring.'}
                </p>
                <p className="text-gray-700">
                  {t('home.warehouse.overviewParagraph3') || 'Uniview Iran\'s warehouse security solutions are designed to protect assets, enhance operational efficiency, and provide valuable business intelligence while meeting local regulations and requirements.'}
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.warehouse.featuresTitle') || 'Key Security Features'}</h2>
            <p className="text-xl text-gray-700">
              {t('home.warehouse.featuresSubtitle') || 'Our warehouse security solutions include these essential components to ensure comprehensive protection.'}
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
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-cyan-600 transition-transform hover:scale-105"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6">
                <FiVideo className="text-cyan-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.warehouse.feature1Title') || 'Perimeter Surveillance'}</h3>
              <p className="text-gray-700">
                {t('home.warehouse.feature1Description') || 'Advanced camera systems that monitor facility perimeters with motion detection, thermal imaging, and intrusion alerts to prevent unauthorized access.'}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600 transition-transform hover:scale-105"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <FiBox className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.warehouse.feature2Title') || 'Inventory Monitoring'}</h3>
              <p className="text-gray-700">
                {t('home.warehouse.feature2Description') || 'High-definition cameras with AI analytics to monitor storage areas, track inventory movement, and detect unusual activities around high-value merchandise.'}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600 transition-transform hover:scale-105"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <FiTruck className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.warehouse.feature3Title') || 'Loading Dock Security'}</h3>
              <p className="text-gray-700">
                {t('home.warehouse.feature3Description') || 'Integrated monitoring systems for loading docks with license plate recognition, shipment verification, and synchronized recording during loading/unloading.'}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-cyan-600 transition-transform hover:scale-105"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6">
                <FiUsers className="text-cyan-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.warehouse.feature4Title') || 'Access Control'}</h3>
              <p className="text-gray-700">
                {t('home.warehouse.feature4Description') || 'Multi-tiered access control systems that manage entry to different warehouse zones, track personnel movement, and integrate with time and attendance systems.'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.warehouse.benefitsTitle') || 'Benefits of Uniview Iran\'s Security Solutions'}</h2>
            <p className="text-xl text-gray-700">
              {t('home.warehouse.benefitsSubtitle') || 'Our integrated approach to warehouse security delivers multiple advantages.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex p-6 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-cyan-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.warehouse.benefit1Title') || 'Reduced Shrinkage'}</h3>
                <p className="text-gray-600">
                  {t('home.warehouse.benefit1Description') || 'Minimize inventory loss from theft, misplacement, and damage with comprehensive monitoring and verification systems.'}
                </p>
              </div>
            </div>
            
            <div className="flex p-6 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-cyan-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.warehouse.benefit2Title') || 'Operational Efficiency'}</h3>
                <p className="text-gray-600">
                  {t('home.warehouse.benefit2Description') || 'Gain insights into workflow patterns, identify bottlenecks, and optimize logistical operations through video analytics.'}
                </p>
              </div>
            </div>
            
            <div className="flex p-6 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-cyan-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.warehouse.benefit3Title') || 'Enhanced Safety'}</h3>
                <p className="text-gray-600">
                  {t('home.warehouse.benefit3Description') || 'Monitor compliance with safety protocols, detect hazards, and ensure proper equipment operation to protect workers and assets.'}
                </p>
              </div>
            </div>
            
            <div className="flex p-6 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-cyan-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.warehouse.benefit4Title') || 'Claims Resolution'}</h3>
                <p className="text-gray-600">
                  {t('home.warehouse.benefit4Description') || 'Quickly resolve shipping discrepancies, damage claims, and customer disputes with reliable video evidence of handling and shipping procedures.'}
                </p>
              </div>
            </div>
            
            <div className="flex p-6 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-cyan-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.warehouse.benefit5Title') || 'Compliance Support'}</h3>
                <p className="text-gray-600">
                  {t('home.warehouse.benefit5Description') || 'Meet industry regulations and insurance requirements with documented security measures and comprehensive audit trails.'}
                </p>
              </div>
            </div>
            
            <div className="flex p-6 bg-white rounded-xl shadow-md">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-cyan-600 text-xl" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.warehouse.benefit6Title') || 'Remote Management'}</h3>
                <p className="text-gray-600">
                  {t('home.warehouse.benefit6Description') || 'Monitor multiple facilities from a central location with cloud-based surveillance and management tools for improved oversight.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Applications Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.warehouse.applicationsTitle') || 'Applications'}</h2>
            <p className="text-xl text-gray-700">
              {t('home.warehouse.applicationsSubtitle') || 'Our warehouse security solutions are tailored for various logistics environments.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 relative">
                <Image 
                  src={img2} 
                  alt={t('home.warehouse.application1ImageAlt') || "Distribution Centers"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.warehouse.application1Title') || 'Distribution Centers'}</h3>
                <p className="text-gray-600 mb-4">
                  {t('home.warehouse.application1Description') || 'Comprehensive security for large-scale distribution hubs with high-volume shipping operations and complex inventory management requirements.'}
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 relative">
                <Image 
                  src={img3} 
                  alt={t('home.warehouse.application2ImageAlt') || "Logistics Facilities"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.warehouse.application2Title') || 'Logistics Facilities'}</h3>
                <p className="text-gray-600 mb-4">
                  {t('home.warehouse.application2Description') || 'Integrated security for 3PL and 4PL providers managing complex supply chains with multiple entry points and diverse inventory types.'}
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 relative">
                <Image 
                  src={img4} 
                  alt={t('home.warehouse.application3ImageAlt') || "Cold Storage Facilities"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.warehouse.application3Title') || 'Cold Storage Facilities'}</h3>
                <p className="text-gray-600 mb-4">
                  {t('home.warehouse.application3Description') || 'Specialized security solutions for temperature-controlled environments with monitoring for both security threats and environmental conditions.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">{t('home.warehouse.ctaTitle') || 'Secure Your Warehouse with Uniview Iran'}</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {t('home.warehouse.ctaDescription') || 'Connect with our local security experts to design a customized Uniview surveillance solution for your warehouse or logistics facility.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center"
              >
                <FiSend className="mr-2" />
                {t('home.warehouse.ctaButton1') || 'Request a Consultation'}
              </Link>
              <Link 
                href="/products" 
                className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center"
              >
                {t('home.warehouse.ctaButton2') || 'Explore Our Products'}
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Warehouse;
