"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { FiAward, FiGlobe, FiTarget, FiCheck, FiArrowRight, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import img1 from '../../../public/about/Our Story.webp'
import img2 from '../../../public/about/one-world-peace-connection-relationship-interconnection-concept.webp'
import Head from 'next/head';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'About Uniview Iran - Official Distributor of Security Solutions',
  description: 'Uniview Iran is the authorized distributor of Uniview security and surveillance solutions, providing cutting-edge technology with local expertise and support across Iran. Learn about our mission, values, and comprehensive security solutions.',
  keywords: 'Uniview Iran, security solutions, surveillance systems, CCTV distributor Iran, Uniview authorized dealer, security technology Iran, surveillance solutions Tehran',
  openGraph: {
    title: 'About Uniview Iran - Leading Security Solutions Provider',
    description: 'Discover Uniview Iran - Your trusted partner for advanced security and surveillance solutions. Official distributor of Uniview products with nationwide support.',
    images: [
      {
        url: '/about/Our Story.webp',
        width: 600,
        height: 400,
        alt: 'Uniview Iran Headquarters',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Uniview Iran - Security Solutions Excellence',
    description: 'Leading provider of Uniview security solutions in Iran. Expert installation, support, and maintenance services nationwide.',
    images: ['/about/Our Story.webp'],
  },
};

const About = () => {
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
    <div>
      <Head>
        {/* Primary Meta Tags */}
        <title>About Uniview Iran - Official Security Solutions Distributor</title>
        <meta name="description" content="Uniview Iran - The authorized distributor of Uniview security and surveillance solutions. Providing cutting-edge technology with local expertise across Iran." />
        
        {/* Schema.org markup for rich results */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Uniview Iran",
            "description": "Authorized distributor of Uniview security and surveillance solutions in Iran",
            "url": "https://www.uniview-iran.ir/about",
            "logo": "https://www.uniview-iran.ir/logo.png",
            "sameAs": [
              "https://www.linkedin.com/company/uniview-iran",
              "https://www.facebook.com/univiewiran",
              "https://twitter.com/univiewiran"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Iran",
              "addressLocality": "Tehran"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+98-XXX-XXXX",
              "contactType": "sales",
              "areaServed": "IR",
              "availableLanguage": ["en", "fa"]
            }
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-white pt-24" dir={dir}>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 lg:py-20">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('home.about.heroTitle') || 'About'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{t('home.about.heroTitleHighlight') || 'Uniview Iran'}</span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
              {t('home.about.heroDescription') || 'The authorized distributor of Uniview security and surveillance solutions in Iran, committed to providing cutting-edge technology with local expertise and support.'}
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-100 rounded-full opacity-50 filter blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100 rounded-full opacity-50 filter blur-3xl"></div>
              <div className="relative z-10 bg-white p-2 rounded-xl shadow-2xl">
                <div className="rounded-lg overflow-hidden">
                  <Image 
                    src={img1} 
                    alt={t('home.about.companyImageAlt') || "Uniview Iran Headquarters"} 
                    width={600} 
                    height={400} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.about.storyTitle') || "Our Story"}</h2>
              <p className="text-gray-700 mb-6">
                {t('home.about.storyParagraph1') || "Established as the exclusive authorized distributor of Uniview products in Iran, we bring world-class security technology to the Iranian market. We combine Uniview's global expertise with deep local knowledge to deliver security solutions perfectly tailored to the unique requirements of businesses across Iran."}
              </p>
              <p className="text-gray-700 mb-6">
                {t('home.about.storyParagraph2') || "Our mission is to provide Iranian businesses and organizations with access to cutting-edge Uniview security systems, supported by comprehensive local technical expertise, installation services, and ongoing maintenance. We're committed to ensuring our clients receive the highest standard of protection with solutions specifically configured for the Iranian market."}
              </p>
              <p className="text-gray-700">
                {t('home.about.storyParagraph3') || "At Uniview Iran, we believe that security is not just about technology—it's about creating peace of mind through reliable solutions backed by responsive local support. This philosophy guides our approach to every project we undertake across Iran."}
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.about.mvTitle') || "Our Mission & Values"}</h2>
              <p className="text-xl text-gray-700">
                {t('home.about.mvDescription') || "Guided by our commitment to excellence, we strive to elevate security standards across Iran through innovative Uniview solutions and exceptional service."}
              </p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 transform transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 text-white">
                  <FiTarget className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.about.missionTitle') || "Our Mission"}</h3>
                <p className="text-gray-700">
                  {t('home.about.missionDescription') || "To provide businesses and organizations across Iran with access to Uniview's world-class security technology, complemented by exceptional local support, ensuring optimal protection tailored to regional requirements."}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-8 transform transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 text-white">
                  <FiGlobe className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.about.visionTitle') || "Our Vision"}</h3>
                <p className="text-gray-700">
                  {t('home.about.visionDescription') || "To be Iran's leading provider of security technology, recognized for our technical expertise, superior customer service, and commitment to bringing the most advanced Uniview surveillance solutions to the Iranian market."}
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl shadow-lg p-8 transform transition-transform hover:scale-105"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6 text-white">
                  <FiAward className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.about.valuesTitle') || "Our Values"}</h3>
                <p className="text-gray-700">
                  {t('home.about.valuesDescription') || "Integrity, customer focus, technical excellence, and local expertise form the foundation of everything we do. We believe in building lasting relationships with our Iranian clients through trust, reliability, and exceptional service."}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Key Values */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t('home.about.principlesTitle') || "The Principles That Guide Us"}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex p-6">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiCheck className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.about.principle1Title') || "Local Expertise, Global Technology"}</h3>
                  <p className="text-gray-600">
                    {t('home.about.principle1Description') || "We combine deep understanding of Iran's security landscape with Uniview's cutting-edge global technology to deliver solutions perfectly adapted to local requirements."}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiCheck className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.about.principle2Title') || "Comprehensive Support"}</h3>
                  <p className="text-gray-600">
                    {t('home.about.principle2Description') || "We provide end-to-end service including consultation, system design, professional installation, training, and ongoing technical support throughout Iran, ensuring optimal system performance."}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiCheck className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.about.principle3Title') || "Industry-Specific Solutions"}</h3>
                  <p className="text-gray-600">
                    {t('home.about.principle3Description') || "We develop tailored security solutions for various sectors across Iran, including retail, banking, education, hospitality, warehousing, and stadiums, addressing each industry's unique security challenges."}
                  </p>
                </div>
              </div>
              
              <div className="flex p-6">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiCheck className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{t('home.about.principle4Title') || "Customer Satisfaction"}</h3>
                  <p className="text-gray-600">
                    {t('home.about.principle4Description') || "We measure our success by the satisfaction of our clients across Iran, focusing on building long-term relationships through responsive service, quality products, and reliable support."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Presence */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.about.globalTitle') || "Our Coverage in Iran"}</h2>
                  <p className="text-gray-700 mb-6">
                    {t('home.about.globalParagraph1') || "As the authorized distributor of Uniview products in Iran, we've established a comprehensive network to provide exceptional service throughout the country."}
                  </p>
                  <p className="text-gray-700 mb-6">
                    {t('home.about.globalParagraph2') || "Our nationwide infrastructure includes:"}
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                    <li>{t('home.about.globalBullet1') || "Headquarters in Tehran with showroom and training facilities"}</li>
                    <li>{t('home.about.globalBullet2') || "Regional offices in major cities including Isfahan, Shiraz, Mashhad, and Tabriz"}</li>
                    <li>{t('home.about.globalBullet3') || "Technical support teams providing rapid response throughout Iran"}</li>
                    <li>{t('home.about.globalBullet4') || "A network of certified installation partners across the country"}</li>
                    <li>{t('home.about.globalBullet5') || "Warehousing facilities ensuring prompt product availability"}</li>
                  </ul>
                  <p className="text-gray-700">
                    {t('home.about.globalParagraph3') || "This extensive presence allows us to provide timely, localized support to customers throughout Iran while maintaining consistent service quality and technical expertise."}
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-64 h-64 bg-blue-100 rounded-full opacity-50 filter blur-3xl"></div>
                  <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100 rounded-full opacity-50 filter blur-3xl"></div>
                  <div className="relative z-10 bg-white p-2 rounded-xl shadow-2xl">
                    <div className="rounded-lg overflow-hidden">
                      <Image 
                        src={img2} 
                        alt={t('home.about.globalImageAlt') || "Uniview Iran Regional Presence"} 
                        width={600} 
                        height={400} 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation & Technology */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('home.about.innovationTitle') || "Uniview Technology & Innovation"}</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t('home.about.innovationDescription') || "As the authorized distributor of Uniview in Iran, we provide access to the brand's cutting-edge security technology, backed by our local expertise."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.about.rdTitle') || "Advanced Product Range"}</h3>
              <p className="text-gray-700 mb-4">
                {t('home.about.rdParagraph1') || "We offer Uniview's complete portfolio of security products, including high-definition IP cameras, network video recorders, video management software, and integrated security solutions specifically configured for the Iranian market."}
              </p>
              <p className="text-gray-700">
                {t('home.about.rdParagraph2') || "Our team stays continuously updated on Uniview's latest innovations, ensuring Iranian customers have access to the most advanced security technologies available globally."}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-600">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.about.manufacturingTitle') || "Technical Expertise"}</h3>
              <p className="text-gray-700 mb-4">
                {t('home.about.manufacturingParagraph1') || "Our team of security specialists receives comprehensive training directly from Uniview, making them experts in system design, configuration, troubleshooting, and optimization for Iranian environments."}
              </p>
              <p className="text-gray-700">
                {t('home.about.manufacturingParagraph2') || "We provide professional system design services, creating customized security solutions that address the specific requirements and challenges of different locations and industries across Iran."}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{t('home.about.futureTitle') || "Complete Solutions"}</h3>
              <p className="text-gray-700 mb-4">
                {t('home.about.futureParagraph') || "Our comprehensive service approach includes:"}
              </p>
              <ul className="list-disc pl-6 text-gray-700">
                <li>{t('home.about.futureBullet1') || "Professional system design and consultation"}</li>
                <li>{t('home.about.futureBullet2') || "Expert installation and configuration"}</li>
                <li>{t('home.about.futureBullet3') || "Technical training for system operators"}</li>
                <li>{t('home.about.futureBullet4') || "Maintenance and support services"}</li>
                <li>{t('home.about.futureBullet5') || "System upgrades and expansions"}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">{t('home.about.ctaTitle') || "Partner with Uniview Iran for Your Security Needs"}</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                {t('home.about.ctaDescription') || "Connect with our team of local experts to discuss how Uniview's advanced security solutions can be tailored to your specific requirements in Iran."}
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/contact" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center"
                >
                  <FiSend className="mr-2" />
                  {t('home.about.ctaButton1') || "Contact Us"}
                </Link>
                <Link 
                  href="/products" 
                  className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 rounded-full font-medium transition-all duration-300 text-lg flex items-center justify-center"
                >
                  {t('home.about.ctaButton2') || "Explore Our Solutions"}
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
    </div>
  );
}

export default About;
