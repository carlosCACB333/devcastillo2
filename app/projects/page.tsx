import { pageMetadata } from '@/app/_config/seo';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchPageShell } from '../_components/search-page-shell';
import { SearchResultsSkeleton } from '../_components/search-results-skeleton';
import { parseSearchParams } from '../_utils/search-params';
import { searchProjectsService } from './_services/search-projects';
import { ProjectsHero } from './_slots/projects-hero';
import { ProjectsResults } from './_slots/projects-results';
import { ProjectsSearchSection } from './_slots/projects-search-section';
import { ProjectsSummary } from './_slots/projects-summary';

export default function ProjectsPage({ searchParams }: PageProps<'/projects'>) {
  return (
    <SearchPageShell>
      <ProjectsHero />
      <Suspense fallback={<SearchResultsSkeleton />}>
        <ProjectsSearch searchParams={searchParams} />
      </Suspense>
    </SearchPageShell>
  );
}

/** Lee `searchParams` dentro de <Suspense> para que el hero forme parte del App Shell. */
async function ProjectsSearch({ searchParams }: Pick<PageProps<'/projects'>, 'searchParams'>) {
  const { page, q } = parseSearchParams(await searchParams);
  const { projects, pagination } = await searchProjectsService({ q, page });

  return (
    <>
      <ProjectsSearchSection defaultQuery={q} totalCount={pagination.totalCount} />
      <ProjectsSummary q={q} totalCount={pagination.totalCount} />
      <ProjectsResults projects={projects} pagination={pagination} q={q} />
    </>
  );
}

export const metadata: Metadata = pageMetadata({
  title: 'Proyectos',
  description:
    'Proyectos de desarrollo web y software de Carlos Castillo: aplicaciones full-stack, APIs y arquitecturas con Next.js, React y microservicios.',
  path: '/projects',
});
