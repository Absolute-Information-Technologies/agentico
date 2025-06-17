import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { languages, Locale, generateHrefLangLinks } from "../lib/i18n";
import { getDictionary } from "../lib/getDictionary";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Analytics from '../components/Analytics';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return Object.keys(languages).map((locale) => ({ locale }));
}

interface MetadataProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ 
  params 
}: MetadataProps): Promise<Metadata> {
  // Get locale from params
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);
  
  return {
    title: {
      default: dictionary.common.company_name,
      template: `%s | ${dictionary.common.company_name}`,
    },
    description: dictionary.common.tagline,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en-US': '/en-US',
        'fr': '/fr',
        'de': '/de',
        'es': '/es',
        'pt': '/pt',
        'hi': '/hi',
        'ja': '/ja',
        'pa': '/pa',
      },
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  // Get locale from params
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {generateHrefLangLinks('').map(({ href, hrefLang }) => (
          <link
            key={hrefLang}
            rel="alternate"
            hrefLang={hrefLang}
            href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://agenticorder.com'}${href}`}
          />
        ))}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <Header locale={locale as Locale} dictionary={dictionary} />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer locale={locale as Locale} dictionary={dictionary} />
          <Analytics />
        </div>
      </body>
    </html>
  );
} 