'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Track page views
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Simple page view tracking
    const trackPageView = async () => {
      try {
        // In a real application, this would send data to an analytics service
        // like Google Analytics, Plausible, or a custom endpoint
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
      } catch (error) {
        // Don't let analytics errors affect the user experience
        console.error('Analytics error:', error);
      }
    };
    
    // Track the page view
    trackPageView();
    
  }, [pathname, searchParams]);
  
  // This component doesn't render anything
  return null;
} 