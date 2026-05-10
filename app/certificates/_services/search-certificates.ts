import { hygraph } from '@/app/_libs/hygraph';
import { PaginationInfo } from '@/app/_types';
import { getPaginationInfo } from '@/app/_utils/pagination';
import { SearchCertificationsQuery, Stage } from '@/graphql/generated/graphql';
import { cacheLife } from 'next/cache';

const PAGE_SIZE = 6;

export type CertificationSearchResult = SearchCertificationsQuery['certificationsConnection']['edges'][number]['node'];

interface SearchParams {
  q?: string;
  page?: number;
}

interface SearchCertificatesResult {
  certifications: CertificationSearchResult[];
  pagination: PaginationInfo;
}

export const searchCertificatesService = async ({
  q = '',
  page = 1,
}: SearchParams): Promise<SearchCertificatesResult> => {
  'use cache';
  cacheLife('days');

  const search = q.trim();
  const skip = (page - 1) * PAGE_SIZE;

  const result = await hygraph.searchCertifications({
    search,
    first: PAGE_SIZE,
    skip,
    stage: Stage.Published,
  });

  const certifications: CertificationSearchResult[] = result.certificationsConnection.edges.map(({ node }) => node);
  const pagination = getPaginationInfo({ ...result.certificationsConnection, currentPage: page });

  return {
    certifications,
    pagination,
  };
};
