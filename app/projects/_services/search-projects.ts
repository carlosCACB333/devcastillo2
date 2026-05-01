import { hygraph } from '@/app/_libs/hygraph';
import { PaginationInfo } from '@/app/_types';
import { getPaginationInfo } from '@/app/_utils/pagination';
import { SearchProjectsQuery, Stage } from '@/graphql/generated/graphql';
import { cacheLife } from 'next/cache';

const PAGE_SIZE = 6;

export type ProjectSearchResult = SearchProjectsQuery['projectsConnection']['edges'][number]['node'];

interface SearchParams {
  q?: string;
  page?: number;
}

interface SearchProjectsResult {
  projects: ProjectSearchResult[];
  pagination: PaginationInfo;
}

export const searchProjectsService = async ({ q = '', page = 1 }: SearchParams): Promise<SearchProjectsResult> => {
  'use cache';
  cacheLife('days');

  console.log('Searching projects: ', { q, page });

  const search = q.trim();
  const skip = (page - 1) * PAGE_SIZE;

  const result = await hygraph.searchProjects({
    search,
    first: PAGE_SIZE,
    skip,
    stage: Stage.Published,
  });

  const projects: ProjectSearchResult[] = result.projectsConnection.edges.map(({ node }) => node);
  const pagination = getPaginationInfo({ ...result.projectsConnection, currentPage: page });

  return {
    projects,
    pagination,
  };
};
