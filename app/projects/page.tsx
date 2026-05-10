import { Metadata } from 'next';
import { SearchPageShell } from '../_components/search-page-shell';
import { parseSearchParams } from '../_utils/search-params';
import { searchProjectsService } from './_services/search-projects';
import { ProjectsHero } from './_slots/projects-hero';
import { ProjectsResults } from './_slots/projects-results';
import { ProjectsSearchSection } from './_slots/projects-search-section';
import { ProjectsSummary } from './_slots/projects-summary';

export default async function ProjectsPage({ searchParams }: PageProps<'/projects'>) {
  const { page, q } = parseSearchParams(await searchParams);
  const { projects, pagination } = await searchProjectsService({ q, page });

  return (
    <SearchPageShell>
      <ProjectsHero />
      <ProjectsSearchSection defaultQuery={q} totalCount={pagination.totalCount} />
      <ProjectsSummary q={q} totalCount={pagination.totalCount} />
      <ProjectsResults projects={projects} pagination={pagination} q={q} />
    </SearchPageShell>
  );
}

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Proyectos realizados y experiencias técnicas.',
};
