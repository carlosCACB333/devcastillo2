import { Spinner } from '@heroui/react';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Footer } from './_components/footer';
import { NavBar } from './_components/nav-bar';
import { geistMono, geistSans } from './_config/font';
import { profile } from './_data/portfolio';
import './globals.css';
import { Providers } from './providers';
import { appLocale } from './_config/app';

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
        <Suspense fallback={<Spinner />}>
          <Providers>
            <NavBar profile={profile} />
            <div className='relative overflow-hidden'>
              <div className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-128 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.16),transparent_38%),radial-gradient(circle_at_top_right,rgba(148,163,184,0.16),transparent_28%)]' />
              <div className='pointer-events-none absolute top-40 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-(--app-blob) blur-3xl' />
              {children}
            </div>
            <Footer />
          </Providers>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: profile.name,
    template: `%s | ${profile.name}`,
  },
  description:
    'Portfolio minimalista y moderno de Carlos Castillo Blas, desarrollador full-stack y backend con experiencia en microservicios, cloud y frontend moderno.',
};
