import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary, Dictionary } from '../../../lib/getDictionary';
import { Locale } from '../../../lib/i18n';
import { notFound } from 'next/navigation';
import RoiCalculator from '../../../components/RoiCalculator';

type MetadataProps = {
  params: Promise<{ locale: string; solution: string }>;
}

export async function generateMetadata({ 
  params 
}: MetadataProps): Promise<Metadata> {
  // Get locale and solution from params
  const { locale, solution } = await params;
  const dictionary = await getDictionary(locale as Locale);
  
  // Check if solution exists
  if (!dictionary.solutions[solution]) {
    return {
      title: 'Solution Not Found',
    };
  }
  
  return {
    title: dictionary.solutions[solution].name,
    description: dictionary.solutions[solution].description,
  };
}

export async function generateStaticParams() {
  // Generate all combinations of locales and solutions
  const solutions = ['orderlyai', 'hotelierai', 'healthcareai', 'retailai', 'scheduleai', 'supportai', 'legalai', 'propertyai'];
  const locales = ['en-US', 'fr', 'de', 'es', 'pt', 'hi', 'ja', 'pa'];
  
  return locales.flatMap(locale => 
    solutions.map(solution => ({
      locale,
      solution,
    }))
  );
}

interface SolutionPageProps {
  params: Promise<{ locale: string; solution: string }>;
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  // Get locale and solution from params
  const { locale, solution } = await params;
  const dictionary = await getDictionary(locale as Locale);
  
  // Check if solution exists
  if (!dictionary.solutions[solution]) {
    notFound();
  }
  
  const solutionData = dictionary.solutions[solution];
  
  // Get industries for this solution
  const industryBySolution: Record<string, string[]> = {
    'orderlyai': ['restaurants'],
    'hotelierai': ['hospitality'],
    'healthcareai': ['healthcare'],
    'retailai': ['retail'],
    'scheduleai': ['healthcare', 'legal', 'real-estate', 'education'],
    'supportai': ['retail', 'call-centers'],
    'legalai': ['legal'],
    'propertyai': ['real-estate']
  };
  
  const solutionIndustries = industryBySolution[solution] || [];
  
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {solutionData.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {solutionData.subtitle}
              </p>
              <Link 
                href={`/${locale}/contact`} 
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium inline-block"
              >
                {dictionary.common.contact_us}
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-64 h-64 relative">
                <Image
                  src={`/images/solutions/${solution}.svg`}
                  alt={solutionData.name}
                  width={256}
                  height={256}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Description Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {dictionary.common.overview}
            </h2>
            <p className="text-lg mb-8">
              {solutionData.description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {dictionary.common.key_features}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutionData.features?.map((feature: string, index: number) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p>{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Industries Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {dictionary.common.industries_served}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {solutionIndustries.map((industryId) => {
              const industry = dictionary.industries[industryId];
              if (!industry) return null;
              
              return (
                <Link 
                  href={`/${locale}/solutions/${solution}/${industryId}`}
                  key={industryId}
                  className="bg-card hover:bg-card/80 p-6 rounded-lg shadow-md transition-all group text-center"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {industry.name}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl bg-primary text-white p-8 md:p-12 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            {dictionary.common.ready_to_start}
          </h2>
          <p className="text-lg text-center mb-8 opacity-90">
            {dictionary.common.contact_for_demo}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href={`/${locale}/contact`} 
              className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-md font-medium text-center"
            >
              {dictionary.common.contact_us}
            </Link>
            <Link 
              href={`/${locale}/industries`} 
              className="bg-transparent hover:bg-white/10 border border-white px-6 py-3 rounded-md font-medium text-center"
            >
              {dictionary.common.explore_industries}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 