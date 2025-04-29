import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FiGlobe, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Define the Language type
type Language = 'en' | 'fa';

interface LanguageSwitcherProps {
  className?: string;
  iconClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  mobileLayout?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  iconClassName = '',
  dropdownClassName = '',
  optionClassName = '',
  mobileLayout = false
}) => {
  const { language, setLanguage, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  // Get language display names
  const languages = [
    { code: 'fa', name: 'فارسی', flag: '🇮🇷', direction: 'rtl' },
    { code: 'en', name: 'English', flag: '🇺🇸', direction: 'ltr' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[1];
  
  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fa')) {
      setLanguage(savedLanguage as Language);
    } else {
      // If no saved language, default to Farsi
      setLanguage('fa');
      localStorage.setItem('preferredLanguage', 'fa');
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setFocusedIndex(-1);
  };

  const handleLanguageChange = (code: string) => {
    setLanguage(code as Language);
    setIsOpen(false);
    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', code);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex(prev => Math.min(prev + 1, languages.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        handleLanguageChange(languages[focusedIndex].code);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, languages]);

  // Focus the option when focusedIndex changes
  useEffect(() => {
    if (focusedIndex >= 0) {
      const options = dropdownRef.current?.querySelectorAll('[role="menuitem"]');
      if (options && options[focusedIndex]) {
        (options[focusedIndex] as HTMLElement).focus();
      }
    }
  }, [focusedIndex]);

  // Drop-down animation variants
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transformOrigin: dir === 'rtl' ? 'top left' : 'top right'
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      y: -5, 
      scale: 0.95,
      transition: { 
        duration: 0.15,
        ease: "easeInOut"
      }
    }
  };
  
  // Option animation variants
  const optionVariants = {
    hidden: { opacity: 0, x: dir === 'rtl' ? -20 : 20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className={`relative ${dir === 'rtl' ? 'text-right' : 'text-left'}`} ref={dropdownRef}>
      <motion.button
        ref={buttonRef}
        className={`flex items-center gap-2 rounded-lg transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-60 ${className}`}
        onClick={toggleDropdown}
        whileTap={{ scale: 0.97 }}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title={`Change language (current: ${currentLanguage.name})`}
        data-tooltip-content={`Select a language`}
      >
        <div className="relative">
          <FiGlobe className={`flex-shrink-0 ${iconClassName}`} />
          <motion.span
            initial={false}
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full opacity-0"
            style={{ opacity: language !== 'en' ? 0.8 : 0 }}
          />
        </div>
        <span className={`truncate ${dir === 'rtl' ? 'mr-1' : 'ml-1'}`}>{currentLanguage.name}</span>
        {!mobileLayout && (
          <motion.svg
            className="h-4 w-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </motion.svg>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={`absolute z-50 ${dir === 'rtl' ? 'left-0' : 'right-0'} mt-2 py-2 min-w-[160px] bg-white rounded-lg shadow-lg border border-gray-100 ${dropdownClassName}`}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="menu"
            aria-orientation="vertical"
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                custom={index}
                variants={optionVariants}
                initial="hidden"
                animate="visible"
                className={`w-full ${lang.direction === 'rtl' ? 'text-right' : 'text-left'} px-4 py-3 flex items-center justify-between transition-colors duration-200 ${optionClassName} ${
                  lang.code === language 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                } ${focusedIndex === index ? 'ring-2 ring-blue-300 ring-opacity-60' : ''}`}
                onClick={() => handleLanguageChange(lang.code)}
                onFocus={() => setFocusedIndex(index)}
                whileHover={{ x: dir === 'rtl' ? -4 : 4, backgroundColor: lang.code === language ? "rgba(219, 234, 254, 1)" : "rgba(249, 250, 251, 1)" }}
                transition={{ duration: 0.1 }}
                role="menuitem"
                tabIndex={0}
                dir={lang.direction}
              >
                <div className={`flex items-center gap-2 ${lang.direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
                {lang.code === language && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <FiCheck className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
