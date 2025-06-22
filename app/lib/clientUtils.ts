'use client';

/**
 * Client-side utilities for Next.js 15 compatibility
 */

import { useSearchParams as useNextSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * A hook that safely extracts search parameters with proper state management
 * to avoid hydration mismatches and ensure Next.js 15 compatibility
 */
export function useSearchParamsSafe() {
  const searchParams = useNextSearchParams();
  const [params, setParams] = useState<Record<string, string | null>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Extract all search parameters
    const extractedParams: Record<string, string | null> = {};
    
    // Use Array.from to iterate over URLSearchParams entries
    if (searchParams) {
      searchParams.forEach((value, key) => {
        extractedParams[key] = value;
      });
    }
    
    setParams(extractedParams);
    setIsLoaded(true);
  }, [searchParams]);

  return { params, isLoaded };
}

/**
 * Helper to get typed search parameters with default values
 */
export function getParamValue<T>(
  params: Record<string, string | null>,
  key: string, 
  defaultValue: T,
  transform?: (value: string) => T
): T {
  const value = params[key];
  if (value === null || value === undefined) return defaultValue;
  return transform ? transform(value) : value as unknown as T;
} 