import type { Metadata } from 'next';
import { profile } from '../_data/portfolio';
import { envs } from './envs';

export const siteUrl = envs.SITE_URL.replace(/\/$/, '');

export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).toString();

export const siteDescription =
  'Portfolio de Carlos Castillo, desarrollador full-stack e Ingeniero de Sistemas en Perú. Experiencia en microservicios, cloud, Next.js, React y arquitecturas escalables.';

export const siteKeywords = [
  'Carlos Castillo',
  'desarrollador full-stack',
  'desarrollador backend',
  'ingeniero de sistemas',
  'Next.js',
  'React',
  'TypeScript',
  'microservicios',
  'portfolio',
  'Perú',
];

export const personJsonLd = {
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: profile.name,
  url: siteUrl,
  image: absoluteUrl(profile.avatarUrl),
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: { '@type': 'PostalAddress', addressCountry: 'PE' },
  sameAs: [profile.linkedin, profile.github],
};

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

/**
 * Metadata por página: canonical + Open Graph/Twitter coherentes.
 * Next.js reemplaza (no fusiona) `openGraph` en rutas hijas, por eso se repiten los campos compartidos.
 */
export const pageMetadata = ({ title, description, path }: PageMetadataInput): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: profile.name,
    url: path,
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
});
