import 'server-only';
import type { Locale } from './i18n';

// Define the solution data interface
export interface SolutionData {
  name: string;
  subtitle: string;
  description: string;
  features: string[];
}

// Define the industry data interface
export interface IndustryData {
  name: string;
  description: string;
  challenges: string[];
  solutions: string[];
}

// Define the dictionary interface
export interface Dictionary {
  common: Record<string, string>;
  navigation: Record<string, string>;
  home: {
    hero_title: string;
    hero_subtitle: string;
    solutions_title: string;
    industries_title: string;
    markets_title: string;
    features_title: string;
    features: Record<string, string>;
    testimonials_title: string;
    cta_title: string;
    cta_subtitle: string;
    [key: string]: any;
  };
  solutions: {
    [key: string]: SolutionData;
  };
  industries: {
    [key: string]: IndustryData;
  };
  markets?: {
    [key: string]: {
      name: string;
      description: string;
    };
  };
  [key: string]: any;
}

// We use a dynamic import here to avoid loading all dictionaries in memory on the server
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  'en-US': () => import('./dictionaries/en-US.json').then((module) => module.default),
  'fr': () => import('./dictionaries/fr.json').then((module) => module.default),
  'de': () => import('./dictionaries/de.json').then((module) => module.default),
  'es': () => import('./dictionaries/es.json').then((module) => module.default),
  'pt': () => import('./dictionaries/pt.json').then((module) => module.default),
  'hi': () => import('./dictionaries/hi.json').then((module) => module.default),
  'ja': () => import('./dictionaries/ja.json').then((module) => module.default),
  'pa': () => import('./dictionaries/pa.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  try {
    return await dictionaries[locale]();
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${locale}`, error);
    // Fallback to English if the requested locale fails to load
    return await dictionaries['en-US']();
  }
}; 