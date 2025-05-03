"use client";

import React, { useState, FormEvent } from 'react';
import { FiSend, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { toast, Toaster } from 'react-hot-toast';
import { useLanguage } from '../../context/LanguageContext';
import Head from 'next/head';

const ContactPage = () => {
  const { t, dir } = useLanguage();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Uniview Iran",
    "description": "Contact Uniview Iran for security solutions and surveillance systems. Get in touch with our expert team for consultation and support.",
    "url": "https://www.uniview-iran.ir/contact",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "sales@unv-iran.com ",
      "areaServed": "IR",
      "availableLanguage": ["en", "fa"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Iran",
      "addressLocality": "Tehran"
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const validateForm = () => {
    const tempErrors: { name?: string; email?: string; message?: string } = {};
    let formIsValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = 'Name is required';
      formIsValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
      formIsValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
      formIsValid = false;
    }

    setErrors(tempErrors as { name: string; email: string; message: string });
    return formIsValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Simulated API call - replace with actual submission logic
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          toast.success('Message sent successfully!');
          // Reset form after successful submission
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
          });
        } else {
          toast.error('Failed to send message. Please try again.');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
        console.error('Submission error:', error);
      }
    } else {
      toast.error('Please correct the errors in the form');
    }
  };

  return (
    <>
      <Head>
        <title>Contact Uniview Iran | تماس با یونی ویو ایران</title>
        <meta name="description" content="Contact Uniview Iran for professional security solutions and surveillance systems. Get expert consultation and support for your security needs. | تماس با یونی ویو ایران برای راهکارهای امنیتی و سیستم‌های نظارتی حرفه‌ای" />
        <meta name="keywords" content="contact uniview iran, security solutions contact, surveillance systems support, uniview support iran, تماس یونی ویو ایران, پشتیبانی دوربین مداربسته, تماس با ما" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Contact Uniview Iran | تماس با یونی ویو ایران" />
        <meta property="og:description" content="Get in touch with Uniview Iran for professional security solutions and expert support. | تماس با یونی ویو ایران برای راهکارهای امنیتی حرفه‌ای" />
        <meta property="og:url" content="https://www.uniview-iran.ir/contact" />
        <meta property="og:type" content="website" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English, Persian" />
        <link rel="canonical" href="https://www.uniview-iran.ir/contact" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-white pt-24" dir={dir}>
        <Toaster position="top-right" />
        
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
              {t('home.contact.title') || 'Get in Touch'}
            </h1>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              {t('home.contact.subtitle') || 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'}
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border-t-4 border-blue-600 
                hover:transform hover:scale-105 transition-all duration-300 relative overflow-hidden
                before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 
                before:bg-gradient-to-r before:from-blue-600 before:via-purple-600 before:to-indigo-600">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                <FiSend className="mr-3 text-blue-600" /> {t('home.contact.contactUsTitle') || 'Contact Us'}
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FiMail className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">{t('home.contact.emailLabel') || 'Email'}</p>
                    <a 
                      href="mailto:sales@unv-iran.com " 
                      className="text-blue-800 hover:text-blue-600 font-medium"
                    >
                      sales@unv-iran.com 
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FiPhone className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">{t('home.contact.phoneLabel') || 'Phone'}</p>
                    <a 
                      href="tel:+1-555-123-4567" 
                      className="text-blue-800 hover:text-blue-600 font-medium"
                    >
                      +971 55 902 5905
                    </a>
                  </div>
                </div>
                
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border-t-4 border-purple-600 
                hover:transform hover:scale-105 transition-all duration-300 relative overflow-hidden
                before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 
                before:bg-gradient-to-r before:from-purple-600 before:via-indigo-600 before:to-blue-600">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('home.contact.formTitle') || 'Send us a Message'}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{t('home.contact.nameLabel') || 'Your Name'}</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder={t('home.contact.namePlaceholder') || "John Doe"}
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border 
                        ${errors.name ? 'border-red-500' : 'border-gray-300'}
                        focus:outline-none focus:ring-2 focus:ring-blue-300 
                        bg-white/50 hover:bg-white transition-all duration-300
                        shadow-sm hover:shadow-md`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{t('home.contact.emailInputLabel') || 'Email Address'}</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder={t('home.contact.emailPlaceholder') || "john@example.com"}
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border 
                        ${errors.email ? 'border-red-500' : 'border-gray-300'}
                        focus:outline-none focus:ring-2 focus:ring-blue-300 
                        bg-white/50 hover:bg-white transition-all duration-300
                        shadow-sm hover:shadow-md`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">{t('home.contact.phoneInputLabel') || 'Phone Number (Optional)'}</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder={t('home.contact.phonePlaceholder') || "+971 55 902 5905"}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300
                      focus:outline-none focus:ring-2 focus:ring-blue-300 
                      bg-white/50 hover:bg-white transition-all duration-300
                      shadow-sm hover:shadow-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">{t('home.contact.messageLabel') || 'Your Message'}</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={t('home.contact.messagePlaceholder') || "How can we help you?"}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border 
                      ${errors.message ? 'border-red-500' : 'border-gray-300'}
                      focus:outline-none focus:ring-2 focus:ring-blue-300 
                      bg-white/50 hover:bg-white transition-all duration-300 resize-none
                      shadow-sm hover:shadow-md`}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 
                    text-white py-4 px-8 rounded-lg hover:opacity-90
                    transition-all duration-300 flex items-center justify-center space-x-2 
                    group shadow-lg hover:shadow-xl transform hover:-translate-y-1
                    relative overflow-hidden animate-gradient bg-[length:200%_auto]"
                >
                  <span className="font-medium relative z-10">{t('home.contact.submitButton') || 'Send Message'}</span>
                  <FiSend className="ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;