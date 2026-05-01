import { Metadata } from 'next';
import { SearchParams } from '../_types';
import { searchProjectsService } from './_services/search-projects';
import { ProjectsHero } from './_slots/projects-hero';
import { ProjectsResults } from './_slots/projects-results';
import { ProjectsSearchSection } from './_slots/projects-search-section';
import { ProjectsSummary } from './_slots/projects-summary';

export default async function ProjectsPage({ searchParams }: PageProps<'/projects'>) {
  const params = (await searchParams) as SearchParams;
  const page = Math.max(1, Number.parseInt(params.page || '1', 10) || 1);
  const q = params.q?.trim() || '';
  const { projects, pagination } = await searchProjectsService({ q, page });

  return (
    <main className='relative overflow-hidden'>
      <section className='mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24'>
        <ProjectsHero />

        <ProjectsSearchSection defaultQuery={q} totalCount={pagination.totalCount} />

        <ProjectsSummary q={q} totalCount={pagination.totalCount} />

        <ProjectsResults projects={projects} pagination={pagination} q={q} />
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Proyectos realizados y experiencias técnicas.',
};
