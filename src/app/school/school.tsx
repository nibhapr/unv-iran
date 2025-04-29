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
  FiRadio
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import img1 from '../../../public/school/School banner.webp'
import img2 from '../../../public/school/K-12 Schools.webp'
import img3 from '../../../public/school/College Campuses.webp'
import img4 from '../../../public/school/trining.webp'

const School = () => {
  const { t, dir } = useLanguage();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Uniview School Security Solutions Iran",
    "description": "Advanced security camera systems and surveillance solutions for Iranian educational institutions. Complete security systems including access control, emergency response, and student safety monitoring.",
    "brand": {
      "@type": "Brand",
      "name": "Uniview Iran",
      "url": "https://www.uniview-iran.ir"
    },
    "category": "Security Systems",
    "keywords": "school security Iran, educational surveillance, school CCTV, دوربین مداربسته مدرسه, سیستم امنیتی دانشگاه, نظارت تصویری مدارس",
    "applicationCategory": "Security & Surveillance",
    "audience": {
      "@type": "Audience",
      "audienceType": "Educational Institutions"
    },
    "image": [
      "https://www.uniview-iran.ir/school/School%20banner.webp",
      "https://www.uniview-iran.ir/school/K-12%20Schools.webp",
      "https://www.uniview-iran.ir/school/College%20Campuses.webp"
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
              {t('home.school.heroTitle') || 'Uniview Iran School Security'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">{t('home.school.heroTitleHighlight') || 'Camera Solutions'}</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
              {t('home.school.heroDescription') || 'Advanced surveillance and monitoring systems designed specifically for Iranian educational institutions, providing comprehensive security for students, staff, and facilities.'}
            </p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-100 rounded-full opacity-50 filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-100 rounded-full opacity-50 filter blur-3xl"></div>
                <div className="relative z-10 bg-white p-2 rounded-xl shadow-2xl">
                  <div className="rounded-lg overflow-hidden">
                    <Image 
                      src={img1} 
                      alt={t('home.school.overviewImageAlt') || "School Security"} 
                      width={600} 
                      height={400} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.school.overviewTitle') || 'Protecting Iranian Educational Communities'}</h2>
                <p className="text-gray-700 mb-6">
                  {t('home.school.overviewParagraph1') || "As Iran's leading provider of security solutions, Uniview Iran delivers specialized surveillance systems designed specifically for educational environments, from primary schools to universities across the country."}
                </p>
                <p className="text-gray-700 mb-6">
                  {t('home.school.overviewParagraph2') || "Our state-of-the-art camera systems combine advanced technology with user-friendly interfaces, providing comprehensive monitoring while remaining discreet within the learning environment. From high-resolution cameras to intelligent video analytics, our solutions create a robust security infrastructure that helps prevent incidents and enables quick response when needed."}
                </p>
                <p className="text-gray-700">
                  {t('home.school.overviewParagraph3') || "Uniview Iran's school security solutions are developed with local expertise, compliant with Iranian regulations, and engineered to meet the specific security needs of educational institutions throughout Iran."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.school.featuresTitle') || 'Essential Security Features'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.school.featuresSubtitle') || 'Our comprehensive school security solutions include these vital components to ensure campus safety.'}
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
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.school.feature1Title') || 'Advanced Surveillance'}</h3>
                <p className="text-gray-700">
                  {t('home.school.feature1Description') || 'High-definition Uniview cameras with night vision capabilities, covering all critical areas including entrances, corridors, classrooms, and outdoor spaces.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <FiLock className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.school.feature2Title') || 'Access Control'}</h3>
                <p className="text-gray-700">
                  {t('home.school.feature2Description') || 'Secure entry systems with card readers, biometric options, and visitor management to ensure only authorized individuals can enter school buildings.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <FiAlertTriangle className="text-orange-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.school.feature3Title') || 'Emergency Response'}</h3>
                <p className="text-gray-700">
                  {t('home.school.feature3Description') || 'Integrated emergency notification systems, panic buttons, and lockdown capabilities that can be activated instantly during critical situations.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <FiRadio className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.school.feature4Title') || 'Communication Systems'}</h3>
                <p className="text-gray-700">
                  {t('home.school.feature4Description') || 'Two-way intercom, mass notification, and emergency communication tools that connect classrooms, administration, and security personnel.'}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.school.benefitsTitle') || 'Benefits of Uniview Iran School Security'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.school.benefitsSubtitle') || 'Our specialized camera solutions provide comprehensive security advantages for Iranian educational institutions.'}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.school.benefit1Title') || 'Enhanced Student Safety'}</h3>
                  <p className="text-gray-600">
                    {t('home.school.benefit1Description') || 'Create a secure learning environment where students can focus on education without safety concerns.'}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.school.benefit2Title') || 'Incident Prevention'}</h3>
                  <p className="text-gray-600">
                    {t('home.school.benefit2Description') || 'Proactive security measures that deter unwanted behavior and help prevent security breaches before they occur.'}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.school.benefit3Title') || 'Quick Emergency Response'}</h3>
                  <p className="text-gray-600">
                    {t('home.school.benefit3Description') || 'Integrated systems that enable immediate action during emergencies, potentially saving lives in critical situations.'}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.school.benefit4Title') || 'Parental Peace of Mind'}</h3>
                  <p className="text-gray-600">
                    {t('home.school.benefit4Description') || 'Reassure parents that their children are in a safe, well-protected environment with professional security measures.'}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.school.benefit5Title') || 'Behavioral Insights'}</h3>
                  <p className="text-gray-600">
                    {t('home.school.benefit5Description') || 'Analytics that provide valuable data about traffic patterns, gathering spots, and potential security concerns.'}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.school.benefit6Title') || 'Resource Optimization'}</h3>
                  <p className="text-gray-600">
                    {t('home.school.benefit6Description') || 'Allow security staff to monitor more areas efficiently, making the most of limited security resources.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.school.applicationsTitle') || 'Educational Security Applications'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.school.applicationsSubtitle') || 'Our school security solutions are tailored for various educational environments.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img2}
                    alt={t('home.school.application1ImageAlt') || "K-12 Schools Security"} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.school.application1Title') || 'K-12 Schools'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.school.application1Description') || 'Age-appropriate security measures for elementary, middle, and high schools that protect students while maintaining a positive learning atmosphere.'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img3}
                    alt={t('home.school.application2ImageAlt') || "College Campus Security"} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.school.application2Title') || 'College Campuses'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.school.application2Description') || 'Comprehensive security systems for sprawling university settings with dormitories, academic buildings, and open public spaces.'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img4}
                    alt={t('home.school.application3ImageAlt') || "Special Education Facilities Security"} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.school.application3Title') || 'Educational Training Centers'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.school.application3Description') || 'Advanced security solutions for training centers and educational institutes, ensuring safety while maintaining an open and accessible learning environment.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">{t('home.school.ctaTitle') || 'Secure Your Educational Institution with Uniview Iran'}</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                {t('home.school.ctaDescription') || "Connect with our local security experts to design a customized camera solution that meets your school's specific requirements and budget."}
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/contact" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center"
                >
                  <FiSend className="mr-2" />
                  {t('home.school.ctaButton1') || 'Request a Consultation'}
                </Link>
                <Link 
                  href="/products" 
                  className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center"
                >
                  {t('home.school.ctaButton2') || 'Explore Our Products'}
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
}

export default School;
