"use client";

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FiDatabase, FiShield, FiSettings, FiGlobe, FiAlertTriangle } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const Cookies = () => {
  const { t, dir } = useLanguage();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookie Policy - Uniview Iran",
    "description": "Learn about how Uniview Iran uses cookies and similar technologies to enhance your browsing experience and improve our security solutions website.",
    "publisher": {
      "@type": "Organization",
      "name": "Uniview Iran",
      "url": "https://www.uniview-iran.ir"
    },
    "inLanguage": ["en", "fa"],
    "isAccessibleForFree": true,
    "keywords": "cookie policy uniview iran, privacy policy, website cookies, دوربین مداربسته, کوکی های وب سایت"
  };

  return (
    <>
      <Head>
        <title>Cookie Policy | سیاست کوکی - Uniview Iran</title>
        <meta name="description" content="Learn about Uniview Iran's cookie policy and how we use cookies to enhance your security solutions browsing experience. | سیاست کوکی یونی ویو ایران و نحوه استفاده از کوکی ها برای بهبود تجربه کاربری" />
        <meta name="keywords" content="cookie policy uniview iran, website cookies, privacy policy, security solutions cookies, دوربین مداربسته, کوکی های وب سایت, حریم خصوصی" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Cookie Policy | سیاست کوکی - Uniview Iran" />
        <meta property="og:description" content="Understanding how Uniview Iran uses cookies to enhance your security solutions experience. | نحوه استفاده از کوکی ها در یونی ویو ایران" />
        <meta property="og:url" content="https://www.uniview-iran.ir/cookies" />
        <meta property="og:type" content="website" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English, Persian" />
        <link rel="canonical" href="https://www.uniview-iran.ir/cookies" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-white pt-24" dir={dir}>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {t('home.cookies.heroTitle') || 'Cookie Policy'}
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
              {t('home.cookies.heroDescription') || 'This Cookie Policy explains how Uniview Iran uses cookies and similar technologies to recognize and understand how you interact with our website.'}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-8 mb-16">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiDatabase className="text-blue-600 text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.cookies.whatAreCookiesTitle') || 'What Are Cookies?'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.cookies.whatAreCookiesP1') || 'Cookies are small text files that are placed on your device (computer, tablet, mobile phone) when you visit a website.'}
                </p>
                <p className="text-gray-700 mb-4">
                  {t('home.cookies.whatAreCookiesP2') || 'Cookies help website owners to provide you with a better browsing experience by:'}
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                  <li>{t('home.cookies.whatAreCookiesL1') || 'Remembering your preferences and settings'}</li>
                  <li>{t('home.cookies.whatAreCookiesL2') || 'Understanding how you navigate through the website'}</li>
                  <li>{t('home.cookies.whatAreCookiesL3') || 'Analyzing patterns to improve the website\'s functionality'}</li>
                  <li>{t('home.cookies.whatAreCookiesL4') || 'Enhancing security features for a safer browsing experience'}</li>
                </ul>
                <p className="text-gray-700 mb-2">
                  {t('home.cookies.whatAreCookiesP3') || 'Cookies set by the website owner (in this case, Uniview Iran) are called "first-party cookies".'}
                </p>
                <p className="text-gray-700 mb-2">
                  {t('home.cookies.whatAreCookiesP4') || 'Cookies set by parties other than the website owner are called "third-party cookies".'}
                </p>
                <p className="text-gray-700">
                  {t('home.cookies.whatAreCookiesP5') || 'Third-party cookies enable features or functionality provided by external services, such as analytics, interactive content, and advertising.'}
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiShield className="text-blue-600 text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.cookies.typesTitle') || 'Types of Cookies We Use'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.cookies.typesP1') || 'We use different types of cookies on our website for various purposes:'}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('home.cookies.essentialTitle') || 'Essential Cookies'}</h3>
                <p className="text-gray-700 mb-4">
                  {t('home.cookies.essentialP1') || 'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You may disable these by changing your browser settings, but this may affect how the website functions.'}
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('home.cookies.performanceTitle') || 'Performance and Analytics Cookies'}</h3>
                <p className="text-gray-700 mb-4">
                  {t('home.cookies.performanceP1') || 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us improve our website\'s structure, content, and user experience.'}
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('home.cookies.functionalityTitle') || 'Functionality Cookies'}</h3>
                <p className="text-gray-700 mb-4">
                  {t('home.cookies.functionalityP1') || 'These cookies allow the website to remember choices you make (such as your preferred language or the region you are in) and provide enhanced, more personal features.'}
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('home.cookies.targetingTitle') || 'Targeting and Advertising Cookies'}</h3>
                <p className="text-gray-700 mb-4">
                  {t('home.cookies.targetingP1') || 'These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.'}
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiGlobe className="text-blue-600 text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.cookies.thirdPartyTitle') || 'Third-Party Cookies'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.cookies.thirdPartyP1') || 'In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may include:'}
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                  <li><strong>{t('home.cookies.thirdPartyL1')?.split(':')[0] || 'Analytics providers'}:</strong> {t('home.cookies.thirdPartyL1')?.split(':')[1] || ' Such as Google Analytics to help us understand how our website is being used'}</li>
                  <li><strong>{t('home.cookies.thirdPartyL2')?.split(':')[0] || 'Social media platforms'}:</strong> {t('home.cookies.thirdPartyL2')?.split(':')[1] || ' When you share our content or visit our pages on platforms like Facebook, Twitter, or LinkedIn'}</li>
                  <li><strong>{t('home.cookies.thirdPartyL3')?.split(':')[0] || 'Advertising networks'}:</strong> {t('home.cookies.thirdPartyL3')?.split(':')[1] || ' Which we use to personalize the ads you may see on our site or others'}</li>
                  <li><strong>{t('home.cookies.thirdPartyL4')?.split(':')[0] || 'Video hosting services'}:</strong> {t('home.cookies.thirdPartyL4')?.split(':')[1] || ' For embedded videos and interactive content'}</li>
                </ul>
                <p className="text-gray-700">
                  {t('home.cookies.thirdPartyP2') || 'Please note that these third parties may have their own privacy policies governing how they use the information they collect. We recommend reviewing their privacy policies if you wish to learn more.'}
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiSettings className="text-blue-600 text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.cookies.managingTitle') || 'Managing Your Cookie Preferences'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.cookies.managingP1') || 'You can manage your cookie preferences in several ways:'}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('home.cookies.browserSettingsTitle') || 'Browser Settings'}</h3>
                <p className="text-gray-700 mb-4">
                  {t('home.cookies.browserSettingsP1') || 'Most web browsers allow you to control cookies through their settings preferences. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit'} <a href="https://www.allaboutcookies.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
                </p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('home.cookies.cookieConsentTitle') || 'Cookie Consent Tool'}</h3>
                <p className="text-gray-700 mb-4">
                  {t('home.cookies.cookieConsentP1') || 'When you first visit our website, you will be presented with a cookie banner that allows you to accept or reject non-essential cookies. You can change your preferences at any time by clicking on the "Cookie Settings" link in the footer of our website.'}
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">{t('home.cookies.noteTitle') || 'Please Note:'}</h4>
                  <p className="text-gray-700">
                    {t('home.cookies.noteP1') || 'Restricting cookies may impact your experience on our website and limit the functionality of certain features. Essential cookies cannot be rejected as they are necessary for the website to function properly.'}
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiAlertTriangle className="text-blue-600 text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.cookies.dntTitle') || 'Do Not Track Signals'}</h2>
                </div>
                <p className="text-gray-700 mb-6">
                  {t('home.cookies.dntP1') || 'Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have your online activities tracked. At this time, we do not respond to browser "Do Not Track" signals, but we do provide you the option to manage your cookie preferences as described above.'}
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiShield className="text-blue-600 text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.cookies.changesTitle') || 'Changes to Our Cookie Policy'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.cookies.changesP1') || 'We may update our Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated revision date. We encourage you to periodically review this page to stay informed about our use of cookies.'}
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <FiDatabase className="text-blue-600 text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.cookies.contactTitle') || 'Contact Us'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.cookies.contactP1') || 'If you have any questions or concerns about our use of cookies or this Cookie Policy, please contact us at:'}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>{t('home.cookies.contactCompany') || 'Uniview Iran'}</strong></p>
                  <p className="text-gray-700 mb-2">{t('home.cookies.contactEmail') || 'Email: info@unv-iran.com'}</p>
                  <p className="text-gray-700 mb-2">{t('home.cookies.contactPhone') || 'Phone: +98 21 XXXX XXXX'}</p>
                  <p className="text-gray-700">{t('home.cookies.contactAddress') || 'Address: [Your Address in Iran]'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-12 mb-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">{t('home.cookies.ctaTitle') || 'Have Questions About Cookies?'}</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                {t('home.cookies.ctaDescription') || 'Our team is here to help answer any questions you may have about our cookie practices or your privacy rights.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center"
                >
                  {t('home.cookies.ctaButton') || 'Contact Our Privacy Team'}
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

export default Cookies;
