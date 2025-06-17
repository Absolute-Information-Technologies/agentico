import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Locale } from '../../../lib/i18n';
import { getDictionary, Dictionary, IndustryData as DictIndustryData } from '../../../lib/getDictionary';
import RoiCalculator from '../../../components/RoiCalculator';

// Define types for industry data if needed
interface IndustryData extends DictIndustryData {
  // Add any additional properties if needed
}

type Params = Promise<{ locale: string; industry: string }>;

export async function generateMetadata(
  props: { params: Params },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await the params
  const params = await props.params;
  const { locale, industry } = params;
  
  // Get dictionary data
  const dictionary = await getDictionary(locale as Locale);
  
  // Check if industry exists
  if (!dictionary.industries[industry]) {
    return {
      title: 'Industry Not Found',
    };
  }
  
  return {
    title: dictionary.industries[industry].name,
    description: dictionary.industries[industry].description,
  };
}

export async function generateStaticParams() {
  // Generate all combinations of locales and industries
  const industries = ['restaurants', 'hospitality', 'healthcare', 'retail', 'legal', 'real-estate', 'call-centers', 'education'];
  const locales = ['en-US', 'fr', 'de', 'es', 'pt', 'hi', 'ja', 'pa'];
  
  return locales.flatMap(locale => 
    industries.map(industry => ({
      locale,
      industry,
    }))
  );
}

interface IndustryPageProps {
  params: Promise<{ locale: string; industry: string }>;
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  // Get locale and industry from params
  const { locale, industry } = await params;
  const dictionary = await getDictionary(locale as Locale);
  
  // Check if industry exists
  if (!dictionary.industries[industry]) {
    notFound();
  }
  
  const industryData = dictionary.industries[industry];
  
  // Get solutions for this industry
  const solutionsByIndustry: Record<string, string[]> = {
    'restaurants': ['orderlyai'],
    'hospitality': ['hotelierai'],
    'healthcare': ['healthcareai', 'scheduleai'],
    'retail': ['retailai', 'supportai'],
    'legal': ['legalai', 'scheduleai'],
    'real-estate': ['propertyai', 'scheduleai'],
    'call-centers': ['supportai'],
    'education': ['scheduleai']
  };
  
  const industrySolutions = solutionsByIndustry[industry] || [];
  
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {industryData.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {industryData.description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Challenges Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {dictionary.common.industry_challenges}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industryData.challenges?.map((challenge: string, index: number) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p>{challenge}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Solutions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {dictionary.common.our_solutions}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industrySolutions.map((solutionId) => {
              const solution = dictionary.solutions[solutionId];
              if (!solution) return null;
              
              return (
                <Link 
                  href={`/${locale}/solutions/${solutionId}/${industry}`}
                  key={solutionId}
                  className="bg-card hover:bg-card/80 p-6 rounded-lg shadow-md transition-all group"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 mr-4 flex-shrink-0">
                      <Image
                        src={`/images/solutions/${solutionId}.svg`}
                        alt={solution.name}
                        width={48}
                        height={48}
                      />
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {solution.name}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {solution.subtitle}
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>{dictionary.common.learn_more}</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-4xl bg-primary text-white p-8 md:p-12 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            {dictionary.common.ready_to_transform}
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
              href={`/${locale}/solutions`} 
              className="bg-transparent hover:bg-white/10 border border-white px-6 py-3 rounded-md font-medium text-center"
            >
              {dictionary.common.explore_solutions}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Add ISR configuration
export const revalidate = 3600; // Revalidate every hour 