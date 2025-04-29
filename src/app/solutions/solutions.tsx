"use client";

import React, { useState, useMemo } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { 
  FiArrowRight, 
  FiCamera, 
  FiShield, 
  FiVideo, 
  FiBarChart,
  FiCheckCircle,
  FiArrowDown,
  FiArrowUp
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../context/LanguageContext';
import bank from '../../../public/solutions/bank.webp'
import hospital from '../../../public/solutions/hospital.webp';
import building from '../../../public/solutions/Buildings .webp'
import school from '../../../public/solutions/school.webp';
import hotel from '../../../public/solutions/hotel.webp';
import shopping from '../../../public/solutions/shopping.webp';
import warehouse from '../../../public/solutions/wherehouse.webp';
import retail from '../../../public/solutions/retail.webp';
import stadium from '../../../public/solutions/stadium.webp';


// Add TypeScript interfaces for better type safety
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface SolutionCategory {
  id: string;
  name: string;
  description: string;
  image: string | StaticImageData;
  features: string[];
  color?: string;
}

const solutionCategories: SolutionCategory[] = [
  {
    id: 'building',
    name: 'Building',
    description: 'Comprehensive security solutions for commercial and residential complexes.',
    image: building,
    features: [
      'Perimeter Protection',
      'Access Control Systems',
      'Video Surveillance',
      'Visitor Management'
    ],
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 'school',
    name: 'School',
    description: 'Advanced safety and security systems for educational institutions.',
    image: school,
    features: [
      'Campus-wide Monitoring',
      'Emergency Response Integration',
      'Student Safety Tracking',
      'Restricted Area Control'
    ],
    color: 'from-green-600 to-green-800'
  },
  {
    id: 'hotel',
    name: 'Hotel',
    description: 'Tailored security solutions for hospitality environments.',
    image: hotel,
    features: [
      'Guest Room Security',
      'Lobby and Common Area Surveillance',
      'Staff Monitoring',
      'Asset Protection'
    ],
    color: 'from-amber-500 to-amber-700'
  },
  {
    id: 'retail',
    name: 'Retail',
    description: 'Loss prevention and operational intelligence for retail spaces.',
    image: retail,
    features: [
      'Theft Prevention',
      'Customer Flow Analysis',
      'POS Integration',
      'Inventory Tracking'
    ],
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 'shopping-mall',
    name: 'Shopping Mall',
    description: 'Comprehensive security management for large commercial spaces.',
    image: shopping,
    features: [
      'Multi-zone Monitoring',
      'Crowd Management',
      'Emergency Exit Tracking',
      'Parking Area Security'
    ],
    color: 'from-pink-500 to-pink-700'
  },
  {
    id: 'stadium',
    name: 'Stadium',
    description: 'High-performance security for large event venues.',
    image: stadium,
    features: [
      'Crowd Control',
      'VIP Area Protection',
      'Real-time Threat Detection',
      'Incident Response'
    ],
    color: 'from-orange-500 to-orange-700'
  },
  {
    id: 'bank',
    name: 'Bank',
    description: 'Mission-critical security for financial institutions.',
    image: bank,
    features: [
      'Vault Monitoring',
      'ATM Surveillance',
      'Transaction Area Security',
      'Compliance Tracking'
    ],
    color: 'from-emerald-600 to-emerald-800'
  },
  {
    id: 'hospital',
    name: 'Hospital',
    description: 'Specialized security solutions for healthcare environments.',
    image: hospital,
    features: [
      'Patient Safety',
      'Restricted Area Control',
      'Medication Storage Monitoring',
      'Staff Safety'
    ],
    color: 'from-red-500 to-red-700'
  },
  {
    id: 'warehouse',
    name: 'Warehouse & Logistics',
    description: 'Comprehensive security for storage and distribution centers.',
    image: warehouse,
    features: [
      'Inventory Protection',
      'Perimeter Security',
      'Vehicle Tracking',
      'Loading Dock Monitoring'
    ],
    color: 'from-cyan-600 to-cyan-800'
  }
];

// Core solutions data
const coreSolutions: Feature[] = [
  { 
    icon: FiCamera, 
    title: 'Intelligent Video Surveillance', 
    description: 'High-definition cameras with advanced analytics capabilities for real-time monitoring.' 
  },
  { 
    icon: FiShield, 
    title: 'Secure Access Control', 
    description: 'Multi-factor authentication and biometric solutions for enhanced entry management.' 
  },
  { 
    icon: FiVideo, 
    title: 'Unified Video Management', 
    description: 'Centralized platform for recording, analyzing, and managing video data across all your facilities.' 
  },
  { 
    icon: FiBarChart, 
    title: 'AI-Powered Video Analytics', 
    description: 'Proactive insights and anomaly detection for enhanced security and operational intelligence.' 
  }
];

// Enhanced animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Refined animations
const shimmer = {
  hidden: { backgroundPosition: "200% 0" },
  visible: { 
    backgroundPosition: "-200% 0",
    transition: { repeat: Infinity, duration: 2.5 }
  }
};

const float = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Enhanced gradient overlays
const gradientOverlay = "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/80 after:via-black/40 after:to-transparent after:z-10";
const glassEffect = "backdrop-blur-md bg-white/10 border border-white/20";

// Enhanced MobileSolutionCard with interactive features
const MobileSolutionCard = ({ category, onSelect, isSelected, t }: {
  category: SolutionCategory;
  onSelect: () => void;
  isSelected: boolean;
  t: (key: string) => string;
}) => (
  <motion.div 
    className={`relative backdrop-blur-lg rounded-xl shadow-lg overflow-hidden 
               transform transition-all border ${
                 isSelected 
                   ? 'bg-gradient-to-br from-white via-white to-blue-50 border-blue-200 shadow-blue-100/50' 
                   : 'bg-white/90 border-white/20'
               }`}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileTap={{ scale: 0.98 }}
  >
    <div 
      className={`relative h-32 ${gradientOverlay} overflow-hidden`}
      onClick={onSelect}
    >
      <Image 
        src={category.image}
        alt={t(`home.solutions.categories.${category.id}.name`) || category.name}
        fill
        className={`object-cover transition-transform duration-300 ${
          isSelected ? 'scale-105' : 'scale-100'
        }`}
        sizes="(max-width: 768px) 50vw"
      />
      <div className="absolute inset-0 p-3 flex flex-col justify-between z-20">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-white drop-shadow-lg">
            {t(`home.solutions.categories.${category.id}.name`) || category.name}
          </h3>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isSelected ? 1 : 0 }}
            className="bg-blue-500 text-white p-1 rounded-full shadow-lg"
          >
            <FiCheckCircle size={16} />
          </motion.div>
        </div>
      </div>
    </div>
    <div className="p-3">
      <p className="text-xs text-gray-600 line-clamp-2 mb-2 h-8">
        {t(`home.solutions.categories.${category.id}.description`) || category.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {category.features.slice(0, 2).map((feature) => (
          <span 
            key={feature}
            className={`text-[10px] px-2 py-0.5 rounded-full ${
              isSelected 
                ? `bg-gradient-to-r ${category.color} text-white` 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {t(`home.solutions.categories.${category.id}.features.${category.features.indexOf(feature)}`) || feature}
          </span>
        ))}
      </div>
      <button
        onClick={onSelect}
        className={`w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg 
                   text-xs font-medium transition-all duration-300 ${
                     isSelected
                       ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                   }`}
      >
        <span>{isSelected ? t('home.solutions.selected') || 'Selected' : t('home.solutions.viewDetails') || 'View Details'}</span>
        <FiArrowRight className={`text-xs transition-transform duration-300 ${
          isSelected ? 'translate-x-0.5' : ''
        }`} />
      </button>
    </div>
  </motion.div>
);

const SolutionsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SolutionCategory>(solutionCategories[0]);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const { t, dir } = useLanguage();

  // Memoized category list component
  const CategoryList = useMemo(() => (
    <motion.div 
      className="space-y-3"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {solutionCategories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => setSelectedCategory(category)}
          className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
            selectedCategory.id === category.id 
              ? 'bg-blue-50 text-blue-700 shadow-md' 
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm'
          }`}
          variants={fadeInUp}
          whileHover={{ x: 5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                selectedCategory.id === category.id 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300 group-hover:bg-blue-400'
              }`} />
              <span className="font-semibold">{t(`home.solutions.categories.${category.id}.name`) || category.name}</span>
            </div>
            <FiArrowRight className={`transform transition-all duration-300 ${
              selectedCategory.id === category.id 
                ? 'translate-x-1 opacity-100' 
                : 'opacity-50 group-hover:translate-x-1 group-hover:opacity-100'
            }`} />
          </div>
          <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-700 transition-colors pl-5">
            {t(`home.solutions.categories.${category.id}.description`) || category.description.slice(0, 80)}...
          </p>
        </motion.button>
      ))}
    </motion.div>
  ), [selectedCategory, t]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50/30" dir={dir}>
      <div className="container mx-auto px-4 py-12 lg:py-20">
        {/* Refined Hero Section - added mt-12 to increase top margin */}
        <motion.section 
          className="text-center mb-16 space-y-6 mt-12 lg:mt-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div 
              className="absolute -top-24 -right-24 w-56 h-56 bg-blue-200 rounded-full blur-3xl opacity-30"
              variants={float}
              initial="initial"
              animate="animate"
            />
            <motion.div 
              className="absolute -bottom-24 -left-24 w-56 h-56 bg-purple-200 rounded-full blur-3xl opacity-30"
              variants={float}
              initial="initial"
              animate="animate"
            />
          </div>

          <div className="relative inline-block">
            <motion.h1 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('home.solutions.title') || 'Intelligent Security for'}{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
                  {t('home.solutions.titleHighlight') || 'Every Industry'}
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </span>
            </motion.h1>
          </div>
          
          <motion.p 
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('home.solutions.description') || 'Experience next-generation security solutions powered by AI and advanced analytics, tailored for your industry\'s unique challenges.'}
          </motion.p>

          {/* Refined action buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mt-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              href="/contact"
              className="group px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full 
                        hover:shadow-md hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="flex items-center space-x-2">
                <span className="text-sm">{t('home.solutions.getStartedButton') || 'Get Started'}</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link 
              href="/demo"
              className="group px-5 py-2.5 border border-gray-300 text-gray-700 rounded-full 
                        hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="flex items-center space-x-2">
                <span className="text-sm">{t('home.solutions.watchDemoButton') || 'Watch Demo'}</span>
                <FiVideo className="transition-transform group-hover:scale-110" />
              </span>
            </Link>
          </motion.div>
        </motion.section>

        {/* Enhanced Main Content Grid */}
        <motion.section 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Category List */}
          <div className="hidden md:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Industries
              </h2>
            </div>
            {CategoryList}
          </div>

          {/* Mobile View Updates */}
          <div className="md:hidden space-y-6" id="mobile-solutions">
            <div className="grid grid-cols-2 gap-3 px-1">
              {solutionCategories.map((category) => (
                <MobileSolutionCard
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory.id === category.id}
                  onSelect={() => {
                    setSelectedCategory(category);
                    document.getElementById('solution-details')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest'
                    });
                  }}
                  t={t}
                />
              ))}
            </div>

            {/* Mobile Solution Details */}
            <motion.div
              id="solution-details"
              className="mt-6 px-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <div className="relative h-48">
                    <Image 
                      src={selectedCategory.image}
                      alt={`${t(`home.solutions.categories.${selectedCategory.id}.name`) || selectedCategory.name} Security Solutions`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 p-4">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <div className={`w-2 h-2 rounded-full bg-white`} />
                        <span className="text-white/80 text-sm font-medium">
                          Security Solution
                        </span>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {t(`home.solutions.categories.${selectedCategory.id}.name`) || selectedCategory.name}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {t(`home.solutions.categories.${selectedCategory.id}.description`) || selectedCategory.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Key Features
                      </h4>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          document.getElementById('mobile-solutions')?.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                          });
                        }}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm
                                   bg-gradient-to-r ${selectedCategory.color} text-white`}
                      >
                        <FiArrowUp className="mr-1" />
                        <span>{t('home.solutions.backToSolutions') || 'Back to solutions'}</span>
                      </motion.button>
                    </div>
                    
                    <div className="space-y-2.5">
                      {selectedCategory.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-center space-x-3 p-3 rounded-lg
                                     bg-gradient-to-r from-gray-50 to-white border border-gray-100`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                          bg-gradient-to-r ${selectedCategory.color} text-white`}>
                            <FiCheckCircle />
                          </div>
                          <span className="text-sm text-gray-800 font-medium">
                            {t(`home.solutions.categories.${selectedCategory.id}.features.${index}`) || feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/${selectedCategory.id}`}
                      className={`mt-6 w-full inline-flex items-center justify-center space-x-2 
                                bg-gradient-to-r ${selectedCategory.color} 
                                text-white px-4 py-3.5 rounded-lg shadow-lg text-sm font-medium`}
                    >
                      <span>{t('home.solutions.exploreSolutions') || 'Explore'}{' '}{t(`home.solutions.categories.${selectedCategory.id}.name`) || selectedCategory.name}{' '}{t('home.solutions.solutions') || 'Solutions'}</span>
                      <FiArrowRight />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Category Details */}
          <div className="md:col-span-2 hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
              >
                <div className="relative h-64 group">
                  <Image 
                    src={selectedCategory.image}
                    alt={`${t(`home.solutions.categories.${selectedCategory.id}.name`) || selectedCategory.name} Security Solutions`}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover transition duration-500 ease-in-out group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <motion.h2 
                        className="text-2xl font-bold text-white mb-2 drop-shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {t(`home.solutions.categories.${selectedCategory.id}.name`) || selectedCategory.name}
                      </motion.h2>
                      <motion.p 
                        className="text-base text-white/90 drop-shadow max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {t(`home.solutions.categories.${selectedCategory.id}.description`) || selectedCategory.description}
                      </motion.p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
                  <motion.ul 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    key={selectedCategory.id}
                  >
                    {selectedCategory.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-center space-x-3 group hover:bg-blue-50 p-2.5 rounded-lg transition-colors"
                        variants={fadeInUp}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedCategory.color ? `bg-gradient-to-r ${selectedCategory.color}` : 'bg-blue-600'
                        } text-white shadow-md group-hover:scale-110 transition-transform`}>
                          <FiCheckCircle className="text-base" />
                        </div>
                        <span className="text-base text-gray-700 group-hover:text-blue-700 transition font-medium">
                          {t(`home.solutions.categories.${selectedCategory.id}.features.${index}`) || feature}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  
                  <motion.div 
                    className="mt-8 flex justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link 
                      href={`/${selectedCategory.id}`}
                      className={`inline-flex items-center space-x-2 ${
                        selectedCategory.color ? `bg-gradient-to-r ${selectedCategory.color}` : 'bg-blue-600'
                      } text-white px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1`}
                    >
                      <span>{t('home.solutions.learnMore') || 'Learn more'}</span>
                      <FiArrowRight />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Enhanced Core Solutions Section */}
        <motion.section 
          className="mt-32 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent -z-10 rounded-3xl" />
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('home.solutions.coreSolutionsTitle') || 'Our Core Security Technologies'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.solutions.coreSolutionsDescription') || 'Advanced security solutions that adapt to your evolving needs.'}
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {coreSolutions.map((solution, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-3xl shadow-lg p-8 transform transition duration-500 
                           hover:scale-105 hover:shadow-xl border border-gray-100 group"
                variants={fadeInUp}
                whileHover={{ y: -10 }}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 
                                bg-gradient-to-br from-blue-500 to-blue-600 group-hover:from-blue-600 
                                group-hover:to-blue-700 transition-all duration-300`}>
                  <solution.icon className="text-white text-2xl group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 group-hover:text-blue-700 transition-colors">
                  {t(`home.solutions.coreSolution${index + 1}Title`) || solution.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {t(`home.solutions.coreSolution${index + 1}Description`) || solution.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Section with Enhanced Gradient and Hover Effects */}
        <motion.section 
          className="mt-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-10 md:p-16 text-center shadow-2xl overflow-hidden relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-purple-500/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
              {t('home.solutions.ctaTitle') || 'Elevate Your Security Posture Today'}
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {t('home.solutions.ctaDescription') || 'Partner with Uniview to design a customized security solution that meets your unique requirements.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-6">
              <Link 
                href="/contact" 
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 group"
              >
                <span className="flex items-center justify-center">
                  {t('home.solutions.ctaButton1') || 'Request a Consultation'}
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                href="/products" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/20 px-8 py-4 rounded-full font-medium transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white"
              >
                {t('home.solutions.ctaButton2') || 'Explore Our Products'}
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default SolutionsPage;