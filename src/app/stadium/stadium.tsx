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
  FiAlertTriangle,
  FiRadio,
  FiLayers
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import img1 from '../../../public/stadium/Stadium Security Banner.webp'
import img2 from '../../../public/stadium/Sports Stadiums.webp'
import img3 from '../../../public/stadium/Concert Venues.webp'
import img4 from '../../../public/stadium/multi purpose .webp'

const Stadium = () => {
  const { t, dir } = useLanguage();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Uniview Stadium Security Solutions Iran",
    "description": "Advanced stadium security systems and surveillance solutions for Iranian sports venues, concert halls, and multi-purpose arenas. Complete security solutions including crowd management, access control, and incident detection.",
    "brand": {
      "@type": "Brand",
      "name": "Uniview Iran",
      "url": "https://www.uniview-iran.ir"
    },
    "offers": {
      "@type": "AggregateOffer",
      "availability": "https://schema.org/InStock"
    }
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
              {t('home.stadium.heroTitle') || 'Uniview Iran'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">{t('home.stadium.heroTitleHighlight') || 'Stadium Security Solutions'}</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
              {t('home.stadium.heroDescription') || 'Advanced Uniview security camera systems tailored for Iranian stadiums, providing comprehensive surveillance and crowd management solutions.'}
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
                    alt={t('home.stadium.overviewImageAlt') || "Stadium security systems by Uniview"} 
                    fill
                    className="object-cover rounded-xl shadow-xl"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.stadium.overviewTitle') || 'Stadium Security Excellence in Iran'}</h2>
                  <p className="text-gray-700 mb-6">
                    {t('home.stadium.overviewParagraph1') || "As the official distributor of Uniview products in Iran, we specialize in implementing cutting-edge security camera solutions for stadiums across the country, addressing the unique requirements of Iranian sports venues."}
                  </p>
                  <p className="text-gray-700 mb-6">
                    {t('home.stadium.overviewParagraph2') || "Our integrated stadium security systems feature Uniview's latest surveillance technology, providing crystal-clear monitoring capabilities and intelligent crowd management tools that meet local regulations and international standards."}
                  </p>
                  <p className="text-gray-700">
                    {t('home.stadium.overviewParagraph3') || "With extensive experience in the Iranian market, our solutions are specifically designed to handle the demands of major sporting events, from local league matches to international tournaments hosted in Iran's premier venues."}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.stadium.featuresTitle') || 'Essential Security Features'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.stadium.featuresSubtitle') || 'Our comprehensive stadium security solutions include these vital components to ensure venue safety.'}
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
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <FiUsers className="text-orange-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.stadium.feature1Title') || 'Crowd Management'}</h3>
                <p className="text-gray-700">
                  {t('home.stadium.feature1Description') || 'Advanced analytics for crowd density monitoring, flow optimization, and automatic alerts when overcrowding is detected in specific sections or entry points.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <FiVideo className="text-orange-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.stadium.feature2Title') || 'High-Definition Surveillance'}</h3>
                <p className="text-gray-700">
                  {t('home.stadium.feature2Description') || 'Ultra-HD cameras with wide viewing angles, powerful zoom capabilities, and low-light performance to monitor all areas of the venue with exceptional clarity.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <FiShield className="text-orange-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.stadium.feature3Title') || 'Access Control'}</h3>
                <p className="text-gray-700">
                  {t('home.stadium.feature3Description') || 'Multi-level access systems for different stadium zones, including ticketing integration, staff credentials, and VIP area restrictions with real-time validation.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <FiAlertTriangle className="text-orange-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.stadium.feature4Title') || 'Incident Detection'}</h3>
                <p className="text-gray-700">
                  {t('home.stadium.feature4Description') || 'AI-powered analytics that identify potential security threats, unauthorized access attempts, unusual behavior patterns, and emergency situations in real-time.'}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.stadium.benefitsTitle') || 'Benefits of Uniview Stadium Security'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.stadium.benefitsSubtitle') || 'Our integrated approach to stadium security delivers multiple advantages for venue operators.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-orange-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.stadium.benefit1Title') || 'Enhanced Spectator Safety'}</h3>
                  <p className="text-gray-600">
                    {t('home.stadium.benefit1Description') || 'Create a secure environment where fans can enjoy events with peace of mind, knowing comprehensive security measures are in place.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-orange-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.stadium.benefit2Title') || 'Rapid Incident Response'}</h3>
                  <p className="text-gray-600">
                    {t('home.stadium.benefit2Description') || 'Minimize response times to security incidents with real-time alerts, centralized monitoring, and coordinated security team deployment.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-orange-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.stadium.benefit3Title') || 'Operational Efficiency'}</h3>
                  <p className="text-gray-600">
                    {t('home.stadium.benefit3Description') || 'Optimize staff deployment, entrance flow, and crowd management based on real-time data and historical analytics.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-orange-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.stadium.benefit4Title') || 'Risk Mitigation'}</h3>
                  <p className="text-gray-600">
                    {t('home.stadium.benefit4Description') || 'Reduce liability and insurance costs with documented security measures and comprehensive incident prevention strategies.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-orange-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.stadium.benefit5Title') || 'Brand Protection'}</h3>
                  <p className="text-gray-600">
                    {t('home.stadium.benefit5Description') || 'Maintain and enhance venue reputation by ensuring consistently safe, secure, and enjoyable experiences for all attendees.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-orange-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.stadium.benefit6Title') || 'Regulatory Compliance'}</h3>
                  <p className="text-gray-600">
                    {t('home.stadium.benefit6Description') || 'Meet or exceed safety standards and regulations for large public venues with comprehensive security infrastructure.'}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.stadium.applicationsTitle') || 'Stadium Security Applications'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.stadium.applicationsSubtitle') || 'Our solutions are tailored for various large venue environments.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img2} 
                    alt={t('home.stadium.application1ImageAlt') || "Sports Stadiums"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.stadium.application1Title') || 'Sports Stadiums'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.stadium.application1Description') || 'Comprehensive security for football, baseball, soccer, and multi-purpose sports venues with large capacities and regular event schedules.'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img3} 
                    alt={t('home.stadium.application2ImageAlt') || "Concert Venues"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.stadium.application2Title') || 'Concert Venues'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.stadium.application2Description') || 'Tailored security solutions for indoor and outdoor performance spaces with flexible configurations and varying attendance levels.'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img4} 
                    alt={t('home.stadium.application3ImageAlt') || "Multi-Purpose Arenas"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.stadium.application3Title') || 'Multi-Purpose Arenas'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.stadium.application3Description') || 'Adaptable security infrastructure for venues that host various event types from sporting competitions to conventions and exhibitions.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.stadium.ctaTitle') || "Upgrade Your Stadium's Security with Uniview Iran"}</h2>
              <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
                {t('home.stadium.ctaDescription') || "Contact our local experts to discuss how Uniview's security solutions can be customized for your Iranian venue."}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center transition-colors">
                  <span>{t('home.stadium.ctaButton1') || 'Schedule a Consultation'}</span>
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link href="/solutions" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-medium flex items-center justify-center transition-colors">
                  <span>{t('home.stadium.ctaButton2') || 'Explore More Solutions'}</span>
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

export default Stadium;
