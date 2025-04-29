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
  FiKey
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import img1 from '../../../public/hotel/Leading Hotel Security banner.webp'
import img2 from '../../../public/hotel/Why Choose Uniview Iran banner.webp'
import img3 from '../../../public/hotel/Luxury Hotels.webp'
import img4 from '../../../public/hotel/Resort Properties.webp'
import img5 from '../../../public/hotel/Business Hotels.webp'


const Hotel = () => {
  const { t, dir } = useLanguage();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Structured data for rich results
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Uniview Hotel Security Solutions Iran",
    "description": "Advanced security camera systems and surveillance solutions for Iranian hotels. Complete security systems including access control, perimeter security, and visitor management.",
    "brand": {
      "@type": "Brand",
      "name": "Uniview Iran",
      "url": "https://www.uniview-iran.ir"
    },
    "category": "Security Systems",
    "keywords": "hotel security Iran, hotel surveillance, access control hotels, CCTV hotel, دوربین مداربسته هتل, سیستم امنیتی هتل",
    "applicationCategory": "Security & Surveillance",
    "audience": {
      "@type": "Audience",
      "audienceType": "Hotels & Resorts"
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
      "https://www.uniview-iran.ir/hotel/Leading%20Hotel%20Security%20banner.webp",
      "https://www.uniview-iran.ir/hotel/Luxury%20Hotels.webp",
      "https://www.uniview-iran.ir/hotel/Resort%20Properties.webp"
    ]
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
              {t('home.hotel.heroTitle') || 'Uniview Iran'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-600">{t('home.hotel.heroTitleHighlight') || 'Hotel Security Solutions'}</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
              {t('home.hotel.heroDescription') || 'Advanced security camera systems and surveillance solutions tailored for Iranian hotels, ensuring guest safety and property protection.'}
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
                    alt={t('home.hotel.overviewImageAlt') || "Hotel Security"}
                    fill
                    className="object-cover rounded-xl shadow-xl"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.hotel.overviewTitle') || 'Leading Hotel Security Solutions in Iran'}</h2>
                  <p className="text-gray-700 mb-6">
                    {t('home.hotel.overviewParagraph1') || 'As the official distributor of Uniview products in Iran, we provide cutting-edge security camera solutions specifically designed for the hospitality industry. Our systems cater to hotels, resorts, and accommodation venues across Iran.'}
                  </p>
                  <p className="text-gray-700 mb-6">
                    {t('home.hotel.overviewParagraph2') || 'Our comprehensive security solutions combine Uniview\'s advanced technology with local expertise, offering seamless integration and support. From lobby surveillance to perimeter monitoring, we ensure complete coverage while maintaining the welcoming atmosphere guests expect.'}
                  </p>
                  <p className="text-gray-700">
                    {t('home.hotel.overviewParagraph3') || 'Backed by Uniview\'s global expertise and our local support team, we deliver reliable, scalable, and future-proof security solutions that meet the unique requirements of Iranian hotels.'}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.hotel.featuresTitle') || 'Essential Security Features'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.hotel.featuresSubtitle') || 'Our comprehensive hotel security solutions include these vital components to ensure property and guest safety.'}
              </p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <FiVideo className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.hotel.feature1Title') || 'Surveillance Systems'}</h3>
                <p className="text-gray-700">
                  {t('home.hotel.feature1Description') || 'High-definition cameras with discreet placement throughout public areas, entrances, corridors, and exterior spaces with intelligent analytics to detect unusual activities.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <FiKey className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.hotel.feature2Title') || 'Access Control'}</h3>
                <p className="text-gray-700">
                  {t('home.hotel.feature2Description') || 'Advanced electronic key systems, RFID technology, and mobile credentials that enhance guest convenience while maintaining strict security protocols for guest rooms and restricted areas.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <FiLock className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.hotel.feature3Title') || 'Perimeter Security'}</h3>
                <p className="text-gray-700">
                  {t('home.hotel.feature3Description') || 'Comprehensive protection for property boundaries with automated lighting, motion detection, and integrated alarm systems that prevent unauthorized access while maintaining aesthetic appeal.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                  <FiUsers className="text-amber-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.hotel.feature4Title') || 'Visitor Management'}</h3>
                <p className="text-gray-700">
                  {t('home.hotel.feature4Description') || 'Digital visitor tracking and verification systems that streamline check-in processes while screening for potential security concerns and managing high-traffic periods efficiently.'}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
  
        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-amber-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.hotel.benefitsTitle') || 'Benefits of Uniview Iran Hotel Security'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.hotel.benefitsSubtitle') || 'Partner with Iran\'s leading provider of Uniview security solutions for your hospitality venue.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-amber-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.hotel.benefit1Title') || 'Enhanced Guest Experience'}</h3>
                  <p className="text-gray-600">
                    {t('home.hotel.benefit1Description') || 'Create a secure environment where guests feel protected without intrusive security measures, improving satisfaction and loyalty.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-amber-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.hotel.benefit2Title') || 'Asset Protection'}</h3>
                  <p className="text-gray-600">
                    {t('home.hotel.benefit2Description') || 'Safeguard valuable property assets, including furnishings, artwork, and equipment against theft, vandalism, and unauthorized use.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-amber-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.hotel.benefit3Title') || 'Staff Safety'}</h3>
                  <p className="text-gray-600">
                    {t('home.hotel.benefit3Description') || 'Protect employees with panic buttons, monitored areas, and safety protocols, particularly for those working night shifts or in isolated areas.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-amber-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.hotel.benefit4Title') || 'Operational Efficiency'}</h3>
                  <p className="text-gray-600">
                    {t('home.hotel.benefit4Description') || 'Streamline check-in/check-out procedures, key management, and room access, reducing administrative overhead and improving service delivery.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-amber-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.hotel.benefit5Title') || 'Liability Reduction'}</h3>
                  <p className="text-gray-600">
                    {t('home.hotel.benefit5Description') || 'Minimize legal and financial risks with comprehensive monitoring, incident documentation, and proactive threat detection.'}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-amber-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.hotel.benefit6Title') || 'Brand Protection'}</h3>
                  <p className="text-gray-600">
                    {t('home.hotel.benefit6Description') || 'Maintain and enhance your hotel\'s reputation by demonstrating commitment to guest safety and security.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Advanced Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.hotel.whyChooseTitle') || 'Why Choose Uniview Iran'}</h2>
                  <p className="text-gray-700 mb-6">
                    {t('home.hotel.whyChooseDescription') || 'As the authorized Uniview distributor in Iran, we offer distinct advantages for your hotel security needs:'}
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                          <FiAlertTriangle className="text-amber-600 text-sm" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-lg font-semibold text-gray-800">{t('home.hotel.advantage1Title') || 'Local Expertise & Support'}</h4>
                        <p className="text-gray-600">{t('home.hotel.advantage1Description') || 'Direct access to trained technicians and support staff in Iran, ensuring quick response times and efficient system maintenance.'}</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                          <FiEye className="text-amber-600 text-sm" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-lg font-semibold text-gray-800">{t('home.hotel.advantage2Title') || 'Genuine Uniview Products'}</h4>
                        <p className="text-gray-600">{t('home.hotel.advantage2Description') || 'Access to authentic Uniview security cameras and equipment with full warranty and after-sales support within Iran.'}</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                          <FiShield className="text-amber-600 text-sm" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-lg font-semibold text-gray-800">{t('home.hotel.advantage3Title') || 'Customized Solutions'}</h4>
                        <p className="text-gray-600">{t('home.hotel.advantage3Description') || 'Tailored security systems designed specifically for Iranian hotel properties, with consideration for local requirements and regulations.'}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-xl">
                  <Image 
                    src={img2}
                    alt={t('home.hotel.advancedFeaturesImageAlt') || "Advanced Hotel Security Technologies"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Applications Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-amber-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.hotel.applicationsTitle') || 'Hospitality Security Applications'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.hotel.applicationsSubtitle') || 'Our hotel security solutions are tailored for various hospitality environments.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img3} 
                    alt={t('home.hotel.application1ImageAlt') || "Luxury Hotels"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.hotel.application1Title') || 'Luxury Hotels'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.hotel.application1Description') || 'Premium security solutions with discreet implementation for high-end properties, including VIP protection features and integration with concierge services.'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img4} 
                    alt={t('home.hotel.application2ImageAlt') || "Resort Properties"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.hotel.application2Title') || 'Resort Properties'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.hotel.application2Description') || 'Wide-area coverage solutions for sprawling resort complexes with multiple buildings, outdoor spaces, and amenities like pools, beaches, and golf courses.'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img5} 
                    alt={t('home.hotel.application3ImageAlt') || "Business Hotels"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.hotel.application3Title') || 'Business Hotels'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.hotel.application3Description') || 'Specialized security focused on conference facilities, business centers, and technology infrastructure for properties catering to corporate travelers.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-amber-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">{t('home.hotel.ctaTitle') || 'Secure Your Hotel with Uniview Iran'}</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                {t('home.hotel.ctaDescription') || 'Connect with our security experts to design a customized Uniview camera solution for your hotel property in Iran.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/contact" 
                  className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center"
                >
                  <FiSend className="mr-2" />
                  {t('home.hotel.ctaButton1') || 'Request a Consultation'}
                </Link>
                <Link 
                  href="/products" 
                  className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center"
                >
                  {t('home.hotel.ctaButton2') || 'Explore Our Products'}
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

export default Hotel;
