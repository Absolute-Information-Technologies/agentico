'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Only track after component mounts
    if (!searchParams) return;
    
    // Track page views
    const searchParamsString = searchParams.toString();
    const url = pathname + (searchParamsString ? `?${searchParamsString}` : '');
    
    // Simulate analytics tracking
    console.log(`Page view: ${url}`);
    
    // Example of how you would send this to a real analytics service:
    /*
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'pageview',
        url,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        screenWidth: window.innerWidth,
        language: navigator.language,
      }),
    });
    */
  }, [pathname, searchParams]);
  
  // This component doesn't render anything
  return null;
} 