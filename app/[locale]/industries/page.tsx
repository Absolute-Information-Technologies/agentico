import { Metadata } from 'next';
import Link from 'next/link';
import { getDictionary } from '../../lib/getDictionary';
import { Locale, industries } from '../../lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  
  return {
    title: `${dictionary.navigation.industries} | ${dictionary.common.company_name}`,
    description: `${dictionary.common.company_name} serves multiple industries with AI-driven automation solutions.`,
  };
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {dictionary.navigation.industries}
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          Our AI solutions are tailored to meet the specific needs of various industries, enhancing customer service and operational efficiency.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(dictionary.industries).map(([key, industry]: [string, any]) => (
          <div key={key} className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{industry.name}</h2>
            <p className="text-gray-600 mb-6">{industry.description}</p>
            
            {industry.challenges && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Common Challenges</h3>
                <ul className="space-y-2">
                  {industry.challenges.slice(0, 3).map((challenge: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-600">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {industry.solutions && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Our Solutions</h3>
                <ul className="space-y-2">
                  {industry.solutions.slice(0, 3).map((solution: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-4">
              <Link
                href={`/${locale}/industries/${key}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {dictionary.common.learn_more} →
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Not Sure Which Industry Fits Your Business?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Contact our team to discuss your specific needs and discover how our AI solutions can be tailored to your business.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            {dictionary.common.contact_us}
          </Link>
        </div>
      </div>
    </div>
  );
} 