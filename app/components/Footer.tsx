'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '../lib/i18n';

type FooterProps = {
  locale: Locale;
  dictionary: any;
};

export default function Footer({ locale, dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  // Safely access nested properties
  const getNestedValue = (obj: any, path: string, fallback: string): string => {
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        return fallback;
      }
    }
    
    return typeof result === 'string' ? result : fallback;
  };
  
  const navigation = {
    solutions: [
      { name: 'OrderlyAi', href: `/${locale}/solutions/orderlyai` },
      { name: 'HotelierAi', href: `/${locale}/solutions/hotelierai` },
      { name: 'HealthcareAi', href: `/${locale}/solutions/healthcareai` },
      { name: 'RetailAi', href: `/${locale}/solutions/retailai` },
      { name: 'ScheduleAi', href: `/${locale}/solutions/scheduleai` },
      { name: 'SupportAi', href: `/${locale}/solutions/supportai` },
      { name: 'LegalAi', href: `/${locale}/solutions/legalai` },
      { name: 'PropertyAi', href: `/${locale}/solutions/propertyai` },
    ],
    industries: [
      { name: getNestedValue(dictionary, 'industries.restaurants.name', 'Restaurants'), href: `/${locale}/industries/restaurants` },
      { name: getNestedValue(dictionary, 'industries.hospitality.name', 'Hospitality'), href: `/${locale}/industries/hospitality` },
      { name: getNestedValue(dictionary, 'industries.healthcare.name', 'Healthcare'), href: `/${locale}/industries/healthcare` },
      { name: getNestedValue(dictionary, 'industries.retail.name', 'Retail'), href: `/${locale}/industries/retail` },
      { name: getNestedValue(dictionary, 'industries.legal.name', 'Legal Services'), href: `/${locale}/industries/legal` },
      { name: getNestedValue(dictionary, 'industries.real_estate.name', 'Real Estate'), href: `/${locale}/industries/real-estate` },
      { name: getNestedValue(dictionary, 'industries.call_centers.name', 'Call Centers'), href: `/${locale}/industries/call-centers` },
      { name: getNestedValue(dictionary, 'industries.education.name', 'Education'), href: `/${locale}/industries/education` },
    ],
    company: [
      { name: getNestedValue(dictionary, 'navigation.about', 'About'), href: `/${locale}/about` },
      { name: getNestedValue(dictionary, 'navigation.markets', 'Markets'), href: `/${locale}/markets` },
      { name: getNestedValue(dictionary, 'navigation.contact', 'Contact'), href: `/${locale}/contact` },
    ],
  };

  return (
    <footer className="bg-[var(--footer-bg)] border-t border-gray-200 dark:border-gray-700" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {getNestedValue(dictionary, 'common.footer', 'Footer')}
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href={`/${locale}`}>
              <Image
                src="/images/AgenticOrderLogo.png"
                alt={getNestedValue(dictionary, 'common.company_name', 'Agentic Order Inc')}
                width={200}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-base">
              {getNestedValue(dictionary, 'common.company_description', getNestedValue(dictionary, 'common.tagline', 'AI-driven automation for high-volume service industries'))}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider uppercase">
                  {getNestedValue(dictionary, 'navigation.solutions', 'Solutions')}
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider uppercase">
                  {getNestedValue(dictionary, 'navigation.industries', 'Industries')}
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.industries.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider uppercase">
                  {getNestedValue(dictionary, 'navigation.company', 'Company')}
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider uppercase">
                  {getNestedValue(dictionary, 'common.legal', 'Legal')}
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href={`/${locale}/privacy`} className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      {getNestedValue(dictionary, 'common.privacy', 'Privacy Policy')}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/terms`} className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      {getNestedValue(dictionary, 'common.terms', 'Terms of Service')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-base text-gray-500 dark:text-gray-400 text-center">
            &copy; {currentYear} {getNestedValue(dictionary, 'common.company_name', 'Agentic Order Inc')}. {getNestedValue(dictionary, 'common.all_rights_reserved', 'All rights reserved.')}
          </p>
        </div>
      </div>
    </footer>
  );
} 