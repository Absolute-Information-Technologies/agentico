import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, languages } from './app/lib/i18n';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip public files and API routes
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // Check if the pathname is the root (/)
  if (pathname === '/') {
    // Redirect to the default locale
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }
  
  // Check if the pathname starts with a locale
  const pathnameHasLocale = Object.keys(languages).some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If the pathname doesn't have a locale, redirect to the default locale
  if (!pathnameHasLocale) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }
  
  // Continue with the request if it already has a locale
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|images).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}; 