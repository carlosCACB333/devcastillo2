import { pageMetadata } from '@/app/_config/seo';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchPageShell } from '../_components/search-page-shell';
import { SearchResultsSkeleton } from '../_components/search-results-skeleton';
import { parseSearchParams } from '../_utils/search-params';
import { searchCertificatesService } from './_services/search-certificates';
import { CertificatesHero } from './_slots/certificates-hero';
import { CertificatesResults } from './_slots/certificates-results';
import { CertificatesSearchSection } from './_slots/certificates-search-section';
import { CertificatesSummary } from './_slots/certificates-summary';

export default function CertificatesPage({ searchParams }: PageProps<'/certificates'>) {
  return (
    <SearchPageShell>
      <CertificatesHero />
      <Suspense fallback={<SearchResultsSkeleton />}>
        <CertificatesSearch searchParams={searchParams} />
      </Suspense>
    </SearchPageShell>
  );
}

/** Lee `searchParams` dentro de <Suspense> para que el hero forme parte del App Shell. */
async function CertificatesSearch({ searchParams }: Pick<PageProps<'/certificates'>, 'searchParams'>) {
  const { page, q } = parseSearchParams(await searchParams);
  const { certifications, pagination } = await searchCertificatesService({ q, page });

  return (
    <>
      <CertificatesSearchSection defaultQuery={q} totalCount={pagination.totalCount} />
      <CertificatesSummary q={q} totalCount={pagination.totalCount} />
      <CertificatesResults certifications={certifications} pagination={pagination} q={q} />
    </>
  );
}

export const metadata: Metadata = pageMetadata({
  title: 'Certificados',
  description:
    'Certificados y certificaciones de Carlos Castillo en desarrollo de software, cloud y tecnologías web, con búsqueda y paginación.',
  path: '/certificates',
});
