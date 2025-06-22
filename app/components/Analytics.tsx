'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSearchParamsSafe } from '../lib/clientUtils';

export default function Analytics() {
  const pathname = usePathname();
  const { params, isLoaded } = useSearchParamsSafe();
  
  useEffect(() => {
    // Only track after params are loaded
    if (!isLoaded) return;
    
    // Track page views
    const searchParamsString = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => [key, value as string])
    ).toString();
    
    const url = pathname + (searchParamsString ? `?${searchParamsString}` : '');
    
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
    
  }, [pathname, params, isLoaded]);
  
  // This component doesn't render anything
  return null;
} 