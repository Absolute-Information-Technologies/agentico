'use client';

import { Suspense } from 'react';
import ContactFormWrapper from './ContactFormWrapper';
import type { Locale } from '../lib/i18n';
import { useSearchParams } from 'next/navigation';

type ContactPageClientProps = {
  dictionary: any;
  locale: Locale;
};

export default function ContactPageClient({ dictionary, locale }: ContactPageClientProps) {
  // Get search params directly in this client component
  const searchParams = useSearchParams();
  
  // Extract parameters with proper typing
  const isDemo = searchParams?.get('demo') === 'true';
  const solution = searchParams?.get('solution') || undefined;
  const industry = searchParams?.get('industry') || undefined;
  const market = searchParams?.get('market') || undefined;
  
  return (
    <Suspense fallback={<div className="text-center py-10">Loading contact form...</div>}>
      <ContactFormWrapper 
        dictionary={dictionary} 
        locale={locale}
        isDemo={isDemo}
        solution={solution}
        industry={industry}
        market={market}
      />
    </Suspense>
  );
} 