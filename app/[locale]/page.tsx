import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '../lib/getDictionary';
import { Locale } from '../lib/i18n';

type Params = Promise<{ locale: string }>;

export async function generateMetadata(
  props: { params: Params },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await the params
  const params = await props.params;
  const { locale } = params;
  
  // Get dictionary data
  const dictionary = await getDictionary(locale as Locale);
  
  return {
    title: `${dictionary.common.company_name} | ${dictionary.common.tagline}`,
    description: dictionary.home.hero_subtitle,
  };
}

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  // Get locale from params
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);
  
  const solutions = [
    { id: 'orderlyai', icon: '/images/solutions/orderlyai.svg' },
    { id: 'hotelierai', icon: '/images/solutions/hotelierai.svg' },
    { id: 'healthcareai', icon: '/images/solutions/healthcareai.svg' },
    { id: 'retailai', icon: '/images/solutions/retailai.svg' },
    { id: 'scheduleai', icon: '/images/solutions/scheduleai.svg' },
    { id: 'supportai', icon: '/images/solutions/supportai.svg' }
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {dictionary.home.hero_title}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-muted-foreground">
                {dictionary.home.hero_subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={`/${locale}/solutions`} 
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium text-center"
                >
                  {dictionary.common.learn_more}
                </Link>
                <Link 
                  href={`/${locale}/contact`} 
                  className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-md font-medium text-center"
                >
                  {dictionary.common.contact_us}
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/ai-voice-assistant.png"
                alt="AI Voice Assistant"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {dictionary.home.features_title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our AI voice assistants leverage cutting-edge technology to deliver exceptional customer experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {dictionary.home.features.speech_recognition}
              </h3>
              <p className="text-muted-foreground">
                Advanced speech recognition with industry-leading accuracy, even in noisy environments.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {dictionary.home.features.voice_biometrics}
              </h3>
              <p className="text-muted-foreground">
                Secure voice authentication that identifies customers without requiring passwords.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {dictionary.home.features.nlp}
              </h3>
              <p className="text-muted-foreground">
                Natural language processing that understands context, intent, and complex queries.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {dictionary.home.features.real_time}
              </h3>
              <p className="text-muted-foreground">
                Real-time responses with minimal latency for natural conversational flow.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {dictionary.home.features.multilingual}
              </h3>
              <p className="text-muted-foreground">
                Support for multiple languages and dialects to serve diverse customer bases.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {dictionary.home.features.context_aware}
              </h3>
              <p className="text-muted-foreground">
                Maintains conversation context for more intelligent and helpful interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {dictionary.home.solutions_title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tailored AI voice solutions for different industries and use cases.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <Link 
                key={solution.id}
                href={`/${locale}/solutions/${solution.id}`}
                className="group block"
              >
                <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <Image 
                        src={solution.icon} 
                        alt={dictionary.solutions[solution.id]?.name || solution.id} 
                        width={40} 
                        height={40}
                        className="h-10 w-10"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    {dictionary.solutions[solution.id]?.name}
                  </h3>
                  <p className="text-muted-foreground text-center mb-4 flex-grow">
                    {dictionary.solutions[solution.id]?.subtitle}
                  </p>
                  <div className="flex justify-center">
                    <span className="text-primary font-medium inline-flex items-center group-hover:underline">
                      {dictionary.common.learn_more}
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href={`/${locale}/solutions`}
              className="inline-flex items-center px-6 py-3 border border-primary text-primary font-medium rounded-md hover:bg-primary hover:text-white transition-colors"
            >
              {dictionary.common.view_all_solutions}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {dictionary.home.industries_title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              AI voice automation that delivers results across multiple sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              href={`/${locale}/industries/restaurants`}
              className="group block"
            >
              <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow text-center">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {dictionary.industries.restaurants.name}
                </h3>
              </div>
            </Link>
            
            <Link 
              href={`/${locale}/industries/hospitality`}
              className="group block"
            >
              <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow text-center">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {dictionary.industries.hospitality.name}
                </h3>
              </div>
            </Link>
            
            <Link 
              href={`/${locale}/industries/healthcare`}
              className="group block"
            >
              <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow text-center">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {dictionary.industries.healthcare.name}
                </h3>
              </div>
            </Link>
            
            <Link 
              href={`/${locale}/industries/retail`}
              className="group block"
            >
              <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow text-center">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {dictionary.industries.retail.name}
                </h3>
              </div>
            </Link>
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              href={`/${locale}/industries`}
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              {dictionary.common.view_all_industries}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl bg-primary text-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-3/5 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to transform your customer service?
              </h2>
              <p className="text-lg mb-6 text-white/90">
                Schedule a demo to see how our AI voice assistants can help your business handle high call volumes, reduce wait times, and deliver exceptional customer experiences.
              </p>
              <Link 
                href={`/${locale}/contact?demo=true`}
                className="inline-flex items-center px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-white/90 transition-colors"
              >
                {dictionary.common.request_demo}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            <div className="md:w-2/5 bg-primary-dark hidden md:block">
              {/* Decorative element */}
              <div className="h-full w-full bg-[url('/images/ai-voice-assistant.png')] bg-cover bg-center opacity-30"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 