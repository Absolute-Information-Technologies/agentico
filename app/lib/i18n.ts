export const languages = {
  'en-US': 'English (US)',
  'fr': 'French',
  'de': 'German',
  'es': 'Spanish',
  'pt': 'Portuguese',
  'hi': 'Hindi',
  'ja': 'Japanese',
  'pa': 'Punjabi',
};

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en-US';

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const localeSegment = segments[0];
  
  return (localeSegment && localeSegment in languages) 
    ? localeSegment as Locale 
    : defaultLocale;
}

export function generateHrefLangLinks(path: string): { href: string; hrefLang: string }[] {
  const pathWithoutLocale = path.split('/').slice(2).join('/');
  
  return Object.keys(languages).map((locale) => ({
    href: `/${locale}/${pathWithoutLocale}`,
    hrefLang: locale,
  }));
}

export const markets = [
  'united-states',
  'canada',
  'united-kingdom',
  'germany',
  'france',
  'india',
  'mexico',
  'brazil',
  'japan',
  'australia',
  'south-korea',
  'south-africa',
];

export const industries = [
  'restaurants',
  'hospitality',
  'healthcare',
  'retail',
  'education',
  'automotive',
  'legal',
  'real-estate',
  'professional-services',
  'mental-health',
  'call-centers',
  'multitenant-enterprises',
  'financial-services',
  'insurance',
  'travel',
  'logistics',
  'government',
  'utilities',
  'telecommunications',
];

export const solutions = [
  'orderlyai',
  'hotelierai',
  'healthcareai',
  'retailai',
  'scheduleai',
  'supportai',
  'legalai',
  'propertyai',
  'eventai',
  'consultai',
  'wellnessai',
  'petcareai',
  'therapyai',
  'autoai',
  'tutorai',
  'callcenterai',
  'multitenantai',
  'analyticsai',
  'financialai',
  'insuranceai',
  'travelai',
  'logisticsai',
  'govai',
  'utilityai',
  'telecomai',
];

export const solutionToIndustryMap: Record<string, string[]> = {
  'orderlyai': ['restaurants'],
  'hotelierai': ['hospitality'],
  'healthcareai': ['healthcare'],
  'retailai': ['retail'],
  'scheduleai': ['healthcare', 'professional-services', 'automotive', 'education', 'legal'],
  'supportai': ['call-centers', 'professional-services', 'retail', 'telecommunications', 'financial-services', 'utilities'],
  'legalai': ['legal', 'professional-services'],
  'propertyai': ['real-estate'],
  'eventai': ['hospitality', 'professional-services'],
  'consultai': ['professional-services', 'financial-services', 'insurance'],
  'wellnessai': ['healthcare'],
  'petcareai': ['healthcare'],
  'therapyai': ['mental-health', 'healthcare'],
  'autoai': ['automotive'],
  'tutorai': ['education'],
  'callcenterai': ['call-centers', 'telecommunications', 'financial-services', 'utilities'],
  'multitenantai': ['multitenant-enterprises', 'real-estate'],
  'analyticsai': ['restaurants', 'hospitality', 'healthcare', 'retail', 'education', 'automotive', 'legal', 'real-estate', 'professional-services', 'mental-health', 'call-centers', 'multitenant-enterprises', 'financial-services', 'insurance'],
  'financialai': ['financial-services'],
  'insuranceai': ['insurance'],
  'travelai': ['travel', 'hospitality'],
  'logisticsai': ['logistics'],
  'govai': ['government'],
  'utilityai': ['utilities'],
  'telecomai': ['telecommunications'],
}; 