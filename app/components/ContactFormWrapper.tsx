'use client';

import { useSearchParams } from 'next/navigation';
import ContactForm from './ContactForm';
import type { Locale } from '../lib/i18n';

type ContactFormWrapperProps = {
  dictionary: any;
  locale: Locale;
};

export default function ContactFormWrapper({ dictionary, locale }: ContactFormWrapperProps) {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';
  const solution = searchParams.get('solution') || undefined;
  const industry = searchParams.get('industry') || undefined;
  const market = searchParams.get('market') || undefined;

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