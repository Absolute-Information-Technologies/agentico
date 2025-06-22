'use client';

import ContactForm from './ContactForm';
import type { Locale } from '../lib/i18n';
import { useSearchParamsSafe, getParamValue } from '../lib/clientUtils';

type ContactFormWrapperProps = {
  dictionary: any;
  locale: Locale;
};

export default function ContactFormWrapper({ dictionary, locale }: ContactFormWrapperProps) {
  // Use the safe search params hook
  const { params, isLoaded } = useSearchParamsSafe();
  
  // Show loading state until parameters are extracted
  if (!isLoaded) {
    return <div className="text-center py-4">Loading form parameters...</div>;
  }
  
  // Extract form parameters with proper typing
  const isDemo = getParamValue(params, 'demo', false, (value) => value === 'true');
  const solution = getParamValue(params, 'solution', undefined as string | undefined);
  const industry = getParamValue(params, 'industry', undefined as string | undefined);
  const market = getParamValue(params, 'market', undefined as string | undefined);
  
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