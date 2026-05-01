import { Metadata } from 'next';
import { SearchParams } from '../_types';
import { searchCertificatesService } from './_services/search-certificates';
import { CertificatesHero } from './_slots/certificates-hero';
import { CertificatesResults } from './_slots/certificates-results';
import { CertificatesSearchSection } from './_slots/certificates-search-section';
import { CertificatesSummary } from './_slots/certificates-summary';

export default async function CertificatesPage({ searchParams }: PageProps<'/certificates'>) {
  const params = (await searchParams) as SearchParams;
  const page = Math.max(1, Number.parseInt(params.page || '1', 10) || 1);
  const q = params.q?.trim() || '';

  const { certifications, pagination } = await searchCertificatesService({ q, page });

  return (
    <main className='relative overflow-hidden'>
      <section className='mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24'>
        <CertificatesHero />

        <CertificatesSearchSection defaultQuery={q} totalCount={pagination.totalCount} />

        <CertificatesSummary q={q} totalCount={pagination.totalCount} />

        <CertificatesResults certifications={certifications} pagination={pagination} q={q} />
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Certificados',
  description:
    'Todos los certificados y certificaciones publicados, con opciones de búsqueda y paginación para facilitar su consulta.',
};
