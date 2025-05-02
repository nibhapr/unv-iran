import { useLanguage } from '../../context/LanguageContext';
import { FiMail, FiPhone } from 'react-icons/fi';
import LanguageSwitcher from './LanguageSwitcher';

const TopBar = () => {
  const { t, dir } = useLanguage();

  return (
    <div dir={dir} className="bg-blue-50 py-2 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          {/* Contact Links - Responsive layout for mobile */}
          <div className="flex flex-wrap items-center gap-3 xs:gap-4 sm:space-x-4 rtl:space-x-reverse">
            <a 
              href="mailto:info@unv-iran.com" 
              className="flex items-center text-gray-600 hover:text-blue-600 text-xs sm:text-sm transition-colors"
              aria-label="Email Us"
            >
              <span className="bg-gray-50 p-1.5 rounded-full mr-1.5 rtl:ml-1.5 rtl:mr-0 flex-shrink-0">
                <FiMail className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
              <span className="hidden xs:inline">{t('header.email')}</span>
            </a>
            <a 
              href="tel:+15551234567" 
              className="flex items-center text-gray-600 hover:text-blue-600 text-xs sm:text-sm transition-colors"
              aria-label="Call Us"
            >
              <span className="bg-gray-50 p-1.5 rounded-full mr-1.5 rtl:ml-1.5 rtl:mr-0 flex-shrink-0">
                <FiPhone className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
              <span className="hidden xs:inline">{t('header.phone')}</span>
            </a>
          </div>
          
          {/* Language Switcher - Always visible */}
          <div className="py-1">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 