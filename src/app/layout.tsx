import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ECommerce SaaS',
  description: 'Multi-shop SaaS platform with professional architecture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div id="root" className="min-h-screen bg-background antialiased">
          {children}
        </div>
      </body>
    </html>
  );
}
