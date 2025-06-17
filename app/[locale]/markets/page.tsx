import { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '../../lib/getDictionary';
import { Locale, markets } from '../../lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  
  return {
    title: `${dictionary.navigation.markets} | ${dictionary.common.company_name}`,
    description: `${dictionary.common.company_name} provides AI-driven automation solutions for businesses across global markets.`,
  };
}

export default async function MarketsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  
  // Market data - in a real application, this would come from a database or API
  const marketData = {
    'united-states': {
      name: 'United States',
      flag: '🇺🇸',
      description: 'The largest market for AI-powered automation solutions with a focus on customer experience and operational efficiency.',
    },
    'canada': {
      name: 'Canada',
      flag: '🇨🇦',
      description: 'A growing market for AI solutions with strong adoption in hospitality and healthcare sectors.',
    },
    'united-kingdom': {
      name: 'United Kingdom',
      flag: '🇬🇧',
      description: 'Leading European market for voice-first AI solutions with strong regulatory frameworks.',
    },
    'germany': {
      name: 'Germany',
      flag: '🇩🇪',
      description: 'Europe\'s largest economy with significant investments in AI and automation technologies.',
    },
    'france': {
      name: 'France',
      flag: '🇫🇷',
      description: 'Growing adoption of AI solutions in hospitality, retail, and professional services.',
    },
    'india': {
      name: 'India',
      flag: '🇮🇳',
      description: 'Rapidly growing market with high demand for multilingual AI solutions across various sectors.',
    },
    'mexico': {
      name: 'Mexico',
      flag: '🇲🇽',
      description: 'Emerging market with strong growth in retail and hospitality AI adoption.',
    },
    'brazil': {
      name: 'Brazil',
      flag: '🇧🇷',
      description: 'South America\'s largest economy with increasing investment in service automation.',
    },
    'japan': {
      name: 'Japan',
      flag: '🇯🇵',
      description: 'Advanced market with high adoption of AI technologies for customer service and operational efficiency.',
    },
    'australia': {
      name: 'Australia',
      flag: '🇦🇺',
      description: 'Strong market for AI solutions in hospitality, healthcare, and professional services.',
    },
    'south-korea': {
      name: 'South Korea',
      flag: '🇰🇷',
      description: 'Technologically advanced market with high demand for AI-powered automation.',
    },
    'south-africa': {
      name: 'South Africa',
      flag: '🇿🇦',
      description: 'Leading African market for AI solutions with growing adoption across multiple sectors.',
    },
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {dictionary.navigation.markets}
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          Our AI solutions are deployed across global markets, with localized support and compliance with regional regulations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {markets.map((market) => {
          const data = marketData[market as keyof typeof marketData];
          if (!data) return null;
          
          return (
            <Link
              key={market}
              href={`/${locale}/markets/${market}`}
              className="group"
            >
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{data.flag}</span>
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600">{data.name}</h2>
                </div>
                <p className="text-gray-600">{data.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-16 bg-blue-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Solutions, Local Expertise</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our solutions are designed to work globally while being adaptable to local languages, regulations, and business practices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Multilingual Support</h3>
            <p className="text-gray-600">
              Our AI solutions support multiple languages and dialects to provide seamless communication across global markets.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Regulatory Compliance</h3>
            <p className="text-gray-600">
              We ensure our solutions comply with local data protection and privacy regulations in each market we serve.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Local Integration</h3>
            <p className="text-gray-600">
              Our solutions integrate with local business systems and payment processors to provide a seamless experience.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          {dictionary.common.contact_us}
        </Link>
      </div>
    </div>
  );
} 