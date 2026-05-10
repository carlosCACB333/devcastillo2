import { Metadata } from 'next';
import { SearchPageShell } from '../_components/search-page-shell';
import { parseSearchParams } from '../_utils/search-params';
import { searchCertificatesService } from './_services/search-certificates';
import { CertificatesHero } from './_slots/certificates-hero';
import { CertificatesResults } from './_slots/certificates-results';
import { CertificatesSearchSection } from './_slots/certificates-search-section';
import { CertificatesSummary } from './_slots/certificates-summary';

export default async function CertificatesPage({ searchParams }: PageProps<'/certificates'>) {
  const { page, q } = parseSearchParams(await searchParams);
  const { certifications, pagination } = await searchCertificatesService({ q, page });

  return (
    <SearchPageShell>
      <CertificatesHero />
      <CertificatesSearchSection defaultQuery={q} totalCount={pagination.totalCount} />
      <CertificatesSummary q={q} totalCount={pagination.totalCount} />
      <CertificatesResults certifications={certifications} pagination={pagination} q={q} />
    </SearchPageShell>
  );
}

export const metadata: Metadata = {
  title: 'Certificados',
  description:
    'Todos los certificados y certificaciones publicados, con opciones de búsqueda y paginación para facilitar su consulta.',
};
