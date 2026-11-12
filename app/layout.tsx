import { Spinner } from '@heroui/react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Footer } from './_components/footer';
import { JsonLd } from './_components/json-ld';
import { NavBar } from './_components/nav-bar';
import { appLocale } from './_config/app';
import { geistMono, geistSans } from './_config/font';
import { personJsonLd, siteDescription, siteKeywords, siteUrl } from './_config/seo';
import { profile } from './_data/portfolio';
import './globals.css';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={appLocale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior='smooth'
      suppressHydrationWarning
    >
      <body className='flex min-h-full flex-col'>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              personJsonLd,
              {
                '@type': 'WebSite',
                '@id': `${siteUrl}/#website`,
                url: siteUrl,
                name: profile.name,
                description: siteDescription,
                inLanguage: appLocale,
                publisher: { '@id': personJsonLd['@id'] },
              },
            ],
          }}
        />
        <Providers>
          <NavBar profile={profile} />
          <div className='relative flex flex-1 flex-col overflow-clip'>
            <div className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-128 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.16),transparent_38%),radial-gradient(circle_at_top_right,rgba(148,163,184,0.16),transparent_28%)]' />
            <div className='pointer-events-none absolute top-40 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-(--app-blob) blur-3xl' />
            <Suspense fallback={<Spinner />}>{children}</Suspense>
          </div>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: siteDescription,
  applicationName: profile.name,
  keywords: siteKeywords,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: '/',
    siteName: profile.name,
    title: `${profile.name} | ${profile.role}`,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} | ${profile.role}`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'dark light',
};
