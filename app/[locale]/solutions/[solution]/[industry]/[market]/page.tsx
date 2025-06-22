import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDictionary, Dictionary, SolutionData } from '../../../../../lib/getDictionary';
import { Locale, solutions, industries, markets, solutionToIndustryMap } from '../../../../../lib/i18n';
import RoiCalculator from '../../../../../components/RoiCalculator';

type MetadataProps = {
  params: Promise<{
    locale: string;
    solution: string;
    industry: string;
    market: string;
  }>
};

type IndustryData = {
  name: string;
  description: string;
  challenges?: string[];
  solutions?: string[];
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale, solution, industry, market } = await params;
  const dictionary = await getDictionary(locale as Locale);
  
  // Check if solution, industry, and market exist and are compatible
  if (!dictionary.solutions[solution] || 
      !dictionary.industries[industry] || 
      !dictionary.markets || 
      !dictionary.markets[market]) {
    return {
      title: 'Not Found',
    };
  }
  
  const solutionData = dictionary.solutions[solution];
  const industryData = dictionary.industries[industry];
  const marketData = dictionary.markets?.[market];
  
  if (!marketData) {
    return {
      title: 'Not Found',
    };
  }
  
  return {
    title: `${solutionData.name} for ${industryData.name} in ${marketData.name} | ${dictionary.common.company_name}`,
    description: `${solutionData.name} helps ${industryData.name} businesses in ${marketData.name} improve operations and customer experience.`,
  };
}

interface CombinedPageProps {
  params: Promise<{
    locale: string;
    solution: string;
    industry: string;
    market: string;
  }>;
}

export default async function CombinedPage({ params }: CombinedPageProps) {
  const { locale, solution, industry, market } = await params;
  const dictionary = await getDictionary(locale as Locale);
  
  // Check if solution, industry, and market exist and are compatible
  if (!dictionary.solutions[solution] || 
      !dictionary.industries[industry] || 
      !dictionary.markets || 
      !dictionary.markets[market]) {
    notFound();
  }
  
  // Check if this solution is applicable to this industry
  const industryData = dictionary.industries[industry];
  if (!industryData.solutions || !industryData.solutions.includes(solution)) {
    notFound();
  }
  
  const solutionData = dictionary.solutions[solution];
  const marketData = dictionary.markets?.[market];
  
  if (!marketData) {
    notFound();
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {solutionData.name} for {industryData.name} in {marketData.name}
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          Tailored AI voice automation solutions for {industryData.name.toLowerCase()} businesses in {marketData.name}.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="prose prose-lg max-w-none">
            <h2>How {solutionData.name} Helps {industryData.name} in {marketData.name}</h2>
            <p>
              {solutionData.name} provides specialized AI voice automation for {industryData.name.toLowerCase()} businesses 
              operating in {marketData.name}, addressing unique regional challenges and customer expectations.
            </p>
            
            <h3>Industry-Specific Benefits</h3>
            <ul>
              {solutionData.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            
            <h3>Regional Adaptations</h3>
            <p>
              Our solution is adapted for {marketData.name}'s unique requirements, including:
            </p>
            <ul>
              <li>Local language and dialect support</li>
              <li>Compliance with regional regulations</li>
              <li>Cultural nuances and customer preferences</li>
              <li>Integration with popular local systems</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Get Started</h3>
          <p className="text-gray-600 mb-6">
            Ready to see how {solutionData.name} can transform your {industryData.name.toLowerCase()} business in {marketData.name}?
          </p>
          
          <div className="space-y-4">
            <Link
              href={`/${locale}/contact?solution=${solution}&industry=${industry}&market=${market}`}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              {dictionary.common.contact_us}
            </Link>
            
            <Link
              href={`/${locale}/contact?solution=${solution}&industry=${industry}&market=${market}&demo=true`}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              {dictionary.common.request_demo}
            </Link>
          </div>
          
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Related Solutions</h4>
            <ul className="space-y-2">
              {industryData.solutions && industryData.solutions.filter((sol: string) => sol !== solution).map((sol: string) => (
                <li key={sol}>
                  <Link
                    href={`/${locale}/solutions/${sol}/${industry}/${market}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {dictionary.solutions[sol]?.name || sol}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate all valid combinations
export async function generateStaticParams() {
  const validCombinations: Array<{
    solution: string;
    industry: string;
    market: string;
  }> = [];
  
  // For each solution
  Object.keys(solutions).forEach(solution => {
    // Find industries that this solution applies to
    const applicableIndustries = Object.keys(industries).filter(industry => 
      solutionToIndustryMap[solution]?.includes(industry)
    );
    
    // For each applicable industry
    applicableIndustries.forEach(industry => {
      // For each market
      Object.keys(markets).forEach(market => {
        // Add this valid combination
        validCombinations.push({
          solution,
          industry,
          market,
        });
      });
    });
  });
  
  return validCombinations;
}

// Add ISR configuration
export const revalidate = 3600; // Revalidate every hour