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
  FiLock,
  FiGlobe,
  FiMap,
  FiEye
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import img1 from '../../../public/buildings/Securing_What_Matters_Most[1].webp'
import img2 from '../../../public/buildings/res.webp'
import img3 from '../../../public/buildings/commerce.webp'
import img4 from '../../../public/buildings/mixed.webp'
import { useLanguage } from '../../context/LanguageContext';

const Building = () => {
  const { t, dir } = useLanguage();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Uniview Building Security Solutions Iran",
    "description": "Advanced security solutions for commercial and residential buildings in Iran. Comprehensive surveillance systems, access control, and perimeter protection by Uniview.",
    "brand": {
      "@type": "Brand",
      "name": "Uniview Iran"
    },
    "category": "Building Security Systems",
    "keywords": "building security Iran, Uniview building solutions, commercial security systems, residential security Iran",
    "applicationCategory": "Security & Surveillance",
    "audience": {
      "@type": "Audience",
      "audienceType": "Property Managers, Building Owners"
    },
    "image": [
      "https://www.uniview-iran.ir/buildings/Securing_What_Matters_Most[1].webp",
      "https://www.uniview-iran.ir/buildings/commerce.webp"
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
        <title>Building Security Solutions | امنیت ساختمان یونی ویو ایران</title>
        <meta name="description" content="Advanced security solutions for Iranian buildings. Comprehensive surveillance systems, access control, and perimeter protection by Uniview Iran. | راهکارهای پیشرفته امنیتی برای ساختمان‌های ایران" />
        <meta name="keywords" content="building security Iran, Uniview building solutions, commercial security, residential security, access control Iran, CCTV building, دوربین مداربسته ساختمان, سیستم امنیتی ساختمان" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Building Security Solutions by Uniview Iran | راهکارهای امنیتی ساختمان یونی ویو ایران" />
        <meta property="og:description" content="Complete security solutions for Iranian buildings including video surveillance, access control, and perimeter protection systems." />
        <meta property="og:image" content="https://www.uniview-iran.ir/buildings/Securing_What_Matters_Most[1].webp" />
        <meta property="og:url" content="https://www.uniview-iran.ir/building" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Uniview Iran Building Security Solutions" />
        <meta name="twitter:description" content="Advanced security solutions for Iranian commercial and residential buildings" />
        <meta name="twitter:image" content="https://www.uniview-iran.ir/buildings/Securing_What_Matters_Most[1].webp" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English, Persian" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Uniview Iran" />
        <link rel="canonical" href="https://www.uniview-iran.ir/building" />
        
        {/* Structured Data */}
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
              {t('home.building.heroTitle') || 'Uniview Iran'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{t('home.building.heroTitleHighlight') || 'Building Security Solutions'}</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
              {t('home.building.heroDescription') || 'Leading provider of advanced Uniview security camera systems and solutions for buildings across Iran, ensuring comprehensive protection for your property.'}
            </p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-100 rounded-full opacity-50 filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100 rounded-full opacity-50 filter blur-3xl"></div>
                <div className="relative z-10 bg-white p-2 rounded-xl shadow-2xl">
                  <div className="rounded-lg overflow-hidden">
                    <Image 
                      src={img1} 
                      alt={t('home.building.overviewImageAlt') || "Building Security"} 
                      width={600} 
                      height={400} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.building.overviewTitle') || "Your Trusted Uniview Partner in Iran"}</h2>
                <p className="text-gray-700 mb-6">
                  {t('home.building.overviewParagraph1') || "As the authorized distributor of Uniview products in Iran, we provide state-of-the-art security camera solutions that meet the unique requirements of Iranian buildings and businesses. Our expertise in Uniview technology ensures you receive the most reliable and advanced security systems available."}
                </p>
                <p className="text-gray-700 mb-6">
                  {t('home.building.overviewParagraph2') || "We offer complete Uniview surveillance solutions, from high-resolution cameras to sophisticated NVRs and management software, all backed by local technical support and warranty services. Our systems are designed to provide exceptional clarity, reliability, and ease of use."}
                </p>
                <p className="text-gray-700">
                  {t('home.building.overviewParagraph3') || "With Uniview Iran, you get access to the latest innovations in security technology, professional installation services, and ongoing support to ensure your building security system performs optimally at all times."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.building.featuresTitle') || "Key Security Features"}</h2>
              <p className="text-xl text-gray-700">
                {t('home.building.featuresSubtitle') || "Our building security solutions include these essential components to ensure comprehensive protection."}
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
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <FiLock className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.building.feature1Title') || "Perimeter Protection"}</h3>
                <p className="text-gray-700">
                  {t('home.building.feature1Description') || "Secure the boundaries of your property with advanced perimeter sensors, fence detection systems, and smart analytics that detect unauthorized access attempts before they become breaches."}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <FiShield className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.building.feature2Title') || "Access Control Systems"}</h3>
                <p className="text-gray-700">
                  {t('home.building.feature2Description') || "Control who enters your building with sophisticated access control solutions including key card systems, biometric authentication, and mobile credentials for touchless entry."}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <FiVideo className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.building.feature3Title') || "Video Surveillance"}</h3>
                <p className="text-gray-700">
                  {t('home.building.feature3Description') || "Monitor all areas of your property with high-definition cameras featuring advanced analytics, night vision capabilities, and remote viewing options for comprehensive visual security."}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <FiUsers className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.building.feature4Title') || "Visitor Management"}</h3>
                <p className="text-gray-700">
                  {t('home.building.feature4Description') || "Streamline the registration and tracking of visitors with digital check-in systems, temporary access credentials, and automated notifications to enhance security and improve the visitor experience."}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.building.benefitsTitle') || "Benefits of Uniview Iran Security Solutions"}</h2>
              <p className="text-xl text-gray-700">
                {t('home.building.benefitsSubtitle') || "Experience the advantages of partnering with Iran's leading Uniview security provider."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.building.benefit1Title') || "Enhanced Safety"}</h3>
                  <p className="text-gray-600">
                    {t('home.building.benefit1Description') || "Protect occupants and visitors with comprehensive security systems that prevent unauthorized access and quickly respond to potential threats."}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.building.benefit2Title') || "Operational Efficiency"}</h3>
                  <p className="text-gray-600">
                    {t('home.building.benefit2Description') || "Automate security processes to reduce manual workload, streamline operations, and allow your staff to focus on more valuable tasks."}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.building.benefit3Title') || "Property Value"}</h3>
                  <p className="text-gray-600">
                    {t('home.building.benefit3Description') || "Increase the value and attractiveness of your property with advanced security systems that tenants and buyers increasingly expect."}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.building.benefit4Title') || "Remote Management"}</h3>
                  <p className="text-gray-600">
                    {t('home.building.benefit4Description') || "Monitor and control your building security from anywhere with cloud-based solutions offering mobile access and real-time alerts."}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.building.benefit5Title') || "Scalable Solutions"}</h3>
                  <p className="text-gray-600">
                    {t('home.building.benefit5Description') || "Start with essential security components and easily expand your system as your needs grow or as your budget allows."}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.building.benefit6Title') || "Regulatory Compliance"}</h3>
                  <p className="text-gray-600">
                    {t('home.building.benefit6Description') || "Meet industry-specific security requirements and standards with configurable solutions designed for compliance."}
                  </p>
                </div>
              </div>

              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiGlobe className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.building.benefit7Title') || "Local Support"}</h3>
                  <p className="text-gray-600">
                    {t('home.building.benefit7Description') || "Dedicated technical support team in Iran providing rapid response times and expert assistance in your local language."}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.building.applicationsTitle') || "Applications"}</h2>
              <p className="text-xl text-gray-700">
                {t('home.building.applicationsSubtitle') || "Our building security solutions are perfect for a wide range of property types."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img3} 
                    alt={t('home.building.application1ImageAlt') || "Commercial Buildings"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.building.application1Title') || "Commercial Buildings"}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.building.application1Description') || "Comprehensive security for office buildings, corporate headquarters, and business parks, protecting both common areas and restricted zones."}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img2} 
                    alt={t('home.building.application2ImageAlt') || "Residential Complexes"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.building.application2Title') || "Residential Complexes"}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.building.application2Description') || "Tailored security for apartment buildings, condominiums, and gated communities that balances access control with resident convenience."}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img4} 
                    alt={t('home.building.application3ImageAlt') || "Mixed-Use Developments"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.building.application3Title') || "Mixed-Use Developments"}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.building.application3Description') || "Integrated security solutions for buildings combining retail, office, and residential spaces, each with unique security requirements."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">{t('home.building.ctaTitle') || "Secure Your Building with Uniview Iran"}</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                {t('home.building.ctaDescription') || "Contact our team of Uniview security experts to design a customized surveillance solution for your building's specific needs."}
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/contact" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center"
                >
                  <FiSend className="mr-2" />
                  {t('home.building.ctaButton1') || "Request a Consultation"}
                </Link>
                <Link 
                  href="/products" 
                  className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center"
                >
                  {t('home.building.ctaButton2') || "Explore Our Products"}
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
    </>
  );
};

export default Building;
