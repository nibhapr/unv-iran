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
  FiEye,
  FiAlertTriangle,
  FiGlobe
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import img1 from '../../../public/bank/Bank banner.webp'
import img2 from '../../../public/bank/Retail Bank.webp'
import img3 from '../../../public/bank/Credit Unions.webp'
import img4 from '../../../public/bank/Corporate Banking.webp'

const Bank = () => {
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Uniview Bank Security Solutions Iran",
    "description": "Advanced security camera solutions for Iranian banks and financial institutions. Comprehensive surveillance systems, access control, and fraud detection.",
    "brand": {
      "@type": "Brand",
      "name": "Uniview Iran"
    },
    "category": "Security Systems",
    "keywords": "bank security Iran, Uniview bank solutions, banking surveillance, ATM security Iran, vault security systems",
    "applicationCategory": "Security & Surveillance",
    "audience": {
      "@type": "Audience",
      "audienceType": "Financial Institutions"
    },
    "offers": {
      "@type": "AggregateOffer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "IRR",
      "seller": {
        "@type": "Organization",
        "name": "Uniview Iran",
        "url": "https://www.uniview-iran.ir"
      }
    },
    "image": [
      "https://www.uniview-iran.ir/bank/Bank banner.webp",
      "https://www.uniview-iran.ir/bank/Retail Bank.webp"
    ]
  };

  return (
    <>
      <Head>
        <title>Bank Security Solutions | امنیت بانکی یونی ویو ایران</title>
        <meta name="description" content="Advanced security camera solutions for Iranian banks. Comprehensive surveillance systems, access control, and fraud detection by Uniview Iran. | راهکارهای پیشرفته دوربین مداربسته برای بانک‌ها" />
        <meta name="keywords" content="bank security Iran, Uniview bank solutions, banking surveillance, financial security systems, ATM monitoring, vault security, bank CCTV Iran, دوربین مداربسته بانک, سیستم امنیتی بانک" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Bank Security Solutions by Uniview Iran | راهکارهای امنیتی بانکی یونی ویو ایران" />
        <meta property="og:description" content="Complete security solutions for Iranian banks including video surveillance, access control, and fraud detection systems." />
        <meta property="og:image" content="https://www.uniview-iran.ir/bank/Bank banner.webp" />
        <meta property="og:url" content="https://www.uniview-iran.ir/bank" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Uniview Iran Bank Security Solutions" />
        <meta name="twitter:description" content="Advanced security solutions for Iranian banks and financial institutions" />
        <meta name="twitter:image" content="https://www.uniview-iran.ir/bank/Bank banner.webp" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English, Persian" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Uniview Iran" />
        <link rel="canonical" href="https://www.uniview-iran.ir/bank" />
        
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
              {t('home.bank.heroTitle') || 'Uniview Iran'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{t('home.bank.heroTitleHighlight') || 'Banking Security Solutions'}</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
              {t('home.bank.heroDescription') || 'Advanced security camera solutions for Iranian financial institutions, providing comprehensive surveillance and protection for assets, staff, and customers.'}
            </p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-100 rounded-full opacity-50 filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100 rounded-full opacity-50 filter blur-3xl"></div>
                <div className="relative z-10 bg-white p-2 rounded-xl shadow-2xl">
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={img1}
                      alt={t('home.bank.overviewImageAlt') || "Bank Security"}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.bank.overviewTitle') || 'Trusted Banking Security Solutions in Iran'}</h2>
                <p className="text-gray-700 mb-6">
                  {t('home.bank.overviewParagraph1') || "As Iran's leading provider of security solutions, Uniview Iran understands the unique challenges faced by local banking institutions. Our advanced surveillance systems are designed to meet the specific security requirements of Iranian banks while ensuring compliance with local regulations."}
                </p>
                <p className="text-gray-700 mb-6">
                  {t('home.bank.overviewParagraph2') || "Our integrated security camera systems combine cutting-edge Uniview technology with professional installation and support, delivering complete surveillance coverage across your banking facilities. From ATM monitoring to vault security, our solutions provide comprehensive protection tailored to Iranian banking standards."}
                </p>
                <p className="text-gray-700">
                  {t('home.bank.overviewParagraph3') || "Uniview Iran's banking security solutions are scalable and cost-effective, with local technical support and warranty coverage to ensure long-term reliability and peace of mind."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.bank.featuresTitle') || "Key Features of Uniview Iran's Banking Solutions"}</h2>
              <p className="text-xl text-gray-700">
                {t('home.bank.featuresSubtitle') || "Our specialized security camera systems include these essential components for Iranian banks."}
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
                  <FiVideo className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.bank.feature1Title') || "Video Surveillance"}</h3>
                <p className="text-gray-700">
                  {t('home.bank.feature1Description') || "High-definition cameras with facial recognition capabilities to monitor all areas of your banking facility, cash handling areas, ATMs, and safe deposit vaults."}
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <FiLock className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.bank.feature2Title') || "Access Control"}</h3>
                <p className="text-gray-700">
                  {t('home.bank.feature2Description') || "Multi-factor authentication systems for secure access to restricted areas, vaults, and after-hours entry, with complete audit trails and real-time monitoring."}
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <FiAlertTriangle className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.bank.feature3Title') || "Intrusion Detection"}</h3>
                <p className="text-gray-700">
                  {t('home.bank.feature3Description') || "Advanced alarm systems with immediate notification capabilities, integrated with glass-break sensors, motion detectors, and panic buttons for comprehensive protection."}
                </p>
              </motion.div>

              <motion.div
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <FiEye className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.bank.feature4Title') || "Fraud Detection"}</h3>
                <p className="text-gray-700">
                  {t('home.bank.feature4Description') || "AI-powered video analytics for unusual activity detection, real-time alert systems for theft prevention, and transaction monitoring at teller stations and ATMs."}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.bank.benefitsTitle') || "Benefits of Uniview Iran Banking Security"}</h2>
              <p className="text-xl text-gray-700">
                {t('home.bank.benefitsSubtitle') || "Partner with Iran's trusted security solutions provider for comprehensive protection."}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.bank.benefit1Title') || "Regulatory Compliance"}</h3>
                  <p className="text-gray-600">
                    {t('home.bank.benefit1Description') || "Meet financial industry security standards and regulations with documented audit trails and comprehensive security measures."}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.bank.benefit2Title') || "Asset Protection"}</h3>
                  <p className="text-gray-600">
                    {t('home.bank.benefit2Description') || "Safeguard physical currency, safety deposit boxes, and critical financial documents from theft, fraud, and unauthorized access."}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.bank.benefit3Title') || "Customer Confidence"}</h3>
                  <p className="text-gray-600">
                    {t('home.bank.benefit3Description') || "Build trust with clients by demonstrating a commitment to security and ensuring their personal information and assets are protected."}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.bank.benefit4Title') || "Operational Efficiency"}</h3>
                  <p className="text-gray-600">
                    {t('home.bank.benefit4Description') || "Streamline security operations with integrated systems that work together seamlessly, reducing manual monitoring and response times."}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.bank.benefit5Title') || "Incident Prevention"}</h3>
                  <p className="text-gray-600">
                    {t('home.bank.benefit5Description') || "Proactively identify security threats before they materialize with AI-powered analytics and real-time monitoring capabilities."}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.bank.benefit6Title') || "Evidence Collection"}</h3>
                  <p className="text-gray-600">
                    {t('home.bank.benefit6Description') || "Capture high-quality video evidence for investigations and provide irrefutable documentation for law enforcement when necessary."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.bank.applicationsTitle') || "Applications"}</h2>
              <p className="text-xl text-gray-700">
                {t('home.bank.applicationsSubtitle') || "Our banking security solutions are perfect for a wide range of financial institutions."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image
                    src={img2}
                    alt={t('home.bank.application1ImageAlt') || "Retail Banking"}
                    fill
                    className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.bank.application1Title') || "Retail Banking"}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.bank.application1Description') || "Comprehensive security for branch locations including lobby areas, teller stations, ATMs, and night deposit boxes."}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image
                    src={img3}
                    alt={t('home.bank.application2ImageAlt') || "Credit Unions"}
                    fill
                    className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.bank.application2Title') || "Credit Unions"}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.bank.application2Description') || "Tailored security systems for smaller financial institutions that balance robust protection with operational simplicity."}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image
                    src={img4}
                    alt={t('home.bank.application3ImageAlt') || "Corporate Banking"}
                    fill
                    className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.bank.application3Title') || "Corporate Banking"}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.bank.application3Description') || "Enterprise-grade security solutions for corporate headquarters, trading floors, and data centers with advanced access control."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">{t('home.bank.ctaTitle') || "Secure Your Bank with Uniview Iran"}</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                {t('home.bank.ctaDescription') || "Contact our local security experts to design a customized surveillance solution for your banking institution, with professional installation and ongoing support."}
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center"
                >
                  <FiSend className="mr-2" />
                  {t('home.bank.ctaButton1') || "Request a Free Consultation"}
                </Link>
                <Link
                  href="/products"
                  className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center"
                >
                  {t('home.bank.ctaButton2') || "View Our Products"}
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div></>
    );
};

export default Bank;
