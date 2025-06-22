import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agentic Order',
  description: 'AI Voice Automation for Businesses',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}

// This layout only runs for the root path '/'
// The [locale] folder handles all other paths
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
