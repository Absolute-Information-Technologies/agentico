'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, languages } from '../lib/i18n';
import ThemeToggle from './ThemeToggle';

type HeaderProps = {
  locale: Locale;
  dictionary: any;
};

export default function Header({ locale, dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  
  const lastScrollY = useRef(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);
  
  const navigation = [
    { name: dictionary.navigation.home, href: `/${locale}` },
    { name: dictionary.navigation.solutions, href: `/${locale}/solutions` },
    { name: dictionary.navigation.industries, href: `/${locale}/industries` },
    { name: dictionary.navigation.markets, href: `/${locale}/markets` },
    { name: dictionary.navigation.contact, href: `/${locale}/contact` },
  ];

  // Function to reset the timer
  const resetTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      if (!isHovering && window.scrollY > 100) {
        setIsVisible(false);
      }
    }, 2000);
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show header when scrolling up
      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
      resetTimer();
    };

    // Handle mouse movement
    const handleMouseMove = () => {
      setIsVisible(true);
      resetTimer();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial timer
    resetTimer();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [isHovering]);

  return (
    <>
      {/* Hover detection area at the top of the screen */}
      <div 
        className="fixed top-0 left-0 right-0 h-4 z-50 cursor-default"
        onMouseEnter={() => setIsVisible(true)}
      />
      
      <header 
        className={`bg-[var(--header-bg)] shadow-sm fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href={`/${locale}`}>
                  <Image
                    src="/images/AgenticOrderLogo.png"
                    alt={dictionary.common.company_name}
                    width={200}
                    height={48}
                    className="h-10 w-auto"
                    priority
                  />
                </Link>
              </div>
              <nav className="hidden md:ml-6 md:flex md:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white hover:border-gray-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="hidden md:ml-6 md:flex md:items-center">
              <div className="relative">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-300 bg-[var(--header-bg)] hover:text-gray-700 dark:hover:text-white focus:outline-none"
                  onClick={toggleLanguageMenu}
                >
                  {languages[locale]}
                  <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isLanguageMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-[var(--header-bg)] ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    {Object.entries(languages).map(([key, value]) => (
                      <Link
                        key={key}
                        href={`/${key}`}
                        className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${key === locale ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                        onClick={() => setIsLanguageMenuOpen(false)}
                      >
                        {value}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              <Link
                href={`/${locale}/contact`}
                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                {dictionary.common.contact_us}
              </Link>
            </div>
            
            <div className="flex items-center md:hidden">
              {/* Theme Toggle for Mobile */}
              <ThemeToggle />
              
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                onClick={toggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Image
                  src="/globe.svg"
                  alt="Language"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-gray-200">{languages[locale]}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{dictionary.common.language_selection}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              {Object.entries(languages).map(([key, value]) => (
                <Link
                  key={key}
                  href={`/${key}`}
                  className={`block px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white ${key === locale ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {value}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
} 