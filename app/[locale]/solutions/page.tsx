import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '../../lib/getDictionary';
import { Locale, solutions } from '../../lib/i18n';

type Params = { locale: string };

export async function generateMetadata(
  props: { params: Params },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await the params
  const params = props.params;
  const { locale } = params;
  
  // Get dictionary data
  const dictionary = await getDictionary(locale as Locale);
  
  return {
    title: `${dictionary.navigation.solutions} | ${dictionary.common.company_name}`,
    description: `${dictionary.common.company_name} offers AI-driven automation solutions for high-volume service industries.`,
  };
}

interface SolutionsPageProps {
  params: { locale: string };
}

export default async function SolutionsPage({ params }: SolutionsPageProps) {
  const { locale } = params;
  const dictionary = await getDictionary(locale as Locale);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {dictionary.navigation.solutions}
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          Our AI-driven automation solutions enhance customer service, improve operational efficiency, and drive revenue growth across multiple industries.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(dictionary.solutions).map(([key, solution]: [string, any]) => (
          <div key={key} className="bg-white p-8 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-6">
              <Image
                src={`/images/solutions/${key}.svg`}
                alt={solution.name}
                width={60}
                height={60}
                className="h-auto w-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{solution.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{solution.subtitle}</p>
            <p className="text-gray-600 mb-6">{solution.description}</p>
            
            {solution.features && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {solution.features.slice(0, 3).map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex items-center justify-between mt-4">
              <Link
                href={`/${locale}/solutions/${key}`}
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                {dictionary.common.learn_more}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link
                href={`/${locale}/contact?solution=${key}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                {dictionary.common.request_demo}
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our AI solutions can be tailored to meet your specific business needs and integrated with your existing systems.
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