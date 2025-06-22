'use client';

import { Suspense } from 'react';
import ContactFormWrapper from './ContactFormWrapper';
import type { Locale } from '../lib/i18n';

type ContactPageClientProps = {
  dictionary: any;
  locale: Locale;
};

export default function ContactPageClient({ dictionary, locale }: ContactPageClientProps) {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading contact form...</div>}>
      <ContactFormWrapper 
        dictionary={dictionary} 
        locale={locale} 
      />
    </Suspense>
  );
} 