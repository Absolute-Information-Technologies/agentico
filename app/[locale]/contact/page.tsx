import { Metadata, ResolvingMetadata } from 'next';
import { getDictionary } from '../../lib/getDictionary';
import { Locale } from '../../lib/i18n';
import ContactForm from '../../components/ContactForm';

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
    title: `${dictionary.contact.title} | ${dictionary.common.company_name}`,
    description: dictionary.contact.subtitle,
  };
}

interface ContactPageProps {
  params: Promise<{ locale: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ContactPage({
  params,
  searchParams
}: ContactPageProps) {
  // Get locale from params
  const { locale } = await params;
  const dictionary = await getDictionary(locale as Locale);
  
  // Check if this is a demo request
  const isDemo = searchParams?.demo === 'true';
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            {isDemo ? dictionary.contact.form.demo_request : dictionary.contact.title}
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            {dictionary.contact.subtitle}
          </p>
        </div>
        
        <ContactForm 
          dictionary={dictionary} 
          locale={locale as Locale} 
          isDemo={isDemo}
        />
        
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {dictionary.contact.headquarters}
              </h3>
              <div className="mt-3 text-base text-gray-500 dark:text-gray-400">
                <p>123 AI Boulevard</p>
                <p>San Francisco, CA 94107</p>
                <p>United States</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {dictionary.contact.support_email}
              </h3>
              <div className="mt-3 text-base text-gray-500 dark:text-gray-400">
                <p>Email: support@agenticorder.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Hours: 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 