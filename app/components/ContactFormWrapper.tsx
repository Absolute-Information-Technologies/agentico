'use client';

import ContactForm from './ContactForm';
import type { Locale } from '../lib/i18n';

type ContactFormWrapperProps = {
  dictionary: any;
  locale: Locale;
  // Add direct props instead of using search params
  isDemo?: boolean;
  solution?: string;
  industry?: string;
  market?: string;
};

export default function ContactFormWrapper({ 
  dictionary, 
  locale,
  isDemo = false,
  solution,
  industry,
  market
}: ContactFormWrapperProps) {
  // No longer using search params directly
  return (
    <ContactForm
      dictionary={dictionary}
      locale={locale}
      isDemo={isDemo}
      solution={solution}
      industry={industry}
      market={market}
    />
  );
} 