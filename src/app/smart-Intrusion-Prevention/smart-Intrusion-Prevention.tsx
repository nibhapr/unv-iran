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
  FiRadio,
  FiActivity,
  FiCpu
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import img1 from '../../../public/smart/Advanced Security Camera Solutions.webp'
import img2 from '../../../public/smart/Commercial Buildings.webp'
import img3 from '../../../public/smart/Critical Infrastructure.webp'
import img4 from '../../../public/smart/Residential Properties .webp'

const SmartIntrusionPrevention = () => {
  const { t, dir } = useLanguage();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Uniview Smart Intrusion Prevention Solutions Iran",
    "description": "Advanced AI-powered security camera systems and intrusion prevention solutions for Iranian businesses and properties. Featuring smart analytics, multi-sensor integration, and automated response systems.",
    "brand": {
      "@type": "Brand",
      "name": "Uniview Iran",
      "url": "https://www.uniview-iran.ir"
    },
    "category": "Security Systems",
    "keywords": "smart security Iran, AI surveillance, intrusion prevention, دوربین مداربسته هوشمند, سیستم امنیتی هوشمند, نظارت تصویری هوشمند",
    "applicationCategory": "Security & Surveillance",
    "audience": {
      "@type": "Audience",
      "audienceType": "Business & Property Owners"
    },
    "image": [
      "https://www.uniview-iran.ir/smart/Advanced%20Security%20Camera%20Solutions.webp",
      "https://www.uniview-iran.ir/smart/Commercial%20Buildings.webp",
      "https://www.uniview-iran.ir/smart/Critical%20Infrastructure.webp"
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
              {t('home.intrusion.heroTitle') || 'Uniview Iran'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">{t('home.intrusion.heroTitleHighlight') || 'Smart Security'} Solutions</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
              {t('home.intrusion.heroDescription') || 'State-of-the-art security camera systems powered by AI technology, providing comprehensive surveillance and protection for businesses and properties across Iran.'}
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
                    alt={t('home.intrusion.overviewImageAlt') || "Smart Intrusion Prevention"}
                    fill
                    className="object-cover rounded-xl shadow-xl"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.intrusion.overviewTitle') || 'Advanced Security Camera Solutions'}</h2>
                  <p className="text-gray-700 mb-6">
                    {t('home.intrusion.overviewParagraph1') || 'As the official distributor of Uniview products in Iran, we provide cutting-edge security camera systems that go beyond traditional surveillance. Our smart solutions leverage advanced AI algorithms to deliver superior threat detection and prevention capabilities.'}
                  </p>
                  <p className="text-gray-700 mb-6">
                    {t('home.intrusion.overviewParagraph2') || 'Our comprehensive range includes indoor and outdoor cameras, NVRs, and integrated security systems that are specifically configured for the Iranian market, meeting local requirements while maintaining international standards.'}
                  </p>
                  <p className="text-gray-700">
                    {t('home.intrusion.overviewParagraph3') || 'With nationwide support and installation services, Uniview Iran ensures reliable security solutions backed by expert technical assistance and maintenance support throughout the country.'}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.intrusion.featuresTitle') || 'Advanced Detection Features'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.intrusion.featuresSubtitle') || 'Our smart intrusion prevention solutions include these essential technologies to ensure comprehensive protection.'}
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
                  <FiActivity className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.intrusion.feature1Title') || 'AI-Powered Analytics'}</h3>
                <p className="text-gray-700">
                  {t('home.intrusion.feature1Description') || 'Machine learning algorithms that continuously improve threat detection accuracy, reducing false alarms while ensuring genuine threats are identified.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <FiRadio className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.intrusion.feature2Title') || 'Multi-Sensor Integration'}</h3>
                <p className="text-gray-700">
                  {t('home.intrusion.feature2Description') || 'Seamless integration of motion sensors, glass-break detectors, door/window contacts, and environmental monitors for comprehensive protection.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <FiVideo className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.intrusion.feature3Title') || 'Video Verification'}</h3>
                <p className="text-gray-700">
                  {t('home.intrusion.feature3Description') || 'Automatic video recording and analysis when alarms are triggered, providing visual confirmation of intrusions and valuable evidence for investigations.'}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-red-600 transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <FiCpu className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.intrusion.feature4Title') || 'Edge Computing'}</h3>
                <p className="text-gray-700">
                  {t('home.intrusion.feature4Description') || 'On-device processing that enables real-time threat assessment and response, even when network connectivity is compromised or bandwidth is limited.'}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.intrusion.benefitsTitle') || 'Benefits of Uniview Smart Intrusion Prevention'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.intrusion.benefitsSubtitle') || 'Our integrated approach to intrusion prevention delivers multiple advantages.'}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.intrusion.benefit1Title') || 'Minimized False Alarms'}</h3>
                  <p className="text-gray-600">
                    {t('home.intrusion.benefit1Description') || 'Advanced filtering technology dramatically reduces false positives, ensuring security resources are focused on genuine threats.'}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.intrusion.benefit2Title') || 'Early Threat Detection'}</h3>
                  <p className="text-gray-600">
                    {t('home.intrusion.benefit2Description') || 'Identify potential intrusions at the earliest stages, allowing for preventive actions before physical breaches occur.'}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.intrusion.benefit3Title') || 'Automated Response'}</h3>
                  <p className="text-gray-600">
                    {t('home.intrusion.benefit3Description') || 'Trigger automatic security measures when threats are detected, from locking down specific areas to alerting security personnel.'}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.intrusion.benefit4Title') || '24/7 Monitoring'}</h3>
                  <p className="text-gray-600">
                    {t('home.intrusion.benefit4Description') || 'Continuous surveillance with consistent attention to detail that never fatigues, ensuring round-the-clock protection.'}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.intrusion.benefit5Title') || 'Remote Management'}</h3>
                  <p className="text-gray-600">
                    {t('home.intrusion.benefit5Description') || 'Monitor and manage your intrusion prevention system from anywhere via secure mobile apps and web interfaces.'}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.intrusion.benefit6Title') || 'Detailed Analytics'}</h3>
                  <p className="text-gray-600">
                    {t('home.intrusion.benefit6Description') || 'Comprehensive reporting and analysis of security events to identify patterns and improve future protection strategies.'}
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.intrusion.applicationsTitle') || 'Applications'}</h2>
              <p className="text-xl text-gray-700">
                {t('home.intrusion.applicationsSubtitle') || 'Our smart intrusion prevention solutions are ideal for various environments and applications.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img2} 
                    alt={t('home.intrusion.application1ImageAlt') || "Commercial Buildings"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.intrusion.application1Title') || 'Commercial Buildings'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.intrusion.application1Description') || 'Protect office buildings, retail spaces, and commercial properties with intelligent systems that distinguish between routine activity and security threats.'}
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img3} 
                    alt={t('home.intrusion.application2ImageAlt') || "Critical Infrastructure"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.intrusion.application2Title') || 'Critical Infrastructure'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.intrusion.application2Description') || 'Safeguard utilities, data centers, and essential facilities with advanced perimeter protection and multi-layer security measures.'}
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 relative">
                  <Image 
                    src={img4}
                    alt={t('home.intrusion.application3ImageAlt') || "Residential Properties"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{t('home.intrusion.application3Title') || 'Residential Properties'}</h3>
                  <p className="text-gray-600 mb-4">
                    {t('home.intrusion.application3Description') || 'Protect homes and residential complexes with intelligent systems that differentiate between residents, guests, and potential intruders.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12 text-white text-center">
                <h2 className="text-3xl font-bold mb-6">{t('home.intrusion.ctaTitle') || 'Enhance Your Security Posture Today'}</h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  {t('home.intrusion.ctaDescription') || 'Let our security experts design a customized smart intrusion prevention solution that addresses your specific challenges and requirements.'}
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link 
                    href="/contact" 
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center"
                  >
                    <FiSend className="mr-2" />
                    {t('home.intrusion.ctaButton1') || 'Request a Consultation'}
                  </Link>
                  <Link 
                    href="/products" 
                    className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center"
                  >
                    {t('home.intrusion.ctaButton2') || 'Explore Our Products'}
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

export default SmartIntrusionPrevention;
