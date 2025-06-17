import type { Metadata } from 'next';
import { ThemeProvider } from './components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agentic Order',
  description: 'AI Voice Automation for Businesses',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale?: string };
}

// This layout only runs for the root path '/'
// The [locale] folder handles all other paths
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
