"use client";

import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FiShield, FiLock, FiEye, FiAlertTriangle } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const Privacy = () => {
  const { t, dir } = useLanguage();

  // Structured data for rich results
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | حریم خصوصی - Uniview Iran",
    "description": "Learn about Uniview Iran's privacy policy and how we protect your data. Comprehensive information about data collection, usage, and security measures. | سیاست حفظ حریم خصوصی یونی ویو ایران",
    "publisher": {
      "@type": "Organization",
      "name": "Uniview Iran",
      "url": "https://www.uniview-iran.ir"
    },
    "inLanguage": ["en", "fa"],
    "isAccessibleForFree": true,
    "keywords": "privacy policy uniview iran, data protection, security camera privacy, دوربین مداربسته, حریم خصوصی, سیاست حفظ اطلاعات",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.uniview-iran.ir"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Privacy Policy",
          "item": "https://www.uniview-iran.ir/privacy"
        }
      ]
    }
  };

  // Helper function to render HTML content safely
  const renderHTML = (htmlString: string) => {
    return { __html: htmlString };
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
        <section className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {t('home.privacy.heroTitle') || 'Privacy Policy'}
              </span>
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
              {t('home.privacy.heroDescription') || 'Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use Uniview Iran services.'}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-8 mb-16">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiShield className="text-blue-600 text-2xl ltr:mr-3 rtl:ml-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.privacy.introductionTitle') || 'Introduction'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.privacy.introductionP1') || 'Uniview Iran is committed to protecting your privacy and personal information. This Privacy Policy describes how we collect, use, store, and disclose your information when you use our website, products, and services.'}
                </p>
                <p className="text-gray-700">
                  {t('home.privacy.introductionP2') || 'By using our website or services, you consent to the practices described in this Privacy Policy. Please read this policy carefully to understand our practices regarding your information.'}
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiEye className="text-blue-600 text-2xl ltr:mr-3 rtl:ml-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.privacy.infoCollectTitle') || 'Information We Collect'}</h2>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('home.privacy.infoCollectPersonalTitle') || 'Personal Information'}</h3>
                <p className="text-gray-700 mb-4">
                  {t('home.privacy.infoCollectPersonalP1') || 'We may collect the following types of personal information:'}
                </p>
                <ul className="list-disc ltr:pl-6 rtl:pr-6 text-gray-700 mb-6 space-y-2">
                  <li>{t('home.privacy.infoCollectPersonalL1') || 'Contact information (name, email address, phone number, company name)'}</li>
                  <li>{t('home.privacy.infoCollectPersonalL2') || 'Account information if you create an account with us'}</li>
                  <li>{t('home.privacy.infoCollectPersonalL3') || 'Location information when you use our services'}</li>
                  <li>{t('home.privacy.infoCollectPersonalL4') || 'Information you provide when you contact our support team'}</li>
                  <li>{t('home.privacy.infoCollectPersonalL5') || 'Information you provide when requesting a demo or consultation'}</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('home.privacy.infoCollectUsageTitle') || 'Usage Information'}</h3>
                <p className="text-gray-700 mb-4">
                  {t('home.privacy.infoCollectUsageP1') || 'We automatically collect information about your interactions with our website:'}
                </p>
                <ul className="list-disc ltr:pl-6 rtl:pr-6 text-gray-700 mb-6 space-y-2">
                  <li>{t('home.privacy.infoCollectUsageL1') || 'Log data (IP address, browser type, pages visited, time spent on pages)'}</li>
                  <li>{t('home.privacy.infoCollectUsageL2') || 'Device information (device type, operating system)'}</li>
                  <li>{t('home.privacy.infoCollectUsageL3') || 'Cookies and similar tracking technologies'}</li>
                </ul>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiLock className="text-blue-600 text-2xl ltr:mr-3 rtl:ml-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.privacy.howUseTitle') || 'How We Use Your Information'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.privacy.howUseP1') || 'We use your information for the following purposes:'}
                </p>
                <ul className="list-disc ltr:pl-6 rtl:pr-6 text-gray-700 mb-6 space-y-2">
                  <li>{t('home.privacy.howUseL1') || 'To provide, maintain, and improve our products and services'}</li>
                  <li>{t('home.privacy.howUseL2') || 'To process and fulfill your requests, orders, and transactions'}</li>
                  <li>{t('home.privacy.howUseL3') || 'To communicate with you about our products, services, and promotions'}</li>
                  <li>{t('home.privacy.howUseL4') || 'To personalize your experience and provide tailored content'}</li>
                  <li>{t('home.privacy.howUseL5') || 'To analyze usage patterns and improve our website functionality'}</li>
                  <li>{t('home.privacy.howUseL6') || 'To protect the security and integrity of our services'}</li>
                  <li>{t('home.privacy.howUseL7') || 'To comply with legal obligations'}</li>
                </ul>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiAlertTriangle className="text-blue-600 text-2xl ltr:mr-3 rtl:ml-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.privacy.sharingTitle') || 'Sharing and Disclosure'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.privacy.sharingP1') || 'We may share your information with:'}
                </p>
                <ul className="list-disc ltr:pl-6 rtl:pr-6 text-gray-700 mb-6 space-y-2">
                  <li>{t('home.privacy.sharingL1') || 'Service providers who perform services on our behalf'}</li>
                  <li>{t('home.privacy.sharingL2') || 'Business partners and affiliates who help us provide our services'}</li>
                  <li>{t('home.privacy.sharingL3') || 'Legal authorities when required by law or to protect our rights'}</li>
                  <li>{t('home.privacy.sharingL4') || 'In connection with a business transaction such as a merger or acquisition'}</li>
                </ul>
                <p className="text-gray-700">
                  {t('home.privacy.sharingP2') || 'We do not sell or rent your personal information to third parties for their marketing purposes without your explicit consent.'}
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiShield className="text-blue-600 text-2xl ltr:mr-3 rtl:ml-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.privacy.rightsTitle') || 'Your Rights and Choices'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.privacy.rightsP1') || 'Depending on your location, you may have certain rights regarding your personal information:'}
                </p>
                <ul className="list-disc ltr:pl-6 rtl:pr-6 text-gray-700 mb-6 space-y-2">
                  <li>{t('home.privacy.rightsL1') || 'Access and review the personal information we hold about you'}</li>
                  <li>{t('home.privacy.rightsL2') || 'Correct inaccurate or incomplete information'}</li>
                  <li>{t('home.privacy.rightsL3') || 'Request deletion of your personal information'}</li>
                  <li>{t('home.privacy.rightsL4') || 'Object to or restrict certain processing activities'}</li>
                  <li>{t('home.privacy.rightsL5') || 'Data portability (receiving your data in a structured format)'}</li>
                  <li>{t('home.privacy.rightsL6') || 'Withdraw consent where processing is based on consent'}</li>
                </ul>
                <p className="text-gray-700">
                  {t('home.privacy.rightsP2') || 'To exercise these rights, please contact us using the information provided at the end of this policy.'}
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiLock className="text-blue-600 text-2xl ltr:mr-3 rtl:ml-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.privacy.securityTitle') || 'Data Security'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.privacy.securityP1') || 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, accidental loss, alteration, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.'}
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiEye className="text-blue-600 text-2xl ltr:mr-3 rtl:ml-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.privacy.cookiesTitle') || 'Cookies and Tracking Technologies'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.privacy.cookiesP1') || 'Our website uses cookies and similar tracking technologies to collect information about your browsing activities. Cookies are small text files stored on your device that help us provide and improve our services.'}
                </p>
                <p className="text-gray-700 mb-4">
                  {t('home.privacy.cookiesP2') || 'We use the following types of cookies:'}
                </p>
                <ul className="list-disc ltr:pl-6 rtl:pr-6 text-gray-700 mb-6 space-y-2">
                  {/* Use dangerouslySetInnerHTML for list items containing HTML */}
                  <li dangerouslySetInnerHTML={renderHTML(t('home.privacy.cookiesL1') || '<strong>Essential cookies:</strong> Required for the website to function properly')} />
                  <li dangerouslySetInnerHTML={renderHTML(t('home.privacy.cookiesL2') || '<strong>Analytical/performance cookies:</strong> Help us understand how visitors interact with our website')} />
                  <li dangerouslySetInnerHTML={renderHTML(t('home.privacy.cookiesL3') || '<strong>Functionality cookies:</strong> Remember choices you make and provide enhanced features')} />
                  <li dangerouslySetInnerHTML={renderHTML(t('home.privacy.cookiesL4') || '<strong>Targeting cookies:</strong> Deliver more relevant advertisements and marketing')} />
                </ul>
                <p className="text-gray-700">
                  {t('home.privacy.cookiesP3') || 'You can manage your cookie preferences through your browser settings. However, disabling certain cookies may impact your experience on our website.'}
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiShield className="text-blue-600 text-2xl ltr:mr-3 rtl:ml-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.privacy.childrenTitle') || "Children's Privacy"}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.privacy.childrenP1') || 'Our website and services are not directed to children under the age of 16. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us, and we will promptly delete the information.'}
                </p>
              </div>

              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <FiAlertTriangle className="text-blue-600 text-2xl ltr:mr-3 rtl:ml-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.privacy.changesTitle') || 'Changes to This Policy'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.privacy.changesP1') || 'We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website with a revised effective date. We encourage you to review this policy periodically.'}
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <FiLock className="text-blue-600 text-2xl ltr:mr-3 rtl:ml-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('home.privacy.contactTitle') || 'Contact Us'}</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('home.privacy.contactP1') || 'If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:'}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>{t('home.privacy.contactCompany') || 'Uniview Iran'}</strong></p>
                  <p className="text-gray-700 mb-2">{t('home.privacy.contactEmail') || 'Email: info@unv-iran.com'}</p>
                  <p className="text-gray-700 mb-2">{t('home.privacy.contactPhone') || 'Phone: +98 21 XXXX XXXX'}</p>
                  <p className="text-gray-700">{t('home.privacy.contactAddress') || 'Address: [Your Address in Iran]'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-12 mb-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-6">{t('home.privacy.ctaTitle') || 'Have Questions About Your Privacy?'}</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                {t('home.privacy.ctaDescription') || 'Our team is here to help answer any questions you may have about our privacy practices or your rights.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center"
                >
                  {t('home.privacy.ctaButton') || 'Contact Our Privacy Team'}
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

export default Privacy;
