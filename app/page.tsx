'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { defaultLocale } from './lib/i18n';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Only redirect once to prevent loops
    const hasRedirected = sessionStorage.getItem('hasRedirected');
    if (!hasRedirected) {
      sessionStorage.setItem('hasRedirected', 'true');
      router.push(`/${defaultLocale}`);
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Agentic Order Inc</h1>
        <p className="text-gray-600">Redirecting to your preferred language...</p>
        </div>
    </div>
  );
}
