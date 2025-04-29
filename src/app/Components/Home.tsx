"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiCamera, FiShield, FiVideo, FiBarChart, FiArrowRight, FiCheckCircle, FiStar, FiUsers, FiGlobe, FiAward } from 'react-icons/fi';
import { motion } from 'framer-motion';
import homebanner from '../../../public/Homebanner.jpg'
import retail from '../../../public/solutions/retail.webp'
import bank from '../../../public/solutions/bank.webp'
import school from '../../../public/solutions/school.webp'
import { useLanguage } from '../../context/LanguageContext';

const Home = () => {
  const { t, dir } = useLanguage();

  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href') as string)?.scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Enhanced Text Above Image Layout */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 w-96 h-96 bg-blue-100 rounded-full opacity-50 filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-indigo-100 rounded-full opacity-50 filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-10 max-w-3xl pt-8">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium text-sm mb-10 shadow-md mt-8"
              >
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                {t('hero.subtitle')}
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight"
              >
                {t('hero.title')}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                {t('hero.description')}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                dir={dir}
              >
                <Link 
                  href="/products" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {t('home.exploreProducts')}
                </Link>
                <Link 
                  href="/demo" 
                  className="bg-white text-blue-600 border border-blue-200 hover:border-blue-300 px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-1"
                >
                  {t('home.requestDemo')}
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-full max-w-5xl mx-auto px-4 sm:px-0"
            >
              <div className="relative mb-10 sm:mb-4">
                {/* Image container */}
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20"></div>
                  <div className="bg-white p-2 sm:p-3 rounded-xl shadow-2xl relative">
                    <Image 
                      src={homebanner} 
                      alt="Security System" 
                      width={1200} 
                      height={600} 
                      className="w-full h-auto object-cover rounded-lg"
                      priority
                    />
                    
                    {/* Overlay badge in the corner */}
                    <div className="absolute top-5 right-5 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      4K Ultra HD
                    </div>
                  </div>
                </div>
                
                {/* Feature highlights below the image instead of overlaid */}
                <div className="mt-6 w-full max-w-4xl mx-auto">
                  <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
                      <div className="flex items-center p-4 sm:p-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-full p-3 mr-4 shadow-inner flex-shrink-0">
                          <FiShield className="text-blue-600 text-xl" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{t('home.features.protection.title')}</p>
                          <p className="text-sm text-gray-500">{t('home.features.protection.subtitle')}</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 sm:p-6">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-full p-3 mr-4 shadow-inner flex-shrink-0">
                          <FiVideo className="text-green-600 text-xl" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">4K Resolution</p>
                          <p className="text-sm text-gray-500">Crystal-clear footage</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 sm:p-6">
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-full p-3 mr-4 shadow-inner flex-shrink-0">
                          <FiBarChart className="text-purple-600 text-xl" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Smart Analytics</p>
                          <p className="text-sm text-gray-500">AI-powered insights</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-4 md:py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-8 md:mb-10"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-5">
              {t('home.offeringsTitle')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('home.comprehensiveSolutions')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('home.solutionsDescription')}
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: FiCamera,
                color: "blue",
                title: t('home.offerings.surveillance.title'),
                description: t('home.offerings.surveillance.description')
              },
              {
                icon: FiShield,
                color: "purple",
                title: t('home.offerings.access.title'),
                description: t('home.offerings.access.description')
              },
              {
                icon: FiVideo,
                color: "green",
                title: t('home.offerings.videoManagement.title'),
                description: t('home.offerings.videoManagement.description')
              },
              {
                icon: FiBarChart,
                color: "orange",
                title: t('home.offerings.analytics.title'),
                description: t('home.offerings.analytics.description')
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className={`bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 border-t-4 border-${feature.color}-600 hover:shadow-xl`}
              >
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mb-6`}>
                  <feature.icon className={`text-${feature.color}-600 text-2xl`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
                <div className="mt-6">
                  <Link 
                    href={`/products/${feature.title.toLowerCase().replace(/\s+/g, '-')}`} 
                    className={`text-${feature.color}-600 font-medium flex items-center text-sm hover:underline`}
                  >
                    Learn more <FiArrowRight className="ml-2 text-sm" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solutions For Industries Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-5">
              {t('home.industryExpertise')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('home.solutionsForIndustry')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('home.tailoredApproaches')}
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: t('home.industries.retail.title'),
                color: "blue",
                description: t('home.industries.retail.description'),
                bgImage: retail.src,
                link: "/retail"
              },
              {
                title: t('home.industries.banking.title'),
                color: "purple",
                description: t('home.industries.banking.description'),
                bgImage: bank.src,
                link: "/bank"
              },
              {
                title: t('home.industries.schools.title'),
                color: "green",
                description: t('home.industries.schools.description'),
                bgImage: school.src,
                link: "/school"
              }
            ].map((industry, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="group"
              >
                <Link href={industry.link}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                    <div 
                      className="h-56 relative overflow-hidden"
                      style={{
                        backgroundImage: `url(${industry.bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70"></div>
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-white">{industry.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">
                        {industry.description}
                      </p>
                      <span className={`text-${industry.color}-600 font-medium flex items-center group-hover:underline`}>
                        Learn more <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link 
              href="/solutions" 
              className="inline-flex items-center bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              View All Industry Solutions <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - New */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "5,000+", label: t('home.stats.installations'), icon: FiCheckCircle },
              { number: "98%", label: t('home.stats.satisfaction'), icon: FiUsers },
              { number: "24/7", label: t('home.stats.support'), icon: FiGlobe },
              { number: "15+", label: t('home.stats.experience'), icon: FiAward }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-5">
              {t('home.ourAdvantages')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('home.whyChooseUniview')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('home.reliabilityText')}
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: t('home.advantages.technology.title'),
                description: t('home.advantages.technology.description')
              },
              {
                title: t('home.advantages.integration.title'),
                description: t('home.advantages.integration.description')
              },
              {
                title: t('home.advantages.support.title'),
                description: t('home.advantages.support.description')
              },
              {
                title: t('home.advantages.scalable.title'),
                description: t('home.advantages.scalable.description')
              },
              {
                title: t('home.advantages.management.title'),
                description: t('home.advantages.management.description')
              },
              {
                title: t('home.advantages.costEffective.title'),
                description: t('home.advantages.costEffective.description')
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeIn} className="flex p-6 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiCheckCircle className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-5">
              {t('home.getStarted')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900">
              {t('home.readyToEnhance')}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('home.discussSolutions')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/contact" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg group"
              >
                <span className="flex items-center justify-center">
                  {t('home.contactTeam')} <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                href="/products" 
                className="bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-medium transition-all duration-300 text-lg"
              >
                {t('home.browseProducts')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-5">
              {t('home.faq.subtitle')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('home.faq.title')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('home.faq.description')}
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="max-w-4xl mx-auto"
          >
            {[
              {
                question: t('home.faq.questions.business.question'),
                answer: t('home.faq.questions.business.answer')
              },
              {
                question: t('home.faq.questions.integration.question'),
                answer: t('home.faq.questions.integration.answer')
              },
              {
                question: t('home.faq.questions.support.question'),
                answer: t('home.faq.questions.support.answer')
              },
              {
                question: t('home.faq.questions.remoteAccess.question'),
                answer: t('home.faq.questions.remoteAccess.answer')
              },
              {
                question: t('home.faq.questions.difference.question'),
                answer: t('home.faq.questions.difference.answer')
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="mb-6 last:mb-0"
              >
                <details className="group bg-white rounded-lg shadow-md overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer list-none font-semibold text-lg text-gray-800">
                    {faq.question}
                    <span className="text-blue-600 transition-transform duration-300 group-open:rotate-45">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-6 pt-0 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6">{t('home.stillQuestions')}</p>
            <Link 
              href="/support" 
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              {t('home.contactSupport')} <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
